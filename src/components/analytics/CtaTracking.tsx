"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * One delegated click listener for the whole page: every WhatsApp, phone and
 * email link is tracked without touching the components that render them.
 * GA4 events: whatsapp_click, phone_click, email_click (with link_location).
 */
export function CtaTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const location = a.closest("header")
        ? "header"
        : a.closest("footer")
          ? "footer"
          : a.closest("section")?.id || "page";
      if (href.includes("wa.me/")) trackEvent("whatsapp_click", { link_location: location });
      else if (href.startsWith("tel:")) trackEvent("phone_click", { link_location: location, phone_number: href.slice(4) });
      else if (href.startsWith("mailto:")) trackEvent("email_click", { link_location: location });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
