# Image brief

**Status: closed.** All 264 activities carry a photograph. The 42 that were
missing one were sourced from Unsplash on 2026-08-08; this file is kept as the
spec for activities added later.

## Specification

- **Dimensions:** 1200x800 or larger, landscape. Cards crop to roughly 3:2, hero to 16:9, so keep the subject centered and away from the edges.
- **Format:** JPEG for photographs, PNG only if the image has flat color or transparency.
- **Filename:** must match the slug exactly, e.g. `start-a-jigsaw-puzzle.jpg`.
- **Location:** `public/images/activities/`.
- **Then set** `"image": "/images/activities/<slug>.<ext>"` on that activity in the JSON. If the image needs credit, set `credit` alongside it (see below); the caption renders itself.
- **Alt text** is generated from the activity name and primary keyword; no manual alt is needed.
- **Licensing:** must be owned or licensed for commercial use. The site runs AdSense.

## Adding one by hand

Drop the file in `public/images/activities/` and set the field. An activity with
no `image` falls back to a generated SVG hero
([ActivityHeroFallback](src/components/ActivityHeroFallback.tsx)), so nothing
breaks in the meantime.

```json
"image": "/images/activities/some-slug.jpg",
"credit": {
  "photographer": "Jane Doe",
  "photographerUrl": "https://unsplash.com/@janedoe",
  "photoUrl": "https://unsplash.com/photos/abc123",
  "source": "Unsplash"
}
```

`credit` is optional — omit it for images we own. The 222 original images carry
none, which is why the caption is conditional rather than site-wide.

## Sourcing in bulk from Unsplash

Needs a free Access Key from https://unsplash.com/developers in
`.env.local` as `UNSPLASH_ACCESS_KEY`. Unauthenticated access does not work:
the search endpoint returns `Authorization required` and the public search page
hits bot detection. A demo key allows 50 requests/hour, and each activity costs
one — the scripts are resumable so a rate-limit stop can be picked up later.

```sh
node scratch/unsplash-search.js --per 3   # candidates + thumbnails
node scratch/contact-sheet.js             # one reviewable sheet per activity
# look at scratch/sheets/*.jpg, record picks in scratch/unsplash-choices.json
node scratch/unsplash-download.js         # download picks, write the JSON
```

Review the contact sheets before downloading. Search returns plausible-but-wrong
results often enough to matter: the first pass here returned candle chandeliers
for a meditation candle, pub trivia-night signage for an online quiz, and four
crops of the same Bible page for blackout poetry on newsprint. Queries live in
[scratch/unsplash-queries.js](scratch/unsplash-queries.js) — concrete noun
phrases beat slugs, because Unsplash matches photographer tags.

Downloads use a center crop, matching how the thumbnails are generated, so the
image reviewed is the image that ships. `crop=entropy` would pick a different
region than the one approved.
