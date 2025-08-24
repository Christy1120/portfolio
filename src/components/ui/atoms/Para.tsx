import React from "react";

export default function Para({
  children,
  noMarker = false,
}: {
  children: React.ReactNode;
  noMarker?: boolean;
}) {
  return (
    <p className={`relative ${noMarker ? "pl-0" : "pl-3"}`}>
      {!noMarker && (
        <span className="absolute left-0 top-2 block h-6 w-1 rounded bg-yellow-400" />
      )}
      <span className="align-middle text-zinc-700">{children}</span>
    </p>
  );
}
