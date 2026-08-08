// plan.md §4 rule 5 — enforce American spelling across batch content files.
// Idempotent. Run over scratch/content/*.json, then re-merge each batch.
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "content");

// British -> American. Order matters: longer forms first so stems don't
// partially match (organisations before organisation before organise).
const RULES = [
  ["organisations", "organizations"],
  ["organisation", "organization"],
  ["reorganised", "reorganized"],
  ["organising", "organizing"],
  ["organised", "organized"],
  ["organise", "organize"],
  ["recognising", "recognizing"],
  ["recognise", "recognize"],
  ["categorising", "categorizing"],
  ["categorises", "categorizes"],
  ["categorise", "categorize"],
  ["prioritise", "prioritize"],
  ["normalise", "normalize"],
  ["realising", "realizing"],
  ["realise", "realize"],
  ["behavioural", "behavioral"],
  ["behaviours", "behaviors"],
  ["behaviour", "behavior"],
  ["colours", "colors"],
  ["colour", "color"],
  ["practising", "practicing"],
  ["practised", "practiced"],
  ["practises", "practices"],
  ["practise", "practice"],
  ["scepticism", "skepticism"],
  ["sceptical", "skeptical"],
  ["specialism", "specialty"],
  ["centimetres", "centimeters"],
  ["centimetre", "centimeter"],
  ["metres", "meters"],
  ["fortnight", "two weeks"],
];

const applyCase = (replacement, original) =>
  original[0] === original[0].toUpperCase()
    ? replacement[0].toUpperCase() + replacement.slice(1)
    : replacement;

let totalChanges = 0;
const perFile = {};

for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))) {
  const full = path.join(DIR, file);
  let text = fs.readFileSync(full, "utf8");
  let changes = 0;

  for (const [from, to] of RULES) {
    // \b on both sides so "metre" never matches inside "parameter".
    text = text.replace(new RegExp(`\\b${from}\\b`, "gi"), (match) => {
      changes++;
      return applyCase(to, match);
    });
  }

  if (changes) {
    fs.writeFileSync(full, text);
    perFile[file] = changes;
    totalChanges += changes;
  }
}

console.log(`${totalChanges} spelling fixes`, perFile);
