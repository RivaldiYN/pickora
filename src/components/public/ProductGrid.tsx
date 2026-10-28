import { PackageSearch } from "lucide-react";
import { ProductCard } from "./ProductCard";

interface Category {
  name: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  price?: any;
  featured?: boolean;
  category: Category;
}

interface ProductGridProps {
  products: Product[];
  currentCategoryName?: string;
}

export function ProductGrid({ products, currentCategoryName }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24 px-4 max-w-md mx-auto">
        <div className="h-16 w-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <PackageSearch className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          No recommendations found
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          {currentCategoryName
            ? `We haven't added any curated items in ${currentCategoryName} yet. Check back soon!`
            : "No items match your selected filter."}
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Showing {products.length} {products.length === 1 ? "recommendation" : "recommendations"}
          {currentCategoryName && currentCategoryName !== "All Products" && (
            <span> in <span className="text-slate-900 font-bold">{currentCategoryName}</span></span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

