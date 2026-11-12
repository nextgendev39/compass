import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.logo.primary} ${siteConfig.logo.secondary}`,
    short_name: siteConfig.logo.primary,
    description: siteConfig.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0b0c0e",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
