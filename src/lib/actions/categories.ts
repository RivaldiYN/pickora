"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { categorySchema, type CategoryInput } from "@/lib/validations";
import { requireAdmin, toUserMessage } from "./guard";
import type { ActionResponse } from "./types";

function revalidateCatalog() {
  revalidatePath("/admin", "layout");
  revalidatePath("/");
}

export async function createCategory(input: CategoryInput): Promise<ActionResponse> {
  try {
    await requireAdmin();
    const parsed = categorySchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        message: "Check the highlighted fields.",
        errors: z.flattenError(parsed.error).fieldErrors,
      };
    }

    const { name, slug, description } = parsed.data;
    await db.category.create({
      data: { name, slug, description: description || null },
    });

    revalidateCatalog();
    return { success: true, message: "Category created." };
  } catch (error) {
    return { success: false, message: toUserMessage(error, "Could not create the category.") };
  }
}

export async function updateCategory(id: string, input: CategoryInput): Promise<ActionResponse> {
  try {
    await requireAdmin();
    const parsed = categorySchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        message: "Check the highlighted fields.",
        errors: z.flattenError(parsed.error).fieldErrors,
      };
    }

    const { name, slug, description } = parsed.data;
    await db.category.update({
      where: { id },
      data: { name, slug, description: description || null },
    });

    revalidateCatalog();
    return { success: true, message: "Category updated." };
  } catch (error) {
    return { success: false, message: toUserMessage(error, "Could not update the category.") };
  }
}

export async function deleteCategory(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();
    await db.category.delete({ where: { id } });
    revalidateCatalog();
    return { success: true, message: "Category deleted." };
  } catch (error) {
    return { success: false, message: toUserMessage(error, "Could not delete the category.") };
  }
}
