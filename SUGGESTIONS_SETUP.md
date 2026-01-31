# Project Suggestions Email System

## Setup Instructions:

### 1. Add Supabase Table
Run the SQL in `supabase/suggestions.sql` in your Supabase SQL editor.

### 2. Install Resend (for sending emails)
```bash
npm install resend
```

### 3. Add Environment Variables
Add to your Vercel environment variables:

```
RESEND_API_KEY=re_...your-key...
CRON_SECRET=your-random-secret-string
```

Get your Resend API key from: https://resend.com/api-keys

### 4. Uncomment Email Sending Code
In `src/app/api/send-suggestions/route.ts`, uncomment the Resend email sending code and add your email address.

### 5. Set Up Cron Job

**Option A: Vercel Cron (Recommended)**
Create `vercel.json` in your project root:

```json
{
  "crons": [
    {
      "path": "/api/send-suggestions?secret=your-random-secret-string",
      "schedule": "0 0 * * *"
    }
  ]
}
```

This will run daily at midnight UTC.

**Option B: External Cron Service**
Use a service like cron-job.org or EasyCron to hit:
`https://codebychai.com/api/send-suggestions?secret=your-random-secret-string`

### 6. Manual Testing
Visit: `https://codebychai.com/api/send-suggestions?secret=your-random-secret-string`

This will send you an email if there are 5+ suggestions OR if any suggestion is 7+ days old.

## How It Works:
1. Users submit suggestions via the "Request a Project" card
2. Suggestions are stored in Supabase
3. Daily cron job checks for pending suggestions
4. Sends email when there are 5+ suggestions OR oldest is 7+ days old
5. Marks suggestions as emailed to avoid duplicates

## Customization:
- Change thresholds in `/api/send-suggestions/route.ts` (lines 23-27)
- Modify email template (lines 32-42)
- Adjust cron schedule in `vercel.json`
