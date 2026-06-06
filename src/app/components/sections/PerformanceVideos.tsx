"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { performances } from "@/app/data/achievements";
import { GlassCard } from "../ui/GlassCard";
import { Play, Youtube } from "lucide-react";

export const PerformanceVideos = () => {
  const getEmbedUrl = (url: string) => {
    const id = url.split("v=")[1];
    return `https://www.youtube.com/embed/${id}`;
  };

  return (
    <section id="performances" className="py-24 px-4 bg-primary/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto">
        <SectionHeader 
          kannada="ಕಲಾ ಪ್ರದರ್ಶನಗಳು"
          english="Performance Journey"
          subtitle="Experience the soulful renditions and stage presence of our master and students."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {performances.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="p-0 border-white/5 bg-white/[0.01] group overflow-hidden">
                <div className="relative aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={getEmbedUrl(video.url)}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{video.title}</h4>
                    <p className="text-white/40 text-sm">Sri Veena Vani Sangeetha Vidyalaya</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30">
                    <Youtube className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="http://www.youtube.com/@SVVSVIDYALAYA2019"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass-panel border-secondary/20 text-secondary font-bold rounded-full hover:bg-secondary/10 transition-all"
          >
            <Youtube className="w-5 h-5" />
            Explore YouTube Channel
          </a>
        </div>
      </div>
    </section>
  );
};
