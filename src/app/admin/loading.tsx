import { Spinner } from "@/components/ui/spinner";

export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-rule">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-rule/70 rounded animate-pulse" />
          <div className="h-4 w-72 bg-rule/40 rounded animate-pulse" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-md border border-rule bg-surface px-3 py-1.5 shadow-2xs">
          <Spinner size="xs" variant="accent" />
          <span className="text-xs font-medium text-muted">Memuat data...</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-5 rounded-lg border border-rule bg-surface space-y-3 animate-pulse"
          >
            <div className="h-4 w-28 bg-rule/60 rounded" />
            <div className="h-8 w-16 bg-rule/80 rounded" />
            <div className="h-3 w-40 bg-rule/40 rounded" />
          </div>
        ))}
      </div>

      <div className="p-6 rounded-lg border border-rule bg-surface space-y-4 animate-pulse">
        <div className="h-5 w-40 bg-rule/60 rounded" />
        <div className="h-40 w-full bg-rule/30 rounded" />
      </div>
    </div>
  );
}

