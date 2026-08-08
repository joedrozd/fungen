import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ActivityActions } from "@/components/ActivityActions";
import { JsonLd } from "@/components/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import {
  BASE_URL,
  getActivity,
  getAllActivities,
  getRelatedActivities,
} from "@/lib/activities";

type PageProps = {
  params: Promise<{ category: string; activity: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllActivities().map(({ activity, category }) => ({
    category: category.slug,
    activity: activity.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, activity: activitySlug } = await params;
  const found = getActivity(categorySlug, activitySlug);
  if (!found) return {};

  const { activity, category } = found;
  const url = `${BASE_URL}/activities/${category.slug}/${activity.slug}`;
  const title = activity.seo?.title ?? `${activity.name} — A One-Hour Guide`;
  const description =
    activity.seo?.metaDescription ??
    activity.description ??
    `How to ${activity.name.toLowerCase()} in about an hour, step by step.`;

  return {
    title,
    description,
    keywords: activity.seo
      ? [activity.seo.primaryKeyword, ...activity.seo.secondaryKeywords]
      : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: activity.image ? [{ url: activity.image, alt: activity.name }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ActivityPage({ params }: PageProps) {
  const { category: categorySlug, activity: activitySlug } = await params;
  const found = getActivity(categorySlug, activitySlug);
  if (!found) notFound();

  const { activity, category } = found;
  const content = activity.content;
  const related = getRelatedActivities(activity);
  const url = `${BASE_URL}/activities/${category.slug}/${activity.slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Activities", item: `${BASE_URL}/activities` },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${BASE_URL}/activities/${category.slug}`,
      },
      { "@type": "ListItem", position: 4, name: activity.name, item: url },
    ],
  };

  const structuredData: Record<string, unknown>[] = [breadcrumbLd];

  if (content?.howTo?.length) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: activity.name,
      description: activity.seo?.metaDescription ?? activity.description,
      url,
      image: activity.image ? `${BASE_URL}${activity.image}` : undefined,
      totalTime: `PT${activity.meta?.timeMinutes ?? 60}M`,
      estimatedCost:
        activity.meta?.cost === "free"
          ? { "@type": "MonetaryAmount", currency: "USD", value: "0" }
          : undefined,
      supply: activity.meta?.equipment?.map((item) => ({ "@type": "HowToSupply", name: item })),
      step: content.howTo.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.step,
        text: step.detail,
      })),
    });
  }

  if (content?.faq?.length) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  const needsDisclaimer =
    category.slug === "financial" || category.slug === "health-fitness";

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
      <JsonLd data={structuredData} />
      <Navigation
        breadcrumb={[
          { name: "Activities", href: "/activities" },
          { name: category.name, href: `/activities/${category.slug}` },
          { name: activity.name },
        ]}
      />

      <main className="flex-1 p-4 md:p-8 pt-24 md:pt-24">
        <article className="max-w-3xl mx-auto">
          {/* Hero */}
          <header className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 mb-8">
            {activity.image && (
              <div className="relative w-full h-56 md:h-72">
                <Image
                  src={activity.image}
                  alt={`${activity.seo?.primaryKeyword ?? activity.name}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6 md:p-8">
              <Link
                href={`/activities/${category.slug}`}
                className="text-sm font-semibold text-indigo-600 hover:underline"
              >
                {category.name}
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                {activity.name}
              </h1>
              {activity.description && (
                <p className="text-lg text-gray-700 leading-relaxed">{activity.description}</p>
              )}

              {activity.meta && (
                <dl className="flex flex-wrap gap-2 mt-5 text-sm">
                  <div className="px-3 py-1 bg-gray-100 rounded-full">
                    <dt className="inline text-gray-500">Time: </dt>
                    <dd className="inline font-medium">{activity.meta.timeMinutes} min</dd>
                  </div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full">
                    <dt className="inline text-gray-500">Cost: </dt>
                    <dd className="inline font-medium capitalize">{activity.meta.cost}</dd>
                  </div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full">
                    <dt className="inline text-gray-500">Difficulty: </dt>
                    <dd className="inline font-medium capitalize">{activity.meta.difficulty}</dd>
                  </div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full">
                    <dt className="inline text-gray-500">Where: </dt>
                    <dd className="inline font-medium">
                      {activity.meta.indoor ? "Indoors" : "Outdoors"}
                    </dd>
                  </div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full">
                    <dt className="inline text-gray-500">Best: </dt>
                    <dd className="inline font-medium">
                      {activity.meta.solo ? "Solo" : "With others"}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          </header>

          {content ? (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 mb-8">
              <p className="text-lg text-gray-800 leading-relaxed mb-8">{content.intro}</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Why {lowerFirst(activity.name)} is worth an hour
              </h2>
              <p className="text-gray-800 leading-relaxed mb-8">{content.whyItWorks}</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                How to {lowerFirst(activity.name)} step by step
              </h2>
              <ol className="space-y-4 mb-8">
                {content.howTo.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.step}</h3>
                      <p className="text-gray-700 leading-relaxed">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Tips to get more out of it
              </h2>
              <ul className="list-disc pl-5 space-y-2 mb-8 text-gray-800 leading-relaxed">
                {content.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">Ways to mix it up</h2>
              <p className="text-gray-800 leading-relaxed mb-8">{content.variations}</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {activity.name}: frequently asked questions
              </h2>
              <div className="space-y-5">
                {content.faq.map((item, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900">{item.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>

              {needsDisclaimer && (
                <p className="mt-8 pt-6 border-t text-sm text-gray-500">
                  This guide is general information, not professional{" "}
                  {category.slug === "financial" ? "financial" : "medical"} advice. See our{" "}
                  <Link href="/disclaimer" className="underline hover:text-blue-600">
                    disclaimer
                  </Link>
                  .
                </p>
              )}
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 mb-8">
              <p className="text-gray-700">
                The full guide for this activity is being written. In the meantime, browse the rest
                of{" "}
                <Link
                  href={`/activities/${category.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {category.name}
                </Link>
                .
              </p>
            </div>
          )}

          <div className="mb-8">
            <ActivityActions activityName={activity.name} />
          </div>

          {related.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white bg-black/30 px-4 py-2 rounded-lg inline-block">
                Related activities
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map(({ activity: rel, category: relCat }) => (
                  <Link
                    key={rel.slug}
                    href={`/activities/${relCat.slug}/${rel.slug}`}
                    className="block group"
                  >
                    <Card className="h-full bg-white/90 hover:shadow-xl transition-all">
                      <CardContent className="p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                          {relCat.name}
                        </p>
                        <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                          {rel.name}
                        </h3>
                        {rel.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {rel.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
}

/**
 * Lowercases the first character so an activity name reads naturally inside a
 * sentence-style heading ("How to take a walk…"), while leaving acronyms and
 * proper nouns like "LinkedIn" or "Excel" untouched.
 */
function lowerFirst(name: string): string {
  const [first, second] = [name[0], name[1]];
  if (second && second === second.toUpperCase() && /[A-Za-z]/.test(second)) return name;
  return first.toLowerCase() + name.slice(1);
}
