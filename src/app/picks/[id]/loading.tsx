import { Spinner } from "@/components/ui/spinner";

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-paper relative">
      <div className="h-16 w-full border-b border-rule bg-surface/90" />

      {/* Floating Spinner Banner */}
      <div className="sticky top-4 z-40 flex justify-center pointer-events-none px-4">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-rule bg-surface/95 px-4 py-2 shadow-md backdrop-blur-xs">
          <Spinner size="sm" variant="accent" />
          <span className="text-xs font-medium text-ink">
            Memuat detail produk & ulasan...
          </span>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-pulse space-y-8">
        <div className="h-4 w-40 bg-rule/70 rounded" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="aspect-[4/3] rounded-xl bg-rule/40 border border-rule" />
          <div className="space-y-4">
            <div className="h-4 w-24 bg-rule/60 rounded" />
            <div className="h-8 w-3/4 bg-rule/70 rounded" />
            <div className="h-6 w-32 bg-rule/50 rounded" />
            <div className="h-24 w-full bg-rule/30 rounded" />
            <div className="h-12 w-full bg-rule/60 rounded-md" />
          </div>
        </div>
      </main>
    </div>
  );
}

