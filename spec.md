# Pickora — Technical Specification

## 1. Architecture Overview
- **Framework**: Next.js 14+ (App Router, React Server Components)
- **Styling**: Tailwind CSS + Shadcn UI (accessible Radix primitives)
- **Database**: PostgreSQL (Supabase / Neon)
- **ORM**: Prisma ORM
- **Authentication**: NextAuth.js (Credentials Provider for Admin)
- **Validation**: Zod
- **Public Access**: Open to all viewers (no login required for browsing, filtering, and clicking affiliate links).
- **Admin Access**: Protected `/admin` routes requiring authentication via NextAuth.

---

## 2. Directory Structure

```text
pickora/
├── prisma/
│   ├── schema.prisma          # Database models & relations
│   └── seed.ts                # Initial admin user & default categories
├── src/
│   ├── app/
│   │   ├── (public)/          # Public route group (no login needed)
│   │   │   ├── layout.tsx     # Public layout (Header, Nav, Footer)
│   │   │   └── page.tsx       # Main product showcase with category filtering
│   │   ├── admin/             # Protected admin route group
│   │   │   ├── layout.tsx     # Admin dashboard sidebar & header
│   │   │   ├── page.tsx       # Admin dashboard stats overview
│   │   │   ├── categories/    # Category management (list, add, edit, delete)
│   │   │   │   └── page.tsx
│   │   │   └── products/      # Product management (list, add, edit, delete)
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/route.ts  # NextAuth API route
│   │   ├── login/
│   │   │   └── page.tsx       # Admin login screen
│   │   ├── globals.css
│   │   └── layout.tsx         # Root HTML/Body layout
│   ├── components/
│   │   ├── ui/                # Shadcn primitives (button, dialog, card, badge, input, etc.)
│   │   ├── public/
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── CategoryFilters.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── Footer.tsx
│   │   └── admin/
│   │       ├── AdminNav.tsx
│   │       ├── CategoryTable.tsx
│   │       ├── CategoryDialog.tsx
│   │       ├── ProductTable.tsx
│   │       ├── ProductDialog.tsx
│   │       └── DeleteConfirmDialog.tsx
│   ├── lib/
│   │   ├── auth.ts            # NextAuth options & handlers
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── validations.ts     # Zod schemas (category, product, auth)
│   │   └── actions/           # Server actions
│   │       ├── categories.ts  # createCategory, updateCategory, deleteCategory
│   │       └── products.ts    # createProduct, updateProduct, deleteProduct
│   └── middleware.ts          # Route protection for /admin/:path*
├── .env.example
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 3. Database Schema (Prisma)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // Hashed with bcryptjs
  name      String?
  role      String   @default("ADMIN")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([slug])
  @@map("categories")
}

model Product {
  id           String   @id @default(cuid())
  title        String
  description  String
  imageUrl     String
  affiliateUrl String
  price        Decimal? @db.Decimal(10, 2)
  featured     Boolean  @default(false)
  categoryId   String
  category     Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([categoryId])
  @@index([createdAt])
  @@map("products")
}
```

---

## 4. Validation Schemas (Zod)

```typescript
// src/lib/validations.ts
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and dashes"),
  description: z.string().max(255).optional(),
});

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000),
  imageUrl: z.string().url("Must be a valid URL"),
  affiliateUrl: z.string().url("Must be a valid URL"),
  categoryId: z.string().min(1, "Please select a category"),
  price: z.coerce.number().positive().optional().nullable(),
  featured: z.boolean().default(false),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
```

---

## 5. Security & Authentication Flow
1. **Public Browsing**: Home page `/` is open to everyone. No authentication required to view products, filter categories, or follow affiliate links.
2. **NextAuth Middleware**: Protects `/admin` and all its child routes. Unauthenticated visitors are redirected to `/login?callbackUrl=/admin`.
3. **Session Strategy**: JWT session tokens with strict cookie settings (`httpOnly`, `secure`, `sameSite: "lax"`).
4. **Server Actions Authorization**: Category & product mutations check session validity on the server before mutating database records.
5. **Input Validation**: All payloads are validated via Zod schemas before database writes.
6. **Rel Attributes**: External affiliate links render with `target="_blank" rel="noopener noreferrer sponsored"`.

---

## 6. Environment Variables (`.env.example`)

```env
# PostgreSQL connection (Supabase / Neon)
DATABASE_URL="postgresql://user:password@host:5432/pickora?sslmode=require"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secure-32-byte-secret"

# Admin Initial Seed Credentials
ADMIN_EMAIL="admin@pickora.local"
ADMIN_PASSWORD="super-secret-temp-password"
```

