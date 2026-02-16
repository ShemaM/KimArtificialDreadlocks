/**
 * Business Constants for Kim's Artificial Dreadlocks & Nails Spa
 */

// Operating Hours
export const OPERATING_HOURS = {
  weekdays: {
    days: "Mon-Sat",
    start: "08:00",
    end: "20:00",
    display: "8:00 AM – 8:00 PM",
  },
  sunday: {
    days: "Sunday",
    special: "Special Requests & Emergencies Only (Please call to confirm)",
  },
} as const;

// Contact Information
export const CONTACT_INFO = {
  phone: {
    number: "+254716867526",
    display: "+254 716 867 526",
    whatsapp: "https://wa.me/254716867526",
  },
  email: "shemamanase992@gmail.com",
  location: {
    full: "Rontech Apartments, Deliverance Road, Kitengela",
    landmarks: "Located directly in front of Flavors Dishes and Fast Food restaurant, opposite Mission Care Hospital",
    area: "Kitengela & Environs",
    county: "Kajiado County, Kenya",
  },
} as const;

// Service Categories
export const SERVICE_CATEGORIES = {
  dreadlocks: {
    slug: "dreadlocks",
    label: "Dreadlocks",
    url: "/services/dreadlocks",
  },
  styling: {
    slug: "styling",
    label: "Braids & Styling",
    url: "/services/styling",
  },
  nails: {
    slug: "nails",
    label: "Nails",
    url: "/services/nails",
  },
} as const;

// Gallery Categories
export const GALLERY_CATEGORIES = ["Dreadlocks", "Styling", "Nails"] as const;

// Booking Statuses
export const BOOKING_STATUSES = {
  pending: "Pending",
  accepted: "Accepted",
  held: "Held",
  declined: "Declined",
} as const;

// Business Name
export const BUSINESS_NAME = "Kim's Artificial Dreadlocks & Nails Spa" as const;

// Tagline
export const TAGLINE = "The Premier Destination for Congolese Artificial Dreadlocks in Kitengela & Environs" as const;
