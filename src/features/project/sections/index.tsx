//index.tsx
import React from "react";

function SectionGallery({ items = [] as string[] }) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold mb-3">畫面一覽</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((src, i) => (
          <img key={i} src={src} alt="" className="rounded-lg object-cover w-full" />
        ))}
      </div>
    </div>
  );
}

function SectionTech({ stack = [] as string[] }) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold mb-3">技術棧</h3>
      <div className="flex flex-wrap gap-2">
        {stack.map((t) => (
          <span key={t} className="px-2 py-1 text-sm rounded border">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionSteps({ steps = [] as string[] }) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold mb-3">流程</h3>
      <ol className="list-decimal list-inside space-y-1">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

const SECTION_MAP: Record<string, React.FC<any>> = {
  gallery: SectionGallery,
  tech: SectionTech,
  steps: SectionSteps,
};

export function RenderSections({ sections = [] as any[] }) {
  return (
    <div className="space-y-6">
      {sections.map((sec, idx) => {
        const Comp = SECTION_MAP[sec.type];
        if (!Comp) return null;
        return <Comp key={idx} {...sec} />;
      })}
    </div>
  );
}
