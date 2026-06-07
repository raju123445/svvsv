"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { GlassCard } from "../ui/GlassCard";
import { SoundWaveCSS } from "@/app/components/ui/SoundWaveCSS";
import { useRef } from "react";
import { useIsMobile } from "@/app/hooks/useIsMobile";

const stats = [
  {
    label: "Stage Performances",
    value: 44,
    suffix: "+",
    kannada: "ವೇದಿಕೆ ಪ್ರದರ್ಶನಗಳು",
    color: "#D4AF37",
    glowColor: "rgba(212,175,55,0.3)",
  },
  {
    label: "Years Experience",
    value: 8,
    suffix: "+",
    kannada: "ವರ್ಷಗಳ ಅನುಭವ",
    color: "#9333EA",
    glowColor: "rgba(147,51,234,0.3)",
  },
  {
    label: "Course Levels",
    value: 3,
    suffix: "+",
    kannada: "ಕೋರ್ಸ್ ಹಂತಗಳು",
    color: "#F59E0B",
    glowColor: "rgba(245,158,11,0.3)",
  },
  {
    label: "Music Disciplines",
    value: 6,
    suffix: "+",
    kannada: "ಸಂಗೀತ ವಿಭಾಗಗಳು",
    color: "#A855F7",
    glowColor: "rgba(168,85,247,0.3)",
  },
];

export const AcademyStats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Disable parallax on mobile
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0px", "0px"] : ["20px", "-20px"]
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-surface/50 border-y border-white/5 relative overflow-hidden"
    >
      {/* Sound wave decoration top */}
      <div className="absolute top-0 left-0 right-0 flex justify-center opacity-20 overflow-hidden">
        <SoundWaveCSS barCount={80} height={40} variant="subtle" />
      </div>

      {/* Sound wave decoration bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-20 overflow-hidden rotate-180">
        <SoundWaveCSS barCount={80} height={40} variant="subtle" />
      </div>

      {/* Background radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(212,175,55,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(147,51,234,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto" ref={ref}>
        <motion.div
          style={{ y }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="text-center"
            >
              {/* Animated gradient border card */}
              <div
                className="relative rounded-2xl p-[1.5px]"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}, #1A0B2E, ${stat.color})`,
                  backgroundSize: "300% 300%",
                  animation: `border-move ${4 + index * 0.5}s linear infinite`,
                }}
              >
                <div
                  className="relative bg-surface rounded-2xl py-10 px-4"
                  style={{
                    boxShadow: `0 0 30px ${stat.glowColor}, inset 0 0 20px rgba(0,0,0,0.5)`,
                    animation: "gold-glow-ring 3s ease-in-out infinite",
                    animationDelay: `${index * 0.4}s`,
                  }}
                >
                  {/* Value */}
                  <div
                    className="text-4xl md:text-6xl font-bold mb-2"
                    style={{
                      color: stat.color,
                      textShadow: `0 0 20px ${stat.glowColor}, 0 0 40px ${stat.glowColor}`,
                    }}
                  >
                    {inView ? <CountUp end={stat.value} duration={3} /> : "0"}
                    {stat.suffix}
                  </div>

                  {/* Label */}
                  <div className="text-white/80 font-bold text-sm md:text-base uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>

                  {/* Kannada */}
                  <div className="kannada-heading text-white/40 text-xs md:text-sm">
                    {stat.kannada}
                  </div>

                  {/* Mini sound wave inside card */}
                  <div className="flex justify-center mt-4 opacity-40">
                    <SoundWaveCSS barCount={12} height={20} variant="accent" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
