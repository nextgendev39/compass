import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: Props) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-chrome ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-chrome/70" aria-hidden="true" />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-chrome/70" aria-hidden="true" />}
      </p>
      <h2
        id={id}
        className="mt-5 font-display text-4xl leading-[1.05] font-semibold text-ivory sm:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-6 text-base leading-relaxed text-mist sm:text-lg">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
