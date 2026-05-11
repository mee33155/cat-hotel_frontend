"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    avatar: "🐈",
    name: "คุณมาลี",
    sub: "เจ้าของ ด็อตดาย",
    text: "ด็อตดายได้รับการดูแลอย่างดีเยี่ยม กลับบ้านมาสดชื่นมาก จะพาน้องมาอีกแน่นอนค่ะ!",
    stars: 5,
    date: "2 สัปดาห์ที่แล้ว",
  },
  {
    avatar: "🐱",
    name: "คุณอาทิตย์",
    sub: "เจ้าของ มูมู่",
    text: "ประทับใจมากครับ ทีมงานส่งรูปน้องให้ทุกวัน อุ่นใจมากเวลาไปเที่ยว",
    stars: 5,
    date: "1 เดือนที่แล้ว",
  },
  {
    avatar: "😺",
    name: "คุณจิราภรณ์",
    sub: "เจ้าของ น้องแมว",
    text: "สะอาด ปลอดภัย ทีมงานเป็นกันเอง น้องแมวชอบมากเลยค่ะ ไม่ต้องกังวลเลย",
    stars: 5,
    date: "3 สัปดาห์ที่แล้ว",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-accent-light text-accent text-[11px] tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-3 font-medium">
            รีวิว
          </span>
          <h2 className="font-serif text-[26px] md:text-[32px] text-heading font-bold">
            เสียงจากเจ้าของแมว
          </h2>
          <p className="text-muted text-[14px] mt-2">
            ความไว้วางใจจากลูกค้ากว่า 200+ คน
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-surface rounded-2xl p-6 border border-border-light relative"
            >
              <Quote className="absolute top-4 right-5 w-8 h-8 text-accent/10" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-[#f0e8d5] flex items-center justify-center text-xl shrink-0 border border-border-light">
                  {r.avatar}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-heading">
                    {r.name}
                  </div>
                  <div className="text-[11px] text-muted-lighter">{r.sub}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= r.stars ? "text-gold-star fill-gold-star" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-[13px] text-muted leading-[1.7]">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="text-[11px] text-muted-lighter mt-3">{r.date}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
