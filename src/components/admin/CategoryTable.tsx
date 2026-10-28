"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CategoryDialog } from "./CategoryDialog";
import { deleteCategory } from "@/lib/actions/categories";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  _count?: {
    products: number;
  };
}

interface CategoryTableProps {
  categories: Category[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [categoryToEdit, setCategoryToEdit] = React.useState<Category | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setCategoryToEdit(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (category: Category) => {
    const count = category._count?.products ?? 0;
    const confirmMessage =
      count > 0
        ? `This category contains ${count} products. Deleting it will also remove those products. Proceed?`
        : `Are you sure you want to delete the "${category.name}" category?`;

    if (!window.confirm(confirmMessage)) return;

    setDeletingId(category.id);
    await deleteCategory(category.id);
    setDeletingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Categories</h2>
          <p className="text-sm text-slate-500">
            {categories.length} {categories.length === 1 ? "category" : "categories"} defined
          </p>
        </div>
        <Button onClick={handleCreate} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        {categories.length === 0 ? (
          <div className="text-center py-16 px-4">
            <FolderTree className="h-10 w-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-900">No categories found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Create your first category to start organizing your product recommendations.
            </p>
            <Button onClick={handleCreate} size="sm" className="mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Add First Category
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Category Name</th>
                  <th className="px-5 py-3">URL Slug</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3 text-center">Items</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {cat.name}
                    </td>
                    <td className="px-5 py-4">
                      <code className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        {cat.slug}
                      </code>
                    </td>
                    <td className="px-5 py-4 text-slate-500 max-w-xs truncate">
                      {cat.description || "—"}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Badge variant="secondary" className="font-medium">
                        {cat._count?.products ?? 0}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(cat)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat)}
                          disabled={deletingId === cat.id}
                          title="Delete"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CategoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        categoryToEdit={categoryToEdit}
      />
    </div>
  );
}

