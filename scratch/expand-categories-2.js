// Second expansion pass. Sentences here are sized to each category's remaining
// deficit; the first pass left everything short of the 380-word floor.
// Not idempotent — run once.
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "content", "categories.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));

const ADDITIONS = {
  outdoor: {
    body: { 0: "Daylight is the real constraint in winter, so check when it gets dark before committing to anything." },
  },
  "food-drink": {
    body: { 0: "Cooking for other people also raises the stakes usefully, which is why a deadline improves most kitchen projects." },
  },
  mindfulness: {
    body: { 0: "None of this is a substitute for treatment, and the guides say so wherever the distinction matters." },
  },
  social: {
    body: {
      0: "Reciprocity matters here in a way it does not elsewhere, since the other person has to want the same thing.",
      2: "Cash is worth carrying for community events, since small venues frequently cannot take card payments at all.",
    },
  },
  games: {
    body: {
      0: "A defined ending is the underrated feature, because it gives you a natural point to stop rather than drifting onward.",
      2: "Space matters too: jigsaws and board games need a table you can leave undisturbed for longer than one sitting.",
    },
  },
  "career-development": {
    body: {
      0: "The work compounds, since a clear record of what you did makes every subsequent conversation about your career easier.",
      2: "Time is the binding constraint rather than material, and these are best done in one uninterrupted block rather than in fragments.",
      3: "Whatever you produce, save it somewhere personal rather than on a work system you may lose access to.",
    },
  },
  organization: {
    body: {
      0: "Each also has a maintenance cost, and choosing systems with a low one is what determines whether they survive past March.",
      2: "Bin bags and a shredder cover most of the physical side, and both are more useful than any storage purchase.",
    },
  },
  skills: {
    body: { 0: "Most also improve something you already do daily rather than adding a new activity to an already full week." },
  },
  financial: {
    body: {
      0: "Nothing here requires any expertise, and the activities that feel most intimidating are usually the simplest to complete.",
      2: "A quiet hour matters more than any tool, since these tasks are unpleasant to do while being interrupted.",
    },
  },
  "personal-growth": {
    body: {
      0: "The artefact is the test: if nothing was written down, the hour was reflection rather than progress.",
      2: "Honesty is the actual input here, and it is the reason these work better alone than in a group setting.",
      3: "Keeping everything in one document also matters, since the value of most of these emerges only when you reread them months later.",
    },
  },
  "home-improvement": {
    body: {
      0: "Renting changes what is available to you, so check your tenancy before starting anything that alters the property.",
      2: "Photographing anything before you dismantle it is the single most useful habit in this entire category.",
      3: "Working when you are unhurried matters as well, since almost every DIY mistake happens in the last ten minutes.",
    },
  },
  "health-fitness": {
    body: { 0: "Nothing here is medical advice, and where an activity carries genuine risk the individual guide says so explicitly." },
  },
};

let changed = 0;
for (const [slug, add] of Object.entries(ADDITIONS)) {
  const entry = data[slug];
  if (!entry) throw new Error(`unknown category: ${slug}`);
  const paragraphs = entry.body.split("\n\n");
  for (const [index, sentence] of Object.entries(add.body)) {
    const i = Number(index);
    if (!paragraphs[i]) throw new Error(`${slug} has no paragraph ${i}`);
    paragraphs[i] = `${paragraphs[i]} ${sentence}`;
    changed++;
  }
  entry.body = paragraphs.join("\n\n");
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + "\n");

const words = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;
let total = 0;
let outOfRange = 0;
for (const [slug, v] of Object.entries(data)) {
  const n = words(v.intro) + words(v.body);
  total += n;
  const bad = n < 380 || n > 440;
  if (bad) outOfRange++;
  console.log(slug.padEnd(20), n, bad ? "  <-- OUT OF RANGE" : "");
}
console.log(`${changed} additions | TOTAL: ${total} | out of range: ${outOfRange}`);
