import React from "react";

export default function AltSection({
  children,
  bg = false,
  className = "",
}: {
  children: React.ReactNode;
  bg?: boolean;
  className?: string;
}) {
  return (
    <div className={bg ? "bg-zinc-50" : "bg-white"}>
      <div
        className={`mx-auto max-w-6xl px-6 pt-16 pb-8 md:pt-24 md:pb-12 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
