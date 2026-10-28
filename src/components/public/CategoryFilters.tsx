"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
  const activeCategory = searchParams.get("category") || "all";

  const handleSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    const query = params.toString() ? `?${params.toString()}` : "/";
    router.push(query, { scroll: false });
  };

  return (
    <div className="w-full border-b border-rule bg-surface sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => handleSelect("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border min-h-9",
              activeCategory === "all"
                ? "bg-ink text-white border-ink"
                : "bg-surface text-muted border-rule hover:border-ink hover:text-ink"
            )}
          >
            All Products ({totalProductCount})
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelect(cat.slug)}
                className={cn(
                  "px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border min-h-9",
                  isActive
                    ? "bg-accent text-white border-accent"
                    : "bg-surface text-muted border-rule hover:border-ink hover:text-ink"
                )}
              >
                {cat.name}
                {cat.productCount !== undefined && (
                  <span
                    className={cn(
                      "ml-1.5 text-[11px]",
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
