"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
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
  price?: number | null;
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
      setPrice(productToEdit.price !== null && productToEdit.price !== undefined ? String(productToEdit.price) : "");
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
      setError(res.message || "Failed to save product.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={productToEdit ? "Edit Product" : "Add Product"}
      description="Curate a product recommendation with an affiliate destination."
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <p role="alert" className="p-3 text-xs text-accent bg-accent/5 border border-accent/30 rounded-md">
            {error}
          </p>
        )}

        <Field label="Product Title" htmlFor="prod-title">
          <Input
            id="prod-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
            required
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Category" htmlFor="prod-cat">
            <Select
              id="prod-cat"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Price (USD, Optional)" htmlFor="prod-price">
            <Input
              id="prod-price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 299.99"
            />
          </Field>
        </div>

        <Field label="Image URL (http:// or https://)" htmlFor="prod-img">
          <Input
            id="prod-img"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            required
          />
        </Field>

        <Field
          label="Affiliate URL (http:// or https://)"
          htmlFor="prod-aff"
          hint="Destination opened when user clicks Buy Now."
        >
          <Input
            id="prod-aff"
            type="url"
            value={affiliateUrl}
            onChange={(e) => setAffiliateUrl(e.target.value)}
            placeholder="https://..."
            required
          />
        </Field>

        <Field label="Description" htmlFor="prod-desc">
          <Textarea
            id="prod-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Why this item is worth buying..."
            rows={3}
            required
          />
        </Field>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="featuredCheckbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="size-4 rounded border-rule text-ink cursor-pointer"
          />
          <label htmlFor="featuredCheckbox" className="text-xs font-medium text-ink cursor-pointer">
            Mark as Featured recommendation
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-rule">
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
