"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { createCategory, updateCategory } from "@/lib/actions/categories";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: CategoryData | null;
}

interface CategoryFormProps {
  onClose: () => void;
  categoryToEdit?: CategoryData | null;
}

function CategoryForm({ onClose, categoryToEdit }: CategoryFormProps) {
  const [name, setName] = React.useState(categoryToEdit?.name ?? "");
  const [slug, setSlug] = React.useState(categoryToEdit?.slug ?? "");
  const [description, setDescription] = React.useState(categoryToEdit?.description ?? "");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

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
      setError(res.message || "Failed to save category.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && (
        <p role="alert" className="p-3 text-xs text-accent bg-accent/5 border border-accent/30 rounded-md">
          {error}
        </p>
      )}

      <Field label="Category Name" htmlFor="category-name">
        <Input
          id="category-name"
          value={name}
          onChange={handleNameChange}
          placeholder="e.g. Running Shoes"
          required
        />
      </Field>

      <Field
        label="URL Slug"
        htmlFor="category-slug"
        hint={`URL format: /?category=${slug || "slug"}`}
      >
        <Input
          id="category-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g. running-shoes"
          required
        />
      </Field>

      <Field label="Description (Optional)" htmlFor="category-desc">
        <Textarea
          id="category-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short category note..."
          rows={3}
        />
      </Field>

      <div className="flex justify-end gap-3 pt-3 border-t border-rule">
        <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : categoryToEdit ? "Save Changes" : "Create Category"}
        </Button>
      </div>
    </form>
  );
}

export function CategoryDialog({
  isOpen,
  onClose,
  categoryToEdit,
}: CategoryDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={categoryToEdit ? "Edit Category" : "Add New Category"}
      description="Organize your product recommendations into curated categories."
    >
      {isOpen ? (
        <CategoryForm
          key={categoryToEdit?.id ?? "new"}
          categoryToEdit={categoryToEdit}
          onClose={onClose}
        />
      ) : null}
    </Modal>
  );
}
