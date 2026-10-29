import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-surface mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-rule">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-ink text-base tracking-tight">Pickora</span>
              <span className="font-mono text-[10px] text-muted border border-rule px-1.5 py-0.5 rounded">
                CURATED INDEX
              </span>
            </div>
            <p className="text-xs text-muted max-w-sm leading-relaxed">
              An independent curated directory of tested gear, audio hardware, cycling accessories, and desk essentials. Verified retail connections with zero paid ranking.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-semibold text-ink uppercase tracking-wider">
              Directory
            </h3>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link href="/" className="hover:text-ink transition-colors">
                  All Curations
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ink transition-colors">
                  About &amp; Methodology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ink transition-colors">
                  Contact Editorial
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-ink transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Col */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-semibold text-ink uppercase tracking-wider">
              Legal &amp; Policy
            </h3>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link href="/privacy" className="hover:text-ink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-ink transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="hover:text-ink transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  Ad Choices &amp; Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted">
          <p className="max-w-2xl leading-relaxed">
            Pickora is reader-supported. When you purchase through links on our site, we may earn an affiliate commission at no extra cost to you.
          </p>
          <p className="font-mono text-[11px] text-muted/70 whitespace-nowrap">
            &copy; {new Date().getFullYear()} Pickora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
