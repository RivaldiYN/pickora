# Pickora — Curated Affiliate Product Recommendation Platform

Pickora is a full-stack, curated product recommendation website built with Next.js (App Router), Tailwind CSS, Prisma ORM, and NextAuth.js.

## Key Features

1. **Public Showcase (No login required)**:
   - Immediate display of curated affiliate recommendations.
   - Dynamic category filter bar (Running, Cycling, Tech & Audio, Random Finds, etc.) powered by URL search params.
   - Multi-column card layout with crisp imagery, badges, pricing, and direct affiliate CTA buttons opening in a new tab (`target="_blank" rel="noopener noreferrer sponsored"`).
   - Fully responsive, clean corporate-deck visual design.

2. **Protected Admin Dashboard (`/admin`)**:
   - Guarded by NextAuth proxy middleware.
   - Dual-mode product imagery: direct photo upload (JPG, PNG, WEBP, GIF, AVIF up to 5MB) saved directly to Neon Object Storage (`assets` bucket) or external URL.
   - Persistent asset serving route `/api/assets/[...key]` with immutable HTTP cache headers.
   - Full CRUD for Categories (Name, Slug, Description).
   - Full CRUD for Products (Title, Description, Image URL/File, Category, Affiliate URL, Price, Featured toggle).
   - Overview metrics and quick actions.

3. **Production & Security**:
   - Zero-trust input validation using Zod.
   - Safe SQL execution via Prisma ORM.
   - Automated Prisma client generation on build (`postinstall: prisma generate`).

---

## Getting Started

### 1. Environment Configuration

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set your values in `.env`:
- `DATABASE_URL`: PostgreSQL connection string (Supabase or Neon Free Tier).
- `NEXTAUTH_SECRET`: Secret key for JWT session encryption (generate with `openssl rand -base64 32`).
- `ADMIN_EMAIL`: Initial admin login email (default: `admin@pickora.local`).
- `ADMIN_PASSWORD`: Initial admin login password (default: `adminpassword123`).

### 2. Database Migration & Seeding

Sync the database schema with your PostgreSQL instance:
```bash
npm run db:push
```

Seed the default categories and curated recommendations:
```bash
npm run db:seed
```

### 3. Run Development Server

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) to view the public recommendation catalog.
- Open [http://localhost:3000/admin](http://localhost:3000/admin) to log in to the admin panel.

---

## Deployment to Vercel

1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Under **Environment Variables**, add:
   - `DATABASE_URL` (Supabase / Neon connection URL)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (e.g. `https://your-domain.vercel.app`)
   - `AUTH_SECRET`
4. Deploy. The `postinstall` script runs `prisma generate` automatically during the Vercel build.
