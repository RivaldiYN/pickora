import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { siteConfig, getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing the use of Pickora, our curated product directory, and affiliate link redirects.",
  alternates: {
    canonical: `${getSiteUrl()}/terms`,
  },
};

export default function TermsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="border-b border-rule pb-8 mb-8">
          <p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
            Last Updated: January {currentYear}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-base text-muted">
            Please read these Terms of Service carefully before using the {siteConfig.name} website. By accessing or using our platform, you agree to be bound by these terms.
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-muted leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">1. Editorial Curation &amp; No Warranty</h2>
            <p>
              Pickora is an informational and curation platform. The recommendations, reviews, specifications, and pricing data provided on this site are compiled in good faith. However, prices, inventory availability, shipping conditions, and retailer terms change rapidly. We make no representations or warranties of any kind regarding the accuracy, completeness, or timeliness of any content on this site. Always confirm exact specifications and prices directly on the merchant&apos;s checkout page before completing a purchase.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">2. External Links &amp; Third-Party Retailers</h2>
            <p>
              Our website contains links to third-party merchant sites (including Amazon, manufacturer direct storefronts, and specialized retailers). Pickora has no control over, and assumes no responsibility for, the content, privacy policies, fulfillment, warranty claims, or practices of any third-party websites or services. Any transaction you enter into with a third-party seller is strictly between you and that seller.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">3. Affiliate Relationship Disclosure</h2>
            <p>
              Pickora participates in various affiliate marketing programs. As described in our{" "}
              <a href="/disclosure" className="text-ink underline font-medium">
                Affiliate Disclosure
              </a>, we may earn commissions on qualifying purchases made through links found on our site at zero additional cost to you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">4. Intellectual Property</h2>
            <p>
              The original content, design system, layout, curated indices, code, and editorial text of Pickora are protected by copyright, trademark, and other applicable laws. Third-party brand names, logos, and product imagery referenced on this site belong to their respective trademark holders and are utilized under fair editorial reference.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">5. Limitation of Liability</h2>
            <p>
              In no event shall Pickora, its editors, operators, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to, use of, or inability to use this platform or any products purchased via third-party retailer links.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. Continued use of our site following any changes constitutes acceptance of the new Terms.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
