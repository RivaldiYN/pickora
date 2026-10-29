import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { siteConfig, getSiteUrl } from "@/lib/seo";
import { ShieldCheck, Target, Sparkles, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Editorial Standards",
  description:
    "Learn about Pickora's mission, editorial independence, and rigorous product curation methodology across tech, audio, and outdoor gear.",
  alternates: {
    canonical: `${getSiteUrl()}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="border-b border-rule pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono text-muted border border-rule bg-surface mb-3">
            <ShieldCheck className="size-3.5 text-accent" />
            <span>EDITORIAL INDEPENDENCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            About Pickora
          </h1>
          <p className="mt-3 text-base text-muted max-w-2xl">
            We cut through the noise of paid promotions and cluttered marketplace algorithms to curate gear and tech that genuinely deliver lasting value.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-10 text-ink text-sm sm:text-base leading-relaxed">
          <section className="bg-surface border border-rule rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink flex items-center gap-2 mb-3">
              <Target className="size-5 text-accent" />
              Our Mission
            </h2>
            <p className="text-muted">
              Modern consumer search is broken. Between sponsored search results, algorithmic dropshipping clones, and pay-to-play review roundups, finding reliable gear has become tedious. Pickora was created to provide a clean, uncluttered, and strictly vetted index of top-tier recommendations across running, cycling, audio, desk setups, and everyday essentials.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
              <Award className="size-5 text-accent" />
              Our Curation & Testing Methodology
            </h2>
            <p className="text-muted">
              Every item featured in the Pickora index must pass a strict three-tier verification process:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg border border-rule bg-surface">
                <div className="font-mono text-xs text-accent font-bold mb-1">STEP 01</div>
                <div className="font-semibold text-ink mb-1">Durability & Build</div>
                <p className="text-xs text-muted">
                  We evaluate materials, tear-down reports, manufacturer track records, and long-term user sentiment.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-rule bg-surface">
                <div className="font-mono text-xs text-accent font-bold mb-1">STEP 02</div>
                <div className="font-semibold text-ink mb-1">Price-to-Value Ratio</div>
                <p className="text-xs text-muted">
                  We ensure you are paying for engineering excellence, not celebrity endorsements or marketing markup.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-rule bg-surface">
                <div className="font-mono text-xs text-accent font-bold mb-1">STEP 03</div>
                <div className="font-semibold text-ink mb-1">Retail Reliability</div>
                <p className="text-xs text-muted">
                  Links point only to authorized, high-reputation retail partners with verified customer warranty policies.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-surface border border-rule rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink flex items-center gap-2 mb-3">
              <Sparkles className="size-5 text-accent" />
              Editorial Integrity & Advertising Policy
            </h2>
            <p className="text-muted mb-4">
              Pickora maintains 100% editorial separation between product evaluations and business operations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted">
              <li>
                <strong className="text-ink">No Paid Reviews:</strong> We never accept payment, free sponsored placement, or pre-conditions from manufacturers in exchange for being listed.
              </li>
              <li>
                <strong className="text-ink">Transparent Affiliate Links:</strong> Some outbound links earn us a small commission when a purchase is completed. This never influences pricing or product ranking.
              </li>
              <li>
                <strong className="text-ink">Unobtrusive Ads:</strong> Any advertisements displayed on our site are clearly distinguishable from editorial recommendations and never dictate our picks.
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
