import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { BASE_URL, getAllActivities, getCategoriesByKind, type CategoryWithKind } from "@/lib/activities";

const title = "Activity Ideas: Things to Do With Your Next Hour";
const description =
  "Find activity ideas for home, outdoors, friends or a productive hour. Browse practical guides and choose a small first step that fits your time and budget.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${BASE_URL}/activities` },
  openGraph: { title, description, url: `${BASE_URL}/activities`, type: "website" },
};

function CategorySection({
  heading,
  categories,
  hoverClass,
}: {
  heading: string;
  categories: CategoryWithKind[];
  hoverClass: string;
}) {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-6 text-primary bg-card/95 px-4 py-2 rounded-lg inline-block shadow-sm">
        {heading}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/activities/${cat.slug}`} className="block group">
            <Card className="h-full hover:shadow-none transition-all duration-300  bg-card">
              <CardHeader className="p-4">
                <CardTitle className={`text-xl transition-colors ${hoverClass}`}>
                  {cat.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {cat.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{cat.description}</p>
                )}
                <p className="text-sm text-muted-foreground">{cat.activities.length} activities</p>
                <Button className="mt-4 w-full" variant="outline" size="sm">
                  Browse
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ActivitiesPage() {
  const leisureCategories = getCategoriesByKind("leisure");
  const productiveCategories = getCategoriesByKind("productive");
  const total = getAllActivities().length;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Activities", item: `${BASE_URL}/activities` },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${BASE_URL}/activities`,
    hasPart: [...leisureCategories, ...productiveCategories].map((cat) => ({
      "@type": "CollectionPage",
      name: cat.name,
      url: `${BASE_URL}/activities/${cat.slug}`,
    })),
  };

  return (
    <div
      className="min-h-screen flex flex-col site-scenic"
    >
      <JsonLd data={[breadcrumbLd, collectionLd]} />
      <Navigation breadcrumb={[{ name: "Activities" }]} />

      <main className="flex-1 p-8 pt-36">
        <div className="max-w-6xl mx-auto">
          <header className="bg-card rounded-2xl p-8 shadow-none border border-border mb-12 text-center">
            <h1 className="text-4xl font-semibold text-primary mb-3">Activity Ideas for Your Next Hour</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {total} activities across {leisureCategories.length + productiveCategories.length}{" "}
              categories, split between leisure ideas for when you want to enjoy an hour and
              productive ones for when you want to use it. Every activity has its own step-by-step
              guide.
            </p>
          </header>

          <section className="bg-card rounded-2xl p-6 md:p-8 border border-border mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-3">What can you do in an hour?</h2>
            <p className="leading-relaxed mb-4">At home, try a short writing exercise, a small drawing or one folder of document scanning. Outdoors, plan a local walk or a short nature visit, allowing travel separately. With friends, try a word game or arrange a catch-up. For a productive hour, choose one task with a clear stopping point rather than a whole project.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <p><Link className="text-primary underline" href="/activities/creative">Creative activities at home</Link> give you a small project to start with materials you already have.</p>
              <p><Link className="text-primary underline" href="/activities/social">Social activities for adults</Link> include games, conversations, group ideas and plans for meeting people.</p>
              <p><Link className="text-primary underline" href="/activities/outdoor/visit-a-nature-reserve">Plan a nature outing</Link> by checking local access, paths and the time you have.</p>
              <p><Link className="text-primary underline" href="/activities/skills/practice-typing-speed-exercises">Practise a useful skill</Link> with a focused typing drill and a way to review your progress.</p>
            </div>
            <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Prefer a random activity?</h2>
            <p className="leading-relaxed">Use the <Link className="text-primary underline" href="/">random activity generator</Link> to pick an idea, or the <Link className="text-primary underline" href="/solo-day-out-generator">solo day out generator</Link> for an outing. The guide describes a starting session; trips, events and longer projects may need more time or advance booking.</p>
          </section>

          <div className="grid md:grid-cols-2 gap-12">
            <CategorySection
              heading="Leisure"
              categories={leisureCategories}
              hoverClass="group-hover:text-primary"
            />
            <CategorySection
              heading="Productive"
              categories={productiveCategories}
              hoverClass="group-hover:text-amber-600"
            />
          </div>
        </div>
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
}
