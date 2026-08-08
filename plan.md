# Content Expansion & SEO Plan — fungen.app

> **Status: complete.** All 264 activities and all 14 category hubs are written,
> merged and passing validation. **110,071 words** shipped against the ~110,000
> target. Static routes went from 21 to 570; the sitemap from 21 to 285 URLs.
> Every page under `/activities` now has an Open Graph image and a hero visual.
> Outstanding: real photographs for 42 activities (spec in [IMAGE-BRIEF.md](IMAGE-BRIEF.md))
> and post-deployment Search Console monitoring.

**Goal:** expand every one of the **264 activities** from a ~16-word blurb to a **~400-word, SEO-targeted body of text**, and ship it in a way Google can actually index.

**Current state:** 264 activities across 14 categories in two JSON files. Every activity has `name`, `description` (10–22 words), `image`. Total on-site activity copy today: ~4,300 words. After this plan: **~110,000 words**.

---

## 1. The blocking problem (read this first)

Writing 400 words per activity is the easy half. The site as built cannot rank on it:

| Issue | Where | Impact |
|---|---|---|
| Category pages are `"use client"` and `fetch()` JSON in `useEffect` | [page.tsx](src/app/activities/[category]/page.tsx#L1), [page.tsx](src/app/activities/page.tsx#L1) | Content is not in the server HTML. First paint is "Loading…". Crawlers get an empty shell. |
| No `generateMetadata` / `generateStaticParams` on the category route | [page.tsx](src/app/activities/[category]/page.tsx#L45) | Every category page inherits the same root `<title>` and `<meta description>` from [layout.tsx](src/app/layout.tsx#L18). 14 pages, 1 title. |
| **No per-activity URL exists** | — | 264 pieces of content have nowhere to live. 400 words × 20 activities = **8,000 words crammed onto one category page**, which is unrankable and unreadable. |
| Sitemap lists 14 category URLs only | [sitemap.ts](src/app/sitemap.ts#L33) | Nothing for the 264 new pages. |
| `<img>` raw tags, no `next/image` | [page.tsx](src/app/activities/[category]/page.tsx#L191) | CLS + LCP penalties on Core Web Vitals. |
| 42 of 264 activities have no `image` field | [public/images/activities/](public/images/activities/) | ~~Those pages render without a hero image.~~ **Resolved** by a generated SVG hero; real photos still wanted, see [IMAGE-BRIEF.md](IMAGE-BRIEF.md). |

**Decision: the 400 words go on new per-activity static pages, not on category pages.** Phase 1 below builds that route. Skip it and the content work is wasted.

---

## 2. URL & information architecture

```
/                                     home (generator)
/activities                           hub — all 14 categories
/activities/[category]                14 pages — category guide + activity cards
/activities/[category]/[activity]     264 NEW pages — the 400-word content
```

Slug rule (matches the existing one in [page.tsx](src/app/activities/[category]/page.tsx#L76)):
`name.toLowerCase().replace(/[^a-z0-9]+/g, "-")` with leading/trailing hyphens trimmed.

Examples:
- `/activities/outdoor/take-a-walk-in-a-nearby-park-and-observe-nature`
- `/activities/financial/create-a-debt-repayment-plan`
- `/activities/mindfulness/try-forest-bathing-shinrin-yoku`

Slugs are **permanent**. Generate them once, write them into the JSON as an explicit `slug` field, and never re-derive from `name` again — renaming an activity must not break a URL.

---

## 3. Data schema change

Extend each activity object in `public/activities.json` and `public/productive-activities.json`:

```jsonc
{
  "name": "Take a walk in a nearby park and observe nature",
  "slug": "take-a-walk-in-a-nearby-park-and-observe-nature",
  "description": "Slow down and notice the trees, birds...",   // KEEP — card blurb, 15-25 words
  "image": "/images/activities/take-a-walk-in-a-nearby-park-and-observe-nature.jpg",

  // NEW
  "seo": {
    "title": "How to Take a Mindful Park Walk (in Under an Hour)",  // ≤60 chars
    "metaDescription": "A simple one-hour guide to walking...",     // 140-158 chars
    "primaryKeyword": "mindful walk in the park",
    "secondaryKeywords": ["nature walk benefits", "what to notice on a walk", "walking meditation outdoors"]
  },
  "content": {
    "intro": "...",                                   // ~70 words
    "whyItWorks": "...",                              // ~90 words
    "howTo": [ { "step": "...", "detail": "..." } ],  // 5-6 steps, ~130 words total
    "tips": ["...", "...", "..."],                    // 3-4 bullets, ~60 words
    "variations": "...",                              // ~50 words
    "faq": [ { "q": "...", "a": "..." } ]             // 3 Q&As, ~90 words
  },
  "meta": {
    "timeMinutes": 60,
    "cost": "free",              // free | low | medium
    "difficulty": "easy",        // easy | moderate | challenging
    "indoor": false,
    "solo": true,
    "equipment": ["comfortable shoes"]
  },
  "related": ["visit-a-local-park-you-ve-never-been-to", "do-some-bird-watching", "try-forest-bathing-shinrin-yoku"]
}
```

Structured `content` (not one prose blob) is deliberate — it lets the page template render consistent `<h2>`s, feed `HowTo` and `FAQPage` JSON-LD, and keeps word budgets enforceable.

---

## 4. The 400-word template

Every activity page follows the same skeleton. Target **380–440 words** in `content`; the template adds another ~80 words of chrome.

| Section | Heading rendered | Words | SEO job |
|---|---|---|---|
| Intro | *(no heading, sits under H1)* | 60 | Primary keyword in first 100 words. Answer the intent immediately. |
| Why it works | `<h2>Why {activity} is worth an hour</h2>` | 75 | Benefit/semantic keywords. Featured-snippet bait. |
| How to do it | `<h2>How to {activity} step by step</h2>` + `<ol>` | 100 (5 steps × ~20) | `HowTo` schema. "how to" long-tail. |
| Tips | `<h2>Tips to get more out of it</h2>` + `<ul>` | 48 (3 × ~16) | Scannable, list-snippet eligible. |
| Variations | `<h2>Ways to mix it up</h2>` | 45 | Related-term coverage, dwell time. |
| FAQ | `<h2>FAQ</h2>` | 87 (3 × ~29) | `FAQPage` schema, People-Also-Ask capture. |
| **Total** | | **~415** | Inside the 380–440 band the validator enforces. |

Step titles and FAQ questions count toward the total — the validator sums every string in the `content` block.

**Writing rules — non-negotiable:**

1. **Primary keyword** in: H1, first 100 words, one H2, meta title, meta description, image alt. Nowhere else. Target density ~0.8–1.2%.
2. **No boilerplate reuse.** 264 pages that share paragraph scaffolding are thin content in Google's eyes. Every intro, every FAQ answer is written for that specific activity. If two activities could swap a paragraph without anyone noticing, rewrite both.
3. **Specific > generic.** "Bring binoculars with 8×42 magnification and a local field guide" beats "bring the right equipment." Specificity is the whole ranking edge over AI-slop competitors.
4. **Second person, active voice**, ~15-word average sentence, no paragraph over 4 lines.
5. **British/American spelling: pick one and enforce it.** Existing copy is mixed — `tranquillity` (Outdoor #3) is British, most else is American. **Standardise on American** and fix the strays.
6. **No fabricated statistics, studies, or claims.** If a health benefit is stated, it must be non-controversial and hedged ("many people find…"), never "studies show a 47% reduction." This site has AdSense on it — invented medical/financial claims are a policy risk. **Financial and Health & Fitness categories get an explicit "this is not professional advice" line** consistent with [disclaimer/](src/app/disclaimer/).
7. **3 internal links per page minimum**: the parent category, 2–3 sibling activities from `related`. Cross-link leisure↔productive where natural (e.g. Mindfulness "Meditate for 10-15 minutes" ↔ Personal Growth "Practice stress management").

---

## 5. Keyword targeting by category

Head terms are hopeless ("things to do" — no chance). The entire play is **long-tail, low-competition, high-intent**, one activity page per query.

| Category | Slug | Count | Keyword pattern to target |
|---|---|---|---|
| Outdoor | `outdoor` | 20 | "how to {x}", "{x} for beginners", "free outdoor activities" |
| Creative | `creative` | 20 | "{x} ideas", "easy {x} for beginners", "creative hobby to try" |
| Learning | `learning` | 20 | "learn {x} in an hour", "{x} basics", "quick {x} tutorial" |
| Food & Drink | `food-drink` | 20 | "how to make {x} at home", "{x} for beginners", "easy {x} recipe" |
| Mindfulness | `mindfulness` | 20 | "{x} technique", "how to {x} for stress", "{x} for beginners" |
| Social | `social` | 16 | "how to {x}", "{x} ideas for friends", "ways to {x}" |
| Games | `games` | 16 | "how to play {x}", "{x} for beginners", "best {x} online" |
| Career Development | `career-development` | 20 | "how to {x}", "{x} template", "{x} examples" ← **highest commercial value** |
| Organization | `organization` | 20 | "how to organize {x}", "{x} system", "declutter {x}" |
| Skills | `skills` | 20 | "learn {x} fast", "{x} for beginners", "{x} tutorial" |
| Financial | `financial` | 20 | "how to {x}", "{x} for beginners", "{x} step by step" ← **highest CPC, needs disclaimer** |
| Personal Growth | `personal-growth` | 20 | "how to {x}", "{x} exercises", "{x} habit" |
| Home Improvement | `home-improvement` | 16 | "how to {x} yourself", "diy {x}", "{x} cost" |
| Health & Fitness | `health-fitness` | 16 | "{x} plan", "beginner {x}", "how to {x} at home" ← **needs disclaimer** |

**Sequencing:** write Career Development, Financial, Skills, and Home Improvement **first**. They carry the highest ad revenue per session and the strongest "how to" search intent. Games and Social last.

---

## 6. Category pages get expanded too

The 14 category `description` fields are currently 20–35 words. Expand each to **~400 words** as well, using a different template (a category is a hub, not a how-to):

| Section | Words |
|---|---|
| What this category is about | 90 |
| Who it suits / when to reach for it | 80 |
| How to choose from the list below | 80 |
| What you'll need | 70 |
| Getting started today | 80 |

Add to the category object as `content.intro` / `content.body` — rendered **above** the activity grid, with the grid itself acting as the internal link hub to the 264 child pages.

That's 14 × 400 = **5,600 more words**, bringing the project total to **~110,000**.

---

## 7. Implementation phases

### Phase 1 — Infrastructure (must land before content) 🔴
1. Add `slug` to all 264 activities + 14 categories via a script in [scratch/](scratch/) (follow the pattern in [expand-content.py](scratch/expand-content.py)).
2. Create `src/lib/activities.ts` — a server-side loader that reads both JSON files with `fs` (as [sitemap.ts](src/app/sitemap.ts#L11) already does), and exports `getAllActivities()`, `getActivity(category, slug)`, `getCategory(slug)`.
3. **Convert [activities/[category]/page.tsx](src/app/activities/[category]/page.tsx) to a server component.** Push the interactive parts (search, rating, favorites, toast) into a small `"use client"` child. Add `generateStaticParams` + `generateMetadata`.
4. Same treatment for [activities/page.tsx](src/app/activities/page.tsx).
5. **New route: `src/app/activities/[category]/[activity]/page.tsx`** — server component, `generateStaticParams` over all 264, `generateMetadata` from `seo`, renders the section template from §4.
6. Add JSON-LD: `HowTo` + `FAQPage` + `BreadcrumbList` on activity pages; `ItemList` + `BreadcrumbList` on category pages.
7. Update [sitemap.ts](src/app/sitemap.ts) to emit all 264 activity URLs at priority `0.6`.
8. Swap `<img>` → `next/image` with explicit dimensions.
9. Add `alternates: { canonical }` to every generated page.

**Ship Phase 1 with the existing short descriptions first.** Verify with `curl` that the HTML contains real text, then start writing.

### Phase 2 — Content, in batches
264 activities is too many for one pass. Work in **category-sized batches**, one commit per category:

| Batch | Category | Count | Cumulative |
|---|---|---|---|
| 1 | Career Development | 20 | 20 |
| 2 | Financial | 20 | 40 |
| 3 | Skills | 20 | 60 |
| 4 | Home Improvement | 16 | 76 |
| 5 | Health & Fitness | 16 | 92 |
| 6 | Organization | 20 | 112 |
| 7 | Personal Growth | 20 | 132 |
| 8 | Learning | 20 | 152 |
| 9 | Food & Drink | 20 | 172 |
| 10 | Outdoor | 20 | 192 |
| 11 | Creative | 20 | 212 |
| 12 | Mindfulness | 20 | 232 |
| 13 | Social | 16 | 248 |
| 14 | Games | 16 | 264 |

Per batch: write content → run the validator (§8) → build → commit → deploy. **Do not write all 264 then deploy at once** — a 264-page overnight jump on a small site is a classic spam signal. Ship 1–2 categories per week.

### Phase 3 — Category hub content
The 14 category expansions from §6.

### Phase 4 — Polish
1. 🟡 The **42 activities with no photograph** now render a deterministic SVG hero ([ActivityHeroFallback](src/components/ActivityHeroFallback.tsx)) instead of nothing, and every activity and category page has a generated Open Graph card ([opengraph-image.tsx](src/app/activities/[category]/[activity]/opengraph-image.tsx)). Real photographs still need commissioning — see [IMAGE-BRIEF.md](IMAGE-BRIEF.md) for the spec and the list.
2. ✅ Related-activities blocks and breadcrumbs ship on every activity page (Phase 1).
3. ✅ `llms.txt` is now **generated** at [src/app/llms.txt/route.ts](src/app/llms.txt/route.ts) from the activity data, listing all 264 activity URLs. The hand-maintained `public/llms.txt` was deleted because it could drift; the route cannot.
4. ⬜ Submit updated sitemap; monitor Search Console coverage + Core Web Vitals. *(Post-deployment.)*

---

## 8. Validation script (write this before batch 1)

`scratch/validate-content.py` — fails the build on any violation:

- [ ] `content` word count is 380–440 for every activity
- [ ] `seo.title` ≤ 60 chars; `seo.metaDescription` 140–158 chars
- [ ] `primaryKeyword` appears in `seo.title`, `content.intro`'s first 100 words, and ≥1 H2 source string
- [ ] Keyword density ≤ 2.5% (over-optimization guard)
- [ ] Every `slug` unique across **all 264** (not just per category) and URL-safe
- [ ] Every `related` entry resolves to a real slug; ≥2 per activity
- [ ] `howTo` has 5–6 steps; `faq` has exactly 3 entries; `tips` has 3–4
- [ ] **Cross-activity duplicate detection**: no sentence of >12 words appears in two activities. This is the single most important check — it's what stops 264 pages collapsing into thin content.
- [ ] Financial / Health & Fitness entries contain a disclaimer sentence
- [ ] No `image` path pointing at a nonexistent file

---

## 9. Success criteria

| Metric | Before | Target | Actual |
|---|---|---|---|
| Indexable pages | 21 | 285 | ✅ 285 (292 static routes) |
| Total indexed words | ~4,300 | ~110,000 | ✅ 110,071 |
| Pages with unique title + meta description | 7 | 285 | ✅ 285 |
| Server-rendered activity text | 0% | 100% | ✅ 100% |
| Avg. words per activity body | — | 380–440 | ✅ 396 |
| Activities with a hero visual | 222 | 264 | ✅ 264 (222 photo, 42 generated) |
| Activities with a real photograph | 222 | 264 | 🟡 222 — see IMAGE-BRIEF.md |
| Pages with an Open Graph image | 222 | 278 | ✅ 278 |
| Organic sessions | baseline | 5–8× | ⏳ post-launch |

---

## 10. Full inventory — 264 activities

Tick as written. Format: `#. Activity name` → slug is the kebab-case of the name.

### Leisure — `public/activities.json`

<details>
<summary><b>Outdoor</b> — <code>/activities/outdoor</code> (20)</summary>

1. Take a walk in a nearby park and observe nature
2. Visit a local park you've never been to
3. Visit a botanical garden
4. Do some bird watching
5. Visit a farmers market
6. Go for a bike ride in your neighborhood
7. Have a picnic in a scenic spot
8. Try geocaching in your area
9. Watch the sunrise or sunset outdoors
10. Explore a new hiking trail
11. Try outdoor yoga
12. Go stargazing in a dark area
13. Visit a nature reserve
14. Try outdoor photography
15. Fly a kite in an open field
16. Watch clouds and find shapes in them
17. Plant something in a pot or garden
18. Skim stones at a lake or river
19. Walk a new route through your neighborhood
20. Collect natural treasures for a display
</details>

<details>
<summary><b>Creative</b> — <code>/activities/creative</code> (20)</summary>

1. Sketch or doodle something creative
2. Do some finger painting
3. Do some origami
4. Learn basic calligraphy
5. Do some people sketching in a public place
6. Write a short poem or haiku
7. Create a collage from magazine cutouts
8. Try your hand at watercolor painting
9. Make a vision board
10. Design your own greeting card
11. Try pottery or clay sculpting
12. Create a DIY home decoration
13. Write a short story
14. Try digital art on your phone/tablet
15. Make a playlist for a specific mood
16. Take ten creative photos of ordinary objects
17. Write a letter to a friend by hand
18. Try blackout poetry with an old newspaper
19. Paint kindness rocks to leave around town
20. Start a doodle-a-day challenge
</details>

<details>
<summary><b>Learning</b> — <code>/activities/learning</code> (20)</summary>

1. Learn a new skill from a YouTube tutorial
2. Learn basic phrases in a new language
3. Learn to solve a Rubik's cube
4. Learn about constellations and stargaze
5. Learn about different types of tea
6. Learn basic photography composition
7. Learn to juggle three balls
8. Learn about local history
9. Learn basic first aid techniques
10. Learn to tie different knots
11. Learn about wine pairing basics
12. Learn magic tricks
13. Learn about astronomy
14. Learn basic car maintenance
15. Watch a documentary on a brand-new topic
16. Learn the phonetic alphabet
17. Learn to read basic music notation
18. Explore your family tree online
19. Learn Morse code basics
20. Listen to an educational podcast episode
</details>

<details>
<summary><b>Food & Drink</b> — <code>/activities/food-drink</code> (20)</summary>

1. Try a new recipe with ingredients you have at home
2. Try a new type of tea or coffee
3. Try a new type of cuisine
4. Try a new cocktail or mocktail recipe
5. Try a new type of bread or pastry
6. Bake cookies from scratch
7. Make homemade ice cream
8. Try a new type of cheese
9. Learn proper wine tasting techniques
10. Make your own infused water
11. Try fermenting vegetables
12. Make homemade pasta
13. Try molecular gastronomy basics
14. Host a themed dinner party
15. Make a smoothie with a new ingredient
16. Hold a blind taste test with snacks
17. Make homemade pizza from scratch
18. Brew coffee with a method you've never used
19. Make a no-bake dessert
20. Invent your own signature sandwich
</details>

<details>
<summary><b>Mindfulness</b> — <code>/activities/mindfulness</code> (20)</summary>

1. Meditate for 10-15 minutes
2. Do a digital detox for one hour
3. Write down 10 things you're grateful for
4. Practice mindfulness for focus
5. Learn about different meditation techniques
6. Try a guided body scan meditation
7. Practice deep breathing exercises
8. Do a sensory awareness exercise
9. Try a walking meditation
10. Write a letter of forgiveness (you don't have to send it)
11. Try sound bath meditation
12. Practice progressive muscle relaxation
13. Do a loving-kindness meditation
14. Try forest bathing (shinrin-yoku)
15. Try mindful coloring
16. Try candle gazing meditation
17. Do gentle stretching with slow breathing
18. Sit outside and just listen for ten minutes
19. Write down your worries, then set them aside
20. Do one task slowly with full attention
</details>

<details>
<summary><b>Social</b> — <code>/activities/social</code> (16)</summary>

1. Call an old friend you haven't spoken to in a while
2. Organize a game night with friends
3. Join a local meetup group
4. Volunteer at a community event
5. Host a potluck dinner
6. Start a book club
7. Organize a neighborhood clean-up
8. Visit a community center event
9. Join a recreational sports league
10. Attend a cultural festival
11. Write a thank-you note to someone
12. Plan a surprise for a friend or family member
13. Interview an older relative about their life
14. Give three genuine compliments today
15. Plan a weekend trip with friends
16. Strike up a conversation with a neighbor
</details>

<details>
<summary><b>Games</b> — <code>/activities/games</code> (16)</summary>

1. Learn a new card game
2. Try a new board game
3. Play chess against a computer
4. Try escape room games
5. Play word association games
6. Try puzzle games like Sudoku
7. Play charades with friends
8. Try tabletop RPGs
9. Play brain-training games
10. Try geoguessr online
11. Do a crossword puzzle
12. Start a jigsaw puzzle
13. Play twenty questions with someone
14. Take an online trivia quiz
15. Learn a new solitaire variation
16. Replay a classic video game from your childhood
</details>

### Productive — `public/productive-activities.json`

<details>
<summary><b>Career Development</b> — <code>/activities/career-development</code> (20) — <b>batch 1</b></summary>

1. Review and update your resume
2. Update your LinkedIn profile
3. Create a professional development plan
4. Learn about leadership principles
5. Create a career roadmap
6. Research companies you'd like to work for
7. Practice answering common interview questions
8. Attend a virtual networking event
9. Learn about salary negotiation techniques
10. Create or update your professional portfolio
11. Research industry salary benchmarks
12. Create an elevator pitch for yourself
13. Learn about remote work best practices
14. Develop your personal brand statement
15. Ask a colleague or mentor for feedback
16. Write a brag document of your achievements
17. Research a certification in your field
18. Reconnect with a former colleague
19. Set up job alerts for your dream role
20. Identify a skill gap and find a course for it
</details>

<details>
<summary><b>Organization</b> — <code>/activities/organization</code> (20)</summary>

1. Organize your workspace
2. Clean up your computer files
3. Create a to-do list for the week
4. Set up a filing system
5. Organize your email inbox
6. Declutter your digital workspace
7. Create a document naming convention system
8. Set up a password manager
9. Organize your browser bookmarks
10. Create a system for tracking important dates
11. Digitize important paper documents
12. Create a meal planning system
13. Organize your phone apps into folders
14. Set up a household inventory
15. Plan your next day the night before
16. Do a 15-minute declutter sprint
17. Back up your important files
18. Create a donation box for unused items
19. Sort your photo library into albums
20. Write a packing checklist template for trips
</details>

<details>
<summary><b>Skills</b> — <code>/activities/skills</code> (20) — <b>batch 3</b></summary>

1. Learn a new Excel/Google Sheets function
2. Practice typing speed exercises
3. Learn keyboard shortcuts for your OS
4. Learn basic coding concepts
5. Practice public speaking
6. Learn basic photo editing
7. Improve your writing skills with exercises
8. Learn to create effective presentations
9. Practice active listening techniques
10. Learn basic video editing
11. Learn data visualization basics
12. Practice speed reading techniques
13. Learn project management fundamentals
14. Study design thinking principles
15. Practice mental math tricks
16. Learn the basics of AI tools and prompting
17. Learn to take better meeting notes
18. Learn basic graphic design principles
19. Practice negotiation with role-play scenarios
20. Learn Markdown for faster note-taking
</details>

<details>
<summary><b>Financial</b> — <code>/activities/financial</code> (20) — <b>batch 2, needs disclaimer</b></summary>

1. Create a budget spreadsheet
2. Learn about investing basics
3. Learn about financial planning
4. Learn about business analytics
5. Create a personal productivity system
6. Review your credit report
7. Set up automatic bill payments
8. Research retirement savings options
9. Learn about tax deductions you may qualify for
10. Create an emergency fund savings plan
11. Research side hustle opportunities
12. Learn about cryptocurrency basics
13. Create a debt repayment plan
14. Research passive income streams
15. Review your insurance policies for better deals
16. Set a savings goal for something specific
17. Track every expense for one day
18. Play with a compound interest calculator
19. Review and cancel unused subscriptions
20. Check your pension contributions
</details>

> ⚠️ **Financial #4 "Learn about business analytics" and #5 "Create a personal productivity system" are miscategorized** — neither is a financial activity. Move #4 to Skills and #5 to Organization before writing, or the keyword targeting for the page will fight the category context.

<details>
<summary><b>Personal Growth</b> — <code>/activities/personal-growth</code> (20)</summary>

1. Practice mindfulness for focus
2. Learn about emotional intelligence
3. Practice stress management
4. Learn about business communication
5. Create a professional growth plan
6. Read a personal development book
7. Practice positive self-talk
8. Learn about cognitive biases
9. Develop a morning routine
10. Practice saying no to unnecessary commitments
11. Learn time blocking techniques
12. Study personality type frameworks
13. Practice journaling for self-reflection
14. Learn about habit formation science
15. Write down your top five personal values
16. Do a weekly review of wins and lessons
17. Set one goal using the SMART framework
18. Write a letter to your future self
19. Identify and reframe one limiting belief
20. Start a bucket list of lifetime goals
</details>

> ⚠️ **Duplicate:** "Practice mindfulness for focus" exists in **both** Mindfulness #4 and Personal Growth #1. Two 400-word pages on the same topic will cannibalize each other. Rename one (e.g. Personal Growth → "Build a focus practice for deep work") or delete it and cross-link. **Personal Growth #5 "Create a professional growth plan" also near-duplicates Career Development #3** — same fix needed.

<details>
<summary><b>Home Improvement</b> — <code>/activities/home-improvement</code> (16) — <b>batch 4</b></summary>

1. Organize a closet or storage space
2. Deep clean one room in your home
3. Learn basic plumbing fixes
4. Research energy efficiency upgrades
5. Create a home maintenance checklist
6. Learn to patch drywall
7. Research smart home devices
8. Plan a furniture rearrangement
9. Learn basic electrical safety
10. Start a home inventory for insurance
11. Touch up paint scuffs and marks
12. Test your smoke and carbon monoxide alarms
13. Clean or replace air filters and vents
14. Fix a squeaky door or loose handle
15. Descale your kettle and showerhead
16. Learn to re-seal a bath or sink
</details>

> ⚠️ **#3 (plumbing), #6 (drywall), #9 (electrical safety) need explicit safety framing** — "know when to call a professional," never step-by-step instructions for live electrical work.

<details>
<summary><b>Health & Fitness</b> — <code>/activities/health-fitness</code> (16) — <b>batch 5, needs disclaimer</b></summary>

1. Create a weekly workout plan
2. Research healthy meal prep ideas
3. Learn proper stretching techniques
4. Research ergonomic workspace setups
5. Create a sleep improvement plan
6. Learn about macro nutrition tracking
7. Research posture correction exercises
8. Create a hydration tracking system
9. Learn about heart rate zone training
10. Research stress-reduction techniques
11. Do a 20-minute bodyweight workout
12. Take a brisk 30-minute walk
13. Try a beginner yoga video
14. Prep healthy snacks for the week
15. Do a guided stretching session
16. Schedule overdue health check-ups
</details>

---

## 11. Data hygiene fixes to make before writing

Cheap now, expensive after 264 pages exist:

1. **Duplicate:** "Practice mindfulness for focus" in Mindfulness **and** Personal Growth → rename or merge.
2. **Near-duplicate:** "Create a professional development plan" (Career Dev #3) vs "Create a professional growth plan" (Personal Growth #5) → merge.
3. **Miscategorized:** "Learn about business analytics" and "Create a personal productivity system" sit in Financial → move.
4. **Miscategorized:** "Learn about business communication" (Personal Growth #4) is a Skills activity.
5. **Overlap:** "Research stress-reduction techniques" (Health) vs "Practice stress management" (Personal Growth) → differentiate the angle or merge.
6. **Overlap:** "Learn about constellations and stargaze" (Learning #4) vs "Go stargazing in a dark area" (Outdoor #12) vs "Learn about astronomy" (Learning #13) → three pages, one topic. Differentiate hard or consolidate to two.
7. **Overlap:** "Start a home inventory for insurance" (Home Improvement #10) vs "Set up a household inventory" (Organization #14) → merge.
8. **Overlap:** "Learn proper stretching techniques" / "Do a guided stretching session" (Health #3, #15) and "Do gentle stretching with slow breathing" (Mindfulness #17) → differentiate.
9. **Spelling:** normalize `tranquillity` → `tranquility` and audit the rest for consistent American spelling.
10. **Images:** 42 of 264 activities have no `image` field. Produce those before Phase 4, or those pages ship image-less.

Items 1, 2, 3, 4 and 7 were resolved by [scratch/01-hygiene-and-slugs.js](scratch/01-hygiene-and-slugs.js) in Phase 1 — duplicates were **differentiated rather than deleted**, so all 264 pages survive and the generator pool is unchanged. Category counts shifted to: Organization 21, Skills 22, Financial 18, Personal Growth 19. Items 5, 6 and 8 are handled at writing time by assigning each overlapping activity a distinct `primaryKeyword` angle.
