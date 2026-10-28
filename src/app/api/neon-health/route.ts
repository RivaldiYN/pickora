import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploadAsset, listAssets } from "@/lib/neon-storage";
import { callHelloFunction } from "@/lib/neon-functions";
import { getNeonAuthJwks } from "@/lib/neon-auth";
import { getNeonRealtimeConfig } from "@/lib/neon-realtime";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, { status: "ok" | "error"; details?: any; error?: string }> = {};

  // 1. Test Neon Postgres via Prisma
  try {
    const [userCount, productCount, categoryCount] = await Promise.all([
      db.user.count(),
      db.product.count(),
      db.category.count(),
    ]);
    results.postgres = {
      status: "ok",
      details: {
        users: userCount,
        products: productCount,
        categories: categoryCount,
      },
    };
  } catch (err: any) {
    results.postgres = {
      status: "error",
      error: err?.message || String(err),
    };
  }

  // 2. Test Neon Object Storage (S3)
  try {
    const testKey = `health-check-${Date.now()}.txt`;
    await uploadAsset(testKey, "Neon Object Storage Health Check", "text/plain");
    const assets = await listAssets();
    results.objectStorage = {
      status: "ok",
      details: {
        bucket: "assets",
        sampleKey: testKey,
        totalObjects: assets.length,
      },
    };
  } catch (err: any) {
    results.objectStorage = {
      status: "error",
      error: err?.message || String(err),
    };
  }

  // 3. Test Neon Serverless Function
  try {
    const functionResponse = await callHelloFunction();
    results.functions = {
      status: "ok",
      details: {
        functionName: "hello",
        response: functionResponse.trim(),
      },
    };
  } catch (err: any) {
    results.functions = {
      status: "error",
      error: err?.message || String(err),
    };
  }

  // 4. Test Neon Auth (JWKS)
  try {
    const jwks = await getNeonAuthJwks();
    results.auth = {
      status: "ok",
      details: {
        keysFound: Array.isArray(jwks?.keys) ? jwks.keys.length : 0,
      },
    };
  } catch (err: any) {
    results.auth = {
      status: "error",
      error: err?.message || String(err),
    };
  }

  // 5. Test Neon Realtime
  try {
    const rt = getNeonRealtimeConfig();
    results.realtime = {
      status: "ok",
      details: {
        url: rt.url,
        hasSecret: !!rt.secret,
      },
    };
  } catch (err: any) {
    results.realtime = {
      status: "error",
      error: err?.message || String(err),
    };
  }

  const allPassed = Object.values(results).every((r) => r.status === "ok");

  return NextResponse.json(
    {
      success: allPassed,
      timestamp: new Date().toISOString(),
      services: results,
    },
    { status: allPassed ? 200 : 207 }
  );
}
