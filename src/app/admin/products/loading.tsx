import { Spinner } from "@/components/ui/spinner";

export default function AdminProductsLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <div className="space-y-1">
          <div className="h-7 w-32 bg-rule/70 rounded animate-pulse" />
          <div className="h-3 w-48 bg-rule/40 rounded animate-pulse" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-md border border-rule bg-surface px-3 py-1.5 shadow-2xs">
          <Spinner size="xs" variant="accent" />
          <span className="text-xs font-medium text-muted">Memuat daftar produk...</span>
        </div>
      </div>

      <div className="rounded-lg border border-rule bg-surface p-6 space-y-4 animate-pulse">
        <div className="h-10 w-full bg-rule/40 rounded" />
        <div className="h-14 w-full bg-rule/20 rounded" />
        <div className="h-14 w-full bg-rule/20 rounded" />
        <div className="h-14 w-full bg-rule/20 rounded" />
        <div className="h-14 w-full bg-rule/20 rounded" />
      </div>
    </div>
  );
}

