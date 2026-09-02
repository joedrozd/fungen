import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | One-Hour Activity Generator",
  description:
    "How the Activity Generator collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navigation breadcrumb={[{ name: "Privacy Policy" }]} />

      <main className="flex-1 p-8 pt-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 text-center">
            <h1 className="text-4xl font-bold mb-3 text-gray-900">Privacy Policy</h1>
            <p className="text-sm text-gray-500">Last updated: September 2, 2026</p>
          </div>

          <Card className="bg-white/90">
            <CardContent className="space-y-6 text-gray-700 text-sm leading-relaxed pt-6">
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
                <h3 className="font-semibold text-gray-800 mt-3 mb-1">a. Information You Provide</h3>
                <p>
                  We do not require you to create an account or provide personal information to use the
                  Activity Generator. Any data you choose to save (e.g., favourites, ratings) is stored
                  locally in your browser using localStorage and is never transmitted to our servers.
                </p>
                <h3 className="font-semibold text-gray-800 mt-3 mb-1">b. Location Search</h3>
                <p>
                  If you use the nearby-events feature, you may enter a place or choose to share your
                  device&apos;s approximate coordinates. Location access is optional and requested only after
                  you select &ldquo;Use my location&rdquo;. The place or coordinates are sent to our server to
                  complete that search, are not saved by us, and are not added to your local activity history.
                  Coordinates and manual location searches are converted to a broader place name using
                  OpenStreetMap Nominatim. Search suggestions may be shown so you can select the intended
                  place before its town or city is used to request experience suggestions from Viator.
                </p>
                <h3 className="font-semibold text-gray-800 mt-3 mb-1">c. Automatically Collected Information</h3>
                <p>
                  When you visit the Service, we may automatically collect certain technical information,
                  including your IP address, browser type, device type, operating system, referring URLs,
                  and usage data (pages visited, time spent). This information is collected via Google
                  Analytics and is used to understand how visitors interact with the Service and to improve
                  the user experience.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>To operate, maintain, and improve the Service</li>
                  <li>To analyse usage patterns and trends</li>
                  <li>To detect, prevent, and address technical issues or abuse</li>
                  <li>To comply with applicable legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Cookies</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on the Service.
                  Cookies are small text files stored on your device by your web browser. For detailed
                  information about the cookies we use, please see our{" "}
                  <a href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</a>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Google Ads & AdSense</h2>
                <p>
                  We use Google AdSense to display advertisements on the Service. Google AdSense uses
                  cookies and web beacons to serve ads based on your visits to this site and other websites.
                  You may opt out of personalised advertising by visiting Google&#39;s{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Ads Settings
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Third-Party Services</h2>
                <p>We use the following third-party services that may collect information about you:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    <strong>Google Analytics</strong> &mdash; for website analytics. Data collected is
                    anonymised where possible. See{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google&#39;s Privacy Policy
                    </a>.
                  </li>
                  <li>
                    <strong>Google AdSense</strong> &mdash; for advertising. See{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google&#39;s Privacy Policy
                    </a>.
                  </li>
                  <li>
                    <strong>OpenStreetMap Nominatim</strong> &mdash; to provide place suggestions and convert
                    coordinates or manual searches into a place name. See the{" "}
                    <a
                      href="https://osmfoundation.org/wiki/Privacy_Policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      OpenStreetMap Foundation Privacy Policy
                    </a>.
                  </li>
                  <li>
                    <strong>Viator</strong> &mdash; to find tours and experiences for the place you search.
                    See the{" "}
                    <a
                      href="https://www.viator.com/support/privacyPolicy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Viator Privacy and Cookies Statement
                    </a>.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Data Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share
                  aggregated, anonymised data for analytical or reporting purposes. We may disclose
                  information if required to do so by law or in response to valid legal requests.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Data Retention</h2>
                <p>
                  Information collected through Google Analytics is retained for a period of up to 26 months.
                  Data stored in your browser via localStorage persists until you clear your browser data.
                  You can clear localStorage at any time through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Your Rights</h2>
                <p>
                  Depending on your jurisdiction, you may have the following rights regarding your personal
                  information:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>The right to access information we hold about you</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to object to or restrict processing</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>
                <p className="mt-2">
                  To exercise any of these rights, please contact us through the channels available on our
                  About page.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Children&#39;s Privacy</h2>
                <p>
                  The Service is not directed at children under the age of 13. We do not knowingly collect
                  personal information from children. If you believe a child has provided us with personal
                  data, please contact us so we can remove it.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">10. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your own,
                  including the United States, where our third-party service providers operate. We take
                  appropriate safeguards to ensure your information is protected.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">11. Changes</h2>
                <p>
                  We may update this Privacy Policy from time to time. Changes will be posted on this page
                  with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">12. Contact</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy, please contact us through
                  the channels available on our About page.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
