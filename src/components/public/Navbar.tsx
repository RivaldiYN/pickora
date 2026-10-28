import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-rule bg-surface/95 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-ink tracking-tight text-lg">
            Pickora
          </span>
          <span className="font-mono text-[10px] text-muted border border-rule px-1.5 py-0.5 rounded">
            INDEX
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs font-medium"
            >
              <ShieldCheck className="size-3.5 text-muted" />
              <span>Admin</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
