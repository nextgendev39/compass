"use client";

import { useId, useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "@/components/icons";
import { trackEvent } from "@/lib/analytics";

const fields = [
  { name: "name", label: "Your name", placeholder: "Full name", autoComplete: "name" },
  { name: "vehicle", label: "Vehicle", placeholder: "Make, model and year", autoComplete: "off" },
  { name: "destination", label: "Destination country", placeholder: "Where it's going", autoComplete: "country-name" },
] as const;

type Values = Record<(typeof fields)[number]["name"] | "message", string>;

/** Builds the WhatsApp text from whatever the visitor filled in. */
function buildMessage(v: Values) {
  const lines = [siteConfig.whatsapp.message];
  if (v.name.trim()) lines.push("", `Name: ${v.name.trim()}`);
  if (v.vehicle.trim()) lines.push(`Vehicle: ${v.vehicle.trim()}`);
  if (v.destination.trim()) lines.push(`Destination: ${v.destination.trim()}`);
  if (v.message.trim()) lines.push("", v.message.trim());
  return lines.join("\n");
}

/**
 * Quick enquiry: nothing is sent to or stored by this site — submitting opens
 * WhatsApp with the details already typed into the message.
 */
export function EnquiryForm() {
  const id = useId();
  const [values, setValues] = useState<Values>({ name: "", vehicle: "", destination: "", message: "" });

  const update = (key: keyof Values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(buildMessage(values))}`;
    trackEvent("whatsapp_enquiry_submit", {
      link_location: "contact",
      has_vehicle: Boolean(values.vehicle.trim()),
      has_destination: Boolean(values.destination.trim()),
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const input =
    "mt-2 block w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-[15px] text-ivory placeholder:text-mist/50 transition-colors focus:border-gold/60 focus:bg-ink/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/25";

  return (
    <form onSubmit={onSubmit} className="contact-form" aria-describedby={`${id}-note`}>
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp">
          <WhatsAppIcon className="size-5" />
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-ivory sm:text-2xl">Start your enquiry</h3>
          <p className="text-sm text-mist">A few details help us reply faster.</p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {fields.map((f, i) => (
          <label key={f.name} className={`block ${i === 0 ? "sm:col-span-2" : ""}`}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mist">{f.label}</span>
            <input
              name={f.name}
              type="text"
              value={values[f.name]}
              onChange={update(f.name)}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete}
              className={input}
            />
          </label>
        ))}
        <label className="block sm:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mist">
            Message <span className="normal-case tracking-normal text-mist/60">(optional)</span>
          </span>
          <textarea
            name="message"
            rows={3}
            value={values.message}
            onChange={update("message")}
            placeholder="Anything else we should know?"
            className={`${input} resize-none`}
          />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-whatsapp px-7 text-[15px] font-semibold tracking-wide text-ink shadow-[0_10px_40px_-10px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2ee472] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chrome"
        >
          <WhatsAppIcon className="size-5" />
          Send on WhatsApp
        </button>
        <p id={`${id}-note`} className="max-w-[16rem] text-xs leading-relaxed text-mist">
          Opens WhatsApp with your details filled in. Nothing is stored on this website.
        </p>
      </div>
    </form>
  );
}
