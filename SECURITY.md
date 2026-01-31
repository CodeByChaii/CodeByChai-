# Security

- **Never commit** `.env.local` or any file containing real API keys or passwords. `.env*` is in `.gitignore`.
- **Supabase**: Use only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the app. Do not put the database password in env; it is for Supabase Dashboard / direct DB access only.
- If you ever shared your anon key or database password (e.g. in chat or email), **rotate them** in Supabase: Project Settings → API (regenerate anon key) and Database → reset password.
