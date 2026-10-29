import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/public/Navbar";
import { HeroBanner } from "@/components/public/HeroBanner";
import { CategoryFilters } from "@/components/public/CategoryFilters";
import { ProductGrid } from "@/components/public/ProductGrid";
import { Footer } from "@/components/public/Footer";
import { AdBanner } from "@/components/public/AdBanner";
import { CookieConsent } from "@/components/public/CookieConsent";
import { listCategories, listProducts, type SortOption } from "@/lib/queries";
import { siteConfig, getSiteUrl, toAbsoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string; sort?: SortOption }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { category: categorySlug, q } = await searchParams;
  const siteUrl = getSiteUrl();

  if (q) {
    return {
      title: `Search results for "${q}" | Pickora`,
      description: `Browse curated gear and hardware recommendations matching "${q}" on Pickora.`,
    };
  }

  if (!categorySlug) {
    return {
      title: siteConfig.title,
      description: siteConfig.description,
      alternates: {
        canonical: siteUrl,
      },
      openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: siteUrl,
      },
      twitter: {
        title: siteConfig.title,
        description: siteConfig.description,
      },
    };
  }

  const categories = await listCategories();
  const currentCategory = categories.find((c) => c.slug === categorySlug);
  const categoryName = currentCategory?.name || categorySlug;

  const title = `Best ${categoryName} Gear & Recommendations | Pickora`;
  const description = currentCategory?.description
    ? `${currentCategory.description} Curated, tested, and reviewed by the Pickora team.`
    : `Explore curated ${categoryName} recommendations on Pickora. Tested gear, specs, and direct official retail links.`;

  const canonicalUrl = `${siteUrl}/?category=${encodeURIComponent(categorySlug)}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const { category: categorySlug, q, sort } = await searchParams;

  const [categories, products] = await Promise.all([
    listCategories(),
    listProducts({
      categorySlug,
      search: q,
      sort,
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const currentCategoryName = activeCategory?.name || (categorySlug ? categorySlug : "All Products");

  const totalProductCount = categories.reduce((sum, c) => sum + c.productCount, 0);
  const siteUrl = getSiteUrl();

  // Generate Schema.org JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteConfig.name,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#itemlist`,
        name: currentCategoryName,
        description: `Curated recommendation index for ${currentCategoryName}`,
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: toAbsoluteUrl(product.imageUrl),
            category: product.category.name,
            offers: {
              "@type": "Offer",
              price: product.price || 0,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: `${siteUrl}/api/out/${product.id}`,
            },
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <HeroBanner />
      <Suspense fallback={<div className="w-full h-14 border-b border-rule bg-surface" />}>
        <CategoryFilters
          categories={categories}
          totalProductCount={totalProductCount}
        />
      </Suspense>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        <ProductGrid
          products={products}
          currentCategoryName={currentCategoryName}
        />

        {/* Responsive Google Ads Placement Container */}
        <AdBanner
          slot="3456789012"
          format="horizontal"
          label="FEATURED SPONSOR / ADVERTISEMENT"
        />
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
}
