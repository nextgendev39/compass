import { useId } from "react";

/**
 * Compass four-point star, drawn as four quadrant blades split by thin gaps
 * with a star-shaped opening at the centre. Brushed-silver fill.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-silver`} x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fafafa" />
          <stop offset="0.38" stopColor="#c4c4c8" />
          <stop offset="0.55" stopColor="#f1f1f3" />
          <stop offset="1" stopColor="#7c7c84" />
        </linearGradient>
        <path id={`${id}-blade`} d="M48.4 1Q46.4 46.4 1 48.4H42.6Q47 47 48.4 42.6Z" />
      </defs>
      <g fill={`url(#${id}-silver)`}>
        <use href={`#${id}-blade`} />
        <use href={`#${id}-blade`} transform="rotate(90 50 50)" />
        <use href={`#${id}-blade`} transform="rotate(180 50 50)" />
        <use href={`#${id}-blade`} transform="rotate(270 50 50)" />
      </g>
    </svg>
  );
}
