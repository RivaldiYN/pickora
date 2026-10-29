"use client";

import * as React from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
  label?: string;
}

export function AdBanner({
  slot = "0000000000",
  format = "auto",
  className = "",
  label = "SPONSORED / ADVERTISEMENT",
}: AdBannerProps) {
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isProduction = process.env.NODE_ENV === "production" && !!adClientId;
  const adRef = React.useRef<HTMLModElement>(null);
  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (isProduction && adRef.current && !initialized.current) {
      try {
        // @ts-expect-error window.adsbygoogle is injected by Google script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
      } catch (err) {
        console.error("AdSense initialization error:", err);
      }
    }
  }, [isProduction]);

  const minHeightClass =
    format === "horizontal"
      ? "min-h-[90px] sm:min-h-[100px]"
      : format === "rectangle"
      ? "min-h-[250px] sm:min-h-[280px]"
      : "min-h-[120px] sm:min-h-[250px]";

  return (
    <div
      aria-label="Advertisement container"
      className={`w-full my-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-rule bg-surface/50 p-3 transition-colors ${minHeightClass} ${className}`}
    >
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-rule/40 text-[10px] font-mono text-muted/80 uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-[9px] bg-paper px-1.5 py-0.5 rounded border border-rule/50">
          AdSense Ready
        </span>
      </div>

      {isProduction ? (
        <ins
          ref={adRef}
          className="adsbygoogle block w-full text-center"
          style={{ display: "block" }}
          data-ad-client={adClientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-3">
          <p className="text-xs font-mono font-medium text-muted">
            [Google AdSense Responsive Unit]
          </p>
          <p className="text-[11px] text-muted/70 mt-1 max-w-md">
            Slot reserved with fixed dimensions to eliminate Cumulative Layout Shift (CLS). Configure{" "}
            <code className="text-ink font-semibold">NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> in your production environment variables to activate live ad serving.
          </p>
        </div>
      )}
    </div>
  );
}
