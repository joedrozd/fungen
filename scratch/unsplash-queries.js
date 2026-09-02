/**
 * Search terms for the 42 activities that have no photograph.
 *
 * Written by hand rather than derived from the slug: Unsplash search matches on
 * photographer-supplied tags, so a concrete noun phrase ("jigsaw puzzle pieces")
 * finds the subject where a full sentence ("start a jigsaw puzzle") finds noise.
 * `alt` is tried only when the primary query returns nothing usable.
 */
module.exports = {
  // Outdoor
  "fly-a-kite-in-an-open-field": { q: "kite flying field", alt: "colorful kite sky" },
  "watch-clouds-and-find-shapes-in-them": { q: "clouds blue sky looking up", alt: "cumulus clouds" },
  "plant-something-in-a-pot-or-garden": { q: "planting seedling pot soil hands", alt: "repotting plant" },
  "skim-stones-at-a-lake-or-river": { q: "skipping stones lake", alt: "flat pebbles calm water" },
  "walk-a-new-route-through-your-neighborhood": { q: "walking neighborhood street", alt: "person walking suburban sidewalk" },
  "collect-natural-treasures-for-a-display": { q: "collected leaves pinecones flat lay", alt: "nature collection acorns leaves" },

  // Creative
  "make-a-playlist-for-a-specific-mood": { q: "headphones listening music phone", alt: "music playlist headphones" },
  "take-ten-creative-photos-of-ordinary-objects": { q: "still life photography everyday objects", alt: "phone photographing object" },
  "write-a-letter-to-a-friend-by-hand": { q: "handwritten letter pen paper", alt: "writing letter envelope" },
  "try-blackout-poetry-with-an-old-newspaper": { q: "old newspaper page marker", alt: "newspaper print close up" },
  "paint-kindness-rocks-to-leave-around-town": { q: "painted rocks acrylic", alt: "painting stones craft" },
  "start-a-doodle-a-day-challenge": { q: "sketchbook doodle drawing pen", alt: "notebook sketching" },

  // Learning
  "watch-a-documentary-on-a-brand-new-topic": { q: "watching documentary television notebook", alt: "person watching screen notes" },
  "learn-the-phonetic-alphabet": { q: "aviation radio headset", alt: "letter blocks alphabet" },
  "learn-to-read-basic-music-notation": { q: "sheet music notation", alt: "music score piano" },
  "explore-your-family-tree-online": { q: "old family photographs genealogy", alt: "vintage photo album" },
  "learn-morse-code-basics": { q: "morse code telegraph key", alt: "vintage radio transmitter" },
  "listen-to-an-educational-podcast-episode": { q: "podcast headphones walking outside", alt: "listening headphones outdoors" },

  // Food & Drink
  "make-a-smoothie-with-a-new-ingredient": { q: "smoothie blender fruit", alt: "green smoothie glass" },
  "hold-a-blind-taste-test-with-snacks": { q: "snacks bowls tasting table", alt: "taste test cups" },
  "make-homemade-pizza-from-scratch": { q: "homemade pizza dough", alt: "making pizza kitchen" },
  "brew-coffee-with-a-method-you-ve-never-used": { q: "pour over coffee brewing", alt: "coffee scales grinder" },
  "make-a-no-bake-dessert": { q: "no bake cheesecake dessert", alt: "chilled dessert slice" },
  "invent-your-own-signature-sandwich": { q: "sandwich making ingredients", alt: "homemade sandwich board" },

  // Mindfulness
  "try-mindful-coloring": { q: "coloring book colored pencils", alt: "adult coloring pattern" },
  "try-candle-gazing-meditation": { q: "candle flame dark room", alt: "single candle meditation" },
  "do-gentle-stretching-with-slow-breathing": { q: "gentle stretching yoga mat", alt: "stretching at home floor" },
  "sit-outside-and-just-listen-for-ten-minutes": { q: "sitting outside bench quiet nature", alt: "person sitting park bench" },
  "write-down-your-worries-then-set-them-aside": { q: "journaling notebook pen writing", alt: "writing journal desk" },
  "do-one-task-slowly-with-full-attention": { q: "pouring tea slowly hands", alt: "washing dishes hands sink" },

  // Social
  "write-a-thank-you-note-to-someone": { q: "thank you card handwriting", alt: "greeting card writing desk" },
  "plan-a-surprise-for-a-friend-or-family-member": { q: "wrapping gift surprise", alt: "gift box ribbon hands" },
  "interview-an-older-relative-about-their-life": { q: "grandmother talking family conversation", alt: "elderly person listening family" },
  "give-three-genuine-compliments-today": { q: "friends smiling conversation", alt: "two people talking smiling" },
  "plan-a-weekend-trip-with-friends": { q: "friends planning trip map laptop", alt: "travel planning map notebook" },
  "strike-up-a-conversation-with-a-neighbor": { q: "neighbors talking front porch", alt: "people chatting street" },

  // Games
  "do-a-crossword-puzzle": { q: "crossword puzzle pencil", alt: "newspaper crossword" },
  "start-a-jigsaw-puzzle": { q: "jigsaw puzzle pieces table", alt: "assembling jigsaw puzzle" },
  "play-twenty-questions-with-someone": { q: "friends laughing living room talking", alt: "family game night talking" },
  "take-an-online-trivia-quiz": { q: "trivia quiz night", alt: "quiz phone laptop question" },
  "learn-a-new-solitaire-variation": { q: "playing cards solitaire", alt: "deck of cards table" },
  "replay-a-classic-video-game-from-your-childhood": { q: "retro video game console controller", alt: "vintage gaming controller" },
};
