"use client";

import { motion } from "framer-motion";
import { MapPin, PawPrint, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fff8f0 0%, #fdecd8 60%, #f9dfc6 100%)" }}
    >
      {/* Paw prints bg */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <text x="3%" y="18%" fontSize="70">🐾</text>
          <text x="80%" y="10%" fontSize="45">🐾</text>
          <text x="50%" y="85%" fontSize="55">🐾</text>
          <text x="90%" y="65%" fontSize="38">🐾</text>
          <text x="12%" y="70%" fontSize="32">🐾</text>
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text side */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-1.5 mb-5"
            >
              <PawPrint className="w-3.5 h-3.5 text-accent" />
              <span className="text-[11px] tracking-[1.5px] uppercase text-accent font-medium">
                โรงแรมแมว บริการรับฝากแมว
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="font-serif text-[34px] sm:text-[42px] md:text-[52px] text-heading-dark leading-[1.15] font-bold mb-4"
            >
              ให้น้องแมวรู้สึก
              <br />
              ราวอยู่<em className="text-accent">บ้าน</em>ทุกวัน
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="text-[15px] md:text-[16px] text-muted max-w-[460px] mx-auto lg:mx-0 mb-4 leading-[1.7] font-light"
            >
              มอบประสบการณ์การพักผ่อนระดับพรีเมียมให้เจ้าเหมียวของคุณ
              พร้อมการดูแลที่ใส่ใจทุกขั้นตอน เหมือนอยู่บ้าน
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex items-center gap-1.5 text-[13px] text-muted-light mb-7 justify-center lg:justify-start"
            >
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>กรุงเทพ &middot; สีลม &middot; สาทร &middot; สามย่าน</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
            >
              <a
                href="#rooms"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-7 py-3 rounded-full text-[14px] font-medium transition-colors shadow-[0_4px_16px_rgba(200,121,65,0.3)]"
              >
                จองห้องพัก
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-accent/30 text-accent hover:bg-accent hover:text-white px-7 py-3 rounded-full text-[14px] font-medium transition-all"
              >
                ดูบริการของเรา
              </a>
            </motion.div>
          </div>

          {/* Image side — large cat placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1 max-w-md lg:max-w-lg"
          >
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-cozy-bg via-royal-bg to-garden-bg flex items-center justify-center overflow-hidden shadow-[0_12px_48px_rgba(120,70,30,0.15)] border border-border-light">
                <span className="text-[80px] md:text-[100px] select-none">🐱</span>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 -left-3 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_20px_rgba(120,70,30,0.12)] border border-border-light flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <span className="text-lg">⭐</span>
                  <span className="text-lg">⭐</span>
                  <span className="text-lg">⭐</span>
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-heading">4.9/5</div>
                  <div className="text-[10px] text-muted-lighter">200+ รีวิว</div>
                </div>
              </div>
              {/* Another badge */}
              <div className="absolute -top-2 -right-2 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_20px_rgba(120,70,30,0.12)] border border-border-light">
                <div className="text-[11px] text-muted-lighter font-medium">เปิดให้บริการ</div>
                <div className="text-[14px] font-bold text-accent">ทุกวัน 24 ชม.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
