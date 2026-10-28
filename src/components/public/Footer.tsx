import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-surface mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-rule">
          <div>
            <span className="font-bold text-ink text-sm">Pickora</span>
            <p className="text-xs text-muted mt-0.5">
              Curated product index and affiliate recommendations.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Picks
            </Link>
            <Link href="/admin" className="hover:text-ink transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>

        <div className="pt-6 text-xs text-muted space-y-1">
          <p>
            Pickora is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you.
          </p>
          <p className="font-mono text-[11px] text-muted/70">
            &copy; {new Date().getFullYear()} Pickora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
