// plan.md §8 — content validator. Fails loudly on any rule violation.
// Usage: node scratch/validate-content.js [categorySlug ...]
// With no args, validates every activity that has a `content` block.
const fs = require("fs");
const path = require("path");

const PUB = path.join(__dirname, "..", "public");
const FILES = ["activities.json", "productive-activities.json"];

const DISCLAIMER_CATEGORIES = new Set(["financial", "health-fitness"]);
const WORD_MIN = 380;
const WORD_MAX = 440;

// plan.md §4 rule 5 — the site standardizes on American spelling. Written
// content drifts British easily, so this is checked rather than trusted.
const BRITISH_SPELLINGS = [
  [/\borganis\w*/i, "organiz-"],
  [/\brecognis\w*/i, "recogniz-"],
  [/\bcategoris\w*/i, "categoriz-"],
  [/\bprioritis\w*/i, "prioritiz-"],
  [/\bnormalis\w*/i, "normaliz-"],
  // Not \brealis\w* — that swallows "realistic", which is correct in both.
  [/\brealis(e|es|ed|ing)\b/i, "realiz-"],
  [/\bbehaviour\w*/i, "behavior-"],
  [/\bcolour\w*/i, "color-"],
  [/\bfavourit\w*/i, "favorit-"],
  [/\bpractis\w*/i, "practic-"],
  [/\bsceptic\w*/i, "skeptic-"],
  [/\bcentimetre\w*/i, "centimeter-"],
  [/\bmetres\b/i, "meters"],
  [/\bfortnight\w*/i, "two weeks"],
  [/\bwhilst\b/i, "while"],
  [/\bspecialism\b/i, "specialty"],
];

const errors = [];
const warnings = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const words = (s) => String(s).trim().split(/\s+/).filter(Boolean);
const normalize = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// --- load ------------------------------------------------------------------
const categories = [];
for (const file of FILES) {
  const data = JSON.parse(fs.readFileSync(path.join(PUB, file), "utf8"));
  for (const c of data.categories) categories.push({ ...c, file });
}

const filter = process.argv.slice(2);
const allSlugs = new Set();
const allActivities = [];
for (const cat of categories) {
  for (const a of cat.activities) {
    allSlugs.add(a.slug);
    allActivities.push({ activity: a, category: cat });
  }
}

// --- global slug uniqueness (all 264, not per category) --------------------
{
  const seen = new Map();
  for (const { activity, category } of allActivities) {
    if (!activity.slug) fail(`${category.slug}/?`, `"${activity.name}" has no slug`);
    else if (seen.has(activity.slug))
      fail(activity.slug, `duplicate slug, also in ${seen.get(activity.slug)}`);
    else seen.set(activity.slug, category.slug);
    if (activity.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(activity.slug))
      fail(activity.slug, "slug is not URL-safe kebab-case");
  }
}

// --- per-activity checks ---------------------------------------------------
const targets = allActivities.filter(
  ({ activity, category }) =>
    activity.content && (filter.length === 0 || filter.includes(category.slug))
);

// sentence -> first activity that used it, for cross-activity dup detection
const sentenceOwner = new Map();

