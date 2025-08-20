// ===============================
// File: src/components/timeline/TimelineCard.tsx
// ===============================
import { motion } from "framer-motion";
import type { TimelineItem } from "./types";

export default function TimelineCard({
  idx,
  left,
  item,
  isExternal = false,
}: {
  idx: number;
  left: boolean;
  item: TimelineItem;
  isExternal?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.28 }}
      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
      className={[
        "relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-lg transition-all duration-300 z-10",
        left ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10",
      ].join(" ")}
    >
      <motion.div
        className="text-xs uppercase tracking-widest text-slate-500 font-semibold"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 + idx * 0.1 }}
      >
        {item.period}
      </motion.div>

      <motion.h3
        className="text-2xl font-bold mt-2 text-slate-800"
        initial={{ opacity: 0, x: left ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + idx * 0.1 }}
      >
        {item.title}
      </motion.h3>

      {item.company && (
        <motion.div
          className="text-sm text-slate-600 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 + idx * 0.1 }}
        >
          {item.company}
        </motion.div>
      )}

      <motion.p
        className="mt-4 text-slate-700 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 + idx * 0.1 }}
      >
        {item.summary}
      </motion.p>

      {!!item.tags?.length && (
        <motion.div
          className="mt-6 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + idx * 0.1 }}
        >
          {item.tags!.map((tag, tagIdx) => (
            <motion.span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-full border border-slate-300/50 hover:from-slate-200 hover:to-slate-300 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + idx * 0.1 + tagIdx * 0.05, duration: 0.3 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      )}

      <div className="mt-6 flex justify-end">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700/90">
          {isExternal ? "前往連結" : "閱讀詳情"}
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </motion.article>
  );
}