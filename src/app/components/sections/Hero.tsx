"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { fadeIn, fadeUp, staggerContainer } from "@/app/lib/animations";
import { Music, MessageCircle, Play, ChevronRight } from "lucide-react";
import { teacherData } from "@/app/data/teacher";
import { useRef } from "react";
import { SoundWaveCSS } from "@/app/components/ui/SoundWaveCSS";
import { useIsMobile } from "@/app/hooks/useIsMobile";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Disable parallax transforms on mobile — scroll listeners on mobile browser
  // run on the main thread and cause compositor jank. Static 0 values
  // unsubscribe from the motion value entirely.
  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "12%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, isMobile ? 1 : 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 0.97]);

  const springY = useSpring(yRaw, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4 pb-32 isolate"
    >
      {/* ── Pulsing gold ring behind title ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(147,51,234,0.05) 40%, transparent 70%)",
          animation: "glow-pulse 4s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* ── Decorative floating music note symbols (CSS) ── */}
      {["♩", "♫", "♬", "♭", "♯"].map((sym, i) => (
        <div
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{
            left: `${10 + i * 18}%`,
            top: `${15 + (i % 3) * 20}%`,
            color: i % 2 === 0 ? "rgba(212,175,55,0.12)" : "rgba(147,51,234,0.12)",
            fontSize: `${24 + i * 8}px`,
            animationName: `pfloat-${i * 7}`,
            animationDuration: `${5 + i * 1.5}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: `${-i * 1.2}s`,
          }}
          aria-hidden="true"
        >
          {sym}
        </div>
      ))}

      <motion.div
        style={{ y: springY, opacity, scale }}
        className="container mx-auto relative z-10 text-center"
      >
        <motion.div
          variants={staggerContainer(0.15, 0.3)}
          initial="initial"
          animate="animate"
          className="max-w-5xl mx-auto"
        >
          {/* Academy Badge */}
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-panel mb-10 bg-white/5 backdrop-blur-2xl relative"
            style={{
              boxShadow: "0 0 30px rgba(212,175,55,0.15), 0 0 60px rgba(147,51,234,0.1)",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
              Sri Veena Vani Sangeetha Vidyalaya
            </span>
          </motion.div>

          {/* Main Title Area */}
          <div className="relative mb-10">
            <motion.h1
              variants={fadeUp}
              className="kannada-heading text-6xl md:text-[10rem] mb-2 leading-none tracking-tighter text-white text-glow-gold"
            >
              ಸಂಗೀತವೇ ಜೀವನ
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center"
            >
              <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white/95 uppercase leading-none">
                Experience The{" "}
                <span className="text-gradient-purple-gold italic">Vidvath</span>{" "}
                Touch
              </h2>
            </motion.div>
          </div>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-2xl text-white/50 mb-8 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Unlock your musical potential under the guidance of{" "}
            <span className="text-white border-b border-secondary/50 mx-2 pb-1">
              Vidvath {teacherData.name}
            </span>
            . A legacy of 44+ stage performances and 8 years of master training.
          </motion.p>

          {/* Sound Wave Visualization */}
          <motion.div
            variants={fadeUp}
            className="flex justify-center mb-12"
          >
            <SoundWaveCSS barCount={48} height={56} variant="hero" />
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Primary CTA */}
            <a
              href="#courses"
              className="group relative px-10 py-5 font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
              style={{
                background: "white",
                color: "#1A0B2E",
                boxShadow: "0 0 30px rgba(212,175,55,0.25), 0 20px 50px rgba(0,0,0,0.3)",
              }}
            >
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.3) 50%, transparent 60%)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 1.5s linear infinite",
                }}
              />
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white relative z-10">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <span className="text-lg relative z-10">Enroll Now</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </a>

            {/* Secondary CTA */}
            <a
              href={`https://wa.me/91${teacherData.socials.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-10 py-5 text-white font-bold rounded-2xl flex items-center gap-3 text-lg group transition-all hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 30px rgba(147,51,234,0.15)",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #9333EA, #D4AF37)",
                  backgroundSize: "200% 200%",
                  padding: "1px",
                  animation: "border-move 3s linear infinite",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "destination-out",
                }}
              />
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              WhatsApp Inquiry
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Ambient Blobs — use blur only on desktop */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-secondary/8 rounded-full blur-[140px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/25 rounded-full blur-[160px] -z-10 animate-pulse-slow" />
      <div
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full blur-[100px] -z-10"
        style={{ background: "rgba(147,51,234,0.12)", animation: "glow-pulse 5s ease-in-out infinite" }}
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Discover</span>
        <div className="w-px h-16 bg-gradient-to-b from-secondary/60 via-white/20 to-transparent" />
      </motion.div>

      {/* Bottom gradient mask */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.6) 40%, rgba(5,5,5,0.95) 80%, #050505 100%)",
          zIndex: 5,
        }}
        aria-hidden="true"
      />
    </section>
  );
};
