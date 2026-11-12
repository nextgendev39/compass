import Image from "next/image";
import aboutImage from "@/assets/images/red-ferrari-front.jpg";
import { siteConfig } from "@/config/site";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { SectionLink } from "@/components/ui/SectionLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EyeIcon, HeadsetIcon, ShieldCheckIcon } from "@/components/icons";

const pillars = [
  {
    icon: ShieldCheckIcon,
    title: "Reliability",
    text: "Clear timelines and consistent follow-through at every stage of your export.",
  },
  {
    icon: EyeIcon,
    title: "Transparency",
    text: "Straightforward quotes and honest updates — you always know where your vehicle is.",
  },
  {
    icon: HeadsetIcon,
    title: "Customer Satisfaction",
    text: "Personal, responsive support from first enquiry through to final delivery.",
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-ink py-24 sm:py-32"
    >
      <SectionBackdrop pattern="outline" tone="navy" glow="right" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-square overflow-hidden rounded-2xl sm:aspect-[4/5]">
            <Image
              src={aboutImage}
              alt="Red Ferrari supercar with white racing stripes, front view"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_60%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
            />
          </div>
          {/* Gold frame accent */}
          <div
            aria-hidden="true"
            className="absolute -right-4 -bottom-4 -z-10 hidden h-full w-full rounded-2xl border border-chrome/30 sm:block"
          />
          <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-ink/70 p-5 backdrop-blur-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-chrome">
              Est. {siteConfig.established.label} · {siteConfig.location.short}
            </p>
            <p className="mt-2 font-display text-xl text-ivory">
              From Dubai to your destination, handled with care.
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading
            id="about-title"
            eyebrow="About Us"
            title={
              <>
                Exporting vehicles, <br className="hidden sm:block" />
                <span className="text-chrome-gradient italic">without the complexity.</span>
              </>
            }
          />

          <Reveal delay={100}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-mist sm:text-lg">
              <p>
                {siteConfig.businessName} is a Dubai-based vehicle export
                company, established in {siteConfig.established.label} and
                operating from Meydan Grandstand in Nad Al Sheba. We help
                private buyers, dealers and businesses source vehicles in the
                UAE and ship them abroad with confidence.
              </p>
              <p>
                Whether it&rsquo;s a luxury car export or a used car export,
                a Lexus LX, a Toyota Land Cruiser or another model, we take care of the details that make
                international car exports feel complicated: finding the right
                vehicle, checking its condition, preparing the paperwork and
                arranging shipping to your destination. You get a single point
                of contact who keeps you informed at every step.
              </p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={150 + i * 100}>
                <div className="h-full border-t border-chrome/40 pt-6">
                  <Icon className="size-7 text-chrome" />
                  <h3 className="mt-4 font-display text-2xl text-ivory">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <SectionLink href="#services" className="mt-10">
            Explore our car export services
          </SectionLink>
        </div>
      </div>
    </section>
  );
}
