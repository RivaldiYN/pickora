export async function getNeonAuthJwks() {
  const jwksUrl = process.env.NEON_AUTH_JWKS_URL;
  if (!jwksUrl) {
    throw new Error("NEON_AUTH_JWKS_URL is not set");
  }

  const res = await fetch(jwksUrl, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Neon Auth JWKS: ${res.status}`);
  }

  return await res.json();
}
