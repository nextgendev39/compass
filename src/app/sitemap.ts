import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// One-page site: the sections are anchors on "/", so only the home URL is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
