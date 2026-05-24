"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RoomCard from "@/components/RoomCard";
import BookingModal from "@/components/BookingModal";
import Toast, { ToastData } from "@/components/Toast";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_urls: string[];
};

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
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
    api
      .get("/api/rooms")
      .then((res) => setRooms(res.data))
      .catch(() => addToast("error", "ไม่สามารถดึงข้อมูลห้องพักได้"));
  }, [addToast]);

  const handleBook = (roomId: number) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) setSelectedRoom(room);
  };

  const handleSubmit = async (data: { customerName: string; catName: string; checkIn: string; checkOut: string }) => {
    if (!selectedRoom) return;
    try {
      const res = await api.post("/api/bookings/checkout", {
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
    <div className="min-h-screen" style={{ background: "#fdf6ef" }}>
      <Navbar />
      <Hero />

      {/* Rooms Section */}
      <section id="rooms" className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-accent-light text-accent text-[11px] tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-3 font-medium">
              ห้องพัก
            </span>
            <h2 className="font-serif text-[26px] md:text-[32px] text-heading font-bold">
              ห้องพักยอดนิยม
            </h2>
            <p className="text-muted text-[14px] mt-2 max-w-[400px] mx-auto">
              เลือกห้องพักที่เหมาะกับเจ้าเหมียวของคุณ
            </p>
          </div>

          {rooms.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface rounded-2xl overflow-hidden border border-border-light">
                  <div className="h-[140px] shimmer" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-2/3 shimmer rounded" />
                    <div className="h-3 w-full shimmer rounded" />
                    <div className="h-10 shimmer rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rooms.map((room, i) => (
                <RoomCard key={room.id} room={room} index={i} onBook={handleBook} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Amenities />
      <Testimonials />
      <Footer />

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onSubmit={handleSubmit}
        />
      )}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
