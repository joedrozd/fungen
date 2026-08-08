import { MetadataRoute } from "next";
import { BASE_URL, getAllActivities, getAllCategories, hasLongForm } from "@/lib/activities";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const categoryUrls: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${BASE_URL}/activities/${category.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Activities whose long-form guide is written rank on their own; the rest are
  // still thin, so they get a lower priority until Phase 2 reaches them.
  const activityUrls: MetadataRoute.Sitemap = getAllActivities().map(({ activity, category }) => ({
    url: `${BASE_URL}/activities/${category.slug}/${activity.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: hasLongForm(activity) ? 0.6 : 0.4,
  }));

  return [
    { url: BASE_URL, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/activities`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/terms`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/cookies`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    ...categoryUrls,
    ...activityUrls,
  ];
}
