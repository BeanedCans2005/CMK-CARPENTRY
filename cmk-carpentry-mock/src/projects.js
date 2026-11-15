import { services } from "./services";

// 1. Filter buttons come from the services list.
export const categories = services.map((s) => s.title);
const [decking, lockup, renos] = categories;

// 2. One photo-folder constant per real project (folders live in /public/projects).
const DECK = "/projects/merbau-deck";
const SHED_DECK = "/projects/composite-shed-deck";
const BUILDER = "/projects/builder-detail-carpentry";
const RENO = "/projects/full-home-renovation";
const EXTERIOR = "/projects/exterior-upgrade";
const CARLTON = "/projects/carlton-timber-repair";
const STEPS = "/projects/whittlesea-decking-steps";
const SHELF = "/projects/timber-shelf-benchtop";

// gallery("/projects/folder", 4) gives gallery-01.jpg to gallery-04.jpg
const gallery = (dir, count) =>
  Array.from({ length: count }, (_, i) => ({
    src: `${dir}/gallery-${String(i + 1).padStart(2, "0")}.jpg`,
    caption: "",
  }));

// 3. Placeholder helper. It only ever holds generic text, never real project content.
const placeholder = (n, category, featured = false, overrides = {}) => ({
  id: `placeholder-${n}`,
  placeholder: true,
  featured,
  title: `Project title ${n}`,
  summary: "One or two lines shown on the project card.",
  description: [
    "First paragraph: what the client wanted and the brief.",
    "Second paragraph: how it was built and the result.",
  ],
  brief: "What the client wanted: the space, the problem and the goals.",
  build: [
    "How the job was approached and built.",
    "Materials, challenges and the finished result.",
  ],
  duration: "Placeholder duration",
  materials: ["Material one", "Material two"],
  location: "Suburb, VIC",
  category,
  workCompleted: [category],
  clientName: "",
  photo: "",
  photos: [],
  gallery: [],
  beforeAfter: {},
  ...overrides,
});

