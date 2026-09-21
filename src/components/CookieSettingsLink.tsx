"use client";

import { openCookieSettings } from "./Consent";

export default function CookieSettingsLink({ label }: { label: string }) {
  return (
    <button onClick={openCookieSettings} className="link-sweep w-fit pb-0.5 text-start text-[14px] text-on-dark hover:text-white">
      {label}
    </button>
  );
}
