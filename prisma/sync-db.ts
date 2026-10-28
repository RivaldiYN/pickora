import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing from environment variables");
}

const sql = neon(connectionString);

async function syncSchema() {
  console.log("Applying schema to Neon PostgreSQL...");

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      role TEXT NOT NULL DEFAULT 'ADMIN',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON categories(slug);
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      "imageUrl" TEXT NOT NULL,
      "affiliateUrl" TEXT NOT NULL,
      price DECIMAL(10, 2),
      featured BOOLEAN NOT NULL DEFAULT false,
      "categoryId" TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS "products_categoryId_idx" ON products("categoryId");
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS "products_createdAt_idx" ON products("createdAt");
  `;

  console.log("Schema successfully synced to Neon PostgreSQL!");
}

syncSchema().catch((err) => {
  console.error("Schema sync failed:", err);
  process.exit(1);
});

