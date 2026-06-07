"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { performances } from "@/app/data/achievements";
import { GlassCard } from "../ui/GlassCard";
import { Youtube } from "lucide-react";
import { useRef } from "react";

const CSS_NOTES = ["♩", "♫", "♬", "♭", "♯", "♪"];

export const PerformanceVideos = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  const getEmbedUrl = (url: string) => {
    // Handle youtu.be/ID and youtube.com/watch?v=ID
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    const id = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  };

  return (
    <section
      ref={sectionRef}
      id="performances"
      className="py-24 px-4 bg-primary/5 relative overflow-hidden"
    >
      {/* Floating CSS music notes */}
      {CSS_NOTES.map((sym, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none font-bold"
          aria-hidden="true"
          style={{
            left: `${5 + i * 16}%`,
            top: `${10 + (i % 3) * 25}%`,
            fontSize: `${28 + i * 6}px`,
            color: i % 2 === 0 ? "rgba(212,175,55,0.07)" : "rgba(147,51,234,0.07)",
            animationName: "particle-float",
            animationDuration: `${4 + i * 1.3}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: `${-i * 0.8}s`,
          }}
        >
          {sym}
        </div>
      ))}

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10"
        style={{ background: "rgba(212,175,55,0.05)" }}
      />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] -z-10"
        style={{ background: "rgba(147,51,234,0.06)" }}
      />

      <div className="container mx-auto">
        <SectionHeader
          kannada="ಕಲಾ ಪ್ರದರ್ಶನಗಳು"
          english="Performance Journey"
          subtitle="Experience the soulful renditions and stage presence of our master and students."
        />

        <motion.div
          style={{ y }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16"
        >
          {performances.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              {/* Animated gradient border wrapper */}
              <div
                className="rounded-2xl p-[1.5px] group"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #9333EA, #F59E0B, #D4AF37)",
                  backgroundSize: "300% 300%",
                  animation: `border-move ${5 + index * 0.5}s linear infinite`,
                  boxShadow: "0 0 30px rgba(147,51,234,0.1)",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(212,175,55,0.25), 0 0 80px rgba(147,51,234,0.15)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(147,51,234,0.1)";
                }}
              >
                <div className="bg-surface rounded-2xl overflow-hidden">
                  <div className="relative aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={getEmbedUrl(video.url)}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{video.title}</h4>
                      <p className="text-white/40 text-sm">Sri Veena Vani Sangeetha Vidyalaya</p>
                    </div>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border"
                      style={{
                        background: "rgba(220,38,38,0.15)",
                        borderColor: "rgba(220,38,38,0.35)",
                        boxShadow: "0 0 20px rgba(220,38,38,0.2)",
                      }}
                    >
                      <Youtube className="w-5 h-5 text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <a
            href="http://www.youtube.com/@SVVSVIDYALAYA2019"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-full transition-all hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(212,175,55,0.25)",
              color: "#D4AF37",
              boxShadow: "0 0 20px rgba(212,175,55,0.1), 0 0 40px rgba(147,51,234,0.08)",
            }}
          >
            <Youtube className="w-5 h-5" />
            Explore YouTube Channel
          </a>
        </div>
      </div>
    </section>
  );
};
