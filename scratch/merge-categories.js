// Phase 3 — merges category hub content (plan.md §6) into the public JSON.
// Usage: node scratch/merge-categories.js content/categories.json
//
// Batch file is keyed by category slug and holds { intro, body }. The existing
// short `description` is left alone; it still serves the card and meta tags.
const fs = require("fs");
const path = require("path");

const PUB = path.join(__dirname, "..", "public");
const FILES = ["activities.json", "productive-activities.json"];

const batchPath = process.argv[2];
if (!batchPath) {
  console.error("usage: node scratch/merge-categories.js <batch.json>");
  process.exit(1);
}

const batch = JSON.parse(fs.readFileSync(path.resolve(__dirname, batchPath), "utf8"));

const loaded = FILES.map((file) => ({
  file,
  fullPath: path.join(PUB, file),
  data: JSON.parse(fs.readFileSync(path.join(PUB, file), "utf8")),
}));

const index = new Map();
for (const entry of loaded) {
  for (const category of entry.data.categories) index.set(category.slug, { category, entry });
}

const touched = new Set();
let applied = 0;

for (const [slug, content] of Object.entries(batch)) {
  const target = index.get(slug);
  if (!target) {
    console.error(`x unknown category slug: ${slug}`);
    process.exit(1);
  }
  if (!content.intro || !content.body) {
    console.error(`x ${slug} needs both intro and body`);
    process.exit(1);
  }
  target.category.content = { intro: content.intro, body: content.body };
  touched.add(target.entry.file);
  applied++;
}

for (const entry of loaded) {
  if (!touched.has(entry.file)) continue;
  fs.writeFileSync(entry.fullPath, JSON.stringify(entry.data, null, 2) + "\n");
}

const withContent = [...index.values()].filter((t) => t.category.content).length;
console.log(`merged ${applied} categories from ${path.basename(batchPath)}`);
console.log(`categories with hub content: ${withContent}/${index.size}`);
