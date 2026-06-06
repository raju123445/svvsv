"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { courses } from "@/app/data/courses";
import { GlassCard } from "../ui/GlassCard";
import { CheckCircle2, Music4 } from "lucide-react";
import { staggerContainer, fadeUp } from "@/app/lib/animations";

export const Courses = () => {
  return (
    <section id="courses" className="py-24 px-4 bg-surface">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {courses.map((course, index) => (
            <motion.div key={course.id} variants={fadeUp} className="h-full">
              <GlassCard className="h-full border-white/5 bg-white/[0.02] flex flex-col p-8 group hover:border-secondary/30 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                    <Music4 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold border border-white/10 px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>

                <h4 className="kannada-heading text-2xl text-secondary mb-2">
                  {course.kannadaTitle}
                </h4>
                <h5 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">
                  {course.englishTitle}
                </h5>
                <p className="text-white/50 text-sm mb-8 leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-auto">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4">What you'll learn:</p>
                  <ul className="space-y-3">
                    {course.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/40 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-secondary/40 shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20">
          <GlassCard className="max-w-4xl mx-auto py-12 px-8 text-center border-secondary/20 bg-primary/20">
            <h4 className="text-2xl font-bold text-white mb-4">Looking for something specific?</h4>
            <p className="text-white/60 mb-8">
              We also offer specialized training in Bhajans, Film Songs, and various instruments. 
              Contact us to discuss your personalized musical journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-secondary font-bold text-lg">Call Us: 9449533852</span>
              <div className="hidden sm:block w-[1px] h-6 bg-white/10" />
              <span className="text-secondary font-bold text-lg">Mode: Offline Classes</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
