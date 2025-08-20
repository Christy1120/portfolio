import { motion } from "framer-motion";
import { PROJECTS } from "../data/site";

export default function Portfolio() {
  return (
    <section id="portfolio" className="section">
      <div className="container">
        <h2 className="h2">作品</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6 auto-rows-fr">
          {PROJECTS.map((p) => (
            <div key={p.title} className="h-full flex flex-col">
              <motion.a
                href={p.href}
                target="_blank"
                className="card p-5 hover:shadow-lg transition-shadow h-full flex flex-col"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
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
              </motion.a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
