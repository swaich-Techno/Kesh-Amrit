# Keshamrit

Minimal Next.js commerce site for Keshamrit Herbal Hair Oil.

## Public Routes

- `/` - Home
- `/product` - Product details
- `/order` - Supabase-backed WhatsApp ordering
- `/contact` - Contact and ordering support

## Super Admin ERP

- Route: `/erp`
- Target subdomain: `https://erp.kesh-amrit.vercel.app`
- The included `middleware.ts` rewrites that subdomain to `/erp`.
- In Vercel, add `erp.kesh-amrit.vercel.app` as a domain on the same project and point DNS to Vercel.

## Supabase Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Add these Vercel environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
SUPER_ADMIN_PASSWORD=choose_a_strong_admin_password
ADMIN_SESSION_SECRET=choose_a_long_random_secret
```

`SUPABASE_SERVICE_ROLE_KEY` also works as a legacy fallback if your project uses legacy keys.

## Local Commands

```powershell
npm install
npm run lint
npm run build
npm run dev -- -p 3000
```

## GitHub Upload Notes

Upload the source files only. Do not upload:

- `node_modules`
- `.next`
- `.env` or `.env.local`
- `.vercel`
- log files

