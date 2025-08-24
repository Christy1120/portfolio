import React from "react";

export default function CenterNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 w-full text-center text-xs text-slate-400">{children}</p>
  );
}
