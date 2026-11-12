import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { SectionLink } from "@/components/ui/SectionLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  DocumentIcon,
  GlobeIcon,
  InspectIcon,
  SearchCarIcon,
  ShipIcon,
  TruckIcon,
} from "@/components/icons";

export const services = [
  {
    icon: GlobeIcon,
    title: "International Car Export",
    text: "End-to-end export support from the UAE for single vehicles or multiple units, tailored to your destination country's requirements.",
  },
  {
    icon: SearchCarIcon,
    title: "Vehicle Sourcing",
    text: "Tell us the make, model, budget and specification you want. We search the UAE market, shortlist options and secure the right vehicle for you.",
  },
  {
    icon: InspectIcon,
    title: "Vehicle Inspection",
    text: "Pre-purchase checks on condition, history and documentation, with photos and clear reporting before you commit.",
  },
  {
    icon: DocumentIcon,
    title: "Export Documentation",
    text: "Preparation and handling of the paperwork needed to export your vehicle, so nothing holds it up at the port.",
  },
  {
    icon: ShipIcon,
    title: "Shipping & Logistics",
    text: "Container or RoRo shipping arranged with trusted carriers, with updates from booking through to arrival.",
  },
  {
    icon: TruckIcon,
    title: "Door-to-Port Delivery",
    text: "Collection from the seller anywhere in the UAE and safe transport to the departure port, ready for loading.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative isolate overflow-hidden bg-charcoal py-24 sm:py-32"
    >
      <SectionBackdrop pattern="containers" tone="charcoal" glow="left" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-chrome/40 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Our Services"
            title={
              <>
                Everything your export needs,{" "}
                <span className="text-chrome-gradient italic">in one place.</span>
              </>
            }
          />
          <Reveal delay={100} className="max-w-md">
            <p className="text-base leading-relaxed text-mist">
              From finding the right car to getting it on the ship, every step
              is coordinated for you — so you deal with one trusted partner
              instead of many.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 100} className="bg-charcoal">
              <article className="group relative h-full p-8 transition-colors duration-500 hover:bg-graphite sm:p-10">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-chrome-dark via-chrome-light to-chrome transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <span className="flex size-14 items-center justify-center rounded-full border border-chrome/30 bg-chrome/5 text-chrome transition-colors duration-500 group-hover:border-chrome group-hover:bg-chrome group-hover:text-ink">
                    <Icon className="size-6" />
                  </span>
                  <span className="font-display text-3xl text-white/10 transition-colors duration-500 group-hover:text-chrome/40">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-[1.75rem] leading-tight text-ivory">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mist">
                  {text}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <SectionLink href="#why-us" className="mt-12 text-center">
          Why customers export with us
        </SectionLink>
      </div>
    </section>
  );
}
