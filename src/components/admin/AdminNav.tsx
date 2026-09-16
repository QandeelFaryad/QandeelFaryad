"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Item = { href: string; label: string; badge?: number };

const GROUPS: { title: string; items: Item[] }[] = [
  { title: "Overview", items: [{ href: "/admin", label: "Dashboard" }] },
  {
    title: "Leads",
    items: [
      { href: "/admin/inquiries", label: "Inquiries" },
      { href: "/admin/applications", label: "Applications" },
      { href: "/admin/subscribers", label: "Subscribers" },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/posts", label: "Blog posts" },
      { href: "/admin/case-studies", label: "Case studies" },
      { href: "/admin/roles", label: "Job openings" },
      { href: "/admin/settings", label: "Site stats" },
    ],
  },
];

export default function AdminNav({
  email,
  badges,
  signOut,
}: {
  email: string | null;
  badges: Record<string, number>;
  signOut: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-ink px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brand/qorliq-logo-white.svg" alt="QORLIQ" className="h-7 w-auto" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent">Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="admin-nav"
          className="rounded-full border border-white/20 px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-white"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <aside
        id="admin-nav"
        className={`${open ? "flex" : "hidden"} fixed inset-x-0 bottom-0 top-[56px] z-30 flex-col overflow-y-auto bg-ink px-4 pb-6 pt-4 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[248px] lg:shrink-0 lg:px-5 lg:pt-6`}
      >
        <Link href="/admin" className="mb-8 hidden items-center gap-2 px-2 lg:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brand/qorliq-logo-white.svg" alt="QORLIQ" className="h-8 w-auto" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent">Admin</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-6" aria-label="Admin">
          {GROUPS.map((g) => (
            <div key={g.title} className="flex flex-col gap-1">
              <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-widest text-white/40">{g.title}</p>
              {g.items.map((item) => {
                const active = isActive(item.href);
                const badge = badges[item.href];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-semibold transition-colors ${
                      active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className={`h-4 w-[3px] rounded-full ${active ? "bg-spark" : "bg-transparent"}`} />
                      {item.label}
                    </span>
                    {badge ? (
                      <span className="rounded-full bg-spark px-2 py-0.5 text-[11px] font-bold text-white">{badge}</span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 px-2 pt-5">
          <Link href="/" target="_blank" className="text-[13px] font-semibold text-white/70 hover:text-white">
            View website ↗
          </Link>
          {email ? <p className="truncate text-[12px] text-white/40">{email}</p> : null}
          <form action={signOut}>
            <button type="submit" className="text-[13px] font-semibold text-accent hover:text-white">
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
