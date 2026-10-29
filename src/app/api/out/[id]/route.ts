import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const product = await db.product.findUnique({
      where: { id },
      select: { id: true, affiliateUrl: true },
    });

    if (!product || !product.affiliateUrl) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Asynchronously or synchronously increment click count
    try {
      await db.product.update({
        where: { id },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });
    } catch (e) {
      console.error("Failed to increment product click count:", e);
    }

    // Ensure valid URL
    const destination = product.affiliateUrl.startsWith("http")
      ? product.affiliateUrl
      : `https://${product.affiliateUrl}`;

    return NextResponse.redirect(destination, {
      status: 307,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
  } catch (error) {
    console.error("Affiliate redirect error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