// 4. The projects. Real ones first (newest or strongest at the top), placeholders after.
export const projects = [
  // ---------- REAL PROJECTS ----------
  {
    id: "merbau-deck-level-frame",
    featured: true,
    title: "170 m² Merbau deck, rebuilt on a level frame",
    summary: "Roughly 170 m² of 140 mm Merbau laid on a restructured, level frame, with new treated pine stairs.",
    description: [
      "The original decking boards were carefully removed so the existing frame could be assessed and restructured - solid, level and suitable for the new boards. Roughly 170 m² of 140 mm Merbau was then laid across the whole outdoor area, with new treated pine stairs connecting the different levels of the property.",
      "The result is a high-end finish built for long-term durability, and an outdoor space that has been completely transformed.",
    ],
    materials: ["140 mm Merbau", "Treated pine"],
    location: "Melbourne, VIC",
    category: decking,
    workCompleted: ["Decking", "Stairs"],
    clientName: "",
    photo: `${DECK}/Project-Deck-01.jpeg`,
    gallery: [
      { src: `${DECK}/Project-Deck-Gallery-01.jpeg`, caption: "View of the deck featuring the staircase" },
      { src: `${DECK}/Project-Deck-Gallery-02.jpeg`, caption: "View of how the deck now blends with the pool" },
      { src: `${DECK}/Project-Deck-Gallery-03.jpg`, caption: "" },
    ],
    beforeAfter: {
      before: `${DECK}/Project-Deck-Before.jpg`,
      after: `${DECK}/Project-Deck-Gallery-03.jpg`,
    },
  },

  {
    id: "composite-shed-deck",
    featured: true,
    title: "Composite deck built as a shed base",
    summary: "A large composite deck built as a solid, low-maintenance base for a shed.",
    description: [
      "This large composite deck was designed specifically to provide a solid and functional base for a shed. It was carefully planned and constructed to carry the size and weight of the shed while creating a durable outdoor area around it.",
      "Composite decking was chosen for its long-lasting finish and minimal ongoing maintenance, giving the homeowner a practical, purpose-built space that complements the existing property.",
    ],
    materials: ["Composite decking"],
    location: "", // not given in the document; add the suburb once confirmed
    category: decking,
    workCompleted: ["Decking"],
    clientName: "", // named in the document; only add once he confirms permission
    photo: `${SHED_DECK}/cover.jpg`,
    gallery: gallery(SHED_DECK, 2),
  },

  {
    id: "builder-detail-carpentry",
    featured: false,
    title: "Detailed carpentry for builders",
    summary: "Structural and finishing carpentry for a builder we regularly work with, from curved walls to feature trims.",
    description: [
      "These projects show a range of detailed carpentry completed for one of the builders we regularly work with, covering both structural and finishing work that calls for precision and careful attention to the design.",
      "The work has included balustrade frames ready for plastering, wire systems for climbing plant vines, and decorative trims that create feature designs around doors. We have also installed digital and traditional mortise locks, built curved walls and stair voids, and fitted a wide range of internal and external doors.",
    ],
    location: "",
    category: lockup,
    workCompleted: ["Doors & locks", "Curved walls & stair voids", "Feature trims", "Balustrade frames"],
    clientName: "",
    photo: `${BUILDER}/cover.jpg`,
    gallery: gallery(BUILDER, 17),
  },

  {
    id: "full-home-renovation",
    featured: true,
    title: "Full home renovation, from demolition to lock-up and fix",
    summary: "The interior gutted and reconfigured, extensions built, and a new front porch added.",
    description: [
      "This was a complete transformation of an existing home, with extensive internal and external carpentry from demolition through to lock-up and fix. The interior was gutted and the layout reconfigured with new internal walls to create a more functional, modern living space.",
      "Extensions increased the overall size of the home, and the existing ceiling was restructured to suit the new design. Externally, the existing cladding was removed and the home prepared for its new finish, and a new front porch was built as a strong feature at the front of the property.",
      "CMK completed the carpentry through to lock-up and fix, managing a wide range of structural and finishing requirements at every stage.",
    ],
    location: "",
    category: renos,
    workCompleted: ["Demolition", "Internal walls", "Extensions", "Ceiling restructure", "Front porch", "Lock-up & fix"],
    clientName: "",
    photo: `${RENO}/cover.jpg`,
    gallery: gallery(RENO, 4),
  },
    {
    id: "exterior-upgrade",
    featured: false,
    title: "Exterior upgrade: eaves, carport roof and four new gables",
    summary: "New eaves around the house and carport, a framed carport roof, hardwood beams and four clad gables.",
    description: [
      "This project was a comprehensive upgrade to the exterior of a home, carport and quad area. New eave sheets were installed around the entire house, including the carport and quad, for a clean and consistent finish.",
      "The new roof pitch over the carport was framed, with hardwood beams installed around the existing piers and along the house side of the carport. Four new gables were also framed, eaved and clad, adding both functionality and a strong architectural feature to the exterior.",
      "The job covered a range of detailed carpentry, from structural framing through to the finishing elements.",
    ],
    location: "",
    category: renos,
    workCompleted: ["Eaves", "Roof framing", "Hardwood beams", "Gables & cladding"],
    clientName: "",
    photo: `${EXTERIOR}/cover.jpg`,
    gallery: gallery(EXTERIOR, 15),
  },

  {
    id: "carlton-timber-repair",
    featured: false,
    title: "Timber repair and porch ceiling, Carlton",
    summary: "Rotted timber replaced to match the existing property, plus a newly sheeted front porch ceiling.",
    description: [
      "This project in Carlton involved repairing and restoring sections of the existing timberwork that had deteriorated over time. The rotted timber was removed and replaced with new timber, so the affected areas were structurally sound and finished to match the existing property as closely as possible.",
      "The ceiling of the front porch was also sheeted, giving the entrance a clean, refreshed finish.",
      "A smaller job, but it shows our ability to carry out detailed repair and maintenance work while keeping the character of the existing property.",
    ],
    location: "Carlton, VIC",
    category: lockup,
    workCompleted: ["Timber repair", "Ceiling sheeting"],
    clientName: "",
    photo: `${CARLTON}/cover.jpg`,
    gallery: gallery(CARLTON, 4),
  },

  {
    id: "whittlesea-decking-steps",
    featured: false,
    title: "Custom decking steps, Whittlesea",
    summary: "A large set of custom-built steps joined seamlessly to the client's existing deck.",
    description: [
      "This project in Whittlesea involved designing and constructing a set of large, custom-built decking steps to connect seamlessly with the client's existing deck.",
      "The aim was a substantial, practical set of steps that complemented the existing decking and gave easy access to the outdoor area. They were built to be sturdy, functional and visually integrated with the existing structure.",
      "The result is a strong, seamless addition to the deck and a more practical, inviting connection between the different levels of the outdoor space.",
    ],
    location: "Whittlesea, VIC",
    category: decking,
    workCompleted: ["Custom steps", "Decking"],
    clientName: "",
    photo: `${STEPS}/cover.jpg`,
    gallery: gallery(STEPS, 2),
  },

  {
    id: "timber-shelf-benchtop",
    featured: false,
    title: "Custom timber shelf and benchtop",
    summary: "A custom timber shelf and benchtop, fitted and finished with clean lines.",
    description: [
      "This job involved installing a custom timber shelf and benchtop, adding a practical and visually appealing feature to the space.",
      "The timber was carefully fitted and finished to create clean lines and a seamless fit within the existing area. It's a good example of the detailed finishing work we do, with a focus on precision, quality and a high-end result.",
    ],
    materials: ["Timber"],
    location: "",
    category: lockup,
    workCompleted: ["Custom shelf", "Benchtop"],
    clientName: "",
    photo: `${SHELF}/cover.jpg`,
    gallery: gallery(SHELF, 2),
     beforeAfter: {
      before: `${SHELF}/gallery-02.jpg`,
      after: `${SHELF}/after.jpg`,
    },
  },

  // ---------- PLACEHOLDERS (delete one per real project you add) ----------
  //placeholder(#, renos, true),
];

// 5. Helpers used by the pages. Leave these as they are.
const toList = (v) => (Array.isArray(v) ? v : v ? [v] : []);

export const getSummary = (p) => p.summary || toList(p.description)[0] || "";
export const getParagraphs = (p) => toList(p.description);
export const getBuild = (p) => toList(p.build);
export const getImages = (p) =>
  p.photos?.length ? p.photos : p.photo ? [p.photo] : [];
export const getGallery = (p) =>
  p.gallery?.length ? p.gallery : getImages(p).slice(1).map((src) => ({ src, caption: "" }));