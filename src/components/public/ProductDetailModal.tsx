/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { ExternalLink, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface Category {
  name: string;
  slug: string;
}

export interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export function ProductDetailModal({
  isOpen,
  onClose,
  product,
}: ProductDetailModalProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = React.useState(false);
  const formattedPrice = formatCurrency(product.price);

  React.useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;

    const focusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        ) ?? []
      );

    (panel?.querySelector<HTMLElement>('button[aria-label="Close dialog"]') ?? focusable()[0])?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${product.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-surface border border-rule shadow-2xl p-6 sm:p-7 z-10 space-y-6"
      >
        {/* Header / Badges / Close */}
        <div className="flex items-start justify-between gap-4 border-b border-rule pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs font-medium">
              {product.category.name}
            </Badge>
            {product.featured && (
              <Badge variant="accent" className="text-[10px] uppercase font-bold tracking-wider">
                Featured Pick
              </Badge>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-m-2 inline-flex size-10 shrink-0 items-center justify-center rounded-md text-muted hover:bg-paper hover:text-ink transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Product Media & Image */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-lg bg-paper border border-rule flex items-center justify-center">
          {!imageError ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              onError={() => setImageError(true)}
              className="h-full w-full object-contain sm:object-cover"
            />
          ) : (
            <div className="p-8 text-center text-sm text-muted">
              {product.title}
            </div>
          )}

          {formattedPrice && (
            <div className="absolute bottom-3 right-3">
              <span className="font-mono rounded bg-ink px-3 py-1 text-sm font-semibold text-white shadow-md">
                {formattedPrice}
              </span>
            </div>
          )}
        </div>

        {/* Title & Full Description */}
        <div className="space-y-3">
          <h2
            id={`modal-title-${product.id}`}
            className="text-xl sm:text-2xl font-bold text-ink leading-snug"
          >
            {product.title}
          </h2>

          <div className="space-y-2">
            <p className="text-xs font-mono uppercase text-muted tracking-wider">
              Product Overview & Details
            </p>
            <div className="text-sm text-ink/90 leading-relaxed whitespace-pre-line bg-paper/60 p-4 rounded-lg border border-rule/60 max-h-60 overflow-y-auto">
              {product.description}
            </div>
          </div>
        </div>

        {/* CTA & Actions */}
        <div className="pt-4 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted text-center sm:text-left">
            Redirects directly to verified retail partner page.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-md border border-rule text-xs font-semibold text-ink hover:bg-paper transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-accent-hover shadow-xs cursor-pointer"
            >
              <span>Buy Now / See Details</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
