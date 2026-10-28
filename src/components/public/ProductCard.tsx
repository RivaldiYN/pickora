import { ExternalLink, Star } from "lucide-react";
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
    price?: any;
    featured?: boolean;
    category: Category;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = formatCurrency(product.price);

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs card-hover-effect overflow-hidden">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-xs text-slate-800 border border-slate-200 shadow-2xs text-[11px] font-semibold">
              {product.category.name}
            </Badge>
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-amber-500 text-white border-transparent text-[10px] font-bold px-2 py-0.5 shadow-2xs flex items-center gap-1">
                <Star className="h-3 w-3 fill-white" />
                Featured
              </Badge>
            </div>
          )}

          {/* Price Tag if available */}
          {formattedPrice && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-block rounded-md bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 text-xs font-bold text-white shadow-xs">
                {formattedPrice}
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="mt-4 space-y-1.5">
          <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Affiliate CTA Button */}
      <div className="mt-5 pt-3 border-t border-slate-100">
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <span>Buy Now / See Details</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
