import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { DOTS, ENHANCED_GRADS } from "./constants";
import TimelineCard from "./TimelineCard";
import type { TimelineItem } from "./types";

export function TimelineItemRow({ item, idx }: { item: TimelineItem; idx: number }) {
  const left = idx % 2 === 0;
  const d = DOTS[idx % DOTS.length];
  const gradients = ENHANCED_GRADS[idx % ENHANCED_GRADS.length];
  const location = useLocation();

  const to = (item as any).href ?? `/experience/${(item as any).slug}`;
  const isExternal = Boolean((item as any).href);

  return (
    <li className="relative md:grid md:grid-cols-2 md:gap-10">
      {/* 半幅 panel 背景 */}
      <div
        className={[
          "pointer-events-none absolute -z-10 top-6 bottom-6 rounded-[32px]",
          "left-0 right-0 md:mx-0",
          left ? "md:left-0 md:right-1/2 md:mr-10" : "md:left-1/2 md:right-0 md:ml-10",
        ].join(" ")}
      >
        {/* 主要漸層 */}
        <motion.div
          className="absolute inset-0 rounded-[32px]"
          style={{ background: gradients.primary, backgroundSize: "300% 300%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 15 + idx * 2, repeat: Infinity, ease: "linear" }}
        />
        {/* 次要漸層 */}
        <motion.div
          className="absolute inset-0 rounded-[32px]"
          style={{ background: gradients.secondary, backgroundSize: "200% 200%" }}
          animate={{ backgroundPosition: ["100% 0%", "0% 100%", "100% 0%"], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 12 + idx, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* 強調漸層 */}
        <motion.div
          className="absolute inset-0 rounded-[32px]"
          style={{ background: gradients.accent, backgroundSize: "150% 150%" }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"], scale: [1, 1.05, 1] }}
          transition={{ duration: 8 + idx * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Panel 進場 */}
        <motion.div
          className="absolute inset-0 rounded-[32px] bg-white/10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
        />
      </div>

      {/* 節點圓點 */}
      <span className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
        <motion.span
          className="relative flex h-6 w-6"
          whileInView={{ scale: [0, 1.2, 1] }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.span
            className={`absolute inline-flex h-full w-full rounded-full ${d.ping}`}
            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className={`relative inline-flex rounded-full h-6 w-6 ${d.dot} ring-4 ${d.ring} shadow-lg`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.span>
      </span>

      {/* 卡片可點 */}
      {isExternal ? (
        <a
          href={to as string}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            left ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10",
            "group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded-2xl",
          ].join(" ")}
        >
          <TimelineCard idx={idx} left={left} item={item} isExternal />
        </a>
      ) : (
        <Link
          to={to as string}
          state={{ background: location }}
          className={[
            left ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10",
            "group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded-2xl",
          ].join(" ")}
        >
          <TimelineCard idx={idx} left={left} item={item} />
        </Link>
      )}

      {/* 對側占位（維持左右交錯排版） */}
      <div className={left ? "hidden md:block md:col-start-2" : "hidden md:block md:col-start-1"} aria-hidden="true" />
    </li>
  );
}
