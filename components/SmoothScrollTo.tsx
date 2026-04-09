"use client";

import type { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  targetId: string;
};

/**
 * Scrolls to an id without leaving #hash in the URL.
 * Uses window.scrollTo (not scrollIntoView) to avoid browser scroll-anchoring
 * bugs that can block scrolling back to the very top of the page afterward.
 */
export function SmoothScrollTo({ targetId, children, ...props }: Props) {
  return (
    <a
      href={`#${targetId}`}
      {...props}
      onClick={(e) => {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (!el) return;
        const reduce =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const cs = getComputedStyle(el);
        const scrollMarginTop = parseFloat(cs.scrollMarginTop) || 0;
        const top =
          window.scrollY +
          el.getBoundingClientRect().top -
          scrollMarginTop;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: reduce ? "auto" : "smooth",
        });
        const path = window.location.pathname + window.location.search;
        window.history.replaceState(null, "", path);
        (e.currentTarget as HTMLAnchorElement).blur();
      }}
    >
      {children}
    </a>
  );
}
