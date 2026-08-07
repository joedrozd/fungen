import { readFileSync } from "fs";
import { join } from "path";

export const BASE_URL = "https://fungen.app";

export type HowToStep = { step: string; detail: string };
export type FaqItem = { q: string; a: string };

export type ActivitySeo = {
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
};

export type ActivityContent = {
  intro: string;
  whyItWorks: string;
  howTo: HowToStep[];
  tips: string[];
  variations: string;
  faq: FaqItem[];
};

export type ActivityMeta = {
  timeMinutes: number;
  cost: "free" | "low" | "medium";
  difficulty: "easy" | "moderate" | "challenging";
  indoor: boolean;
  solo: boolean;
  equipment: string[];
};

export type Activity = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  seo?: ActivitySeo;
  content?: ActivityContent;
  meta?: ActivityMeta;
  related?: string[];
};

export type CategoryContent = {
  intro: string;
  body: string;
};

export type Category = {
  name: string;
  slug: string;
  description?: string;
  content?: CategoryContent;
  activities: Activity[];
};

export type CategoryKind = "leisure" | "productive";

export type CategoryWithKind = Category & { kind: CategoryKind };

export type ActivityWithContext = {
  activity: Activity;
  category: CategoryWithKind;
};

type CategoryFile = { categories: Category[] };

function readCategoryFile(fileName: string, kind: CategoryKind): CategoryWithKind[] {
  const raw = readFileSync(join(process.cwd(), "public", fileName), "utf-8");
  const data = JSON.parse(raw) as CategoryFile;
  return data.categories.map((category) => ({ ...category, kind }));
}

// Read once per process. In dev this means an edit to the JSON needs a restart,
// which is the same tradeoff sitemap.ts already makes.
let cache: CategoryWithKind[] | null = null;

export function getAllCategories(): CategoryWithKind[] {
  if (!cache) {
    cache = [
      ...readCategoryFile("activities.json", "leisure"),
      ...readCategoryFile("productive-activities.json", "productive"),
    ];
  }
  return cache;
}

export function getCategoriesByKind(kind: CategoryKind): CategoryWithKind[] {
  return getAllCategories().filter((category) => category.kind === kind);
}

export function getCategory(slug: string): CategoryWithKind | undefined {
  return getAllCategories().find((category) => category.slug === slug);
}

export function getAllActivities(): ActivityWithContext[] {
  return getAllCategories().flatMap((category) =>
    category.activities.map((activity) => ({ activity, category }))
  );
}

export function getActivity(
  categorySlug: string,
  activitySlug: string
): ActivityWithContext | undefined {
  const category = getCategory(categorySlug);
  if (!category) return undefined;
  const activity = category.activities.find((a) => a.slug === activitySlug);
  if (!activity) return undefined;
  return { activity, category };
}

/**
 * Resolves an activity's `related` slugs to real activities. Silently drops
 * slugs that no longer exist so a stale reference can never break a build.
 */
export function getRelatedActivities(activity: Activity): ActivityWithContext[] {
  if (!activity.related?.length) return [];
  const all = getAllActivities();
  return activity.related
    .map((slug) => all.find((entry) => entry.activity.slug === slug))
    .filter((entry): entry is ActivityWithContext => Boolean(entry));
}

export function activityUrl(categorySlug: string, activitySlug: string): string {
  return `/activities/${categorySlug}/${activitySlug}`;
}

/** True once an activity has its full ~400-word body written (plan.md Phase 2). */
export function hasLongForm(activity: Activity): boolean {
  return Boolean(activity.content?.intro && activity.content.howTo?.length);
}
