import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { ProductCard } from "@/components/public/ProductCard";
import { AdBanner } from "@/components/public/AdBanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductById, listRelatedProducts } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";
import { getSiteUrl, siteConfig } from "@/lib/seo";
import {
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/picks/${product.id}`;
  const title = `${product.title} Review & Recommendation | Pickora`;
  const description = `${product.description.slice(0, 160)}... Tested and curated by Pickora. Verified retail purchase link included.`;

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
      images: [
        {
          url: product.imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await listRelatedProducts(product.id, product.categoryId, 3);
  const formattedPrice = formatCurrency(product.price);
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/picks/${product.id}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.imageUrl,
    description: product.description,
    category: product.category.name,
    offers: {
      "@type": "Offer",
      price: product.price ?? 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/api/out/${product.id}`,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs text-muted mb-8 overflow-x-auto pb-2"
        >
          <Link href="/" className="hover:text-ink transition-colors flex items-center gap-1 shrink-0">
            <ArrowLeft className="size-3" />
            <span>Curations</span>
          </Link>
          <ChevronRight className="size-3 text-muted/60 shrink-0" />
          <Link
            href={`/?category=${encodeURIComponent(product.category.slug)}`}
            className="hover:text-ink transition-colors shrink-0"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="size-3 text-muted/60 shrink-0" />
          <span className="text-ink font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* 2-Column Hero Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image & Media */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface border border-rule shadow-xs p-4 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.title}
                className="max-h-full max-w-full object-contain rounded-lg"
              />

              {formattedPrice && (
                <div className="absolute top-4 right-4">
                  <span className="font-mono rounded-lg bg-ink px-3.5 py-1.5 text-sm sm:text-base font-semibold text-paper shadow-md">
                    {formattedPrice}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-muted px-1">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <ShieldCheck className="size-3.5 text-accent" />
                VERIFIED EDITORIAL SPECIFICATION
              </span>
              <span>Updated recently</span>
            </div>
          </div>

          {/* Right Column: Key Details & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/?category=${encodeURIComponent(product.category.slug)}`}>
                  <Badge variant="outline" className="text-xs font-medium hover:border-ink cursor-pointer">
                    {product.category.name}
                  </Badge>
                </Link>
                {product.featured && (
                  <Badge variant="accent" className="text-[10px] uppercase font-bold tracking-wider">
                    Editor&apos;s Pick
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight leading-snug">
                {product.title}
              </h1>

              {formattedPrice && (
                <div className="pt-1">
                  <div className="text-xs font-mono text-muted uppercase tracking-wider">
                    Retail Price Target
                  </div>
                  <div className="text-2xl font-bold font-mono text-ink mt-0.5">
                    {formattedPrice}
                  </div>
                </div>
              )}
            </div>

            {/* Outbound Purchase Box */}
            <div className="rounded-xl border border-rule bg-surface p-5 space-y-4 shadow-xs">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-ink flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Official Retailer Link Verified
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Direct connection with manufacturer or authorized partner. Returns and warranties fully honored.
                </p>
              </div>

              <a
                href={`/api/out/${product.id}`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-semibold py-3 px-5 transition-colors shadow-xs"
              >
                <span>Check Live Price &amp; Buy on Retailer</span>
                <ExternalLink className="size-4" />
              </a>

              <p className="text-[11px] text-muted text-center">
                When you purchase through our links, Pickora may earn a small affiliate commission.
              </p>
            </div>

            {/* Quick Share / Metadata */}
            <div className="flex items-center justify-between pt-2 border-t border-rule text-xs text-muted">
              <span className="font-mono text-[11px]">ID: {product.id}</span>
              <div className="flex items-center gap-3">
                <span className="font-medium text-ink">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.title)}&url=${encodeURIComponent(canonicalUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  Twitter/X
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${product.title} - ${canonicalUrl}`)}` }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Evaluation / In-Depth Review Section */}
        <section className="mt-12 pt-10 border-t border-rule">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-surface rounded-xl border border-rule p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-ink font-bold text-lg">
                  <Sparkles className="size-5 text-accent" />
                  Why We Picked This
                </div>
                <div className="text-sm sm:text-base text-muted leading-relaxed whitespace-pre-line">
                  {product.description}
                </div>
              </div>

              {/* Standardized Testing Highlights */}
              <div className="bg-surface rounded-xl border border-rule p-6 sm:p-8">
                <h3 className="text-base font-bold text-ink mb-4">
                  Editorial Assessment Criteria
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted">
                  <div className="p-3.5 rounded-lg border border-rule/60 bg-paper/60">
                    <span className="font-semibold text-ink block mb-1">Durability Score</span>
                    Built with verified resilience against everyday wear and tear.
                  </div>
                  <div className="p-3.5 rounded-lg border border-rule/60 bg-paper/60">
                    <span className="font-semibold text-ink block mb-1">Price-to-Value</span>
                    Benchmarked against market equivalents in the {product.category.name} sector.
                  </div>
                  <div className="p-3.5 rounded-lg border border-rule/60 bg-paper/60">
                    <span className="font-semibold text-ink block mb-1">After-Sales Support</span>
                    Authorized manufacturer customer service and warranty policies.
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Ad Placement */}
            <div className="lg:col-span-4 space-y-6">
              <AdBanner slot="2345678901" format="rectangle" label="SPONSORED PRODUCT SPONSOR" />
            </div>
          </div>
        </section>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-rule">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-ink">
                  More in {product.category.name}
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  Explore other handpicked gear vetted in this category.
                </p>
              </div>
              <Link
                href={`/?category=${encodeURIComponent(product.category.slug)}`}
                className="text-xs font-semibold text-ink hover:underline"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
