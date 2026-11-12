import Script from "next/script";
import { GTM_ID } from "@/lib/analytics";

/**
 * Google Tag Manager. The dataLayer and `gtm.start` are set immediately (so
 * page timing and any early events are kept), but gtm.js itself is fetched
 * after the page has loaded and gone idle — or on the visitor's first
 * interaction, whichever comes first — so it never delays the first paint.
 * Renders nothing until NEXT_PUBLIC_GTM_ID is set.
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null;
  const id = JSON.stringify(GTM_ID);
  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var done=false,ev=['pointerdown','keydown','scroll','touchstart'];function load(){if(done)return;done=true;ev.forEach(function(e){w.removeEventListener(e,load,true)});var j=d.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;d.head.appendChild(j);}ev.forEach(function(e){w.addEventListener(e,load,{capture:true,passive:true,once:true})});function idle(){setTimeout(function(){(w.requestIdleCallback||setTimeout)(load)},2500)}if(d.readyState==='complete')idle();else w.addEventListener('load',idle,{once:true});})(window,document,'dataLayer',${id});`}
    </Script>
  );
}

/** GTM fallback for visitors with JavaScript disabled; goes first inside <body>. */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(GTM_ID)}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
