import { howToPhotos } from "./how-to-photos";

export const projectTopics = {
  "small-repairs": {
    name: "Small repairs",
    description: "Tighten, adjust or replace everyday fittings with basic tools.",
    photo: howToPhotos["small-repairs"],
  },
  cleaning: {
    name: "Cleaning",
    description: "Clean tracks, blinds and removable parts without damaging them.",
    photo: howToPhotos.cleaning,
  },
  laundry: {
    name: "Laundry",
    description: "Sort washing, dry delicate knitwear and fold fitted sheets.",
    photo: howToPhotos.laundry,
  },
  "home-routines": {
    name: "Home routines",
    description: "Set up simple systems for paperwork, linen and cupboard food.",
    photo: howToPhotos["home-routines"],
  },
  organisation: {
    name: "Organisation",
    description: "Make room for the things you use with dividers, liners and cable storage.",
    photo: howToPhotos.organisation,
  },
  "make-and-mend": {
    name: "Make and mend",
    description: "Practise basic stitching and reuse fabric or craft scraps.",
    photo: howToPhotos["make-and-mend"],
  },
  "paper-crafts": {
    name: "Paper crafts",
    description: "Fold a gift bag or book cover, or stitch a small notebook.",
    photo: howToPhotos["paper-crafts"],
  },
  growing: {
    name: "Growing",
    description: "Pot herbs, label seedlings and propagate plants at home.",
    photo: howToPhotos.growing,
  },
  "advanced-projects": {
    name: "Advanced projects",
    description: "Plan longer builds, work from cut lists and tackle more involved sewing and furniture repairs.",
    photo: howToPhotos["advanced-projects"],
  },
} as const;

type Project = {
  id: string;
  category: keyof typeof projectTopics;
  title: string;
  searchTitle?: string;
  description: string;
  aliases?: string;
  minutes: number | [minimum: number, maximum: number];
  wait?: string;
  preparation: string;
  supplies: string[];
  steps: [string, string][];
  finish: string;
  tip: string;
  related: string[];
  sources?: { label: string; href: string }[];
};

export type ProjectSummary = Pick<Project, "id" | "title" | "description"> & {
  level: "Beginner" | "Advanced";
  time: string;
  minutes: number;
  searchText: string;
};

