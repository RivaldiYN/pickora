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
  price?: number | null;
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
        <div className="size-12 bg-surface border border-rule text-muted rounded-md flex items-center justify-center mx-auto mb-3">
          <PackageSearch className="size-6" />
        </div>
        <h3 className="text-base font-semibold text-ink">
          No recommendations found
        </h3>
        <p className="text-xs text-muted mt-1">
          {currentCategoryName && currentCategoryName !== "All Products"
            ? `No curated items currently listed in ${currentCategoryName}.`
            : "No items match your filter criteria."}
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6" aria-labelledby="catalog-heading">
      <div className="flex items-center justify-between pb-2 border-b border-rule">
        <h2 id="catalog-heading" className="font-mono text-xs text-muted uppercase tracking-wider font-semibold">
          Exhibit: {currentCategoryName || "All Products"} ({products.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
