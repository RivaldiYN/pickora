export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-paper animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 w-full border-b border-rule bg-surface/90" />

      {/* Hero skeleton */}
      <div className="border-b border-rule bg-paper py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-4 w-48 bg-rule/70 rounded" />
          <div className="h-10 w-3/4 max-w-xl bg-rule/70 rounded" />
          <div className="h-4 w-1/2 max-w-md bg-rule/50 rounded" />
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="w-full border-b border-rule bg-surface py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-hidden">
          <div className="h-8 w-28 bg-rule/60 rounded" />
          <div className="h-8 w-24 bg-rule/40 rounded" />
          <div className="h-8 w-32 bg-rule/40 rounded" />
          <div className="h-8 w-20 bg-rule/40 rounded" />
        </div>
      </div>

      {/* Main product cards grid skeleton */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-lg border border-rule bg-surface p-4 space-y-4"
            >
              <div className="aspect-[4/3] w-full rounded-md bg-rule/50" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-rule/60 rounded" />
                <div className="h-3 w-full bg-rule/40 rounded" />
                <div className="h-3 w-2/3 bg-rule/40 rounded" />
              </div>
              <div className="pt-3 border-t border-rule/50 flex gap-2">
                <div className="h-10 w-20 bg-rule/40 rounded" />
                <div className="h-10 flex-1 bg-rule/60 rounded" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
