"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/products";

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductToEdit {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  categoryId: string;
  price?: number | string | null;
  featured?: boolean;
}

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryOption[];
  productToEdit?: ProductToEdit | null;
}

export function ProductDialog({
  isOpen,
  onClose,
  categories,
  productToEdit,
}: ProductDialogProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [affiliateUrl, setAffiliateUrl] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [featured, setFeatured] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setDescription(productToEdit.description);
      setImageUrl(productToEdit.imageUrl);
      setAffiliateUrl(productToEdit.affiliateUrl);
      setCategoryId(productToEdit.categoryId);
      setPrice(productToEdit.price ? productToEdit.price.toString() : "");
      setFeatured(!!productToEdit.featured);
    } else {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setAffiliateUrl("");
      setCategoryId(categories[0]?.id || "");
      setPrice("");
      setFeatured(false);
    }
    setError(null);
  }, [productToEdit, categories, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      affiliateUrl: affiliateUrl.trim(),
      categoryId,
      price: price ? parseFloat(price) : null,
      featured,
    };

    const res = productToEdit
      ? await updateProduct(productToEdit.id, payload)
      : await createProduct(payload);

    setIsSubmitting(false);

    if (res.success) {
      onClose();
    } else {
      setError(res.message || "Failed to save product");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={productToEdit ? "Edit Recommendation" : "Add New Recommendation"}
      description="Add a curated product recommendation with an affiliate destination."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Product Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Price (USD, Optional)</label>
            <Input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 299.99"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Image URL</label>
          <Input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
          />
          {imageUrl && (
            <div className="mt-2 flex items-center gap-3 p-2 border border-slate-100 rounded-lg bg-slate-50">
              <img
                src={imageUrl}
                alt="Preview"
                className="h-12 w-12 object-cover rounded bg-white border border-slate-200"
                onError={(e) => ((e.target as HTMLElement).style.display = "none")}
              />
              <span className="text-xs text-slate-500">Image Preview</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Affiliate Link URL</label>
          <Input
            type="url"
            value={affiliateUrl}
            onChange={(e) => setAffiliateUrl(e.target.value)}
            placeholder="https://amzn.to/... or https://partner.shop/..."
            required
          />
          <p className="text-[11px] text-slate-400">
            Destination clicked by viewers when pressing &quot;Buy Now / See Details&quot;.
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Short Recommendation Note</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Highlight why this product is worth recommending..."
            rows={3}
            required
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="featuredCheckbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="featuredCheckbox" className="text-xs font-medium text-slate-700 cursor-pointer">
            Mark as Featured recommendation (displayed prominently)
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : productToEdit ? "Save Changes" : "Create Product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

