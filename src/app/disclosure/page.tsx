import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { siteConfig, getSiteUrl } from "@/lib/seo";
import { Info, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate & Advertising Disclosure",
  description:
    "Transparency and FTC-compliant disclosure regarding affiliate relationships, commissions, and advertising on Pickora.",
  alternates: {
    canonical: `${getSiteUrl()}/disclosure`,
  },
};

export default function DisclosurePage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="border-b border-rule pb-8 mb-8">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono text-muted border border-rule bg-surface mb-3">
            <Info className="size-3.5 text-accent" />
            <span>FTC 16 CFR § 255 COMPLIANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Affiliate &amp; Advertising Disclosure
          </h1>
          <p className="mt-3 text-base text-muted">
            In compliance with Federal Trade Commission (FTC) guidelines and global consumer transparency standards, we believe in being fully upfront about how Pickora sustains operations.
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-muted leading-relaxed">
          <div className="bg-surface border border-rule rounded-xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-ink">The Summary</h2>
            <p className="text-ink font-medium">
              Pickora is reader-supported. When you click through certain outbound product links on our site and make a purchase, we may earn an affiliate commission from the retailer.
            </p>
            <p>
              This comes at <strong className="text-ink">zero additional cost to you</strong>. You pay the exact same price as any other customer, and in some cases, our partner links provide access to discounted pricing or promotional codes.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-ink">How This Impacts Our Recommendations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg border border-rule bg-surface">
                <div className="flex items-center gap-2 text-ink font-semibold mb-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  What We Guarantee
                </div>
                <ul className="text-xs sm:text-sm space-y-2 text-muted">
                  <li>• We only list gear we believe in or has passed community testing.</li>
                  <li>• We frequently link to products with zero affiliate programs if it&apos;s the best option available.</li>
                  <li>• Commission rates never dictate ranking or editorial favor.</li>
                </ul>
              </div>

              <div className="p-5 rounded-lg border border-rule bg-surface">
                <div className="flex items-center gap-2 text-ink font-semibold mb-2">
                  <AlertTriangle className="size-4 text-accent" />
                  What We Never Do
                </div>
                <ul className="text-xs sm:text-sm space-y-2 text-muted">
                  <li>• We never accept pay-for-placement sponsorships.</li>
                  <li>• We do not alter review conclusions for commercial partners.</li>
                  <li>• We never sell or exchange user email lists or browsing history.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">Amazon Associates &amp; Merchant Programs</h2>
            <p>
              Pickora is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com and affiliated regional marketplaces. Additionally, we work with direct merchant affiliate programs via platforms such as Impact, ShareASale, CJ Affiliate, and partner retailer direct APIs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">Questions or Concerns?</h2>
            <p>
              If you have any questions regarding our affiliate relationships, please reach out to us at{" "}
              <a href="mailto:editorial@pickora.com" className="text-ink underline font-medium">
                editorial@pickora.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
