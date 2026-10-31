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
  location: "Suburb, VIC",
  category,
  workCompleted: [category],
  clientName: "",
  photo: "",
  photos: [],
  ...overrides,
});

const [decking, lockup, renos] = categories;

export const projects = [
    placeholder(1, decking, true, { photo: "/projects/TESTPHOTO.jpeg" }),
    placeholder(2, lockup, true),
    placeholder(3, renos, true),
    placeholder(4, decking),
    placeholder(5, renos),
    placeholder(6, lockup),
    placeholder(7, decking),
    placeholder(8, renos),
    placeholder(9, lockup),
];

export const getSummary = (p) =>
  p.summary || (Array.isArray(p.description) ? p.description[0] : p.description) || "";

export const getParagraphs = (p) =>
  Array.isArray(p.description) ? p.description : p.description ? [p.description] : [];

export const getImages = (p) =>
  p.photos?.length ? p.photos : p.photo ? [p.photo] : [];