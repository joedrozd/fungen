export type SoloOuting = {
  id: string;
  title: string;
  setting: "indoor" | "outdoor";
  cost: "free" | "low";
  minutes: number;
  plan: string;
  check: string;
  guide?: { href: string; label: string };
};

// Curated outings away from home, rather than every activity marked "solo".
export const soloOutings: SoloOuting[] = [
  {
    id: "library-discovery", title: "Browse a library shelf you usually skip", setting: "indoor", cost: "free", minutes: 45,
    plan: "Visit a public library, choose a subject you know little about and browse three books. Spend the final ten minutes reading a chapter in a quiet seat.",
    check: "Check opening hours and visitor access. Borrowing books may require membership; browsing is the aim of this outing.",
  },
  {
    id: "museum-room", title: "Explore one room in a free museum", setting: "indoor", cost: "free", minutes: 60,
    plan: "Choose a museum with free general admission. Pick one room, look closely at five objects and write down the story you would like to learn more about.",
    check: "Confirm free entry, opening hours and whether a timed ticket is required. Skip paid special exhibitions.",
    guide: { href: "/activities/learning/learn-about-local-history", label: "Explore local history" },
  },
  {
    id: "gallery-colours", title: "Find a favourite colour in a free gallery", setting: "indoor", cost: "free", minutes: 45,
    plan: "Visit a free public gallery and choose a colour to look for. Find three works that use it differently, then sketch a few shapes or note what you noticed.",
    check: "Choose a venue advertising free admission and check its opening times, booking requirements and sketching policy.",
    guide: { href: "/activities/creative/create-a-collage-from-magazine-cutouts", label: "Turn your colour notes into a collage later" },
  },
  {
    id: "cafe-reading", title: "Take a book on a cafe break", setting: "indoor", cost: "low", minutes: 45,
    plan: "Choose a nearby cafe, order a drink within your budget and read a chapter. Leave ten minutes to jot down an idea or watch the street outside.",
    check: "Check the menu prices and seating before ordering. This option includes a purchase; travel costs are additional.",
  },
  {
    id: "park-loop", title: "Take a nature-noticing loop in a local park", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Pick a familiar public park with free access. Walk a short loop, pause to notice three sounds and three textures, then sit for ten minutes before heading back.",
    check: "Check weather, daylight, opening times and path accessibility. Choose a route that leaves enough time to return.",
    guide: { href: "/activities/outdoor/take-a-walk-in-a-nearby-park-and-observe-nature", label: "Try a nature walk" },
  },
  {
    id: "photo-walk", title: "Go on a five-photo neighbourhood walk", setting: "outdoor", cost: "free", minutes: 60,
    plan: "Use a phone or camera you already own. Follow a short public route and photograph five examples of one theme, such as reflections, doors or shadows.",
    check: "Stay on public paths, respect people's privacy and keep time for the walk home. No equipment purchase is needed.",
    guide: { href: "/activities/outdoor/try-outdoor-photography", label: "Read the outdoor photography guide" },
  },
  {
    id: "street-details", title: "Look for overlooked details on a familiar street", setting: "outdoor", cost: "free", minutes: 30,
    plan: "Walk a familiar public street slowly. Look for a date on a building, an interesting sign and a detail above eye level. Record one question to research at home.",
    check: "Use pavements and public spaces, check daylight and avoid blocking entrances while you stop to look.",
    guide: { href: "/activities/learning/learn-about-local-history", label: "Follow up with local history research" },
  },
  {
    id: "park-sketch", title: "Make a tiny sketchbook page outdoors", setting: "outdoor", cost: "free", minutes: 45,
    plan: "Bring a pen and paper you already have to a free public park. Find a bench and draw three small things in front of you, giving each sketch ten minutes.",
    check: "Check the forecast, free access and seating. Use materials you already own and take everything home.",
    guide: { href: "/activities/creative/sketch-or-doodle-something-creative", label: "Start with simple sketching ideas" },
  },
];

export type OutingSetting = "any" | SoloOuting["setting"];
export type OutingBudget = "any" | "free";

export function filterSoloOutings(setting: OutingSetting, budget: OutingBudget) {
  return soloOutings.filter((outing) =>
    (setting === "any" || outing.setting === setting) &&
    (budget === "any" || outing.cost === "free")
  );
}
