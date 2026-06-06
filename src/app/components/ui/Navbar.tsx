"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Music } from "lucide-react";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Achievements", href: "#achievements" },
    { name: "Performances", href: "#performances" },
    { name: "Courses", href: "#courses" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`glass-panel rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "bg-primary/80 border-secondary/20 shadow-2xl shadow-primary/40" : "bg-transparent border-transparent"
        }`}>
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
              <Music className="w-6 h-6" />
            </div>
            <span className="text-white font-bold tracking-tighter text-lg hidden sm:block">SVVS</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/60 hover:text-secondary text-xs uppercase tracking-widest font-bold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a 
            href="#courses"
            className="px-6 py-2 bg-secondary text-primary text-xs font-bold rounded-full hover:scale-105 transition-transform"
          >
            JOIN NOW
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
