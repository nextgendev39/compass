/** GA4 measurement ID, e.g. "G-XXXXXXXXXX". Off when unset. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
/** Google Tag Manager container ID, e.g. "GTM-XXXXXXX". Off when unset. */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Sends a tracking event to whichever Google tag is installed:
 * - GTM: pushed to the dataLayer as `{ event: name, ...params }` (use a
 *   Custom Event trigger with the same name in Tag Manager).
 * - GA4 (gtag.js): sent directly as a GA4 event.
 * A no-op when neither is configured.
 */
export function trackEvent(name: string, params?: GtagParams) {
  if (typeof window === "undefined") return;
  if (GTM_ID) (window.dataLayer ??= []).push({ event: name, ...params });
  if (GA_ID && window.gtag) window.gtag("event", name, params);
}
