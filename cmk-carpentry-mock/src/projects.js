// Real projects go here. Put images in /public/projects and reference them as "/projects/name.jpeg/jpg/png".
// Only fill in clientName if the client has given permission.

export const projects = [
    {
        id: "placeholder-1", // used in the URL: /projects/placeholder-1 (lowercase, no spaces)
        placeholder: true,
        title: "Project title",
        summary: "One or two lines shown on the project card.",
        description: [
            "First paragraph: what the client wanted and the brief.",
            "Seconf paragraph: how it was built and the result.",
        ],
        location: "Suburb, VIC",
        workCompleted: ["Work type"],
        clientName: "",
        photo: "/projects/TESTPHOTO.jpeg", // cover image for the card
        photos: [], // images shown on the project page (falls back to `photo`)
    },

    {
        id: "placeholder-2", // used in the URL: /projects/placeholder-2 (lowercase, no spaces)
        placeholder: true,
        title: "Project title",
        summary: "One or two lines shown on the project card.",
        description: [
            "First paragraph: what the client wanted and the brief.",
            "Seconf paragraph: how it was built and the result.",
        ],
        location: "Suburb, VIC",
        workCompleted: ["Work type"],
        clientName: "",
        photo: "", // cover image for the card
        photos: [], // images shown on the project page (falls back to `photo`)
    },

    {
        id: "placeholder-3", // used in the URL: /projects/placeholder-3 (lowercase, no spaces)
        placeholder: true,
        title: "Project title",
        summary: "One or two lines shown on the project card.",
        description: [
            "First paragraph: what the client wanted and the brief.",
            "Seconf paragraph: how it was built and the result.",
        ],
        location: "Suburb, VIC",
        workCompleted: ["Work type"],
        clientName: "",
        photo: "", // cover image for the card
        photos: [], // images shown on the project page (falls back to `photo`)
    },
    // Copy more blocks for any extra projets with a unique id.
];

export const getSummary = (p) =>
    p.summary || (Array.isArray(p.description) ? p.description[0] : p.description) || "";

export const getParagraphs = (p) =>
    Array.isArray(p.description) ? p.description : p.description ? [p.description] : [];

export const getImages = (p) =>
    p.photos?.length ? p.photos : p.photo ? [p.photo] : [];