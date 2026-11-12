/** Shared id for a brand logo: /brand-logos/<id>.svg. */
export const brandSymbolId = (name: string) => `brand-${name.toLowerCase().replace(/[^a-z]+/g, "-")}`;
