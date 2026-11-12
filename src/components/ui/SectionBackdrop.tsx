import "./backdrop.css";

export type BackdropPattern = "lines" | "containers" | "road" | "routes" | "outline";

type Props = {
  /** Automotive / export motif drawn faintly over the section. */
  pattern: BackdropPattern;
  /** Base colour wash: deep navy or dark charcoal. */
  tone?: "navy" | "charcoal";
  /** Where the soft gold light sits. */
  glow?: "left" | "right" | "center";
};

/**
 * Decorative section background: a dark navy/charcoal gradient, one faint
 * pattern (vehicle outline, road, shipping routes, containers or geometric
 * lines), a soft gold glow and fine grain. Pure CSS/SVG — no images to load.
 * Place it as the first child of a `relative isolate` section.
 */
export function SectionBackdrop({ pattern, tone = "charcoal", glow = "right" }: Props) {
  return (
    <div aria-hidden="true" className="backdrop" data-tone={tone} data-glow={glow}>
      <div className={`backdrop-pattern backdrop-${pattern}`} />
      <div className="backdrop-grain" />
    </div>
  );
}
