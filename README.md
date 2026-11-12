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
  app/                    ← layout (metadata, fonts) + page
  components/
    layout/               ← Navbar, Footer, Logo, FloatingWhatsApp
    sections/             ← Hero, About, Services, WhyChooseUs, BrandMarquee, Gallery (Our Export), Contact
    ui/                   ← Buttons, SectionHeading, Reveal (scroll animation)
    icons.tsx
```
