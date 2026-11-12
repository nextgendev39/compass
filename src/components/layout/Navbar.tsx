"use client";

import { useEffect, useState } from "react";
import { navItems, siteConfig, links } from "@/config/site";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-white/5 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <a href="#home" aria-label={`${siteConfig.logo.primary} ${siteConfig.logo.secondary} — home`}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative text-[13px] font-medium uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:text-chrome after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-chrome after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={links.phone}
            aria-label="Call us"
            className="hidden size-10 items-center justify-center rounded-full border border-white/15 text-ivory transition-colors hover:border-chrome hover:text-chrome lg:inline-flex"
          >
            <PhoneIcon className="size-4" />
          </a>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-whatsapp px-4 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-[#2ee472] sm:px-5"
          >
            <WhatsAppIcon className="size-[18px]" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sr-only sm:hidden">Chat on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-ivory lg:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-white/5 px-5 pt-4 pb-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-2xl text-ivory transition-colors hover:text-chrome"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-4">
            <a
              href={links.phone}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-chrome/60 text-sm font-semibold text-ivory"
            >
              <PhoneIcon className="size-4" />
              Call {siteConfig.phone.display}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
