"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/app/lib/animations";

interface SectionHeaderProps {
  kannada: string;
  english: string;
  subtitle?: string;
  center?: boolean;
}

export const SectionHeader = ({ kannada, english, subtitle, center = true }: SectionHeaderProps) => {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeUp}
      className={`mb-12 ${center ? "text-center" : "text-left"}`}
    >
      <h2 className="kannada-heading text-3xl md:text-5xl mb-2 text-secondary">
        {kannada}
      </h2>
      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white/90 uppercase mb-4">
        {english}
      </h3>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-white/60 text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-20 bg-secondary ${center ? "mx-auto" : "ml-0"}`} />
    </motion.div>
  );
};
