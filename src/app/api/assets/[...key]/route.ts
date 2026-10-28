import { NextResponse } from "next/server";
import { getAsset } from "@/lib/neon-storage";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  try {
    const { key } = await params;
    if (!key || key.length === 0) {
      return new NextResponse("Key required", { status: 400 });
    }

    const assetKey = key.join("/");
    const data = await getAsset(assetKey);

    if (!data.Body) {
      return new NextResponse("Asset not found", { status: 404 });
    }

    // Convert AWS SDK stream to binary buffer to guarantee full non-null response delivery
    const byteArray = (data.Body as any).transformToByteArray
      ? await (data.Body as any).transformToByteArray()
      : await (data.Body as any).arrayBuffer();

    return new Response(byteArray, {
      status: 200,
      headers: {
        "Content-Type": data.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        ...(data.ContentLength ? { "Content-Length": String(data.ContentLength) } : {}),
      },
    });
  } catch (error: any) {
    if (error?.name === "NoSuchKey" || error?.$metadata?.httpStatusCode === 404) {
      return new NextResponse("Asset not found", { status: 404 });
    }
    console.error("Error serving asset:", error);
    return new NextResponse("Failed to load asset", { status: 500 });
  }
}

