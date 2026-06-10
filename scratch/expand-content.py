# One-off content expansion: adds descriptions to productive activities,
# category descriptions for productive categories, and new activities to both files.
import json

PUB = "public"

# ---------------------------------------------------------------------------
# Productive: category descriptions
# ---------------------------------------------------------------------------
PROD_CAT_DESCRIPTIONS = {
    "Career Development": "Invest an hour in your professional future. From polishing your resume to building your network, these activities move your career forward one focused step at a time.",
    "Organization": "Bring order to your space, schedule, and digital life. Small organizing wins compound into calmer days and sharper focus.",
    "Skills": "Pick up practical abilities you can use straight away. Each activity builds a skill that makes you more capable at work and at home.",
    "Financial": "Take control of your money in just an hour. These activities build financial confidence, from budgeting basics to long-term planning.",
    "Personal Growth": "Become a little better than yesterday. These activities build self-awareness, resilience, and habits that actually stick.",
    "Home Improvement": "Make your home work better for you. Practical projects and know-how that save money and add comfort.",
    "Health & Fitness": "Look after the only body you get. Plan, learn, and build routines that boost your energy and long-term health.",
}

# ---------------------------------------------------------------------------
# Productive: descriptions for existing activities
# ---------------------------------------------------------------------------
PROD_DESCRIPTIONS = {
    "Review and update your resume": "Refresh your resume with recent achievements, sharpen the wording, and make sure it tells a clear story of your career so far.",
    "Update your LinkedIn profile": "Bring your LinkedIn up to date with a current headline, summary, and skills so the right opportunities can find you.",
    "Create a professional development plan": "Map out the skills, certifications, and experience you want to gain over the next year, and the steps to get there.",
    "Learn about leadership principles": "Explore what makes great leaders effective, from delegation to giving feedback, and pick one principle to practice this week.",
    "Create a career roadmap": "Sketch out where you want to be in one, three, and five years, and the milestones that will get you there.",
    "Research companies you'd like to work for": "Build a shortlist of companies that excite you and dig into their culture, openings, and growth.",
    "Practice answering common interview questions": "Rehearse your answers to classic interview questions out loud so the real thing feels familiar.",
    "Attend a virtual networking event": "Join an online industry meetup or webinar and aim to make at least one genuine new connection.",
    "Learn about salary negotiation techniques": "Study proven negotiation tactics so you can confidently make the case for what you're worth.",
    "Create or update your professional portfolio": "Gather your best work into a polished portfolio that shows what you can do at a glance.",
    "Research industry salary benchmarks": "Find out what people in your role and region actually earn so you can plan your next move with real data.",
    "Create an elevator pitch for yourself": "Craft a confident 30-second summary of who you are and what you do, then practice until it flows naturally.",
    "Learn about remote work best practices": "Discover habits and tools that make remote work productive, from async communication to boundary setting.",
    "Develop your personal brand statement": "Define what you want to be known for professionally and distill it into a memorable one-liner.",

    "Organize your workspace": "Clear your desk, sort the clutter, and set up a workspace that helps you focus.",
    "Clean up your computer files": "Sort your downloads and documents into sensible folders and delete what you no longer need.",
    "Create a to-do list for the week": "Capture everything on your plate and turn it into a realistic, prioritized plan for the week ahead.",
    "Set up a filing system": "Create a simple home for paperwork and documents so you can find anything in seconds.",
    "Organize your email inbox": "Archive the backlog, unsubscribe from the noise, and set up folders so new mail has a home.",
    "Declutter your digital workspace": "Tidy your desktop, close those 47 browser tabs, and uninstall apps you never use.",
    "Create a document naming convention system": "Decide on a consistent way to name files and folders so future-you can find things instantly.",
    "Set up a password manager": "Move your passwords into a secure manager and replace weak, reused ones while you're at it.",
    "Organize your browser bookmarks": "Prune dead links and sort your bookmarks into folders you'll actually use.",
    "Create a system for tracking important dates": "Set up a calendar with birthdays, renewals, and deadlines so nothing catches you by surprise.",
    "Digitize important paper documents": "Scan key documents and store them safely in the cloud so they're backed up and easy to find.",
    "Create a meal planning system": "Build a simple weekly meal-planning routine that saves money and ends the nightly what's-for-dinner debate.",
    "Organize your phone apps into folders": "Group your apps by purpose, delete the ones you never open, and tidy up your home screen.",
    "Set up a household inventory": "List your valuable items with photos and receipts — invaluable for insurance and peace of mind.",

    "Learn a new Excel/Google Sheets function": "Pick a function like VLOOKUP or pivot tables and practice it on real data until it clicks.",
    "Practice typing speed exercises": "Spend time on a typing trainer and watch your words-per-minute climb.",
    "Learn keyboard shortcuts for your OS": "Master a handful of system shortcuts that will save you minutes every single day.",
    "Learn basic coding concepts": "Try an interactive coding tutorial and get a feel for variables, loops, and logic.",
    "Practice public speaking": "Pick a topic and speak about it for five minutes, recording yourself to spot habits to improve.",
    "Learn basic photo editing": "Learn to crop, adjust exposure, and color-correct your photos with free editing tools.",
    "Improve your writing skills with exercises": "Try short writing drills that sharpen clarity, cut filler, and strengthen your style.",
    "Learn to create effective presentations": "Learn the principles of clear, persuasive slides — and what to leave off them.",
    "Practice active listening techniques": "Practice summarizing, clarifying, and asking open questions in your next conversation.",
    "Learn basic video editing": "Learn cuts, transitions, and titles with a free editor and a few clips from your phone.",
    "Learn data visualization basics": "Discover how to turn raw numbers into honest, easy-to-read charts.",
    "Practice speed reading techniques": "Try techniques like chunking and pacing to read faster without losing comprehension.",
    "Learn project management fundamentals": "Get to grips with scoping, milestones, and prioritization — useful far beyond the office.",
    "Study design thinking principles": "Learn the empathize-define-ideate-prototype-test loop and apply it to a problem of your own.",

    "Create a budget spreadsheet": "Build a simple budget that shows what's coming in, what's going out, and where you can save.",
    "Learn about investing basics": "Get a beginner-friendly grounding in index funds, compounding, and risk.",
    "Learn about financial planning": "Learn how to set financial goals and build a plan that connects today's money to tomorrow's life.",
    "Learn about business analytics": "Explore how businesses use data to make decisions, from KPIs to dashboards.",
    "Create a personal productivity system": "Set up a trusted system for capturing tasks, notes, and ideas so nothing slips through.",
    "Review your credit report": "Pull your free credit report, check it for errors, and learn what's affecting your score.",
    "Set up automatic bill payments": "Automate your regular bills so you never pay a late fee again.",
    "Research retirement savings options": "Understand your pension or retirement account options and check whether you're on track.",
    "Learn about tax deductions you may qualify for": "Spend an hour learning which deductions and allowances apply to you — it could pay for itself many times over.",
    "Create an emergency fund savings plan": "Work out your target emergency fund and set up an automatic transfer to start building it.",
    "Research side hustle opportunities": "Explore realistic ways to earn extra income with the skills and time you already have.",
    "Learn about cryptocurrency basics": "Get a clear-eyed introduction to how crypto works — the technology, the risks, and the hype.",
    "Create a debt repayment plan": "List your debts, compare snowball and avalanche methods, and pick a payoff strategy.",
    "Research passive income streams": "Separate the realistic passive income ideas from the scams and see which could work for you.",

    "Practice mindfulness for focus": "Use short mindfulness exercises to train your attention and resist distraction.",
    "Learn about emotional intelligence": "Explore self-awareness, empathy, and emotional regulation — skills that improve every relationship.",
    "Practice stress management": "Learn practical techniques to recognize stress early and bring yourself back to baseline.",
    "Learn about business communication": "Sharpen the way you write emails, give updates, and run meetings.",
    "Create a professional growth plan": "Identify the skills and experiences that will stretch you, and schedule the first step.",
    "Read a personal development book": "Pick up a well-reviewed personal development book and read a chapter with notes.",
    "Practice positive self-talk": "Notice your inner critic and practice reframing harsh thoughts into constructive ones.",
    "Learn about cognitive biases": "Discover the mental shortcuts that distort your thinking — and how to catch them in action.",
    "Develop a morning routine": "Design a realistic morning routine that sets up the rest of your day for success.",
    "Practice saying no to unnecessary commitments": "Review your commitments and practice polite, firm ways to decline what doesn't serve you.",
    "Learn time blocking techniques": "Plan tomorrow in focused blocks and discover how much more you finish with fewer context switches.",
    "Study personality type frameworks": "Explore frameworks like the Big Five and learn what they can (and can't) tell you about yourself.",
    "Practice journaling for self-reflection": "Spend 15 minutes journaling with prompts that help you process the week and spot patterns.",
    "Learn about habit formation science": "Learn how cues, cravings, and rewards drive habits — and use them to build a good one.",

    "Organize a closet or storage space": "Empty it out, donate what you don't use, and put back only what earns its place.",
    "Deep clean one room in your home": "Pick one room and give it the full treatment — baseboards, windows, and all the forgotten corners.",
    "Learn basic plumbing fixes": "Learn to fix a dripping faucet, unblock a drain, and find your water shut-off valve before you need it.",
    "Research energy efficiency upgrades": "Find out which insulation, lighting, and heating upgrades would actually cut your bills.",
    "Create a home maintenance checklist": "Build a seasonal checklist of the small jobs that prevent big repair bills.",
    "Learn to patch drywall": "Watch a tutorial and learn to fill holes and patch drywall like a pro.",
    "Research smart home devices": "Compare smart plugs, thermostats, and lights to see which would genuinely make life easier.",
    "Plan a furniture rearrangement": "Sketch your room layout and experiment with arrangements before you move a single sofa.",
    "Learn basic electrical safety": "Learn what's safe to DIY, what isn't, and where your breaker box and shut-offs are.",
    "Start a home inventory for insurance": "Photograph and list your valuables room by room — your future self will thank you.",

    "Create a weekly workout plan": "Design a realistic week of exercise that fits your schedule and fitness level.",
    "Research healthy meal prep ideas": "Find batch-cook recipes that make eating well the easy option all week.",
    "Learn proper stretching techniques": "Learn safe stretching form for the muscle groups you use (and neglect) most.",
    "Research ergonomic workspace setups": "Check your chair, screen, and desk height against ergonomic guidance and fix the worst offender.",
    "Create a sleep improvement plan": "Audit your sleep habits and pick two evidence-based changes to try this week.",
    "Learn about macro nutrition tracking": "Understand protein, carbs, and fats — and how to balance them for your goals.",
    "Research posture correction exercises": "Find simple daily exercises that counteract hours of sitting and screen time.",
    "Create a hydration tracking system": "Work out how much water you actually need and set up an easy way to hit it daily.",
    "Learn about heart rate zone training": "Learn what the zones mean and how training in each one changes your fitness.",
    "Research stress-reduction techniques": "Compare evidence-based stress relievers — breathing, exercise, nature — and pick one to test.",
}

