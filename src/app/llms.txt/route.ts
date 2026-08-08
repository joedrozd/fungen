import {
  BASE_URL,
  getAllActivities,
  getCategoriesByKind,
  hasLongForm,
  type CategoryWithKind,
} from "@/lib/activities";

// Generated rather than served from public/, so it cannot drift out of sync
// with the activity data the way a hand-maintained file does.
export const dynamic = "force-static";

function categorySection(heading: string, categories: CategoryWithKind[]): string {
  const lines = [`### ${heading}`, ""];

  for (const category of categories) {
    lines.push(`#### ${category.name} (${category.activities.length} activities)`);
    lines.push("");
    lines.push(`[${category.name}](${BASE_URL}/activities/${category.slug})`);
    if (category.description) lines.push(`> ${category.description}`);
    lines.push("");
    for (const activity of category.activities) {
      const url = `${BASE_URL}/activities/${category.slug}/${activity.slug}`;
      lines.push(`- [${activity.name}](${url})`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function GET() {
  const leisure = getCategoriesByKind("leisure");
  const productive = getCategoriesByKind("productive");
  const all = getAllActivities();
  const written = all.filter(({ activity }) => hasLongForm(activity)).length;

  const body = `# fungen.app

> One-Hour Activity Generator — ${all.length} things to do in an hour, each with a full step-by-step guide.

## What is this?

fungen.app helps people find something to do with a spare hour. Activities are split
into leisure and productive, across ${leisure.length + productive.length} categories.
${written} of the ${all.length} activities have a dedicated guide covering why the
activity works, how to do it step by step, tips, variations and frequently asked
questions. Guides in the Financial and Health & Fitness categories are general
information only and are not professional advice.

## Key pages

- [Home](${BASE_URL}/) — random activity generator
- [All Activities](${BASE_URL}/activities) — every category
- [About](${BASE_URL}/about)
- [Disclaimer](${BASE_URL}/disclaimer)

## URL structure

- Category: \`${BASE_URL}/activities/{category-slug}\`
- Activity: \`${BASE_URL}/activities/{category-slug}/{activity-slug}\`

## Activities

${categorySection("Leisure", leisure)}
${categorySection("Productive", productive)}
## Raw data

Activity data is served as JSON and is free to use.

- Leisure: [${BASE_URL}/activities.json](${BASE_URL}/activities.json)
- Productive: [${BASE_URL}/productive-activities.json](${BASE_URL}/productive-activities.json)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
