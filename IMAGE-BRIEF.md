# Image brief — 42 activities without a photograph

These are the only activities on the site with no `image` field. They currently
render a generated SVG hero (see [ActivityHeroFallback](src/components/ActivityHeroFallback.tsx)),
which is deliberate placeholder art rather than a substitute for a real photo.

## Specification

- **Dimensions:** 1200x800 or larger, landscape. Cards crop to roughly 3:2, hero to 16:9, so keep the subject centered and away from the edges.
- **Format:** JPEG for photographs, PNG only if the image has flat color or transparency.
- **Filename:** must match the slug exactly, e.g. `start-a-jigsaw-puzzle.jpg`.
- **Location:** `public/images/activities/`.
- **Then set** `"image": "/images/activities/<slug>.<ext>"` on that activity in the JSON, and the fallback stops rendering automatically.
- **Alt text** is generated from the activity name and primary keyword; no manual alt is needed.
- **Licensing:** must be owned or licensed for commercial use. The site runs AdSense.

## The 42


### Outdoor

| Slug | Subject to shoot | Setting |
|---|---|---|
| `fly-a-kite-in-an-open-field` | Fly a kite in an open field — kite, gloves, open field | Outdoor, with others |
| `watch-clouds-and-find-shapes-in-them` | Watch clouds and find shapes in them — blanket | Outdoor, solo |
| `plant-something-in-a-pot-or-garden` | Plant something in a pot or garden — pot with drainage, potting compost, a plant or seeds | Outdoor, solo |
| `skim-stones-at-a-lake-or-river` | Skim stones at a lake or river — flat stones, calm water | Outdoor, solo |
| `walk-a-new-route-through-your-neighborhood` | Walk a new route through your neighborhood — comfortable shoes, phone | Outdoor, solo |
| `collect-natural-treasures-for-a-display` | Collect natural treasures for a display — bag, notebook, paper for pressing, display tray | Outdoor, solo |

### Creative

| Slug | Subject to shoot | Setting |
|---|---|---|
| `make-a-playlist-for-a-specific-mood` | Make a playlist for a specific mood — music app, headphones | Indoor, solo |
| `take-ten-creative-photos-of-ordinary-objects` | Take ten creative photos of ordinary objects — phone or camera, a lamp or window | Indoor, solo |
| `write-a-letter-to-a-friend-by-hand` | Write a letter to a friend by hand — paper, pen, envelope, stamp | Indoor, solo |
| `try-blackout-poetry-with-an-old-newspaper` | Try blackout poetry with an old newspaper — old newspaper or book page, marker, pencil | Indoor, solo |
| `paint-kindness-rocks-to-leave-around-town` | Paint kindness rocks to leave around town — smooth stones, acrylic paint, brushes, clear sealant | Indoor, solo |
| `start-a-doodle-a-day-challenge` | Start a doodle-a-day challenge — small sketchbook, pen, prompt list | Indoor, solo |

### Learning

| Slug | Subject to shoot | Setting |
|---|---|---|
| `watch-a-documentary-on-a-brand-new-topic` | Watch a documentary on a brand-new topic — screen, notebook | Indoor, solo |
| `learn-the-phonetic-alphabet` | Learn the phonetic alphabet — printed list or app | Indoor, solo |
| `learn-to-read-basic-music-notation` | Learn to read basic music notation — metronome app, simple sheet music | Indoor, solo |
| `explore-your-family-tree-online` | Explore your family tree online — computer, notebook, family documents | Indoor, solo |
| `learn-morse-code-basics` | Learn Morse code basics — audio trainer app, headphones | Indoor, solo |
| `listen-to-an-educational-podcast-episode` | Listen to an educational podcast episode — headphones, notebook or voice memo | Outdoor, solo |

### Food & Drink

| Slug | Subject to shoot | Setting |
|---|---|---|
| `make-a-smoothie-with-a-new-ingredient` | Make a smoothie with a new ingredient — blender, frozen fruit | Indoor, solo |
| `hold-a-blind-taste-test-with-snacks` | Hold a blind taste test with snacks — identical cups, several products, paper and pens, water | Indoor, with others |
| `make-homemade-pizza-from-scratch` | Make homemade pizza from scratch — pizza steel or heavy tray, kitchen scales, peel or board | Indoor, solo |
| `brew-coffee-with-a-method-you-ve-never-used` | Brew coffee with a method you've never used — scales, grinder, a brewing device, kettle | Indoor, solo |
| `make-a-no-bake-dessert` | Make a no-bake dessert — mixing bowl, lined tin, fridge space | Indoor, solo |
| `invent-your-own-signature-sandwich` | Invent your own signature sandwich — bread, knife, whatever is in the fridge | Indoor, solo |

### Mindfulness

| Slug | Subject to shoot | Setting |
|---|---|---|
| `try-mindful-coloring` | Try mindful coloring — coloring book or printed design, colored pencils, timer | Indoor, solo |
| `try-candle-gazing-meditation` | Try candle gazing meditation — candle in a stable holder, draught-free room, timer | Indoor, solo |
| `do-gentle-stretching-with-slow-breathing` | Do gentle stretching with slow breathing — mat or carpet, warm room | Indoor, solo |
| `sit-outside-and-just-listen-for-ten-minutes` | Sit outside and just listen for ten minutes — somewhere to sit | Outdoor, solo |
| `write-down-your-worries-then-set-them-aside` | Write down your worries, then set them aside — notebook, pen | Indoor, solo |
| `do-one-task-slowly-with-full-attention` | Do one task slowly with full attention — an ordinary task | Indoor, solo |

### Social

| Slug | Subject to shoot | Setting |
|---|---|---|
| `write-a-thank-you-note-to-someone` | Write a thank-you note to someone — card or paper, pen, stamp | Indoor, solo |
| `plan-a-surprise-for-a-friend-or-family-member` | Plan a surprise for a friend or family member — notebook | Indoor, solo |
| `interview-an-older-relative-about-their-life` | Interview an older relative about their life — phone voice recorder, photographs, notebook | Indoor, with others |
| `give-three-genuine-compliments-today` | Give three genuine compliments today — none | Outdoor, with others |
| `plan-a-weekend-trip-with-friends` | Plan a weekend trip with friends — computer, shared expense app | Indoor, with others |
| `strike-up-a-conversation-with-a-neighbor` | Strike up a conversation with a neighbor — none | Outdoor, with others |

### Games

| Slug | Subject to shoot | Setting |
|---|---|---|
| `do-a-crossword-puzzle` | Do a crossword puzzle — crossword, pencil | Indoor, solo |
| `start-a-jigsaw-puzzle` | Start a jigsaw puzzle — jigsaw puzzle, trays or lids, good lamp | Indoor, solo |
| `play-twenty-questions-with-someone` | Play twenty questions with someone — none | Indoor, with others |
| `take-an-online-trivia-quiz` | Take an online trivia quiz — phone or computer, notebook | Indoor, solo |
| `learn-a-new-solitaire-variation` | Learn a new solitaire variation — deck of cards or an app | Indoor, solo |
| `replay-a-classic-video-game-from-your-childhood` | Replay a classic video game from your childhood — console or computer | Indoor, solo |
