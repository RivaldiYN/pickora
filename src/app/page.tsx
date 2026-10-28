import { Navbar } from "@/components/public/Navbar";
import { HeroBanner } from "@/components/public/HeroBanner";
import { CategoryFilters } from "@/components/public/CategoryFilters";
import { ProductGrid } from "@/components/public/ProductGrid";
import { Footer } from "@/components/public/Footer";
import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pickora — Curated Affiliate Product Recommendations",
  description:
    "Handpicked recommendations for high-performance gear, cycling tech, audio gadgets, and everyday essentials.",
};

// Fallback items in case database has not yet been seeded
const fallbackCategories = [
  { id: "cat-1", name: "Running", slug: "running", _count: { products: 2 } },
  { id: "cat-2", name: "Cycling", slug: "cycling", _count: { products: 2 } },
  { id: "cat-3", name: "Tech & Audio", slug: "tech", _count: { products: 2 } },
  { id: "cat-4", name: "Random Finds", slug: "random", _count: { products: 1 } },
];

const fallbackProducts = [
  {
    id: "prod-1",
    title: "Nike Vaporfly 3 Carbon Road Shoes",
    description: "Engineered for marathoners chasing peak pace with full-length carbon Flyplate and ultra-responsive ZoomX foam.",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    affiliateUrl: "https://example.com/affiliate/nike-vaporfly-3",
    price: 259.99,
    featured: true,
    category: { name: "Running", slug: "running" },
  },
  {
    id: "prod-2",
    title: "Garmin Forerunner 965 AMOLED GPS",
    description: "Premium titanium bezel lightweight multisport watch with brilliant AMOLED touchscreen and advanced training metrics.",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    affiliateUrl: "https://example.com/affiliate/garmin-forerunner-965",
    price: 599.99,
    featured: true,
    category: { name: "Running", slug: "running" },
  },
  {
    id: "prod-3",
    title: "Wahoo ELEMNT BOLT V2 GPS Computer",
    description: "Aerodynamic cycling computer featuring crystal-clear 64-color screen, turnkey navigation, and wireless route sync.",
    imageUrl: "https://images.unsplash.com/photo-1502744688674-c619d3f86c9e?auto=format&fit=crop&w=800&q=80",
    affiliateUrl: "https://example.com/affiliate/wahoo-elemnt-bolt-v2",
    price: 279.0,
    featured: true,
    category: { name: "Cycling", slug: "cycling" },
  },
  {
    id: "prod-4",
    title: "POC Omne Air MIPS Aero Road Helmet",
    description: "Slim profile and precision ventilation channels with integrated MIPS 360-degree rotational impact protection.",
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    affiliateUrl: "https://example.com/affiliate/poc-omne-air-mips",
    price: 180.0,
    featured: false,
    category: { name: "Cycling", slug: "cycling" },
  },
  {
    id: "prod-5",
    title: "Sony WH-1000XM5 Noise Cancelling Headphones",
    description: "Industry-leading dual-processor noise cancellation, ultra-comfortable lightweight design, and 30-hour battery life.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    affiliateUrl: "https://example.com/affiliate/sony-wh1000xm5",
    price: 349.99,
    featured: true,
    category: { name: "Tech & Audio", slug: "tech" },
  },
  {
    id: "prod-6",
    title: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    description: "Full CNC aluminum body, hot-swappable tactile switches, and double-gasket acoustic dampening for pure typing precision.",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    affiliateUrl: "https://example.com/affiliate/keychron-q1-pro",
    price: 199.0,
    featured: false,
    category: { name: "Tech & Audio", slug: "tech" },
  },
  {
    id: "prod-7",
    title: "Titanium EDC Multi-Tool Carabiner",
    description: "Precision-machined Grade 5 titanium pocket multitool with integrated bottle opener, pry bar, and hex wrenches.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    affiliateUrl: "https://example.com/affiliate/titanium-edc-carabiner",
    price: 45.0,
    featured: false,
    category: { name: "Random Finds", slug: "random" },
  },
];

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const categorySlug = resolvedParams?.category;

  let dbCategories = await getCategories();
  let dbProducts = await getProducts({ categorySlug });

  // Use database data when available; fallback gracefully if DB is not yet populated
  const categories =
    dbCategories.length > 0
      ? dbCategories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          _count: { products: c._count?.products ?? 0 },
        }))
      : fallbackCategories;

  let products = dbProducts.length > 0 ? (dbProducts as any) : fallbackProducts;

  if (dbProducts.length === 0 && categorySlug && categorySlug !== "all") {
    products = fallbackProducts.filter(
      (p) => p.category.slug.toLowerCase() === categorySlug.toLowerCase()
    );
  }

  const activeCategoryObj = categories.find((c) => c.slug === categorySlug);
  const currentCategoryName = activeCategoryObj?.name || (categorySlug ? categorySlug : "All Products");

  const totalProductCount = categories.reduce(
    (acc, curr) => acc + (curr._count?.products ?? 0),
    0
  ) || products.length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <HeroBanner />
      <CategoryFilters
        categories={categories}
        totalProductCount={totalProductCount}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <ProductGrid
          products={products}
          currentCategoryName={currentCategoryName}
        />
      </main>

      <Footer />
    </div>
  );
}
