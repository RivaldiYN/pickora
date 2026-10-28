"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, ExternalLink, Package, Star } from "lucide-react";
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
  price: any;
  featured: boolean;
  categoryId: string;
  category: Category;
  createdAt: Date;
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
    if (!window.confirm(`Are you sure you want to delete "${product.title}"?`)) return;
    setDeletingId(product.id);
    await deleteProduct(product.id);
    setDeletingId(null);
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Affiliate Products</h2>
          <p className="text-sm text-slate-500">
            {products.length} {products.length === 1 ? "item" : "items"} currently listed
          </p>
        </div>

        <div className="flex items-center gap-3">
          {categories.length > 0 && (
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="text-xs h-9 rounded-lg border border-slate-200 bg-white px-3 py-1 text-slate-700"
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
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {categories.length === 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center justify-between">
          <span>You must create at least one category before you can add products.</span>
          <a href="/admin/categories" className="underline font-semibold ml-2">
            Create Category →
          </a>
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Package className="h-10 w-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-900">No products found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Add your curated items with title, image, and affiliate redirect link.
            </p>
            {categories.length > 0 && (
              <Button onClick={handleCreate} size="sm" className="mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Add First Product
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Affiliate Link</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="h-12 w-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                          onError={(e) => ((e.target as HTMLElement).style.opacity = "0.3")}
                        />
                        <div className="min-w-0 max-w-xs sm:max-w-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-900 truncate">
                              {p.title}
                            </span>
                            {p.featured && (
                              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="secondary" className="font-medium text-xs">
                        {p.category.name}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-slate-700 font-medium whitespace-nowrap">
                      {p.price ? formatCurrency(p.price.toString()) : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <a
                        href={p.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline max-w-[160px] truncate"
                        title={p.affiliateUrl}
                      >
                        <span className="truncate">{p.affiliateUrl}</span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(p)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          disabled={deletingId === p.id}
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

      <ProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        categories={categories}
        productToEdit={productToEdit}
      />
    </div>
  );
}
