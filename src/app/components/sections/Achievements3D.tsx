"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useCallback } from "react";
import { AchievementCarousel } from "../three/AchievementOrbit";
import { SectionHeader } from "../ui/SectionHeader";
import { achievements } from "@/app/data/achievements";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useIsMobile } from "@/app/hooks/useIsMobile";

export const Achievements3D = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + achievements.length) % achievements.length);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % achievements.length);
  }, []);

  const active = achievements[activeIndex];

  // Only mount and run the 3D Canvas when this section is near the viewport.
  // rootMargin: "200px" starts rendering slightly before it scrolls into view
  // so there is no pop-in. When offscreen the Canvas is fully unmounted,
  // freeing its GPU context and stopping its render loop entirely.
  const { ref: inViewRef, inView } = useInView({
    rootMargin: "200px 0px",
    triggerOnce: false, // allow re-mounting if user scrolls back
  });

  return (
    <section
      id="achievements"
      className="py-24 px-4 bg-surface relative overflow-hidden"
      style={{ minHeight: "860px" }}
      ref={inViewRef}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(147,51,234,0.07) 0%, rgba(212,175,55,0.04) 45%, transparent 70%)",
          animation: "glow-pulse 6s ease-in-out infinite",
        }}
      />

      {/* Section Header */}
      <div className="container mx-auto relative z-10">
        <SectionHeader
          kannada="ಸಾಧನೆಗಳ ಪ್ರದರ್ಶನ"
          english="3D Achievement Showcase"
          subtitle="Use arrows or click any card to explore our musical recognition."
        />
      </div>

      {/*
       * 3D Coverflow Canvas — only mounted when near/in viewport.
       * When offscreen, renders a lightweight placeholder to preserve layout.
       */}
      <div
        className="absolute left-0 right-0 z-0"
        style={{ top: "130px", bottom: "160px" }}
      >
        {inView ? (
          <Canvas
            camera={{ position: [0, 0.2, 6.5], fov: 62 }}
            dpr={isMobile ? 1 : [1, 1.5]}
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: "high-performance",
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Suspense fallback={null}>
              <AchievementCarousel
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
              />
            </Suspense>
          </Canvas>
        ) : (
          /* Lightweight skeleton shown while section is offscreen */
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <div className="w-48 h-64 rounded-2xl border border-secondary/20 bg-secondary/5" />
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <div className="absolute bottom-[72px] left-0 right-0 z-20 flex items-center justify-center gap-8">
        {/* Prev */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(212,175,55,0.3)",
            boxShadow:
              "0 0 20px rgba(212,175,55,0.15), 0 0 40px rgba(147,51,234,0.1)",
          }}
          aria-label="Previous achievement"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {achievements.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? "24px" : "8px",
                height: "8px",
                background:
                  i === activeIndex
                    ? "linear-gradient(90deg, #D4AF37, #9333EA)"
                    : "rgba(255,255,255,0.2)",
                boxShadow:
                  i === activeIndex ? "0 0 12px rgba(212,175,55,0.5)" : "none",
              }}
              aria-label={`Go to achievement ${i + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(212,175,55,0.3)",
            boxShadow:
              "0 0 20px rgba(212,175,55,0.15), 0 0 40px rgba(147,51,234,0.1)",
          }}
          aria-label="Next achievement"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Active card label */}
      {active && (
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute bottom-6 left-0 right-0 z-20 text-center"
        >
          <p
            className="text-sm font-bold uppercase tracking-[0.22em]"
            style={{
              color: "#D4AF37",
              textShadow: "0 0 20px rgba(212,175,55,0.5)",
            }}
          >
            {active.title}
          </p>
          <p className="text-white/35 text-xs mt-1">
            {activeIndex + 1}&thinsp;/&thinsp;{achievements.length}
          </p>
        </motion.div>
      )}

      {/* Fade top / bottom so the carousel blends into the section */}
      <div
        className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, #050505 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, #050505 0%, transparent 100%)",
        }}
      />
    </section>
  );
};
