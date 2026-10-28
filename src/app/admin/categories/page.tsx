import { getCategories } from "@/lib/actions/categories";
import { CategoryTable } from "@/components/admin/CategoryTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Category Management | Pickora Admin",
};

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <CategoryTable categories={categories} />
    </div>
  );
}

