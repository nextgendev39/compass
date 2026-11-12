import { links } from "@/config/site";
import { WhatsAppIcon } from "@/components/icons";

/** Persistent WhatsApp shortcut, bottom-right on every screen size. */
export function FloatingWhatsApp() {
  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-3 sm:right-6 sm:bottom-6"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-ink/90 px-4 py-2 text-sm font-medium text-ivory opacity-0 shadow-xl ring-1 ring-white/10 backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
      <span className="relative flex size-14 items-center justify-center rounded-full bg-whatsapp text-ink shadow-[0_10px_40px_-6px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-105">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-30 [animation-duration:2.5s]"
        />
        <WhatsAppIcon className="relative size-7" />
      </span>
    </a>
  );
}
