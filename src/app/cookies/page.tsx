import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Cookie Policy | One-Hour Activity Generator",
  description:
    "How the Activity Generator uses cookies and similar tracking technologies.",
};

export default function CookiesPage() {
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
      <Navigation breadcrumb={[{ name: "Cookie Policy" }]} />

      <main className="flex-1 p-8 pt-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 text-center">
            <h1 className="text-4xl font-bold mb-3 text-gray-900">Cookie Policy</h1>
            <p className="text-sm text-gray-500">Last updated: July 5, 2026</p>
          </div>

          <Card className="bg-white/90">
            <CardContent className="space-y-6 text-gray-700 text-sm leading-relaxed pt-6">
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">What Are Cookies?</h2>
                <p>
                  Cookies are small text files that are stored on your browser or device when you visit a
                  website. They are widely used to make websites work more efficiently, provide a better
                  user experience, and give website owners information about how their site is used.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">How We Use Cookies</h2>
                <p>We use cookies for the following purposes:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    <strong>Essential Cookies</strong> &mdash; These are necessary for the Service to
                    function properly and cannot be disabled. They do not store any personally identifiable
                    information.
                  </li>
                  <li>
                    <strong>Analytics Cookies</strong> &mdash; We use Google Analytics to understand how
                    visitors interact with the Service. These cookies collect anonymised information about
                    pages visited, time spent, and how users arrived at the site.
                  </li>
                  <li>
                    <strong>Advertising Cookies</strong> &mdash; We use Google AdSense to serve
                    advertisements. These cookies may be used to personalise ads based on your interests
                    and browsing history across websites.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Cookies We Set</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 pr-4 font-semibold text-gray-900">Cookie</th>
                        <th className="py-2 pr-4 font-semibold text-gray-900">Provider</th>
                        <th className="py-2 pr-4 font-semibold text-gray-900">Purpose</th>
                        <th className="py-2 font-semibold text-gray-900">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4">_ga</td>
                        <td className="py-2 pr-4">Google</td>
                        <td className="py-2 pr-4">Distinguishes unique users for analytics</td>
                        <td className="py-2">2 years</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4">_gid</td>
                        <td className="py-2 pr-4">Google</td>
                        <td className="py-2 pr-4">Distinguishes unique users for analytics</td>
                        <td className="py-2">24 hours</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4">_gat</td>
                        <td className="py-2 pr-4">Google</td>
                        <td className="py-2 pr-4">Throttles request rate for analytics</td>
                        <td className="py-2">1 minute</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">NID / AID</td>
                        <td className="py-2 pr-4">Google</td>
                        <td className="py-2 pr-4">Ad personalisation and measurement</td>
                        <td className="py-2">6 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Local Storage</h2>
                <p>
                  In addition to cookies, we use your browser&#39;s localStorage to store your preferences,
                  saved activities (favourites), and ratings. This data stays on your device and is never
                  sent to our servers. You can clear this data at any time through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Managing Cookies</h2>
                <p>
                  Most web browsers allow you to control and manage cookies through their settings. You can
                  typically choose to block all cookies, delete existing cookies, or receive a notification
                  when a cookie is set. Please note that disabling certain cookies may affect the
                  functionality of the Service.
                </p>
                <p className="mt-2">
                  To learn how to manage cookies in your browser, visit the help pages for your specific
                  browser:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
                <p className="mt-4">
                  You can also opt out of Google Analytics tracking by installing the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Google Analytics Opt-Out Browser Add-On
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Changes</h2>
                <p>
                  We may update this Cookie Policy from time to time. Changes will be posted on this page
                  with an updated &ldquo;Last updated&rdquo; date.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact</h2>
                <p>
                  If you have any questions about our use of cookies, please contact us through the channels
                  available on our About page.
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