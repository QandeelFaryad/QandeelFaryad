# QORLIQ — Website (Next.js)

Marketing site for **QORLIQ**, a digital services brand operated by
**HOORAB GROUP OF COMPANIES LTD** (UK, Company Reg. No. 15800546).
Content is taken from the QORLIQ Company Profile 2026.

Responsive, animated, App Router, TypeScript, Tailwind CSS v4.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (design tokens defined in `src/app/globals.css` via `@theme`)
- Fonts: **Syne** (display) + **Geist** (body), loaded via Google Fonts `<link>` in `src/app/layout.tsx`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Configuration

Copy `.env.example` to `.env.local` and fill in:

| Variable                  | Purpose                                                        |
| ------------------------- | -------------------------------------------------------------- |
| `RESEND_API_KEY`          | Sends form submissions via [Resend](https://resend.com)        |
| `CONTACT_TO_EMAIL`        | Inbox that receives inquiries, applications, and sign-ups      |
| `CONTACT_FROM_EMAIL`      | Verified sender address                                        |
| `NEXT_PUBLIC_SITE_URL`    | Production URL for social previews and the sitemap             |

Without Resend configured, submissions are logged to the terminal in development
and the form shows an error with a mailto fallback in production.

Company details, contact information, and the headline statistics live in
`src/lib/site.ts`. Services, case studies, partners, values, and the CEO message
live in `src/lib/content.ts` — all taken from the company profile.
**Still placeholder and needing real content:** the blog articles and their
authors, the careers roles, and the industry sector descriptions. The wider
capability lists (`CAPABILITY_AREAS`, `FULL_CYCLE`, `TECH_STACK`) come from the
separate capability sheets and are broader than the nine services in the
company profile — confirm them before launch.

## Pages

| Route            | Page          |
| ---------------- | ------------- |
| `/`              | Home          |
| `/services`      | Services      |
| `/case-studies`  | Case Studies  |
| `/industries`    | Industries    |
| `/about`         | About         |
| `/blog`          | Blog          |
| `/careers`       | Careers       |
| `/contact`       | Contact       |
| `/case-studies/[slug]` | Case study (morphs in from its card, loops to the next project) |
| `/blog/[slug]`   | Article with reading progress + related posts |
| `/careers/[slug]` | Role detail + application form |

## Structure

```
src/
├─ app/
│  ├─ layout.tsx          # root layout + fonts
│  ├─ globals.css         # tokens, keyframes, animation utilities
│  ├─ page.tsx            # Home
│  └─ <route>/page.tsx    # one folder per page
└─ components/
   ├─ Header.tsx          # sticky header + slide-over mobile menu
   ├─ Footer.tsx          # site footer
   ├─ PageHero.tsx        # inner-page animated gradient hero
   ├─ ui.tsx              # PillButton, SectionLabel, ImageFill, Marquee
   ├─ sections.tsx        # DesignProcess, StatsCounters, Awards, CtaBanner
   ├─ motion.tsx          # Reveal (scroll animation) + Counter (count-up)
   ├─ forms.tsx           # ContactForm + FAQ Accordion
   └─ icons.tsx           # inline SVG icons + brand mark
```

## Animations

- **Page transitions** — React `<ViewTransition>`: pages crossfade, project/article images morph into their detail page.
- **First-visit intro** — brand reveal once per session (`src/app/layout.tsx`).
- **Smooth scroll** — Lenis (disabled for reduced motion).
- **Header** — hides on scroll down, returns on scroll up; menu highlights the current page.
- **Custom cursor** — "View ↗" bubble over elements with `data-cursor`.
- **Magnetic buttons, word-by-word headlines, parallax images, sideways process scroll.**

- **Scroll reveal** — `<Reveal>` fades/slides sections in via IntersectionObserver.
- **Count-up stats** — `<Counter>` animates numbers when scrolled into view.
- **Animated gradient** — hero + CTA use `.brand-gradient-animated`.
- **Marquee** — the scrolling brand strip.
- **Hover micro-interactions** — pill buttons, cards, project images, award rows.
- All motion respects `prefers-reduced-motion`.

## Images

Photography lives in `public/assets`, grouped by use:

```
public/assets/
├─ work/      # case study covers, named after the case study slug
├─ detail/    # secondary imagery reused across case study galleries
├─ journal/   # article covers, named after the post slug
├─ team/      # team portraits (person-1 … person-6)
├─ office/    # team.jpg, studio.jpg, culture.jpg
└─ credits.json  # source + licence for every file
```

**These are CC0 (public domain) stock photos** sourced via Openverse — free to use
commercially with no attribution required. `credits.json` records the origin of each
one. Replace them with real project and team photography before launch.

To swap an image, drop a file with the same name into the same folder, or point the
`image` field for that case study, post, or team member in `src/lib/content.ts` at a
new path. `<ImageFill src="...">` renders the photo; without a `src` it falls back to
an on-brand gradient, so nothing breaks if a file is missing.

Images are served as-is (`images: { unoptimized: true }` in `next.config.ts`), so keep
files around 1400px wide and compressed.

## Design tokens

Colors and fonts live in `src/app/globals.css` under `@theme`, so
`bg-accent`, `text-ink`, `text-on-dark`, `bg-cloud`, etc. are all available
as Tailwind utilities. Adjust once there to re-theme the whole site.
