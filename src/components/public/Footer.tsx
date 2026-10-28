import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                P
              </span>
              <span className="font-extrabold text-slate-900 tracking-tight">Pickora</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Curation engine for gear, technology, and essentials.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Recommendations
            </Link>
            <Link href="/login" className="hover:text-slate-900 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="pt-6 text-[11px] text-slate-400 space-y-2">
          <p>
            <strong>Affiliate Disclosure:</strong> Pickora is reader-supported. When you click through links on our site and make a purchase, we may earn an affiliate commission at no additional cost to you. We only recommend products we believe offer authentic value.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Pickora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

