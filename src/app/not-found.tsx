import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper p-4 text-center">
      <div className="max-w-md w-full rounded-2xl border border-rule bg-surface p-8 shadow-sm space-y-6">
        <div className="size-12 rounded-xl bg-paper border border-rule text-muted flex items-center justify-center mx-auto">
          <Compass className="size-6 text-accent" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-accent font-semibold">
            ERROR 404
          </span>
          <h1 className="text-2xl font-bold text-ink tracking-tight">
            Curated item not found
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            The gear recommendation, review, or category you are looking for may have been archived, renamed, or moved.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button className="gap-2 bg-ink text-paper hover:bg-ink/90 text-xs px-5">
              <Home className="size-3.5" />
              <span>Return to Curated Index</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
