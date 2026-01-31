import { NextResponse } from "next/server";
import { getPendingSuggestions, markSuggestionsEmailed } from "@/app/actions/suggestions";

// This endpoint can be called by a cron job (Vercel Cron or external service)
// Or you can manually visit it to send pending suggestions
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Simple secret to prevent abuse - set CRON_SECRET in your env vars
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const suggestions = await getPendingSuggestions();

  if (suggestions.length === 0) {
    return NextResponse.json({ message: "No pending suggestions" });
  }

  // Check if we should send (either 5+ suggestions OR oldest is 7+ days old)
  const shouldSend =
    suggestions.length >= 5 ||
    (suggestions.length > 0 &&
      new Date(suggestions[0].created_at).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000);

  if (!shouldSend) {
    return NextResponse.json({
      message: `${suggestions.length} pending suggestions (not enough to send yet)`,
    });
  }

  // Format email content
  const emailContent = suggestions
    .map((s, i) => {
      const date = new Date(s.created_at).toLocaleString();
      return `
${i + 1}. Submitted: ${date}
   ${s.name ? `Name: ${s.name}` : "Anonymous"}
   ${s.email ? `Email: ${s.email}` : "No email provided"}
   
   Suggestion:
   ${s.suggestion}
   
   ---
`;
    })
    .join("\n");

  const emailBody = `You have ${suggestions.length} new project suggestions:

${emailContent}

View all in your Supabase dashboard: https://supabase.com/dashboard/project/rfgntpeqptlffzmkfshd/editor
`;

  // Send email using Resend
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'CodeByChai <onboarding@resend.dev>',
      to: 'codebychaii@gmail.com',
      subject: `${suggestions.length} New Project Suggestion${suggestions.length > 1 ? 's' : ''}`,
      text: emailBody,
    });
  } catch (emailError) {
    console.error('Failed to send email:', emailError);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  // Mark suggestions as emailed
  const ids = suggestions.map((s) => s.id);
  await markSuggestionsEmailed(ids);

  return NextResponse.json({
    success: true,
    sent: suggestions.length,
    message: `Sent ${suggestions.length} suggestions`,
  });
}
