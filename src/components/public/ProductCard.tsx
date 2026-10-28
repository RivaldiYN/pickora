/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { ExternalLink, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { ProductDetailModal } from "./ProductDetailModal";

interface Category {
  name: string;
  slug: string;
}

export interface ProductCardProps {
  product: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    affiliateUrl: string;
    price?: number | null;
    featured?: boolean;
    category: Category;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const formattedPrice = formatCurrency(product.price);

  return (
    <>
      <article
        itemScope
        itemType="https://schema.org/Product"
        className="group flex flex-col justify-between rounded-lg border border-rule bg-surface p-4 transition-colors hover:border-ink/60"
      >
        <div
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsModalOpen(true);
            }
          }}
          aria-label={`View details for ${product.title}`}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-paper border border-rule/50">
            {!imageError ? (
              <img
                src={product.imageUrl}
                alt={`${product.title} - ${product.category.name} curated pick`}
                loading="lazy"
                decoding="async"
                itemProp="image"
                onError={() => setImageError(true)}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-muted">
                {product.title}
              </div>
            )}

            {/* Quick View overlay badge on hover */}
            <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/95 text-ink text-xs font-semibold shadow-md backdrop-blur-xs">
                <Maximize2 className="size-3 text-muted" />
                <span>View Details</span>
              </span>
            </div>

            <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
              <Badge variant="outline" className="text-[11px] font-medium shadow-2xs bg-surface/90">
                <span itemProp="category">{product.category.name}</span>
              </Badge>
            </div>

            {product.featured && (
              <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
                <Badge variant="accent" className="text-[10px] uppercase font-bold tracking-wider">
                  Featured
                </Badge>
              </div>
            )}

            {formattedPrice && (
              <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
                <span className="font-mono rounded bg-ink px-2 py-0.5 text-xs font-semibold text-white">
                  {formattedPrice}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-1">
            <h3
              itemProp="name"
              className="text-base font-semibold text-ink line-clamp-1 leading-snug group-hover:text-accent transition-colors"
            >
              {product.title}
            </h3>
            <p
              itemProp="description"
              className="text-xs text-muted line-clamp-2 leading-relaxed"
            >
              {product.description}
            </p>
          </div>
        </div>

        <div
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
          className="mt-5 pt-3 border-t border-rule/60 flex items-center gap-2"
        >
          {product.price !== null && product.price !== undefined && (
            <meta itemProp="price" content={String(product.price)} />
          )}
          <meta itemProp="priceCurrency" content="USD" />
          <link itemProp="availability" href="https://schema.org/InStock" />

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex min-h-11 items-center justify-center px-3 py-2.5 rounded-md border border-rule text-xs font-semibold text-ink hover:bg-paper transition-colors cursor-pointer shrink-0"
            title="Read full description"
          >
            <span>Details</span>
          </button>

          <a
            itemProp="url"
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Buy Now</span>
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </article>

      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  );
}
