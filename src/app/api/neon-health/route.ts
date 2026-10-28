import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { uploadAsset, listAssets } from "@/lib/neon-storage";
import { callHelloFunction } from "@/lib/neon-functions";
import { getNeonAuthJwks } from "@/lib/neon-auth";
import { getNeonRealtimeConfig } from "@/lib/neon-realtime";

export const dynamic = "force-dynamic";

interface ServiceResult {
  status: "ok" | "error";
  details?: Record<string, unknown>;
  error?: string;
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

export async function GET(req: Request) {
  // Protect health route so unauthenticated visitors cannot spam bucket writes
  const session = await auth();
  const url = new URL(req.url);
  const secretKey = url.searchParams.get("key");
  const isAuthorized =
    !!session?.user ||
    (process.env.HEALTH_SECRET && secretKey === process.env.HEALTH_SECRET);

  if (!isAuthorized && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, ServiceResult> = {};

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
  } catch (err: unknown) {
    results.postgres = {
      status: "error",
      error: getErrorMessage(err),
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
  } catch (err: unknown) {
    results.objectStorage = {
      status: "error",
      error: getErrorMessage(err),
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
  } catch (err: unknown) {
    results.functions = {
      status: "error",
      error: getErrorMessage(err),
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
  } catch (err: unknown) {
    results.auth = {
      status: "error",
      error: getErrorMessage(err),
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
  } catch (err: unknown) {
    results.realtime = {
      status: "error",
      error: getErrorMessage(err),
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
