import { Prisma } from "@prisma/client";
import { auth } from "@/auth";

export class UnauthorizedError extends Error {}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();
  return session.user;
}

// Map internal errors to messages that are safe to show in the browser.
export function toUserMessage(error: unknown, fallback: string): string {
  if (error instanceof UnauthorizedError) return "Your session expired. Sign in again.";
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") return "That name or slug is already taken.";
    if (error.code === "P2025") return "This item no longer exists. Refresh the page.";
    if (error.code === "P2003") return "The selected category no longer exists.";
  }
  console.error(error);
  return fallback;
}

