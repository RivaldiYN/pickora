/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, ExternalLink, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductDialog } from "./ProductDialog";
import { deleteProduct } from "@/lib/actions/products";
import { formatCurrency } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  price: number | null;
  featured: boolean;
  categoryId: string;
  category: Category;
}

interface ProductTableProps {
  products: Product[];
  categories: Category[];
}

export function ProductTable({ products, categories }: ProductTableProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [productToEdit, setProductToEdit] = React.useState<Product | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const filteredProducts =
    selectedFilter === "all"
      ? products
      : products.filter((p) => p.categoryId === selectedFilter);

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setProductToEdit(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Delete "${product.title}"?`)) return;
    setDeletingId(product.id);
    setErrorMessage(null);
    const res = await deleteProduct(product.id);
    setDeletingId(null);

    if (!res.success) {
      setErrorMessage(res.message || "Could not delete product.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink">Products</h2>
          <p className="text-xs text-muted">
            {products.length} {products.length === 1 ? "item" : "items"} currently cataloged
          </p>
        </div>

        <div className="flex items-center gap-3">
          {categories.length > 0 && (
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="text-xs min-h-9 rounded-md border border-rule bg-surface px-3 py-1 text-ink"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}

          <Button onClick={handleCreate} size="sm" className="gap-2" disabled={categories.length === 0}>
            <Plus className="size-4" />
            Add Product
          </Button>
        </div>
      </div>

      {errorMessage && (
        <div role="alert" className="p-3 text-xs text-accent bg-accent/5 border border-accent/30 rounded-md">
          {errorMessage}
        </div>
      )}

      {categories.length === 0 && (
        <div className="p-4 bg-paper border border-rule rounded-md text-ink text-xs flex items-center justify-between">
          <span>You must create at least one category before adding products.</span>
          <a href="/admin/categories" className="underline font-semibold ml-2">
            Create Category
          </a>
        </div>
      )}

      <div className="rounded-lg border border-rule bg-surface overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Package className="size-10 mx-auto text-muted mb-2" />
            <p className="text-sm font-semibold text-ink">No products found</p>
            <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
              Add your curated items with title, image, and affiliate redirect link.
            </p>
            {categories.length > 0 && (
              <Button onClick={handleCreate} size="sm" className="mt-4 gap-2">
                <Plus className="size-4" />
                Add First Product
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper/70 border-b border-rule text-xs font-semibold uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Affiliate Link</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-paper/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="size-11 rounded-md object-cover bg-paper border border-rule shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                        <div className="min-w-0 max-w-xs sm:max-w-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-ink truncate">
                              {p.title}
                            </span>
                            {p.featured && (
                              <Badge variant="accent" className="text-[10px] px-1.5 py-0">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted line-clamp-1 mt-0.5">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className="text-xs">
                        {p.category.name}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-ink font-mono text-xs whitespace-nowrap">
                      {p.price !== null ? formatCurrency(p.price) : "None"}
                    </td>
                    <td className="px-5 py-3.5">
                      <a
                        href={p.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-1 text-xs text-ink underline max-w-[160px] truncate"
                        title={p.affiliateUrl}
                      >
                        <span className="truncate">{p.affiliateUrl}</span>
                        <ExternalLink className="size-3 shrink-0" />
                      </a>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleEdit(p)}
                          title="Edit"
                          className="size-8 inline-flex items-center justify-center rounded-md text-muted hover:text-ink hover:bg-paper cursor-pointer"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p)}
                          disabled={deletingId === p.id}
                          title="Delete"
                          className="size-8 inline-flex items-center justify-center rounded-md text-muted hover:text-accent hover:bg-accent/5 cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 className="size-3.5" />
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

      <ProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        categories={categories}
        productToEdit={productToEdit}
      />
    </div>
  );
}
