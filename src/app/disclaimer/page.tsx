import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Disclaimer | One-Hour Activity Generator",
  description:
    "Disclaimers regarding the use of the Activity Generator and the suggestions it provides.",
};

export default function DisclaimerPage() {
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
      <Navigation breadcrumb={[{ name: "Disclaimer" }]} />

      <main className="flex-1 p-8 pt-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 text-center">
            <h1 className="text-4xl font-bold mb-3 text-gray-900">Disclaimer</h1>
            <p className="text-sm text-gray-500">Last updated: July 5, 2026</p>
          </div>

          <Card className="bg-white/90">
            <CardContent className="space-y-6 text-gray-700 text-sm leading-relaxed pt-6">
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">1. General Information</h2>
                <p>
                  The Activity Generator provides activity suggestions for entertainment and informational
                  purposes only. The suggestions are general ideas and should not be taken as professional
                  advice of any kind, including but not limited to medical, legal, financial, or safety
                  advice.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">2. No Professional Advice</h2>
                <p>
                  The activity suggestions provided by the Service are not a substitute for professional
                  advice. You should exercise your own judgement and, where appropriate, consult with
                  qualified professionals before undertaking any activity, particularly those that may
                  involve physical risk, financial decisions, or legal considerations.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Personal Responsibility</h2>
                <p>
                  You are solely responsible for any actions you take based on suggestions from the
                  Service. The Activity Generator and its operators accept no liability for any injuries,
                  losses, damages, or other consequences resulting from the use of the Service or the
                  undertaking of any suggested activity.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Health & Safety</h2>
                <p>
                  Some suggested activities may involve physical exertion, the use of tools or equipment,
                  or exposure to outdoor environments. Before attempting any activity, please:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Assess your own fitness and health condition</li>
                  <li>Take appropriate safety precautions</li>
                  <li>Use proper equipment and protective gear where needed</li>
                  <li>Follow local laws, regulations, and guidelines</li>
                  <li>Consult a medical professional if you have any health concerns</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Third-Party Content</h2>
                <p>
                  The Service may link to third-party websites, products, or services. We do not endorse,
                  control, or assume responsibility for the accuracy, completeness, or safety of any
                  third-party content. Your use of third-party services is at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Accuracy of Information</h2>
                <p>
                  While we strive to keep the activity library accurate and up to date, we make no
                  representations or warranties of any kind about the completeness, accuracy, reliability,
                  or suitability of any suggestion. Activity descriptions are general and may not apply to
                  your specific circumstances or location.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">7. No Endorsement</h2>
                <p>
                  The inclusion of any activity, product, service, or link in the Service does not imply
                  endorsement by the Activity Generator. Conversely, the exclusion of any activity,
                  product, service, or link does not imply disapproval.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Changes</h2>
                <p>
                  We may update this Disclaimer from time to time. Changes will be posted on this page
                  with an updated &ldquo;Last updated&rdquo; date.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Contact</h2>
                <p>
                  If you have any questions about this Disclaimer, please contact us through the channels
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