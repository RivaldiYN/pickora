import { db } from "@/lib/db";
import { isSubstantialReview } from "@/lib/content-quality";

// Plain server-side reads. Kept out of "use server" files so they are not exposed as actions.
// Errors propagate so error.tsx can show an outage instead of an empty catalog.

export type PublicProduct = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  price: number | null;
  featured: boolean;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  review: string | null;
  pros: string | null;
  cons: string | null;
  verdict: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryWithCount = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productCount: number;
};

const productInclude = { category: { select: { id: true, name: true, slug: true } } } as const;

type ProductRow = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  price: { toString(): string } | null;
  featured: boolean;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  review: string | null;
  pros: string | null;
  cons: string | null;
  verdict: string | null;
  createdAt: Date;
  updatedAt: Date;
};

function toPublicProduct(p: ProductRow): PublicProduct {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    imageUrl: p.imageUrl,
    affiliateUrl: p.affiliateUrl,
    price: p.price === null ? null : Number(p.price),
    featured: p.featured,
    categoryId: p.categoryId,
    category: p.category,
    review: p.review,
    pros: p.pros,
    cons: p.cons,
    verdict: p.verdict,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

export async function listCategories(): Promise<CategoryWithCount[]> {
  const rows = await db.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return rows.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    productCount: c._count.products,
  }));
}

export type SortOption = "latest" | "price-asc" | "price-desc" | "popular";

export type ListProductsOptions = {
  categorySlug?: string;
  search?: string;
  sort?: SortOption;
  limit?: number;
};

export async function listProducts(
  categorySlugOrOptions?: string | ListProductsOptions
): Promise<PublicProduct[]> {
  const options: ListProductsOptions =
    typeof categorySlugOrOptions === "string"
      ? { categorySlug: categorySlugOrOptions }
      : categorySlugOrOptions || {};

  const { categorySlug, search, sort = "latest", limit } = options;

  let orderBy: any = [{ featured: "desc" }, { createdAt: "desc" }];
  if (sort === "price-asc") {
    orderBy = [{ price: "asc" }, { createdAt: "desc" }];
  } else if (sort === "price-desc") {
    orderBy = [{ price: "desc" }, { createdAt: "desc" }];
  } else if (sort === "popular") {
    orderBy = [{ clicks: "desc" }, { createdAt: "desc" }];
  }

  const whereConditions: any[] = [];
  if (categorySlug) {
    whereConditions.push({ category: { slug: categorySlug } });
  }
  if (search && search.trim() !== "") {
    whereConditions.push({
      OR: [
        { title: { contains: search.trim(), mode: "insensitive" } },
        { description: { contains: search.trim(), mode: "insensitive" } },
      ],
    });
  }

  const where = whereConditions.length > 0 ? { AND: whereConditions } : undefined;

  const rows = await db.product.findMany({
    where,
    orderBy,
    take: limit,
    include: productInclude,
  });

  return rows.map(toPublicProduct);
}

export async function getProductById(id: string): Promise<PublicProduct | null> {
  const p = await db.product.findUnique({
    where: { id },
    include: productInclude,
  });

  return p ? toPublicProduct(p) : null;
}

export async function listRelatedProducts(
  productId: string,
  categoryId: string,
  limit = 4
): Promise<PublicProduct[]> {
  const rows = await db.product.findMany({
    where: {
      categoryId,
      id: { not: productId },
    },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: productInclude,
  });

  return rows.map(toPublicProduct);
}

// Number of products with a full write-up. Used to decide whether listing
// pages carry enough original content to show ad units.
export async function countSubstantialReviews(): Promise<number> {
  const rows = await db.product.findMany({ select: { review: true } });
  return rows.filter((r) => isSubstantialReview(r.review)).length;
}
