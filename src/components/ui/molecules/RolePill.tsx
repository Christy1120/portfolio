import React from "react";
import { IconType } from "../common/types";

export default function RolePill({ icon: Icon, label }: { icon: IconType; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-100 py-1.5 pl-2 pr-3 ring-1 ring-inset ring-slate-200">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );
}
