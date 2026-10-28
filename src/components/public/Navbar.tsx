import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-black tracking-tight group-hover:bg-blue-700 transition-colors shadow-xs">
            P
          </span>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 tracking-tight text-lg leading-none">
              Pickora
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600">
              Curated Picks
            </span>
          </div>
        </Link>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs font-semibold border-slate-200 hover:border-slate-300"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
              <span>Admin Portal</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
