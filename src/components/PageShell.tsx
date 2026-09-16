import { ViewTransition, type ReactNode } from "react";
import Footer from "./Footer";

/**
 * Wraps each page so route changes crossfade (the header lives in the root
 * layout and stays anchored). Shared elements inside — like a project image —
 * morph between pages via their own named <ViewTransition>.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>
        <main id="main">{children}</main>
        <Footer />
      </div>
    </ViewTransition>
  );
}
