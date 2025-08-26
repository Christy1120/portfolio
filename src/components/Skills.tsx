import React, { useMemo, useState } from "react";
// 若專案是 Next.js，可改用 next/link；這裡用 window.location 以保持純 React
import { SKILL_GROUPS } from "../data/site";

type SkillGroup = {
  title: string;
  subtitle?: string;
  items?: string[];
  href?: string; // 可選：若有就用它跳頁，否則 fallback 到 /skills/<slug>
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function Skills() {
  const groups: SkillGroup[] = SKILL_GROUPS as any;
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + groups.length) % groups.length);
  const next = () => setActive((i) => (i + 1) % groups.length);

  // 只渲染左/中/右三張（循環）
  const visible: SkillGroup[] = useMemo(() => {
    if (groups.length === 0) return [];
    const left = (active - 1 + groups.length) % groups.length;
    const right = (active + 1) % groups.length;
    return [groups[left], groups[active], groups[right]];
  }, [active, groups]);

  const handleGo = (g: SkillGroup) => {
    const url = g.href ?? `/skills/${slugify(g.title)}`;
    window.location.assign(url);
  };

  return (
    <section id="skills" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* 置中大標題（兩行時自動換行） */}
        <h2 className="mx-auto max-w-3xl text-center text-2xl font-extrabold leading-tight text-zinc-900 md:text-4xl">
          技能地圖，聚焦你的強項
          <br className="hidden md:block" />
          <span className="block">一眼看出核心能力</span>
        </h2>

        {/* Carousel 區塊 */}
        <div className="relative mt-12 flex items-center justify-center gap-6 md:gap-10">
          {/* 左箭頭 */}
          <button
            aria-label="上一個"
            onClick={prev}
            className="hidden select-none rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100 active:scale-95 md:block"
          >
            <span className="text-3xl">{`<`}</span>
          </button>

          {/* 三張卡片 */}
          <div className="flex items-end justify-center gap-6 md:gap-8">
            {visible.map((g, idx) => {
              const isCenter = idx === 1;
              return (
                <button
                  key={`${g.title}-${idx}`}
                  onClick={() => handleGo(g)}
                  className={[
                    "group relative flex w-40 cursor-pointer flex-col items-stretch rounded-2xl transition-all md:w-52",
                    isCenter ? "scale-110" : "scale-95 opacity-90",
                  ].join(" ")}
                >
                  {/* 上方灰底方塊（示意圖區） */}
                  <div
                    className={[
                      "rounded-2xl bg-zinc-200",
                      "transition-all",
                      isCenter ? "h-48 md:h-60" : "h-36 md:h-44",
                    ].join(" ")}
                  />

                  {/* 底部深色條（標題） */}
                  <div
                    className={[
                      "mt-2 rounded-2xl bg-zinc-800 px-4 py-3 text-center font-semibold text-white",
                      isCenter ? "text-xl md:text-2xl" : "text-base md:text-lg",
                      "tracking-wide",
                    ].join(" ")}
                  >
                    {g.title}
                  </div>

                  {/* 隱形可點覆蓋層，確保整張可點 */}
                  <span className="absolute inset-0 rounded-2xl ring-0 ring-zinc-900/5 transition group-hover:ring-4" />
                </button>
              );
            })}
          </div>

          {/* 右箭頭 */}
          <button
            aria-label="下一個"
            onClick={next}
            className="hidden select-none rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100 active:scale-95 md:block"
          >
            <span className="text-3xl">{`>`}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
