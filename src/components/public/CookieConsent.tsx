"use client";

import * as React from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "pickora_cookie_consent";

export function CookieConsent() {
  const [showConsent, setShowConsent] = React.useState(false);

  React.useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        setShowConsent(true);
      }
    } catch {
      // localStorage may be unavailable in some private windows
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setShowConsent(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {}
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-surface border border-rule shadow-lg rounded-xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Cookie className="size-5 text-accent shrink-0 mt-0.5" />
          <div className="space-y-1.5 flex-1 text-xs text-muted leading-relaxed">
            <div className="font-semibold text-ink text-sm">
              Cookie &amp; Privacy Choices
            </div>
            <p>
              We use cookies and third-party tools (such as Google AdSense and analytics) to measure site traffic and deliver relevant recommendations. Read our{" "}
              <Link href="/privacy" className="text-ink underline font-medium">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/disclosure" className="text-ink underline font-medium">
                Affiliate Disclosure
              </Link>
              .
            </p>
          </div>
          <button
            onClick={handleDecline}
            className="text-muted hover:text-ink p-1 -mr-1 -mt-1 rounded transition-colors"
            aria-label="Dismiss cookie banner"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-rule/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDecline}
            className="text-xs h-8 px-3 text-muted hover:text-ink"
          >
            Essential Only
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="text-xs h-8 px-4 bg-ink text-paper hover:bg-ink/90"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
