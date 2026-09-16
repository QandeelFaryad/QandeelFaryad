import type { SVGProps } from "react";

/** Arrow pointing up-right — used in every pill button badge. */
export function ArrowUpRight({ className, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} {...p}>
      <path
        d="M3 9L9 3M9 3H3.5M9 3V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Arrow pointing down-right — intro block marker. */
export function ArrowDownRight({ className, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...p}>
      <path
        d="M7 7L17 17M17 17V8M17 17H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon({ className, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...p}>
      <path d="M3 6h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...p}>
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon({ className, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...p}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function StarIcon({ className, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...p}>
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.2l7.1-.6L12 2z" />
    </svg>
  );
}
