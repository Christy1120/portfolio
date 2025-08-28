import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "../data/site";
import { Linkedin, Mail, Copy, Check } from "lucide-react";

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

  // 點外面或按 ESC 關閉
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInsidePanel = panelRef.current?.contains(target);
      const clickedAnchor = anchorRef.current?.contains(target);
      if (!clickedInsidePanel && !clickedAnchor) onClose();
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
      setTimeout(() => setCopied(false), 1500);
      // 如需複製後自動關閉：解除註解
      // onClose();
    } catch (e) {
      console.error("複製失敗", e);
    }
  };

  if (!open) return null;

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-label="Email"
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.16 }}
      // ✅ 固定放在按鈕的右下，不會遮到 icon 本身
      className="absolute z-50 left-12 top-10 w-[320px] rounded-xl border border-slate-200 bg-white p-3 shadow-lg origin-top-left"
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex max-w-[220px] items-center truncate rounded-md bg-slate-50 px-2 py-1 text-sm font-mono text-slate-700">
          {email}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
          aria-label="Copy email"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {/* 只有 icon 的需求：把文字移除即可；若想保留視覺乾淨、可留 title */}
        </button>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [emailOpen, setEmailOpen] = useState(false);
  const mailBtnRef = useRef<HTMLButtonElement | null>(null);

  const toggleEmail = () => setEmailOpen((v) => !v);

  return (
    <section id="home" className="section">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h1">
            Hi, I’m <span className="text-brand">KAI TING</span>
          </motion.h1>
          <p className="lead mt-6">
            Transitioning into product management with a data and information-systems background. I talk to users, turn manual workflows into simple tools, and validate decisions with small experiments.
          </p>

          <div className="mt-8 flex gap-4 text-slate-600 relative">
            {/* LinkedIn：外連，純 icon */}
            <a
              href={SITE.links.linkedin}
              target="_blank"
              aria-label="Open LinkedIn in new tab"
              className="p-2 rounded-lg border hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
              title="LinkedIn"
            >
              <Linkedin />
            </a>

            {/* Mail：純 icon，點擊切換 Popover；再次點擊會關閉 */}
            <button
              ref={mailBtnRef}
              type="button"
              onClick={toggleEmail}
              aria-haspopup="dialog"
              aria-expanded={emailOpen}
              className="relative p-2 rounded-lg border hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
              title="Show email"
            >
              <Mail />
            </button>

            {/* Popover：定位於 Mail icon 的右下方，不遮擋按鈕 */}
            <EmailPopover
              email={SITE.email}
              open={emailOpen}
              onClose={() => setEmailOpen(false)}
              anchorRef={mailBtnRef}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-8"
        >
          <motion.img
            src="/public/girl.png"
            alt="pic"
            className="w-full h-auto rounded-xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
