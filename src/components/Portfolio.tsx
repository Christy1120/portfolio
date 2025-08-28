// src/pages/Portfolio.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PROJECTS } from "../data/site";

export default function Portfolio() {
  return (
    <section id="portfolio" className="section">
      <div className="container">
        <h2 className="h2">Projects</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p) => {
            const thumb = p.thumbnail || p.hero || (p.images?.[0] ?? "");
            const hasImage = Boolean(thumb);

            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  to={`/project/${p.slug}#top`}
                  rel="noopener noreferrer"
                  className="card p-5 hover:shadow-lg transition-shadow block"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border bg-slate-100">
                    {hasImage ? (
                      <img
                        src={thumb}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                        onError={(e) => {
                          // 圖片壞掉時回退為文字預覽
                          const el = e.currentTarget;
                          el.style.display = "none";
                          const fallback = el.nextElementSibling as HTMLElement | null;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}

                    {/* 文字 fallback：圖片缺失或載入失敗時顯示 */}
                    <div
                      className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-sky-100 to-amber-100 text-slate-700"
                      style={{ display: hasImage ? "none" : "flex" }}
                    >
                      <span className="font-semibold">{p.preview}</span>
                    </div>
                  </div>

                  <div className="h3 mt-4">{p.title}</div>
                  <p className="text-sm text-slate-600 mt-1">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="badge">{t}</span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
