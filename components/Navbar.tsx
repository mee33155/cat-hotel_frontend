"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, PawPrint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "หน้าแรก", href: "#hero" },
  { label: "ห้องพัก", href: "/Room" },
  { label: "บริการ", href: "#services" },
  { label: "รีวิว", href: "#reviews" },
  { label: "ติดต่อ", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(120,70,30,0.08)] py-3"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <PawPrint className="w-6 h-6 text-accent" />
          <span className="font-serif text-[20px] md:text-[22px] text-primary font-bold tracking-[-0.3px]">
            Cat<span className="italic text-accent"> Hotel</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex gap-7 list-none">
          {links.map((l) => (
            <li key={l.href}>
              {l.href.startsWith("#") ? (
                <a
                  href={l.href}
                  className="text-[13px] text-primary/70 hover:text-accent transition-colors tracking-[0.3px] font-medium"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  href={l.href}
                  className="text-[13px] text-primary/70 hover:text-accent transition-colors tracking-[0.3px] font-medium"
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <Link
          href="/Room"
          className="hidden lg:inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-full text-[13px] font-medium transition-colors shadow-sm"
        >
          จองเลย
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-primary p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg p-5 flex flex-col gap-4 lg:hidden border-t border-border-light"
          >
            {links.map((l) => (
              l.href.startsWith("#") ? (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[14px] text-primary hover:text-accent transition-colors font-medium py-1"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[14px] text-primary hover:text-accent transition-colors font-medium py-1"
                >
                  {l.label}
                </Link>
              )
            ))}
            <Link
              href="/Room"
              onClick={() => setMobileOpen(false)}
              className="bg-accent text-white px-5 py-2.5 rounded-full text-[14px] font-medium text-center hover:bg-accent-hover transition-colors"
            >
              จองเลย
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
