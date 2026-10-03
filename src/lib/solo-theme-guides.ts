import type { OutingTheme } from "@/lib/solo-outings";

type ThemeGuide = {
  heading: string;
  paragraphs: string[];
  ideas: string[];
};

export const soloThemeGuides: Record<OutingTheme, ThemeGuide> = {
  arts: {
    heading: "Make art and culture feel personal",
    paragraphs: [
      "An art outing works best when it has a small focus. A huge museum can feel like a task if you arrive thinking you should see everything, so choose one room, one artist or even one colour. A free permanent collection, community display or piece of public art gives you plenty to notice without a ticket. Look up the venue before travelling: general admission and special exhibitions can have different prices, and some free places still use timed entry. If you are going outdoors, choose works visible from public space and map a short route between them.",
      "Start by looking before you read. Give a painting, object or sculpture a full minute of attention and ask what catches your eye first: its shape, scale, texture, material or the way light reaches it. Then read the label or sign and look again. You do not need to know the period or the artist to have an opinion. If you are in a gallery, try comparing two works that use the same colour in different ways. If you are outside, notice how the artwork changes when you walk around it or see it against the street.",
      "A tiny response can make the visit memorable. Draw three loose shapes, write a six-line description, or note a question you want to answer later. A sketch is a record of what you saw, not a test of drawing ability. If you prefer photographs, check the venue's policy and keep other visitors out of the frame where possible. A postcard from a shop is an optional low-cost souvenir; a note on paper you already own does the same job for free. Leave enough of your 30–60 minutes simply to enjoy being there.",
      "You can adapt the plan to your energy and access needs. Pick a room with seating, use an audio description or large-print guide if the venue offers one, or make a short outdoor stop instead of a long indoor visit. Some exhibitions are busy or noisy, so checking quieter hours may help. Solo visits are particularly good for following your own curiosity: you can stay with a work that interests you and pass quickly by one that does not. Finish by choosing a single detail you would like to remember or explore another day.",
    ],
    ideas: [
      "Find three works that share a colour but create different moods.",
      "Choose one object and imagine the question its maker wanted to answer.",
      "Sketch the outline of a building without lifting your pen.",
      "Write a short note to a friend about the work you would show them.",
    ],
  },
  nature: {
    heading: "Let a short nature outing be enough",
    paragraphs: [
      "You do not need a dramatic landscape or a long hike to spend useful time outside. A local park, public garden, pond or maintained waterside path can support a 30–60 minute visit. Start with a place you can reach comfortably and plan an easy return. Check opening hours, weather, daylight and path conditions before leaving; a path that is fine in dry weather may be muddy or slippery after rain. If you want to avoid travel costs, choose a green space near a familiar bus stop or within walking distance and confirm that entry is free.",
      "Give yourself one simple thing to notice rather than trying to identify every plant and bird. Listen for changes in birdsong, compare the bark of several trees, follow the colours of the season or watch how clouds alter the light. Stop at a bench for a few minutes before moving on. A small notebook or phone note can hold words, a quick sketch or a list of sounds, but you can also keep the experience entirely in your head. The aim is to pay attention, not to collect evidence that you had a productive outing.",
      "Keep your route flexible. You might walk a loop, take a path out and back, or spend most of the time seated in one spot. A seated version can be just as rich: look at the sky, listen for near and distant sounds, or observe how the same patch of water changes over ten minutes. If you have more energy, add another gentle circuit. If you have less, turn back early. Choose maintained public paths that suit your mobility and footwear, and take particular care near roads, steep ground and water edges.",
      "Leave the place as you found it. Watch wildlife from a distance, stay on permitted routes and avoid picking plants simply for a notebook exercise. Bring water if you need it and take any packaging home. If the forecast worsens or daylight is short, swap the outing for an indoor idea rather than forcing the plan. Nature can be enjoyed in every season, but the details change: winter may be about branches and birds, while warmer months may bring more colour and shade. End by naming one thing you noticed that you might have walked past on an ordinary day.",
    ],
    ideas: [
      "Compare five trees by texture, shape or the space beneath them.",
      "Listen quietly for ten minutes, then walk and notice which sounds change.",
      "Choose a safe bench and watch the light move across one view.",
      "Make a five-colour list that could only belong to this season.",
    ],
  },
  explore: {
    heading: "Find a new angle on nearby places",
    paragraphs: [
      "Exploring on your own does not require a new city. One unfamiliar street, a market hall or a public viewpoint can make a familiar area feel different. Choose a starting point you know and decide where you will turn back before setting out. A short loop is often easier than an open-ended wander because it gives you time to notice things without worrying about the journey home. Check the route, daylight and public access, especially if a viewpoint, station concourse or indoor market has limited hours. Browsing a place is free when you do not need to buy anything.",
      "Give the walk a theme. You could look for hand-lettered shop signs, old dates on buildings, reflections in windows, public artwork or small design choices at street level. A theme turns an ordinary route into a series of discoveries and helps you notice details that the usual rush hides. You can record five photographs, write one sentence at each stop or simply choose a favourite. Keep to public pavements and shared spaces, pause where you do not block entrances, and follow local rules about photography or access.",
      "Indoor exploration can be just as interesting. A market hall offers a chance to compare stalls, listen to how the space changes and learn what is sold there. A publicly accessible station concourse may have roof details, older signs or an unexpected view. You do not have to make a purchase or enter ticketed areas to enjoy either. If you want a quieter version, look at a map in a library first and choose one street or landmark to investigate. If the place is crowded, take a shorter circuit or pick another time.",
      "The best outcome is often one question rather than a complete tour. Why does a building have that date? Who made a mural? Where does a side street lead? Note the question and look it up later if you want. If you are tempted to keep walking, check how much time remains and make sure the return route still feels comfortable. Avoid treating private property, construction areas or isolated shortcuts as part of the adventure. Your 30–60 minutes can end with a single interesting detail and a reason to revisit another day.",
    ],
    ideas: [
      "Find five examples of one colour or shape along a short public route.",
      "Compare a familiar street with one nearby street you have never taken.",
      "Browse a market hall once, then revisit the stall that caught your attention.",
      "Choose a public viewpoint and trace the route you used to reach it.",
    ],
  },
  quiet: {
    heading: "Give yourself permission to slow down",
    paragraphs: [
      "A solo outing does not have to become a project. Reading on a park bench, writing at a library table or sitting in a courtyard can be the whole plan. Choose somewhere that feels comfortable and gives you a clear way home. If you want to spend nothing on the activity, a public library or free-access outdoor space is a good starting point; a cafe break is a low-cost choice when you are happy to buy a drink. Check opening hours, seating rules, weather and travel costs before leaving so the quiet part of the outing stays simple.",
      "Arrive with one gentle intention. You might read a chapter, write about three things you noticed this week, or sit for ten minutes without checking your phone. There is no need to finish a book or fill a notebook. If your mind wanders, use the place around you as a prompt: describe the light, a sound in the distance or the movement outside a window. A few lines are enough. You can also do nothing but watch the scene change; paying attention is a complete activity on its own.",
      "Think about the level of company you want around you. A library often provides a quiet indoor seat, while a cafe gives you the background hum of other people without needing a conversation. A public square or park can offer more space. If a location feels too busy, move to another seat or end the visit early. For a low-cost cafe outing, look at the menu before ordering and decide your budget in advance. Browsing a bookshop can remain free if you simply note a title to borrow later.",
      "You can make the plan fit the day rather than forcing the day to fit a plan. Bring a borrowed book, use a note on your phone instead of buying stationery, choose a sheltered indoor place if rain starts, or shorten the outing to 30 minutes. Look for step-free access, toilets and seating if these matter to you. Keep your belongings close and choose a public place where you feel at ease. When it is time to leave, notice whether you want another quiet moment next week; that is enough of a takeaway.",
    ],
    ideas: [
      "Read one chapter and write down a line or idea you want to remember.",
      "List three small things you noticed on the way to your seat.",
      "Watch one view for ten minutes and describe how it changes.",
      "Pack a snack you already have for a simple picnic for one.",
    ],
  },
  learn: {
    heading: "Follow one question through the place",
    paragraphs: [
      "A learning outing is easier to enjoy when you begin with a question rather than a syllabus. What used to stand on this street? How was a museum object made? Why does a local map show an unfamiliar name? Choose one question and a place where you might find a clue: a public library, free museum room, visitor centre or short route past history plaques. Check access, opening hours and any booking rules before travelling. Some archives require appointments or membership, so use material that is open to visitors for a free outing.",
      "Once you arrive, let the first answer lead to the next question. Read a display label slowly, compare two nearby objects or look for a date that appears more than once. In a library, browse the local studies shelf or ask whether public maps and newspapers are available. At a visitor centre, try one exhibit rather than every panel. Write down a name, place or term you can follow up at home. You are not trying to become an expert in an hour; a single surprising connection is a worthwhile result.",
      "Be curious about how a story is told. A plaque may summarise a person's life in a few lines; a museum label may leave out the people who made or used an object. Ask what evidence is shown and what you would still like to know. If you research later, compare more than one reliable source before repeating a claim. In a historic cemetery, read signs and symbols from permitted paths while respecting mourners and active services. A small amount of careful attention is better than rushing through a long list of facts.",
      "Make the outing work for your pace. You can sit with a newspaper, choose a single museum object, or walk a short public route between two plaques. Some venues offer large-print materials, step-free routes or quiet times; check directly if you need them. Bring a phone note or small notebook for your question, but you do not have to record every detail. When you leave, write a two-sentence answer to your starting question and one new question. That gives the visit a shape without turning it into homework.",
    ],
    ideas: [
      "Compare an old map with the route you took to the library.",
      "Choose one museum object and find two others that change its story.",
      "Follow two public plaques and connect their dates to a local timeline.",
      "Find a local newspaper story linked to a place you know.",
    ],
  },
  move: {
    heading: "Move at a pace that belongs to you",
    paragraphs: [
      "A movement outing can be a 30-minute walk, a gentle climb, a short cycle or a swim. It does not need a target speed, step count or workout plan. Choose an option that fits how you feel today and a route you can finish comfortably. A familiar loop makes timing easier because you know where to turn back. Check weather, daylight, surface conditions and access before leaving; for a pool or court, check prices, session times and whether booking is required. Travel and equipment costs are separate from any free public route.",
      "Start easier than you think you need to. On a walk, use the first few minutes to settle into a comfortable pace, then decide whether to keep going or take a short pause. For a cycle, choose a permitted traffic-free path you already know and leave enough time to return. If you use outdoor fitness equipment, read its instructions and skip anything that does not feel right. A public court can be a place for simple solo practice when drop-in use is allowed. The point is to enjoy moving, not to complete every possible station.",
      "Build in a reason to notice the place. Walk to a public viewpoint, listen for birds on the return path or stop at a bench after a brisk section. A destination or observation makes a short outing more memorable than a clock alone. If you prefer shelter, a publicly accessible indoor walking loop can be useful in poor weather. A paid public-pool swim is another option when you want an indoor session; check the full admission price, changing facilities, accessibility and any lane rules before you go.",
      "Adapt the plan freely. Shorten the route, choose level ground, take breaks or replace a hill with a flatter view. Gentle stretches should stay within a comfortable range and can be skipped entirely. Wear shoes that suit the surface, bring water if useful and choose public routes where you feel at ease. If conditions change, turn back or switch to an indoor idea. Ending early does not make the outing unsuccessful. The best version is one that leaves you feeling able to do it again, perhaps with a different route next time.",
    ],
    ideas: [
      "Walk out for fifteen minutes, then return by the same familiar route.",
      "Choose a small viewpoint and pause there before heading back.",
      "Practise one easy movement at a free public court or fitness station.",
      "Take a sheltered indoor loop when the weather changes.",
    ],
  },
};
