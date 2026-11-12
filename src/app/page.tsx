import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Contact } from "@/components/sections/Contact";

const brandName = siteConfig.searchName;
// Other names people may search for: legal name and the logo wordmark.
const alternateName = [
  siteConfig.businessName,
  `${siteConfig.logo.primary} ${siteConfig.logo.secondary}`,
];
const abs = (path: string) => new URL(path, siteConfig.siteUrl).toString();
const sameAs = Object.values(siteConfig.social).filter(Boolean);

/**
 * Structured data — only details the business has confirmed (name, owner,
 * phones, email, address, founding date). No ratings, reviews or opening hours.
 */
const contactPoints = [siteConfig.phone.dial, siteConfig.otherPhone.dial].map((telephone) => ({
  "@type": "ContactPoint",
  telephone,
  contactType: "customer service",
  areaServed: "Worldwide",
  availableLanguage: "en",
}));

const address = {
  "@type": "PostalAddress",
  streetAddress: "Meydan Grandstand, 6th Floor, Meydan Road",
  addressLocality: "Nad Al Sheba, Dubai",
  addressRegion: "Dubai",
  addressCountry: "AE",
};

/**
 * Structured data — only details the business has confirmed (names, owner,
 * phones, email, address, founding date). No ratings, reviews, hours or geo.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": abs("/#organization"),
      name: brandName,
      alternateName,
      legalName: siteConfig.businessName,
      url: abs("/"),
      logo: { "@type": "ImageObject", url: abs("/logo.png") },
      email: siteConfig.email,
      foundingDate: siteConfig.established.iso,
      founder: { "@type": "Person", name: siteConfig.owner.name },
      address,
      contactPoint: contactPoints,
      sameAs: sameAs.length ? sameAs : undefined,
    },
    {
      // AutomotiveBusiness is a LocalBusiness subtype.
      "@type": "AutomotiveBusiness",
      "@id": abs("/#business"),
      name: brandName,
      alternateName,
      description: siteConfig.seo.description,
      url: abs("/"),
      image: abs("/og.jpg"),
      logo: abs("/logo.png"),
      telephone: siteConfig.phone.dial,
      email: siteConfig.email,
      address,
      hasMap: siteConfig.location.mapsUrl || undefined,
      areaServed: "Worldwide",
      parentOrganization: { "@id": abs("/#organization") },
      knowsAbout: [
        "Car export from Dubai",
        "Vehicle sourcing",
        "Vehicle inspection",
        "Export documentation",
        "International car shipping",
      ],
    },
    {
      "@type": "WebSite",
      "@id": abs("/#website"),
      url: abs("/"),
      name: brandName,
      alternateName,
      inLanguage: "en",
      publisher: { "@id": abs("/#organization") },
    },
    {
      "@type": "WebPage",
      "@id": abs("/#webpage"),
      url: abs("/"),
      name: siteConfig.seo.title,
      description: siteConfig.seo.description,
      isPartOf: { "@id": abs("/#website") },
      about: { "@id": abs("/#business") },
      primaryImageOfPage: abs("/og.jpg"),
      inLanguage: "en",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-chrome focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <BrandMarquee />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
