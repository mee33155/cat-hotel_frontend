"use client";

import { PawPrint, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-footer-bg">
      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-accent/40 via-accent to-accent/40" />

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PawPrint className="w-6 h-6 text-accent" />
              <span className="font-serif text-[20px] text-footer-logo font-bold italic">
                Cat Hotel
              </span>
            </div>
            <p className="text-footer-muted text-[13px] leading-[1.7] mb-4">
              โรงแรมแมวพรีเมียมที่ให้มากกว่าที่พัก
              เราดูแลเจ้าเหมียวเหมือนคนในครอบครัว
            </p>
            <div className="text-footer-muted text-[12px]">
              Where Every Cat is Royalty 🐾
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-footer-logo font-semibold mb-4 text-[13px] tracking-[1px] uppercase">
              เมนู
            </h4>
            <div className="flex flex-col gap-2.5">
              <a href="#rooms" className="text-footer-muted hover:text-accent transition-colors text-[13px]">
                ห้องพัก
              </a>
              <a href="#services" className="text-footer-muted hover:text-accent transition-colors text-[13px]">
                บริการของเรา
              </a>
              <a href="#reviews" className="text-footer-muted hover:text-accent transition-colors text-[13px]">
                รีวิว
              </a>
              <a href="#" className="text-footer-muted hover:text-accent transition-colors text-[13px]">
                นโยบายการจอง
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-footer-logo font-semibold mb-4 text-[13px] tracking-[1px] uppercase">
              ติดต่อเรา
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5 text-footer-muted text-[13px]">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                02-XXX-XXXX
              </div>
              <div className="flex items-center gap-2.5 text-footer-muted text-[13px]">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                hello@cathotel.com
              </div>
              <div className="flex items-center gap-2.5 text-footer-muted text-[13px]">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                กรุงเทพมหานคร
              </div>
            </div>
            <a
              href="#rooms"
              className="inline-block mt-5 border border-accent text-accent px-5 py-2 rounded-full text-[13px] font-medium hover:bg-accent hover:text-white transition-all"
            >
              จองเลย
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="text-[11px] text-[#6a4f38]">
            &copy; {new Date().getFullYear()} Cat Hotel. All rights reserved.
          </div>
          <div className="text-[11px] text-[#6a4f38]">
            Bangkok, Thailand
          </div>
        </div>
      </div>
    </footer>
  );
}
