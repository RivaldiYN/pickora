export function HeroBanner() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 py-12 sm:py-16">
      {/* Decorative subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 shadow-2xs">
          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          Handpicked & Tested Affiliate Gear
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-[1.15]">
          Curated recommendations for the essentials you actually need.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
          No generic algorithmic lists. We discover, filter, and recommend high-grade gear across running, cycling, technology, and everyday carry.
        </p>

        {/* Credibility highlights */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold">✓</span> Direct Retailer Links
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold">✓</span> Handpicked Quality
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold">✓</span> Updated Weekly
          </div>
        </div>
      </div>
    </section>
  );
}
