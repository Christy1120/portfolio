import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import { SITE } from "../data/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const items = [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "portfolio", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // 是否在首頁
  const onHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="container flex h-16 items-center justify-between">
        {/* 左上角 Logo：不在首頁就導到 /#home；在首頁就導到 #home（保留平滑捲動） */}
        {onHome ? (
          <a href="#home" className="font-heading font-extrabold text-xl">
            {SITE.logoText}
          </a>
        ) : (
          <Link to="/#home" className="font-heading font-extrabold text-xl">
            {SITE.logoText}
          </Link>
        )}

        <nav className="hidden md:flex items-center gap-6">
          {items.map((it) =>
            onHome ? (
              // 已在首頁：用錨點內捲
              <a
                key={it.id}
                href={`#${it.id}`}
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                {it.label}
              </a>
            ) : (
              // 不在首頁：導回首頁並帶 hash
              <Link
                key={it.id}
                to={`/#${it.id}`}
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                {it.label}
              </Link>
            )
          )}

        </nav>

        <button
          className="md:hidden p-2 rounded-lg border"
          onClick={() => setOpen((s) => !s)}
          aria-label="Open Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-4 flex flex-col gap-3">
            {items.map((it) =>
              onHome ? (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  className="text-base py-1"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </a>
              ) : (
                <Link
                  key={it.id}
                  to={`/#${it.id}`}
                  className="text-base py-1"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </Link>
              )
            )}

           
          </div>
        </div>
      )}
    </header>
  );
}
