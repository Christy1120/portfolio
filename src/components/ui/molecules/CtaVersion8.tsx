import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, FileText } from "lucide-react";

export default function CtaVersion8({
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
          initial={{ opacity: 0, rotateX: 45, z: -200 }}
          whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
          style={{ perspective: "1000px" }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white p-6">
            {/* Icon block ── 限定 3D，避免整塊內容建立複雜 stacking */}
            <div
              className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-xl shadow-md"
              style={{
                transformStyle: "preserve-3d",
                backgroundImage:
                  "linear-gradient(135deg, #FFE5B4, #FFDAB9, #FFF5E1)",
              }}
            >
              {/* 旋轉圖示（裝飾） */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ transform: "translateZ(10px)" }}
              >
                <BookOpen className="h-10 w-10 text-gray-700" />
              </motion.div>

              {/* 光暈（裝飾） */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl bg-amber-400/30"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Title ── 保持不可點擊，且不阻擋底下元素 */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 text-center text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl pointer-events-none select-none"
            >
              See More Research Content
            </motion.h2>

            {/* Buttons ── 提升層級與可點性 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative z-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <a
                href={abstractUrl}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="Read the abstract"
                className="relative z-10 rounded-xl px-8 py-4 font-semibold text-amber-900 shadow-md transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 pointer-events-auto"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FFE5B4, #FFDAB9, #FFF5E1)",
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Read the Abstract
                </div>
              </a>

              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="Read the full paper"
                className="relative z-10 rounded-xl px-8 py-4 font-semibold text-amber-900 shadow-md transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 pointer-events-auto"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FFE5B4, #FFDAB9, #FFF5E1)",
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5" />
                  Read Full Paper
                </div>
              </a>
            </motion.div>

            {/* 任何覆蓋全卡片的裝飾都請保持不可點擊 */}
            {/* <div className="pointer-events-none absolute inset-0 ..."/> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