# ---------------------------------------------------------------------------
# Productive: new activities (reuse existing generic illustrations)
# ---------------------------------------------------------------------------
PROD_NEW = {
    "Career Development": [
        ("Ask a colleague or mentor for feedback", "Request honest feedback on one area of your work and listen without defending — it's the fastest way to grow.", "/activities/career-growth.png"),
        ("Write a brag document of your achievements", "Start a running list of your wins, big and small — gold dust for reviews, resumes, and confidence dips.", "/activities/work-planning.png"),
        ("Research a certification in your field", "Find out which certifications carry real weight in your industry and what it takes to earn one.", "/activities/skills-learning.png"),
        ("Reconnect with a former colleague", "Send a genuine catch-up message to someone you enjoyed working with — networks are built one message at a time.", "/activities/office-building.png"),
        ("Set up job alerts for your dream role", "Create saved searches and alerts so the perfect opening lands in your inbox instead of passing you by.", "/activities/work-planning.png"),
        ("Identify a skill gap and find a course for it", "Compare your skills against job ads for your target role, spot the gap, and find a course that closes it.", "/activities/skills-learning.png"),
    ],
    "Organization": [
        ("Plan your next day the night before", "Spend ten minutes listing tomorrow's top three priorities so you start the day already knowing what matters.", "/activities/organization.png"),
        ("Do a 15-minute declutter sprint", "Set a timer, grab a bag, and clear as much clutter as you can from one area before it rings.", "/activities/organization.png"),
        ("Back up your important files", "Set up an automatic backup for your photos and documents — before you need it, not after.", "/activities/coding.png"),
        ("Create a donation box for unused items", "Start a box for things you no longer use and drop it off when it's full — decluttering that helps someone else.", "/activities/organization.png"),
        ("Sort your photo library into albums", "Tame your camera roll: delete the duplicates and blurry shots, then sort the keepers into albums.", "/activities/remote-work.png"),
        ("Write a packing checklist template for trips", "Create a reusable packing list so you never again land somewhere without a charger or toothbrush.", "/activities/organization.png"),
    ],
    "Skills": [
        ("Practice mental math tricks", "Learn shortcuts for quick percentages, tips, and estimates — handy every single day.", "/activities/skills-learning.png"),
        ("Learn the basics of AI tools and prompting", "Explore what modern AI assistants can do and practice writing prompts that get genuinely useful results.", "/activities/coding.png"),
        ("Learn to take better meeting notes", "Pick up a simple note-taking method that captures decisions and actions, not transcripts.", "/activities/work-planning.png"),
        ("Learn basic graphic design principles", "Get a feel for contrast, alignment, and hierarchy so everything you make looks more polished.", "/activities/skills-learning.png"),
        ("Practice negotiation with role-play scenarios", "Run through a negotiation scenario out loud — anchoring, trade-offs, and the power of silence.", "/activities/skills-learning.png"),
        ("Learn Markdown for faster note-taking", "Spend 20 minutes learning Markdown and format notes and documents at the speed of typing.", "/activities/coding.png"),
    ],
    "Financial": [
        ("Review your insurance policies for better deals", "Check what you're paying for car, home, and gadget cover, and see whether switching could save you money.", "/activities/finance-planning.png"),
        ("Set a savings goal for something specific", "Pick a concrete goal — a trip, a gadget, a buffer — work out the monthly amount, and automate it.", "/activities/finance-planning.png"),
        ("Track every expense for one day", "Write down everything you spend today, however small — awareness is the first step to control.", "/activities/finance-planning.png"),
        ("Play with a compound interest calculator", "Plug your numbers into a compound interest calculator and see what consistent saving actually becomes.", "/activities/finance-planning.png"),
        ("Review and cancel unused subscriptions", "Go through your bank statement, list every subscription, and cancel the ones you'd forgotten you had.", "/activities/finance-planning.png"),
        ("Check your pension contributions", "Find out what you and your employer are paying in, and whether a small increase now would transform later.", "/activities/finance-planning.png"),
    ],
    "Personal Growth": [
        ("Write down your top five personal values", "Identify the five values that matter most to you and check whether your week actually reflects them.", "/activities/growth-zen.png"),
        ("Do a weekly review of wins and lessons", "Look back over the week: what went well, what didn't, and what one thing you'll change next week.", "/activities/growth-zen.png"),
        ("Set one goal using the SMART framework", "Take a vague ambition and make it specific, measurable, achievable, relevant, and time-bound.", "/activities/growth-zen.png"),
        ("Write a letter to your future self", "Write to yourself one year from now — your hopes, worries, and predictions — and seal it for later.", "/activities/growth-zen.png"),
        ("Identify and reframe one limiting belief", "Spot a story you tell yourself about what you can't do, and look for the evidence against it.", "/activities/growth-zen.png"),
        ("Start a bucket list of lifetime goals", "Brainstorm the experiences you want to have in your lifetime — then pick one to start planning.", "/activities/growth-zen.png"),
    ],
    "Home Improvement": [
        ("Touch up paint scuffs and marks", "Grab the leftover paint tin and erase the scuffs and marks that have been bugging you for months.", "/activities/home-diy.png"),
        ("Test your smoke and carbon monoxide alarms", "Press the test button on every alarm, replace tired batteries, and note when the units expire.", "/activities/home-diy.png"),
        ("Clean or replace air filters and vents", "Dust the vents and swap clogged filters — better air and lower running costs in under an hour.", "/activities/home-diy.png"),
        ("Fix a squeaky door or loose handle", "Knock out one of those tiny annoyances: a drop of oil and a tightened screw go a long way.", "/activities/home-diy.png"),
        ("Descale your kettle and showerhead", "Banish limescale with vinegar or citric acid and get your kettle and shower back to full power.", "/activities/home-diy.png"),
        ("Learn to re-seal a bath or sink", "Watch a tutorial on removing tired sealant and applying a clean new bead — a satisfying skill for life.", "/activities/home-diy.png"),
    ],
    "Health & Fitness": [
        ("Do a 20-minute bodyweight workout", "No equipment needed: squats, push-ups, lunges, and planks in your living room.", "/activities/fitness-health.png"),
        ("Take a brisk 30-minute walk", "Get your heart rate up with a purposeful walk — one of the most underrated workouts there is.", "/activities/fitness-health.png"),
        ("Try a beginner yoga video", "Follow a free beginner yoga session and give your body a gentle full-body reset.", "/activities/fitness-health.png"),
        ("Prep healthy snacks for the week", "Wash, chop, and portion snacks now so the healthy choice is the convenient one all week.", "/activities/fitness-health.png"),
        ("Do a guided stretching session", "Follow a guided full-body stretch routine and release the tension you didn't know you were holding.", "/activities/fitness-health.png"),
        ("Schedule overdue health check-ups", "Book the dentist, optician, or doctor appointment you've been putting off — it takes ten minutes.", "/activities/fitness-health.png"),
    ],
}

