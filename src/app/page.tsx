import { Navbar } from "@/components/public/Navbar";
import { HeroBanner } from "@/components/public/HeroBanner";
import { CategoryFilters } from "@/components/public/CategoryFilters";
import { ProductGrid } from "@/components/public/ProductGrid";
import { Footer } from "@/components/public/Footer";
import { listCategories, listProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pickora — Curated Product Index",
  description:
    "Direct affiliate recommendations for running, cycling, audio, and desk setups.",
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { category: categorySlug } = await searchParams;

  const [categories, products] = await Promise.all([
    listCategories(),
    listProducts(categorySlug),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const currentCategoryName = activeCategory?.name || (categorySlug ? categorySlug : "All Products");

  const totalProductCount = categories.reduce((sum, c) => sum + c.productCount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />
      <HeroBanner />
      <CategoryFilters
        categories={categories}
        totalProductCount={totalProductCount}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <ProductGrid
          products={products}
          currentCategoryName={currentCategoryName}
        />
      </main>

      <Footer />
    </div>
  );
}
