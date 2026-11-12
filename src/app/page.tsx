import { links, siteConfig } from "@/config/site";
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

const brandName = `${siteConfig.logo.primary} ${siteConfig.logo.secondary}`;
const abs = (path: string) => new URL(path, siteConfig.siteUrl).toString();
const sameAs = Object.values(siteConfig.social).filter(Boolean);

/**
 * Structured data — only details the business has confirmed (name, owner,
 * phones, email, address, founding date). No ratings, reviews or opening hours.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutomotiveBusiness",
      "@id": abs("/#business"),
      name: brandName,
      legalName: siteConfig.businessName,
      description: siteConfig.seo.description,
      url: abs("/"),
      logo: abs("/logo.png"),
      image: abs("/og.jpg"),
      telephone: siteConfig.phone.dial,
      email: links.email.replace("mailto:", ""),
      foundingDate: siteConfig.established.iso,
      founder: { "@type": "Person", name: siteConfig.owner.name },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Meydan Grandstand, 6th Floor, Meydan Road",
        addressLocality: "Nad Al Sheba, Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      contactPoint: [siteConfig.phone.dial, siteConfig.otherPhone.dial].map((telephone) => ({
        "@type": "ContactPoint",
        telephone,
        contactType: "customer service",
      })),
      areaServed: "Worldwide",
      knowsAbout: [
        "Vehicle sourcing",
        "Vehicle inspection",
        "Export documentation",
        "International car shipping",
      ],
      hasMap: siteConfig.location.mapsUrl || undefined,
      sameAs: sameAs.length ? sameAs : undefined,
    },
    {
      "@type": "WebSite",
      "@id": abs("/#website"),
      url: abs("/"),
      name: brandName,
      publisher: { "@id": abs("/#business") },
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
