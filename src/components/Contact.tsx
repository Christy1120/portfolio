import React, { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Copy, Check } from "lucide-react";
import { SITE } from "../data/site";
import { motion } from "framer-motion";

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

  // 點外面 / ESC 關閉；再次點 icon 也會關閉（在父層切換）
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
      // 若想複製後自動關閉：onClose();
    } catch (e) {
      console.error("Copy failed", e);
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
      // ✅ 貼在 icon 正下方，並向右偏移一點
      className="absolute top-full left-1/2 mt-2 transform translate-x-3 z-50 w-[320px] rounded-xl border border-slate-200 bg-white p-3 shadow-lg origin-top-left"
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex max-w-[220px] items-center truncate rounded-md bg-slate-50 px-2 py-1 text-sm font-mono text-slate-700">
          {email}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy email"
          className="inline-flex items-center rounded-md border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
          title="Copy"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const [emailOpen, setEmailOpen] = useState(false);
  const mailBtnRef = useRef<HTMLButtonElement | null>(null);

  const toggleEmail = () => setEmailOpen(v => !v);

  return (
    <section id="contact" className="section bg-slate-50">
      <div className="container text-center">
        <h2 className="h2">Let’s Talk !</h2>
        

        <div className="mt-8 flex items-center justify-center gap-3">
          {/* Email：只有 icon，作為 popover 錨點 */}
          <div className="relative">
            <button
              ref={mailBtnRef}
              onClick={toggleEmail}
              aria-haspopup="dialog"
              aria-expanded={emailOpen}
              className="inline-flex items-center justify-center rounded-xl bg-brand text-white p-3 hover:bg-sky-600 shadow-soft focus:outline-none focus:ring-2 focus:ring-sky-300"
              title="Show email"
            >
              <Mail className="w-5 h-5" />
            </button>

            {/* Popover：貼在 icon 下方偏右 */}
            <EmailPopover
              email={SITE.email}
              open={emailOpen}
              onClose={() => setEmailOpen(false)}
              anchorRef={mailBtnRef}
            />
          </div>

          {/* LinkedIn：原樣保留（若也要只有 icon 再跟我說） */}
          <a
            href={SITE.links.linkedin}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:bg-slate-100"
          >
            <Linkedin className="w-4 h-4" /> 
          </a>
        </div>
      </div>
    </section>
  );
}
