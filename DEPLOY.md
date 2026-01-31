# Hosting codebychai.com

Your portfolio is a **Next.js app** (Node.js). Hostinger’s “Create your website” / shared hosting is built for PHP sites and doesn’t run Next.js well. Use one of these approaches.

---

## Option 1: Vercel + Hostinger domain (recommended)

**Vercel** runs Next.js natively and has a free tier. You keep your domain at Hostinger and point it to Vercel.

### 1. Push your code to GitHub

If you haven’t already:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. **Add New Project** → import your `portfolio-website` repo.
3. Leave framework preset as **Next.js**. Click **Deploy**.
4. After the build, you’ll get a URL like `portfolio-website-xxx.vercel.app`.

### 3. Add environment variables (if you use Supabase)

In the Vercel project: **Settings → Environment Variables**. Add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Optionally: `NEXT_PUBLIC_SITE_URL` = `https://codebychai.com`

Redeploy after saving (Deployments → … → Redeploy).

### 4. Connect your Hostinger domain (codebychai.com)

**On Vercel:**

1. Project **Settings → Domains**.
2. Add `codebychai.com` and `www.codebychai.com`.
3. Vercel will show the DNS records you need (e.g. A record or CNAME).

**On Hostinger:**

1. In the Hostinger panel, open your domain **codebychai.com** → **Manage** (or go to **Domains → DNS / Nameservers**).
2. Add/update records as Vercel says, for example:
   - **A** record: name `@`, value Vercel’s IP (e.g. `76.76.21.21`), or
   - **CNAME** record: name `www`, value `cname.vercel-dns.com`.
3. Save. DNS can take from a few minutes up to 24–48 hours.

When DNS has propagated, Vercel will issue SSL and your site will be live at **https://codebychai.com**.

---

## Option 2: Hostinger VPS (everything on Hostinger)

If you want the app and domain both on Hostinger:

1. In the Hostinger panel, get a **VPS** plan (not shared hosting).
2. On the VPS you’ll install Node.js, clone your repo, run `npm run build` and `npm run start`, and put something like **PM2** in front so it keeps running. You’ll also set up **nginx** (or similar) as a reverse proxy and point your domain to the VPS IP.

This is more setup (SSH, server config, SSL with Let’s Encrypt). If you want to go this route, we can break it down into concrete steps next.

---

## After going live

- Set **NEXT_PUBLIC_SITE_URL** (or your site config) to `https://codebychai.com` so Open Graph and links use the real domain.
- Use **https://codebychai.com/admin** to log in and edit the site (after Supabase env vars are set on the host).
