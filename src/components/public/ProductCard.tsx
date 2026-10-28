"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

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
  const formattedPrice = formatCurrency(product.price);

  return (
    <article className="group flex flex-col justify-between rounded-lg border border-rule bg-surface p-4 transition-colors hover:border-ink/60">
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-paper border border-rule/50">
          {!imageError ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-muted">
              {product.title}
            </div>
          )}

          <div className="absolute top-2.5 left-2.5">
            <Badge variant="outline" className="text-[11px] font-medium shadow-2xs">
              {product.category.name}
            </Badge>
          </div>

          {product.featured && (
            <div className="absolute top-2.5 right-2.5">
              <Badge variant="accent" className="text-[10px] uppercase font-bold tracking-wider">
                Featured
              </Badge>
            </div>
          )}

          {formattedPrice && (
            <div className="absolute bottom-2.5 right-2.5">
              <span className="font-mono rounded bg-ink px-2 py-0.5 text-xs font-semibold text-white">
                {formattedPrice}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-1">
          <h3 className="text-base font-semibold text-ink line-clamp-1 leading-snug">
            {product.title}
          </h3>
          <p className="text-xs text-muted line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-rule/60">
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>Buy Now / See Details</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </article>
  );
}
