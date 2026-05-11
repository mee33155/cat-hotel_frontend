"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Cat, Loader2, Bed, Calendar } from "lucide-react";

type Room = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  room: Room | null;
  defaultCheckIn?: string;
  defaultCheckOut?: string;
  onClose: () => void;
  onSubmit: (data: { customerName: string; catName: string; checkIn: string; checkOut: string }) => Promise<void>;
};

export default function BookingModal({ room, defaultCheckIn, defaultCheckOut, onClose, onSubmit }: Props) {
  const [customerName, setCustomerName] = useState("");
  const [catName, setCatName] = useState("");
  const [checkIn, setCheckIn] = useState(defaultCheckIn ?? "");
  const [checkOut, setCheckOut] = useState(defaultCheckOut ?? "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ customer?: string; cat?: string; checkIn?: string; checkOut?: string }>({});

  if (!room) return null;

  const validate = () => {
    const e: typeof errors = {};
    if (!customerName.trim()) e.customer = "กรุณากรอกชื่อเจ้าของ";
    if (!catName.trim()) e.cat = "กรุณากรอกชื่อแมว";
    if (!checkIn) e.checkIn = "กรุณาเลือกวันเช็คอิน";
    if (!checkOut) e.checkOut = "กรุณาเลือกวันเช็คเอาต์";
    if (checkIn && checkOut && checkOut <= checkIn) e.checkOut = "วันเช็คเอาต์ต้องหลังเช็คอิน";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit({ customerName: customerName.trim(), catName: catName.trim(), checkIn, checkOut });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.97 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-2xl p-6 md:p-8 w-full max-w-[420px] shadow-[0_4px_32px_rgba(120,70,30,0.15)] border border-border-light"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-lighter hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Room info */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border-light">
            <div className="w-11 h-11 rounded-xl bg-accent-light flex items-center justify-center">
              <Bed className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-heading text-[15px]">{room.name}</h3>
              <p className="text-accent text-[13px]">฿{room.price.toLocaleString()} / คืน</p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] tracking-[1px] uppercase text-muted-lighter mb-1.5 font-medium">
                ชื่อเจ้าของ
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-lighter" />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.customer) setErrors((p) => ({ ...p, customer: undefined }));
                  }}
                  placeholder="ชื่อ-นามสกุล"
                  className="w-full bg-input-bg border border-border-light rounded-[10px] pl-10 pr-4 py-2.5 text-[13px] text-heading-dark placeholder:text-muted-lighter/50 input-warm font-sans"
                />
              </div>
              {errors.customer && (
                <p className="text-red-400 text-[11px] mt-1">{errors.customer}</p>
              )}
            </div>

            <div>
              <label className="block text-[10px] tracking-[1px] uppercase text-muted-lighter mb-1.5 font-medium">
                ชื่อแมว
              </label>
              <div className="relative">
                <Cat className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-lighter" />
                <input
                  type="text"
                  value={catName}
                  onChange={(e) => {
                    setCatName(e.target.value);
                    if (errors.cat) setErrors((p) => ({ ...p, cat: undefined }));
                  }}
                  placeholder="ชื่อเจ้าเหมียว"
                  className="w-full bg-input-bg border border-border-light rounded-[10px] pl-10 pr-4 py-2.5 text-[13px] text-heading-dark placeholder:text-muted-lighter/50 input-warm font-sans"
                />
              </div>
              {errors.cat && (
                <p className="text-red-400 text-[11px] mt-1">{errors.cat}</p>
              )}
            </div>

            {(defaultCheckIn && defaultCheckOut) ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-[1px] uppercase text-muted-lighter mb-1.5 font-medium">
                    เช็คอิน
                  </label>
                  <div className="bg-input-bg border border-border-light rounded-[10px] px-3 py-2.5 text-[13px] text-heading-dark font-sans">
                    {new Date(checkIn).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[1px] uppercase text-muted-lighter mb-1.5 font-medium">
                    เช็คเอาต์
                  </label>
                  <div className="bg-input-bg border border-border-light rounded-[10px] px-3 py-2.5 text-[13px] text-heading-dark font-sans">
                    {new Date(checkOut).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-[1px] uppercase text-muted-lighter mb-1.5 font-medium">
                    เช็คอิน
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-lighter" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (errors.checkIn) setErrors((p) => ({ ...p, checkIn: undefined }));
                      }}
                      className="w-full bg-input-bg border border-border-light rounded-[10px] pl-10 pr-3 py-2.5 text-[13px] text-heading-dark input-warm font-sans"
                    />
                  </div>
                  {errors.checkIn && (
                    <p className="text-red-400 text-[11px] mt-1">{errors.checkIn}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] tracking-[1px] uppercase text-muted-lighter mb-1.5 font-medium">
                    เช็คเอาต์
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-lighter" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        if (errors.checkOut) setErrors((p) => ({ ...p, checkOut: undefined }));
                      }}
                      className="w-full bg-input-bg border border-border-light rounded-[10px] pl-10 pr-3 py-2.5 text-[13px] text-heading-dark input-warm font-sans"
                    />
                  </div>
                  {errors.checkOut && (
                    <p className="text-red-400 text-[11px] mt-1">{errors.checkOut}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-5 bg-accent hover:bg-accent-hover text-white py-2.5 rounded-full text-[13px] font-medium tracking-wide flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                กำลังดำเนินการ...
              </>
            ) : (
              "ยืนยันการจอง"
            )}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
