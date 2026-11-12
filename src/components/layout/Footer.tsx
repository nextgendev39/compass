import { links, navItems, siteConfig } from "@/config/site";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/icons";
import { services } from "@/components/sections/Services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Logo } from "./Logo";
import "./footer.css";

const socialIcons = {
  facebook: { icon: FacebookIcon, label: "Facebook" },
  instagram: { icon: InstagramIcon, label: "Instagram" },
  linkedin: { icon: LinkedInIcon, label: "LinkedIn" },
  youtube: { icon: YouTubeIcon, label: "YouTube" },
  tiktok: { icon: TikTokIcon, label: "TikTok" },
} as const;

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="footer-col-title">{children}</h2>;
}

export function Footer() {
  const socials = (
    Object.entries(siteConfig.social) as [keyof typeof socialIcons, string][]
  ).filter(([, url]) => url);

  const contactLinks = [
    { icon: PhoneIcon, label: siteConfig.phone.display, href: links.phone },
    { icon: PhoneIcon, label: siteConfig.otherPhone.display, href: links.otherPhone },
    { icon: WhatsAppIcon, label: `WhatsApp ${siteConfig.whatsapp.display}`, href: links.whatsapp, external: true },
    { icon: MailIcon, label: siteConfig.email, href: links.email },
  ];

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/5 bg-charcoal">
      <SectionBackdrop pattern="lines" tone="charcoal" glow="center" />
      {/* gold hairline across the top */}
      <div aria-hidden="true" className="footer-topline" />

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-5 pt-20 pb-14 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">{siteConfig.shortDescription}</p>
          <p className="footer-badge mt-6">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            Est. {siteConfig.established.label} &middot; {siteConfig.location.short}
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {socials.map(([key, url]) => {
                const { icon: Icon, label } = socialIcons[key];
                return (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="footer-social">
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Explore */}
        <nav aria-label="Footer" className="col-span-1 lg:col-span-2">
          <ColumnTitle>Explore</ColumnTitle>
          <ul className="mt-6 space-y-3.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="footer-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <div className="lg:col-span-3">
          <ColumnTitle>Services</ColumnTitle>
          <ul className="mt-6 space-y-3.5">
            {services.map((s) => (
              <li key={s.title}>
                <a href="#services" className="footer-link">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 lg:col-span-3">
          <ColumnTitle>Get in Touch</ColumnTitle>
          <ul className="mt-6 space-y-3.5">
            {contactLinks.map(({ icon: Icon, label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="footer-link inline-flex items-center gap-3"
                >
                  <Icon className={`size-4 shrink-0 ${Icon === WhatsAppIcon ? "text-whatsapp" : "text-gold-light"}`} />
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.location.mapsUrl || "#contact"}
                {...(siteConfig.location.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="footer-link inline-flex items-start gap-3"
              >
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-gold-light" />
                <span>{siteConfig.location.lines.join(", ")}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Signature wordmark: wipes in, then a slow chrome-to-gold sheen */}
      <Reveal className="footer-brand-wrap">
        <p className="footer-brand">{siteConfig.logo.primary}</p>
        <p className="footer-brand-sub">
          <span aria-hidden="true" />
          {siteConfig.logo.secondary} &middot; {siteConfig.location.short}
          <span aria-hidden="true" />
        </p>
      </Reveal>

      <div className="border-t border-white/5 bg-ink/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            &copy; <CopyrightYear /> {siteConfig.businessName}. All rights reserved.
          </p>
          <a href="#home" className="footer-top-link group">
            Back to top
            <span className="footer-top-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
