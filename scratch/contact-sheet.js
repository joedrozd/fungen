/**
 * Builds one contact sheet per activity: the three candidate thumbnails side by
 * side, in candidate order, so index 0/1/2 read left to right. Reviewing 42
 * sheets is tractable where reviewing 126 loose thumbnails is not.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const CANDIDATES = JSON.parse(fs.readFileSync(path.join(__dirname, "unsplash-candidates.json"), "utf8"));
const SHEETS = path.join(__dirname, "sheets");
const W = 380;
const H = 253;
const GAP = 8;

(async () => {
  fs.mkdirSync(SHEETS, { recursive: true });
  for (const [slug, entry] of Object.entries(CANDIDATES)) {
    const tiles = [];
    for (let i = 0; i < entry.candidates.length; i++) {
      const thumb = entry.candidates[i].thumb;
      if (!thumb || !fs.existsSync(thumb)) continue;
      tiles.push({
        input: await sharp(thumb).resize(W, H, { fit: "cover" }).toBuffer(),
        left: tiles.length * (W + GAP),
        top: 0,
      });
    }
    if (!tiles.length) continue;
    await sharp({
      create: {
        width: tiles.length * (W + GAP) - GAP,
        height: H,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    })
      .composite(tiles)
      .jpeg({ quality: 82 })
      .toFile(path.join(SHEETS, `${slug}.jpg`));
  }
  console.log(`sheets written to ${SHEETS}`);
})();
