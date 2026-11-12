"use client";

import Image, { type StaticImageData } from "next/image";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import sourcingBg from "@/assets/images/hero/car-showroom.jpg";
import inspectionBg from "@/assets/images/hero/vehicle-inspection-workshop.jpg";
import documentsBg from "@/assets/images/hero/export-documents.jpg";
import loadedTruckBg from "@/assets/images/hero/container-truck-port.jpg";
import civicCar from "@/assets/images/cars/civic-type-r-blue.png";
import { LogoMark } from "@/components/layout/LogoMark";
import hoistedImg from "@/assets/images/hero/crane-hoisting-container.jpg";
import hoistSpreader from "@/assets/images/hero/crane-spreader.png";
import shippedBg from "@/assets/images/hero/container-ship-aerial.jpg";
import { siteConfig } from "@/config/site";
import { CallButton, WhatsAppButton } from "@/components/ui/Buttons";
import type { HeroScene } from "./hero-scene";
import "./hero.css";

type Stage = {
  /** Giant outlined word + rail/counter label. */
  word: string;
  step: string;
  /** Headline: plain words, then the chrome-highlighted words. */
  title: [string, string];
  caption: string;
  /** Background photo for the stage. */
  image: StaticImageData;
  position: string;
  /** Softly blur the background so the car in front stands out. */
  depth?: boolean;
  /** Plain-language explainer panel shown in front of the photo. */
  info?: InfoPanel;
  /** Show the stack of export papers in front instead of a car. */
  papers?: boolean;
  /** Container work pinned onto the photo (trailer = 3D, hoist/ship = 2D). */
  scene?: "truck" | "hoist" | "ship";
};

const stages: Stage[] = [
  {
    word: "Sourced",
    step: "Vehicle Sourcing",
    title: ["Your Trusted Partner in", "Global Car Exports"],
    caption:
      "Tell us the vehicle you want. We find it for you, check it, and ship it from Dubai to your country.",
    image: sourcingBg,
    position: "object-center",
    depth: true,
    info: {
      icon: "search",
      heading: "Vehicle Sourcing",
      text: "We help you find the right vehicle based on your requirements.",
      points: [
        { icon: "list", label: "You tell us the make, model and budget" },
        { icon: "car", label: "We find vehicles that match" },
        { icon: "thumb", label: "You choose the one you want" },
      ],
    },
  },
  {
    word: "Inspected",
    step: "Vehicle Inspection",
    title: ["Every Vehicle,", "Checked Before Export"],
    caption:
      "Before a vehicle leaves the UAE, we check it over to help make sure it is in the condition you expect.",
    image: inspectionBg,
    position: "object-center",
    depth: true,
    info: {
      icon: "shield",
      heading: "Vehicle Inspection",
      text: "Vehicles are checked before export to help ensure their condition.",
      points: [
        { icon: "check", label: "Exterior and bodywork" },
        { icon: "check", label: "Engine and mechanics" },
        { icon: "check", label: "Interior and electronics" },
      ],
    },
  },
  {
    word: "Documented",
    step: "Export Documentation",
    title: ["Paperwork,", "Handled End to End"],
    caption:
      "We prepare and handle the export paperwork, so nothing holds your vehicle up at the port.",
    image: documentsBg,
    position: "object-[0%_center]",
    papers: true,
  },
  {
    word: "Loaded",
    step: "Door-to-Port Delivery",
    title: ["Collected and", "Loaded with Care"],
    caption:
      "Collection from the seller anywhere in the UAE and safe transport to the departure port, ready for loading.",
    image: loadedTruckBg,
    // Panned to the trailer's rear on narrow screens; .hero3d-truck-frame (--fx) must match.
    position: "object-center max-lg:object-[72%_50%] max-sm:object-[86%_50%]",
    scene: "truck",
  },
  {
    word: "Hoisted",
    step: "Shipping & Logistics",
    title: ["Lifted Aboard", "with Trusted Carriers"],
    caption:
      "Container or RoRo shipping arranged with trusted carriers, with updates from booking through to arrival.",
    image: hoistedImg,
    // Must stay centred: the container hangs from the spreader in this photo.
    position: "object-center",
    scene: "hoist",
  },
  {
    word: "Shipped",
    step: "Worldwide Shipping",
    title: ["From Dubai", "to the World"],
    caption:
      "Wherever your vehicle is headed, one trusted partner keeps you informed at every step.",
    image: shippedBg,
    // Must stay centred: the container is pinned to the empty slot in this photo.
    position: "object-center",
    scene: "ship",
  },
];

