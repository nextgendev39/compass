import { siteConfig } from "@/config/site";
import { LogoMark } from "./LogoMark";

/** Brand lockup: silver star mark + COMPASS wordmark over a "Car Export" plate. */
export function Logo() {
  const { primary, secondary } = siteConfig.logo;
  return (
    <span className="flex items-center gap-3">
      <LogoMark className="size-10 shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] sm:size-11" />
      <span className="flex flex-col items-stretch leading-none">
        <span className="text-chrome-gradient font-brand text-[17px] uppercase tracking-[0.12em] sm:text-[19px]">
          {primary}
        </span>
        {/* keeps the accessible name "Compass Car Export", not "CompassCar Export" */}{" "}
        {secondary && (
          <span className="mt-1 bg-chrome-gradient rounded-[3px] px-1.5 py-[3px] text-right text-[9px] font-semibold uppercase tracking-[0.2em] text-ink">
            {secondary}
          </span>
        )}
      </span>
    </span>
  );
}
