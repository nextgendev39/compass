# Compass Trading LLC FZ — Website

Single-page marketing site built with Next.js 16, TypeScript and Tailwind CSS v4.

## Edit business details

Everything (owner name, phone, WhatsApp, email, location, Google Maps link,
social links, SEO title/description) lives in **`src/config/site.ts`**.
Values in `[square brackets]` are placeholders — replace them before launch.

- `phone.dial` — digits for the click-to-call link, e.g. `+447700900123`
- `whatsapp.number` — digits only, country code first, e.g. `447700900123`
- `whatsapp.message` — the pre-filled WhatsApp enquiry text
- `location.mapsUrl` / `social.*` — leave `""` to hide
- `siteUrl` — the live domain, used for the canonical URL, Open Graph, `sitemap.xml` and `robots.txt`. Set `NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com` in the hosting environment (or edit the fallback in `site.ts`)

## Images

Photos are in `src/assets/images/` (optimised automatically by `next/image`): `black-lexus-lx-dubai.jpg` (About) and `shipping-port-containers.jpg` (Why Choose Us); hero stage photos in `hero/`, car cut-outs in `cars/`, and the "Vehicles We Export" gallery photos in `gallery/`. Gallery captions are edited in `src/components/sections/Gallery.tsx`.
Replace a file with one of the same name to swap it. `public/og.jpg` is the social share image.

## SEO, analytics and Search Console

Environment variables (see `.env.example`; set them in the hosting dashboard):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Live domain, e.g. `https://www.yourdomain.com`. Drives canonical, Open Graph, `sitemap.xml`, `robots.txt` and JSON-LD URLs. **Required before launch.** |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (`GTM-MDLJFDHV`). Loads GTM and pushes the CTA events below to the `dataLayer`. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (`G-…`). Analytics is fully off when empty. |
| `GOOGLE_SITE_VERIFICATION` | Search Console "HTML tag" token (only the `content` value). |
| `BING_SITE_VERIFICATION` | Bing Webmaster Tools token (optional). |

Redeploy after changing them (they are read at build time).

**Search Console setup**
1. In Google Search Console add a *URL prefix* property for the live domain.
2. Choose *HTML tag*, copy the `content="…"` value into `GOOGLE_SITE_VERIFICATION`, redeploy, then click *Verify*.
3. Open *Sitemaps* and submit `sitemap.xml` (full URL: `https://www.yourdomain.com/sitemap.xml`).
4. Use *URL inspection* on the home page and click *Request indexing*.
5. Optionally repeat in Bing Webmaster Tools (it can import from Search Console).

**Tracking events** (sent automatically once `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA_ID` is set; with GTM they arrive as dataLayer `event` names, so add a *Custom Event* trigger per name)

| Event | When | Parameters |
| --- | --- | --- |
| `whatsapp_click` | Any WhatsApp link clicked | `link_location` (header, footer or section id) |
| `phone_click` | Any `tel:` link clicked | `link_location`, `phone_number` |
| `email_click` | Any `mailto:` link clicked | `link_location` |
| `whatsapp_enquiry_submit` | Contact form "Send on WhatsApp" | `has_vehicle`, `has_destination` |

In GA4 → *Admin → Events*, mark `whatsapp_click`, `phone_click` and `whatsapp_enquiry_submit` as **key events** to report them as conversions.

**What's implemented**: page metadata (title, description, keywords), canonical URL, robots directives, `sitemap.xml` (with image), `robots.txt`, web manifest, Open Graph + Twitter cards (`public/og.jpg`, 1200×630), favicon/apple icon, JSON-LD (`Organization`, `AutomotiveBusiness`, `WebSite`, `WebPage`, confirmed details only, safely escaped) in `src/app/page.tsx`, AVIF/WebP images via `next/image`, lazy-loaded below-the-fold images, deferred 3D scene and analytics.

## Develop

```bash
npm install
npm run dev      # http://localhost:3006
npm run build && npm start
```

## Structure

```
src/
  config/site.ts          ← all business details
  app/                    ← layout (metadata, fonts), page (JSON-LD), sitemap, robots, manifest, brand-logos.svg
  lib/analytics.ts        ← trackEvent() helper
  components/
    layout/               ← Navbar, Footer, Logo, FloatingWhatsApp
    sections/             ← Hero, About, Services, WhyChooseUs, BrandMarquee, Gallery (Our Export), Contact
    ui/                   ← Buttons, SectionHeading, SectionBackdrop, SectionLink, Reveal
    analytics/            ← GA4 loader + CTA click tracking
    icons.tsx
```
