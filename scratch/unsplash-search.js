/**
 * Phase 1: find candidate photos for every activity that has no image.
 *
 * Writes scratch/unsplash-candidates.json and downloads a small thumbnail per
 * candidate so the shortlist can be looked at before anything lands in public/.
 * Nothing here touches the activity JSON.
 *
 *   UNSPLASH_ACCESS_KEY=... node scratch/unsplash-search.js [--per 3]
 *
 * Resumable: slugs already present in the candidates file are skipped, so a
 * rate-limit stop can be picked up with the same command an hour later.
 */
const fs = require("fs");
const path = require("path");
const QUERIES = require("./unsplash-queries");

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) {
  console.error("UNSPLASH_ACCESS_KEY is not set. Get a free one at https://unsplash.com/developers");
  process.exit(1);
}

const ROOT = path.join(__dirname, "..");
const CANDIDATES = path.join(__dirname, "unsplash-candidates.json");
const THUMBS = path.join(__dirname, "thumbs");
const PER = Number(process.argv[process.argv.indexOf("--per") + 1]) || 3;

const API = "https://api.unsplash.com";
const HEADERS = {
  Authorization: `Client-ID ${KEY}`,
  "Accept-Version": "v1",
};

function missingSlugs() {
  const out = [];
  for (const file of ["public/activities.json", "public/productive-activities.json"]) {
    const data = JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
    for (const category of data.categories) {
      for (const activity of category.activities) {
        if (!activity.image) out.push({ file, category: category.slug, slug: activity.slug, name: activity.name });
      }
    }
  }
  return out;
}

async function search(query, perPage) {
  const url =
    `${API}/search/photos?query=${encodeURIComponent(query)}` +
    `&per_page=${perPage}&orientation=landscape&content_filter=high`;
  const res = await fetch(url, { headers: HEADERS });
  if (res.status === 403) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    throw new Error(`rate limited (x-ratelimit-remaining=${remaining}) — rerun in an hour to resume`);
  }
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return (await res.json()).results ?? [];
}

async function saveThumb(photo, slug, index) {
  const res = await fetch(`${photo.urls.raw}&w=400&q=70&fm=jpg&fit=crop`);
  if (!res.ok) return null;
  const file = path.join(THUMBS, `${slug}--${index}.jpg`);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

(async () => {
  fs.mkdirSync(THUMBS, { recursive: true });
  const store = fs.existsSync(CANDIDATES) ? JSON.parse(fs.readFileSync(CANDIDATES, "utf8")) : {};

  const todo = missingSlugs().filter((a) => !store[a.slug]);
  console.log(`${todo.length} activities to search (${Object.keys(store).length} already done)`);

  for (const activity of todo) {
    const spec = QUERIES[activity.slug];
    if (!spec) {
      console.log(`SKIP ${activity.slug} — no query defined`);
      continue;
    }

    let results = [];
    try {
      results = await search(spec.q, PER);
      if (results.length === 0 && spec.alt) results = await search(spec.alt, PER);
    } catch (err) {
      // Persist what we have so the next run resumes instead of restarting.
      fs.writeFileSync(CANDIDATES, JSON.stringify(store, null, 2));
      console.error(`STOP at ${activity.slug}: ${err.message}`);
      process.exit(2);
    }

    if (results.length === 0) {
      console.log(`NONE ${activity.slug} (${spec.q})`);
      continue;
    }

    const candidates = [];
    for (let i = 0; i < results.length; i++) {
      const photo = results[i];
      candidates.push({
        id: photo.id,
        raw: photo.urls.raw,
        width: photo.width,
        height: photo.height,
        description: photo.description || photo.alt_description || "",
        downloadLocation: photo.links.download_location,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        photoUrl: photo.links.html,
        thumb: await saveThumb(photo, activity.slug, i),
      });
    }

    store[activity.slug] = { ...activity, query: spec.q, candidates };
    fs.writeFileSync(CANDIDATES, JSON.stringify(store, null, 2));
    console.log(`OK   ${activity.slug} — ${candidates.length} candidates`);
  }

  console.log(`\nDone. ${Object.keys(store).length} slugs in ${path.relative(ROOT, CANDIDATES)}`);
})();
