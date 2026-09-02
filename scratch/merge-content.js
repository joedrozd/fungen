// Phase 2 — merges a batch content file into the public JSON.
// Usage: node scratch/merge-content.js content/career-development.json
//
// Batch files are keyed by activity slug and hold only the new fields
// (seo, content, meta, related). Existing name/slug/description/image are
// left untouched. Idempotent: re-running overwrites with the same values.
const fs = require("fs");
const path = require("path");

const PUB = path.join(__dirname, "..", "public");
const FILES = ["activities.json", "productive-activities.json"];

const batchPath = process.argv[2];
if (!batchPath) {
  console.error("usage: node scratch/merge-content.js <batch.json>");
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
  for (const category of entry.data.categories) {
    for (const activity of category.activities) {
      index.set(activity.slug, { activity, category, entry });
    }
  }
}

const touched = new Set();
let applied = 0;

for (const [slug, fields] of Object.entries(batch)) {
  const target = index.get(slug);
  if (!target) {
    console.error(`x unknown slug: ${slug}`);
    process.exit(1);
  }
  for (const key of ["seo", "content", "meta", "related"]) {
    if (fields[key] !== undefined) target.activity[key] = fields[key];
  }
  touched.add(target.entry.file);
  applied++;
}

for (const entry of loaded) {
  if (!touched.has(entry.file)) continue;
  fs.writeFileSync(entry.fullPath, JSON.stringify(entry.data, null, 2) + "\n");
}

const withContent = [...index.values()].filter((t) => t.activity.content).length;
console.log(
  `merged ${applied} activities from ${path.basename(batchPath)} into ${[...touched].join(", ")}`
);
console.log(`total activities with content: ${withContent}/${index.size}`);
