import React, { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Copy, Check, Terminal } from "lucide-react";
import { SITE } from "../data/site";
import { motion, AnimatePresence } from "framer-motion";

function EmailPopover({
  email,
  open,
  onClose,
  anchorRef,
}: {
  email: string;
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      const insidePanel = panelRef.current?.contains(t);
      const onAnchor = anchorRef.current?.contains(t);
      if (!insidePanel && !onAnchor) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose, anchorRef]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-label="Email"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          // 🌟 修正為 Dark Tech Vibe 樣式，並設定在上方彈出
          className="absolute bottom-full left-1/2 mb-4 transform -translate-x-1/2 z-50 w-[280px] rounded-xl border border-pink-500/30 bg-[#0a0a0a]/95 backdrop-blur-xl p-3 shadow-[0_0_20px_rgba(236,72,153,0.2)] origin-bottom"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono text-pink-500 tracking-widest uppercase mb-1 flex items-center gap-1">
              <Terminal className="w-3 h-3" /> [ COPY // EMAIL ]
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex flex-1 items-center truncate rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm font-mono text-gray-300">
                {email}
              </span>
              <button
                onClick={handleCopy}
                aria-label="Copy email"
                className="inline-flex items-center justify-center rounded-md border border-pink-500/30 bg-pink-500/10 p-2 text-pink-400 hover:bg-pink-500 hover:text-white transition-colors focus:outline-none"
                title="Copy"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {
  const [emailOpen, setEmailOpen] = useState(false);
  const mailBtnRef = useRef<HTMLButtonElement | null>(null);

  const toggleEmail = () => setEmailOpen(v => !v);

  return (
    // 🌟 修正 1：給予高度 (min-h) 並使用 flex 將內容推到下方 (justify-end)，bg-top 讓手部固定在上方
    <section 
      id="contact" 
      className="relative w-full min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-end pb-24 bg-black bg-[url('/build.png')] bg-cover bg-buttom overflow-hidden"
    >
      {/* 🌟 修正 2：底部漸層遮罩，確保畫面下方是乾淨的純黑，突顯文字 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-0 pointer-events-none" />

      {/* 內容區塊確保在漸層之上 */}
      <div className="relative z-10 container text-center flex flex-col items-center">
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
          Let’s Talk !
        </h2>
        
        <div className="mt-8 flex items-center justify-center gap-4">
          
          <div className="relative">
            {/* 🌟 修正 3：按鈕樣式改為粉色科技風 */}
            <button
              ref={mailBtnRef}
              onClick={toggleEmail}
              aria-haspopup="dialog"
              aria-expanded={emailOpen}
              className="inline-flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-md border border-pink-500/50 text-pink-400 p-4 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300 focus:outline-none"
              title="Show email"
            >
              <Mail className="w-6 h-6" />
            </button>

            <EmailPopover
              email={SITE.email}
              open={emailOpen}
              onClose={() => setEmailOpen(false)}
              anchorRef={mailBtnRef}
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