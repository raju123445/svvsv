"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "../ui/SectionHeader";
import { performances } from "@/app/data/achievements";
import { Youtube } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { useIsMobile } from "@/app/hooks/useIsMobile";

const CSS_NOTES = ["♩", "♫", "♬", "♭", "♯", "♪"];

/**
 * Derives a YouTube video ID from a full URL or a youtu.be short link.
 */
function getVideoId(url: string): string {
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1]?.split("?")[0] ?? "";
  }
  return url.split("v=")[1]?.split("&")[0] ?? "";
}

function getEmbedUrl(url: string): string {
  const id = getVideoId(url);
  // autoplay=1 so the video starts immediately when the user clicks
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}

function getThumbnailUrl(url: string): string {
  const id = getVideoId(url);
  // hqdefault is 480×360 — good balance of quality and size
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/** A single lazy-loading video card */
const VideoCard = ({
  video,
  index,
}: {
  video: (typeof performances)[number];
  index: number;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => setIsPlaying(true), []);

  const thumbnailUrl = getThumbnailUrl(video.url);
  const embedUrl = getEmbedUrl(video.url);

  return (
    <motion.div
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
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 50px rgba(212,175,55,0.25), 0 0 80px rgba(147,51,234,0.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 30px rgba(147,51,234,0.1)";
        }}
      >
        <div className="bg-surface rounded-2xl overflow-hidden">
          <div className="relative aspect-video">
            {isPlaying ? (
              /* ── Real iframe: only loaded after user clicks ── */
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* ── Lightweight thumbnail placeholder ── */
              <button
                onClick={handlePlay}
                className="relative w-full h-full group/play cursor-pointer focus:outline-none"
                aria-label={`Play ${video.title}`}
              >
                {/* Thumbnail image via Next.js — lazy loaded, correct srcset */}
                <Image
                  src={thumbnailUrl}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Dark scrim */}
                <div className="absolute inset-0 bg-black/40 group-hover/play:bg-black/20 transition-colors" />
                {/* YouTube-style play button */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover/play:scale-110 duration-200"
                    style={{
                      background: "rgba(220,38,38,0.9)",
                      boxShadow: "0 0 30px rgba(220,38,38,0.4)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-7 h-7 translate-x-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}
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
  );
};

export const PerformanceVideos = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Disable parallax on mobile
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0px", "0px"] : ["40px", "-40px"]
  );

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
            <VideoCard key={video.id} video={video} index={index} />
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
