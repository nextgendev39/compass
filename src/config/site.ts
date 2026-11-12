/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — edit everything about the business here.
 * ─────────────────────────────────────────────────────────────
 *  Values wrapped in [square brackets] are placeholders.
 *  Replace them with the real details before going live.
 *
 *  Phone / WhatsApp numbers: use full international format.
 *    phone.display   → how the number is shown on the page
 *    phone.dial      → digits used for the tel: link (keep the leading +)
 *    whatsapp.number → digits only, country code first, no + or spaces
 *
 *  Leave `mapsUrl` or any social link as "" to hide it automatically.
 */

export const siteConfig = {
  businessName: "Compass Trading LLC FZ",
  // Shown in the logo: wordmark, then the small silver plate underneath.
  logo: { primary: "Compass", secondary: "Car Export" },
  tagline: "Dubai-Based Vehicle Export Specialists",
  established: { label: "September 2024", iso: "2024-09-30" },
  shortDescription:
    "Dubai-based vehicle export specialists. Sourcing, inspection, export documentation and international shipping, handled with care from purchase to port.",

  owner: {
    name: "Dara",
    title: "Founder & Export Consultant",
  },

  phone: {
    display: "+971 54 561 9111",
    dial: "+971545619111",
  },

  // Second contact number, shown alongside the main one.
  otherPhone: {
    display: "+971 4 398 8643",
    dial: "+97143988643",
  },

  whatsapp: {
    display: "+971 54 561 9111",
    number: "971545619111",
    message:
      "Hello Compass Trading, I'm interested in exporting a vehicle from the UAE. Could you please share more details?",
  },

  email: "dara.compass@gmail.com",

  location: {
    short: "Dubai, U.A.E",
    lines: [
      "Meydan Grandstand, 6th Floor",
      "Meydan Road, Nad Al Sheba",
      "Dubai, U.A.E",
    ],
    // Replace with your exact Google Maps share link if you have one.
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Meydan+Grandstand+Meydan+Road+Nad+Al+Sheba+Dubai",
  },

  // Production domain — used for canonical URLs, Open Graph, the sitemap and
  // robots.txt. Set NEXT_PUBLIC_SITE_URL (e.g. "https://www.yourdomain.com")
  // in the hosting environment, or replace the fallback below.
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, ""),

  // Add full profile URLs to show icons in the footer. Empty = hidden.
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
  },

  seo: {
    title: "Car Export Company in Dubai, UAE | Compass Car Export",
    description:
      "Car export company in Dubai, UAE. Luxury and used car export from Dubai with vehicle sourcing, inspection, export paperwork and international car shipping.",
    keywords: [
      "car export company UAE",
      "car export from Dubai",
      "luxury car export",
      "used car export",
      "international car export",
      "export cars from Dubai",
      "vehicle sourcing Dubai",
      "vehicle inspection before export",
      "international car shipping",
      "car shipping from UAE",
      "container car shipping",
      "export documentation UAE",
    ],
  },
};

export type SiteConfig = typeof siteConfig;

/* ── Derived links (no need to edit) ─────────────────────────── */

export const links = {
  whatsapp: `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
    siteConfig.whatsapp.message,
  )}`,
  phone: `tel:${siteConfig.phone.dial}`,
  otherPhone: `tel:${siteConfig.otherPhone.dial}`,
  email: `mailto:${siteConfig.email}`,
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Export", href: "#our-export" },
  { label: "Contact", href: "#contact" },
] as const;
