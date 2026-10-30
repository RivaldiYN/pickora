"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = React.useState(false);
  const [targetUrl, setTargetUrl] = React.useState<string | null>(null);

  // Turn off spinner when route or search params change
  React.useEffect(() => {
    setIsNavigating(false);
    setTargetUrl(null);
  }, [pathname, searchParams]);

  // Intercept click on internal links
  React.useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      // Ignore external, blank targets, hash links, or download links
      if (
        !href ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        targetAttr === "_blank" ||
        anchor.hasAttribute("download") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if it's the exact same page
      const currentUrl = `${window.location.pathname}${window.location.search}`;
      if (href === currentUrl) return;

      setIsNavigating(true);
      setTargetUrl(href);
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });

    // Fallback safety timeout so it doesn't get stuck if navigation cancels
    let timer: NodeJS.Timeout | undefined;
    if (isNavigating) {
      timer = setTimeout(() => {
        setIsNavigating(false);
      }, 8000);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      if (timer) clearTimeout(timer);
    };
  }, [isNavigating]);

  if (!isNavigating) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999]"
    >
      {/* Top Animated Progress Bar */}
      <div className="h-0.5 w-full bg-accent/20 overflow-hidden">
        <div className="h-full bg-accent w-full origin-left animate-indeterminate" />
      </div>

      {/* Floating Corner Spinner Badge */}
      <div className="fixed top-4 right-4 z-[9999] flex items-center gap-2 rounded-full border border-rule bg-surface/95 px-3 py-1.5 text-xs font-medium text-ink shadow-lg backdrop-blur-xs animate-in fade-in duration-200">
        <Loader2 className="size-3.5 animate-spin text-accent" />
        <span className="font-mono text-[11px] text-muted">
          Loading {targetUrl && targetUrl !== "/" ? targetUrl.split("?")[0] : "page"}...
        </span>
      </div>
    </div>
  );
}

