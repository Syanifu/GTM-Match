# GTM Match

Skill gap assessment for traditional marketers transitioning into technical GTM roles (DevRel, Developer Marketing, Technical PMM).

## Stack

- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS + shadcn/ui
- Recharts, framer-motion, lucide-react
- Supabase (Postgres + Auth for admin)
- Resend (report emails)

## Setup

1. Clone and install:

```bash
npm install
```

2. Copy env and fill values:

```bash
cp .env.local.example .env.local
```

3. Run the SQL in `supabase/schema.sql` in your Supabase SQL editor.

4. Enable Email auth (magic link) in Supabase Auth settings and add your site URL to redirect allowlist (`http://localhost:3000/auth/callback`).

5. Start dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Flow

1. Landing → `/assessment` industry picker
2. `/assessment/[industry]` — 26 questions + email gate
3. `POST /api/submit` — saves to Supabase, emails report via Resend
4. `/results/[id]` — score, radar, gaps, resources, LinkedIn share
5. `/admin` — magic-link login, stats dashboard, CSV export

## Deploy (Vercel)

Set all env vars from `.env.local.example`. Verify Resend domain and Supabase redirect URLs for production.
