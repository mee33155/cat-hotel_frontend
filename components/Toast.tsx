"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

export type ToastData = {
  id: number;
  type: "success" | "error";
  message: string;
};

type Props = {
  toasts: ToastData[];
  onRemove: (id: number) => void;
};

export default function Toast({ toasts, onRemove }: Props) {
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2.5 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastData; onRemove: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const isOk = toast.type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`pointer-events-auto bg-white rounded-xl px-4 py-3 flex items-center gap-2.5 min-w-[260px] shadow-[0_4px_20px_rgba(120,70,30,0.12)] border ${
        isOk ? "border-[#c4e4c4]" : "border-red-200"
      }`}
    >
      {isOk ? (
        <CheckCircle className="w-4 h-4 text-[#3b6d11] shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
      )}
      <span className="text-[13px] text-heading flex-1">{toast.message}</span>
      <button onClick={() => onRemove(toast.id)} className="text-muted-lighter hover:text-foreground">
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
