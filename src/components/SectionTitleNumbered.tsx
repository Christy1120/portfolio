import React from "react";

type Props = {
  title: string;
  number: string; // e.g. "01", "02"
};

export default function SectionTitleNumbered({ title, number }: Props) {
  return (
    <div className="flex items-baseline mb-6">
      {/* 左側大編號（#505050） */}
      <span className="text-4xl font-bold mr-4" style={{ color: "#505050" }}>
        {number}
      </span>
      {/* 中間標題 */}
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    </div>
  );
}
