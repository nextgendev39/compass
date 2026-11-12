import Image, { type StaticImageData } from "next/image";
import s65 from "@/assets/images/gallery/s65-amg-front-quarter.jpg";
import ferrariRed from "@/assets/images/gallery/ferrari-red-rear-quarter.jpg";
import ferrari812 from "@/assets/images/gallery/ferrari-812-superfast-white.jpg";
import civic from "@/assets/images/gallery/civic-type-r-rear-quarter.jpg";
import gClass from "@/assets/images/gallery/mercedes-g-class-black-orange.jpg";
import ferrariBlack from "@/assets/images/gallery/ferrari-black-rear-quarter.jpg";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/Buttons";
import "./gallery.css";

type Shot = {
  image: StaticImageData;
  /** Make and model, only where the model is certain from the photo. */
  car: string;
  /** Colour / setting shown above the name. */
  view: string;
  alt: string;
  /** Tile shape in the bento grid. */
  shape?: "big" | "tall" | "wide";
  position?: string;
};

/**
 * One photo per vehicle — no car appears twice. On 4 columns this packs into
 * three full rows (big · tall · tall, then single · single · wide).
 * On 2 columns: big, tall · tall, single · single, wide.
 */
const vehicles: Shot[] = [
  { image: s65, car: "Mercedes-Benz S65 AMG", view: "Black · Dubai", shape: "big", alt: "Black Mercedes-Benz S65 AMG, front three-quarter view, in Downtown Dubai" },
  { image: ferrariRed, car: "Ferrari", view: "Red", shape: "tall", position: "object-[50%_82%]", alt: "Red Ferrari with white racing stripes, rear three-quarter view" },
  { image: gClass, car: "Mercedes-Benz G-Class", view: "Black · Orange accents", shape: "tall", position: "object-[50%_88%]", alt: "Black Mercedes-Benz G-Class with orange-trimmed wheels and orange interior, front three-quarter view" },
  { image: ferrari812, car: "Ferrari 812 Superfast", view: "White", alt: "White Ferrari 812 Superfast, front three-quarter view" },
  { image: civic, car: "Honda Civic Type R", view: "Blue", alt: "Blue Honda Civic Type R, rear three-quarter view with its rear wing" },
  { image: ferrariBlack, car: "Ferrari", view: "Black", shape: "wide", position: "object-[50%_65%]", alt: "Black Ferrari with yellow brake calipers, rear three-quarter view" },
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
              From supercars and performance SUVs to luxury saloons and hot
              hatches, a few of the vehicles that have passed through our hands.
            </p>
          </Reveal>
        </div>

        <ul className="gallery-grid mt-14">
          {vehicles.map((shot, i) => (
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

      <Reveal delay={150} className="mt-16 flex flex-col items-center gap-4 px-5 text-center">
        <p className="text-sm text-mist">Want a vehicle like these shipped to you?</p>
        <WhatsAppButton size="md">Ask About a Vehicle</WhatsAppButton>
      </Reveal>
    </section>
  );
}
