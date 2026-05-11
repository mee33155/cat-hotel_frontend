"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import {
  ArrowLeft,
  Star,
  Users,
  Ruler,
  Check,
  Calendar,
  Cat,
  User,
  Loader2,
  Bed,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import BookingModal from "@/components/BookingModal";
import Toast, { ToastData } from "@/components/Toast";
import Footer from "@/components/Footer";

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  capacity: number;
  size: string;
  amenities: string;
};

const themes: Record<number, { bg: string; emoji: string }> = {
  1: { bg: "from-[#f9ede0] to-[#f5e3d0]", emoji: "🐱" },
  2: { bg: "from-[#f0e8fa] to-[#e8ddf5]", emoji: "👑" },
};
const defaultTheme = { bg: "from-[#e8f5e8] to-[#d9f0d9]", emoji: "🌿" };

const API = "http://localhost:8080";

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = Number(params.id);

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [toastId, setToastId] = useState(0);

  const addToast = useCallback(
    (type: "success" | "error", message: string) => {
      const id = toastId;
      setToastId((p) => p + 1);
      setToasts((p) => [...p, { id, type, message }]);
    },
    [toastId]
  );

  const removeToast = useCallback((id: number) => {
    setToasts((p) => p.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/api/rooms/${roomId}`)
      .then((res) => setRoom(res.data))
      .catch(() => addToast("error", "ไม่สามารถดึงข้อมูลห้องพักได้"))
      .finally(() => setLoading(false));
  }, [roomId, addToast]);

  const handleSubmit = async (data: {
    customerName: string;
    catName: string;
    checkIn: string;
    checkOut: string;
  }) => {
    if (!room) return;
    try {
      const res = await axios.post(`${API}/api/bookings/checkout`, {
        customer_name: data.customerName,
        cat_name: data.catName,
        room_id: room.id,
        check_in: data.checkIn,
        check_out: data.checkOut,
      });
      window.location.href = res.data.url;
    } catch {
      addToast("error", "เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่");
      setShowBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fef7f0] to-[#fdf4eb]">
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fef7f0] to-[#fdf4eb]">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
          <p className="text-muted text-lg">ไม่พบห้องพักนี้</p>
          <button
            onClick={() => router.push("/Room")}
            className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            กลับไปหน้าห้องพัก
          </button>
        </div>
      </div>
    );
  }

  const t = themes[room.id] || defaultTheme;
  let amenitiesList: string[] = [];
  try {
    amenitiesList = JSON.parse(room.amenities);
  } catch {
    amenitiesList = [];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef7f0] to-[#fdf4eb]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/Room")}
          className="flex items-center gap-2 text-muted hover:text-accent transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับไปหน้าห้องพัก
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`h-[300px] md:h-[400px] bg-gradient-to-br ${t.bg} rounded-2xl flex items-center justify-center text-8xl relative border border-border-light`}
          >
            {t.emoji}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-heading mb-2">
              {room.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 text-gold-star fill-gold-star"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-light">5.0</span>
            </div>

            {/* Price */}
            <div className="mb-5">
              <span className="text-3xl font-bold text-accent">
                ฿{room.price.toLocaleString()}
              </span>
              <span className="text-muted-light text-sm ml-1">/ คืน</span>
            </div>

            {/* Quick info */}
            <div className="flex gap-4 mb-5">
              <div className="flex items-center gap-1.5 bg-accent-light/60 text-accent px-3 py-1.5 rounded-full text-xs font-medium">
                <Users className="w-3.5 h-3.5" />
                รับสูงสุด {room.capacity} ตัว
              </div>
              <div className="flex items-center gap-1.5 bg-accent-light/60 text-accent px-3 py-1.5 rounded-full text-xs font-medium">
                <Ruler className="w-3.5 h-3.5" />
                {room.size}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted text-sm leading-relaxed mb-6">
              {room.description}
            </p>

            {/* Amenities */}
            {amenitiesList.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-heading mb-3">
                  สิ่งอำนวยความสะดวก
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {amenitiesList.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted"
                    >
                      <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book button */}
            <button
              onClick={() => setShowBooking(true)}
              className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-full text-sm font-medium tracking-wide transition-colors mt-auto"
            >
              จองห้องนี้
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />

      {showBooking && room && (
        <BookingModal
          room={room}
          onClose={() => setShowBooking(false)}
          onSubmit={handleSubmit}
        />
      )}

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
