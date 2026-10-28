export function HeroBanner() {
  return (
    <section className="border-b border-rule bg-paper py-12 sm:py-16" aria-labelledby="hero-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-accent" aria-hidden="true" />
          <p className="font-mono text-xs text-muted uppercase tracking-wider">
            Verified Editorial Index · Updated Daily
          </p>
        </div>
        <h1 id="hero-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink max-w-3xl leading-tight">
          Tested tools, performance gear, and everyday hardware.
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-2xl font-normal leading-relaxed">
          Independent product curation across running, cycling, audio, and desk setups. Every recommendation links directly to verified retail partners with genuine transparent pricing.
        </p>
      </div>
    </section>
  );
}
