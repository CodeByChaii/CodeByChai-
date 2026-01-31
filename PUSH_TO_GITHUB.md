# Push to GitHub & Deploy

## 1. Create GitHub Repository
1. Go to https://github.com/new
2. Name: `CodeByChai` (or `portfolio-website`)
3. Make it **Public**
4. **Don't** check "Initialize with README"
5. Click **Create repository**

## 2. Update Remote & Push
After creating the repo, GitHub will show you commands. Use these:

```bash
# Update the remote URL to match your new repo
git remote set-url origin https://github.com/YOUR_USERNAME/CodeByChai.git

# Push your code
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 3. Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New Project**
3. Import your `CodeByChai` repository
4. Framework: **Next.js** (auto-detected)
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key
   - `OPENAI_API_KEY` = your OpenAI API key (for logo generation)
   - `NEXT_PUBLIC_SITE_URL` = `https://codebychai.com`
6. Click **Deploy**

## 4. Connect Your Domain (codebychai.com)

**On Vercel:**
1. Go to your project → **Settings → Domains**
2. Add `codebychai.com` → Vercel will show DNS records
3. Add `www.codebychai.com` → Vercel will show DNS records

**On Hostinger (from your screenshot):**
1. Go to **Domains → codebychai.com → DNS / Nameservers**
2. Click **DNS records** tab
3. Add the records Vercel shows (typically):
   - **A record**: Name = `@`, Value = Vercel's IP (e.g., `76.76.21.21`)
   - **CNAME record**: Name = `www`, Value = `cname.vercel-dns.com`
4. Save changes

DNS propagation takes 5 minutes to 48 hours. You can check status at https://dnschecker.org

## 5. Verify Deployment

Once DNS propagates:
- Visit https://codebychai.com
- Vercel will automatically issue SSL certificate
- Your site is live!

## Need Your Environment Variables?

Check your `.env.local` file for the Supabase and OpenAI keys to add to Vercel.
