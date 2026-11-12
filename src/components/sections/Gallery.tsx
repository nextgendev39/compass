import Image, { type StaticImageData } from "next/image";
import civicFront from "@/assets/images/gallery/civic-type-r-front.jpg";
import civicRearQuarter from "@/assets/images/gallery/civic-type-r-rear-quarter.jpg";
import civicRearLeft from "@/assets/images/gallery/civic-type-r-rear-left.jpg";
import civicRear from "@/assets/images/gallery/civic-type-r-rear.jpg";
import civicCabin from "@/assets/images/gallery/civic-type-r-cabin.jpg";
import civicBadge from "@/assets/images/gallery/civic-type-r-badge.jpg";
import s65FrontDowntown from "@/assets/images/gallery/s65-amg-front-downtown.jpg";
import s65FrontQuarter from "@/assets/images/gallery/s65-amg-front-quarter.jpg";
import s65RearStraight from "@/assets/images/gallery/s65-amg-rear-straight.jpg";
import s65RearQuarter from "@/assets/images/gallery/s65-amg-rear-quarter.jpg";
import s65RearTower from "@/assets/images/gallery/s65-amg-rear-tower.jpg";
import s65Profile from "@/assets/images/gallery/s65-amg-profile.jpg";
import s65Cockpit from "@/assets/images/gallery/s65-amg-cockpit.jpg";
import s65RearCabin from "@/assets/images/gallery/s65-amg-rear-cabin.jpg";
import s65Console from "@/assets/images/gallery/s65-amg-console.jpg";
import s65Wheel from "@/assets/images/gallery/s65-amg-wheel.jpg";
import s65FrontSeats from "@/assets/images/gallery/s65-amg-front-seats.jpg";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/Buttons";
import "./gallery.css";

const S65 = "Mercedes-Benz S65 AMG";
const CIVIC = "Honda Civic Type R";

type Shot = {
  image: StaticImageData;
  car: string;
  view: string;
  alt: string;
  /** Tile shape in the bento grid. */
  shape?: "big" | "tall" | "wide";
  position?: string;
};

/**
 * Exterior shots as a bento grid. On 4 columns the order below packs into
 * six full rows (big · tall · tall / wide · wide / tall · big · tall /
 * wide · wide); on 2 columns dense packing fills the gaps.
 */
const exterior: Shot[] = [
  { image: s65FrontQuarter, car: S65, view: "Front three-quarter", shape: "big", alt: "Black Mercedes-Benz S65 AMG, front three-quarter view, in Downtown Dubai" },
  { image: civicFront, car: CIVIC, view: "Doors & tailgate open", shape: "tall", alt: "Blue Honda Civic Type R from the front with all doors and the tailgate open" },
  { image: s65FrontDowntown, car: S65, view: "Front, Burj Khalifa", shape: "tall", position: "object-[50%_70%]", alt: "Black Mercedes-Benz S65 AMG from the front with the Burj Khalifa behind" },
  { image: civicRearQuarter, car: CIVIC, view: "Rear three-quarter", shape: "wide", alt: "Blue Honda Civic Type R, rear three-quarter view with its rear wing" },
  { image: s65RearQuarter, car: S65, view: "Rear three-quarter", shape: "wide", alt: "Black Mercedes-Benz S65 AMG, rear three-quarter view in front of glass towers" },
  { image: s65RearTower, car: S65, view: "Rear, city towers", shape: "tall", position: "object-[50%_75%]", alt: "Black Mercedes-Benz S65 AMG from the rear, framed by tall towers" },
  { image: civicRearLeft, car: CIVIC, view: "Rear quarter", shape: "big", alt: "Blue Honda Civic Type R, rear quarter view under a carport" },
  { image: s65RearStraight, car: S65, view: "Rear", shape: "tall", position: "object-[50%_70%]", alt: "Black Mercedes-Benz S65 AMG straight from the rear, with quad exhausts" },
  { image: s65Profile, car: S65, view: "Profile", shape: "wide", position: "object-[50%_62%]", alt: "Black Mercedes-Benz S65 AMG in side profile" },
  { image: civicRear, car: CIVIC, view: "Rear", shape: "wide", alt: "Blue Honda Civic Type R straight from the rear, showing triple exhausts" },
];

