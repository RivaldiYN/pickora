import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Pickora — Curated Product Picks & Tested Gear Index";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f7f6f2",
          padding: "64px 80px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          border: "12px solid #16181d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#b3261e",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "22px",
              }}
            >
              P
            </div>
            <span
              style={{
                fontSize: "30px",
                fontWeight: 800,
                color: "#16181d",
                letterSpacing: "-0.5px",
              }}
            >
              Pickora
            </span>
          </div>

          <div
            style={{
              display: "flex",
              backgroundColor: "#16181d",
              color: "#ffffff",
              padding: "6px 14px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Curated Index
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#16181d",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
            }}
          >
            Tested tools, performance gear, and everyday hardware.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#555b66",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            Curated product recommendations across Running, Cycling, Tech & Audio, and Random Finds.
            Direct links to verified retail partners.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e2dfd7",
            paddingTop: "24px",
            fontSize: "16px",
            color: "#555b66",
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <span>Running</span>
            <span>·</span>
            <span>Cycling</span>
            <span>·</span>
            <span>Tech & Audio</span>
            <span>·</span>
            <span>Desk Setup</span>
          </div>
          <div style={{ color: "#b3261e", fontWeight: 700 }}>pickora.com</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
