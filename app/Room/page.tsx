"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import RoomCard from "@/components/RoomCard";
import BookingModal from "@/components/BookingModal";
import Toast, { ToastData } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

const API = "http://localhost:8080";

export default function RoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [toastId, setToastId] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [catCount, setCatCount] = useState(1);

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
      .get(`${API}/api/rooms`)
      .then((res) => setRooms(res.data))
      .catch(() => addToast("error", "ไม่สามารถดึงข้อมูลห้องพักได้"));
  }, [addToast]);

  const handleBook = (roomId: number) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setSelectedRoom(room);
    }
  };

  const handleSubmit = async (data: { customerName: string; catName: string; checkIn: string; checkOut: string }) => {
    if (!selectedRoom) return;
    try {
      const res = await axios.post(`${API}/api/bookings/checkout`, {
        customer_name: data.customerName,
        cat_name: data.catName,
        room_id: selectedRoom.id,
        check_in: data.checkIn,
        check_out: data.checkOut,
      });
      window.location.href = res.data.url;
    } catch {
      addToast("error", "เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่");
      setSelectedRoom(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef7f0] to-[#fdf4eb]">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-heading-dark mb-4"
          >
            ห้องพักสำหรับแมว
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-dark max-w-2xl mx-auto"
          >
            เลือกห้องพักที่เหมาะสมสำหรับน้องแมวของคุณ
            ให้พวกเขาสบายและมีความสุขในช่วงที่คุณไม่อยู่
          </motion.p>
        </div>
      </section>

      {/* Search Card */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="bg-white rounded-2xl p-5 md:p-6 shadow-[0_4px_32px_rgba(120,70,30,0.10)] border border-border-light"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
              <div>
                <label className="block text-[10px] tracking-[1px] uppercase text-muted-lighter mb-1.5 font-medium">
                  เช็คอิน
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border-light rounded-[10px] text-[13px] text-heading-dark bg-input-bg input-warm font-sans"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[1px] uppercase text-muted-lighter mb-1.5 font-medium">
                  เช็คเอาต์
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border-light rounded-[10px] text-[13px] text-heading-dark bg-input-bg input-warm font-sans"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[1px] uppercase text-muted-lighter mb-1.5 font-medium">
                  จำนวนแมว
                </label>
                <select
                  value={catCount}
                  onChange={(e) => setCatCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 border border-border-light rounded-[10px] text-[13px] text-heading-dark bg-input-bg input-warm font-sans"
                >
                  <option value={1}>1 ตัว</option>
                  <option value={2}>2 ตัว</option>
                  <option value={3}>3 ตัว</option>
                </select>
              </div>
              <a
                href="#rooms"
                className="flex items-center justify-center gap-1.5 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors whitespace-nowrap"
              >
                ค้นหา
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section id="rooms" className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                index={index}
                onBook={handleBook}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          defaultCheckIn={checkIn}
          defaultCheckOut={checkOut}
          onClose={() => setSelectedRoom(null)}
          onSubmit={handleSubmit}
        />
      )}

      {/* Toasts */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}