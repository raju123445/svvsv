"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "../ui/SectionHeader";
import { achievements } from "@/app/data/achievements";
import { GlassCard } from "../ui/GlassCard";
import { staggerContainer, fadeUp } from "@/app/lib/animations";

export const AchievementsGallery = () => {
  return (
    <section id="achievements" className="py-24 px-4 bg-surface">
      <div className="container mx-auto">
        <SectionHeader 
          kannada="ಸಾಧನೆಗಳ ಪ್ರದರ್ಶನ"
          english="Achievements Showcase"
          subtitle="A glimpse into our journey of musical excellence and recognition."
        />

        <motion.div 
          variants={staggerContainer(0.1, 0.2)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div key={achievement.id} variants={fadeUp}>
              <GlassCard className="p-0 border-white/5 bg-white/[0.02] h-full">
                <div className="relative aspect-[4/3] overflow-hidden group">
                  <Image
                    src={achievement.image}
                    alt={achievement.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-xl font-bold text-white mb-1">{achievement.title}</h4>
                    <p className="text-white/60 text-sm line-clamp-2">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-20 text-center">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-6">And many more student achievements...</p>
          <div className="flex flex-wrap justify-center gap-4">
             {/* Small placeholder thumbnails for more images if needed */}
          </div>
        </div>
      </div>
    </section>
  );
};
