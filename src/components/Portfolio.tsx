import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { PROJECTS } from "../data/site";

export default function Portfolio() {
  const location = useLocation();

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <h2 className="h2">作品</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to={`/project/${p.slug}`}
                state={{ background: location }}
                className="card p-5 hover:shadow-lg transition-shadow block"
              >
                <div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-sky-100 to-amber-100 border flex items-center justify-center text-slate-700">
                  <span className="font-semibold">{p.preview}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
