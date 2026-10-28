"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { loginAction } from "@/lib/actions/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await loginAction({
        email: email.trim(),
        password,
      });

      if (res?.success) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError(res?.message || "Invalid credentials");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader className="space-y-1 pb-4">
        <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
          <Lock className="h-5 w-5" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight">Admin Sign In</CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Access the Pickora affiliate curation dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@pickora.local"
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in to Dashboard"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-between px-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Public Site
          </Link>

          <span className="text-xs text-slate-400">Pickora Security</span>
        </div>

        <Suspense
          fallback={
            <div className="p-8 text-center text-sm text-slate-400 bg-white rounded-xl border border-slate-200">
              Loading security portal...
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <p className="text-center text-xs text-slate-400">
          Pickora Curated Affiliate Platform &bull; Protected Route
        </p>
      </div>
    </div>
  );
}
