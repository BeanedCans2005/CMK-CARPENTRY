import { services } from "./services";

// Filter buttons on the projects page come from your services list.
export const categories = services.map((s) => s.title);

// ADD REAL PROJECTS HERE (put them above the placeholders).
// - id: used in the URL (/projects/<id>), lowercase with no spaces
// - category: must exactly match a service title
// - featured: true shows it on the home page (the first three featured are used)
// - photos go in /public/projects, referenced like "/projects/deck-1.jpg"
// - only fill in clientName if the client has given permission
//
// {
//   id: "example-deck",
//   featured: true,
//   title: "Project title",
//   summary: "One or two lines shown on the card.",
//   description: ["First paragraph.", "Second paragraph."],
//   location: "Suburb, VIC",
//   category: "Decking & Pergolas",
//   workCompleted: ["Decking"],
//   clientName: "",
//   photo: "/projects/example-deck.jpg",
//   photos: [],
// },

// Placeholders: delete these as real projects replace them.
// The 4th argument is optional and overrides any field for just that project.
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

const [decking, lockup, renos] = categories;

export const projects = [
  {
    id: "merbau-deck-level-frame", // used in the URL: /projects/merbau-deck-level-frame
    featured: true,
    title: "170 m² Merbau deck, rebuilt on a level frame",
    summary: "Roughly 170 m² of 140 mm Merbau laid on a restructured, level frame, with new treated pine stairs.", // edit to taste
    description: [
      "The original decking boards were carefully removed so the existing frame could be assessed and restructured - solid, level and suitable for the new boards. Roughly 170 m² of 140 mm Merbau was then laid across the whole outdoor area, with new treated pine stairs connecting the different levels of the property.",
      "The result is a high-end finish built for long-term durability, and an outdoor space that has been completely transformed.",
    ],
    materials: ["140 mm Merbau", "Treated pine"],
    location: "Melbourne, VIC",
    category: decking,
    workCompleted: ["Decking", "Stairs"], // edit to match how he describes the work
    clientName: "",
    photo: "/projects/Project-Deck-01.jpeg", // cover image, change to whichever photo you want on the card
    gallery: [
      { src: "/projects/Project-Deck-Gallery-01.jpeg", caption: "View of the deck featuring the staircase" },
      { src: "/projects/Project-Deck-Gallery-02.jpeg", caption: "View of how the deck now blends with the pool" },
    ],
    // Add these when he has them:
    // duration: "3 weeks",
    // brief: "What the customer wanted.",
    // build: ["How it was built."],
    // beforeAfter: { before: "/projects/deck-before.jpg", after: "/projects/deck-after.jpg" },
  },

  // Placeholders (delete one per real project you add)
  placeholder(2, lockup, true),
  placeholder(3, renos, true),
  placeholder(4, decking),
  placeholder(5, renos),
  placeholder(6, lockup),
  placeholder(7, decking),
  placeholder(8, renos),
  placeholder(9, lockup),
];

const toList = (v) => (Array.isArray(v) ? v : v ? [v] : []);

export const getSummary = (p) => p.summary || toList(p.description)[0] || "";
export const getParagraphs = (p) => toList(p.description);
export const getBuild = (p) => toList(p.build);
export const getImages = (p) =>
  p.photos?.length ? p.photos : p.photo ? [p.photo] : [];
export const getGallery = (p) =>
  p.gallery?.length ? p.gallery : getImages(p).slice(1).map((src) => ({ src, caption: "" }));