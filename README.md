# CodeByChai — Portfolio

Portfolio site for **Atthachai** (aka **CodeByChai**), built with Next.js and Remotion. Showcases vibe-coded projects with options to use on the web or download.

**Domain:** codebychai.com (Hostinger). To host this Next.js app and use your domain, see **[DEPLOY.md](./DEPLOY.md)**.

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS
- **Remotion** for programmatic hero / intro video
- Project cards with **Use on web** / **Download** / **Source** links

## Scripts

```bash
npm install
npm run dev      # Next.js dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Run production build
npm run studio   # Remotion Studio (edit compositions)
```

## Site config

Edit `src/data/site.ts` for brand copy, tagline, and URLs. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://codebychai.dev`) for correct OpenGraph and JSON-LD.

## Project data

Edit `src/data/projects.ts` to add or update projects. Each project can have:

- `webUrl` — try on the web
- `downloadUrl` — download (APK, ZIP, etc.)
- `repoUrl` — source code
- `thumbnail` — optional image URL (add host to `next.config.ts` `images.remotePatterns` if external)
- `tech` — tags (e.g. Flutter, Remotion)

Projects with no links show a “Coming soon” label.

## Remotion

- Compositions live in `remotion/` (e.g. `Hero` in `remotion/Composition.tsx`).
- The hero section embeds the Remotion Player; run `npm run studio` to edit compositions.

## Admin (edit site from the web)

You can log in and edit the site from the browser so that after hosting (e.g. Hostinger) you can update projects, hero text, banner, and video without touching code.

### Setup

1. **Supabase** – Create a project at [supabase.com](https://supabase.com). In **SQL Editor**, run the script in `supabase/schema.sql` to create tables and storage.
2. **Auth** – In Supabase **Authentication → Users**, add a user (email + password). Use this to sign in at `/admin/login`.
3. **Env** – Copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL` – from Supabase **Settings → API**
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` – from the same page (anon/public key)

Restart the dev server after adding env vars.

### What you can do in Admin

- **Site & hero** (`/admin/site`) – Edit hero title/subtitle, site name, tagline, description, URLs. Upload a banner image or hero video.
- **Projects** (`/admin/projects`) – Add, edit, delete projects. For each project you can:
  - Upload a **ZIP** so visitors can download the project files.
  - Upload a **thumbnail** image.
  - Set **Use on web**, **Download**, and **Source** URLs.

The public site reads from Supabase when env is set; otherwise it uses the static data in `src/data/site.ts` and `src/data/projects.ts`.

## Flutter projects

To showcase a Flutter web app: build it and host it (e.g. GitHub Pages, Firebase Hosting), then add an entry in Admin or `src/data/projects.ts` with `webUrl` pointing to the live app. For download-only Flutter apps, use **Download** (upload a ZIP in Admin or set `downloadUrl`).
