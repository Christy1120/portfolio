import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";

export default function CtaSection({
  abstractUrl = "#",
  reportUrl = "#",
}: {
  abstractUrl?: string;
  reportUrl?: string;
}) {
  const reveal = {
    hidden: { opacity: 0, y: 24, filter: "blur(2px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-300 to-amber-500">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl font-extrabold text-zinc-800 md:text-4xl"
        >
          深入了解研究成果
        </motion.h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={abstractUrl}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <ExternalLink className="h-4 w-4" />
            查看研究摘要
          </a>
          <a
            href={reportUrl}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg ring-1 ring-black/10 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <FileText className="h-4 w-4" />
            下載完整報告
          </a>
        </div>
      </div>

      {/* faint rotating emoji */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] opacity-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        📚
      </motion.div>
    </div>
  );
}
