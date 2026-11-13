// The client's real contact details. Leave a value empty to hide it everywhere
export const SITE = {
    phone: "0400 371 576",
    email: "cmkcarpentry@outlook.com",
  serviceArea: "", // e.g. the suburbs or regions he covers
  abn: "",
  licence: "", // only if he wants one shown
};

// Turns "0400 000 000" into a tel: link that phones can dial.
export const phoneHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;