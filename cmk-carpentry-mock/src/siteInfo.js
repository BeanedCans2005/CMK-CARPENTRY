// The client's real contact details. Leave a value empty to hide it everywhere
export const SITE = {
    phone: "0400 371 576",
    email: "cmkcarpentry@outlook.com",
};

// Turns the phone number into a tel: link that phones can dial.
export const phoneHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;