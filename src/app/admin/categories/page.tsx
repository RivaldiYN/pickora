import { listCategories } from "@/lib/queries";
import { CategoryTable } from "@/components/admin/CategoryTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Category Management | Pickora Admin",
};

export default async function AdminCategoriesPage() {
  const categories = await listCategories();

  return (
    <div>
      <CategoryTable categories={categories} />
    </div>
  );
}