# ---------------------------------------------------------------------------
# Leisure: new activities (no image — the UI renders text-only entries fine)
# ---------------------------------------------------------------------------
LEISURE_NEW = {
    "Outdoor": [
        ("Fly a kite in an open field", "Feel the tug of the wind and the simple joy of keeping a kite dancing in the sky."),
        ("Watch clouds and find shapes in them", "Lie back on the grass, slow your thoughts, and let your imagination turn clouds into stories."),
        ("Plant something in a pot or garden", "Get your hands in the soil and start a herb, flower, or vegetable you can watch grow."),
        ("Skim stones at a lake or river", "Hunt for the flattest stones and chase that satisfying multi-bounce skim across the water."),
        ("Walk a new route through your neighborhood", "Turn down the streets you always pass and discover what's been hiding around the corner."),
        ("Collect natural treasures for a display", "Gather interesting leaves, stones, or shells on a walk and arrange them into a little display at home."),
    ],
    "Creative": [
        ("Make a playlist for a specific mood", "Curate the perfect soundtrack for a mood or moment — rainy days, road trips, or Sunday mornings."),
        ("Take ten creative photos of ordinary objects", "Challenge yourself to make everyday objects look extraordinary using angles, light, and close-ups."),
        ("Write a letter to a friend by hand", "Slow down and put pen to paper — a handwritten letter is a small gift in a digital world."),
        ("Try blackout poetry with an old newspaper", "Black out words on a printed page until the ones left behind form a poem."),
        ("Paint kindness rocks to leave around town", "Paint small rocks with cheerful designs or messages and leave them for strangers to find."),
        ("Start a doodle-a-day challenge", "Commit to one small doodle a day and watch your sketchbook—and confidence—fill up."),
    ],
    "Learning": [
        ("Watch a documentary on a brand-new topic", "Pick a documentary about something you know nothing about and let it open a door."),
        ("Learn the phonetic alphabet", "Alpha, Bravo, Charlie — memorize the NATO alphabet and spell anything clearly forever."),
        ("Learn to read basic music notation", "Decode the lines and dots: learn how notes, rests, and rhythms work on a staff."),
        ("Explore your family tree online", "Dig into family records and stories — you might be one search away from a fascinating ancestor."),
        ("Learn Morse code basics", "Learn to tap out SOS and your own name in the code that connected the world for a century."),
        ("Listen to an educational podcast episode", "Queue up a well-loved podcast episode on science, history, or ideas and learn while you relax."),
    ],
    "Food & Drink": [
        ("Make a smoothie with a new ingredient", "Blend up a smoothie featuring something you've never tried — and discover a new favorite."),
        ("Hold a blind taste test with snacks", "Line up similar snacks or drinks, hide the labels, and find out what your taste buds really prefer."),
        ("Make homemade pizza from scratch", "Stretch your own dough, choose your toppings, and beat takeout at its own game."),
        ("Brew coffee with a method you've never used", "Try a pour-over, French press, or cold brew and taste how much the method changes the cup."),
        ("Make a no-bake dessert", "Whip up an icebox cake, energy balls, or chocolate bark — maximum reward, zero oven."),
        ("Invent your own signature sandwich", "Raid the fridge, break the rules, and build a sandwich worthy of being named after you."),
    ],
    "Mindfulness": [
        ("Try mindful coloring", "Pick up some pencils and a coloring page and let the repetitive strokes quiet your mind."),
        ("Try candle gazing meditation", "Sit with a candle flame for a few minutes and let its gentle movement anchor your attention."),
        ("Do gentle stretching with slow breathing", "Pair slow, deep breaths with gentle stretches and feel the tension melt away."),
        ("Sit outside and just listen for ten minutes", "Find a comfortable spot outdoors, close your eyes, and count how many distinct sounds you can hear."),
        ("Write down your worries, then set them aside", "Give every worry a line on paper, then close the notebook — captured, contained, and out of your head."),
        ("Do one task slowly with full attention", "Choose a simple chore and do it with complete presence — washing up has never been so calming."),
    ],
    "Social": [
        ("Write a thank-you note to someone", "Tell someone exactly what they did and why it mattered — a two-minute note they may keep for years."),
        ("Plan a surprise for a friend or family member", "Cook up a small surprise — a treat, a visit, a memory book — for someone who deserves it."),
        ("Interview an older relative about their life", "Ask a parent or grandparent about their childhood and record the stories before they're lost."),
        ("Give three genuine compliments today", "Notice something real and say it out loud — watch how it changes their day and yours."),
        ("Plan a weekend trip with friends", "Get the group chat buzzing: pick dates, compare destinations, and turn 'we should' into 'we are'."),
        ("Strike up a conversation with a neighbor", "Say more than hello — a few friendly minutes builds the kind of neighborhood everyone wants."),
    ],
    "Games": [
        ("Do a crossword puzzle", "Sharpen your vocabulary and enjoy that unbeatable feeling when the last clue clicks."),
        ("Start a jigsaw puzzle", "Tip out the pieces, find the corners, and lose yourself in a satisfying slow-burn challenge."),
        ("Play twenty questions with someone", "Animal, vegetable, or mineral? See who can crack the mystery in the fewest questions."),
        ("Take an online trivia quiz", "Test your general knowledge with a quick quiz and find your specialist subject."),
        ("Learn a new solitaire variation", "Go beyond Klondike — learn Spider, FreeCell, or Pyramid and you'll never be bored with a deck of cards."),
        ("Replay a classic video game from your childhood", "Fire up an old favorite and find out whether it's still as good as you remember."),
    ],
}


