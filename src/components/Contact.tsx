import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // 🌟 1. 引入 createPortal
import { Mail, Linkedin, Copy, Check, Terminal, X } from "lucide-react";
import { SITE } from "../data/site";
import { motion, AnimatePresence } from "framer-motion";

function EmailModal({
  email,
  open,
  onClose,
}: {
  email: string;
  open: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 🌟 2. 確保元件在 Client 端才渲染 Portal，避免 SSR 報錯
  useEffect(() => {
    setMounted(true);
  }, []);

  // 監聽 ESC 鍵關閉彈窗
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  // 🌟 如果還沒 mounted，先回傳 null
  if (!mounted) return null;

  // 🌟 3. 使用 createPortal 將彈窗直接傳送到 document.body 最外層
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          
          {/* 半透明遮罩，點擊即可關閉 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 彈窗主體 */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} 
            className="relative z-10 w-full max-w-[340px] rounded-2xl border border-pink-500/30 bg-[#0a0a0a]/95 p-6 shadow-[0_0_30px_rgba(236,72,153,0.25)]"
          >
            {/* 右上角關閉按鈕 */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-pink-400 hover:bg-pink-500/10 p-1.5 rounded-lg transition-colors focus:outline-none"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col gap-4 mt-2">
              <span className="text-xs font-mono text-pink-500 tracking-widest uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4" /> [ COPY // EMAIL ]
              </span>
              
              <div className="flex items-center gap-2">
                <span className="inline-flex flex-1 items-center overflow-hidden rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm font-mono text-gray-300">
                  <span className="truncate w-full">{email}</span>
                </span>
                <button
                  onClick={handleCopy}
                  aria-label="Copy email"
                  className="inline-flex shrink-0 items-center justify-center rounded-lg border border-pink-500/30 bg-pink-500/10 p-3 text-pink-400 hover:bg-pink-500 hover:text-white transition-all focus:outline-none"
                  title="Copy"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body // <- 關鍵：綁定到最外層
  );
}

export default function Contact() {
  const [emailOpen, setEmailOpen] = useState(false);

  const toggleEmail = () => setEmailOpen(v => !v);

  return (
    <section 
      id="contact" 
      className="relative w-full min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-end pb-24 bg-black bg-[url('/build.png')] bg-cover bg-top overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
          Let’s Talk !
        </h2>
        
        <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6">
          
          <div className="relative">
            <button
              onClick={toggleEmail}
              aria-haspopup="dialog"
              aria-expanded={emailOpen}
              className="inline-flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-md border border-pink-500/50 text-pink-400 p-4 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300 focus:outline-none cursor-pointer"
              title="Show email"
            >
              <Mail className="w-6 h-6 pointer-events-none" />
            </button>

            <EmailModal
              email={SITE.email}
              open={emailOpen}
              onClose={() => setEmailOpen(false)}
            />
          </div>

          <a
            href={SITE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-md border border-white/20 text-gray-300 p-4 hover:border-pink-500/50 hover:text-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all duration-300"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6" /> 
          </a>
        </div>
      </div>
    </section>
  );
}