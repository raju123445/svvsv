"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { teacherData } from "@/app/data/teacher";
import { fadeUp, staggerContainer } from "@/app/lib/animations";
import { Award, BookOpen, Music, Star } from "lucide-react";
import { useRef } from "react";

export const AboutGuru = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: image column moves up as section scrolls into view
  const imageY = useTransform(scrollYProgress, [0, 1], ["60px", "-60px"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 px-4 bg-surface relative overflow-hidden z-10"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] -z-10"
        style={{ background: "radial-gradient(circle, rgba(147,51,234,0.12) 0%, rgba(26,11,46,0.3) 60%, transparent 80%)" }}
      />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[120px] -z-10"
        style={{ background: "rgba(212,175,55,0.06)" }}
      />

      <div className="container mx-auto">
        <SectionHeader
          kannada="ಗುರುವಿನ ಪರಿಚಯ"
          english="About The Guru"
          subtitle="Learn from a dedicated professional with a deep passion for musical heritage."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-16">
          {/* Image Column with Parallax */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ y: imageY }}
            className="lg:col-span-5 relative"
          >
            {/* Purple glow halo behind photo */}
            <div
              className="absolute inset-0 rounded-3xl -z-10 blur-2xl"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(147,51,234,0.3) 0%, rgba(212,175,55,0.1) 60%, transparent 80%)",
                transform: "scale(1.15)",
                animation: "glow-pulse 4s ease-in-out infinite",
              }}
              aria-hidden="true"
            />

            {/* Animated gradient border around photo */}
            <div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group"
              style={{
                padding: "2px",
                background: "linear-gradient(135deg, #D4AF37, #9333EA, #F59E0B, #A855F7, #D4AF37)",
                backgroundSize: "300% 300%",
                animation: "border-move 5s linear infinite",
              }}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image
                  src={teacherData.image}
                  alt={teacherData.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />

                {/* Achievement Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <GlassCard className="py-4 px-6 border-secondary/30 bg-primary/40 backdrop-blur-md" animate={false}>
                    <p className="text-secondary font-bold text-lg mb-1">{teacherData.name}</p>
                    <p className="text-white/70 text-sm uppercase tracking-widest">{teacherData.title}</p>
                  </GlassCard>
                </div>
              </div>
            </div>

            {/* Corner decorative brackets */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-secondary/40 rounded-tr-3xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-purple-500/40 rounded-bl-3xl -z-10" />
          </motion.div>

          {/* Content Column with Parallax */}
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            style={{ y: contentY }}
            className="lg:col-span-7"
          >
            <motion.div variants={fadeUp} className="mb-8">
              <h4 className="text-3xl font-bold text-white mb-6 leading-tight">
                A Journey of{" "}
                <span className="text-gradient-purple-gold">Musical Excellence</span>{" "}
                & Dedication
              </h4>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {teacherData.philosophy}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <BookOpen className="w-6 h-6 text-secondary" />,
                  title: "Qualifications",
                  content: teacherData.qualifications.map((q, i) => (
                    <li key={i} className="text-white/50 text-sm">• {q}</li>
                  )),
                  isUl: true,
                },
                {
                  icon: <Music className="w-6 h-6 text-secondary" />,
                  title: "Specializations",
                  content: (
                    <p className="text-white/50 text-sm line-clamp-3">
                      {teacherData.specializations.slice(0, 3).join(", ")} & more...
                    </p>
                  ),
                },
                {
                  icon: <Award className="w-6 h-6 text-secondary" />,
                  title: "Performances",
                  content: (
                    <p className="text-white/50 text-sm">
                      {teacherData.performances} Successful stage performances across the region.
                    </p>
                  ),
                },
                {
                  icon: <Star className="w-6 h-6 text-secondary" />,
                  title: "Experience",
                  content: (
                    <p className="text-white/50 text-sm">
                      Teaching and nurturing musical talent for over {teacherData.experience}.
                    </p>
                  ),
                },
              ].map((card, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <GlassCard className="h-full border-white/5 bg-white/[0.02] hover:border-secondary/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4"
                      style={{ boxShadow: "0 0 20px rgba(212,175,55,0.15)" }}>
                      {card.icon}
                    </div>
                    <h5 className="text-white font-bold mb-2">{card.title}</h5>
                    {card.isUl ? (
                      <ul className="text-white/50 text-sm space-y-1">{card.content}</ul>
                    ) : card.content}
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-10">
              <a
                href={`https://wa.me/91${teacherData.socials.whatsapp}`}
                className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all group"
              >
                <span>Connect with Chaitra Dambal</span>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
