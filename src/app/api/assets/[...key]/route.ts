import { NextResponse } from "next/server";
import { getAsset } from "@/lib/neon-storage";

export const dynamic = "force-dynamic";

interface TransformableBody {
  transformToByteArray?: () => Promise<Uint8Array>;
  arrayBuffer?: () => Promise<ArrayBuffer>;
}

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

    const body = data.Body as TransformableBody;
    const byteArray =
      typeof body.transformToByteArray === "function"
        ? await body.transformToByteArray()
        : typeof body.arrayBuffer === "function"
        ? new Uint8Array(await body.arrayBuffer())
        : new Uint8Array();

    return new Response(Buffer.from(byteArray), {
      status: 200,
      headers: {
        "Content-Type": data.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        ...(data.ContentLength ? { "Content-Length": String(data.ContentLength) } : {}),
      },
    });
  } catch (error: unknown) {
    const err = error as { name?: string; $metadata?: { httpStatusCode?: number } };
    if (err?.name === "NoSuchKey" || err?.$metadata?.httpStatusCode === 404) {
      return new NextResponse("Asset not found", { status: 404 });
    }
    console.error("Error serving asset:", error);
    return new NextResponse("Failed to load asset", { status: 500 });
  }
}
