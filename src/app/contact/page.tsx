import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { getSiteUrl } from "@/lib/seo";
import { Mail, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us & Inquiries",
  description:
    "Get in touch with the Pickora editorial desk for feedback, suggestions, product correction requests, or business inquiries.",
  alternates: {
    canonical: `${getSiteUrl()}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="border-b border-rule pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono text-muted border border-rule bg-surface mb-3">
            <Mail className="size-3.5 text-accent" />
            <span>COMMUNICATION DESK</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Contact Us
          </h1>
          <p className="mt-3 text-base text-muted">
            Have a question, feedback on a recommendation, or spotted an outdated price or broken retail link? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-xl border border-rule bg-surface">
            <div className="font-semibold text-ink mb-1 flex items-center gap-2">
              <MessageSquare className="size-4 text-accent" />
              Editorial & Feedback
            </div>
            <p className="text-xs text-muted mb-3">
              Direct thoughts, corrections on gear specs, or suggestions for products we should test.
            </p>
            <a
              href="mailto:editorial@pickora.com"
              className="text-sm font-mono font-medium text-ink hover:underline"
            >
              editorial@pickora.com
            </a>
          </div>

          <div className="p-6 rounded-xl border border-rule bg-surface">
            <div className="font-semibold text-ink mb-1 flex items-center gap-2">
              <Mail className="size-4 text-accent" />
              General & Compliance
            </div>
            <p className="text-xs text-muted mb-3">
              Inquiries regarding privacy rights, copyright notices, or business partnerships.
            </p>
            <a
              href="mailto:contact@pickora.com"
              className="text-sm font-mono font-medium text-ink hover:underline"
            >
              contact@pickora.com
            </a>
          </div>
        </div>

        {/* Message Guidelines box */}
        <div className="rounded-xl border border-rule bg-surface p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-muted shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-muted space-y-2">
              <p className="font-medium text-ink">
                Note on Unsolicited Promotional Pitches
              </p>
              <p>
                To maintain our editorial integrity and trust with our readers, we do not accept sponsored content, pay-for-placement product listings, or guest posts. Inquiries requesting paid backlinks or guaranteed positive reviews will be ignored.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
