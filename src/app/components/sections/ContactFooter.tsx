"use client";

import { teacherData } from "@/app/data/teacher";
import { motion } from "framer-motion";
import { Instagram, MapPin, MessageCircle, Navigation, Phone, Youtube } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export const ContactFooter = () => {
  return (
    <footer id="contact" className="bg-surface pt-24 pb-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-primary/20 to-transparent -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Info */}
          <div className="lg:col-span-5">
            <h2 className="kannada-heading text-4xl text-secondary mb-4">ಸಂಪರ್ಕಿಸಿ</h2>
            <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-tight">Visit Our Academy</h3>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-1">Address</p>
                  <p className="text-white/80 leading-relaxed max-w-xs">
                    {teacherData.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-1">Phone / WhatsApp</p>
                  <p className="text-white/80 leading-relaxed">
                    +91 {teacherData.socials.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 mt-12">
                <a 
                  href={teacherData.socials.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-red-500 hover:border-red-500/30 transition-all"
                >
                  <Youtube className="w-6 h-6" />
                </a>
                <a 
                  href={teacherData.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-pink-500 hover:border-pink-500/30 transition-all"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href={`https://wa.me/91${teacherData.socials.whatsapp}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-green-500 hover:border-green-500/30 transition-all"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-7 h-full">
            <GlassCard className="p-2 border-white/5 bg-white/[0.01] h-[400px] overflow-hidden group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1110.6094254848384!2d76.1313369!3d16.335956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc6e7195f1905ab%3A0xe5495913f89073c6!2sSri%20Veena%20Vani%20Sangeet%20Vidyalaya!5e0!3m2!1sen!2sin!4v1717700000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a 
                href={teacherData.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 right-6 px-6 py-3 bg-secondary text-primary font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-all shadow-2xl"
              >
                <Navigation className="w-4 h-4 fill-current" />
                Get Directions
              </a>
            </GlassCard>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
          <p className="text-white/20 text-xs uppercase tracking-[0.3em]">
            © 2026 Sri Veena Vani Sangeetha Vidyalaya. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/20">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Sticky WhatsApp Button */}
      <motion.a
        href={`https://wa.me/91${teacherData.socials.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] z-50 group hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-8 h-8 text-white fill-current" />
        <div className="absolute right-20 bg-white text-primary text-xs font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
           Enquire Now
        </div>
      </motion.a>
    </footer>
  );
};
