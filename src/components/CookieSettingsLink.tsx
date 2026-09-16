"use client";

import { openCookieSettings } from "./Consent";

export default function CookieSettingsLink() {
  return (
    <button
      onClick={openCookieSettings}
      className="link-sweep w-fit pb-0.5 text-left text-[14px] text-on-dark hover:text-white"
    >
      Cookie settings
    </button>
  );
}
