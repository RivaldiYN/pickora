import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { ProductCard } from "@/components/public/ProductCard";
import { AdBanner } from "@/components/public/AdBanner";
import { Badge } from "@/components/ui/badge";
import { getProductById, listRelatedProducts } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";
import { getSiteUrl } from "@/lib/seo";
import { isSubstantialReview, splitLines } from "@/lib/content-quality";
import { ExternalLink, ChevronRight, ArrowLeft, Check, X } from "lucide-react";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

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
  const hasReview = isSubstantialReview(product.review);
  const title = hasReview ? `${product.title} Review | Pickora` : `${product.title} | Pickora`;
  const description = product.description.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    // Pages without a full write-up stay out of the index until one is published.
    robots: hasReview ? undefined : { index: false, follow: true },
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

  const hasReview = isSubstantialReview(product.review);
  const reviewParagraphs = (product.review ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const pros = splitLines(product.pros);
  const cons = splitLines(product.cons);

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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
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
          {/* Left Column: Image */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface border border-rule p-4 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.title}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
            <p className="text-xs text-muted px-1">
              Last updated{" "}
              <time dateTime={product.updatedAt.toISOString()}>
                {dateFormatter.format(product.updatedAt)}
              </time>
            </p>
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

              <p className="text-sm text-muted leading-relaxed">{product.description}</p>

              {formattedPrice && (
                <div className="pt-1">
                  <div className="text-xs text-muted">Price at time of writing</div>
                  <div className="text-2xl font-bold font-mono text-ink mt-0.5">
                    {formattedPrice}
                  </div>
                </div>
              )}
            </div>

            {/* Outbound Purchase Box */}
            <div className="rounded-xl border border-rule bg-surface p-5 space-y-3">
              <a
                href={`/api/out/${product.id}`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-semibold py-3 px-5 transition-colors"
              >
                <span>Check current price at the retailer</span>
                <ExternalLink className="size-4" />
              </a>
              <p className="text-[11px] text-muted text-center">
                Prices change. This is an affiliate link: Pickora may earn a commission if you buy,
                at no extra cost to you.{" "}
                <Link href="/disclosure" className="underline hover:text-ink">
                  Read our disclosure
                </Link>
                .
              </p>
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 pt-2 border-t border-rule text-xs text-muted">
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
                href={`https://wa.me/?text=${encodeURIComponent(`${product.title} - ${canonicalUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Editorial write-up */}
        {reviewParagraphs.length > 0 ? (
          <section id="review" className="mt-12 pt-10 border-t border-rule scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <article className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-ink">In-Depth Editorial Review</h2>
                  <div className="space-y-4 text-base text-ink/90 leading-relaxed">
                    {reviewParagraphs.map((paragraph, i) => (
                      <p key={i} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {(pros.length > 0 || cons.length > 0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pros.length > 0 && (
                      <div className="rounded-xl border border-rule bg-surface p-5">
                        <h3 className="text-sm font-bold text-ink mb-3">What we liked</h3>
                        <ul className="space-y-2 text-sm text-ink/90">
                          {pros.map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {cons.length > 0 && (
                      <div className="rounded-xl border border-rule bg-surface p-5">
                        <h3 className="text-sm font-bold text-ink mb-3">What could be better</h3>
                        <ul className="space-y-2 text-sm text-ink/90">
                          {cons.map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <X className="size-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {product.verdict && (
                  <div className="rounded-xl border border-rule bg-surface p-5 sm:p-6">
                    <h3 className="text-sm font-bold text-ink mb-2">Verdict</h3>
                    <p className="text-sm sm:text-base text-ink/90 leading-relaxed whitespace-pre-line">
                      {product.verdict}
                    </p>
                  </div>
                )}
              </article>

              <aside className="lg:col-span-4 space-y-6">
                <AdBanner slot="2345678901" format="rectangle" label="ADVERTISEMENT" />
              </aside>
            </div>
          </section>
        ) : (
          <section className="mt-12 pt-10 border-t border-rule">
            <p className="text-sm text-muted max-w-2xl">
              A full write-up for this pick is in progress. Until it is published, the summary above
              is what we have.
            </p>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-rule">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-ink">More in {product.category.name}</h2>
              </div>
              <Link
                href={`/?category=${encodeURIComponent(product.category.slug)}`}
                className="text-xs font-semibold text-ink hover:underline"
              >
                View all
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
