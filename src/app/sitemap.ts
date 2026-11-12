import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import aboutFerrari from "@/assets/images/red-ferrari-front.jpg";
import s65 from "@/assets/images/gallery/s65-amg-front-quarter.jpg";
import ferrariRed from "@/assets/images/gallery/ferrari-red-rear-quarter.jpg";
import gClass from "@/assets/images/gallery/mercedes-g-class-black-orange.jpg";
import ferrari812 from "@/assets/images/gallery/ferrari-812-superfast-white.jpg";
import civic from "@/assets/images/gallery/civic-type-r-rear-quarter.jpg";
import ferrariBlack from "@/assets/images/gallery/ferrari-black-rear-quarter.jpg";

// Vehicle photos shown on the page, listed so Google Images can index them.
// Static imports resolve to the hashed /_next/static/media/... URLs of this build.
const vehiclePhotos = [aboutFerrari, s65, ferrariRed, gClass, ferrari812, civic, ferrariBlack];

// One-page site: the sections are anchors on "/", so only the home URL is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  return [
    {
      url: `${base}/`,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${base}/og.jpg`, ...vehiclePhotos.map((img) => `${base}${img.src}`)],
    },
  ];
}
