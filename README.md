# Aura

Marketing site and internal operations console for **Aura**, a B2B enterprise
software studio. The public site presents the product ecosystem (bilingual
EN/AR with full RTL support); the authenticated `/admin` area is a lightweight
business console: CRM pipeline, finance/invoicing, support tickets, project
management (kanban), content management, and analytics.

## Tech stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **Prisma 5** ORM on **MySQL/MariaDB**
- **Tailwind CSS 4** with a custom dark-first theme
- **framer-motion** for animation, **recharts** for analytics, **jspdf** for PDF export

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env        # then fill in the values (see below)

# 3. Set up the database
npx prisma generate
npx prisma db push          # create tables from prisma/schema.prisma
npm run seed                # optional: seed the product ecosystem + demo project

# 4. Run the dev server
npm run dev                 # http://localhost:3000
```

## Environment variables

See [`.env.example`](./.env.example) for the full list. The essentials:

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | MySQL/MariaDB connection string |
| `AUTH_SECRET` | yes (prod) | Signs admin session cookies (HMAC-SHA256). Use `openssl rand -hex 32` |
| `ADMIN_PASSWORD_HASH` *or* `ADMIN_PASSWORD` | yes | Admin login credential (see below) |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL for SEO metadata, sitemap, robots |

### Admin access

The `/admin` area is gated by a single shared password. Generate a hash and put
it in the environment (preferred over storing a plaintext password):

```bash
node scripts/hash-password.mjs "your-strong-password"
# copy the printed ADMIN_PASSWORD_HASH=... line into .env
```

Sessions are signed, expiring tokens — set a strong `AUTH_SECRET` in production
so they cannot be forged.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | `prisma generate` + production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run seed` | Seed the database (`prisma/seed.ts`) |

## Deployment

The app expects a reachable `DATABASE_URL` at runtime. The root layout degrades
gracefully (falls back to bundled ecosystem data) if the database is briefly
unreachable, so a DB blip will not take the whole site down. Remember to set
`AUTH_SECRET` and the admin credential in the production environment.
