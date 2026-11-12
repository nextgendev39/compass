import { brandLogos, type BrandLogo } from "@/config/brands";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { brandSymbolId } from "./brand-symbol";
import "./marquee.css";

// Each row gets its own brands, so a logo is never on screen in both rows at once.
const half = Math.ceil(brandLogos.length / 2);
const rows: { brands: BrandLogo[]; reverse: boolean; duration: string }[] = [
  { brands: brandLogos.slice(0, half), reverse: false, duration: "48s" },
  { brands: brandLogos.slice(half), reverse: true, duration: "54s" },
];

/** One logo + its name. The logo is a lazily fetched SVG mask (see marquee.css). */
function BrandItem({ brand }: { brand: BrandLogo }) {
  return (
    <li className="marquee-item">
      <span
        className="marquee-logo"
        aria-hidden="true"
        style={{ "--logo": `url(/brand-logos/${brandSymbolId(brand.name)}.svg)` } as React.CSSProperties}
      />
      <span className="marquee-name">{brand.name}</span>
    </li>
  );
}

export function BrandMarquee() {
  return (
    <section
      id="brands"
      aria-labelledby="brands-title"
      className="relative isolate overflow-hidden border-y border-white/5 bg-charcoal py-16 sm:py-20"
    >
      <SectionBackdrop pattern="road" tone="charcoal" glow="center" />

      <Reveal className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-chrome">
          <span className="h-px w-8 bg-chrome/70" aria-hidden="true" />
          Makes We Export
          <span className="h-px w-8 bg-chrome/70" aria-hidden="true" />
        </p>
        <h2
          id="brands-title"
          className="mt-4 font-display text-2xl font-semibold text-ivory sm:text-3xl"
        >
          From everyday favourites to{" "}
          <span className="text-chrome-gradient italic">the world&rsquo;s finest marques.</span>
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-col gap-6 sm:gap-8">
        {rows.map((row, r) => (
          <div
            key={r}
            className="marquee"
            aria-hidden="true"
            data-reverse={row.reverse}
            style={{ "--duration": row.duration } as React.CSSProperties}
          >
            {/* Decorative; the names are listed for screen readers below. Two identical copies: the track slides by exactly one copy, then loops. */}
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <ul key={copy} className="marquee-group">
                  {/* Each copy holds the row twice so it always outruns wide screens */}
                  {[...row.brands, ...row.brands].map((b, i) => (
                    <BrandItem key={`${b.name}-${i}`} brand={b} />
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="sr-only">
        Brands include {brandLogos.map((b) => b.name).join(", ")}.
      </p>
    </section>
  );
}
