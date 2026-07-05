import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service | One-Hour Activity Generator",
  description:
    "Terms and conditions governing your use of the Activity Generator website and services.",
};

export default function TermsPage() {
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
      <Navigation breadcrumb={[{ name: "Terms of Service" }]} />

      <main className="flex-1 p-8 pt-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 text-center">
            <h1 className="text-4xl font-bold mb-3 text-gray-900">Terms of Service</h1>
            <p className="text-sm text-gray-500">Last updated: July 5, 2026</p>
          </div>

          <Card className="bg-white/90">
            <CardContent className="space-y-6 text-gray-700 text-sm leading-relaxed pt-6">
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the Activity Generator website (&ldquo;the Service&rdquo;), you agree to be bound by
                  these Terms of Service. If you do not agree with any part of these terms, you must not use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Description of Service</h2>
                <p>
                  The Activity Generator is a free tool that provides random activity suggestions for leisure and
                  productive purposes. The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without
                  any warranties, express or implied.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">3. User Responsibilities</h2>
                <p>
                  You agree to use the Service only for lawful purposes and in a manner that does not infringe the
                  rights of, or restrict the use of, the Service by any third party. You are solely responsible for
                  your interactions with the Service and any activities you choose to undertake based on suggestions
                  provided.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Intellectual Property</h2>
                <p>
                  All content, text, images, logos, and design elements on the Service are the property of the
                  Activity Generator or its licensors and are protected by applicable intellectual property laws.
                  You may not reproduce, distribute, modify, or create derivative works without prior written consent.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Limitation of Liability</h2>
                <p>
                  The Activity Generator and its operators shall not be liable for any direct, indirect, incidental,
                  special, or consequential damages arising from your use of the Service or any activities suggested
                  by the Service. You acknowledge that activity suggestions are for entertainment and informational
                  purposes only.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Third-Party Links</h2>
                <p>
                  The Service may contain links to third-party websites or services that are not owned or controlled
                  by the Activity Generator. We have no control over, and assume no responsibility for, the content,
                  privacy policies, or practices of any third-party websites.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. Changes will be effective
                  immediately upon posting. Your continued use of the Service after any changes constitutes acceptance
                  of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the United Kingdom,
                  without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Contact</h2>
                <p>
                  If you have any questions about these Terms, please contact us through the channels available on
                  our About page.
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