import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-rule bg-surface/95 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Pickora"
            width={136}
            height={28}
            priority
            className="h-7 w-auto object-contain dark:hidden"
          />
          <Image
            src="/logo-dark.png"
            alt="Pickora"
            width={136}
            height={28}
            priority
            className="h-7 w-auto object-contain hidden dark:inline-block"
          />
          <span className="font-mono text-[10px] text-muted border border-rule px-1.5 py-0.5 rounded hidden sm:inline-block">
            INDEX
          </span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
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

          <ThemeToggle />

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
