export const outingThemes = [
  { id: "arts", label: "Art & culture", description: "Look closely, notice colour and make something small." },
  { id: "nature", label: "Nature & fresh air", description: "Slow down outside, from a park bench to a short trail." },
  { id: "explore", label: "Explore nearby", description: "See familiar streets and public places differently." },
  { id: "quiet", label: "Slow moments", description: "Take a gentle pause without needing a full itinerary." },
  { id: "learn", label: "Learn & discover", description: "Follow one question through a library, museum or local display." },
  { id: "move", label: "Move & reset", description: "Get moving at a pace that works for you." },
] as const;

export type OutingTheme = (typeof outingThemes)[number]["id"];

export type SoloOuting = {
  id: string;
  title: string;
  theme: OutingTheme;
  setting: "indoor" | "outdoor";
  cost: "free" | "low";
  minutes: number;
  plan: string;
  check: string;
  guide?: { href: string; label: string };
  viatorQuery?: string;
};

// Curated outings away from home, rather than every activity marked "solo".
export const soloOutings: SoloOuting[] = [
  {
    id: "library-discovery", title: "Browse a library shelf you usually skip", theme: "learn", setting: "indoor", cost: "free", minutes: 45,
    plan: "Visit a public library, choose a subject you know little about and browse three books. Spend the final ten minutes reading a chapter in a quiet seat.",
    check: "Check opening hours and visitor access. Borrowing books may require membership; browsing is the aim of this outing.",
  },
  {
    id: "museum-room", title: "Explore one room in a free museum", theme: "arts", setting: "indoor", cost: "free", minutes: 60,
    plan: "Choose a museum with free general admission. Pick one room, look closely at five objects and write down the story you would like to learn more about.",
    check: "Confirm free entry, opening hours and whether a timed ticket is required. Skip paid special exhibitions.",
    guide: { href: "/activities/learning/learn-about-local-history", label: "Explore local history" },
    viatorQuery: "guided museum tour",
  },
  {
    id: "gallery-colours", title: "Find a favourite colour in a free gallery", theme: "arts", setting: "indoor", cost: "free", minutes: 45,
    plan: "Visit a free public gallery and choose a colour to look for. Find three works that use it differently, then sketch a few shapes or note what you noticed.",
    check: "Choose a venue advertising free admission and check its opening times, booking requirements and sketching policy.",
    guide: { href: "/activities/creative/create-a-collage-from-magazine-cutouts", label: "Turn your colour notes into a collage later" },
    viatorQuery: "art gallery tour",
  },
  {
    id: "cafe-reading", title: "Take a book on a cafe break", theme: "quiet", setting: "indoor", cost: "low", minutes: 45,
    plan: "Choose a nearby cafe, order a drink within your budget and read a chapter. Leave ten minutes to jot down an idea or watch the street outside.",
    check: "Check the menu prices and seating before ordering. This option includes a purchase; travel costs are additional.",
  },
  {
    id: "park-loop", title: "Take a nature-noticing loop in a local park", theme: "nature", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Pick a familiar public park with free access. Walk a short loop, pause to notice three sounds and three textures, then sit for ten minutes before heading back.",
    check: "Check weather, daylight, opening times and path accessibility. Choose a route that leaves enough time to return.",
    guide: { href: "/activities/outdoor/take-a-walk-in-a-nearby-park-and-observe-nature", label: "Try a nature walk" },
    viatorQuery: "guided nature walk",
  },
  {
    id: "photo-walk", title: "Go on a five-photo neighbourhood walk", theme: "explore", setting: "outdoor", cost: "free", minutes: 60,
    plan: "Use a phone or camera you already own. Follow a short public route and photograph five examples of one theme, such as reflections, doors or shadows.",
    check: "Stay on public paths, respect people's privacy and keep time for the walk home. No equipment purchase is needed.",
    guide: { href: "/activities/outdoor/try-outdoor-photography", label: "Read the outdoor photography guide" },
    viatorQuery: "photography walking tour",
  },
  {
    id: "street-details", title: "Look for overlooked details on a familiar street", theme: "explore", setting: "outdoor", cost: "free", minutes: 30,
    plan: "Walk a familiar public street slowly. Look for a date on a building, an interesting sign and a detail above eye level. Record one question to research at home.",
    check: "Use pavements and public spaces, check daylight and avoid blocking entrances while you stop to look.",
    guide: { href: "/activities/learning/learn-about-local-history", label: "Follow up with local history research" },
  },
  {
    id: "park-sketch", title: "Make a tiny sketchbook page outdoors", theme: "arts", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Bring a pen and paper you already have to a free public park. Find a bench and draw three small things in front of you, giving each sketch ten minutes.",
    check: "Check the forecast, free access and seating. Use materials you already own and take everything home.",
    guide: { href: "/activities/creative/sketch-or-doodle-something-creative", label: "Start with simple sketching ideas" },
  },
  {
    id: "public-art-route", title: "Follow three pieces of public art", theme: "arts", setting: "outdoor", cost: "free", minutes: 60,
    plan: "Pick three sculptures, murals or installations on public routes close to one another. At each stop, notice one detail you missed at first glance and choose a favourite.",
    check: "Map a short walk before leaving and confirm the works are visible from public space. Keep entrances and paths clear.",
    viatorQuery: "public art walking tour",
  },
  {
    id: "architecture-sketch", title: "Sketch one interesting building", theme: "arts", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Find a building you can view comfortably from a public place. Spend ten minutes noticing its shapes, then make a loose sketch or describe its details in words.",
    check: "Choose a safe place to pause without blocking pedestrians. Bring paper and a pen you already own.",
    viatorQuery: "architecture walking tour",
  },
  {
    id: "gallery-one-artist", title: "Get to know one artist in a free gallery", theme: "arts", setting: "indoor", cost: "free", minutes: 60,
    plan: "Choose an artist represented in a free collection. Look at two or three works, read the labels and note one question to follow up later.",
    check: "Confirm general admission is free and check opening hours, booking rules and any temporary room closures.",
    viatorQuery: "art museum tour",
  },
  {
    id: "community-exhibition", title: "Visit a small community exhibition", theme: "arts", setting: "indoor", cost: "free", minutes: 45,
    plan: "Find a free display at a library, civic space or community gallery. Walk through once without reading, then return to the work that held your attention.",
    check: "Check that the display is open to visitors and free to enter. Some community spaces have limited hours.",
  },
  {
    id: "gallery-postcard", title: "Write a postcard after a gallery visit", theme: "arts", setting: "indoor", cost: "low", minutes: 60,
    plan: "Visit a free gallery, choose one work you would tell a friend about, then buy a postcard from the shop and write a few lines about it.",
    check: "Confirm free entry and check postcard prices. A note on your own paper makes this a free outing instead.",
  },
  {
    id: "tree-textures", title: "Compare the textures of five trees", theme: "nature", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Walk through a public park and look closely at the bark, leaves and shapes of five trees. Describe how each differs without needing to identify it.",
    check: "Use open paths, leave plants untouched and check the weather and park access before going.",
  },
  {
    id: "bird-listening", title: "Listen for birds in a green space", theme: "nature", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Find a bench in a public park. Spend ten quiet minutes counting different calls, then take a short loop and notice where the sounds change.",
    check: "Visit in daylight, stay on public paths and observe wildlife from a distance. No binoculars are required.",
    viatorQuery: "birdwatching tour",
  },
  {
    id: "riverside-pause", title: "Take a short riverside pause", theme: "nature", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Choose a well-used public waterside path. Walk for twenty minutes, sit where you can safely view the water and notice the changing light before returning.",
    check: "Check path conditions, weather and daylight. Stay behind barriers and away from slippery or unprotected edges.",
  },
  {
    id: "seasonal-colours", title: "Look for the season's colours", theme: "nature", setting: "outdoor", cost: "free", minutes: 30,
    plan: "Take a short park or neighbourhood loop and find five colours that show the current season. Photograph them or simply remember your favourite.",
    check: "Choose a public route that suits the weather and your mobility. Leave flowers and other natural features in place.",
  },
  {
    id: "public-garden-bench", title: "Visit a public garden with no agenda", theme: "nature", setting: "outdoor", cost: "free", minutes: 60,
    plan: "Find a garden or planted park with free entry. Walk one path slowly, then sit for fifteen minutes and notice what changes around you.",
    check: "Confirm entry is free, check opening hours and look for seating and accessible paths if you need them.",
  },
  {
    id: "cloud-notebook", title: "Make a tiny cloud and weather notebook", theme: "nature", setting: "outdoor", cost: "free", minutes: 30,
    plan: "Find a public seat with a clear view of the sky. Note the cloud shapes, wind and temperature, then compare them after a short walk.",
    check: "Check the forecast and avoid exposed spots during severe weather. A note on your phone works if you do not bring paper.",
  },
  {
    id: "pond-observation", title: "Observe a local pond from the path", theme: "nature", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Visit an accessible public pond and spend time noticing reflections, insects and birds. Walk its safe public perimeter if there is one.",
    check: "Stay on marked paths and away from the water's edge. Check access, daylight and whether the route is suitable after rain.",
  },
  {
    id: "new-street-loop", title: "Take one unfamiliar street on a short loop", theme: "explore", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Start from a familiar point, turn down one public street you have never explored and return by a known route. Notice a shopfront, garden or building you would visit again.",
    check: "Plan the return route before setting out and use well-lit public streets that feel comfortable to you.",
  },
  {
    id: "shop-window-themes", title: "Follow a shop-window theme", theme: "explore", setting: "outdoor", cost: "free", minutes: 30,
    plan: "Walk a public shopping street and look for a theme such as hand-lettered signs, unusual displays or one colour. Choose your favourite without buying anything.",
    check: "Check that the area is open and pedestrian-friendly. Keep moving at busy entrances and respect shop photography policies.",
  },
  {
    id: "market-hall-browse", title: "Browse an indoor market hall", theme: "explore", setting: "indoor", cost: "free", minutes: 45,
    plan: "Visit a market hall with free entry. Walk every aisle once, then return to one stall to learn what it sells or how its goods are made.",
    check: "Check market days and opening hours. Browsing is free; a purchase is optional and outside the free plan.",
    viatorQuery: "food market tour",
  },
  {
    id: "street-art-spotting", title: "Look for street art on a public route", theme: "explore", setting: "outdoor", cost: "free", minutes: 60,
    plan: "Pick a short route known for murals or painted shutters. Find three works and notice how each changes the feel of its street.",
    check: "Stay in public areas, check daylight and avoid photographing people or entering private property.",
    viatorQuery: "street art walking tour",
  },
  {
    id: "station-architecture", title: "Notice the architecture of a public station", theme: "explore", setting: "indoor", cost: "free", minutes: 30,
    plan: "Visit the publicly accessible concourse of a nearby station. Look for old signs, roof details or a view you normally rush past, then write down one observation.",
    check: "Stay outside ticketed areas and follow station rules. Choose a quieter time and do not block travellers.",
  },
  {
    id: "public-viewpoint", title: "Find a free local viewpoint", theme: "explore", setting: "outdoor", cost: "free", minutes: 60,
    plan: "Choose a public overlook, bridge or hill with a manageable route. Spend ten minutes finding landmarks and tracing how streets connect below you.",
    check: "Confirm public access and route conditions. Stay behind barriers, consider the climb and leave time to return before dark.",
    viatorQuery: "sightseeing walking tour",
  },
  {
    id: "library-journal", title: "Take a quiet journaling hour at the library", theme: "quiet", setting: "indoor", cost: "free", minutes: 45,
    plan: "Find a public library seat and write about three things you noticed this week. Finish by listing one small thing you would like to try next.",
    check: "Check opening hours and visitor seating rules. Bring your own notebook or use a note on your phone.",
  },
  {
    id: "bookshop-browse", title: "Browse a bookshop without a shopping list", theme: "quiet", setting: "indoor", cost: "free", minutes: 30,
    plan: "Visit a local bookshop and browse one shelf you normally ignore. Read a few back covers and make a note of a title to borrow or revisit.",
    check: "Check opening hours and be considerate in a small shop. Buying a book is optional, not part of the free outing.",
  },
  {
    id: "cafe-window-writing", title: "Write a page by a cafe window", theme: "quiet", setting: "indoor", cost: "low", minutes: 45,
    plan: "Order one affordable drink and write a page about what you can see outside. It can be a story, a list or a letter you never send.",
    check: "Look at prices and seating first. This idea includes a purchase; bring your own paper or use your phone.",
  },
  {
    id: "park-bench-reading", title: "Read one chapter on a park bench", theme: "quiet", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Bring a book you already own or borrowed from the library. Find a comfortable public bench, read for twenty minutes and take a slow walk back.",
    check: "Check weather, daylight and seating. Keep belongings with you and choose a spot where you feel at ease.",
  },
  {
    id: "waterside-listening", title: "Sit and listen beside a public waterside path", theme: "quiet", setting: "outdoor", cost: "free", minutes: 30,
    plan: "Choose a safe bench near a public riverfront or lake path. Spend ten minutes noticing sounds near and far, then take a gentle return walk.",
    check: "Use a maintained path and stay back from the edge. Check the forecast and whether the seating is accessible.",
  },
  {
    id: "picnic-for-one", title: "Take a simple picnic for one", theme: "quiet", setting: "outdoor", cost: "free", minutes: 60,
    plan: "Pack a snack or lunch you already have and choose a public park. Eat slowly, then take a short loop before heading home.",
    check: "Check park rules, weather and seating. Bring water and take all packaging away with you.",
  },
  {
    id: "quiet-courtyard", title: "Find a quiet public courtyard", theme: "quiet", setting: "outdoor", cost: "free", minutes: 30,
    plan: "Find an open public courtyard or square near you. Sit for fifteen minutes and notice how the place changes as people pass through.",
    check: "Confirm the space is publicly accessible and open at the time you plan to visit. Respect any posted rules.",
  },
  {
    id: "history-plaque-route", title: "Follow a short route of local history plaques", theme: "learn", setting: "outdoor", cost: "free", minutes: 60,
    plan: "Find two or three public plaques close together. Read each story, then note one person, date or event you want to learn more about later.",
    check: "Map a walk on public pavements, check daylight and keep clear of doorways while reading.",
    viatorQuery: "local history walking tour",
  },
  {
    id: "library-map-explore", title: "Explore a map of your area at the library", theme: "learn", setting: "indoor", cost: "free", minutes: 45,
    plan: "Ask whether your public library has local maps or a local studies shelf. Compare a map with the streets you know and choose one place to look up.",
    check: "Check opening hours and whether map or archive materials need an appointment. General browsing should stay within free-access areas.",
  },
  {
    id: "visitor-centre-question", title: "Bring one question to a free visitor centre", theme: "learn", setting: "indoor", cost: "free", minutes: 45,
    plan: "Visit a free public visitor centre or local information display. Choose one question about the area and use its maps or panels to find an answer.",
    check: "Confirm that the centre is open, free to enter and reachable without a ticketed attraction.",
  },
  {
    id: "museum-object-story", title: "Follow the story of one museum object", theme: "learn", setting: "indoor", cost: "free", minutes: 60,
    plan: "At a free museum, choose one object and read its label carefully. Find two nearby objects that add context, then summarise the story in a few sentences.",
    check: "Check free general admission, opening hours and whether the relevant room is open that day.",
    viatorQuery: "guided museum tour",
  },
  {
    id: "library-newspaper", title: "Read a local newspaper at the library", theme: "learn", setting: "indoor", cost: "free", minutes: 45,
    plan: "Browse a current local paper or a free public archive if one is available. Pick a story about your area and note how it connects to a place you know.",
    check: "Ask what newspapers are available to visitors and whether archives require a card, booking or fee; use free materials for this outing.",
  },
  {
    id: "science-display", title: "Try a free science or natural-history display", theme: "learn", setting: "indoor", cost: "free", minutes: 60,
    plan: "Choose one free gallery in a science or natural-history museum. Spend time with three exhibits and explain one new idea in your own words.",
    check: "Confirm the museum and chosen display have free entry. Interactive exhibits or special exhibitions may have separate charges.",
    viatorQuery: "science museum tour",
  },
  {
    id: "historic-cemetery", title: "Read the history in a public cemetery", theme: "learn", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Walk the public paths of a historic cemetery and look for changing dates, symbols or local names. Choose one detail to research afterward.",
    check: "Check visiting hours, stay on permitted paths and be respectful of mourners and active services.",
    viatorQuery: "historic cemetery tour",
  },
  {
    id: "brisk-local-loop", title: "Take a brisk loop from a familiar starting point", theme: "move", setting: "outdoor", cost: "free", minutes: 30,
    plan: "Choose a familiar public route you can finish comfortably. Walk at a lively but manageable pace for fifteen minutes, then turn back and cool down.",
    check: "Match the route to your ability, footwear, weather and daylight. Slow down or shorten the loop whenever needed.",
  },
  {
    id: "gentle-hill", title: "Walk to a gentle local viewpoint", theme: "move", setting: "outdoor", cost: "free", minutes: 60,
    plan: "Choose a modest public slope or raised path, take your time on the climb and pause to enjoy the view before returning.",
    check: "Check the gradient, surface and forecast in advance. Pick a level alternative if the climb is unsuitable.",
  },
  {
    id: "traffic-free-cycle", title: "Cycle a short traffic-free route", theme: "move", setting: "outdoor", cost: "free", minutes: 60,
    plan: "Use a bike you already own and choose a known traffic-free path. Ride out for twenty minutes, stop for a view and return the same way.",
    check: "Check that cycling is allowed, the route is open and the surface suits your bike. Allow time for a safe return.",
    viatorQuery: "guided cycling tour",
  },
  {
    id: "public-court-practice", title: "Practise solo at a free public court", theme: "move", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Bring a ball or racket you already have to a free-use public court. Spend a short session on easy serves, dribbles or wall practice at your own pace.",
    check: "Confirm the court allows free drop-in use and that solo practice is permitted. Yield to bookings and other users.",
  },
  {
    id: "indoor-walking-loop", title: "Take a sheltered indoor walking loop", theme: "move", setting: "indoor", cost: "free", minutes: 30,
    plan: "Choose a publicly accessible shopping centre or civic building. Walk a gentle circuit, pause to stretch and repeat if it feels comfortable.",
    check: "Check opening hours, public access and step-free routes if needed. You do not have to buy anything.",
  },
  {
    id: "leisure-centre-swim", title: "Take a short public-pool swim", theme: "move", setting: "indoor", cost: "low", minutes: 60,
    plan: "Book a public swim session at a local leisure centre. Swim or move in the water at your own pace, leaving time to change afterward.",
    check: "Check the full admission price, lane rules, accessibility, swimwear requirements and whether booking is needed.",
  },
  {
    id: "outdoor-fitness-stations", title: "Try an outdoor fitness station circuit", theme: "move", setting: "outdoor", cost: "free", minutes: 45,
    plan: "If a public park has free fitness equipment, choose two or three stations and try gentle movements with rest between them. Finish with an easy walk.",
    check: "Check equipment instructions and condition before use. Skip any movement that feels unsuitable and bring water.",
  },
  {
    id: "stretch-and-stroll", title: "Pair a gentle stroll with outdoor stretches", theme: "move", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Walk a familiar public path for twenty minutes. Pause at a comfortable spot for a few gentle stretches, then walk back without rushing.",
    check: "Choose level ground, suitable weather and a route that works for your mobility. Stretch within a comfortable range.",
  },
];

export type OutingSetting = "any" | SoloOuting["setting"];
export type OutingBudget = "any" | "free";
export type OutingThemeFilter = "any" | OutingTheme;

export function filterSoloOutings(setting: OutingSetting, budget: OutingBudget, theme: OutingThemeFilter = "any") {
  return soloOutings.filter((outing) =>
    (setting === "any" || outing.setting === setting) &&
    (budget === "any" || outing.cost === "free") &&
    (theme === "any" || outing.theme === theme)
  );
}
