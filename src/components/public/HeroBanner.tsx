export function HeroBanner() {
  return (
    <section className="border-b border-rule bg-paper py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <p className="font-mono text-xs text-muted uppercase tracking-wider">
          Curated Product Index
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink max-w-2xl leading-tight">
          Tested tools, performance gear, and everyday hardware.
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-xl font-normal leading-relaxed">
          Direct affiliate recommendations for running, cycling, audio, and desk setups. Every link leads straight to the official retail partner.
        </p>
      </div>
    </section>
  );
}

