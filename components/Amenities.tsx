"use client";

import { motion } from "framer-motion";

const services = [
  { icon: "🌬️", label: "เครื่องฟอกอากาศ", desc: "HEPA Filter ทุกห้อง" },
  { icon: "📹", label: "CCTV 24 ชม.", desc: "ดูน้องได้ตลอดเวลา" },
  { icon: "❄️", label: "แอร์ 24 ชม.", desc: "ควบคุมอุณหภูมิเหมาะสม" },
  { icon: "🏠", label: "ห้องพักสะอาด", desc: "ทำความสะอาดทุกวัน" },
  { icon: "🎾", label: "เวลาเล่น", desc: "กิจกรรมสร้างสรรค์" },
  { icon: "📸", label: "อัพเดทรูป/วีดีโอ", desc: "ส่งรูปน้องให้ทุกวัน" },
];

export default function Amenities() {
  return (
    <section id="services" className="py-14 md:py-20" style={{ background: "linear-gradient(180deg, #fdf6ef 0%, #fff8f2 100%)" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-accent-light text-accent text-[11px] tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-3 font-medium">
            บริการของเรา
          </span>
          <h2 className="font-serif text-[26px] md:text-[32px] text-heading font-bold">
            ดูแลเหมือนลูกหมี
          </h2>
          <p className="text-muted text-[14px] mt-2 max-w-[440px] mx-auto">
            เราใส่ใจทุกรายละเอียดเพื่อให้เจ้าเหมียวมีความสุขที่สุด
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 text-center border border-border-light hover:shadow-[0_8px_24px_rgba(120,70,30,0.10)] hover:-translate-y-1 transition-all duration-200 group"
            >
              <span className="text-[32px] block mb-2 group-hover:scale-110 transition-transform duration-200">
                {s.icon}
              </span>
              <div className="text-[13px] text-heading font-semibold mb-0.5">
                {s.label}
              </div>
              <div className="text-[11px] text-muted-lighter leading-[1.4]">
                {s.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
