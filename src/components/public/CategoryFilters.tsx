"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    products: number;
  };
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
    <div className="w-full border-b border-slate-200/80 bg-white sticky top-16 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => handleSelect("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border",
              activeCategory === "all"
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            All Products ({totalProductCount})
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.slug)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border",
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {cat.name}
                {cat._count?.products !== undefined && (
                  <span
                    className={cn(
                      "ml-1.5 text-[10px] font-normal",
                      isActive ? "text-blue-100" : "text-slate-400"
                    )}
                  >
                    ({cat._count.products})
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