const n = stages.length;
/** Scroll distance per stage, in viewport heights. */
const STAGE_VH = 75;
const pad = (i: number) => String(i + 1).padStart(2, "0");

/** Splits text into pieces that flip in one after another (--w = stagger index). */
function Flip({
  parts,
  start = 0,
  step = 1,
  className = "",
  joiner = " ",
}: {
  parts: string[];
  start?: number;
  step?: number;
  className?: string;
  joiner?: string;
}) {
  return parts.map((part, i) => (
    <Fragment key={i}>
      <span className="hero3d-word-mask">
        <span
          className={`hero3d-word ${className}`}
          style={{ "--w": start + i * step } as React.CSSProperties}
        >
          {part}
        </span>
      </span>
      {joiner}
    </Fragment>
  ));
}

/** Scroll position within the pinned hero, 0 → 1. */
function heroProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const travel = rect.height - window.innerHeight;
  return travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HeroScene | null>(null);

  // Scroll → timeline. The section is tall; the inner stage is sticky.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    const measure = () => {
      const p = heroProgress(section);
      const t = p * (n - 1);
      section.style.setProperty("--p", p.toFixed(4));
      sceneRef.current?.setTarget(t);
      setActive(Math.min(n - 1, Math.round(t)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // 3D scene: loaded on demand, paused while the hero is off-screen.
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    let disposed = false;
    let io: IntersectionObserver | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    import("./hero-scene")
      .then(({ createHeroScene }) => {
        if (disposed) return;
        const scene = createHeroScene(canvas, {
          reducedMotion,
          // The car from the first stage is the one that gets loaded and shipped.
          carImage: { src: civicCar.src, width: civicCar.width, height: civicCar.height },
          loadedAnchor: section.querySelector<HTMLElement>(".hero3d-truck-deck"),
        });
        sceneRef.current = scene;
        scene.setTarget(heroProgress(section) * (n - 1));
        io = new IntersectionObserver(([e]) => scene.setRunning(e.isIntersecting));
        io.observe(section);
        setSceneReady(true);
      })
      .catch(() => {
        // No WebGL: the photos and copy still work on their own.
      });
    return () => {
      disposed = true;
      io?.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  // "Move to steer": pointer drives the camera and drifts the giant word.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--mx", x.toFixed(3));
        el.style.setProperty("--my", y.toFixed(3));
        sceneRef.current?.setPointer(x, y);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  /** Scrolls the page so the given stage is in view. */
  const go = useCallback((i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const stage = Math.min(n - 1, Math.max(0, i));
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (stage / (n - 1)) * travel, behavior: "smooth" });
  }, []);

  const current = stages[active];

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      className="hero3d relative bg-ink"
      style={{ height: `calc(100svh + ${(n - 1) * STAGE_VH}svh)` }}
    >
      <div className="sticky top-0 isolate flex h-svh items-end overflow-hidden">
        {/* Stage photos, crossfading */}
        <div className="absolute inset-0 -z-20" aria-hidden="true">
          {stages.map((s, i) => (
            <div
              key={s.word}
              className="hero3d-photo"
              data-active={i === active}
              data-depth={!!s.depth}
              data-scene={s.scene}
            >
              <Image
                src={s.image}
                alt=""
                fill
                loading="eager"
                fetchPriority={i === 0 ? "high" : "low"}
                placeholder="blur"
                sizes="100vw"
                className={`object-cover ${s.position}`}
              />
              {s.scene === "truck" && <TruckDeck />}
              {s.scene === "ship" && <ShipSlot />}
              {s.scene === "hoist" && <HoistRig />}
            </div>
          ))}
        </div>

        {/* Grade + legibility */}
        <div aria-hidden="true" className="hero3d-grade absolute inset-0 -z-10" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent max-md:from-ink/40 max-md:via-ink/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/5 to-ink/40 max-md:via-ink/40"
        />

        {/* Giant outlined stage word (behind the 3D scene) */}
        <div
          aria-hidden="true"
          className="hero3d-giant pointer-events-none absolute inset-x-0 top-24 -z-10 sm:top-28"
        >
          <div className="hero3d-copy mx-auto grid max-w-7xl px-5 sm:px-8">
            {stages.map((s, i) => (
              <p
                key={s.word}
                data-active={i === active}
                className="hero3d-copy-slide hero3d-giant-word"
                style={{ "--chars": s.word.length } as React.CSSProperties}
              >
                <Flip parts={s.word.toUpperCase().split("")} step={0.5} joiner="" />
              </p>
            ))}
          </div>
        </div>

        {/* 3D scene */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`hero3d-canvas pointer-events-none absolute inset-0 -z-10 h-full w-full ${sceneReady ? "is-ready" : ""}`}
        />
        {/* In front of the photo: plain-language panels (Sourced, Inspected) or the export papers */}
        <div className="hero3d-cars pointer-events-none absolute inset-0 -z-10">
          {stages.map((s, i) => {
            const state = i === active ? "active" : i < active ? "after" : "before";
            if (s.papers)
              return (
                <div
                  key={s.word}
                  aria-hidden="true"
                  className="hero3d-car hero3d-papers-slot"
                  data-state={state}
                  style={{ "--ar": 1.15 } as React.CSSProperties}
                >
                  <ExportPapers car={civicCar} />
                </div>
              );
            if (s.info)
              return (
                <div
                  key={s.word}
                  aria-hidden={i !== active}
                  className="hero3d-car hero3d-info-slot"
                  data-state={state}
                >
                  <InfoCard info={s.info} step={i + 1} />
                </div>
              );
            return null;
          })}
        </div>

        {/* Phones: the copy fills the lower screen, so fade the 3D out behind it */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[64%] bg-gradient-to-t from-ink via-ink/90 to-transparent sm:hidden"
        />

        {/* Stage rail (desktop) */}
        <nav
          aria-label="Export stages"
          className="absolute top-1/2 right-5 z-10 hidden -translate-y-1/2 sm:right-8 md:block"
        >
          <ol className="hero3d-rail relative flex flex-col items-end gap-7">
            {stages.map((s, i) => (
              <li key={s.word}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Stage ${i + 1} of ${n}: ${s.step}`}
                  aria-current={i === active ? "step" : undefined}
                  data-active={i === active}
                  data-done={i < active}
                  className="hero3d-rail-item group flex items-center justify-end gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chrome"
                >
                  <span className="hero3d-rail-label font-brand text-[10px] uppercase tracking-[0.25em] text-ivory">
                    {s.word}
                  </span>
                  <span className="hero3d-rail-dot" />
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="relative mx-auto w-full max-w-7xl px-5 pt-40 pb-24 sm:px-8 sm:pb-12">
          <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
            {/* Copy */}
            <div className="max-w-2xl">
              <p className="flex animate-fade-up items-center gap-3 font-brand text-[10px] uppercase tracking-[0.3em] text-chrome sm:text-[11px]">
                <span className="h-px w-8 bg-chrome-gradient" aria-hidden="true" />
                {siteConfig.tagline}
              </p>

              <div className="hero3d-copy mt-5 grid">
                {stages.map((s, i) => {
                  const Tag = i === active ? "h1" : "p";
                  return (
                    <div
                      key={s.word}
                      className="hero3d-copy-slide"
                      data-active={i === active}
                      aria-hidden={i !== active}
                    >
                      <Tag
                        id={i === active ? "hero-title" : undefined}
                        className="font-display text-[2.1rem] leading-[0.98] font-bold tracking-[-0.02em] text-ivory sm:text-6xl lg:text-[4.25rem]"
                      >
                        <Flip parts={s.title[0].split(" ")} />
                        <Flip
                          parts={s.title[1].split(" ")}
                          start={s.title[0].split(" ").length}
                          className="text-chrome-gradient italic"
                        />
                      </Tag>
                      <p className="hero3d-line hero3d-line-late mt-4 max-w-xl text-[15px] leading-relaxed text-ivory/75 sm:mt-5 sm:text-lg">
                        {s.caption}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex animate-fade-up flex-col gap-3 [animation-delay:360ms] sm:mt-8 sm:flex-row sm:gap-4">
                <WhatsAppButton />
                <CallButton />
              </div>

              <p
                aria-hidden="true"
                className="mt-6 hidden items-center gap-3 font-brand text-[10px] uppercase tracking-[0.3em] text-ivory/70 [@media(pointer:fine)]:flex"
              >
                <span className="hero3d-pulse size-2 rounded-full bg-chrome" />
                Scroll to ship · Move to steer
              </p>
            </div>

            {/* Counter + controls */}
            <div className="flex shrink-0 flex-col gap-4 lg:items-end">
              <p className="flex items-baseline gap-2.5" aria-hidden="true">
                <span className="hero3d-flipstack grid">
                  {stages.map((s, i) => (
                    <span
                      key={s.word}
                      data-active={i === active}
                      className="hero3d-flip font-display text-5xl leading-none font-bold text-ivory sm:text-7xl"
                    >
                      {pad(i)}
                    </span>
                  ))}
                </span>
                <span className="font-brand text-xs text-ivory/50">/ {pad(n - 1)}</span>
                <span className="hero3d-flipstack grid">
                  {stages.map((s, i) => (
                    <span
                      key={s.word}
                      data-active={i === active}
                      className="hero3d-flip font-brand text-[11px] uppercase tracking-[0.25em] text-chrome"
                    >
                      {s.word}
                    </span>
                  ))}
                </span>
              </p>

              <div className="flex items-center gap-3">
                <div className="relative h-px w-full min-w-40 overflow-hidden bg-white/15 lg:w-48">
                  <span className="hero3d-scrollbar absolute inset-0 bg-chrome-gradient" />
                </div>
                <ControlButton label="Previous stage" onClick={() => go(active - 1)} disabled={active === 0}>
                  <path d="M15 18l-6-6 6-6" />
                </ControlButton>
                <ControlButton label="Next stage" onClick={() => go(active + 1)} disabled={active === n - 1}>
                  <path d="M9 18l6-6-6-6" />
                </ControlButton>
              </div>
            </div>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Stage {active + 1} of {n}: {current.step}.{current.info ? ` ${current.info.text}` : ""}
            {current.papers ? " Export paperwork prepared by Compass Car Export." : ""}
          </p>
        </div>
      </div>
    </section>
  );
}

type InfoIcon = "search" | "shield" | "list" | "car" | "thumb" | "check";
type InfoPanel = {
  icon: InfoIcon;
  heading: string;
  text: string;
  points: { icon: InfoIcon; label: string }[];
};

/** Simple line icons for the explainer panels (24×24, stroke = currentColor). */
const infoIcons: Record<InfoIcon, React.ReactNode> = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.3-3 8-7 9.5-4-1.5-7-5.2-7-9.5V6z" />
      <path d="M8.8 12.2l2.2 2.2 4.3-4.6" />
    </>
  ),
  list: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 9h6M9 13h6M9 17h3" />
    </>
  ),
  car: (
    <>
      <path d="M4 16v-3.5L6.2 8A2 2 0 0 1 8 7h8a2 2 0 0 1 1.8 1l2.2 4.5V16" />
      <path d="M3 16h18v2H3z" />
      <circle cx="7.5" cy="16.5" r="1.5" />
      <circle cx="16.5" cy="16.5" r="1.5" />
    </>
  ),
  thumb: (
    <>
      <path d="M7 11v9H4v-9z" />
      <path d="M7 11l4-7c1.4 0 2.3 1 2 2.4L12.5 10H18a2 2 0 0 1 2 2.3l-1.1 6A2 2 0 0 1 17 20H7" />
    </>
  ),
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
};

function Icon({ name, className }: { name: InfoIcon; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {infoIcons[name]}
    </svg>
  );
}

/** Sourced / Inspected: what the step means, in plain words, at a glance. */
function InfoCard({ info, step }: { info: InfoPanel; step: number }) {
  return (
    <div className="hero3d-info">
      <div className="flex items-center gap-4">
        <span className="hero3d-info-badge">
          <Icon name={info.icon} className="size-7" />
        </span>
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold-light">
            Step {pad(step - 1)}
          </p>
          <p className="mt-1 font-display text-2xl leading-tight font-semibold text-ivory sm:text-[1.7rem]">
            {info.heading}
          </p>
        </div>
      </div>
      <p className="hero3d-info-text mt-4 text-[0.95rem] leading-relaxed text-ivory/80">{info.text}</p>
      <ul className="mt-5 space-y-2.5">
        {info.points.map((pt, k) => (
          <li key={pt.label} className="hero3d-info-point" style={{ "--k": k } as React.CSSProperties}>
            <span className="hero3d-info-point-icon">
              <Icon name={pt.icon} className="size-4" />
            </span>
            {pt.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** COMPASS container roof, seen from above. */
function ContainerRoof({ className }: { className: string }) {
  return (
    <div className={`hero3d-roof ${className}`}>
      <span className="hero3d-roof-brand">
        <LogoMark className="hero3d-roof-star" />
        COMPASS
      </span>
    </div>
  );
}

/** Loaded: where the 3D container sits on the empty trailer chassis (photo 1536×1024). */
function TruckDeck() {
  return (
    <div className="hero3d-photo-frame hero3d-truck-frame" style={{ "--ar": 1536 / 1024 } as React.CSSProperties}>
      <div className="hero3d-truck-deck" />
    </div>
  );
}

/** Shipped: container lowered into the empty slot on the ship photo (1536×1024). */
function ShipSlot() {
  return (
    <div className="hero3d-photo-frame" style={{ "--ar": 1536 / 1024 } as React.CSSProperties}>
      <div className="hero3d-ship-slot">
        <ContainerRoof className="hero3d-ship-box" />
      </div>
    </div>
  );
}

/** Hoisted: container hanging from the crane's spreader (photo 1024×1536). */
function HoistRig() {
  return (
    <div className="hero3d-photo-frame" style={{ "--ar": 1024 / 1536 } as React.CSSProperties}>
      <div className="hero3d-hoist">
        <ContainerRoof className="hero3d-hoist-box" />
        {/* The photo's own spreader, cut out, laid back on top so it grips the roof */}
        <Image src={hoistSpreader} alt="" sizes="40vw" loading="eager" className="hero3d-hoist-spreader" />
      </div>
    </div>
  );
}

/** A fanned stack of COMPASS export papers (illustrative, not official forms). */
const papers = [
  { title: "Vehicle Details", rows: ["Make & model", "Year", "Chassis / VIN", "Colour"] },
  { title: "Export Paperwork", rows: ["Exporter", "Destination", "Port of loading", "Shipping method"] },
  { title: "Shipping Summary", rows: ["Collection", "Container", "Carrier", "Arrival updates"] },
];

function ExportPapers({ car }: { car: StaticImageData }) {
  return (
    <div className="hero3d-papers">
      {papers.map((p, k) => (
        <div
          key={p.title}
          className="hero3d-paper"
          // Front sheet (with the car) in the middle, the others fan left and right.
          style={{ "--k": k, "--pos": [0, -1, 1][k] } as React.CSSProperties}
        >
          <div className="flex items-center justify-between border-b border-black/10 pb-2">
            <span className="flex items-center gap-1.5">
              <LogoMark className="size-4 [filter:brightness(0.35)]" />
              <span className="font-brand text-[8px] tracking-[0.18em] text-[#1b1f26]">COMPASS</span>
            </span>
            <span className="font-brand text-[6px] tracking-[0.2em] text-[#6b717b]">CAR EXPORT</span>
          </div>
          <p className="mt-2.5 font-display text-[13px] font-bold uppercase tracking-wide text-[#14171c]">
            {p.title}
          </p>
          {k === 0 && (
            <div className="mt-2 rounded-md bg-[#eef0f3] p-1.5">
              <Image src={car} alt="" sizes="200px" loading="eager" className="h-auto w-full" />
            </div>
          )}
          <dl className="mt-2.5 space-y-1.5">
            {p.rows.map((r, i) => (
              <div key={r} className="flex items-center gap-2">
                <dt className="w-[42%] shrink-0 text-[7px] font-semibold uppercase tracking-wider text-[#8a909a]">{r}</dt>
                <dd className="h-[5px] flex-1 rounded-full bg-[#d9dce1]" style={{ maxWidth: `${88 - ((i * 17 + k * 11) % 40)}%` }} />
              </div>
            ))}
          </dl>
          <div className="hero3d-paper-check" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="M5 12.5l4.2 4.2L19 7" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-ink/30 text-ivory/80 backdrop-blur-sm transition-colors duration-300 hover:border-chrome hover:bg-chrome-gradient hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome disabled:pointer-events-none disabled:opacity-35"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </button>
  );
}
