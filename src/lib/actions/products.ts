"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { productSchema, type ProductInput } from "@/lib/validations";
import { ActionResponse } from "./categories";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: Admin session required");
  }
  return session.user;
}

export async function getProducts(options?: {
  categoryId?: string;
  categorySlug?: string;
  limit?: number;
}) {
  try {
    const where: any = {};

    if (options?.categoryId) {
      where.categoryId = options.categoryId;
    } else if (options?.categorySlug && options.categorySlug !== "all") {
      where.category = {
        slug: options.categorySlug,
      };
    }

    return await db.product.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      take: options?.limit,
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function createProduct(input: ProductInput): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = productSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid product data",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { title, description, imageUrl, affiliateUrl, categoryId, price, featured } =
      parsed.data;

    const categoryExists = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return {
        success: false,
        message: "Selected category does not exist",
      };
    }

    const product = await db.product.create({
      data: {
        title,
        description,
        imageUrl,
        affiliateUrl,
        categoryId,
        price: price !== null && price !== undefined ? price : null,
        featured: featured ?? false,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin");
    revalidatePath("/");

    return {
      success: true,
      message: "Product created successfully",
      data: product,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to create product",
    };
  }
}

export async function updateProduct(
  id: string,
  input: ProductInput
): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = productSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid product data",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { title, description, imageUrl, affiliateUrl, categoryId, price, featured } =
      parsed.data;

    const product = await db.product.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        affiliateUrl,
        categoryId,
        price: price !== null && price !== undefined ? price : null,
        featured: featured ?? false,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin");
    revalidatePath("/");

    return {
      success: true,
      message: "Product updated successfully",
      data: product,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update product",
    };
  }
}

export async function deleteProduct(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();

    await db.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin");
    revalidatePath("/");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to delete product",
    };
  }
}