export const projects: Project[] = [
  {
    id: "tighten-a-cabinet-handle",
    category: "small-repairs",
    title: "Tighten a loose cabinet handle",
    description: "Fix a wobbly cupboard or cabinet handle with a hand screwdriver. Find the screws, seat the handle evenly and check for damaged threads.",
    aliases: "cabinet pull cupboard knob loose kitchen handle",
    minutes: 10,
    preparation: "Open the door and wiggle the handle while watching the screws from inside. If the handle moves and the door stays still, work on the handle fixings. Choose a driver that fills the screw head without wobbling. A driver that feels loose can damage the head before the screw moves.",
    supplies: ["A screwdriver that fits the screw head", "A small bowl for screws"],
    steps: [
      [
        "Find the fixings",
        "Open the door and look directly behind the handle. If a trim cap covers a screw, check how it comes off before prying at it. Keep a bowl nearby if you have to remove a screw.",
      ],
      [
        "Check the fit",
        "Hold the handle against the outside of the door and seat the screwdriver firmly in the screw head.",
      ],
      [
        "Tighten in small turns",
        "Press the handle flat with one hand. Alternate between the two screws, turning clockwise until both feel snug. Stop as soon as the handle stops moving to avoid marking the door or stripping the threads.",
      ],
      [
        "Test the handle",
        "Open and close the door a few times. Check that the handle stays snug and the door closes normally.",
      ],
    ],
    finish: "Pull the handle straight towards you, then gently side to side. Both ends should stay flat against the door. Recheck it after a few normal openings. If it loosens again, remove one screw and compare it with the other before buying a replacement.",
    tip: "If a screw spins freely, check both sets of threads. Replace a damaged screw with one of the same length and thread. If the threads inside the handle are damaged, replace the handle.",
    related: ["adjust-a-rubbing-cabinet-door", "replace-cabinet-handle-and-cover-old-holes"],
  },
  {
    id: "make-cardboard-drawer-dividers",
    category: "organisation",
    title: "Make cardboard drawer dividers",
    description: "Make a custom drawer organiser from a cardboard box. Measure the drawer, plan the compartments and cut slots that lock the dividers together.",
    aliases: "organizer storage partition desk drawer divider",
    minutes: 30,
    preparation: "Empty the drawer and pick the items you actually want to keep there. Dry, corrugated cardboard works for stationery, socks and cables. Try laying the items in groups with a finger-width of space around each one so you can pick them up without lifting the dividers.",
    supplies: ["Stiff cardboard", "Ruler and pencil", "Scissors", "Tape"],
    steps: [
      [
        "Measure the drawer",
        "Measure the inside width and depth. Check how much height you have when the drawer is closed, then make the dividers slightly shorter.",
      ],
      [
        "Plan the compartments",
        "Lay out the items you want to store. Mark where one long strip and one or more cross strips should meet.",
      ],
      [
        "Cut and slot the strips",
        "Cut one strip to span the drawer front to back and cross strips to span it side to side. Mark each crossing on both pieces. Cut a slot halfway down from the top on one piece and halfway up from the bottom on the other. Test the width on an offcut before cutting the remaining slots.",
      ],
      [
        "Fit and adjust",
        "Slide the strips together and place them in the drawer. Trim any tight edges, tape joints that wobble and check the drawer closes freely before filling it.",
      ],
    ],
    finish: "Fit the grid in the empty drawer, close it slowly and pull it out again. If a divider catches, trim the top edge evenly. Put the tallest item in first and check that everything stays in its own compartment after a few opens and closes.",
    tip: "Test a slot on a scrap of the same cardboard before cutting all the strips. It should slide over the cardboard with light pressure.",
    related: ["make-a-cupboard-shelf-liner", "make-reusable-cable-ties"],
  },
  {
    id: "pot-a-windowsill-herb",
    category: "growing",
    title: "Pot a windowsill herb",
    description: "Repot a nursery-grown herb for a windowsill. Choose a pot with drainage, keep the root ball at the right depth and settle it in with a first watering.",
    aliases: "grow herbs repot chives mint basil herb garden",
    minutes: 20,
    preparation: "Start with a healthy herb that suits the window you have. Check the plant label for light, water and mature size. Pick a pot one size up from its nursery pot, with holes in the base. Have a saucer ready so you can drain it without leaving water on the sill.",
    supplies: ["A nursery-grown herb, such as chives", "A slightly larger pot with drainage holes", "Potting mix", "Saucer"],
    steps: [
      [
        "Prepare the pot",
        "Put enough potting mix in the bottom to hold the herb at the same soil level it had in its nursery pot, with a little space below the rim for watering.",
      ],
      [
        "Move the herb",
        "Gently squeeze the nursery pot and slide out the root ball while supporting it with your hand. Centre it in the new pot and fill around it with potting mix.",
      ],
      [
        "Water and drain",
        "Water until a little runs out of the drainage holes. Let the pot drain and empty excess water from the saucer.",
      ],
      [
        "Pick a spot",
        "Place the pot on a bright windowsill and follow the light and watering instructions on the plant label. Check the soil before watering again.",
      ],
    ],
    finish: "The crown should sit at its original depth, with no stems buried and a small gap below the rim for watering. A few days later, feel the surface of the potting mix and follow the label before watering. Check that the saucer is dry after each watering.",
    tip: "If the potting mix stays wet, empty the saucer and check that the drainage holes are clear.",
    related: ["make-seedling-labels", "build-a-container-planter-box"],
    sources: [
      { label: "Royal Horticultural Society guide to growing herbs in containers", href: "https://www.rhs.org.uk/herbs/growing" },
    ],
  },
  {
    id: "adjust-a-rubbing-cabinet-door",
    category: "small-repairs",
    title: "Adjust a cabinet door that rubs",
    searchTitle: "How to Adjust a Cupboard Door That Rubs",
    description: "Realign a cupboard door that rubs by adjusting its concealed hinges. Identify the right screw and even out the gap with small, reversible turns.",
    aliases: "fix kitchen cupboard hinge align cabinet doors adjust alignment",
    minutes: 15,
    preparation: "Close the door slowly and note where it touches. Compare the gap at the top and bottom. This guide covers sideways adjustment on concealed hinges. If the door has dropped or sits too far forward, look for height or depth adjustment in the manual for your hinge model.",
    supplies: ["Matching screwdriver", "Masking tape"],
    steps: [
      [
        "Check the hinge",
        "Open the door and look for concealed hinges with adjustment screws. Find the hinge model or its diagram to identify the side-to-side screw.",
      ],
      [
        "Mark a starting point",
        "Put a piece of tape on the cabinet edge and mark where the closed door sits. Check that the hinge mounting screws are snug.",
      ],
      [
        "Adjust one hinge a little",
        "Support the door, mark the starting screw position and turn the side-to-side adjustment screw a quarter turn. Close the door slowly and compare the gap with the tape mark. Reverse that turn if the gap gets tighter. Leave the mounting screws in place during sideways adjustment.",
      ],
      [
        "Check the whole swing",
        "Repeat in small increments, checking both hinges and the gap to the next door. Remove the tape once the door clears.",
      ],
    ],
    finish: "Check the gap with the neighbouring doors shut and then open each door in turn. The gaps should look even and no edge should rub. If one corner still catches, go back to the tape mark and change only the hinge nearest that corner in a small increment.",
    tip: "If the mounting plate moves when you lift the door, address the loose fixing before adjusting alignment.",
    related: ["tighten-a-cabinet-handle", "replace-a-cupboard-door-bumper"],
    sources: [
      { label: "Blum concealed hinge adjustment diagrams", href: "https://d2.blum.com/services/BEC003/concealedhinges_ep_dok_bus_%24sen-us_%24aof_%24v17.pdf" },
    ],
  },
  {
    id: "replace-chair-felt-pads",
    category: "small-repairs",
    title: "Replace felt pads on chair legs",
    description: "Replace worn felt pads on dining chair legs. Measure the feet, prepare the surface and test that the pads protect the floor without rocking.",
    minutes: 15,
    preparation: "Check what the chair feet are made of and what the floor manufacturer recommends. The pad needs a flat surface and should fit within the end of the leg. If the chair currently has a loose push-in glide, identify the glide first because a pad needs a sound surface to stick to.",
    supplies: ["Self-adhesive felt pads", "Damp cloth", "Dry cloth", "Ruler"],
    steps: [
      [
        "Check the feet",
        "Set the empty chair on its side on a soft surface. Measure the flat contact area of each foot and choose pads that fit within it.",
      ],
      [
        "Prepare the surface",
        "Peel off the worn pads, wipe away dirt and let the feet dry fully.",
      ],
      [
        "Apply the pads",
        "Centre each pad and press firmly for the time on the pack. Follow the pack’s instructions before putting weight on them.",
      ],
      [
        "Test the chair",
        "Stand it upright on a level floor, check for wobble and slide it gently to make sure the pads stay put.",
      ],
    ],
    finish: "Once the adhesive has set as directed, move the chair gently in more than one direction. Look underneath for a pad that has shifted or collected grit. Sit down only after the empty chair stands level on all four feet.",
    tip: "Replace the pads as a set if mixed thicknesses make the chair rock.",
    related: ["stop-a-table-wobbling", "reupholster-a-drop-in-chair-seat"],
  },
  {
    id: "fix-a-squeaky-door-hinge",
    category: "small-repairs",
    title: "Quiet a squeaky interior door hinge",
    searchTitle: "How to Fix a Squeaky Interior Door Hinge",
    description: "Find and quiet a squeaky interior door hinge. Protect the surrounding finish, apply a small amount of suitable lubricant and check the door swing.",
    aliases: "oil lubricate creaky squeaking door hinge",
    minutes: 10,
    preparation: "Try this on an ordinary interior door whose hinges are firmly attached. Open the door a little and hold it still while listening close to each hinge during a short swing. A creak from wood rubbing at the jamb points to a fit problem. Check the hinge maker’s care instructions if you can identify it.",
    supplies: ["Lubricant labelled for door hinges", "Cloth", "Paper towel"],
    steps: [
      [
        "Locate the squeak",
        "Open and close the door slowly and listen at each hinge. Check that the hinge leaves sit flush and the screws look secure.",
      ],
      [
        "Protect the area",
        "Hold a paper towel below the noisy hinge and wipe dust from around the pin.",
      ],
      [
        "Apply a little lubricant",
        "Following the product directions, apply a small amount where the pin meets the hinge knuckles.",
      ],
      [
        "Work it in",
        "Swing the door several times, wipe away drips and listen again.",
      ],
    ],
    finish: "Swing the door through its normal range two or three times. A treated hinge should move quietly without oily marks below it. If the sound comes from the latch or the door edge instead, look for a shiny rub mark on the frame before treating any more hinges.",
    tip: "If the hinge shifts or the door rubs the frame, check the fit before adding more lubricant.",
    related: ["adjust-a-rubbing-cabinet-door", "replace-a-door-stop-tip"],
  },
  {
    id: "make-a-desk-cable-holder",
    category: "organisation",
    title: "Make a desk cable holder with binder clips",
    description: "Keep charging cables from falling behind a desk with a binder clip. Protect the finish, route each cable and leave enough slack for everyday use.",
    aliases: "charging cord wire bulldog clip cable management",
    minutes: 10,
    preparation: "Check that the desk edge has enough depth for the whole clip and that the connector is wider than the opening it will rest against. Try one clip on the underside first to check the finish. Choose somewhere a cable will reach your device without crossing a walkway.",
    supplies: ["Binder clips that fit the desk edge", "Thin felt scraps"],
    steps: [
      [
        "Pick a spot",
        "Unplug the cables and choose an accessible desk edge where the clips will clear your knees and drawers.",
      ],
      [
        "Protect the finish",
        "Pad the edge with felt and test that the clip grips securely without leaving a mark.",
      ],
      [
        "Thread the cables",
        "Feed each unplugged cable through a wire handle. If its plug is too large, pinch the wire handle to release it from the clip, slip the cable in and refit the handle.",
      ],
      [
        "Leave slack",
        "Plug in the cables and check that they slide freely without a tight bend or strain at the plugs.",
      ],
    ],
    finish: "Unplug the device and let the end drop back to the clip. It should stop at the connector, and the cable should slide when you pick it up again. Check that your hand, knees and chair clear the clip in normal use.",
    tip: "Use one clip per cable if the connectors slip through or the cables bind together.",
    related: ["make-reusable-cable-ties", "make-a-freestanding-pegboard-organiser"],
  },
  {
    id: "make-a-cupboard-shelf-liner",
    category: "organisation",
    title: "Cut a removable cupboard shelf liner",
    description: "Measure and cut a non-adhesive liner for a kitchen cupboard. Make room around shelf supports and trim the liner so it lies flat and lifts out.",
    minutes: 20,
    preparation: "Use a removable liner suited to the shelf finish and what you store on it. If the shelf is an awkward shape, make a paper template first. Place a pencil mark on the template for the front edge so you can transfer it the right way round.",
    supplies: ["Non-adhesive shelf liner", "Tape measure and ruler", "Pencil and scissors", "Scrap paper for an irregular shelf"],
    steps: [
      [
        "Empty and clean the shelf",
        "Remove everything, wipe the surface and let it dry.",
      ],
      [
        "Measure inside the cupboard",
        "Check width and depth at more than one point. Use the smaller measurements if the sides are uneven.",
      ],
      [
        "Mark and cut",
        "Mark the dimensions on the back of the liner. Cut along a straightedge guide and trim around any shelf supports.",
      ],
      [
        "Test the fit",
        "Lay it flat, trim any edges that curl up and check the door closes before restocking.",
      ],
    ],
    finish: "Open and close the cupboard with the liner in place. Lift a front corner to make sure you can take it out for cleaning. After restocking, slide one item forward to check the liner stays flat beneath it.",
    tip: "If the liner slips, check which side the manufacturer specifies should face the shelf.",
    related: ["make-cardboard-drawer-dividers", "make-a-pantry-use-first-basket"],
  },
  {
    id: "make-a-fabric-draught-excluder",
    category: "make-and-mend",
    title: "Make a fabric draught excluder",
    description: "Sew a fabric draught excluder from scraps. Measure the door gap, make a tube, fill it evenly and check how it sits along the floor.",
    aliases: "draft stopper door snake draught proof",
    minutes: 45,
    preparation: "Choose an interior door where a loose fabric roll can sit on the floor and be moved easily. Check how wide the gap is and where the roll will go when the door opens. Use firm, tightly woven fabric and clean, dry scraps so the filling stays put.",
    supplies: ["Sturdy fabric", "Tape measure", "Scissors", "Needle and thread", "Clean fabric scraps for filling"],
    steps: [
      [
        "Measure the gap",
        "Measure the width of the opening and check that a loose roll can sit against the closed door without blocking a walkway.",
      ],
      [
        "Sew the tube",
        "For a roll about 8 cm across, cut a strip 28 cm wide and 4 cm longer than the opening. Fold it lengthways with the outer faces together. Stitch about 1 cm in from the long raw edge and close one end with the same allowance. Turn the tube right side out before filling.",
      ],
      [
        "Fill evenly",
        "Turn the tube right side out and pack it with small scraps until it holds its shape and still settles against the floor.",
      ],
      [
        "Close and fit",
        "Tuck in the raw edges at the open end and stitch it closed. Place it against the closed door and move it aside before walking through.",
      ],
    ],
    finish: "Place the roll along the closed door. You should see contact with the floor across most of the gap. Push the filling into any flat spots by hand and move the roll to one side whenever the door needs to open.",
    tip: "Choose a different door if the gap provides ventilation, if the door needs to close automatically or if the roll would obstruct an exit.",
    related: ["mend-an-open-seam", "sew-lined-drawstring-storage-bag"],
  },
  {
    id: "sew-on-a-shirt-button",
    category: "make-and-mend",
    title: "Sew a four-hole button back onto a shirt",
    searchTitle: "How to Sew On a Four-Hole Shirt Button",
    description: "Hand-sew a four-hole shirt button with matching stitches and a small thread shank. Find the right position and check that the buttonhole still fits.",
    minutes: 15,
    preparation: "Compare the spare button with the others for diameter, thickness and hole layout. It should pass through the buttonhole without stretching it. Match the old stitch colour and pattern, and practise threading and knotting the needle on a scrap if this is your first sewing repair.",
    supplies: ["Matching four-hole button", "Needle", "Thread", "Scissors", "Toothpick"],
    steps: [
      [
        "Mark the spot",
        "Line up the buttonhole with the old stitch marks and place the button over that point.",
      ],
      [
        "Anchor the thread",
        "Thread the needle, knot the ends and take a small stitch through the fabric at the mark to anchor it. Bring the needle up from the back and through the first hole. Leave the button resting on the fabric while you position the toothpick.",
      ],
      [
        "Build the stitches",
        "Lay the toothpick across the button so the stitches pass over it. Sew through each pair of holes several times. Copy the parallel or crossed pattern on the neighbouring buttons. Keep the threads snug over the toothpick without bending it.",
      ],
      [
        "Finish underneath",
        "Remove the toothpick. Wrap the thread around the stitches under the button a few times, pass the needle to the back and knot securely. Test the button in its hole.",
      ],
    ],
    finish: "Fasten and unfasten the button a few times with the shirt flat. The stitches should hold without drawing the fabric into a pucker, and the small thread shank should leave room for the other layer of cloth under the button.",
    tip: "If the fabric has torn around the old stitches, mend the hole before attaching the button.",
    related: ["mend-an-open-seam", "make-a-felt-bookmark"],
  },
  {
    id: "make-a-cork-coaster",
    category: "make-and-mend",
    title: "Make a cork coaster",
    description: "Make a cork coaster from a craft sheet and a round lid. Trace the right size, trim the edge and test the mug on a level surface.",
    minutes: 20,
    preparation: "Use cork sheet that the pack says can be cut with scissors. Lay the mug on the lid you plan to trace and check that the whole base fits with a little room on every side. If the cork is curled, flatten it under a book before tracing.",
    supplies: ["Craft cork sheet suitable for scissors", "Pencil", "Scissors", "Round lid wider than your mug"],
    steps: [
      [
        "Choose a template",
        "Place the lid on the cork and check that it leaves room around the base of your largest mug.",
      ],
      [
        "Trace the circle",
        "Hold the lid still and draw around its outside edge.",
      ],
      [
        "Cut the cork",
        "Use short, controlled cuts just outside the pencil line, then trim back to the line to even the edge.",
      ],
      [
        "Check the surface",
        "Brush away crumbs and set the coaster on a flat table. Place an empty mug on it and check it sits level.",
      ],
    ],
    finish: "Set the finished coaster on a level table. Press around its edge to find any lifted points. Put an empty mug in the centre, then turn the mug a quarter turn to check it stays steady before using the coaster with a drink.",
    tip: "If the edge crumbles, use a thinner craft cork sheet that can be cut cleanly with scissors.",
    related: ["make-a-felt-bookmark", "make-a-paper-gift-bag"],
  },
  {
    id: "propagate-a-spider-plant",
    category: "growing",
    title: "Propagate a spider plant pup in soil",
    description: "Propagate a spider plant pup in soil while it is attached to the parent. Set up a second pot, hold the pup in place and check when it has rooted.",
    aliases: "spider plant babies offsets plantlet propagate layering",
    minutes: 15,
    wait: "rooting time",
    preparation: "Choose a plantlet on a long enough stem to reach a second pot beside the parent. Set the pots at a similar height so the connecting stem lies relaxed. Look for small bumps or roots under the plantlet and use a small pot so you can judge when its compost is drying.",
    supplies: ["Spider plant with a pup", "Small pot with drainage holes", "Potting mix", "Bent wire pin if needed", "Clean scissors"],
    steps: [
      [
        "Pick a pup",
        "Choose a baby plant with small root bumps on the underside and a stem long enough to reach a nearby pot.",
      ],
      [
        "Pin the plantlet to the soil",
        "Fill the pot with damp mix. Rest the root bumps on the surface with the leaves above the mix. If the plantlet springs up, use a bent wire pin over the connecting stem to hold it gently in place.",
      ],
      [
        "Let it root",
        "Keep the pots in bright, indirect light. Check the mix regularly and water when the surface begins to dry.",
      ],
      [
        "Separate it",
        "Once the pup has put on new growth and resists a gentle tug, snip the connecting stem with clean scissors.",
      ],
    ],
    finish: "After separating the rooted plantlet, leave it in bright, indirect light and check the compost for moisture. Look for an upright centre and new leaves over the following weeks. Give it time to fill its small pot before moving it to a larger one.",
    tip: "If the pup moves freely when tested, leave it attached and give it longer to root.",
    related: ["root-coleus-cuttings-in-water", "pot-a-windowsill-herb"],
    sources: [
      { label: "Royal Horticultural Society guide to spider plant care and propagation", href: "https://www.rhs.org.uk/plants/spider-plants/growing-guide" },
    ],
  },
  {
    id: "sow-pea-shoots-in-a-tray",
    category: "growing",
    title: "Sow pea shoots in a shallow tray",
    description: "Grow pea shoots in a shallow windowsill tray. Choose seeds sold for edible shoots, water from below and harvest the tops above the compost.",
    aliases: "pea microgreens windowsill seedlings",
    minutes: 20,
    wait: "growing time",
    preparation: "Choose untreated seeds sold for edible pea shoots and follow the packet’s sowing and harvest instructions. Wash your hands and start with clean trays and fresh growing mix. Set the tray where it can drain without sharing a work surface with raw meat or other sources of contamination.",
    supplies: ["Pea seeds sold for edible shoots", "Clean tray with drainage holes", "Drip tray", "Fresh seed compost", "Clean scissors"],
    steps: [
      [
        "Fill the tray",
        "Add a shallow layer of compost, moisten it and let excess water drain into the drip tray.",
      ],
      [
        "Sow and label",
        "Follow the packet for soaking, spacing and sowing depth. Spread the seeds evenly so they are easy to water and label the tray with the sowing date.",
      ],
      [
        "Check the tray daily",
        "Move the tray to bright light after germination. When the growing mix begins to dry, add a little water to the drip tray, let it soak up from below, then empty any excess.",
      ],
      [
        "Cut the tops",
        "When the shoots reach the packet’s recommended harvest stage, wash your hands and snip the stems above the compost with clean scissors. Keep the cut shoots away from the tray and roots.",
      ],
    ],
    finish: "Harvest the leafy tops above the growing mix. Leave the seeds, roots and compost in the tray. Check that the cut shoots are free of growing mix and rinse them under running drinking water before use.",
    tip: "If the tray develops visible mould, discard the crop and wash the tray before starting again.",
    related: ["make-seedling-labels", "pot-a-windowsill-herb"],
    sources: [
      { label: "Penn State Extension guide to growing microgreens at home", href: "https://extension.psu.edu/a-step-by-step-guide-for-growing-microgreens-at-home" },
    ],
  },
  {
    id: "tighten-a-loose-drawer-front",
    category: "small-repairs",
    title: "Tighten a loose drawer front",
    description: "Tighten a loose drawer front with accessible screws. Find which part is moving, support the panel and check the gaps after tightening.",
    minutes: 15,
    preparation: "Hold the drawer box still and move the front panel gently. If the handle moves on its own, check its screws first. If the whole face moves, look at the panel fixings from inside the empty drawer. Photograph the original positions if the fixings are adjustable.",
    supplies: ["Matching screwdriver", "Folded towel"],
    steps: [
      [
        "Empty the drawer",
        "Take out the contents and open the drawer far enough to see the back of the front panel.",
      ],
      [
        "Find the panel screws",
        "Look for screws passing through the drawer box into the front panel. Check the drawer instructions if the fixings are hidden behind a cover or use a clip.",
      ],
      [
        "Hold and tighten",
        "Support the front with a folded towel under its lower edge if needed. Hold it flush against the drawer box and snug up the screws by hand.",
      ],
      [
        "Check the fit",
        "Close the drawer slowly and compare the gaps around it. Open it again and check that the panel stays firm when you pull the handle.",
      ],
    ],
    finish: "Compare the side gaps with the drawer above or below. Pull using the centre of the handle, then close it slowly. The face should stay square to the drawer box and clear neighbouring panels.",
    tip: "If a screw spins without gripping, stop tightening and inspect the fixing before using the drawer.",
    related: ["tighten-a-cabinet-handle", "rebuild-a-loose-wooden-drawer-joint"],
  },
  {
    id: "replace-a-cupboard-door-bumper",
    category: "small-repairs",
    title: "Replace stick-on cupboard door bumpers",
    description: "Replace worn stick-on cabinet door bumpers. Match their height, clean the contact points and check that the door still closes flush.",
    aliases: "cabinet cushion pad soft close cupboard door bump stop",
    minutes: 15,
    preparation: "Check the existing pads before ordering replacements. Measure their diameter and uncompressed height if one is intact. Close the door gently and note whether it touches the frame on one corner or evenly across both contact points.",
    supplies: ["Self-adhesive cabinet bumpers", "Damp cloth", "Dry cloth"],
    steps: [
      [
        "Find the contact points",
        "Close the door slowly and note where it meets the frame. Use any existing pads as a guide to placement and thickness.",
      ],
      [
        "Clean the surface",
        "Peel away the old pads, wipe away residue with a cloth suitable for the finish and let the surface dry.",
      ],
      [
        "Stick on the new pads",
        "Peel the backing and press a pad onto each contact point. Follow the packet instructions for pressure and curing time.",
      ],
      [
        "Check the close",
        "Swing the door shut gently. It should meet the pads evenly and still sit in line with neighbouring doors.",
      ],
    ],
    finish: "With the new pads set according to the packet, close the door at normal speed. The pads should take the impact without leaving the door sitting forward. If it still knocks, watch which corner makes contact first.",
    tip: "If the door sticks out after fitting, check for pads that are thicker than the originals.",
    related: ["adjust-a-rubbing-cabinet-door", "replace-a-door-stop-tip"],
  },
  {
    id: "stop-a-table-wobbling",
    category: "small-repairs",
    title: "Steady a wobbly table with furniture shims",
    searchTitle: "How to Stop a Table Wobbling on an Uneven Floor",
    description: "Stop a wobbly table rocking on an uneven floor. Find the foot that lifts, fit a furniture shim and check the table from every corner.",
    minutes: 15,
    preparation: "Try the table on a known flat patch of floor if it is light enough to move safely. If the wobble disappears and the legs are firm, the original spot needs levelling. Check for adjustable feet before buying shims because a built-in adjuster can do the same job.",
    supplies: ["Furniture shims suited to your floor", "Masking tape"],
    steps: [
      [
        "Clear the tabletop",
        "Move breakables and heavy objects before testing the table.",
      ],
      [
        "Find the gap",
        "Press gently above each corner in turn and identify the foot that lifts. Check that the legs and joints are firmly attached before continuing.",
      ],
      [
        "Fit a shim",
        "Mark the foot with tape, then slide in a furniture shim until it fills the gap. Keep the shim under the foot so it stays clear of passing feet.",
      ],
      [
        "Retest from each corner",
        "Press gently above every leg. If the table still rocks, reposition the shim or try a different thickness.",
      ],
    ],
    finish: "With the table in its usual position, press above each leg. It should stay still, and no shim should stick out or shift when you push it lightly. Recheck the setup if you later move the table or change the flooring.",
    tip: "If a joint moves when you press on the table, repair the joint before using the table.",
    related: ["replace-chair-felt-pads", "build-a-tabletop-display-stand"],
  },
  {
    id: "make-reusable-cable-ties",
    category: "organisation",
    title: "Make reusable cable ties from hook-and-loop tape",
    description: "Cut reusable hook-and-loop ties for spare charging and data cables. Size each tie to a loose coil so the connectors stay visible and the cable unrolls easily.",
    minutes: 15,
    preparation: "This is for spare cables you can unplug and store. Lay each one out and let it settle into its natural curve. Choose soft tape that fastens to itself and test that the hook side will face away from any delicate cable cover.",
    supplies: ["Double-sided hook-and-loop tape", "Scissors", "Ruler"],
    steps: [
      [
        "Sort the cables",
        "Unplug the cables and group them by type or device.",
      ],
      [
        "Make loose coils",
        "Loop each cable without forcing sharp bends. Leave both connectors visible so you can identify the cable later.",
      ],
      [
        "Cut a tie to length",
        "Wrap the tape around a coil and allow a few centimetres for overlap. Mark that length and cut the strip with scissors.",
      ],
      [
        "Fasten and check",
        "Press the overlapping ends together. Check that the tie holds when lifted and can be undone without pulling on the cable.",
      ],
    ],
    finish: "Pick up a bundled cable by the coil and put it down again. The tie should hold without pinching or leaving a dent. Open it using the overlap and check that the connectors stay easy to identify.",
    tip: "If the cable keeps its kink after you unfasten the tie, make a wider coil and cut a longer strip.",
    related: ["make-a-desk-cable-holder", "make-cardboard-drawer-dividers"],
  },
  {
    id: "make-an-envelope-receipt-organiser",
    category: "organisation",
    title: "Make a receipt organiser from envelopes",
    description: "Turn envelopes and a small box into a receipt organiser. Create easy-to-read tabs for returns and warranties and test that slips are quick to find.",
    aliases: "receipt organizer household filing paperwork",
    minutes: 20,
    preparation: "Choose a box that fits the place you will reach for receipts, such as a shelf near the paperwork tray. Stand an envelope inside and check the tallest receipt you expect to keep. For smaller slips, group by what you will look for later instead of creating a folder for every shop.",
    supplies: ["Envelopes", "Small cardboard box", "Scrap card", "Scissors", "Pen"],
    steps: [
      [
        "Check the fit",
        "Stand an envelope upright inside the box. Leave room above the opening so you can pull out a receipt without lifting the envelope.",
      ],
      [
        "Choose your labels",
        "Sort a small pile of receipts into groups that make sense for you, such as returns, warranties and household expenses.",
      ],
      [
        "Make visible tabs",
        "Cut strips of card a little taller than the envelopes. Label the tops and tuck one strip into each envelope behind the receipts.",
      ],
      [
        "Load and test",
        "Place the envelopes upright in the box with their openings facing up. Try finding a receipt by its tab and adjust any label that is hidden.",
      ],
    ],
    finish: "Pick a recent receipt and try putting it away and finding it again. If you have to lift three envelopes to read a tab, offset their positions or use taller labels. Set a regular time to review the returns and warranty pockets.",
    tip: "Photograph receipts you need to keep legible long term, since thermal print can fade.",
    related: ["set-up-a-household-paperwork-tray", "make-cardboard-drawer-dividers"],
  },
  {
    id: "make-a-felt-bookmark",
    category: "make-and-mend",
    title: "Make a stitched felt bookmark",
    description: "Make a thin felt bookmark with a hand-stitched border. Size it to the book, practise a running stitch and finish the thread so it stays flat.",
    minutes: 25,
    preparation: "Choose a single layer of thin felt so the book closes easily. Draw the outline on paper first and place it between the pages. If you want a top that sticks out, leave only enough to grip between your fingers.",
    supplies: ["Thin craft felt", "Ruler", "Pencil", "Scissors", "Needle and thread"],
    steps: [
      [
        "Mark the shape",
        "Draw a rectangle about 4 cm wide and 15 cm long on the felt. Check the length against the book you plan to use it in.",
      ],
      [
        "Cut a single layer",
        "Cut along the lines with sharp scissors. Round the corners slightly so they are less likely to catch on a page.",
      ],
      [
        "Stitch a border",
        "Knot the thread and make short, evenly spaced running stitches a few millimetres in from the edges. Pull just enough to flatten the thread.",
      ],
      [
        "Finish and test",
        "Knot the thread at the back and trim the tail. Place the bookmark between pages and check that the book closes comfortably.",
      ],
    ],
    finish: "Lay the bookmark flat to check for puckering, then close it in the book without pressing hard. Turn a few pages and look for thread loops that catch. Tuck away or retie any loose tails.",
    tip: "If the felt puckers, ease the last few stitches until the bookmark lies flat.",
    related: ["make-a-stitched-paper-notebook", "make-a-book-cover-from-a-paper-bag"],
  },
  {
    id: "mend-an-open-seam",
    category: "make-and-mend",
    title: "Mend a small open seam by hand",
    searchTitle: "How to Mend a Split Seam by Hand",
    description: "Mend a split seam on a woven garment by hand. Align the original stitch line and overlap the intact stitches with a short row of backstitch.",
    aliases: "repair torn clothing stitch seam backstitch",
    minutes: 25,
    preparation: "Check the split from the inside of the garment. This method works when the old stitches have broken and there is enough sound fabric on both sides to sew through. Match thread to the garment and remove only the loose threads that get in the way.",
    supplies: ["Needle", "Matching thread", "Scissors", "Sewing clips"],
    steps: [
      [
        "Inspect the split",
        "Turn the garment inside out and check that the fabric on both sides of the old stitch line is intact.",
      ],
      [
        "Line up the edges",
        "Match the original seam lines and clip the layers together. Start a few stitches before the opening so the new thread overlaps the intact seam.",
      ],
      [
        "Backstitch along the old line",
        "Take a small first stitch through both layers. Bring the needle up a stitch length ahead, then go back down through the hole at the end of the previous stitch. Repeat so the visible stitches meet end to end. Keep the tension even so the cloth does not gather.",
      ],
      [
        "Finish past the split",
        "Sew a few stitches into the intact seam at the far end, knot the thread on the inside and trim it. Gently pull across the repair to check for gaps.",
      ],
    ],
    finish: "Turn the garment right side out and look along the seam. Gently pull either side of the repair. The stitches should stay closed and the fabric should lie in the same line as the original seam.",
    tip: "If the cloth has ripped away from the seam, a small patch may be needed to give the stitches sound fabric to hold.",
    related: ["sew-on-a-shirt-button", "sew-a-box-cushion-cover"],
  },
  {
    id: "make-a-no-sew-t-shirt-tote",
    category: "make-and-mend",
    title: "Make a no-sew tote from a T-shirt",
    description: "Make a no-sew tote bag from an old T-shirt. Cut wide handles, tie the bottom fringe and check the knots before carrying light items.",
    aliases: "upcycle tee shirt bag tshirt",
    minutes: 35,
    preparation: "Choose a clean shirt with firm fabric and sound shoulder seams. Lay it flat and hold a light item against the body to judge the finished size. The knotted base will sit above the original hem, so allow for the length you will lose to the fringe.",
    supplies: ["Old T-shirt", "Fabric scissors", "Ruler", "Chalk"],
    steps: [
      [
        "Cut the handles",
        "Lay the shirt flat and cut off the sleeves just inside the seams. Enlarge the neck opening in a shallow scoop, keeping broad straps across both shoulders.",
      ],
      [
        "Mark the base",
        "Turn the shirt inside out. Cut away the bottom hem, then mark a line 7 cm above the new bottom edge.",
      ],
      [
        "Cut and tie the fringe",
        "Cut vertical strips about 2 cm wide through both layers up to the line. Tie each front strip to the matching back strip in a double knot.",
      ],
      [
        "Close gaps and test",
        "Tie loose tails from neighbouring knots together where you can see gaps. Turn the bag right side out and test it over a soft surface with a few light items.",
      ],
    ],
    finish: "Look at the base against the light and close any wide gaps before carrying anything. Put a light item inside and lift the tote just above a table to check that the shoulder seams and fringe knots stay firm.",
    tip: "If the fabric stretches sharply at a handle, use the tote for lighter items or start again with a sturdier shirt.",
    related: ["sew-lined-drawstring-storage-bag", "make-a-paper-gift-bag"],
  },
  {
    id: "make-seedling-labels",
    category: "growing",
    title: "Make reusable plant labels from yoghurt pots",
    description: "Cut reusable seedling labels from a clean yoghurt pot. Shape smooth markers and test that your writing stays readable after watering.",
    aliases: "garden markers plant tags yogurt pot seed tray",
    minutes: 15,
    preparation: "Pick a flexible plastic pot with a smooth side you can write on. Draw a strip roughly as wide as two lines of writing and long enough to leave the name above the soil. Make one sample before cutting the rest of the pot.",
    supplies: ["Clean flexible yoghurt pot", "Scissors", "Waterproof marker"],
    steps: [
      [
        "Prepare the pot",
        "Wash and dry the container. Pick one with flexible sides that cut without cracking.",
      ],
      [
        "Cut the strips",
        "Cut down the side to open the container, then trim away the rim and base. Cut strips wide enough to write on.",
      ],
      [
        "Round the corners",
        "Taper one end so it slides into potting mix. Round any sharp corners and discard strips with ragged edges.",
      ],
      [
        "Label and place",
        "Write the plant name and sowing date on the smooth face. Let the ink dry, then insert the label at the edge of the pot so it stays visible.",
      ],
    ],
    finish: "Write a test label and let it dry, then wet it briefly and rub it with a finger. Check the writing still reads clearly and that the strip pushes into damp potting mix without buckling.",
    tip: "Test the marker on a scrap first. If dried ink smears when damp, use a different marker.",
    related: ["pot-a-windowsill-herb", "sow-pea-shoots-in-a-tray"],
  },
  {
    id: "root-coleus-cuttings-in-water",
    category: "growing",
    title: "Root a coleus cutting in water",
    description: "Propagate coleus from a stem cutting in water. Cut below a leaf node, watch for roots and transfer the cutting to a small pot.",
    aliases: "coleus propagation grow cuttings water",
    minutes: 15,
    wait: "rooting time",
    preparation: "Set out a clean glass and choose a soft, healthy shoot without a flower spike. A node is the point where leaves join the stem. Pick a shoot with a lower node you can submerge while keeping the remaining leaves dry and above the rim.",
    supplies: ["Healthy coleus plant", "Clean scissors", "Small glass", "Small pot with drainage holes", "Potting mix"],
    steps: [
      [
        "Take a cutting",
        "Choose a healthy non-flowering stem and cut just below a leaf joint. Leave two or three pairs of leaves on the cutting.",
      ],
      [
        "Prepare the stem",
        "Remove the lowest leaves and place the bare joint under water in a clean glass. Keep the remaining leaves above the waterline.",
      ],
      [
        "Watch for roots",
        "Set the glass in bright, indirect light. Top it up to keep the joint submerged and replace the water if it becomes cloudy.",
      ],
      [
        "Move it to a pot",
        "Once several roots are a few centimetres long, plant the cutting in damp potting mix. Water it in and keep the mix lightly moist as it settles.",
      ],
    ],
    finish: "After potting, keep the mix lightly moist while the cutting adjusts. Check that the stem stays firm and look for a new pair of leaves. If the plant wilts, check both the soil moisture and whether direct sun is heating the pot before adding more water.",
    tip: "If the submerged stem turns soft, discard the cutting, wash the glass and try again with a fresh stem.",
    related: ["propagate-a-spider-plant", "make-seedling-labels"],
    sources: [
      { label: "Royal Horticultural Society guide to preparing softwood cuttings", href: "https://www.rhs.org.uk/propagation/softwood-cuttings" },
    ],
  },
  {
    id: "fix-a-sticking-wooden-drawer",
    category: "small-repairs",
    title: "Free a sticking wooden drawer",
    description: "Free a sticking drawer that slides on bare wooden runners. Find the rubbing point, clear grit and apply a thin layer of paraffin wax.",
    minutes: 15,
    preparation: "This method is for a drawer that slides directly on bare timber. Run the empty drawer gently and note whether it catches near the front, the back or one side. If it uses metal or plastic slides, check the slide mechanism and its care instructions instead.",
    supplies: ["Dry cloth", "Plain paraffin wax"],
    steps: [
      [
        "Empty and remove the drawer",
        "Use its normal removal method and set it on a stable surface.",
      ],
      [
        "Check the runners",
        "Wipe away grit and look for a raised screw or split runner before adding wax.",
      ],
      [
        "Wax the bare contact points",
        "Rub the wax block lightly along the polished areas where wood slides against wood. Start with a thin coat on the runners and matching surfaces underneath the drawer, then wipe away flakes so they cannot collect grit.",
      ],
      [
        "Refit and test",
        "Slide the drawer in and out several times and wipe off loose wax.",
      ],
    ],
    finish: "Pull the drawer out with one hand in the middle of the handle and close it again. It should move evenly without needing a shove. If it still catches in the same place, look for a fresh shiny rub mark and work out whether a runner or a drawer joint has moved.",
    tip: "If the wood has swollen after a spill, let it dry fully before testing again.",
    related: ["replace-a-drawer-runner-screw", "rebuild-a-loose-wooden-drawer-joint"],
  },
  {
    id: "replace-a-drawer-runner-screw",
    category: "small-repairs",
    title: "Replace a missing drawer runner screw",
    description: "Replace a missing drawer slide screw. Match the original fixing, seat the head flush and test the empty drawer for scraping or misalignment.",
    aliases: "drawer slide rail track missing screw",
    minutes: 20,
    preparation: "Pull the empty drawer halfway out and look for a rail that lifts or shifts at a fixing point. This repair assumes the runner is straight and the original screw hole still grips. Check how the drawer releases and photograph the slot or hole used by the original screw.",
    supplies: ["Matching screwdriver", "Replacement screw matching the original"],
    steps: [
      [
        "Remove the empty drawer",
        "Follow the drawer’s release method to expose the cabinet runner.",
      ],
      [
        "Identify the screw",
        "Compare with an intact fixing in the same runner and match its head, length and thread.",
      ],
      [
        "Seat the replacement screw",
        "Hold the runner in its original position against the cabinet. Start the matching screw by hand in the original hole and tighten gently until the runner stops moving. If the screw does not start cleanly, check the thread and position before forcing it.",
      ],
      [
        "Check clearance",
        "Make sure the screw head sits flush, then refit the drawer and test it empty.",
      ],
    ],
    finish: "Run the empty drawer fully in and out. The replacement head should clear the moving parts without clicking or scraping. Close it slowly to check that both sides stop at the same point, then add a few light items and test again.",
    tip: "If the screw spins or the cabinet around the hole is crumbling, the fixing needs repair before the drawer goes back into use.",
    related: ["tighten-a-loose-drawer-front", "fix-a-sticking-wooden-drawer"],
  },
  {
    id: "replace-a-cabinet-shelf-peg",
    category: "small-repairs",
    title: "Replace a missing cabinet shelf peg",
    description: "Replace a missing shelf support pin in a cabinet. Match the shaft and support shape, align all four pegs and check for rocking.",
    aliases: "shelf support pin clip adjustable cabinet shelf",
    minutes: 10,
    preparation: "Check whether the shelf rests on plain pins or uses locking clips. Take one intact support out for comparison. Measure the shaft that goes into the cabinet, and check the shoulder height and shape where the shelf rests. Similar-looking pins can leave the shelf sitting unevenly.",
    supplies: ["Matching shelf peg", "Ruler"],
    steps: [
      [
        "Unload the shelf",
        "Take everything off, then lift the shelf clear of the supports.",
      ],
      [
        "Match the peg",
        "Compare the shaft diameter, insertion depth and shelf support shape with an intact peg.",
      ],
      [
        "Set all four supports level",
        "Count holes from the same reference point on both sides and seat the replacement fully.",
      ],
      [
        "Check for rocking",
        "Lower the empty shelf onto the pegs and press each corner lightly before putting items back.",
      ],
    ],
    finish: "Look from the front to see that the shelf is horizontal. Press lightly at each corner and watch the supports from underneath if possible. Each support should stay seated before you return a light, even load within the cabinet’s stated limit.",
    tip: "If a peg wobbles in its hole, check for damage to the cabinet side before loading the shelf.",
    related: ["make-a-cupboard-shelf-liner", "reattach-loose-laminate-edging"],
  },
  {
    id: "reattach-loose-laminate-edging",
    category: "small-repairs",
    title: "Reattach loose laminate edging",
    description: "Reattach a short strip of loose laminate edging. Check the board, choose a compatible adhesive and hold the strip flat while it cures.",
    aliases: "edge banding peeling shelf trim",
    minutes: 20,
    wait: "curing time",
    preparation: "Try this on a short lifted section that can still be pressed flat without force. Look for swollen board, a missing chip or crumbling material underneath. Choose an adhesive that names both the edge material and the board on its label, and check its instructions for open time, pressure and ventilation.",
    supplies: ["Adhesive labelled for both surfaces", "Scrap card", "Masking tape", "Cloth"],
    steps: [
      [
        "Dry-fit the loose strip",
        "Press the loose section back into place. Check that the ends line up and remove only loose material that stops it sitting flat. Wipe away dust and let the surfaces dry before applying anything.",
      ],
      [
        "Apply the adhesive",
        "Follow the label for application and ventilation. Use scrap card to protect the surrounding finish.",
      ],
      [
        "Hold the edge flat",
        "Press it into alignment and use masking tape to hold it if the adhesive instructions allow. Remove squeeze-out as directed on the label.",
      ],
      [
        "Let it cure",
        "Wait the full curing time before pulling away the tape and checking the bond.",
      ],
    ],
    finish: "After curing, look along the edge from both ends. It should sit flush without a raised lip that catches a cloth. Clean the repaired area using the adhesive maker’s directions and keep it dry while the bond is setting.",
    tip: "If the board beneath has swollen, the strip may no longer sit flat even with fresh adhesive.",
    related: ["make-a-cupboard-shelf-liner", "replace-a-cabinet-shelf-peg"],
  },
  {
    id: "fix-a-loose-broom-head",
    category: "small-repairs",
    title: "Refit a loose screw-on broom head",
    description: "Refit a screw-on broom head that keeps coming loose. Clean and inspect both threads, start the handle squarely and test with short strokes.",
    minutes: 10,
    preparation: "Check that the head screws onto the handle. Push-fit and clip-on heads use different fixings. Set the broom on a stable surface and look for cracks around the socket. If the head came loose after a fall, inspect the handle end as well.",
    supplies: ["Dry cloth", "Soft brush"],
    steps: [
      [
        "Unscrew the head",
        "Hold the broom head steady and turn the handle gently until it comes free.",
      ],
      [
        "Check both threads",
        "Brush away grit and look for cracks or flattened threads on the handle and socket.",
      ],
      [
        "Start the thread squarely",
        "Line up the handle with the socket. Turn it backwards until the threads settle, then screw it in by hand.",
      ],
      [
        "Test with a few strokes",
        "Sweep gently and check that the head stays firm without twisting.",
      ],
    ],
    finish: "Hold the broom low and make a few short strokes. The head should stay lined up with the handle and should not turn when you change direction. If it comes loose again, compare the old handle and socket before buying a replacement.",
    tip: "If the handle still rocks when fully seated, match the damaged part with a compatible replacement.",
    related: ["replace-a-door-stop-tip", "reattach-loose-laminate-edging"],
  },
  {
    id: "replace-a-door-stop-tip",
    category: "small-repairs",
    title: "Replace a worn rubber doorstop tip",
    description: "Replace the push-on rubber cap on a fixed doorstop. Match the cap to the fitting and check that the door handle clears the wall.",
    aliases: "door stop cap rubber bumper tip replacement",
    minutes: 10,
    preparation: "Check that the stop body is solid and the old tip is a separate push-on cap. Measure the diameter of the exposed fitting after the cap is off. Match the depth as well, so the new rubber reaches the end and cannot slide sideways.",
    supplies: ["Matching push-on rubber tip", "Cloth", "Ruler"],
    steps: [
      [
        "Identify the fitting",
        "Check that the tip pulls off and that the stop itself is firmly mounted.",
      ],
      [
        "Measure the end",
        "Pull off the old tip and measure the exposed end. Match the new tip’s opening and depth to it.",
      ],
      [
        "Clean and fit",
        "Wipe the end dry and push on the replacement until it seats fully.",
      ],
      [
        "Check the contact point",
        "Open the door slowly and confirm that the rubber touches first and the door handle clears the wall.",
      ],
    ],
    finish: "Open the door slowly from several starting positions. The rubber should meet the door squarely before the handle can touch the wall. Check that the cap stays seated when you close the door again.",
    tip: "If the new tip slips off with a light tug, check the inside diameter and try a closer fit.",
    related: ["fix-a-squeaky-door-hinge", "replace-a-cupboard-door-bumper"],
  },
  {
    id: "replace-a-bath-plug-chain",
    category: "small-repairs",
    title: "Replace a broken bath plug chain",
    description: "Fit a replacement bath plug chain to the existing plug and anchor. Set the length, close the end rings and test with a little water.",
    minutes: 15,
    preparation: "This guide uses the existing eye on a removable plug and an anchor already fitted to the bath. Check both are sound and measure the old chain if you have it. Pick a chain whose end rings fit through both eyes and which has enough slack for the plug to sit flat.",
    supplies: ["Bath plug chain with end rings", "Small pliers", "Tape measure", "Towel"],
    steps: [
      [
        "Cover the drain",
        "Lay a towel over the drain while removing the old rings so small pieces stay out of the opening.",
      ],
      [
        "Check the length",
        "With the plug seated, measure from its eye to the chain anchor. Leave enough slack for the plug to sit flat.",
      ],
      [
        "Attach the end rings",
        "Follow the ring design. Ease a split ring around the eye as you would a key ring, or use pliers to open and close an open link. Check the joined ends line up and have no sharp gap.",
      ],
      [
        "Test with shallow water",
        "Remove the towel, seat the plug and add a little water. Lift it with the chain and check that the rings hold.",
      ],
    ],
    finish: "With a little water in the bath, leave the plug seated for a moment and look for steady draining. Lift the plug by the chain and check that neither ring opens. Let the chain lie in the bath without pulling the plug off centre.",
    tip: "If water drains while the plug is seated, check the plug’s fit and seal separately from the chain.",
    related: ["replace-a-door-stop-tip", "make-a-cupboard-shelf-liner"],
  },
  {
    id: "replace-a-missing-picture-frame-tab",
    category: "small-repairs",
    title: "Replace a missing picture frame backing tab",
    description: "Replace a screw-in turn button on a small picture frame. Choose a short screw and check that the tab holds the backing board flat.",
    aliases: "picture frame backing clip swivel turn button",
    minutes: 20,
    preparation: "Take the frame down and look at how the intact tabs retain the back. This guide covers a small wooden frame with screw-in tabs that rotate. Check the frame is sound and choose a tab with the same reach, so it overlaps the backing without touching the picture.",
    supplies: ["Matching turn button and short screw", "Matching screwdriver", "Soft towel"],
    steps: [
      [
        "Lay the frame flat",
        "Place it face down on a towel on a stable table. Check that the glazing and frame are intact.",
      ],
      [
        "Match the tab and screw",
        "Compare with an existing tab. Check that the replacement screw cannot reach the front of the frame.",
      ],
      [
        "Fit the replacement",
        "Use the existing hole if it is sound. Tighten the screw just enough to hold the tab while allowing it to turn.",
      ],
      [
        "Secure the backing",
        "Swing the tab over the backing board and check that all tabs hold it flat before lifting the frame.",
      ],
    ],
    finish: "With the frame still flat, turn every tab over the backing. Lift the frame a few centimetres over the towel and tilt it slightly. The backing and picture should stay in place. Check the hanging hardware separately before returning the frame to the wall.",
    tip: "If the frame is split at the old screw hole, repair or replace the frame before rehanging it.",
    related: ["make-a-book-cover-from-a-paper-bag", "build-a-tabletop-display-stand"],
  },
  {
    id: "refit-a-loose-luggage-zip-pull",
    category: "small-repairs",
    title: "Replace a missing zip pull on a bag",
    searchTitle: "How to Replace a Missing Bag or Luggage Zip Pull",
    description: "Replace a missing zip pull on a bag or suitcase. Check the slider, fit a compatible clip-on pull and test it around the corners.",
    aliases: "luggage zipper tab replacement bag zipper slider",
    minutes: 10,
    preparation: "Empty the compartment and inspect the slider. If the metal loop for the pull is broken or the teeth split apart behind the slider, identify that fault first. A clip-on tab is a simple option when the slider closes the zip properly and the loop is still intact.",
    supplies: ["Small replacement zip pull with a clip", "Cloth"],
    steps: [
      [
        "Check the slider",
        "Hold the slider body and move it a short way. Confirm that the teeth mesh and the pull attachment loop is intact.",
      ],
      [
        "Choose a pull that fits",
        "Match the clip to the opening in the slider loop and check it can move freely.",
      ],
      [
        "Clip it in",
        "Open the clip, pass it through the loop and close it completely.",
      ],
      [
        "Test both directions",
        "Wipe away any grit with the cloth, then open and close the bag slowly while holding the fabric clear.",
      ],
    ],
    finish: "Try pulling along the line of the zip instead of upwards. The new tab should turn freely and stay closed at the clip. Run the slider through any corners while the bag is empty to check the tab clears the fabric.",
    tip: "If the teeth separate behind the slider, the slider or zip needs attention beyond replacing the pull.",
    related: ["mend-an-open-seam", "sew-lined-drawstring-storage-bag"],
  },
  {
    id: "patch-a-small-hole-in-insect-mesh",
    category: "small-repairs",
    title: "Patch a small hole in an insect screen",
    description: "Patch a small tear in a window insect screen. Match the repair kit to the mesh and check for gaps before refitting the screen.",
    aliases: "repair torn fly screen bug mesh window screen",
    minutes: 20,
    preparation: "Hold the screen against the light and inspect the area around the hole. A patch needs sound mesh on every side to grip. Check the mesh material and choose a kit for it. Take the screen down from inside if that is needed to reach the damaged spot safely.",
    supplies: ["Mesh repair patch suitable for the screen", "Scissors", "Cloth", "Ruler"],
    steps: [
      [
        "Check the surrounding mesh",
        "Make sure the fabric around the tear is firm and the screen still fits its frame.",
      ],
      [
        "Clean the patch area",
        "Wipe away dust and let the mesh dry. Work on a safely accessible screen or remove it using its normal release method.",
      ],
      [
        "Apply a patch with overlap",
        "Cut the patch so it reaches sound mesh on every side by the amount the kit specifies. Lay the screen on a flat surface or support the mesh from behind. Align the weave if possible, then press the repair down evenly so the corners do not lift.",
      ],
      [
        "Inspect the edges",
        "Hold the screen up to the light and check for gaps or corners that lift before refitting it.",
      ],
    ],
    finish: "Look along all edges of the patch in bright light. It should cover the tear completely, with no lifted corners or gaps. Refit the screen and check it can still be removed normally from inside.",
    tip: "If the mesh breaks as you press the patch on, replace the mesh rather than adding more patches.",
    related: ["make-a-removable-window-insect-screen", "clean-a-window-track"],
  },
  {
    id: "build-a-desktop-monitor-riser",
    category: "advanced-projects",
    title: "Build a wooden monitor riser",
    description: "Build a wooden monitor riser with a keyboard opening and a rear brace. Size the platform to your monitor, work from a cut list and test it under load.",
    minutes: [120, 180],
    wait: "curing time",
    preparation: "Measure the monitor’s stand and note its weight. Decide on the height while sitting normally at the desk, and check that the cables will reach without bending sharply. Use flat stock that can support the load across the planned span. Clamp work to a stable bench when sawing or drilling and follow the tool manual for eye protection and dust control.",
    supplies: ["Flat timber or plywood", "Tape measure, pencil and square", "Saw, clamps and eye protection", "Drill, wood screws and wood glue", "Sandpaper and scrap backing wood"],
    steps: [
      [
        "Measure the stand and keyboard",
        "Measure the full footprint of the monitor base. Mark the width and depth on paper to check its fit on the desk. The opening between the end panels must clear the keyboard and your fingers. Leave room behind the platform for the connector plugs.",
      ],
      [
        "Make a cut list",
        "For example, a 500 × 240 mm top with two 90 × 240 mm ends made from 18 mm stock gives a 464 mm clear opening if the ends sit flush under the top. Cut the rear brace to fit that opening after a dry fit. Adjust these dimensions to suit your equipment.",
      ],
      [
        "Join the frame and fit the brace",
        "Dry-fit the end panels under the top and mark their centre lines. Clamp them square, drill pilot holes and glue and screw the joints. Use fixings suited to the stock and keep them clear of exposed faces. Set the brace near the back between the panels, leaving the keyboard opening clear.",
      ],
      [
        "Check the frame for twist",
        "Set the riser on a flat bench before the glue sets. Press opposite corners lightly and compare the end panels with a square. Correct any movement or twist while the joints can still be adjusted.",
      ],
      [
        "Test before use",
        "Let the glue cure, sand sharp edges and check for rocking or flex with a stable test load before placing the monitor.",
      ],
    ],
    finish: "Let the glue cure fully and test the riser on the desk with a stable load similar to the monitor’s weight. The feet should sit flat, the top should stay level and the brace should prevent sideways movement. Centre the monitor base with clearance on every side once the riser passes those checks.",
    tip: "If the top flexes under load, shorten the span or use thicker stock before putting equipment on it.",
    related: ["build-a-tabletop-display-stand", "make-a-freestanding-pegboard-organiser"],
    sources: [
      { label: "Bosch DIY guidance on safe sawing, drilling and workholding", href: "https://www.bosch-diy.com/gb/en/all-about-diy/safety-precautions" },
    ],
  },
  {
    id: "build-a-freestanding-book-crate",
    category: "advanced-projects",
    title: "Build a wooden book crate",
    description: "Build a low plywood book crate with a square base and reinforced corners. Use the worked cut-list example to size it for your own books.",
    minutes: [180, 240],
    wait: "curing time",
    preparation: "Lay out the books as they will sit in the crate. Allow a little space to grip each book at the top. Pick the storage spot and check the crate will fit through any shelf opening before cutting. Have the panels cut to size if you cannot support sheet material securely while sawing.",
    supplies: ["Flat plywood and four timber corner blocks", "Tape measure, pencil and square", "Saw, drill, clamps and eye protection", "Wood glue and short wood screws", "Sandpaper"],
    steps: [
      [
        "Sketch the inside dimensions",
        "Measure the row of books and add space for your hands and the corner blocks. A 360 × 240 mm inside footprint with 15 mm panels needs a 390 × 270 mm base if it sits under the sides.",
      ],
      [
        "Cut and label the panels",
        "For that footprint, cut two 390 mm long sides and two 240 mm ends that sit between them. Cut all four to the same height, such as 190 mm. Label the bottom edges and dry-fit them around the base.",
      ],
      [
        "Assemble the four sides",
        "Glue and screw the sides to timber blocks inside the corners. Drill pilot holes and check the screws will stay within the wood. Clamp the frame on a flat surface and compare the diagonals before tightening.",
      ],
      [
        "Attach the base",
        "Turn the frame upside down and line up the base with all four sides. Drill through the base into the corner blocks, then glue and screw it in place. Wipe away squeeze-out before it sets.",
      ],
      [
        "Sand and test the crate",
        "Once the glue is cured, ease sharp corners with sandpaper and check for screw points. Put the crate on the floor and add a few books at a time.",
      ],
    ],
    finish: "Set the crate on a level floor and add books in stages, spreading the weight across the base. Check that the base stays flat and each corner remains closed. Feel the inside edges for snags before putting away the books you use most.",
    tip: "Carry a heavy crate empty and load it in place.",
    related: ["build-a-wooden-tool-tote", "make-a-linen-shelf-inventory"],
    sources: [
      { label: "Bosch DIY guidance on safe sawing, drilling and workholding", href: "https://www.bosch-diy.com/gb/en/all-about-diy/safety-precautions" },
    ],
  },
  {
    id: "make-a-removable-window-insect-screen",
    category: "advanced-projects",
    title: "Make a removable window insect screen",
    description: "Make a removable insect screen with an aluminium frame kit, mesh and spline. Measure the window, square the frame and tension the mesh evenly.",
    aliases: "fly screen window mesh spline window screen kit",
    minutes: 180,
    preparation: "Identify where the frame will sit and how the kit holds it in place. Measure from indoors, with both feet on the floor. Pick an opening the kit is designed for. Leave windows used for emergency escape clear of anything that could delay opening them.",
    supplies: ["Screen frame kit with corners and clips", "Insect mesh, spline and spline roller", "Tape measure and square", "Saw or cutting tool specified by the kit", "File and mesh-trimming tool if required"],
    steps: [
      [
        "Measure the opening at three points",
        "Measure width at the top, middle and bottom, then height on both sides and in the middle. Use the kit’s instructions for deciding the finished frame size and clip clearance. Note which side will face indoors.",
      ],
      [
        "Cut and dry-fit the rails",
        "Allow for how far each corner connector enters the rail. Mark and cut opposite rails as matched pairs. Smooth any burrs, assemble the rectangle on a bench and measure both diagonals before fitting the mesh.",
      ],
      [
        "Roll the spline into place",
        "Spline is the flexible cord that locks the mesh into the groove. Lay the mesh flat with excess on all sides and roll the spline into one side. Move to the opposite side, then finish the ends. Smooth wrinkles as you go without pulling the rails inward.",
      ],
      [
        "Inspect before trimming",
        "Sight along all four rails to check for bowing. If the mesh is skewed, lift the spline on the affected edge and reseat it while there is still spare mesh to hold.",
      ],
      [
        "Trim and check",
        "Trim the spare mesh according to the kit instructions. Fit the screen and check for gaps around the edges.",
      ],
    ],
    finish: "Look around the fitted frame in daylight. The screen should sit flat with no light gaps along the edges. Open and close the sash and practise taking the screen out from inside. Refit it only if the clips hold securely and the sash has its full travel.",
    tip: "If the rails bow inward, lift and reseat the spline with less tension. Keep any required escape opening usable.",
    related: ["patch-a-small-hole-in-insect-mesh", "clean-a-window-track"],
  },
  {
    id: "reupholster-a-drop-in-chair-seat",
    category: "advanced-projects",
    title: "Reupholster a drop-in chair seat",
    searchTitle: "How to Reupholster a Removable Dining Chair Seat",
    description: "Recover a removable dining chair seat with fresh fabric. Use the old cover as a pattern, staple opposite sides and refit the seat securely.",
    minutes: [120, 180],
    preparation: "Turn the chair over on a protected surface and confirm that the seat comes away as a single piece. This method keeps the existing sound base and padding. Check that the frame, seat board and fixing holes are firm before buying fabric. Photograph how the existing fabric folds at each corner.",
    supplies: ["Upholstery fabric", "Staple remover and stapler", "Suitable short staples", "Scissors and screwdriver"],
    steps: [
      [
        "Remove the seat and old cover",
        "Label the front edge on the underside and set the mounting screws aside. Lift the staples with a remover and take off the old cover. Keep it in one piece to use as a template. Check the seat board and padding before continuing.",
      ],
      [
        "Align and cut the new cover",
        "Lay the fabric face down and centre the old cover over it. Check that the pattern runs straight across the front. Leave enough wrap at each edge to reach the staple line with the fabric held snug.",
      ],
      [
        "Staple from the centre out",
        "Staple the middle of the front edge first, then the back. Repeat on the two sides. Work out from each centre towards the corners, alternating sides and checking the face often to keep the fabric even.",
      ],
      [
        "Fold the corners and clear the fixings",
        "Fold each corner in the same direction and check the visible folds before stapling. Trim bulky excess a little at a time. Keep fabric and staples clear of the mounting holes and any edges that sit in the chair frame.",
      ],
      [
        "Refit the seat",
        "Trim surplus fabric clear of the mounting holes. Reattach the seat with its original fixings and check it cannot shift.",
      ],
    ],
    finish: "Set the chair on a level floor and press the seat near each corner. It should stay firmly attached without creaking or lifting. Check the fabric for loose staples, sharp points or folds that interfere with the chair frame.",
    tip: "Test staple length on a scrap or hidden area first. The staple legs need to stay within the seat base.",
    related: ["replace-chair-felt-pads", "sew-a-box-cushion-cover"],
  },
  {
    id: "build-a-tabletop-display-stand",
    category: "advanced-projects",
    title: "Build a tabletop display stand",
    description: "Build a braced two-tier display stand for lightweight objects. Plan shelf heights, mark matching side supports and check stability before use.",
    minutes: 180,
    preparation: "Lay out the lightweight items you want to display and measure their footprint and height. Sketch the two tiers from the side so you can see where the load sits over the feet. Use a broad base and enough clear space behind the stand so it stays away from the table edge.",
    supplies: ["Flat plywood or straight timber", "Timber shelf cleats and rear brace", "Tape measure, pencil and square", "Saw, drill, screws and eye protection", "Clamps and sandpaper"],
    steps: [
      [
        "Draw a side view with both tiers",
        "For example, start a sketch with two 110 mm deep shelves and a 280 mm deep base. Draw the upper shelf towards the back so both tiers are easy to reach. Adjust for your objects and leave enough side support underneath each shelf.",
      ],
      [
        "Cut the shelves and matching supports",
        "Mark both shelf heights on one side panel, then transfer the lines to the matching panel. Cut shelves to the inside width. Cut cleats to support their ends and dry-fit all parts on a flat bench.",
      ],
      [
        "Fit the cleats and shelves",
        "Screw the cleats to the inner faces through pilot holes. Place the shelves on top, check they are level and fasten them down with screws short enough to stay inside the material.",
      ],
      [
        "Brace the back",
        "Fit a rear brace between the side panels while the frame is clamped square. Sit the stand flat and check for twist before sanding the corners.",
      ],
      [
        "Test the stand",
        "Place it away from the table edge and load the lower tier first. Check that it stays stable when items are removed from either tier.",
      ],
    ],
    finish: "Test with the intended lightweight items, placing them low and close to the centre first. Remove an item from either tier and check for movement. If the stand rocks on a flat table or leans when items are removed, correct the support before using it.",
    tip: "If the stand tips when you press lightly on the upper tier, widen the base before using it.",
    related: ["build-a-desktop-monitor-riser", "make-a-freestanding-pegboard-organiser"],
    sources: [
      { label: "Bosch DIY guidance on safe sawing, drilling and workholding", href: "https://www.bosch-diy.com/gb/en/all-about-diy/safety-precautions" },
    ],
  },
  {
    id: "build-a-boot-tray-rack",
    category: "advanced-projects",
    title: "Build a slatted rack for a boot tray",
    description: "Build a removable wooden boot tray insert. Measure the tray at its base, space slats for drainage and fasten them to low support rails.",
    minutes: [120, 180],
    preparation: "Measure the tray at the narrowest point near its base. A tapered tray can be several centimetres wider at the rim. Check the narrowest heel you plan to put on the rack and choose a slat spacing that supports it. This is an insert for storing boots after you take them off.",
    supplies: ["Boot tray", "Untreated durable timber slats", "Saw and sandpaper", "Corrosion-resistant screws", "Drill and clamps"],
    steps: [
      [
        "Measure at the base",
        "Measure the length and width inside the tray bottom. Subtract a little clearance on every side so you can lift the finished rack straight out, even if the tray sides taper.",
      ],
      [
        "Lay out the rails and slats",
        "Cut low rails to fit across the tray and slats to run along its length. Arrange them dry and use identical spacers between slats. Fit a centre rail if a long span flexes, and test the spacing with the smallest boot heel.",
      ],
      [
        "Drill and fasten the slats",
        "Clamp each slat across the rails and drill pilot holes at the crossings. Choose corrosion-resistant screws that grip the rails without protruding underneath. Start with the two outer slats and then fill in the centre using the spacers.",
      ],
      [
        "Test in the tray",
        "Sand the edges, set the rack in the tray and check it sits flat. Lift it out after use so both parts can dry.",
      ],
    ],
    finish: "Place a wet pair of boots on the rack and check that water drains into the tray without pooling between slats. Lift the rack out without tipping the tray. Check the underside for projecting screw points and let both parts dry before replacing the insert.",
    tip: "If a narrow heel catches between slats, reduce the spacing before using the rack.",
    related: ["build-a-container-planter-box", "make-a-cupboard-shelf-liner"],
    sources: [
      { label: "Bosch DIY guidance on safe sawing, drilling and workholding", href: "https://www.bosch-diy.com/gb/en/all-about-diy/safety-precautions" },
    ],
  },
  {
    id: "build-a-container-planter-box",
    category: "advanced-projects",
    title: "Build a timber planter box for nursery pots",
    description: "Build a timber planter cover around nursery pots and a drip tray. Size the panels, support the base and check the fit with the pots in place.",
    minutes: [180, 240],
    preparation: "Measure the pots together with their tray before choosing the timber. Include the extra weight of wet compost when planning the base and where the box will sit. Choose a level surface and exterior-suitable materials if it will be exposed to weather. This design holds separate pots that lift out for watering and maintenance.",
    supplies: ["Exterior-suitable timber for sides, base slats, rails and feet", "Pots and drip tray", "Tape measure, pencil and square", "Saw, drill, clamps and eye protection", "Exterior screws"],
    steps: [
      [
        "Measure around the drip tray",
        "Arrange the pots in their tray. Measure its widest points and add room to grip the pot rims. Work out the wall height so the tray is hidden and each pot can still be lifted out. Draw where the end panels meet the long sides.",
      ],
      [
        "Cut the side panels",
        "Cut two matching long sides and two matching ends. If the ends fit between the long sides, make each end the desired inside width. Dry-fit the sides around the tray, then clamp and fasten them through pilot holes.",
      ],
      [
        "Support the base on rails",
        "Attach support rails to the inside of the long walls, keeping both at the same height. Cut the base slats to span between the walls and fasten them to both rails. Space them so the drip tray sits evenly across several slats.",
      ],
      [
        "Raise the timber off the ground",
        "Fit low, equal-height feet under the support points. Check that the empty box does not rock and that the slats have room to air-dry if they get wet.",
      ],
      [
        "Check under load",
        "Place the empty box on a level surface, add the tray and pots, then check for movement. Lift the pots out before moving the box.",
      ],
    ],
    finish: "Load the pots one at a time while the planter is already in position. The base should stay flat and the box should sit level without twisting. Check that you can remove every pot and the tray without catching on the sides.",
    tip: "Empty the drip tray after watering so the pots do not sit in standing water.",
    related: ["pot-a-windowsill-herb", "make-a-freestanding-pot-trellis"],
    sources: [
      { label: "Bosch DIY guidance on safe sawing, drilling and workholding", href: "https://www.bosch-diy.com/gb/en/all-about-diy/safety-precautions" },
    ],
  },
  {
    id: "make-a-freestanding-pot-trellis",
    category: "advanced-projects",
    title: "Make a freestanding trellis for a large pot",
    description: "Build a timber trellis sized to a large pot. Match the stakes to the pot, brace the crosspieces and tie in a lightweight climbing plant.",
    minutes: [120, 180],
    preparation: "Pick a broad pot and a light climbing plant that suits a small support. Sketch how far the stakes go into the pot and how high the frame will stand above it. A tall frame has more leverage in the wind, so start low and use a sheltered spot.",
    supplies: ["Timber stakes, crosspieces and diagonal brace", "Tape measure and square", "Saw, drill, clamps and eye protection", "Exterior screws", "Soft plant ties"],
    steps: [
      [
        "Set the stake spacing and depth",
        "Measure inside the rim at the points where the stakes will stand. Check the available depth and mark an insertion line on both stakes. If you are planting a new pot, position the stakes before the root ball goes in.",
      ],
      [
        "Lay out the frame",
        "Lay the stakes parallel on a flat bench at the measured spacing. Cut equal crosspieces to span them. Use a square to mark each joint and leave the lower parts of both stakes free for the potting mix.",
      ],
      [
        "Fasten and brace",
        "Clamp and drill pilot holes before adding exterior screws. Fit a diagonal brace across the back of the frame to stop it shifting sideways. Check for projecting screws or splinters before moving it.",
      ],
      [
        "Set and train",
        "Insert the stakes deeply without forcing them through roots. Guide the plant with loose ties and check the frame stays upright.",
      ],
    ],
    finish: "Lightly nudge the top of the trellis and check that the stakes, frame and pot return to an upright position without rocking. Make sure the first ties are loose enough for stems to thicken. Check the stability again as foliage fills the frame.",
    tip: "If the pot rocks or the frame catches the wind, reduce the height or move it to a sheltered spot.",
    related: ["build-a-container-planter-box", "make-seedling-labels"],
    sources: [
      { label: "Bosch DIY guidance on safe sawing, drilling and workholding", href: "https://www.bosch-diy.com/gb/en/all-about-diy/safety-precautions" },
    ],
  },
  {
    id: "sew-a-box-cushion-cover",
    category: "advanced-projects",
    title: "Sew a removable box cushion cover",
    description: "Sew a fitted box cushion cover with a side band and an envelope opening. Draft a pattern from the foam dimensions and align all four corners.",
    minutes: [180, 240],
    preparation: "Measure the insert without compressing it and record its length, width and thickness. Pre-wash the fabric only if its care instructions allow it, then press it flat. Mark the grain and the direction of any pattern. Choose a seam allowance you can repeat on all panels.",
    supplies: ["Woven furnishing fabric", "Sewing machine and thread", "Tape measure and fabric scissors", "Clips or pins"],
    steps: [
      [
        "Draft the panels from the insert",
        "For a 45 × 40 × 5 cm insert and 1 cm seams, cut a 47 × 42 cm top and a 7 cm wide band. The band needs 170 cm of finished length around the cushion, plus allowance for the joining seam. Piece shorter strips if needed and keep joins away from corners.",
      ],
      [
        "Make the overlapping underside",
        "Cut two panels across the width of the cover. Allow enough depth for their hemmed edges to overlap by several centimetres. Hem the opening edges, then pin the two pieces together and adjust the overlap until the outside edges match the top panel. Baste the overlap at the ends.",
      ],
      [
        "Sew the band to the top",
        "Join the band into a loop. Mark the four corner positions along the seam line and match them to the top panel. Sew with right sides together, pivoting at each corner with the needle down. Clip into the band’s seam allowance at the corners if it needs help turning, keeping clear of the stitch line.",
      ],
      [
        "Sew on the underside",
        "Match the four corners with the band and keep the overlap flat. Stitch all the way around the outside edge. Trim bulky allowances where needed and turn through the opening.",
      ],
      [
        "Turn and fit",
        "Turn through the overlap and insert the cushion. Work the corners into place and check the opening stays closed under light pressure.",
      ],
    ],
    finish: "Put the cushion on its seat and press lightly in the centre and at each corner. The side band should sit straight, the corners should be filled and the overlap should stay closed. Trim loose threads and check that the insert comes out through the opening without stretching a seam.",
    tip: "If the band bunches at a corner, check that the corner marks align before adjusting the seam.",
    related: ["make-a-removable-bench-cushion", "mend-an-open-seam"],
  },
  {
    id: "sew-lined-drawstring-storage-bag",
    category: "advanced-projects",
    title: "Sew a lined drawstring storage bag",
    description: "Sew a lined drawstring storage bag with a buttonhole casing. Cut matching panels, join the lining and thread the cord through the finished rim.",
    minutes: [120, 180],
    preparation: "Measure the items you plan to store and allow room to get a hand into the open bag. Pick an outer fabric and lining that can be washed together. Test a buttonhole on folded scrap from the outer fabric and check that the chosen cord slides through it.",
    supplies: ["Outer fabric and lining", "Sewing machine and thread", "Scissors and pins", "Cord and safety pin"],
    steps: [
      [
        "Cut four matching rectangles",
        "For a bag about 24 cm wide and 32 cm tall, cut two outer and two lining pieces 26 × 34 cm using 1 cm seams. Adjust the height to leave space above the contents for the drawstring channel.",
      ],
      [
        "Make the cord opening and sew both bags",
        "Mark a short buttonhole on one outer panel within the planned casing, below the 1 cm rim seam allowance. Finish and open the buttonhole before sewing the panels. Sew each pair right sides together along the sides and bottom, leaving a hand-width turning gap in the lining.",
      ],
      [
        "Join the outer bag and lining",
        "Turn the outer bag right side out and slide it inside the lining so the right sides touch. Match the side seams and stitch around the rim. Turn through the lining gap, stitch it shut and tuck the lining inside.",
      ],
      [
        "Stitch the casing",
        "Press the rim flat. Sew around the bag just below the buttonhole, catching both layers and keeping the mouth open. The rim seam forms the top of the channel. Measure the full rim circumference and cut a cord long enough to go around it with ends to tie.",
      ],
      [
        "Thread and test",
        "Feed the cord through with a safety pin. Knot the ends together and test that the bag opens fully and gathers smoothly.",
      ],
    ],
    finish: "Pull the cord until the mouth gathers and then open the bag fully. The casing should stay flat and the lining should stay seated as you remove the contents. Check the cord ends cannot slip through the buttonhole.",
    tip: "Keep bags with long drawstrings out of reach of young children.",
    related: ["make-a-no-sew-t-shirt-tote", "sew-a-box-cushion-cover"],
  },
  {
    id: "make-a-removable-bench-cushion",
    category: "advanced-projects",
    title: "Make a removable bench cushion",
    description: "Make a removable bench cushion from a paper template, upholstery foam and an envelope cover. Check clearance around arms and hinges before cutting.",
    minutes: 180,
    preparation: "Tape paper together to make a full-size template and check it on the bench before cutting foam. Mark the front edge and check the area around hinges or arms. Decide whether the cover can be taken off easily once the cushion is in place and leave room for the envelope opening.",
    supplies: ["Large paper and tape for a template", "Upholstery foam", "Furnishing fabric and thread", "Sewing machine", "Tape measure, fabric scissors and suitable foam-cutting tool"],
    steps: [
      [
        "Make a full-size seat template",
        "Press the paper into the back corners and mark the usable seat outline. Mark the front and test the template with the lid or arms in their normal position. Transfer the outline to the foam.",
      ],
      [
        "Cut the insert",
        "Support the foam on a flat work surface and cut along the marks with the foam tool, following its instructions. Test the fit on the bench.",
      ],
      [
        "Allow room for the foam thickness",
        "For a simple two-face envelope cover, start with the foam length plus its thickness and the width plus its thickness. Add your seam allowance on every outer edge. For example, 80 × 32 × 3 cm foam with 1 cm seams gives a starting front panel of 85 × 37 cm. Test on scrap if the foam is firm or the corners are irregular.",
      ],
      [
        "Sew the envelope cover",
        "Cut two back panels that overlap after their opening edges are hemmed. Lay them over the front with right sides together so the outside edges match. Clip and stitch around the perimeter, keeping the overlap flat.",
      ],
      [
        "Turn and fit the cushion",
        "Turn through the envelope opening and ease the foam in a little at a time. Line up the corners, smooth the overlap and test the cushion on the bench before adding any non-slip backing.",
      ],
    ],
    finish: "Set the cushion on the bench and check that the insert lies flat without bowing the cover. Press along the front edge and corners. If the cushion bunches or the overlap gapes, check the fit before trimming the seam allowance or foam.",
    tip: "If the cushion slides, add a removable non-slip mat sized to the underside.",
    related: ["sew-a-box-cushion-cover", "reupholster-a-drop-in-chair-seat"],
  },
  {
    id: "restore-a-wooden-drawer-bottom",
    category: "advanced-projects",
    title: "Replace a sagging wooden drawer bottom",
    description: "Replace a sagging drawer bottom that slides into grooves. Match panel thickness, measure the grooves and test the drawer before reloading it.",
    minutes: [120, 180],
    preparation: "Remove the drawer and check how the bottom is held. This method is for a panel that slides out of grooves once a rear strip or fixing is removed. Check that the sides are square and the grooves are intact. Keep the old bottom to compare thickness and size.",
    supplies: ["Replacement panel matching the original thickness", "Screwdriver", "Saw and square", "Tape measure and sandpaper"],
    steps: [
      [
        "Inspect the assembly",
        "Remove the empty drawer and identify how the bottom slides out. Photograph the joints and check that the frame and grooves are sound.",
      ],
      [
        "Measure the panel and grooves",
        "Slide out the old panel and measure its thickness at a flat edge. Measure the distance between the bottoms of opposite grooves and compare with the old panel. Allow enough clearance to slide it into place while keeping it engaged in both sides.",
      ],
      [
        "Cut and check the fit",
        "Mark square lines on replacement stock that fits the original grooves. Cut and smooth the edges. Test a small offcut in the groove first, then slide the whole panel in with the drawer on a flat bench. If it binds, check that the panel is square and clear of debris before trimming.",
      ],
      [
        "Reassemble and test",
        "Reinstall the rear fixing, check the drawer diagonals and refit it. Test with a few light items before returning the usual contents.",
      ],
    ],
    finish: "After refitting the drawer, look underneath to confirm the panel is fully engaged along each groove. Run it empty first, then add the contents a few items at a time. Check that the bottom does not bow and that the drawer clears the one below.",
    tip: "If the grooves have split or the joints move, repair the drawer frame before replacing the bottom.",
    related: ["rebuild-a-loose-wooden-drawer-joint", "tighten-a-loose-drawer-front"],
    sources: [
      { label: "Bosch DIY guidance on safe sawing, drilling and workholding", href: "https://www.bosch-diy.com/gb/en/all-about-diy/safety-precautions" },
    ],
  },
  {
    id: "rebuild-a-loose-wooden-drawer-joint",
    category: "advanced-projects",
    title: "Reglue a loose wooden drawer joint",
    description: "Reglue a loose wooden drawer corner. Dry-fit the old joint, check both diagonals while clamping and test the drawer after the glue cures.",
    minutes: [60, 120],
    wait: "curing time",
    preparation: "Watch the drawer corners as you hold one side and move the front gently. This repair is for a joint that opens while its wood and mating parts are still sound. Keep track of the original orientation and dry-fit the parts before choosing how to clamp them.",
    supplies: ["Wood glue suitable for the joint", "Clamps and scrap pads", "Square", "Small scraper and brush"],
    steps: [
      [
        "Identify the loose joint",
        "Empty and remove the drawer. Check which corner moves and photograph how the pieces fit together.",
      ],
      [
        "Prepare the mating faces",
        "Separate only the joint that opens without force. Remove loose old glue and dust without reshaping the joint. Dry-fit before applying glue.",
      ],
      [
        "Clamp on a flat surface",
        "Apply wood glue to the mating surfaces as directed. Bring the joint together and clamp across the drawer with scrap pads under the jaws. Compare the diagonals and correct the alignment before the glue sets. Tighten until the joint closes without bowing the sides.",
      ],
      [
        "Check the bottom stays seated",
        "Look along the underside while the glue is still adjustable. Confirm the bottom panel is fully in its grooves and the drawer sits flat on the bench.",
      ],
      [
        "Let it cure",
        "Wipe away excess glue as directed. Leave it clamped for the specified time and test the drawer empty after curing.",
      ],
    ],
    finish: "Wait for the glue to cure as directed before putting the drawer back. Measure both diagonals, then run it through the cabinet empty. The repaired corner should stay closed and the gaps should stay even when you pull from the centre.",
    tip: "If the dry joint has a large gap or a broken tab, restore the fit before gluing.",
    related: ["restore-a-wooden-drawer-bottom", "fix-a-sticking-wooden-drawer"],
  },
  {
    id: "replace-cabinet-handle-and-cover-old-holes",
    category: "advanced-projects",
    title: "Fit a cabinet handle with different hole spacing",
    searchTitle: "How to Fit Cabinet Handles With Different Hole Spacing",
    description: "Fit a cabinet handle with a new screw spacing. Make a drilling template, support the front to reduce breakout and fill the unused holes.",
    minutes: 120,
    wait: "drying time",
    preparation: "Measure handle spacing from screw centre to screw centre and check the new fixings against the front thickness. Look at the inside face for rails, hinges and anything the screws could hit. If the old holes will remain visible, test how the filler will look before you drill. Some finishes show even a well-matched patch.",
    supplies: ["New handle and matching fixings", "Drill, matching bit and eye protection", "Scrap card, pencil, ruler and tape", "Scrap backing wood and clamps", "Compatible filler and finish"],
    steps: [
      [
        "Mark the handle centre",
        "Put tape on the front and mark the centre of the old handle. Divide the new centre-to-centre distance by two and mark that distance on either side. For a 128 mm handle, each mark goes 64 mm from centre.",
      ],
      [
        "Make and test a drilling template",
        "Transfer the marks to a card template. Check the handle against both marks. Hold the template on the front and verify alignment with adjacent handles, then check the marks again from the inside face.",
      ],
      [
        "Drill through to a backer",
        "Remove the front and clamp it flat with scrap wood directly beneath the marks. Drill square with the bit specified for the fixings. Keep the backer tight to the panel to support the surface as the bit exits.",
      ],
      [
        "Fill and refit",
        "Fill the old holes with a product suitable for the surface. Let it dry and finish it as directed, then fit the handle and check it stays snug.",
      ],
    ],
    finish: "Refit the front and pull the handle several times from the centre. Both ends should sit flat and the screws should remain clear of nearby hardware. Look at the filled holes in daylight once the finish has dried, then check that the door or drawer still closes freely.",
    tip: "Test filler and finish on a hidden area first, especially on stained or patterned fronts.",
    related: ["tighten-a-cabinet-handle", "adjust-a-rubbing-cabinet-door"],
    sources: [
      { label: "Bosch DIY guidance on safe sawing, drilling and workholding", href: "https://www.bosch-diy.com/gb/en/all-about-diy/safety-precautions" },
    ],
  },
  {
    id: "build-a-wooden-tool-tote",
    category: "advanced-projects",
    title: "Build an open wooden tool tote",
    description: "Build an open wooden tool tote sized around your hand tools. Drill matching handle holes, assemble the box and test the joints before carrying it.",
    minutes: [180, 240],
    wait: "curing time",
    preparation: "Lay the tools out to see how they will sit, then allow room for your fingers under the handle. Choose straight timber and a sound hardwood dowel with no cracks. Sketch two taller ends, two low sides and a base, and plan how the handle will be retained before cutting.",
    supplies: ["Straight timber and hardwood dowel", "Tape measure, pencil and square", "Saw, drill, backing scrap and eye protection", "Wood glue, screws and clamps", "Sandpaper"],
    steps: [
      [
        "Sketch the tray and handle",
        "Set the inside length from the longest tool, then choose a width and shallow side height that let you reach it easily. Draw both end panels with the handle holes at the same height and leave sound material around each hole.",
      ],
      [
        "Cut matching ends and drill",
        "Cut the base and sides. Cut the ends as a matched pair and mark each hole from the same bottom edge. Clamp them against a backer and drill with a bit sized for the dowel. Dry-fit the dowel and check the handle clears the tools.",
      ],
      [
        "Trap the handle and assemble the box",
        "Fit the dowel into both ends before closing the box. Use matching blind holes in thick end panels if your design allows, so the dowel cannot slide through. Glue the handle in place and join the sides and base through pilot holes while the ends are clamped square.",
      ],
      [
        "Check for square and clean up",
        "Compare the diagonals of the base and adjust if needed before the glue sets. Wipe away excess glue and inspect the areas around the handle holes for cracks.",
      ],
      [
        "Check the joints",
        "Let the glue cure and sand the grip and edges. Test with a light load close to the bench, then increase to the intended tool load if the joints stay firm.",
      ],
    ],
    finish: "Test the empty tote first, then add the intended hand tools gradually while keeping it close to a bench. The handle should neither rotate nor move side to side, and the base should stay square. Split the load between two boxes if you cannot carry it comfortably.",
    tip: "If a handle hole is close to an end grain edge or shows splitting, remake the end piece before carrying tools.",
    related: ["build-a-freestanding-book-crate", "make-a-freestanding-pegboard-organiser"],
    sources: [
      { label: "Bosch DIY guidance on safe sawing, drilling and workholding", href: "https://www.bosch-diy.com/gb/en/all-about-diy/safety-precautions" },
    ],
  },
  {
    id: "make-a-freestanding-pegboard-organiser",
    category: "advanced-projects",
    title: "Build a freestanding desktop pegboard organiser",
    description: "Make a freestanding pegboard organiser for a desk. Build in rear clearance for hooks, brace the feet and test it with lightweight items.",
    minutes: 180,
    preparation: "Choose a small pegboard and compatible hooks. Test one hook before making the frame to see how much space it needs behind the board. Sketch the board, the desk footprint and two wide feet. Keep the board low enough to stay steady when you remove items with one hand.",
    supplies: ["Small pegboard and compatible hooks", "Timber for the frame, feet and braces", "Tape measure, pencil and square", "Saw, drill, screws, clamps and eye protection"],
    steps: [
      [
        "Draw the frame around the usable holes",
        "Clip a hook into the board and measure the distance it projects at the back. Plan a frame that gives it that clearance, especially near the crosspieces. Mark the area where hooks can go after assembly.",
      ],
      [
        "Assemble the frame square",
        "Cut the two uprights and crosspieces, then clamp the frame and compare its diagonals. Fasten the board at the suitable mounting points with fixings that will not project from the back.",
      ],
      [
        "Fit wide feet and braces",
        "Fit a foot at each end with support in front of and behind the board. Brace both uprights to the feet and check that the feet touch the desk evenly.",
      ],
      [
        "Test one row of hooks",
        "Fit a row of hooks before loading the board. Make sure they can tilt into the holes and lock in place without meeting a brace. Move any hook that cannot seat fully.",
      ],
      [
        "Load and test",
        "Fit compatible hooks and place lightweight items low and near the centre. Remove items one at a time to check the board stays stable.",
      ],
    ],
    finish: "With the board on a flat desk, hang your lightest items first. Lift them on and off in the direction you will use every day. The board should stay upright and each hook should seat without hitting the frame. Reposition heavy or frequently used items lower and closer to the centre.",
    tip: "If the board moves when you lift an item off, widen or brace the feet before use.",
    related: ["make-a-desk-cable-holder", "build-a-wooden-tool-tote"],
    sources: [
      { label: "Bosch DIY guidance on safe sawing, drilling and workholding", href: "https://www.bosch-diy.com/gb/en/all-about-diy/safety-precautions" },
    ],
  },
  {
    id: "sort-a-load-of-laundry",
    category: "laundry",
    title: "Sort a mixed pile of laundry",
    searchTitle: "How to Sort Laundry Before Washing",
    description: "Sort laundry before washing by reading care labels, separating colours and grouping similar fabrics. Check pockets and the machine’s load limit.",
    aliases: "separate washing clothes laundry sorting colors washing machine",
    minutes: 15,
    preparation: "Clear a place to make piles before you start. Sort the load you have in front of you and set aside anything with a missing or unclear label until you can check its care requirements. Compare wash and drying instructions if you plan to dry the whole load together.",
    supplies: ["Laundry baskets or clear floor space"],
    steps: [
      [
        "Read the care labels first",
        "Set aside items marked hand wash or dry clean. Check the others for maximum wash temperature and gentle-cycle instructions. Keep a separate pile for items that need a special cycle, even if they are the same colour.",
      ],
      [
        "Separate colours",
        "Make piles for lights and darks. Wash new strongly coloured items separately when the label calls for it.",
      ],
      [
        "Group fabrics with similar needs",
        "Wash heavy towels separately from delicate tops, and keep lint-shedding fabrics away from items that attract lint. Match the machine programme and spin setting to the care labels in each pile.",
      ],
      [
        "Check pockets and fastenings",
        "Empty pockets and close zips before loading. Follow the machine instructions for load size.",
      ],
    ],
    finish: "Look at each pile and choose the wash programme that suits every item in it. If one top needs gentler handling than the rest, move it to a separate pile. Keep a small basket for items that need a different wash so they stay out of the next mixed load.",
    tip: "If two items need different cycles, put them in separate loads.",
    related: ["air-dry-a-wool-jumper", "make-a-linen-shelf-inventory"],
  },
  {
    id: "air-dry-a-wool-jumper",
    category: "laundry",
    title: "Dry a wool jumper flat",
    description: "Dry a washed wool jumper flat. Blot excess water with a towel, reshape the knit and check the cuffs and seams before storing it.",
    aliases: "dry wool sweater air dry knitwear flat drying",
    minutes: 10,
    wait: "drying time",
    preparation: "Set out a pale, lint-free towel and choose a flat surface with good airflow. Check the care label before drying, especially if the jumper has a mixed fibre or an unusual finish. If you have its original measurements, keep them handy so you can restore the shape without stretching the knit.",
    supplies: ["Clean dry towels", "Flat drying rack or protected surface"],
    steps: [
      [
        "Check the label",
        "Confirm the jumper can be washed and dried flat.",
      ],
      [
        "Lift with support",
        "Gather the wet jumper from underneath so its weight does not pull on the shoulders.",
      ],
      [
        "Blot the water without wringing",
        "Lay the jumper flat on the towel, fold the sleeves towards the middle and roll the towel loosely around it. Press along the roll, then unroll it. Use a second towel if the first becomes saturated.",
      ],
      [
        "Reshape and dry",
        "Unroll and spread the jumper flat on a fresh towel or mesh rack. Ease the cuffs and hem into shape and let it dry away from direct heat.",
      ],
    ],
    finish: "Feel the cuffs, underarms and seams before folding. These thicker areas can still be damp when the front feels dry. Check that the sides and sleeves sit evenly and fold the jumper for storage once it is dry all the way through.",
    tip: "Replace the towel if it gets soaked so air can reach the fabric.",
    related: ["sort-a-load-of-laundry", "fold-a-fitted-sheet"],
    sources: [
      { label: "Woolmark guidance on flat-drying a wool sweater", href: "https://www.woolmark.com/care/how-to-dry-wool-sweater/" },
    ],
  },
  {
    id: "fold-a-fitted-sheet",
    category: "laundry",
    title: "Fold a fitted sheet into a rectangle",
    description: "Fold a fitted sheet into a neat rectangle. Nest the elastic corners, flatten the edges and size the final folds to your linen shelf.",
    minutes: 10,
    preparation: "Start with a dry sheet and clear a bed or table to finish the folds. Find the four stitched corner pockets by following the elastic edge. On a large sheet, it can be easier to lay it flat and nest the corners there instead of holding the whole sheet up.",
    supplies: ["Clear bed or table"],
    steps: [
      [
        "Start with one long edge",
        "Put a hand into each of the two corner pockets along the same long edge, with the inside of the sheet facing you. Let the rest of the sheet hang down or rest on the bed.",
      ],
      [
        "Nest two corners at a time",
        "Bring one hand to the other. Flip the corner from one hand over the pocket on the other so their seams stack together. Find the remaining two corners along the other long edge and nest them the same way.",
      ],
      [
        "Stack all four pockets",
        "Bring the two pairs together and flip one pair over the other so all four corner seams sit in one hand. Lay the sheet on the bed with the gathered elastic at one end and one side. Smooth the cloth out from the stacked corners.",
      ],
      [
        "Fold the elastic inward",
        "Fold the gathered side inward first, then the gathered end. You should have a rough rectangle with the elastic tucked inside. Fold lengthways and then across until the bundle fits your shelf.",
      ],
    ],
    finish: "Run a hand over the rectangle to flatten any trapped air. Set the bundle on the shelf with the folded edge facing out. If it unrolls as you lift it, fold the last third inward and tuck the loose edge into the fold.",
    tip: "If the edges twist, lay the sheet down and follow the elastic to find each corner again.",
    related: ["make-a-linen-shelf-inventory", "sort-a-load-of-laundry"],
  },
  {
    id: "clean-a-window-track",
    category: "cleaning",
    title: "Clean a sliding window track",
    description: "Clean grit from a sliding window track from indoors. Brush and vacuum first, wipe the groove and check that the sash travels freely.",
    minutes: 20,
    preparation: "Check that you can reach the track from inside without removing a heavy sash or leaning out. Read the window maker’s cleaning instructions if you know the model. Work with a dry brush first so water does not turn grit into a paste in the groove.",
    supplies: ["Soft brush", "Vacuum with crevice attachment", "Damp cloth", "Dry cloth"],
    steps: [
      [
        "Open the window from indoors",
        "Move the sash enough to reach the track while keeping both feet on the floor.",
      ],
      [
        "Loosen dry grit",
        "Brush dirt towards an accessible corner, then vacuum it away.",
      ],
      [
        "Wipe along the groove",
        "Use a well-wrung cloth to lift the dirt the vacuum left behind. Fold it over the edge of a finger for narrow spots and switch to a clean fold as it darkens. Keep water and debris clear of any drainage openings.",
      ],
      [
        "Dry and test",
        "Wipe the groove dry, then open and close the window to check how it slides.",
      ],
    ],
    finish: "Run the window through its normal travel and check that the latch closes. Look for loose grit left behind the stops and check the track is dry. If it still scrapes at the same point, note where it happens before trying another clean.",
    tip: "If the sash still sticks after cleaning, check for a visible obstruction or worn runner before forcing it.",
    related: ["patch-a-small-hole-in-insect-mesh", "dust-and-wipe-wooden-blinds"],
  },
  {
    id: "clean-a-removable-vacuum-brush-roll",
    category: "cleaning",
    title: "Clear hair from a removable vacuum brush roll",
    searchTitle: "How to Clean Hair From a Vacuum Brush Roll",
    description: "Remove hair and thread from a removable vacuum brush roll. Disconnect power, clear tangles and check the roller is seated before testing.",
    aliases: "vacuum brush bar roller tangled hair floor head hoover",
    minutes: 20,
    preparation: "Find the instructions for the exact floor head, since some rollers twist out and others release with a latch. If the roller is fixed in place, use the maker’s cleaning method for that head. Unplug the machine or remove the battery as directed before working near the brush.",
    supplies: ["Vacuum manual", "Scissors", "Soft brush"],
    steps: [
      [
        "Disconnect power",
        "Unplug the vacuum or remove its battery as directed in the manual.",
      ],
      [
        "Remove the roll",
        "Release the brush cover and lift out the roller using the model’s instructions.",
      ],
      [
        "Cut and lift the tangles",
        "Lay the removed roller on a flat surface. If it has a cutting groove, cut along that groove in short sections, keeping the blade away from the bristles and drive parts. Lift each strand away and inspect both end caps for wound thread.",
      ],
      [
        "Refit and test",
        "Brush away loose debris, reinstall the roller and cover, then reconnect power for a brief test.",
      ],
    ],
    finish: "Before reconnecting power, check that the cover has locked in and the roller sits straight in its mounts. Run the vacuum briefly on a clear patch of suitable floor. Stop if the head rattles or the roller fails to turn.",
    tip: "If the roller still binds, check its ends for trapped thread before running it again.",
    related: ["clean-a-window-track", "dust-and-wipe-wooden-blinds"],
  },
  {
    id: "dust-and-wipe-wooden-blinds",
    category: "cleaning",
    title: "Dust wooden blinds slat by slat",
    description: "Dust wooden Venetian blinds without soaking the slats. Work from top to bottom, clean both faces and check the maker’s advice for sticky marks.",
    aliases: "wooden venetian blinds clean wood slats",
    minutes: 20,
    preparation: "Check whether the slats are real wood and look up the maker’s care instructions. Start with a clean, dry cloth. Place an old sheet under a dusty blind to catch loose dust, and work only on slats you can reach comfortably.",
    supplies: ["Two soft microfibre cloths"],
    steps: [
      [
        "Lower the blind",
        "Tilt the slats nearly closed so the broad faces are easy to reach.",
      ],
      [
        "Dust from the top",
        "Support each slat lightly with one hand and wipe along it with a dry cloth. Work down so loose dust falls onto slats you have yet to clean.",
      ],
      [
        "Reverse the tilt",
        "Turn the slats the other way and dust their backs.",
      ],
      [
        "Handle sticky marks separately",
        "Use the maker’s approved method for the finish. If its instructions specify dry cleaning only, keep water away from the slats. For a finish that permits a damp cloth, spot-test a hidden area, use a barely damp cloth and dry the spot straight away.",
      ],
    ],
    finish: "Open the slats enough to see both faces in daylight. Wipe any line of dust left around the ladder cords. Tilt the blind back to its usual position and check that each slat moves freely.",
    tip: "If a slat bends as you wipe, reduce pressure and support it closer to your hand.",
    related: ["clean-a-window-track", "clean-a-removable-vacuum-brush-roll"],
    sources: [
      { label: "Luxaflex care instructions for wooden Venetian blinds", href: "https://www.luxaflex.co.uk/customer-support/cleaning-instructions/cleaning-wood-blinds/" },
    ],
  },
  {
    id: "set-up-a-household-paperwork-tray",
    category: "home-routines",
    title: "Set up a household paperwork tray",
    description: "Set up a simple household paperwork tray with folders for action, waiting and filing. Add deadlines to a calendar and schedule a regular review.",
    aliases: "mail inbox filing system bills sort post paper",
    minutes: 25,
    preparation: "Choose one place for papers that still need a decision. Put it near the place you open post and within reach of the folders. Start with a week’s paperwork rather than the entire filing cupboard. Keep a calendar nearby for any actions with dates.",
    supplies: ["Shallow tray", "Three folders", "Labels and pen"],
    steps: [
      [
        "Pick a landing spot",
        "Choose a dry place near where you open post, with room to lay down an envelope.",
      ],
      [
        "Label the folders",
        "Start with To do, Waiting and File. Keep the tray for items you have yet to sort.",
      ],
      [
        "Sort what you already have",
        "Put each document into a folder and note any deadline on your calendar.",
      ],
      [
        "Set a review time",
        "Pick a regular time to empty the tray and work through the To do folder.",
      ],
    ],
    finish: "Pick a sample letter and run it through the system. You should be able to see where it goes and when you will act on it. At the next review, move anything completed out of To do and check the Waiting folder for items that need a follow-up.",
    tip: "Keep documents with personal information in a private spot if other people use the same room.",
    related: ["make-an-envelope-receipt-organiser", "make-a-linen-shelf-inventory"],
  },
  {
    id: "make-a-linen-shelf-inventory",
    category: "home-routines",
    title: "Make a linen shelf inventory",
    description: "Organise a linen shelf by bed size and count complete bedding sets. Match sheets and pillowcases, label each stack and keep a short inventory.",
    minutes: 25,
    preparation: "Write down which beds or guest spaces need linen and measure any mattress whose size you are unsure about. Clear a spot to lay out clean sheets. Work shelf by shelf so you can finish one group before opening the next.",
    supplies: ["Paper or index card", "Pen", "Shelf labels"],
    steps: [
      [
        "Pull out one shelf",
        "Lay the contents on a clean surface and separate sheets, pillowcases and covers.",
      ],
      [
        "Match by bed size",
        "Read labels or measure an unfamiliar sheet. Pair each set with its pillowcases.",
      ],
      [
        "Fold and label",
        "Stack each set together and label the shelf by bed size or room.",
      ],
      [
        "Record what you have",
        "Write down how many complete sets fit each bed and keep the list by the shelf.",
      ],
    ],
    finish: "Ask yourself whether you could find a complete set with one hand. Put the most-used sets at the front and record how many are ready to use. If a set is missing a pillowcase, note it separately from complete sets so you can decide what to replace.",
    tip: "If similar sets keep getting mixed up, store each folded set inside one of its pillowcases.",
    related: ["fold-a-fitted-sheet", "make-cardboard-drawer-dividers"],
  },
  {
    id: "make-a-pantry-use-first-basket",
    category: "home-routines",
    title: "Make a pantry use-first basket",
    description: "Make a use-first basket for cupboard food. Keep date labels visible, follow storage instructions and check the basket when planning meals.",
    minutes: 20,
    preparation: "Use the basket for items whose packaging says they can be stored in a cupboard in their current state. Read storage and opening instructions as well as dates. A best-before date is about quality, while a use-by date is a safety limit. Leave refrigerated items in the fridge.",
    supplies: ["Clean basket", "Label and pen"],
    steps: [
      [
        "Choose one shelf",
        "Work through a small section of the pantry so you can finish it in one session.",
      ],
      [
        "Check dates and storage instructions",
        "Keep only suitable shelf-stable items with legible labels. Follow any instruction to refrigerate or use a product within a stated time after opening. Leave out damaged packages and discard items past their use-by date.",
      ],
      [
        "Set up the basket",
        "Put the items in a clean basket near the front of the shelf and add a Use first label.",
      ],
      [
        "Check before shopping",
        "Look through the basket when you plan meals and move another item forward when there is space.",
      ],
    ],
    finish: "At your next meal plan, pick one item from the basket and check the packaging before using it. Keep it small enough to see every packet at a glance. Once a space opens up, move one suitable item forward from the shelf.",
    tip: "If a packet needs a clip, fold and secure the opening while keeping the date and storage instructions readable.",
    related: ["make-a-cupboard-shelf-liner", "set-up-a-household-paperwork-tray"],
    sources: [
      { label: "Food Standards Agency guidance on best-before and use-by dates", href: "https://www.food.gov.uk/print/pdf/node/271" },
    ],
  },
  {
    id: "make-a-paper-gift-bag",
    category: "paper-crafts",
    title: "Make a gift bag from wrapping paper",
    description: "Fold a flat-bottomed gift bag from wrapping paper. Size it around a lightweight gift, tape the seams and test the base before lifting.",
    minutes: 20,
    preparation: "Try this with a small, lightweight gift and paper that creases without tearing. Wrap a loose sheet around the gift to estimate the circumference, then leave an overlap for the seam. Leave enough at the bottom to fold a base a little deeper than the gift.",
    supplies: ["Sturdy wrapping paper", "Scissors", "Ruler", "Double-sided tape"],
    steps: [
      [
        "Size the paper",
        "Wrap the paper loosely around the gift to check the width. Leave extra at the top for folding shut and at the bottom for the base.",
      ],
      [
        "Tape a sleeve",
        "Overlap the long edges and tape them together. Flatten the sleeve with the seam in the middle of the back.",
      ],
      [
        "Fold and tape the base",
        "With the sleeve flat, fold the bottom up by the planned base depth. Open that fold and flatten its side corners into a diamond. Fold the top and bottom points of the diamond towards the centre so they overlap, then tape across the overlap and both loose edges.",
      ],
      [
        "Open and fill",
        "Open the sleeve, flatten the base from inside and set the gift in gently. Fold the top down and seal it.",
      ],
    ],
    finish: "Put the gift inside while the bag is still on the table. Lift it a little with one hand under the base and look for tape lifting at the seams. Reinforce the bottom or use a firmer container if the paper starts to stretch.",
    tip: "Test the base over a table before lifting. A second layer of card inside can spread the weight of a small gift.",
    related: ["make-a-book-cover-from-a-paper-bag", "make-a-stitched-paper-notebook"],
  },
  {
    id: "make-a-stitched-paper-notebook",
    category: "paper-crafts",
    title: "Make a small stitched notebook",
    description: "Bind a pocket notebook from folded scrap paper using a three-hole pamphlet stitch. Mark the holes, sew the spine and tie off the thread inside.",
    aliases: "pamphlet stitch bookbinding pocket journal",
    minutes: 30,
    preparation: "Use a few sheets you can fold together without the spine bulging. Fold the cover on a test scrap if it is stiff. Lay out your tools on a firm surface, with a scrap board underneath the spine so the needle never has to point towards your hand.",
    supplies: ["Four to six sheets of paper", "Thin card", "Ruler", "Binder clips", "Needle and strong thread", "Scrap cardboard"],
    steps: [
      [
        "Fold the pages",
        "Fold each sheet and the card cover in half. Nest the pages inside the cover and clip the stack together.",
      ],
      [
        "Mark three holes",
        "Mark the centre of the fold and two points equally far from it. Put scrap cardboard beneath the fold and pierce the marks carefully.",
      ],
      [
        "Sew the three-hole pamphlet stitch",
        "Start inside at the centre hole and leave a short tail. Pass outside through the centre, back inside through the top hole, then outside through the bottom hole. Return inside through the centre without splitting the thread already there.",
      ],
      [
        "Tie the thread",
        "Keep a tail on either side of the long inside stitch. Tie the tails over it and trim them, then remove the clips.",
      ],
    ],
    finish: "Open the book to the middle and turn the pages in both directions. They should move easily while the spine stays flat. Pull lightly at the centre thread to check the knot is snug, then close the book and smooth the cover.",
    tip: "If the paper tears at a hole, use fewer pages and pull the thread just snug.",
    related: ["make-a-felt-bookmark", "make-a-book-cover-from-a-paper-bag"],
  },
  {
    id: "make-a-book-cover-from-a-paper-bag",
    category: "paper-crafts",
    title: "Cover a book with a paper bag",
    description: "Make a removable hardback book cover from a paper shopping bag. Fold pockets for both boards and leave enough room for the spine to move.",
    minutes: 20,
    preparation: "Choose a clean bag with enough uncreased paper to cover both boards and the spine, plus a flap at each end. Use this method on a sound hardback. Test folds on a scrap if the paper is stiff and keep any tape on the paper rather than the book.",
    supplies: ["Clean paper shopping bag", "Scissors", "Ruler"],
    steps: [
      [
        "Open the bag flat",
        "Cut down one side and remove the base and handles. Set the book on the plain side of the sheet.",
      ],
      [
        "Fold the top and bottom",
        "Mark the book height and fold the paper to match it, with a little clearance so the book closes freely.",
      ],
      [
        "Fold pockets for both covers",
        "Centre the closed book on the folded sheet and wrap the paper loosely around it. Mark where each board ends. Remove the book and fold the spare paper inward at both marks, leaving a little space for the book to open. The top and bottom folds form the pockets.",
      ],
      [
        "Fit and adjust",
        "Slip the front and back boards into the sleeves, then close the book and check that the spine moves freely.",
      ],
    ],
    finish: "Open the book fully enough to read and close it again. The covers should move freely and the paper should stay on both boards. If the paper lifts near the spine, make a fresh crease with a little more room.",
    tip: "If the cover pulls tight when the book closes, take it off and remake the end folds with more room.",
    related: ["make-a-stitched-paper-notebook", "make-a-felt-bookmark"],
  },
];

export function summarizeProject(project: Project): ProjectSummary {
  const { id, title, description, category, wait } = project;
  const [min, max = min] = typeof project.minutes === "number" ? [project.minutes] : project.minutes;
  const hours = min % 60 === 0 && max % 60 === 0;
  const unit = hours ? (max === 60 ? "hour" : "hours") : "min";
  const scale = hours ? 60 : 1;
  const duration = min === max ? String(min / scale) : `${min / scale}–${max / scale}`;

  return {
    id,
    title,
    description,
    level: category === "advanced-projects" ? "Advanced" : "Beginner",
    time: `${duration} ${unit}${wait ? ` + ${wait}` : ""}`,
    minutes: max,
    searchText: [title, description, projectTopics[category].name, id.replaceAll("-", " "), project.aliases, ...project.supplies].join(" ").toLowerCase(),
  };
}
