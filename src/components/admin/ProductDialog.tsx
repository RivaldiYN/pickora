"use client";

import * as React from "react";
import { UploadCloud, Link as LinkIcon, Loader2, Check } from "lucide-react";
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

  // Image source mode: "upload" (file upload to Neon) or "url" (external link)
  const [imageMode, setImageMode] = React.useState<"upload" | "url">("upload");
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setDescription(productToEdit.description);
      setImageUrl(productToEdit.imageUrl);
      setAffiliateUrl(productToEdit.affiliateUrl);
      setCategoryId(productToEdit.categoryId);
      setPrice(
        productToEdit.price !== null && productToEdit.price !== undefined
          ? String(productToEdit.price)
          : ""
      );
      setFeatured(!!productToEdit.featured);
      setImageMode(productToEdit.imageUrl.startsWith("/api/assets/") ? "upload" : "url");
    } else {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setAffiliateUrl("");
      setCategoryId(categories[0]?.id || "");
      setPrice("");
      setFeatured(false);
      setImageMode("upload");
    }
    setError(null);
    setUploadSuccess(false);
  }, [productToEdit, categories, isOpen]);

  const handleFileUpload = async (file: File) => {
    setError(null);
    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Upload failed");
      }

      // Sets permanent Neon Object Storage URL: /api/assets/products/...
      setImageUrl(data.url);
      setUploadSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Failed to upload image to Neon storage.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!imageUrl) {
      setError("Please upload an image or provide an image URL.");
      setIsSubmitting(false);
      return;
    }

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
      description="Curate a product recommendation with photo upload to Neon Object Storage."
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

        {/* Product Photo: Upload to Neon or URL */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-ink">
              Product Photo
            </label>
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setImageMode("upload")}
                className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                  imageMode === "upload"
                    ? "bg-ink text-white font-medium"
                    : "text-muted hover:text-ink hover:bg-paper"
                }`}
              >
                Upload File (Neon)
              </button>
              <button
                type="button"
                onClick={() => setImageMode("url")}
                className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                  imageMode === "url"
                    ? "bg-ink text-white font-medium"
                    : "text-muted hover:text-ink hover:bg-paper"
                }`}
              >
                External URL
              </button>
            </div>
          </div>

          {imageMode === "upload" ? (
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload-input"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-rule rounded-lg p-5 text-center hover:border-ink/60 transition-colors cursor-pointer bg-paper/50"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center py-2 space-y-2">
                    <Loader2 className="size-6 animate-spin text-accent" />
                    <p className="text-xs font-medium text-ink">
                      Uploading to Neon Object Storage...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-1 space-y-1.5">
                    <UploadCloud className="size-6 text-muted" />
                    <p className="text-xs font-semibold text-ink">
                      Click to choose an image or drag & drop
                    </p>
                    <p className="text-[11px] text-muted">
                      JPG, PNG, WEBP, GIF, or AVIF up to 5MB. Stored on Neon.
                    </p>
                  </div>
                )}
              </div>

              {imageUrl && (
                <div className="flex items-center justify-between p-2.5 rounded-md border border-rule bg-surface text-xs">
                  <div className="flex items-center gap-2 truncate mr-2">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span className="font-mono text-[11px] text-muted truncate">
                      {imageUrl}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-ink underline shrink-0 hover:text-muted"
                  >
                    Replace
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Field
              label=""
              htmlFor="prod-img"
              hint="Enter a direct HTTP or HTTPS image URL."
            >
              <Input
                id="prod-img"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                required
              />
            </Field>
          )}

          {/* Live preview */}
          {imageUrl && (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-rule bg-paper">
              <img
                src={imageUrl}
                alt="Product preview"
                className="size-14 rounded-md object-cover bg-surface border border-rule shrink-0"
                onError={(e) => {
                  (e.target as HTMLElement).style.opacity = "0.3";
                }}
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-ink">Image Preview</p>
                <p className="text-[11px] text-muted truncate">{imageUrl}</p>
              </div>
            </div>
          )}
        </div>

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
          <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isSubmitting || isUploading}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={isSubmitting || isUploading}>
            {isSubmitting ? "Saving..." : productToEdit ? "Save Changes" : "Create Product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
