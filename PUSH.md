# Push to GitHub

The repo is ready. **No secrets are committed** (`.env.local` is in `.gitignore`).

### 1. Create the repo on GitHub

1. Go to [github.com/new](https://github.com/new).
2. **Repository name:** `CodeByChai`
3. **Owner:** your account (`codebychaii`) or org `CodeByChai` if you created it.
4. Leave it **empty** (no README, no .gitignore).
5. Click **Create repository**.

### 2. Push from your machine

In a terminal in this project:

```bash
git push -u origin main
```

Sign in to GitHub when prompted (browser or token). If the repo is under an org, use the URL GitHub shows (e.g. `https://github.com/CodeByChai/CodeByChai.git`) and run:

```bash
git remote set-url origin https://github.com/CodeByChai/CodeByChai.git
git push -u origin main
```

### 3. After push

- Add the same env vars in **Vercel** (or your host) so the live site can use Supabase.
- **Rotate your Supabase anon key and database password** in the Supabase dashboard (they were shared in chat). See [SECURITY.md](./SECURITY.md).
