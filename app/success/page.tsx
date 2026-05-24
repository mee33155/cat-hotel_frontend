"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { CheckCircle, PawPrint, ArrowLeft } from "lucide-react";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      api
        .get(`/api/success?session_id=${sessionId}`)
        .then(() => console.log("Booking confirmed"))
        .catch((err) => console.error(err));
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f0] via-[#fdecd8] to-[#f9dfc6] flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", damping: 20 }}
        className="bg-white rounded-2xl p-10 md:p-14 max-w-[400px] w-full text-center shadow-[0_4px_32px_rgba(120,70,30,0.12)] border border-border-light"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="mb-5"
        >
          <div className="w-16 h-16 rounded-full bg-[#e8f5e8] border border-[#c4e4c4] flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-[#3b6d11]" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-serif text-[28px] font-bold text-accent mb-2"
        >
          จองสำเร็จแล้วเจ้าค่ะ!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex items-center justify-center gap-1.5 text-muted text-[14px] mb-7"
        >
          <PawPrint className="w-4 h-4 text-accent" />
          <span>เจ้าเหมียวของคุณพร้อมเข้าพักแล้ว</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/")}
          className="w-full bg-accent hover:bg-accent-hover text-white py-2.5 rounded-full text-[13px] font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับหน้าหลัก
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="shimmer w-16 h-16 rounded-full" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
