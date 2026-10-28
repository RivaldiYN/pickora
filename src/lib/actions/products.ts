"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { productSchema, type ProductInput } from "@/lib/validations";
import { requireAdmin, toUserMessage } from "./guard";
import type { ActionResponse } from "./types";

function revalidateCatalog() {
  revalidatePath("/admin", "layout");
  revalidatePath("/");
}

function parseProduct(input: ProductInput) {
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false as const,
      response: {
        success: false,
        message: "Check the highlighted fields.",
        errors: z.flattenError(parsed.error).fieldErrors,
      },
    };
  }
  return { ok: true as const, data: parsed.data };
}

export async function createProduct(input: ProductInput): Promise<ActionResponse> {
  try {
    await requireAdmin();
    const parsed = parseProduct(input);
    if (!parsed.ok) return parsed.response;

    await db.product.create({ data: parsed.data });

    revalidateCatalog();
    return { success: true, message: "Product created." };
  } catch (error) {
    return { success: false, message: toUserMessage(error, "Could not create the product.") };
  }
}

export async function updateProduct(id: string, input: ProductInput): Promise<ActionResponse> {
  try {
    await requireAdmin();
    const parsed = parseProduct(input);
    if (!parsed.ok) return parsed.response;

    await db.product.update({ where: { id }, data: parsed.data });

    revalidateCatalog();
    return { success: true, message: "Product updated." };
  } catch (error) {
    return { success: false, message: toUserMessage(error, "Could not update the product.") };
  }
}

export async function deleteProduct(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();
    await db.product.delete({ where: { id } });
    revalidateCatalog();
    return { success: true, message: "Product deleted." };
  } catch (error) {
    return { success: false, message: toUserMessage(error, "Could not delete the product.") };
  }
}
