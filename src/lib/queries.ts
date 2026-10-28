import { db } from "@/lib/db";

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
};

export type CategoryWithCount = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productCount: number;
};

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

export async function listProducts(categorySlug?: string): Promise<PublicProduct[]> {
  const rows = await db.product.findMany({
    where: categorySlug ? { category: { slug: categorySlug } } : undefined,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    include: { category: { select: { id: true, name: true, slug: true } } },
  });
  // Decimal is not serializable across the server/client boundary.
  return rows.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    imageUrl: p.imageUrl,
    affiliateUrl: p.affiliateUrl,
    price: p.price === null ? null : Number(p.price),
    featured: p.featured,
    categoryId: p.categoryId,
    category: p.category,
  }));
}

