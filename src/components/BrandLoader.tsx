/**
 * QORLIQ's signature loader: the mark drawn in outline then filled, two orbits, an
 * ambient glow and an indeterminate bar, in the site's navy, teal and orange. Shared by the first-visit intro (root
 * layout) and the page-to-page RouteLoader, which only differ in how the overlay
 * around it arrives and leaves. Purely visual, so it's hidden from screen readers;
 * each host announces its own loading state. Styles: "Brand loader" in globals.css.
 */
export default function BrandLoader({ caption, subtitle }: { caption: string; subtitle: string }) {
  return (
    <div className="brand-loader" aria-hidden="true">
      <div className="bl-aura" />
      <div className="bl-center">
        <div className="bl-emblem">
          <div className="bl-orbit" />
          <div className="bl-orbit bl-orbit-two" />
          <svg className="bl-logo" viewBox="0 0 64 64" fill="none">
            <path
              className="bl-teal"
              pathLength={1}
              d="M54.02,30.88C65.07,0.46,40.66-7.87,23.46,16.73l1.32,4.71c19.2-19.02,19.22,12.36,6.01,21.41l3.6,12.85l15.72,5.98l-4.46-15.92C49.18,41.41,51.99,36.41,54.02,30.88z"
            />
            <path
              className="bl-white"
              pathLength={1}
              d="M27.96,34.02c-16.14,15.92-14.55-9.68-4.89-17.38l-1.19-4.22c-8.03,7.8-14.28,19.79-14.67,31.1C7.05,62.1,24.14,52.41,30.37,42.6C29.69,40.16,28.38,35.52,27.96,34.02z"
            />
          </svg>
        </div>
        {/* Styled like the site's section labels: pulsing orange dot, Syne capitals. */}
        <p className="bl-caption">
          <span className="bl-dot dot-ping" />
          {caption}
        </p>
        <div className="bl-track">
          <span />
        </div>
        <p className="bl-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
