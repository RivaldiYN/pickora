import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { siteConfig, getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Pickora. Information regarding cookies, Google AdSense, analytics, and your data protection rights under GDPR and CCPA.",
  alternates: {
    canonical: `${getSiteUrl()}/privacy`,
  },
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-3 text-base text-muted">
            At Pickora, accessible from {getSiteUrl()}, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by Pickora and how we use it.
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-muted leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">1. Log Files</h2>
            <p>
              Pickora follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as a part of hosting services&apos; analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">2. Cookies and Web Beacons</h2>
            <p>
              Like any other website, Pickora uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
            </p>
          </section>

          <section className="space-y-3 bg-surface border border-rule rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink">3. Google DoubleClick DART Cookie &amp; Advertising Partners</h2>
            <p>
              Google is one of our third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to Pickora and other sites on the internet.
            </p>
            <p>
              Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL:{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink font-medium underline"
              >
                https://policies.google.com/technologies/ads
              </a>
            </p>
            <p>
              Some of the advertisers and ad networks on our site may use cookies and web beacons. Our advertising partners include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-ink">
              <li>
                <strong>Google AdSense / Google Ad Manager:</strong>{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline"
                >
                  Google Privacy &amp; Terms
                </a>
              </li>
              <li>
                <strong>Affiliate Networks (Amazon Associates, Impact, ShareASale, CJ):</strong>{" "}
                Used to track referral commissions when visitors click outbound product links.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">4. Third-Party Privacy Policies</h2>
            <p>
              Pickora&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. More detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">5. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
            <p>
              Under the California Consumer Privacy Act (CCPA), California consumers have the right to request that a business disclose the categories and specific pieces of personal data that a business has collected about consumers, request deletion of data, and request that a business not sell the consumer&apos;s personal data.
            </p>
            <p>
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at{" "}
              <a href="mailto:privacy@pickora.com" className="text-ink underline">
                privacy@pickora.com
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">6. GDPR Data Protection Rights</h2>
            <p>
              We would like to make sure you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR). Every user is entitled to the right to access, rectification, erasure, restrict processing, object to processing, and data portability.
            </p>
            <p>
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at{" "}
              <a href="mailto:privacy@pickora.com" className="text-ink underline">
                privacy@pickora.com
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">7. Children&apos;s Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              Pickora does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-ink">8. Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
