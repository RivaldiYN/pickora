import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const publisherId =
    process.env.ADSENSE_PUBLISHER_ID ||
    process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ||
    (process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
      ? process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID.replace(/^ca-/, "")
      : "pub-0000000000000000");

  const body = [
    "# Pickora Authorized Digital Sellers (ads.txt)",
    "# Google AdSense Integration Specification",
    `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`,
    "",
  ].join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
