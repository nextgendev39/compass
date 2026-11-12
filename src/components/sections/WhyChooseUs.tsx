import Image from "next/image";
import portImage from "@/assets/images/shipping-port-containers.jpg";
import { SectionLink } from "@/components/ui/SectionLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  EyeIcon,
  GlobeIcon,
  HeadsetIcon,
  ShieldCheckIcon,
  TagIcon,
} from "@/components/icons";

const reasons = [
  {
    icon: ShieldCheckIcon,
    title: "Trusted Export Service",
    text: "Careful handling of your vehicle and your money, with every step agreed up front.",
  },
  {
    icon: TagIcon,
    title: "Competitive Pricing",
    text: "Fair, clearly itemised quotes with no hidden extras added along the way.",
  },
  {
    icon: EyeIcon,
    title: "Transparent Process",
    text: "Regular updates, photos and documents shared with you as your export progresses.",
  },
  {
    icon: GlobeIcon,
    title: "Global Shipping Support",
    text: "Shipping arranged to destinations around the world, matched to your timeline and budget.",
  },
  {
    icon: HeadsetIcon,
    title: "Professional Assistance",
    text: "Direct access to a dedicated contact by phone, WhatsApp or email whenever you need it.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-title"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <Image
        src={portImage}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal via-ink/90 to-ink"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="why-title"
          align="center"
          eyebrow="Why Choose Us"
          title={
            <>
              Built on trust, <span className="text-chrome-gradient italic">driven by service.</span>
            </>
          }
          intro="Exporting a vehicle is a significant decision. Here's what you can expect when you work with us."
        />

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 90}
              className={`lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""} ${
                i === 4 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="group h-full rounded-2xl border border-white/10 bg-ink/60 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-chrome/50">
                <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-chrome-light to-chrome-dark text-ink shadow-lg shadow-chrome/10">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-2xl text-ivory">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mist">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <SectionLink href="#our-export" className="mt-12 text-center">
          See vehicles we have exported
        </SectionLink>
      </div>
    </section>
  );
}
