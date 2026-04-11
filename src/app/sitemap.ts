import { MetadataRoute } from "next";
import { readFileSync } from "fs";
import { join } from "path";

const BASE_URL = "https://fungen.app";

const categorySlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function getCategorySlugs(): string[] {
  const leisureData = JSON.parse(
    readFileSync(join(process.cwd(), "public", "activities.json"), "utf-8")
  );
  const productiveData = JSON.parse(
    readFileSync(
      join(process.cwd(), "public", "productive-activities.json"),
      "utf-8"
    )
  );
  return [
    ...leisureData.categories.map((c: { name: string }) =>
      categorySlug(c.name)
    ),
    ...productiveData.categories.map((c: { name: string }) =>
      categorySlug(c.name)
    ),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const categorySlugs = getCategorySlugs();

  const categoryUrls: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/activities/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/activities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...categoryUrls,
  ];
}
