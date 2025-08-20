import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { SITE } from "../data/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "home", label: "首頁" },
    { id: "experience", label: "經歷" },
    { id: "skills", label: "技能" },
    { id: "portfolio", label: "作品" },
    { id: "contact", label: "聯繫" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="container flex h-16 items-center justify-between">
        <a href="#home" className="font-heading font-extrabold text-xl">
          {SITE.logoText}
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`} className="text-sm font-medium text-slate-700 hover:text-slate-900">
              {it.label}
            </a>
          ))}
          <a href={SITE.resumeUrl} target="_blank" className="badge hover:shadow-soft">
            <Download className="w-4 h-4" /> 下載履歷
          </a>
        </nav>
        <button className="md:hidden p-2 rounded-lg border" onClick={() => setOpen((s) => !s)} aria-label="Open Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-4 flex flex-col gap-3">
            {items.map((it) => (
              <a key={it.id} href={`#${it.id}`} className="text-base py-1" onClick={() => setOpen(false)}>
                {it.label}
              </a>
            ))}
            <a href={SITE.resumeUrl} target="_blank" className="badge w-max">
              <Download className="w-4 h-4" /> 下載履歷
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
