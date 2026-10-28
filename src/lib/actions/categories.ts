"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { categorySchema, type CategoryInput } from "@/lib/validations";

export type ActionResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: Admin session required");
  }
  return session.user;
}

export async function getCategories() {
  try {
    return await db.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function createCategory(input: CategoryInput): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = categorySchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid category data",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { name, slug, description } = parsed.data;

    const existing = await db.category.findFirst({
      where: {
        OR: [{ slug }, { name }],
      },
    });

    if (existing) {
      return {
        success: false,
        message: "A category with this name or slug already exists",
      };
    }

    const category = await db.category.create({
      data: {
        name,
        slug,
        description: description || null,
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin");
    revalidatePath("/");

    return {
      success: true,
      message: "Category created successfully",
      data: category,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to create category",
    };
  }
}

export async function updateCategory(
  id: string,
  input: CategoryInput
): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = categorySchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid category data",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { name, slug, description } = parsed.data;

    const collision = await db.category.findFirst({
      where: {
        id: { not: id },
        OR: [{ slug }, { name }],
      },
    });

    if (collision) {
      return {
        success: false,
        message: "Another category already uses this name or slug",
      };
    }

    const category = await db.category.update({
      where: { id },
      data: {
        name,
        slug,
        description: description || null,
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin");
    revalidatePath("/");

    return {
      success: true,
      message: "Category updated successfully",
      data: category,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update category",
    };
  }
}

export async function deleteCategory(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();

    await db.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin");
    revalidatePath("/");

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to delete category",
    };
  }
}

