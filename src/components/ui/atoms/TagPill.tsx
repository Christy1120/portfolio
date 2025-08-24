import React from "react";

export default function TagPill({ label, tone = "slate" }: { label: string; tone?: "amber" | "slate" | "forest" }) {
  const map: Record<string, string> = {
    amber: "bg-[#505050] text-white font-light",
    slate: "bg-[#FABC00] text-505050 font-bold ",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium ${map[tone]}`}
    >
      {label}
    </span>
  );
}
