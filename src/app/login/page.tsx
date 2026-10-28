import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { safeCallbackPath } from "@/lib/utils";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Admin sign in | Pickora",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const target = safeCallbackPath(callbackUrl);

  const session = await auth();
  if (session?.user) redirect(target);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink"
        >
          Back to the picks
        </Link>

        <div className="mt-4 rounded-lg border border-rule bg-surface p-6 sm:p-8">
          <h1 className="text-xl font-semibold">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted">Manage categories and product picks.</p>
          <LoginForm callbackPath={target} />
        </div>
      </div>
    </main>
  );
}
