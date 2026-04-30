# Pixelore Waitlist — Backend + Deploy

This repo contains a small serverless backend (Vercel) and SQL to back a waitlist form. It intentionally does not modify your frontend — it will call the API at `/api/subscribe`.

Contents
- `api/subscribe.js` — Vercel serverless route to insert emails into Supabase
- `sql/waitlist_init.sql` — SQL to create the `waitlist_emails` table
- `.env.example` — example environment variables

Quick setup
1. Create a Supabase project: https://app.supabase.com
2. Open the SQL editor and run `sql/waitlist_init.sql`.
3. Get your Supabase URL and **Service Role Key** (Settings → API) and set them in Vercel environment variables:
   - `SUPABASE_URL` = https://<project-ref>.supabase.co
   - `SUPABASE_SERVICE_ROLE_KEY` = (service_role key)

Security note: The service role key has full DB privileges. Keep it server-side only (Vercel environment variables). Do not embed it into client-side JS.

Local development
- Install Vercel CLI: `npm i -g vercel` (optional)
- Run locally with `vercel dev` (it reads `.env` or Vercel envs)

How the frontend should call the API
Example POST from the frontend (keep your existing frontend intact):

fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: userEmail, source: 'hero' })
})
.then(r=>r.json()).then(console.log).catch(console.error);

Deploy to Vercel
1. From the project directory run:

```bash
vercel login
vercel link
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel --prod
```

2. Or use the Vercel dashboard to create a new project from this repo and add the two environment variables in the project settings.

Next steps I can do for you
- Add client-side fetch calls into the forms so the frontend sends data to `/api/subscribe` (I will not remove any components).
- Configure automatic redirects, emails, or Mailchimp integration.
- Add validation & rate-limiting to the API.

If you want me to wire the frontend forms to this API now, confirm and I will add the minimal form POSTs to your frontend files.
