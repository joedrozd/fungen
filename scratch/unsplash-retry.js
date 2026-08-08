/**
 * Re-searches specific slugs whose first-pass candidates were all unusable, and
 * replaces their candidate list in place. Kept separate from unsplash-search.js
 * because that script deliberately skips slugs it has already done.
 *
 *   UNSPLASH_ACCESS_KEY=... node scratch/unsplash-retry.js
 *
 * One request per slug: a demo key allows 50/hour and the first pass spent 42.
 */
const fs = require("fs");
const path = require("path");

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) {
  console.error("UNSPLASH_ACCESS_KEY is not set.");
  process.exit(1);
}

/** Why each pass failed, so the replacement query targets the actual gap. */
const RETRIES = {
  // "quiz question laptop screen" gave bare laptop product shots with nothing on
  // screen. Widening to the game itself rather than the device.
  "take-an-online-trivia-quiz": "quiz night questions game",
  // "newspaper page text close up" returned four crops of the same Bible page —
  // wrong material, and scripture is a poor fit for a games-adjacent craft page.
  "try-blackout-poetry-with-an-old-newspaper": "stack of newspapers reading",
  // Two passes returned loose pencils only. Going at the printed design directly.
  "try-mindful-coloring": "mandala coloring page",
};

const CANDIDATES = path.join(__dirname, "unsplash-candidates.json");
const THUMBS = path.join(__dirname, "thumbs");
const HEADERS = { Authorization: `Client-ID ${KEY}`, "Accept-Version": "v1" };

(async () => {
  const store = JSON.parse(fs.readFileSync(CANDIDATES, "utf8"));

  for (const [slug, query] of Object.entries(RETRIES)) {
    const url =
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}` +
      `&per_page=4&orientation=landscape&content_filter=high`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) {
      console.error(`${slug}: ${res.status} — remaining=${res.headers.get("x-ratelimit-remaining")}`);
      continue;
    }

    const results = (await res.json()).results ?? [];
    const candidates = [];
    for (let i = 0; i < results.length; i++) {
      const photo = results[i];
      // Portrait originals get letterboxed by the crop, so drop them here.
      if (photo.width / photo.height < 1.2) continue;
      const thumb = path.join(THUMBS, `${slug}--${candidates.length}.jpg`);
      const img = await fetch(`${photo.urls.raw}&w=400&q=70&fm=jpg&fit=crop`);
      fs.writeFileSync(thumb, Buffer.from(await img.arrayBuffer()));
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
        thumb,
      });
    }

    store[slug] = { ...store[slug], query, candidates };
    console.log(`${slug} — ${candidates.length} landscape candidates for "${query}"`);
  }

  fs.writeFileSync(CANDIDATES, JSON.stringify(store, null, 2));
})();
