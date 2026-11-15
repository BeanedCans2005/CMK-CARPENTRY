// The client's real contact details. Leave a value empty to hide it everywhere
export const SITE = {
  phone: "0400 371 576",
  email: "cmkcarpentry@outlook.com",
  serviceArea: "Northern and eastern suburbs of Melbourne",
  abn: "",
  licence: "",
};

// Turns "0400 000 000" into a tel: link that phones can dial.
export const phoneHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;