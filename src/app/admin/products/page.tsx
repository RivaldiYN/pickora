import { listProducts, listCategories } from "@/lib/queries";
import { ProductTable } from "@/components/admin/ProductTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Product Management | Pickora Admin",
};

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    listProducts(),
    listCategories(),
  ]);

  return (
    <div>
      <ProductTable products={products} categories={categories} />
    </div>
  );
}
