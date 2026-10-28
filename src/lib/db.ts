import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

// Node < 22 has no global WebSocket; the Neon driver needs one for transactions.
if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  return new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const db = globalThis.cachedPrisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.cachedPrisma = db;
}
