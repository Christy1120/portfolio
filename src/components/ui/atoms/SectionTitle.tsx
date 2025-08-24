import React from "react";

export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <div className="relative inline-block">
        <h2 className="text-3xl font-bold text-gray-700 bg-yellow-200 px-6 py-3 transform -rotate-1 shadow-md">
          {title}
        </h2>
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-300 transform rotate-45"></div>
      </div>
    </div>
  );
}
