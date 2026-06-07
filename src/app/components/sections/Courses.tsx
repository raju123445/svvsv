"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { courses } from "@/app/data/courses";
import { CheckCircle2, Music4 } from "lucide-react";
import { staggerContainer, fadeUp } from "@/app/lib/animations";
import { useRef } from "react";

const LEVEL_COLORS: Record<string, { color: string; glow: string }> = {
  Beginner:     { color: "#10B981", glow: "rgba(16,185,129,0.3)" },
  Intermediate: { color: "#D4AF37", glow: "rgba(212,175,55,0.3)" },
  Advanced:     { color: "#9333EA", glow: "rgba(147,51,234,0.3)" },
};

export const Courses = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section ref={sectionRef} id="courses" className="py-24 px-4 bg-surface relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] -z-10"
        style={{ background: "rgba(147,51,234,0.06)" }}
      />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] -z-10"
        style={{ background: "rgba(212,175,55,0.06)" }}
      />

      <div className="container mx-auto">
        <SectionHeader
          kannada="ಕೋರ್ಸ್‌ಗಳ ಮಾಹಿತಿ"
          english="Our Music Courses"
          subtitle="Structured learning paths designed for every skill level, from curious beginners to aspiring masters."
        />

        <motion.div
          variants={staggerContainer(0.2, 0.2)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          style={{ y }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {courses.map((course, index) => {
            const levelStyle = LEVEL_COLORS[course.level] ?? LEVEL_COLORS["Beginner"];
            return (
              <motion.div key={course.id} variants={fadeUp} className="h-full group">
                {/* Animated gradient border wrapper */}
                <div
                  className="h-full rounded-2xl p-[1.5px] transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${levelStyle.color}, #1A0B2E, #9333EA, #1A0B2E, ${levelStyle.color})`,
                    backgroundSize: "400% 400%",
                    animation: `border-move ${5 + index * 0.8}s linear infinite`,
                    boxShadow: `0 0 20px ${levelStyle.glow}`,
                  }}
                >
                  <div
                    className="h-full bg-surface rounded-2xl p-8 flex flex-col transition-all duration-500 group-hover:bg-surface/80"
                    style={{
                      boxShadow: `inset 0 0 40px rgba(0,0,0,0.5)`,
                    }}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{
                          background: `${levelStyle.color}18`,
                          boxShadow: `0 0 20px ${levelStyle.glow}`,
                          border: `1px solid ${levelStyle.color}30`,
                        }}
                      >
                        <Music4 className="w-6 h-6" style={{ color: levelStyle.color }} />
                      </div>

                      {/* Glowing level badge */}
                      <span
                        className="text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full border"
                        style={{
                          color: levelStyle.color,
                          borderColor: `${levelStyle.color}40`,
                          background: `${levelStyle.color}10`,
                          boxShadow: `0 0 10px ${levelStyle.glow}`,
                        }}
                      >
                        {course.level}
                      </span>
                    </div>

                    <h4 className="kannada-heading text-2xl mb-2" style={{ color: levelStyle.color }}>
                      {course.kannadaTitle}
                    </h4>
                    <h5 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">
                      {course.englishTitle}
                    </h5>
                    <p className="text-white/50 text-sm mb-8 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="mt-auto">
                      <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
                        What you'll learn:
                      </p>
                      <ul className="space-y-3">
                        {course.outcomes.map((outcome, i) => (
                          <li key={i} className="flex items-center gap-3 text-white/40 text-sm">
                            <CheckCircle2
                              className="w-4 h-4 shrink-0"
                              style={{ color: `${levelStyle.color}80` }}
                            />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-20">
          {/* Animated border CTA card */}
          <div
            className="rounded-2xl p-[1.5px] max-w-4xl mx-auto"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #9333EA, #F59E0B, #A855F7, #D4AF37)",
              backgroundSize: "300% 300%",
              animation: "border-move 5s linear infinite",
              boxShadow: "0 0 40px rgba(212,175,55,0.15), 0 0 80px rgba(147,51,234,0.1)",
            }}
          >
            <div className="bg-primary/30 backdrop-blur-xl rounded-2xl py-12 px-8 text-center">
              <h4 className="text-2xl font-bold text-white mb-4">Looking for something specific?</h4>
              <p className="text-white/60 mb-8">
                We also offer specialized training in Bhajans, Film Songs, and various instruments.
                Contact us to discuss your personalized musical journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <span
                  className="font-bold text-lg"
                  style={{ color: "#D4AF37", textShadow: "0 0 20px rgba(212,175,55,0.4)" }}
                >
                  Call Us: 9449533852
                </span>
                <div className="hidden sm:block w-[1px] h-6 bg-white/10" />
                <span
                  className="font-bold text-lg"
                  style={{ color: "#D4AF37", textShadow: "0 0 20px rgba(212,175,55,0.4)" }}
                >
                  Mode: Offline Classes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
