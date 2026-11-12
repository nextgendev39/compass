import { brandLogos } from "@/config/brands";
import { brandSymbolId } from "@/components/sections/brand-symbol";

/**
 * One small SVG per marquee logo (/brand-logos/brand-bmw.svg …), used as a
 * CSS mask so it takes the text colour. Being CSS images inside a
 * `content-visibility: auto` section, they are only fetched when the marquee
 * nears the viewport. Generated at build time.
 */
export function generateStaticParams() {
  return brandLogos.map((b) => ({ file: `${brandSymbolId(b.name)}.svg` }));
}

export async function GET(_req: Request, ctx: RouteContext<"/brand-logos/[file]">) {
  const { file } = await ctx.params;
  const brand = brandLogos.find((b) => `${brandSymbolId(b.name)}.svg` === file);
  if (!brand) return new Response("Not found", { status: 404 });
  const paths = brand.paths.map((d) => `<path fill-rule="evenodd" d="${d}"/>`).join("");
  return new Response(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${brand.viewBox}">${paths}</svg>`, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
