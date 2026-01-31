import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Crypto and coding hooks that stop the scroll
const HOOKS = {
  crypto: [
    "Most people don't realize this but...",
    "Here's what nobody tells you about",
    "The truth about",
    "Unpopular opinion:",
    "Hot take:",
    "This changed everything:",
    "The biggest mistake I see:",
    "Everyone's sleeping on this:",
  ],
  coding: [
    "I spent 100 hours learning this so you don't have to:",
    "This actually happened:",
    "I just realized something:",
    "True story:",
    "Confession:",
    "Save this for later:",
    "The fastest way to",
  ],
};

const CRYPTO_PROMPTS = `You are a crypto-native content creator who writes VIRAL tweets that make people STOP scrolling.

Your tweets are:
- SHORT and punchy (under 240 chars ideal)
- Use simple words (8th grade level)
- ONE idea per tweet
- Start with a hook that creates curiosity or controversy
- Use numbers, stats, or comparisons when possible
- Include relevant emojis (1-2 max)
- NO hashtags unless specifically requested

Write about: Bitcoin, Ethereum, DeFi, NFTs, crypto adoption, market trends, trading psychology, web3 culture.

Tone: Confident but not cocky. Informative but entertaining. Optimistic but realistic.`;

const CODING_PROMPTS = `You are a developer who shares coding insights in a fun, relatable way.

Your tweets are:
- SHORT and relatable (under 240 chars ideal)
- Use simple language, avoid jargon
- ONE insight or joke per tweet
- Start with something that hooks other developers
- Self-deprecating humor works great
- Include code emojis when relevant (💻🔥⚡)
- NO hashtags unless specifically requested

Write about: JavaScript, TypeScript, React, Next.js, web development, coding struggles, developer life, debugging, side projects.

Tone: Funny, relatable, slightly chaotic. Like talking to a dev friend over coffee.`;

async function generateCryptoTweet(topic?: string) {
  const hook = HOOKS.crypto[Math.floor(Math.random() * HOOKS.crypto.length)];
  const topicPrompt = topic ? `Topic: ${topic}` : "Pick any trending crypto topic";
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: CRYPTO_PROMPTS },
      {
        role: "user",
        content: `Write a viral crypto tweet. ${topicPrompt}

Start with this hook (or a similar one): "${hook}"

Keep it under 240 characters. Make it scroll-stopping.`,
      },
    ],
    temperature: 0.9,
    max_tokens: 100,
  });

  return completion.choices[0].message.content?.trim() || "Failed to generate tweet";
}

async function generateCodingTweet(topic?: string) {
  const hook = HOOKS.coding[Math.floor(Math.random() * HOOKS.coding.length)];
  const topicPrompt = topic ? `Topic: ${topic}` : "Pick any relatable coding topic";
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: CODING_PROMPTS },
      {
        role: "user",
        content: `Write a viral coding tweet that developers will relate to. ${topicPrompt}

Start with this hook (or a similar one): "${hook}"

Keep it under 240 characters. Make it funny or insightful.`,
      },
    ],
    temperature: 0.9,
    max_tokens: 100,
  });

  return completion.choices[0].message.content?.trim() || "Failed to generate tweet";
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const { category, topic } = await request.json();
    
    let content: string;
    
    if (category === "vibecoding") {
      content = await generateCodingTweet(topic);
    } else if (category === "both") {
      // Randomly pick between crypto and coding
      content = Math.random() > 0.5 
        ? await generateCryptoTweet(topic)
        : await generateCodingTweet(topic);
    } else {
      // Default to crypto
      content = await generateCryptoTweet(topic);
    }
    
    return NextResponse.json({
      success: true,
      post: {
        id: Date.now(),
        content,
        category: category || "crypto",
        charCount: content.length,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error generating post:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to generate post" 
      },
      { status: 500 }
    );
  }
}
