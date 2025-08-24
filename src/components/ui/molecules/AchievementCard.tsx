import React from "react";
import { motion } from "framer-motion";

export default function AchievementCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border-t-4 border-yellow-300 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-3xl shadow-md">
        {icon}
      </div>
      <div className="text-lg font-extrabold text-zinc-800">{title}</div>
      <p className="mt-2 text-sm text-zinc-600">{desc}</p>
    </motion.div>
  );
}
