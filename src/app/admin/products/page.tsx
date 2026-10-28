import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import { ProductTable } from "@/components/admin/ProductTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Product Management | Pickora Admin",
};

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div>
      <ProductTable products={products} categories={categories} />
    </div>
  );
}
