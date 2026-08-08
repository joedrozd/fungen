// One-off: brings each category hub body up to the 380-440 band from plan.md §6.
// Appends to the intro and to specific body paragraphs (0-indexed) per category.
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "content", "categories.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));

// slug -> { intro?: string, body?: { [paragraphIndex]: string } }
const ADDITIONS = {
  outdoor: {
    body: {
      3: "Comfortable footwear is the one thing genuinely worth having, because sore feet end an outing faster than bad weather does.",
    },
  },
  creative: {
    intro: "Nearly everything here can be started with materials already in your house, which removes the shopping trip that quietly postpones creative intentions.",
    body: {
      1: "The distinction worth holding onto is between making for an outcome and making for the hour itself, since only the second survives a bad result.",
      3: "Where a purchase is needed, the cheapest version is genuinely sufficient to answer the only question that matters on a first attempt.",
    },
  },
  learning: {
    intro: "An hour also tells you something useful about yourself, namely whether the subject holds your attention once the novelty has gone.",
    body: {
      1: "None of these require prior knowledge, and several are more interesting precisely because you are approaching them without any.",
      3: "Libraries remain an underused resource here, since most of them lend equipment, run classes and provide access to material that is otherwise paywalled.",
    },
  },
  "food-drink": {
    intro: "Almost everything in this category also produces something you can share, which is a quality very few solo activities have.",
    body: {
      1: "Failure is unusually cheap here too, since a disappointing result still gets eaten and still teaches you what went wrong.",
      3: "Ingredients are the real cost, and buying the smallest quantity of anything unfamiliar is the sensible approach to a first attempt.",
    },
  },
  mindfulness: {
    intro: "Several of these also have reasonable research behind them, and where the evidence is weaker than popular accounts suggest, the individual guides say so.",
    body: {
      1: "Feeling that you are doing it wrong is the standard beginner experience across every practice here, and it is not a useful signal about anything.",
      3: "Privacy matters more than equipment does, since self-consciousness is the obstacle that actually stops people practising at home.",
    },
  },
  social: {
    intro: "The activities also differ sharply in how much organizing they need, from a single message to coordinating an evening for eight people.",
    body: {
      1: "Several of these benefit somebody else as much as they benefit you, which makes them easier to justify spending an hour on.",
      3: "Timing is the one resource that matters: most of these work far better when the other person is not already stretched.",
    },
  },
  games: {
    intro: "Several also improve with repetition in a way that makes the second and third session better than the first, which is not true of most leisure.",
    body: {
      1: "Games are also one of the few reliable ways to spend an hour with people of very different ages without anybody being bored.",
      3: "Libraries and board game cafés both let you try things before committing, which is worth doing before any significant purchase.",
    },
  },
  "career-development": {
    intro: "None of these require you to be job hunting, and several are more useful precisely because you are not.",
    body: {
      1: "Each also produces something reusable, which means the hour keeps paying off at every review, application and salary conversation afterwards.",
      3: "Your own calendar and sent mail are the other under-used inputs, since both contain a record of what you actually did.",
    },
  },
  organization: {
    intro: "The other consistent theme is that sorting comes before storage, because containers bought first mostly enable keeping more than you should.",
    body: {
      1: "Each of these also removes a small recurring friction rather than solving something once, which is where the compounding value sits.",
      3: "A shared note that everyone in the household can edit is worth more than any dedicated application nobody else will open.",
    },
  },
  skills: {
    intro: "Each is also small enough that you can decide within the first ten minutes whether it is worth continuing.",
    body: {
      1: "These are also unusually visible to other people, since they show up in how your emails read and how your meetings run.",
      3: "Your own recent work is the best practice material available, and it is the reason these skills stick where tutorial exercises do not.",
    },
  },
  financial: {
    intro: "Several also take considerably less than an hour, which makes them the highest-value short tasks anywhere on this site.",
    body: {
      1: "The uncomfortable ones are usually the valuable ones, since the numbers people avoid checking are the numbers that have drifted.",
      3: "Setting aside twenty minutes to recover the logins you cannot find is a legitimate and frequently necessary first session.",
    },
  },
  "personal-growth": {
    intro: "Several also depend on each other, so the order you attempt them in affects how much any individual one achieves.",
    body: {
      1: "The discomfort is usually the signal that something is working, since the areas people avoid examining are rarely the trivial ones.",
      3: "An hour without interruption is genuinely harder to find than any material here, and it is the actual prerequisite.",
    },
  },
  "home-improvement": {
    intro: "Several also cost nothing at all and take under fifteen minutes, which is a poor reason to have been postponing them for years.",
    body: {
      1: "Prevention is the theme throughout, since almost every expensive household failure was cheap and simple to avoid beforehand.",
      3: "Your appliance handbooks are worth locating too, because generic advice is frequently wrong for your specific model.",
    },
  },
  "health-fitness": {
    intro: "The other consistent point is that consistency beats optimization, which is why several guides recommend doing less than you were planning.",
    body: {
      1: "Several also compound with each other, particularly sleep and activity, in ways that make either one alone less effective.",
      3: "Time is the real constraint, and every activity here has a shorter version specifically for the weeks when the full one is unrealistic.",
    },
  },
};

let changed = 0;
for (const [slug, add] of Object.entries(ADDITIONS)) {
  const entry = data[slug];
  if (!entry) throw new Error(`unknown category: ${slug}`);

  if (add.intro) {
    entry.intro = `${entry.intro} ${add.intro}`;
    changed++;
  }
  if (add.body) {
    const paragraphs = entry.body.split("\n\n");
    for (const [index, sentence] of Object.entries(add.body)) {
      const i = Number(index);
      if (!paragraphs[i]) throw new Error(`${slug} has no paragraph ${i}`);
      paragraphs[i] = `${paragraphs[i]} ${sentence}`;
      changed++;
    }
    entry.body = paragraphs.join("\n\n");
  }
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + "\n");

const words = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;
let total = 0;
for (const [slug, v] of Object.entries(data)) {
  const n = words(v.intro) + words(v.body);
  total += n;
  const flag = n < 380 || n > 440 ? "  <-- OUT OF RANGE" : "";
  console.log(slug.padEnd(20), n, flag);
}
console.log(`${changed} additions | TOTAL: ${total}`);
