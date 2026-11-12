import Script from "next/script";
import { GA_ID } from "@/lib/analytics";

/**
 * Google Analytics 4, loaded once the page has finished loading so it never
 * competes with the hero for bandwidth. Renders nothing until
 * NEXT_PUBLIC_GA_ID is set.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="ga4-init" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
      </Script>
    </>
  );
}
