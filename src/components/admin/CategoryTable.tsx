"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, FolderTree, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CategoryDialog } from "./CategoryDialog";
import { deleteCategory } from "@/lib/actions/categories";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productCount: number;
}

interface CategoryTableProps {
  categories: Category[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [categoryToEdit, setCategoryToEdit] = React.useState<Category | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setCategoryToEdit(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (category: Category) => {
    const count = category.productCount;
    const confirmMessage =
      count > 0
        ? `This category contains ${count} product(s). Deleting it will also delete those products. Proceed?`
        : `Delete the "${category.name}" category?`;

    if (!window.confirm(confirmMessage)) return;

    setDeletingId(category.id);
    setErrorMessage(null);
    const res = await deleteCategory(category.id);
    setDeletingId(null);

    if (!res.success) {
      setErrorMessage(res.message || "Could not delete category.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink">Categories</h2>
          <p className="text-xs text-muted">
            {categories.length} {categories.length === 1 ? "category" : "categories"} defined
          </p>
        </div>
        <Button onClick={handleCreate} size="sm" className="gap-2">
          <Plus className="size-4" />
          Add Category
        </Button>
      </div>

      {errorMessage && (
        <div role="alert" className="p-3 text-xs text-accent bg-accent/5 border border-accent/30 rounded-md">
          {errorMessage}
        </div>
      )}

      <div className="rounded-lg border border-rule bg-surface overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-16 px-4">
            <FolderTree className="size-10 mx-auto text-muted mb-2" />
            <p className="text-sm font-semibold text-ink">No categories yet</p>
            <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
              Create your first category to start organizing recommendations.
            </p>
            <Button onClick={handleCreate} size="sm" className="mt-4 gap-2">
              <Plus className="size-4" />
              Add First Category
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper/70 border-b border-rule text-xs font-semibold uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3">Category Name</th>
                  <th className="px-5 py-3">URL Slug</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3 text-center">Items</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule/60">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-paper/40 transition-colors">
                    <td className="px-5 py-4 font-semibold text-ink">
                      {cat.name}
                    </td>
                    <td className="px-5 py-4">
                      <code className="text-xs font-mono bg-paper text-ink px-2 py-0.5 rounded border border-rule">
                        {cat.slug}
                      </code>
                    </td>
                    <td className="px-5 py-4 text-muted max-w-xs truncate">
                      {cat.description || "None"}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Badge variant="outline">
                        {cat.productCount}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleEdit(cat)}
                          title="Edit"
                          className="size-8 inline-flex items-center justify-center rounded-md text-muted hover:text-ink hover:bg-paper cursor-pointer"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(cat)}
                          disabled={deletingId === cat.id}
                          title={deletingId === cat.id ? "Deleting..." : "Delete"}
                          aria-label={deletingId === cat.id ? "Deleting category" : "Delete category"}
                          className="size-8 inline-flex items-center justify-center rounded-md text-muted hover:text-accent hover:bg-accent/5 cursor-pointer disabled:opacity-50"
                        >
                          {deletingId === cat.id ? (
                            <Loader2 className="size-3.5 animate-spin text-accent" />
                          ) : (
                            <Trash2 className="size-3.5" />
                          )}
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
