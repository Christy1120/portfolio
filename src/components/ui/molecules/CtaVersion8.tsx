import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, FileText } from "lucide-react";

export default function MinimalCta({
  abstractUrl = "#",
  reportUrl = "#",
}: {
  abstractUrl?: string;
  reportUrl?: string;
}) {
  return (
    <div className="py-16 bg-white">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
        >
          {/* 主容器：無邊框、無玻璃、無陰影 */}
          <div className="relative rounded-3xl p-8 bg-white">
            {/* Icon 區：保留旋轉動畫，移除邊框/玻璃/陰影 */}
            <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center" style={{ background: "linear-gradient(90deg, rgba(253,230,138,0.35), rgba(254,215,170,0.35))" }} >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
                
              >
                <BookOpen className="h-12 w-12 text-orange-700" />
              </motion.div>

              {/* 柔和脈動光暈（純裝飾，不擋點擊） */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.22, 0.12] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background:
                    "linear-gradient(90deg, rgba(251, 190, 36, 0.88), rgba(253, 230, 138, 0.94))",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* 標題：保留進場動畫 */}
            <motion.h2
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 text-center text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl select-none"
            >
              See More Research Content
            </motion.h2>

            {/* 按鈕群：保留 hover/press 動畫，移除邊框與玻璃感 */}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <motion.a
                href={abstractUrl}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="Read the abstract"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-2xl px-8 py-4 font-semibold text-orange-800 bg-white"
              >
                <div className="flex items-center justify-center gap-3">
                  <ExternalLink className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  Read the Abstract
                </div>
                {/* 裝飾層：不擋點擊 */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                     style={{ background: "linear-gradient(90deg, rgba(253,230,138,0.35), rgba(254,215,170,0.35))" }} />
              </motion.a>

              <motion.a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="Read the full paper"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-2xl px-8 py-4 font-semibold text-amber-800 bg-white"
              >
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  Read Full Paper
                </div>
                {/* 裝飾層：不擋點擊 */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                     style={{ background: "linear-gradient(90deg, rgba(255,243,191,0.35), rgba(253,230,138,0.35))" }} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
