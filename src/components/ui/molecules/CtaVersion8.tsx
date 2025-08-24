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
          <div
            className="relative overflow-hidden rounded-2xl bg-white p-2"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative text-center" style={{ transform: "translateZ(20px)" }}>
              {/* Icon with animation */}
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              >
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 shadow-md">
                  {/* 中心圖標 */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <BookOpen className="h-10 w-10 text-white" />
                  </motion.div>
                  {/* 光暈脈動效果 */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-amber-400/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Title — non-clickable */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4 text-3xl font-bold text-amber-900 md:text-4xl lg:text-5xl pointer-events-none select-none"
              >
                See More Research Content
              </motion.h2>

              {/* Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col gap-4 sm:flex-row sm:justify-center"
              >
                <a
                  href={abstractUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gradient-to-r from-amber-300 to-yellow-100 px-8 py-4 text-amber-900 font-semibold shadow-md transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
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
                  className="rounded-xl border-2 border-amber-400 bg-white px-8 py-4 text-amber-700 font-semibold shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
                >
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="h-5 w-5" />
                    Read Full Paper
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
