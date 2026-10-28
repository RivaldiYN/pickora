import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { uploadAsset } from "@/lib/neon-storage";

export const dynamic = "force-dynamic";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "No file was uploaded." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unsupported file format. Please upload JPG, PNG, WEBP, GIF, or AVIF.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "File exceeds 5MB limit. Please upload a smaller image.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique storage key
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const baseName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 30);

    const storageKey = `products/${Date.now()}-${baseName}.${extension}`;

    // Upload directly to Neon Object Storage bucket
    await uploadAsset(storageKey, buffer, file.type);

    // Return the persistent relative asset URL
    const imageUrl = `/api/assets/${storageKey}`;

    return NextResponse.json({
      success: true,
      url: imageUrl,
      key: storageKey,
      filename: file.name,
      size: file.size,
    });
  } catch (error: any) {
    console.error("Neon upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to upload image to Neon storage.",
      },
      { status: 500 }
    );
  }
}

