"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { GlassCard } from "../ui/GlassCard";

const stats = [
  {
    label: "Stage Performances",
    value: 44,
    suffix: "+",
    kannada: "ವೇದಿಕೆ ಪ್ರದರ್ಶನಗಳು"
  },
  {
    label: "Years Experience",
    value: 8,
    suffix: "+",
    kannada: "ವರ್ಷಗಳ ಅನುಭವ"
  },
  {
    label: "Course Levels",
    value: 3,
    suffix: "+",
    kannada: "ಕೋರ್ಸ್ ಹಂತಗಳು"
  },
  {
    label: "Music Disciplines",
    value: 6,
    suffix: "+",
    kannada: "ಸಂಗೀತ ವಿಭಾಗಗಳು"
  }
];

export const AcademyStats = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="py-20 px-4 bg-surface/50 border-y border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <GlassCard className="bg-white/[0.01] border-white/5 py-10">
                <div className="text-4xl md:text-6xl font-bold text-secondary mb-2">
                  {inView ? (
                    <CountUp end={stat.value} duration={3} />
                  ) : (
                    "0"
                  )}
                  {stat.suffix}
                </div>
                <div className="text-white/80 font-bold text-sm md:text-base uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="kannada-heading text-white/40 text-xs md:text-sm">
                  {stat.kannada}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
