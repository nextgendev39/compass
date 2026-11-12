import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Serve AVIF where supported, WebP otherwise (next/image picks per browser).
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  // Lets DevTools / Lighthouse map production JS back to source (fetched only by DevTools).
  productionBrowserSourceMaps: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
