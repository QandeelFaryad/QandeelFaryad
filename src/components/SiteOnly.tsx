"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders the marketing site's chrome (header, intro, cursor…) everywhere except the admin panel. */
export default function SiteOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname?.startsWith("/admin/")) return null;
  return <>{children}</>;
}
