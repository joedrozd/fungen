/**
 * Phase 2: download the chosen photo per activity and wire it into the JSON.
 *
 *   UNSPLASH_ACCESS_KEY=... node scratch/unsplash-download.js [--dry]
 *
 * Reads scratch/unsplash-candidates.json plus an optional
 * scratch/unsplash-choices.json of { slug: candidateIndex } — anything not
 * listed there uses candidate 0. Writes public/images/activities/<slug>.jpg and
 * sets `image` and `credit` on the activity.
 *
 * The download_location ping is required of anything using the Unsplash API:
 * it is how a photographer's download count gets incremented. It returns a URL
 * we deliberately ignore, because the raw URL gives us sizing control.
 */
const fs = require("fs");
const path = require("path");

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) {
  console.error("UNSPLASH_ACCESS_KEY is not set.");
  process.exit(1);
}

const ROOT = path.join(__dirname, "..");
const DRY = process.argv.includes("--dry");
const OUT_DIR = path.join(ROOT, "public/images/activities");
const HEADERS = { Authorization: `Client-ID ${KEY}`, "Accept-Version": "v1" };

const candidates = JSON.parse(fs.readFileSync(path.join(__dirname, "unsplash-candidates.json"), "utf8"));
const choicesPath = path.join(__dirname, "unsplash-choices.json");
const choices = fs.existsSync(choicesPath) ? JSON.parse(fs.readFileSync(choicesPath, "utf8")) : {};

/**
 * Hero crops to 16:9 and cards to 3:2, so 1600x1067 covers both at 2x on mobile.
 * Centre crop, not `crop=entropy`: the thumbnails that were reviewed were centre
 * cropped, and entropy would pick a different region than the one approved.
 */
const SIZED = "&w=1600&h=1067&fit=crop&q=80&fm=jpg";

async function download(photo, slug) {
  const res = await fetch(photo.raw + SIZED);
  if (!res.ok) throw new Error(`${slug}: image ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  if (!DRY) fs.writeFileSync(path.join(OUT_DIR, `${slug}.jpg`), buffer);
  return buffer.length;
}

(async () => {
  const picked = {};
  for (const [slug, entry] of Object.entries(candidates)) {
    const index = choices[slug] ?? 0;
    const photo = entry.candidates[index];
    if (!photo) {
      console.log(`SKIP ${slug} — no candidate at index ${index}`);
      continue;
    }

    const bytes = await download(photo, slug);
    if (!DRY) {
      await fetch(photo.downloadLocation, { headers: HEADERS }).catch(() => {});
    }
    picked[slug] = {
      file: entry.file,
      image: `/images/activities/${slug}.jpg`,
      credit: {
        photographer: photo.photographer,
        photographerUrl: photo.photographerUrl,
        photoUrl: photo.photoUrl,
        source: "Unsplash",
      },
    };
    console.log(`${DRY ? "DRY " : "GOT "} ${slug} — ${(bytes / 1024).toFixed(0)}kB, ${photo.photographer}`);
  }

  if (DRY) return console.log(`\nDry run: ${Object.keys(picked).length} photos fetched, nothing written.`);

  for (const file of ["public/activities.json", "public/productive-activities.json"]) {
    const full = path.join(ROOT, file);
    const data = JSON.parse(fs.readFileSync(full, "utf8"));
    let touched = 0;
    for (const category of data.categories) {
      for (const activity of category.activities) {
        const hit = picked[activity.slug];
        if (!hit || hit.file !== file) continue;
        activity.image = hit.image;
        activity.credit = hit.credit;
        touched++;
      }
    }
    fs.writeFileSync(full, JSON.stringify(data, null, 2) + "\n");
    console.log(`${file}: ${touched} activities updated`);
  }
})();
