import { SKILL_GROUPS } from "../data/site";

export default function Skills() {
  return (
    <section id="skills" className="section bg-slate-50">
      <div className="container">
        <h2 className="h2">技能</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="card p-6">
              <div className="h3">{g.title}</div>
              <p className="text-sm text-slate-600 mt-1">{g.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span key={it} className="badge">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
