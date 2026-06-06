"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/animations";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const GlassCard = ({ children, className, animate = true }: GlassCardProps) => {
  const content = (
    <div className={cn("glass-panel p-6 rounded-2xl overflow-hidden relative group", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
};
