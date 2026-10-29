"use client";

import * as React from "react";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    console.error("Application error captured by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper p-4 text-center">
      <div className="max-w-md w-full rounded-2xl border border-rule bg-surface p-8 shadow-sm space-y-6">
        <div className="size-12 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center mx-auto">
          <AlertOctagon className="size-6" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-ink tracking-tight">
            Unable to load curated index
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            We experienced an issue connecting to our database or fetching current recommendations. This may be temporary.
          </p>
          {error?.digest && (
            <p className="font-mono text-[10px] text-muted/70 bg-paper py-1 px-2 rounded border border-rule inline-block">
              Ref: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto gap-2 bg-ink text-paper hover:bg-ink/90 text-xs"
          >
            <RotateCcw className="size-3.5" />
            <span>Try Again</span>
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto gap-2 border-rule text-xs"
            >
              <Home className="size-3.5" />
              <span>Back to Index</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
