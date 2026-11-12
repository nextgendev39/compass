import type { ComponentType, ReactNode, SVGProps } from "react";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { links, siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { EnquiryForm } from "./EnquiryForm";
import "./contact.css";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export function Contact() {
  const { owner, businessName, phone, otherPhone, whatsapp, email, location } = siteConfig;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-ink py-24 sm:py-32"
    >
      <SectionBackdrop pattern="routes" tone="navy" glow="right" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + who you'll be talking to */}
          <div className="lg:col-span-5 lg:pt-4">
            <SectionHeading
              id="contact-title"
              eyebrow="Contact Us"
              title={
                <>
                  Let&rsquo;s get your vehicle{" "}
                  <span className="text-chrome-gradient italic">on its way.</span>
                </>
              }
              intro="Tell us about the vehicle and where it's going. The quickest way to reach us is WhatsApp, and we reply personally."
            />

            <Reveal delay={150} className="mt-10">
              <div className="contact-owner">
                <span className="contact-owner-avatar" aria-hidden="true">
                  {owner.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-light">
                    Owner
                  </span>
                  <span className="mt-0.5 block font-display text-xl text-ivory">{owner.name}</span>
                  <span className="block text-sm text-mist">{businessName}</span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right: WhatsApp enquiry builder */}
          <Reveal delay={100} className="lg:col-span-7">
            <EnquiryForm />
          </Reveal>
        </div>

        {/* Direct lines */}
        <address className="mt-14 grid gap-4 not-italic sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          <ContactCard
            icon={WhatsAppIcon}
            accent="whatsapp"
            label="WhatsApp"
            delay={0}
            action={{ href: links.whatsapp, text: "Chat now", external: true }}
          >
            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-value">
              {whatsapp.display}
            </a>
          </ContactCard>

          <ContactCard icon={PhoneIcon} label="Call Us" delay={80}>
            <a href={links.phone} className="contact-value">
              {phone.display}
            </a>
            <a href={links.otherPhone} className="contact-value contact-value-sub">
              {otherPhone.display}
            </a>
          </ContactCard>

          <ContactCard
            icon={MailIcon}
            label="Email"
            delay={160}
            action={{ href: links.email, text: "Send an email" }}
          >
            <a href={links.email} className="contact-value [overflow-wrap:anywhere]">
              {email}
            </a>
          </ContactCard>

          <ContactCard
            icon={MapPinIcon}
            label="Office"
            delay={240}
            action={
              location.mapsUrl ? { href: location.mapsUrl, text: "Get directions", external: true } : undefined
            }
          >
            <span className="block text-[15px] leading-relaxed text-ivory/90">
              {location.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </span>
          </ContactCard>
        </address>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  accent,
  action,
  delay,
  children,
}: {
  icon: Icon;
  label: string;
  accent?: "whatsapp";
  action?: { href: string; text: string; external?: boolean };
  delay: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="contact-card group" data-accent={accent}>
        <span className="contact-card-icon">
          <Icon className="size-5" />
        </span>
        <span className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.25em] text-mist">{label}</span>
        <div className="mt-2 flex-1">{children}</div>
        {action && (
          <a
            href={action.href}
            {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="contact-card-action"
          >
            {action.text}
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        )}
      </div>
    </Reveal>
  );
}
