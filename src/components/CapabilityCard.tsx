import type { ReactNode } from "react";

export default function CapabilityCard({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border p-4 bg-white/80">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-sky-50 border text-brand">{icon}</div>
        <div className="h3">{title}</div>
      </div>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}
