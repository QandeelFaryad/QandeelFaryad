import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Admin", template: "%s · Admin" },
  robots: { index: false, follow: false },
};

/**
 * The admin panel's own root layout: the public site's root layout lives in
 * app/[lang], so /admin needs its own <html>. English only.
 */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <div className="min-h-screen bg-cloud text-ink">{children}</div>
      </body>
    </html>
  );
}
