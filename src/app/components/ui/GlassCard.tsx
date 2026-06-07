"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/animations";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  glowColor?: "gold" | "purple" | "both" | "none";
}

export const GlassCard = ({
  children,
  className,
  animate = true,
  glowColor = "both",
}: GlassCardProps) => {
  const glowStyles: Record<string, React.CSSProperties> = {
    gold: {
      boxShadow: "0 0 0px rgba(212,175,55,0)",
      transition: "box-shadow 0.4s ease",
    },
    purple: {
      boxShadow: "0 0 0px rgba(147,51,234,0)",
      transition: "box-shadow 0.4s ease",
    },
    both: {
      boxShadow: "0 0 20px rgba(212,175,55,0.06), 0 0 40px rgba(147,51,234,0.04)",
      transition: "box-shadow 0.4s ease",
    },
    none: {},
  };

  const hoverGlowStyles: Record<string, string> = {
    gold: "hover:shadow-[0_0_30px_rgba(212,175,55,0.25),0_0_60px_rgba(212,175,55,0.1)]",
    purple: "hover:shadow-[0_0_30px_rgba(147,51,234,0.25),0_0_60px_rgba(147,51,234,0.1)]",
    both: "hover:shadow-[0_0_30px_rgba(212,175,55,0.2),0_0_60px_rgba(147,51,234,0.15),0_0_100px_rgba(167,139,250,0.08)]",
    none: "",
  };

  const content = (
    <div
      className={cn(
        "glass-panel glass-glow p-6 rounded-2xl overflow-hidden relative group transition-all duration-500",
        hoverGlowStyles[glowColor],
        className
      )}
      style={glowStyles[glowColor]}
    >
      {/* Shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Subtle gradient border always visible */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(147,51,234,0.08), rgba(212,175,55,0.1))",
          backgroundSize: "200% 200%",
          animation: "border-move 8s linear infinite",
          opacity: 0.15,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
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
