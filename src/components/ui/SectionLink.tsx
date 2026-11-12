import { Reveal } from "./Reveal";

/** Descriptive in-page link to the next part of the journey (e.g. "#services"). */
export function SectionLink({
  href,
  children,
  className = "",
}: {
  href: `#${string}`;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal delay={200} className={className}>
      <a
        href={href}
        className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-chrome transition-colors hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chrome"
      >
        {children}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </Reveal>
  );
}