/** Interior and detail shots for the scrolling strip. */
const details: Shot[] = [
  { image: s65Cockpit, car: S65, view: "Cockpit", alt: "Mercedes-Benz S65 AMG cockpit with wood-trimmed steering wheel" },
  { image: civicCabin, car: CIVIC, view: "Red bucket seats", alt: "Honda Civic Type R cabin with red sports seats" },
  { image: s65Wheel, car: S65, view: "AMG wheel", alt: "Mercedes-Benz S65 AMG five-spoke wheel with drilled brake disc" },
  { image: s65RearCabin, car: S65, view: "Rear cabin", alt: "Mercedes-Benz S65 AMG rear cabin with headrest screens" },
  { image: civicBadge, car: CIVIC, view: "Type R badge", alt: "Type R badge on the blue Honda Civic's tailgate" },
  { image: s65FrontSeats, car: S65, view: "Front seats", alt: "Mercedes-Benz S65 AMG front seats in black leather" },
  { image: s65Console, car: S65, view: "Centre console", alt: "Mercedes-Benz S65 AMG centre console with wood trim and V12 badge" },
];

const shapeClass = {
  big: "gallery-big",
  tall: "gallery-tall",
  wide: "gallery-wide",
} as const;

function Caption({ shot }: { shot: Shot }) {
  return (
    <figcaption className="gallery-caption">
      <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold-light">
        {shot.view}
      </span>
      <span className="mt-1 block font-display text-lg leading-tight text-ivory sm:text-xl">
        {shot.car}
      </span>
    </figcaption>
  );
}

export function Gallery() {
  return (
    <section
      id="our-export"
      aria-labelledby="gallery-title"
      className="relative isolate overflow-hidden bg-ink py-24 sm:py-32"
    >
      <SectionBackdrop pattern="lines" tone="navy" glow="left" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="gallery-title"
            eyebrow="Vehicles We Export"
            title={
              <>
                Our Exported{" "}
                <span className="text-chrome-gradient italic">Vehicles.</span>
              </>
            }
          />
          <Reveal delay={100} className="max-w-md">
            <p className="text-base leading-relaxed text-mist">
              From performance hatchbacks to flagship luxury saloons, a look at
              some of the vehicles that have passed through our hands.
            </p>
          </Reveal>
        </div>

        <ul className="gallery-grid mt-14">
          {exterior.map((shot, i) => (
            <Reveal
              as="li"
              key={shot.alt}
              delay={(i % 4) * 90}
              className={shot.shape ? shapeClass[shot.shape] : ""}
            >
              <figure className="gallery-tile group">
                <Image
                  src={shot.image}
                  alt={shot.alt}
                  fill
                  placeholder="blur"
                  sizes={
                    shot.shape === "big" || shot.shape === "wide"
                      ? "(min-width: 1024px) 50vw, 100vw"
                      : "(min-width: 1024px) 25vw, 50vw"
                  }
                  className={`gallery-img object-cover ${shot.position ?? "object-center"}`}
                />
                <Caption shot={shot} />
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Interior & detail strip: drifts sideways, pauses on hover, swipeable */}
      <Reveal className="mt-20">
        <div className="mx-auto mb-6 flex max-w-7xl items-center gap-4 px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-chrome">
            Inside the details
          </p>
          <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
        </div>
        <div className="gallery-strip">
          <ul className="gallery-strip-track">
            {[0, 1].map((copy) =>
              details.map((shot) => (
                <li
                  key={`${copy}-${shot.alt}`}
                  className="gallery-strip-item"
                  aria-hidden={copy === 1 || undefined}
                >
                  <figure className="gallery-tile group h-full">
                    <Image
                      src={shot.image}
                      alt={copy === 1 ? "" : shot.alt}
                      fill
                      sizes="(min-width: 640px) 26rem, 80vw"
                      className="gallery-img object-cover"
                    />
                    <Caption shot={shot} />
                  </figure>
                </li>
              )),
            )}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={150} className="mt-14 flex flex-col items-center gap-4 px-5 text-center">
        <p className="text-sm text-mist">Want a vehicle like these shipped to you?</p>
        <WhatsAppButton size="md">Ask About a Vehicle</WhatsAppButton>
      </Reveal>
    </section>
  );
}
