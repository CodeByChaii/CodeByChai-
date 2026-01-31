# X Auto Poster Setup

## Environment Variables

Add the following to your Vercel environment variables:

### Required
- `OPENAI_API_KEY` - Your OpenAI API key from https://platform.openai.com/api-keys

## How to Add to Vercel

1. Go to https://vercel.com/codebychais-projects/code-by-chai/settings/environment-variables
2. Click "Add New"
3. Name: `OPENAI_API_KEY`
4. Value: Your API key (starts with `sk-`)
5. Select all environments (Production, Preview, Development)
6. Click "Save"

## Testing Locally

1. Create a `.env.local` file in the project root
2. Add: `OPENAI_API_KEY=your_key_here`
3. Run `npm run dev`
4. Visit http://localhost:3000/x-auto-poster

## Features

The X Auto Poster now includes:
- ✅ Real AI-powered tweet generation using OpenAI GPT-4o-mini
- ✅ Crypto content generation
- ✅ Coding/vibe content generation
- ✅ Custom topic support
- ✅ Engaging hooks and viral patterns
- ✅ Copy to clipboard
- ✅ Direct post to X/Twitter button
- ✅ Character count display

## Cost

GPT-4o-mini is very affordable:
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens
- Each tweet costs approximately $0.0001 (1/100th of a cent)
