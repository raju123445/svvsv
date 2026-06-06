"use client";

import { motion } from "framer-motion";
import { BackgroundWaves } from "../three/BackgroundWaves";
import { fadeIn, fadeUp, staggerContainer } from "@/app/lib/animations";
import { Music, MessageCircle, Play } from "lucide-react";
import { teacherData } from "@/app/data/teacher";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4">
      <BackgroundWaves />
      
      <div className="container mx-auto relative z-10 text-center">
        <motion.div
          variants={staggerContainer(0.2, 0.5)}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-secondary/30 mb-8"
          >
            <Music className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-secondary text-sm font-medium tracking-wider uppercase">
              Sri Veena Vani Sangeetha Vidyalaya
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="kannada-heading text-5xl md:text-8xl mb-4 leading-tight"
          >
            ಸಂಗೀತವೇ ಜೀವನ
          </motion.h1>
          
          <motion.h2 
            variants={fadeUp}
            className="text-2xl md:text-4xl font-bold tracking-tight text-white/90 mb-8 uppercase"
          >
            Elevate Your Soul Through Music
          </motion.h2>

          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Learn Classical, Light Music, and Instruments from 
            <span className="text-secondary font-semibold ml-1">Vidvath {teacherData.name}</span>. 
            Join our 8-year legacy of musical excellence in Muddebihal.
          </motion.p>

          <motion.div 
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a 
              href="#courses"
              className="group relative px-8 py-4 bg-secondary text-primary font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <Play className="w-5 h-5 fill-current" />
              Join Music Classes
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </a>

            <a 
              href={`https://wa.me/91${teacherData.socials.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass-panel border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              WhatsApp Inquiry
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
};
