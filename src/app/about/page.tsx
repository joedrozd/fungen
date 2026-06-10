import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About & FAQ | One-Hour Activity Generator",
  description:
    "What the Activity Generator is, how it works, and answers to common questions about finding fun and productive things to do in an hour.",
};

const faqs = [
  {
    question: "What is the Activity Generator?",
    answer:
      "It's a free tool that suggests things to do when you have a spare hour. Pick between leisure ideas (creative, outdoor, social, and more) and productive ideas (career, organization, finance, and more), then hit Generate for a random suggestion.",
  },
  {
    question: "How are the activities chosen?",
    answer:
      "Activities are hand-curated into themed categories. When you click Generate, one is picked at random from the categories you've selected — or from a single category if you've narrowed it down. Every activity is designed to be doable in roughly an hour with little or no special equipment.",
  },
  {
    question: "Is it free? Do I need an account?",
    answer:
      "Completely free, no account needed. Your favourites, ratings, and recent activities are stored locally in your browser, so they stay on your device.",
  },
  {
    question: "What's the difference between Leisure and Productive?",
    answer:
      "Leisure activities are about enjoyment and recharging — games, food, creativity, mindfulness, time outdoors. Productive activities help you make progress on something — your career, finances, home, health, or skills. Both are designed to fit into a single hour.",
  },
  {
    question: "Can I save activities I like?",
    answer:
      "Yes. After generating an activity, use the Save button to add it to My List. You can also rate activities with a thumbs up or down to give feedback, and share ideas with friends using the share buttons.",
  },
  {
    question: "How often is new content added?",
    answer:
      "The activity library grows over time — there are currently 260+ activities across 14 categories, and new ideas and categories are added regularly.",
  },
];

export default function AboutPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navigation breadcrumb={[{ name: "About" }]} />

      <main className="flex-1 p-8 pt-24">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Hero */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 text-center">
            <h1 className="text-4xl font-bold mb-3 text-gray-900">About the Activity Generator</h1>
            <p className="text-lg text-gray-800 leading-relaxed">
              Ever finished work, sat down, and thought &ldquo;I have an hour free… now what?&rdquo;
              That&apos;s exactly the moment this site is built for. One click gives you a fun or
              productive idea you can actually do — no scrolling, no decision fatigue.
            </p>
          </div>

          {/* How it works */}
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl">How it works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  <span className="font-medium">Pick a mood</span> — choose Leisure when you want to
                  relax and recharge, or Productive when you want to get something done.
                </li>
                <li>
                  <span className="font-medium">Narrow it down (optional)</span> — pick a specific
                  category like Outdoor, Creative, Financial, or Skills.
                </li>
                <li>
                  <span className="font-medium">Generate</span> — get a random activity, complete
                  with a short description of how to approach it.
                </li>
                <li>
                  <span className="font-medium">Save the keepers</span> — add favourites to My List,
                  rate ideas, and share the good ones with friends.
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl">Frequently asked questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-semibold text-gray-900 mb-1">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Link href="/">
              <Button size="lg">Try the Generator</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
