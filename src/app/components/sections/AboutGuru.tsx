"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { teacherData } from "@/app/data/teacher";
import { fadeUp, staggerContainer } from "@/app/lib/animations";
import { Award, BookOpen, Music, Star } from "lucide-react";

export const AboutGuru = () => {
  return (
    <section id="about" className="py-24 px-4 bg-surface relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto">
        <SectionHeader 
          kannada="ಗುರುವಿನ ಪರಿಚಯ"
          english="About The Guru"
          subtitle="Learn from a dedicated professional with a deep passion for musical heritage."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-16">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-secondary/20 shadow-2xl group">
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
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-secondary/30 rounded-tr-3xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-secondary/30 rounded-bl-3xl -z-10" />
          </motion.div>

          {/* Content Column */}
          <motion.div 
            variants={staggerContainer(0.1, 0.2)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <motion.div variants={fadeUp} className="mb-8">
              <h4 className="text-3xl font-bold text-white mb-6 leading-tight">
                A Journey of <span className="text-secondary">Musical Excellence</span> & Dedication
              </h4>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {teacherData.philosophy}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeUp}>
                <GlassCard className="h-full border-white/5 bg-white/[0.02]">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-secondary" />
                  </div>
                  <h5 className="text-white font-bold mb-2">Qualifications</h5>
                  <ul className="text-white/50 text-sm space-y-1">
                    {teacherData.qualifications.map((q, i) => (
                      <li key={i}>• {q}</li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>

              <motion.div variants={fadeUp}>
                <GlassCard className="h-full border-white/5 bg-white/[0.02]">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <Music className="w-6 h-6 text-secondary" />
                  </div>
                  <h5 className="text-white font-bold mb-2">Specializations</h5>
                  <p className="text-white/50 text-sm line-clamp-2">
                    {teacherData.specializations.slice(0, 3).join(", ")} & more...
                  </p>
                </GlassCard>
              </motion.div>

              <motion.div variants={fadeUp}>
                <GlassCard className="h-full border-white/5 bg-white/[0.02]">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                  <h5 className="text-white font-bold mb-2">Performances</h5>
                  <p className="text-white/50 text-sm">
                    {teacherData.performances} Successful stage performances across the region.
                  </p>
                </GlassCard>
              </motion.div>

              <motion.div variants={fadeUp}>
                <GlassCard className="h-full border-white/5 bg-white/[0.02]">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-secondary" />
                  </div>
                  <h5 className="text-white font-bold mb-2">Experience</h5>
                  <p className="text-white/50 text-sm">
                    Teaching and nurturing musical talent for over {teacherData.experience}.
                  </p>
                </GlassCard>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="mt-10">
              <a 
                href={`https://wa.me/91${teacherData.socials.whatsapp}`}
                className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all"
              >
                <span>Connect with Chaitra Dambal</span>
                <span className="text-2xl">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
