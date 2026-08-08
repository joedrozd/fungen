import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/CategoryView";
import { JsonLd } from "@/components/JsonLd";
import { BASE_URL, getAllCategories, getCategory } from "@/lib/activities";

type PageProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const title = `${category.name} Activities — ${category.activities.length} Ideas for Your Next Hour`;
  const description =
    category.description?.slice(0, 158) ??
    `Browse ${category.activities.length} ${category.name.toLowerCase()} activities you can start in the next hour.`;
  const url = `${BASE_URL}/activities/${category.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const otherCategories = getAllCategories()
    .filter((c) => c.slug !== category.slug)
    .map((c) => ({ name: c.name, slug: c.slug, count: c.activities.length }));

  const activities = category.activities.map((a) => ({
    name: a.name,
    slug: a.slug,
    description: a.description,
    image: a.image,
  }));

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
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} activities`,
    description: category.description,
    numberOfItems: category.activities.length,
    itemListElement: category.activities.map((activity, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: activity.name,
      url: `${BASE_URL}/activities/${category.slug}/${activity.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, itemListLd]} />
      <CategoryView
        categoryName={category.name}
        categorySlug={category.slug}
        kind={category.kind}
        activities={activities}
        otherCategories={otherCategories}
      >
        <header className="mb-8 bg-white/85 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3 text-gray-900">{category.name}</h1>
            {category.description && (
              <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-4 leading-relaxed">
                {category.description}
              </p>
            )}
            <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
              {category.activities.length} activities in this category
            </div>
          </div>

          {category.content && (
            <div className="mt-8 prose prose-slate max-w-none text-gray-800 leading-relaxed space-y-4 text-left">
              <p className="text-lg">{category.content.intro}</p>
              {category.content.body.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </header>
      </CategoryView>
    </>
  );
}