def main():
    # Productive
    with open(f"{PUB}/productive-activities.json", encoding="utf-8") as f:
        prod = json.load(f)
    for cat in prod["categories"]:
        cat["description"] = PROD_CAT_DESCRIPTIONS[cat["name"]]
        for act in cat["activities"]:
            desc = PROD_DESCRIPTIONS.get(act["name"])
            assert desc, f"missing description for {act['name']}"
            act["description"] = desc
        for name, desc, image in PROD_NEW[cat["name"]]:
            cat["activities"].append({"name": name, "description": desc, "image": image})
        # keep key order: name, description, image
        cat["activities"] = [
            {k: a[k] for k in ("name", "description", "image") if k in a}
            for a in cat["activities"]
        ]
        ordered = {"name": cat["name"], "description": cat["description"], "activities": cat["activities"]}
        cat.clear()
        cat.update(ordered)
    with open(f"{PUB}/productive-activities.json", "w", encoding="utf-8") as f:
        json.dump(prod, f, indent=2, ensure_ascii=False)
        f.write("\n")

    # Leisure
    with open(f"{PUB}/activities.json", encoding="utf-8") as f:
        leis = json.load(f)
    for cat in leis["categories"]:
        existing = {a["name"] for a in cat["activities"]}
        for name, desc in LEISURE_NEW[cat["name"]]:
            assert name not in existing, f"duplicate: {name}"
            cat["activities"].append({"name": name, "description": desc})
    with open(f"{PUB}/activities.json", "w", encoding="utf-8") as f:
        json.dump(leis, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print("Productive:", sum(len(c["activities"]) for c in prod["categories"]), "activities")
    print("Leisure:", sum(len(c["activities"]) for c in leis["categories"]), "activities")


if __name__ == "__main__":
    main()
