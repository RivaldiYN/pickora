"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount?: number;
}

interface CategoryFiltersProps {
  categories: Category[];
  totalProductCount: number;
}

export function CategoryFilters({
  categories,
  totalProductCount,
}: CategoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();
  const [pendingCategory, setPendingCategory] = React.useState<string | null>(null);

  const activeCategory = searchParams.get("category") || "all";
  const activeSort = searchParams.get("sort") || "latest";
  const activeSearch = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = React.useState(activeSearch);

  // Sync state if URL changes externally
  React.useEffect(() => {
    setSearchTerm(activeSearch);
  }, [activeSearch]);

  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (!val || val === "all" || val === "latest") {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    const query = params.toString() ? `?${params.toString()}` : "/";
    startTransition(() => {
      router.push(query, { scroll: false });
    });
  };

  const handleSelectCategory = (slug: string) => {
    setPendingCategory(slug);
    updateUrl({ category: slug });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrl({ sort: e.target.value });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ q: searchTerm.trim() || null });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    updateUrl({ q: null });
  };

  return (
    <div className="w-full border-b border-rule bg-surface sticky top-16 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
        {/* Top Controls: Search Bar & Sort Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-1 max-w-md flex items-center"
          >
            {isPending ? (
              <Loader2 className="absolute left-3 size-4 text-accent animate-spin pointer-events-none" />
            ) : (
              <Search className="absolute left-3 size-4 text-muted pointer-events-none" />
            )}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search gear, brand, or model..."
              className="w-full h-9 pl-9 pr-8 text-xs bg-paper border border-rule rounded-md text-ink placeholder:text-muted focus:outline-none focus:border-ink"
            />
            {searchTerm && !isPending && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 text-muted hover:text-ink p-0.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
            {isPending && (
              <span className="absolute right-2.5 text-[10px] font-mono text-accent">
                Searching...
              </span>
            )}
          </form>

          {/* Right side: Sort Selector & Loading indicator */}
          <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
            {isPending && (
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-accent/10 text-accent text-[11px] font-medium animate-pulse">
                <Loader2 className="size-3 animate-spin shrink-0" />
                <span>Memperbarui data...</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-3.5 text-muted shrink-0" />
              <span className="text-muted hidden sm:inline">Sort:</span>
              <select
                value={activeSort}
                onChange={handleSortChange}
                disabled={isPending}
                className="h-9 px-2.5 py-1 text-xs bg-paper border border-rule rounded-md text-ink font-medium focus:outline-none focus:border-ink cursor-pointer disabled:opacity-60"
              >
                <option value="latest">Latest Recommendations</option>
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => handleSelectCategory("all")}
            disabled={isPending}
            className={cn(
              "px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border min-h-8 inline-flex items-center gap-1.5 disabled:opacity-80",
              activeCategory === "all"
                ? "bg-ink text-paper border-ink"
                : "bg-surface text-muted border-rule hover:border-ink hover:text-ink"
            )}
          >
            {isPending && pendingCategory === "all" && (
              <Loader2 className="size-3 animate-spin shrink-0" />
            )}
            <span>All Categories ({totalProductCount})</span>
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            const isCategoryPending = isPending && pendingCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.slug)}
                disabled={isPending}
                className={cn(
                  "px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border min-h-8 inline-flex items-center gap-1.5 disabled:opacity-80",
                  isActive
                    ? "bg-accent text-white border-accent"
                    : "bg-surface text-muted border-rule hover:border-ink hover:text-ink"
                )}
              >
                {isCategoryPending && (
                  <Loader2 className="size-3 animate-spin shrink-0" />
                )}
                <span>{cat.name}</span>
                {cat.productCount !== undefined && (
                  <span
                    className={cn(
                      "text-[11px]",
                      isActive ? "text-white/80" : "text-muted"
                    )}
                  >
                    ({cat.productCount})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
