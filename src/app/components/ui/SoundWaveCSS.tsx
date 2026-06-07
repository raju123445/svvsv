"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/app/hooks/useIsMobile";

interface BarData {
  minH: number;
  maxH: number;
  duration: number;
  delay: number;
  r: number;
  g: number;
  b: number;
}

interface SoundWaveCSSProps {
  barCount?: number;
  height?: number;
  className?: string;
  variant?: "hero" | "accent" | "subtle";
}

export const SoundWaveCSS = ({
  barCount = 40,
  height = 64,
  className = "",
  variant = "hero",
}: SoundWaveCSSProps) => {
  const [bars, setBars] = useState<BarData[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // On mobile halve the bar count — each bar has an animated box-shadow which is GPU-heavy
    const effectiveCount = isMobile ? Math.max(6, Math.floor(barCount / 2)) : barCount;

    const generated = Array.from({ length: effectiveCount }).map((_, i) => {
      const progress = i / (effectiveCount - 1); // 0 → 1
      const baseHeight = Math.sin(progress * Math.PI) * 0.8 + 0.2;
      const minH = Math.round(baseHeight * height * 0.2);
      const maxH = Math.round(baseHeight * height);
      const duration = 0.8 + Math.random() * 1.2;
      const delay = -(Math.random() * 2);

      // Gold at edges → purple in center
      const goldMix = Math.abs(progress - 0.5) * 2;
      const r = Math.round(212 * goldMix + 147 * (1 - goldMix));
      const g = Math.round(175 * goldMix + 51 * (1 - goldMix));
      const b = Math.round(55 * goldMix + 234 * (1 - goldMix));

      return { minH, maxH, duration, delay, r, g, b };
    });
    setBars(generated);
  }, [barCount, height, isMobile]);

  const opacity = variant === "subtle" ? 0.15 : variant === "accent" ? 0.5 : 0.7;

  // Render placeholder bars during SSR / before hydration
  if (bars.length === 0) {
    return (
      <div
        className={`flex items-end gap-[2px] ${className}`}
        style={{ height: `${height}px`, opacity: 0 }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`flex items-end gap-[2px] ${className}`}
      style={{ height: `${height}px`, opacity }}
      aria-hidden="true"
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          style={{
            width: "3px",
            minHeight: `${bar.minH}px`,
            maxHeight: `${bar.maxH}px`,
            height: `${bar.maxH}px`,
            borderRadius: "2px",
            background: `rgb(${bar.r},${bar.g},${bar.b})`,
            // Skip box-shadow on mobile — massively reduces per-frame rasterization
            boxShadow: isMobile
              ? "none"
              : `0 0 6px rgba(${bar.r},${bar.g},${bar.b},0.5)`,
            transformOrigin: "bottom center",
            flexShrink: 0,
            animationName: "sound-bar",
            animationDuration: `${bar.duration}s`,
            animationDelay: `${bar.delay}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        />
      ))}
    </div>
  );
};
