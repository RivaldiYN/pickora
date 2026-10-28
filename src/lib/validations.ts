import { z } from "zod";

// z.url() alone accepts javascript: and data: URLs, which would end up in href/src.
const httpUrl = (message: string) =>
  z
    .string()
    .trim()
    .max(2048, "URL is too long")
    .pipe(z.url({ protocol: /^https?$/, message }));

const imageSource = z
  .string()
  .trim()
  .min(1, "Image is required")
  .max(2048, "URL is too long")
  .refine(
    (val) =>
      (val.startsWith("/") && !val.startsWith("//") && !val.startsWith("/\\")) ||
      /^https?:\/\//i.test(val),
    "Image must be an uploaded asset (/api/assets/...) or an HTTP/HTTPS URL"
  );

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and dashes only"),
  description: z.string().trim().max(255).optional().nullable(),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(120),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000),
  imageUrl: imageSource,
  affiliateUrl: httpUrl("Affiliate URL must start with http:// or https://"),
  categoryId: z.string().min(1, "Pick a category"),
  price: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? null : Number(v)),
    z
      .number({ message: "Price must be a number" })
      .positive("Price must be greater than zero")
      .max(1_000_000, "Price is too large")
      .nullable()
  ),
  featured: z.boolean().default(false),
});

export type ProductInput = z.input<typeof productSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
