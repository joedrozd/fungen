import type { Metadata } from "next";
import { HomeGenerator } from "@/components/HomeGenerator";
import { BASE_URL, getCategoriesByKind, type CategoryWithKind } from "@/lib/activities";

const title = "Random Activity Generator | Free Things to Do";
const description = "Find random things to do with your next hour. Use our free activity generator for leisure, creative, outdoor and productive ideas, with practical guides.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: BASE_URL },
  openGraph: { title, description, url: BASE_URL, type: "website" },
  twitter: { card: "summary", title, description },
};

// Only send the fields the interactive generator needs to the browser.
function generatorCategories(categories: CategoryWithKind[]) {
  return categories.map(({ name, slug, activities }) => ({
    name,
    slug,
    activities: activities.map(({ name, slug, description, image, meta, content }) => ({
      name, slug, description, image, meta, steps: content?.howTo.slice(0, 3),
    })),
  }));
}

export default function Home() {
  return (
    <HomeGenerator leisureCategories={generatorCategories(getCategoriesByKind("leisure"))} productiveCategories={generatorCategories(getCategoriesByKind("productive"))} />
  );
}
