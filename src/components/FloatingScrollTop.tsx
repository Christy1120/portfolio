// src/components/FloatingScrollTop.tsx
import React from "react";
import { createPortal } from "react-dom";
import { ArrowLeft } from "lucide-react";

export default function FloatingScrollTop() {
  if (typeof document === "undefined") return null; // SSR 安全

  return createPortal(
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ background: "linear-gradient(135deg, #fbd786 0%, #f7797d 100%)" }}
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-14 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pd-interactive z-[100]"
      aria-label="返回頂部"
    >
      <ArrowLeft className="w-5 h-5 mx-auto rotate-90" />
    </button>,
    document.body
  );
}