for (const { activity, category } of targets) {
  const where = `${category.slug}/${activity.slug}`;
  const c = activity.content;
  const seo = activity.seo;

  // --- seo block ---
  if (!seo) {
    fail(where, "has content but no seo block");
  } else {
    if (!seo.title) fail(where, "seo.title missing");
    else if (seo.title.length > 60)
      fail(where, `seo.title is ${seo.title.length} chars (max 60)`);

    if (!seo.metaDescription) fail(where, "seo.metaDescription missing");
    else if (seo.metaDescription.length < 140 || seo.metaDescription.length > 158)
      fail(
        where,
        `seo.metaDescription is ${seo.metaDescription.length} chars (need 140-158)`
      );

    if (!seo.primaryKeyword) fail(where, "seo.primaryKeyword missing");
    if (!Array.isArray(seo.secondaryKeywords) || seo.secondaryKeywords.length < 2)
      fail(where, "needs at least 2 secondaryKeywords");
  }

  // --- structure ---
  if (!c.intro) fail(where, "content.intro missing");
  if (!c.whyItWorks) fail(where, "content.whyItWorks missing");
  if (!c.variations) fail(where, "content.variations missing");
  if (!Array.isArray(c.howTo) || c.howTo.length < 5 || c.howTo.length > 6)
    fail(where, `howTo has ${c.howTo?.length ?? 0} steps (need 5-6)`);
  if (!Array.isArray(c.tips) || c.tips.length < 3 || c.tips.length > 4)
    fail(where, `tips has ${c.tips?.length ?? 0} bullets (need 3-4)`);
  if (!Array.isArray(c.faq) || c.faq.length !== 3)
    fail(where, `faq has ${c.faq?.length ?? 0} entries (need exactly 3)`);

  for (const step of c.howTo ?? []) {
    if (!step.step || !step.detail) fail(where, "howTo entry missing step or detail");
  }
  for (const item of c.faq ?? []) {
    if (!item.q || !item.a) fail(where, "faq entry missing q or a");
    if (item.q && !item.q.trim().endsWith("?")) fail(where, `faq question missing "?": ${item.q}`);
  }

  // --- word count ---
  const bodyParts = [
    c.intro,
    c.whyItWorks,
    ...(c.howTo ?? []).flatMap((s) => [s.step, s.detail]),
    ...(c.tips ?? []),
    c.variations,
    ...(c.faq ?? []).flatMap((f) => [f.q, f.a]),
  ].filter(Boolean);
  const body = bodyParts.join(" ");
  const wc = words(body).length;
  if (wc < WORD_MIN || wc > WORD_MAX) fail(where, `body is ${wc} words (need ${WORD_MIN}-${WORD_MAX})`);

  // --- keyword placement + density ---
  if (seo?.primaryKeyword) {
    const kw = normalize(seo.primaryKeyword);
    const kwWords = kw.split(" ").length;
    const normBody = normalize(body);

    if (seo.title && !normalize(seo.title).includes(kw))
      warn(where, `primaryKeyword "${seo.primaryKeyword}" not in seo.title`);

    const first100 = normalize(words(c.intro ?? "").slice(0, 100).join(" "));
    if (!first100.includes(kw))
      fail(where, `primaryKeyword "${seo.primaryKeyword}" not in first 100 words of intro`);

    const headingSource = [activity.name, ...(c.howTo ?? []).map((s) => s.step)].join(" ");
    if (!normalize(headingSource).includes(kw))
      warn(where, `primaryKeyword "${seo.primaryKeyword}" not reflected in any heading`);

    const occurrences = normBody.split(kw).length - 1;
    const density = ((occurrences * kwWords) / wc) * 100;
    if (density > 2.5)
      fail(where, `keyword density ${density.toFixed(2)}% exceeds 2.5% (${occurrences} uses)`);
  }

  // --- related ---
  if (!Array.isArray(activity.related) || activity.related.length < 2)
    fail(where, `needs at least 2 related slugs (has ${activity.related?.length ?? 0})`);
  for (const slug of activity.related ?? []) {
    if (slug === activity.slug) fail(where, "related links to itself");
    else if (!allSlugs.has(slug)) fail(where, `related slug "${slug}" does not resolve`);
  }

  // --- meta ---
  if (!activity.meta) fail(where, "meta block missing");
  else {
    const m = activity.meta;
    if (typeof m.timeMinutes !== "number") fail(where, "meta.timeMinutes must be a number");
    if (!["free", "low", "medium"].includes(m.cost)) fail(where, `bad meta.cost "${m.cost}"`);
    if (!["easy", "moderate", "challenging"].includes(m.difficulty))
      fail(where, `bad meta.difficulty "${m.difficulty}"`);
    if (typeof m.indoor !== "boolean") fail(where, "meta.indoor must be boolean");
    if (typeof m.solo !== "boolean") fail(where, "meta.solo must be boolean");
    if (!Array.isArray(m.equipment)) fail(where, "meta.equipment must be an array");
  }

  // --- disclaimer ---
  if (DISCLAIMER_CATEGORIES.has(category.slug)) {
    const hasDisclaimer = /(?:not|rather than|and not)\s+(?:financial|medical|professional|legal|tax)\s+advice|a (?:financial|medical) professional|qualified (?:adviser|advisor|professional)|talk to (?:a|your) (?:doctor|GP|adviser|advisor|accountant)|check with (?:a|your) (?:doctor|adviser|advisor)/i.test(
      body
    );
    if (!hasDisclaimer)
      fail(where, "financial/health activity has no disclaimer sentence in the body");
  }

  // --- American spelling (plan.md §4 rule 5) ---
  for (const [re, correct] of BRITISH_SPELLINGS) {
    const hit = body.match(re);
    if (hit) fail(where, `British spelling "${hit[0]}" — use "${correct}"`);
  }

  // --- cross-activity duplicate sentences (>12 words) ---
  for (const raw of body.split(/(?<=[.!?])\s+/)) {
    const s = normalize(raw);
    if (words(s).length <= 12) continue;
    if (sentenceOwner.has(s) && sentenceOwner.get(s) !== where) {
      fail(where, `duplicate sentence shared with ${sentenceOwner.get(s)}: "${raw.slice(0, 70)}..."`);
    } else {
      sentenceOwner.set(s, where);
    }
  }
}

// --- image existence (all activities, not just written ones) ---------------
for (const { activity, category } of allActivities) {
  if (!activity.image) continue;
  const p = path.join(PUB, activity.image.replace(/^\//, ""));
  if (!fs.existsSync(p)) warn(`${category.slug}/${activity.slug}`, `image missing: ${activity.image}`);
}

// --- report ----------------------------------------------------------------
const written = targets.length;
const total = allActivities.length;
console.log(`validated ${written} activities with content (${total} total)`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  const shown = warnings.slice(0, 20);
  for (const w of shown) console.log(`  ! ${w}`);
  if (warnings.length > shown.length) console.log(`  ... ${warnings.length - shown.length} more`);
}

if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error(`  x ${e}`);
  process.exit(1);
}

console.log("\nall checks passed");
