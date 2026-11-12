import type { Metadata, Viewport } from "next";
import { Barlow, Michroma, Saira } from "next/font/google";
import { siteConfig } from "@/config/site";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/GoogleTagManager";
import { CtaTracking } from "@/components/analytics/CtaTracking";
import { GA_ID, GTM_ID } from "@/lib/analytics";
import "./globals.css";

// Automotive type: Saira (headings, dashboard-style), Barlow (body, DIN-like
// signage feel), Michroma (wide wordmark, matches the logo lettering).
const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  // Body copy swaps in; only the headline font (Saira) is preloaded for LCP.
  preload: false,
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  applicationName: `${siteConfig.logo.primary} ${siteConfig.logo.secondary}`,
  authors: [{ name: siteConfig.businessName, url: siteConfig.siteUrl }],
  creator: siteConfig.businessName,
  publisher: siteConfig.businessName,
  category: "automotive",
  alternates: { canonical: "/" },
  // Phone numbers are already proper tel: links; stop iOS re-styling other digits.
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "/",
    siteName: `${siteConfig.logo.primary} ${siteConfig.logo.secondary}`,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.logo.primary} ${siteConfig.logo.secondary}: international car export from Dubai`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: ["/og.jpg"],
  },
  // Search Console / Bing ownership tags, set in the hosting environment.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${saira.variable} ${barlow.variable} ${michroma.variable} antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla, Grammarly)
          inject attributes on <body> before React hydrates. Only affects this tag. */}
      <body className="min-h-screen font-sans" suppressHydrationWarning>
        <GoogleTagManagerNoScript />
        {children}
        <GoogleTagManager />
        <GoogleAnalytics />
        {(GTM_ID || GA_ID) && <CtaTracking />}
      </body>
    </html>
  );
}
