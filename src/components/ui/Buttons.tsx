import type { ReactNode } from "react";
import { links } from "@/config/site";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

type Size = "md" | "lg";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chrome";

export function WhatsAppButton({
  size = "lg",
  children = "Contact Us on WhatsApp",
  className = "",
}: {
  size?: Size;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizes[size]} bg-whatsapp text-ink shadow-[0_10px_40px_-10px_rgba(37,211,102,0.6)] hover:-translate-y-0.5 hover:bg-[#2ee472] hover:shadow-[0_16px_50px_-12px_rgba(37,211,102,0.75)] ${className}`}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      {children}
    </a>
  );
}

export function CallButton({
  size = "lg",
  children = "Call Now",
  variant = "outline",
  className = "",
}: {
  size?: Size;
  children?: ReactNode;
  variant?: "outline" | "chrome";
  className?: string;
}) {
  const styles =
    variant === "chrome"
      ? "bg-chrome-gradient text-ink hover:brightness-110 shadow-[0_10px_40px_-12px_rgba(196,200,207,0.55)]"
      : "border border-chrome/60 text-ivory hover:border-chrome hover:bg-chrome hover:text-ink backdrop-blur-sm bg-ink/20";
  return (
    <a
      href={links.phone}
      className={`${base} ${sizes[size]} ${styles} hover:-translate-y-0.5 ${className}`}
    >
      <PhoneIcon className="size-[18px] shrink-0" />
      {children}
    </a>
  );
}
