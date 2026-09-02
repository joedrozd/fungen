// Phase 1.1 — plan.md §11 data hygiene + §3 schema: add `slug` to every
// category and activity, resolve duplicates/miscategorizations, fix spelling.
// Idempotent: safe to re-run.
const fs = require("fs");
const path = require("path");

const PUB = path.join(__dirname, "..", "public");
const LEISURE = path.join(PUB, "activities.json");
const PRODUCTIVE = path.join(PUB, "productive-activities.json");

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const leisure = JSON.parse(fs.readFileSync(LEISURE, "utf8"));
const productive = JSON.parse(fs.readFileSync(PRODUCTIVE, "utf8"));

const findCat = (data, name) => data.categories.find((c) => c.name === name);
const findIdx = (cat, name) => cat.activities.findIndex((a) => a.name === name);

// ---------------------------------------------------------------------------
// §11.1 / §11.2 — differentiate exact and near duplicates rather than delete,
// so the page count and the generator pool stay intact.
// ---------------------------------------------------------------------------
const RENAMES = [
  {
    file: "productive",
    category: "Personal Growth",
    from: "Practice mindfulness for focus",
    to: "Build a focus practice for deep work",
    description:
      "Train your attention with short, deliberate focus blocks so you can drop into demanding work without reaching for your phone.",
  },
  {
    file: "productive",
    category: "Personal Growth",
    from: "Create a professional growth plan",
    to: "Map your growth over the next 90 days",
    description:
      "Pick two things you want to be visibly better at by the end of the quarter and decide exactly how you'll practise them.",
  },
  {
    file: "productive",
    category: "Organization",
    from: "Set up a household inventory",
    to: "Set up a household supplies inventory",
    description:
      "Track the consumables you actually run out of — cleaning supplies, batteries, pantry staples — so restocking stops being a guess.",
  },
];

// ---------------------------------------------------------------------------
// §11.3 / §11.4 — move miscategorized activities to the category whose
// keyword context actually matches them.
// ---------------------------------------------------------------------------
const MOVES = [
  { name: "Learn about business analytics", from: "Financial", to: "Skills" },
  { name: "Create a personal productivity system", from: "Financial", to: "Organization" },
  { name: "Learn about business communication", from: "Personal Growth", to: "Skills" },
];

// ---------------------------------------------------------------------------
// §11.9 — American spelling
// ---------------------------------------------------------------------------
const SPELLING = [
  [/tranquillity/g, "tranquility"],
  [/\bpractise\b/g, "practice"],
  [/\bcolour/g, "color"],
  [/\bfavourite/g, "favorite"],
  [/\borganise/g, "organize"],
  [/\brecognise/g, "recognize"],
];

// --- apply renames ---------------------------------------------------------
let renamed = 0;
for (const r of RENAMES) {
  const data = r.file === "productive" ? productive : leisure;
  const cat = findCat(data, r.category);
  if (!cat) throw new Error(`category not found: ${r.category}`);
  const i = findIdx(cat, r.from);
  if (i === -1) continue; // already applied
  cat.activities[i].name = r.to;
  cat.activities[i].description = r.description;
  renamed++;
}

// --- apply moves -----------------------------------------------------------
let moved = 0;
for (const m of MOVES) {
  for (const data of [leisure, productive]) {
    const src = findCat(data, m.from);
    if (!src) continue;
    const i = findIdx(src, m.name);
    if (i === -1) continue;
    const [activity] = src.activities.splice(i, 1);
    const dest = findCat(data, m.to) || findCat(leisure, m.to) || findCat(productive, m.to);
    if (!dest) throw new Error(`destination category not found: ${m.to}`);
    dest.activities.push(activity);
    moved++;
  }
}

// --- slugs + spelling ------------------------------------------------------
const seen = new Map();
let slugged = 0;
let spelled = 0;

const fixSpelling = (s) => {
  if (typeof s !== "string") return s;
  let out = s;
  for (const [re, to] of SPELLING) out = out.replace(re, to);
  if (out !== s) spelled++;
  return out;
};

for (const data of [leisure, productive]) {
  for (const cat of data.categories) {
    cat.slug = slugify(cat.name);
    if (cat.description) cat.description = fixSpelling(cat.description);

    for (const a of cat.activities) {
      if (typeof a === "string") throw new Error(`string activity found: ${a}`);
      a.name = fixSpelling(a.name);
      if (a.description) a.description = fixSpelling(a.description);

      // Slugs are permanent once written — never re-derive over an existing one.
      if (!a.slug) {
        a.slug = slugify(a.name);
        slugged++;
      }

      const prev = seen.get(a.slug);
      if (prev) throw new Error(`duplicate slug "${a.slug}" in ${prev} and ${cat.name}`);
      seen.set(a.slug, cat.name);
    }
  }
}

// --- key order: name, slug, description, image, ...rest --------------------
const reorder = (a) => {
  const { name, slug, description, image, ...rest } = a;
  return { name, slug, description, image, ...rest };
};
for (const data of [leisure, productive]) {
  data.categories = data.categories.map((cat) => {
    const { name, slug, description, activities, ...rest } = cat;
    return { name, slug, description, ...rest, activities: activities.map(reorder) };
  });
}

// Validate the in-memory result before touching disk.
const counts = [...leisure.categories, ...productive.categories]
  .map((c) => {
    if (!Array.isArray(c.activities)) throw new Error(`${c.name} lost its activities`);
    if (!c.slug) throw new Error(`${c.name} has no slug`);
    return `${c.name}=${c.activities.length}`;
  })
  .join(", ");

fs.writeFileSync(LEISURE, JSON.stringify(leisure, null, 2) + "\n");
fs.writeFileSync(PRODUCTIVE, JSON.stringify(productive, null, 2) + "\n");

console.log(`renamed=${renamed} moved=${moved} slugged=${slugged} spellingFixes=${spelled}`);
console.log(`total activities=${seen.size}`);
console.log(counts);
