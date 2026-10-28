import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and dashes"),
  description: z.string().trim().max(255).optional().nullable(),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(120),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(1000),
  imageUrl: z.string().trim().url("Must be a valid image URL"),
  affiliateUrl: z.string().trim().url("Must be a valid affiliate URL"),
  categoryId: z.string().min(1, "Please select a category"),
  price: z.coerce
    .number()
    .positive("Price must be greater than zero")
    .optional()
    .nullable(),
  featured: z.boolean().default(false),
});

export type ProductInput = z.infer<typeof productSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

