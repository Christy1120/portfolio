// src/pages/ExperienceDetail.tsx
import { Link, useParams } from "react-router-dom";
import { TIMELINE } from "../data/timeline";

export default function ExperienceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = TIMELINE.find((x) => x.slug === slug);

  if (!item) {
    return (
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-2xl font-bold">找不到這個經歷</h1>
        <Link className="text-sky-700 underline mt-4 inline-block" to="/">
          ← 回到首頁
        </Link>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden">
      {/* 頁面頂部 Hero（柔和漸層） */}
      <section className="relative py-20 bg-white">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-amber-100 via-amber-50 to-transparent blur-3xl opacity-80" />
          <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-sky-100 via-sky-50 to-transparent blur-3xl opacity-80" />
        </div>

        <div className="container mx-auto px-4">
          <Link to="/" className="inline-block text-sky-700 font-semibold mb-6">
            ← 返回首頁
          </Link>
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              {item.period}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mt-2 text-slate-900">
              {item.title}
            </h1>
            {item.company && (
              <p className="text-slate-600 mt-2 font-medium">{item.company}</p>
            )}
            <p className="text-slate-700 mt-6 leading-relaxed">{item.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 內容區（雛形） */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-3">
          <article className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-bold">我做了什麼</h2>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>定義問題與成功指標，規劃里程碑與風險控管。</li>
              <li>與前後端/設計協作，落地成可運作的 MVP。</li>
              <li>設計儀表板/追蹤指標，用實證改善體驗與性能。</li>
            </ul>

            <h2 className="text-xl font-bold pt-4">影響與成果</h2>
            <p className="text-slate-700">
              以數據驗證假設，將關鍵指標提升 10%~30%（此處可填你的實際成果與量化數字）。
            </p>
          </article>

          <aside className="md:col-span-1 card p-6 rounded-2xl border">
            <h3 className="font-semibold">快速資訊</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">期間</dt>
                <dd className="text-slate-800">{item.period}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">公司/單位</dt>
                <dd className="text-slate-800">{item.company ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">技術/能力</dt>
                <dd className="text-slate-800">{item.tags.join("、")}</dd>
              </div>
            </dl>
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-semibold text-sky-700"
              >
                外部連結 →
              </a>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
