"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCategory, updateCategory } from "@/lib/actions/categories";

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  } | null;
}

export function CategoryDialog({
  isOpen,
  onClose,
  categoryToEdit,
}: CategoryDialogProps) {
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setSlug(categoryToEdit.slug);
      setDescription(categoryToEdit.description || "");
    } else {
      setName("");
      setSlug("");
      setDescription("");
    }
    setError(null);
  }, [categoryToEdit, isOpen]);

  // Auto-generate slug from name if creating
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!categoryToEdit) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(autoSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
    };

    const res = categoryToEdit
      ? await updateCategory(categoryToEdit.id, payload)
      : await createCategory(payload);

    setIsSubmitting(false);

    if (res.success) {
      onClose();
    } else {
      setError(res.message || "Failed to save category");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={categoryToEdit ? "Edit Category" : "Add New Category"}
      description="Organize your recommendations into curated category channels."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Category Name</label>
          <Input
            value={name}
            onChange={handleNameChange}
            placeholder="e.g. Running Shoes"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">URL Slug</label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. running-shoes"
            required
          />
          <p className="text-[11px] text-slate-400">
            Used in URL filtering: /?category={slug || "slug"}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Description (Optional)</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description displayed on category pages..."
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : categoryToEdit ? "Save Changes" : "Create Category"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

