"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { API_BASE } from "@/lib/api";

const themes: Record<number, { bg: string; emoji: string; badge: string; badgeCls: string }> = {
  1: { bg: "from-[#f9ede0] to-[#f5e3d0]", emoji: "🐱", badge: "⭐ ยอดนิยม", badgeCls: "bg-[#fff0e5] text-accent" },
  2: { bg: "from-[#f0e8fa] to-[#e8ddf5]", emoji: "👑", badge: "✨ Premium", badgeCls: "bg-[#f0e8fa] text-[#6b3fa0]" },
};
const defaultTheme = { bg: "from-[#e8f5e8] to-[#d9f0d9]", emoji: "🌿", badge: "🌱 ใหม่", badgeCls: "bg-[#e8f5e8] text-[#3b6d11]" };

export default function RoomCard({ room, index, onBook }: Props) {
  const router = useRouter();
  const t = themes[room.id] || defaultTheme;

  const handleClick = () => {
    router.push(`/rooms/${room.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden border border-border-light cursor-pointer transition-shadow hover:shadow-[0_12px_32px_rgba(120,70,30,0.12)] group"
    >
      {/* Image */}
      <div className={`h-[140px] bg-gradient-to-br ${t.bg} flex items-center justify-center text-5xl relative group-hover:scale-[1.02] transition-transform duration-300 overflow-hidden`}>
        {room.image_urls?.[0] ? (
          <img
            src={`${API_BASE}${room.image_urls[0]}`}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        ) : (
          t.emoji
        )}
        <span
          className={`absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full font-medium tracking-[0.3px] ${t.badgeCls}`}
        >
          {t.badge}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="font-serif text-[16px] text-heading font-bold mb-1 group-hover:text-accent transition-colors">
          {room.name}
        </div>
        <p className="text-[12px] text-muted-light leading-[1.5] mb-3">
          {room.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[17px] font-semibold text-accent">
            ฿{room.price.toLocaleString()}
            <span className="text-[11px] text-muted-lighter font-normal ml-0.5">/ คืน</span>
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3.5 h-3.5 ${s <= 5 ? "text-gold-star fill-gold-star" : "text-border"}`}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
            className="flex-1 bg-accent/10 hover:bg-accent hover:text-white text-accent py-2 rounded-full text-[13px] font-medium transition-all"
          >
            ดูรายละเอียด
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onBook(room.id); }}
            className="flex-1 bg-accent hover:bg-accent-hover text-white py-2 rounded-full text-[13px] font-medium transition-all"
          >
            จองเลย
          </button>
        </div>
      </div>
    </motion.div>
  );
}
