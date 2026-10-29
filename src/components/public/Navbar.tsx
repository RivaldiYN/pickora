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

        <nav className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-5 text-xs font-medium text-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Picks
            </Link>
            <Link href="/about" className="hover:text-ink transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-ink transition-colors">
              Contact
            </Link>
          </div>

          <Link href="/admin">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs font-medium border-rule hover:bg-surface"
            >
              <ShieldCheck className="size-3.5 text-muted" />
              <span>Admin</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
