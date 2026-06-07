"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when the viewport width is ≤ 768 px (phone / small tablet).
 * Falls back to false during SSR so hydration stays consistent.
 * Uses a single shared `matchMedia` listener — safe to call from many components.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}
