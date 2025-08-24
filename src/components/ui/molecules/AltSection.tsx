import React from "react";

export default function AltSection({
  children,
  bg = false,
}: {
  children: React.ReactNode;
  bg?: boolean;
}) {
  return (
    <div className={bg ? "bg-zinc-50" : "bg-white"}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">{children}</div>
    </div>
  );
}
