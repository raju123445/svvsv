"use client";

import { teacherData } from "@/app/data/teacher";
import { motion } from "framer-motion";
import { Instagram, MapPin, MessageCircle, Navigation, Phone, Youtube } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

// Upward-drifting ambient particles
const FooterParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {Array.from({ length: 25 }).map((_, i) => {
      const size = 2 + Math.random() * 4;
      const left = Math.random() * 100;
      const delay = Math.random() * -10;
      const duration = 8 + Math.random() * 8;
      const isGold = i % 2 === 0;
      return (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: "0",
            background: isGold
              ? `rgba(212,175,55,${0.2 + Math.random() * 0.4})`
              : `rgba(147,51,234,${0.2 + Math.random() * 0.4})`,
            boxShadow: isGold
              ? `0 0 ${size * 3}px rgba(212,175,55,0.4)`
              : `0 0 ${size * 3}px rgba(147,51,234,0.4)`,
            animationName: "particle-drift",
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            animationTimingFunction: "ease-out",
            animationIterationCount: "infinite",
            "--drift-x": `${(Math.random() - 0.5) * 80}`,
          } as React.CSSProperties}
        />
      );
    })}
  </div>
);

export const ContactFooter = () => {
  return (
    <footer id="contact" className="bg-surface pt-24 pb-12 relative overflow-hidden">
      {/* Ambient particles */}
      <FooterParticles />

      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-primary/20 to-transparent -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-1 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, #D4AF37, #9333EA, #D4AF37, transparent)",
          backgroundSize: "200% 100%",
          animation: "border-move 4s linear infinite",
          boxShadow: "0 0 20px rgba(212,175,55,0.4), 0 0 40px rgba(147,51,234,0.2)",
        }}
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Contact Info */}
          <div className="lg:col-span-5">
            <h2 className="kannada-heading text-4xl text-secondary mb-4"
              style={{ textShadow: "0 0 20px rgba(212,175,55,0.4)" }}
            >
              ಸಂಪರ್ಕಿಸಿ
            </h2>
            <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-tight">
              Visit Our Academy
            </h3>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.2)",
                    boxShadow: "0 0 20px rgba(212,175,55,0.15)",
                  }}
                >
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-1">Address</p>
                  <p className="text-white/80 leading-relaxed max-w-xs">{teacherData.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.2)",
                    boxShadow: "0 0 20px rgba(212,175,55,0.15)",
                  }}
                >
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-1">Phone / WhatsApp</p>
                  <p className="text-white/80 leading-relaxed">+91 {teacherData.socials.phone}</p>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4 mt-12">
                {[
                  { href: teacherData.socials.youtube, icon: <Youtube className="w-6 h-6" />, hoverColor: "#EF4444" },
                  { href: teacherData.socials.instagram, icon: <Instagram className="w-6 h-6" />, hoverColor: "#EC4899" },
                  { href: `https://wa.me/91${teacherData.socials.whatsapp}`, icon: <MessageCircle className="w-6 h-6" />, hoverColor: "#22C55E" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/60 transition-all"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = social.hoverColor;
                      el.style.borderColor = `${social.hoverColor}50`;
                      el.style.boxShadow = `0 0 20px ${social.hoverColor}50`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "rgba(255,255,255,0.6)";
                      el.style.borderColor = "rgba(255,255,255,0.1)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-7 h-full">
            {/* Gradient border around map */}
            <div
              className="rounded-2xl p-[1.5px]"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #9333EA, #F59E0B, #D4AF37)",
                backgroundSize: "300% 300%",
                animation: "border-move 6s linear infinite",
                boxShadow: "0 0 40px rgba(147,51,234,0.15), 0 0 80px rgba(212,175,55,0.08)",
              }}
            >
              <GlassCard className="p-2 border-transparent bg-white/[0.01] h-[400px] overflow-hidden group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1110.6094254848384!2d76.1313369!3d16.335956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc6e7195f1905ab%3A0xe5495913f89073c6!2sSri%20Veena%20Vani%20Sangeet%20Vidyalaya!5e0!3m2!1sen!2sin!4v1717700000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={teacherData.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 right-6 px-6 py-3 bg-secondary text-primary font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-all shadow-2xl"
                  style={{ boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  Get Directions
                </a>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Gold glow divider */}
        <div
          className="mt-16 h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), rgba(147,51,234,0.3), rgba(212,175,55,0.3), transparent)",
            boxShadow: "0 0 10px rgba(212,175,55,0.2)",
          }}
        />

        {/* Copyright */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
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
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center z-50 group hover:scale-110 transition-transform"
        style={{ boxShadow: "0 0 20px rgba(34,197,94,0.4), 0 0 40px rgba(34,197,94,0.2)" }}
      >
        <MessageCircle className="w-8 h-8 text-white fill-current" />
        <div className="absolute right-20 bg-white text-primary text-xs font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Enquire Now
        </div>
      </motion.a>
    </footer>
  );
};
