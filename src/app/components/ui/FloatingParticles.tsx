"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  delay: number;
  duration: number;
}

const COLORS = [
  "rgba(212,175,55,",   // gold
  "rgba(147,51,234,",   // purple
  "rgba(167,139,250,",  // violet
  "rgba(245,158,11,",   // amber
  "rgba(196,181,253,",  // lavender
];

export const FloatingParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const count = 55;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = 2 + Math.random() * 5;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 6 + Math.random() * 10;
      const delay = Math.random() * -12;
      const driftX = (Math.random() - 0.5) * 60;
      const driftY = -(30 + Math.random() * 80);
      const opacity = 0.2 + Math.random() * 0.5;

      el.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color}${opacity});
        pointer-events: none;
        will-change: transform, opacity;
        box-shadow: 0 0 ${size * 2}px ${color}${opacity * 0.5});
        animation: particle-float-${i} ${duration}s ease-in-out ${delay}s infinite;
      `;

      // inject keyframe
      const style = document.createElement("style");
      style.textContent = `
        @keyframes particle-float-${i} {
          0%   { transform: translate(0, 0) scale(1); opacity: 0; }
          10%  { opacity: ${opacity}; }
          50%  { transform: translate(${driftX * 0.5}px, ${driftY * 0.5}px) scale(1.2); opacity: ${opacity * 0.8}; }
          90%  { opacity: ${opacity * 0.4}; }
          100% { transform: translate(${driftX}px, ${driftY}px) scale(0.6); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
      container.appendChild(el);
      particles.push(el);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
      aria-hidden="true"
    />
  );
};
