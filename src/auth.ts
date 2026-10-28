import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validations";

// Prevent accidental localhost redirects if local .env was copied to Vercel
if (process.env.VERCEL || process.env.NODE_ENV === "production") {
  const liveDomain =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "usepickora.vercel.app";

  const hostUrl = liveDomain.startsWith("http")
    ? liveDomain
    : `https://${liveDomain}`;

  if (process.env.NEXTAUTH_URL?.includes("localhost")) {
    process.env.NEXTAUTH_URL = hostUrl;
  }
  if (process.env.AUTH_URL?.includes("localhost")) {
    process.env.AUTH_URL = hostUrl;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Required for `next start` and self-hosting; Vercel sets this implicitly.
  trustHost: true,
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await db.user.findUnique({ where: { email } });
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? "Admin",
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "ADMIN";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
