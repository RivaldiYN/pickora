export function getNeonRealtimeConfig() {
  const realtimeUrl = process.env.NEON_REALTIME_URL;
  const realtimeSecret = process.env.NEON_REALTIME_SECRET;

  if (!realtimeUrl || !realtimeSecret) {
    throw new Error("Neon Realtime environment variables are not configured");
  }

  return {
    url: realtimeUrl,
    secret: realtimeSecret,
  };
}

