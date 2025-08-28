// src/pages/custom/DecentComicPage.tsx
import React, { useEffect, useMemo, useState , useLayoutEffect} from "react";
import Nav from "../../components/Nav";
import { Link, useLocation} from "react-router-dom";
import type { Project } from "../../data/site";
import YouTubeEmbed from "@/components/media/YouTubeEmbed";
import {
  Target,
  Lightbulb,
  Rocket,
  Briefcase,
  BookOpen,
  DollarSign,
  ClipboardList,
  LineChart,
  FileText,
  Ticket,
  Network,
  Users,
  Paintbrush,
  Factory,
  Handshake,
  KanbanSquare,
  Megaphone,
  Sparkles,
  Zap,
  Star,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FloatingScrollTop from "@/components/FloatingScrollTop";

export default function DecentComicPage({ project }: { project: Project }) {
  
  const { pathname } = useLocation(); // ← 取得目前路徑（或依你的 key/slug 也可）

  // ✅ 這段一定要在元件「內部」
  // 目的：首幀前把卷軸設為頂，且強制非平滑，避免任何「往上滑」視覺
  useLayoutEffect(() => {
    const html = document.documentElement as HTMLElement;
    const body = document.body as HTMLElement;
    const prevHtml = html.style.scrollBehavior;
    const prevBody = body.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);           // 首次 paint 前同步到頂
    html.style.scrollBehavior = prevHtml;
    body.style.scrollBehavior = prevBody;
  }, [pathname]); // ← 進入 /project/:slug 時會觸發；或你也可以寫 [] 只在 mount
  // ===== 滾動進度條 =====
  const [scrollScale, setScrollScale] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const maxHeight = document.body.scrollHeight - window.innerHeight;
      const percent = Math.min(1, Math.max(0, window.scrollY / (maxHeight || 1)));
      setScrollScale(percent);
    };


    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // ===== 進場動畫：IntersectionObserver 啟用 .reveal-on-scroll =====
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));

    if (prefersReduced) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ===== 內嵌 SVG 顆粒背景（Hero 用）=====
  const grainSvg = useMemo(
    () =>
      `url('data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <pattern id="g" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="1.5" fill="rgba(255,255,255,0.15)" opacity="0.8"/>
            <circle cx="175" cy="175" r="1.5" fill="rgba(255,255,255,0.15)" opacity="0.6"/>
            <circle cx="100" cy="50" r="1" fill="rgba(255,255,255,0.1)" opacity="0.9"/>
            <circle cx="150" cy="100" r="0.8" fill="rgba(255,255,255,0.12)" opacity="0.7"/>
            <circle cx="50" cy="150" r="1.2" fill="rgba(255,255,255,0.08)" opacity="0.5"/>
            <circle cx="75" cy="75" r="0.6" fill="rgba(255,255,255,0.2)" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#g)"/>
      </svg>`)}')`,
    []
  );

  // ===== 浮動元素背景 =====
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${15 + i * 2}s`,
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full blur-sm" />
        </div>
      ))}
    </div>
  );

  return (
    <>
    <Nav/>
    <div className="relative min-h-screen overflow-x-hidden [overflow-anchor:none]">
      
      <span id="top" className="absolute -top-2" aria-hidden="true" />
      {/* ===== 全站背景 + 動態光暈 ===== */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30" />
      <FloatingScrollTop />
      {/* 鼠標追蹤光暈 */}
      <div
        className="fixed pointer-events-none -z-40 w-96 h-96 rounded-full opacity-10 blur-3xl transition-all duration-1000 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(45,106,79,0.3) 0%, rgba(64,145,108,0.1) 50%, transparent 100%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />


      <div className="mx-auto max-w-[1200px] px-5">
       

        {/* ===== Enhanced Hero ===== */}
        <section className="relative mt-4 overflow-hidden rounded-3xl">
          <FloatingElements />
          <div className="absolute inset-0" />
          <div className="absolute inset-0" />

          <div className="relative z-10 text-center text-slate-800">
            <div className="px-6 py-20 md:py-24 lg:py-28">
              {/* 裝飾性圖標 */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-emerald-400 animate-pulse" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg animate-bounce-gentle">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <Star className="absolute -bottom-1 -left-1 h-4 w-4 text-yellow-400 animate-spin-slow" />
                </div>
              </div>

              <h1 className="animate-slideInDown bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-lg md:text-5xl">
                Web3toon
              </h1>
              <p className="animate-slideInUp mx-auto mt-4 max-w-2xl text-lg font-medium text-slate-700 opacity-90">
                Empowering Taiwanese Comic Artists Through Blockchain Technology
              </p>

              {/* Tech chips（reveal-on-scroll 也會生效） */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {[
                  { text: "Team Leadership", icon: Users },
                  { text: "Product Storytelling", icon: BookOpen },
                  { text: "Blockchain", icon: Network },
                ].map((item, i) => (
                  <span
                    key={item.text}
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-xl"
                    style={{ ["--reveal-delay" as any]: `${i * 120}ms` }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.text}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </span>
                ))}
              </div>

              {/* 裝飾性波浪 */}
              <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg className="relative block h-12 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    fill="rgba(255,255,255,0.3)"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* 增強背景粒子 */}
          <div aria-hidden className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] animate-float opacity-60" style={{ backgroundImage: grainSvg, zIndex: 1 }} />
        </section>

        {/* ===== Problem（背景圖 + 黑遮罩 + 綠色重點） ===== */}
        <EvenSection bgImage="/comic-artist-in-creative-focus.png" darkMask>
          <SectionTitle
            icon={Target}
            title="The Problem"
            subtitle="Taiwanese comic artists struggle to sustain themselves financially"
            dark
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card title="Limited and unsustainable income" icon={DollarSign} delay={0}>
              Over 70% of artists earn less than{" "}
              <span className="stat text-4xl font-extrabold text-emerald-500 drop-shadow">NT$360,000</span> annually.
            </Card>
            <Card title="Lack of copyright authorization" icon={ClipboardList} delay={0.2}>
              <span className="stat text-4xl font-extrabold text-emerald-500 drop-shadow">84.5%</span> of artists have never authorized the use of their characters.
            </Card>
            <Card title="Weak derivative product market" icon={LineChart} delay={0.4}>
              <span className="stat text-4xl font-extrabold text-emerald-500 drop-shadow">72.8%</span> of artists lack derivative products such as merchandise or IP extensions.
            </Card>
          </div>
        </EvenSection>

        {/* ===== Solution ===== */}
        <OddSection>
          <SectionTitle icon={Lightbulb} title="Our Solution" subtitle="A decentralized comic platform using blockchain smart contracts and NFTs" />
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Feature title="Smart Contracts" icon={FileText} delay={0}>
              Automated and transparent revenue sharing, reducing reliance on intermediaries and ensuring fair compensation for creators.
            </Feature>
            <Feature title="NFT Memberships" icon={Ticket} delay={0.2}>
              Enable creators to monetize fan engagement through subscriptions and exclusive content, building stronger creator-fan relationships.
            </Feature>
            <Feature title="System Architecture" icon={Network} delay={0.4}>
              Seamless platform connecting browser → frontend (React + web3.js) → API → DB → Ethereum blockchain for secure transactions.
            </Feature>
          </div>
        </OddSection>

        {/* ===== Value & Impact ===== */}
        <EvenSection>
          <SectionTitle icon={Rocket} title="Value & Impact" subtitle="Represented the university at InnoServe Competition and shortlisted as a finalist, highlighting external recognition of the project." />
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Feature title="For Artists" icon={Paintbrush} delay={0}>
              Increased earnings by reducing publisher cuts, giving creators direct control over their work and revenue streams.
            </Feature>
            <Feature title="For Industry" icon={Factory} delay={0.2}>
              Lowered barriers for new creators, encouraging more output and higher-quality works in the Taiwanese comic industry.
            </Feature>
            <Feature title="For Readers" icon={Users} delay={0.4}>
              Enhanced fan-artist relationships via direct NFT membership and ownership features, creating deeper engagement.
            </Feature>
          </div>
        </EvenSection>
          
        {/* ===== My Role as Team Lead（兩欄版：左圖 / 右文） ===== */}
        <section className="relative my-16 overflow-hidden rounded-2xl p-4 text-slate-800 md:p-6">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full blur-2xl" />

          <SectionTitle icon={Briefcase} title="My Role as Team Lead" subtitle="Leading cross-functional collaboration to bring Web3toon to life" />

          <div className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 左邊：圖片 */}
            <div className="h-96 overflow-hidden rounded-2xl border border-white/60 bg-white/70 backdrop-blur-sm md:h-[500px]">
              <img src="/Multitasking Mastermind in Yellow.png" alt="Team Collaboration" className="h-full w-full object-cover" />
            </div>

            {/* 右邊：三段文字 */}
            <div className="grid gap-6">
              {[
                {
                  icon: Handshake,
                  title: "Team Leadership",
                  desc: "Recruited and coordinated a cross-functional team (frontend, backend, finance) and acted as communication bridge with our advisor.",
                  color: "bg-gray-700",
                  delay: 0,
                },
                {
                  icon: Paintbrush,
                  title: "Product Design",
                  desc: "Defined product vision, prioritized features in backlog, and led UI/UX design for the reader and creator experience.",
                  color: "bg-gray-700",
                  delay: 0.15,
                },
                {
                  icon: Megaphone,
                  title: "Go-to-Market Prep",
                  desc: "Produced pitch deck, promotional video, and final presentation, showcasing both technical feasibility and product value.",
                  color: "bg-gray-700",
                  delay: 0.3,
                },
              ].map((it) => (
                <div
                  key={it.title}
                  className="reveal-on-scroll group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-2 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1"
                  style={{ ["--reveal-delay" as any]: `${Math.round(it.delay * 1000)}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${it.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
                  <div className="relative">
                    <div className="mb-3 flex items-center gap-3">
                      <div className={`rounded-lg bg-gradient-to-br ${it.color} p-2 shadow-lg`}>
                        <it.icon className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="text-[1.05rem] font-semibold text-slate-700">{it.title}</h4>
                    </div>
                    <p className="leading-relaxed text-slate-600">{it.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Demo Video (YouTube) ===== */}
        {/* ===== Demo Video (YouTube) ===== */}
        <section className="relative my-16 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/80 p-4 text-slate-800 md:p-6">
          <SectionTitle
            icon={Video}
            title="Product Explainer Video"
            subtitle=""
          />

          <div
            className="reveal-on-scroll"
            style={{ ["--reveal-delay" as any]: "150ms" }}
          >
            <YouTubeEmbed
              videoId="tpOmHt6Lsdg"
              title=""
              start={0}
            />
          </div>
        </section>


        {/* ===== Key Learnings ===== */}
        <OddSection>
          <SectionTitle icon={BookOpen} title="Key Learnings" subtitle="Valuable insights gained from leading this innovative project" />
          <ToneStylesDemo />
        </OddSection>

        {/* 預留 contact 錨點 */}
        <div id="contact" className="pb-10" />
      </div>

      {/* ===== 增強動畫 keyframes + 進場動畫 CSS ===== */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(0, -40px) rotate(180deg); }
          75% { transform: translate(-30px, -30px) rotate(270deg); }
        }
        @keyframes slideInDown {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(calc(100% - 50%)); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }

        /* 進場動畫（IntersectionObserver 觸發） */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(16px) scale(.985);
          transition:
            opacity 520ms cubic-bezier(.22,.61,.36,1),
            transform 520ms cubic-bezier(.22,.61,.36,1);
          transition-delay: var(--reveal-delay, 0ms);
          will-change: opacity, transform;
        }
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        /* SectionTitle 的階梯式進場 */
      .reveal-stagger .stagger-item {
        opacity: 0;
        transform: translateY(10px) scale(0.98);
        transition:
          opacity 500ms cubic-bezier(.22,.61,.36,1),
          transform 500ms cubic-bezier(.22,.61,.36,1);
        /* --reveal-delay 由父層（SectionTitle 外層）或各元件自行覆寫；
          --i 由每個子元素決定階梯順序（0,1,2...） */
        transition-delay: calc(var(--reveal-delay, 0ms) + (var(--i, 0) * 90ms));
        will-change: opacity, transform;
      }

      .reveal-stagger.is-visible .stagger-item {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      /* 讓圖示有一點彈性（只在可見後才加） */
      .reveal-stagger.is-visible .stagger-item:first-child {
        transition:
          opacity 520ms cubic-bezier(.22,.61,.36,1),
          transform 520ms cubic-bezier(.22,.61,.36,1);
        transform-origin: center;
      }

      `}</style>
    </div>
    </>
  );
}

/* ========= 增強的小元件 ========= */

/** EvenSection：支援背景圖 + 黑遮罩 */
function EvenSection({
  children,
  bgImage,
  darkMask = false,
}: {
  children: React.ReactNode;
  bgImage?: string;
  darkMask?: boolean;
}) {
  if (bgImage) {
    return (
      <section className="relative my-20 overflow-hidden rounded-3xl shadow-lg">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
        {darkMask && <div className="absolute inset-0 bg-black/80" />}
        <div className="relative z-10 px-6 py-16 backdrop-blur-[1px]">
          <div className="mx-auto max-w-5xl">{children}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-20 rounded-3xl border border-white/20 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 px-6 py-16 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

function OddSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="my-20 rounded-3xl bg-white/80 px-6 py-16 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
  dark = false,
}: {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="text-center reveal-on-scroll reveal-stagger" style={{ ["--reveal-delay" as any]: "80ms" }}>
      <h2
        className={`mx-auto inline-flex items-center justify-center gap-3 text-3xl font-bold md:text-[2.1rem] ${
          dark ? "text-emerald-50" : "text-slate-700"
        }`}
      >
        {Icon && (
          <span
            className="stagger-item inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl"
            style={{ ["--i" as any]: 0 }}
          >
            <Icon className="h-7 w-7 text-white" />
          </span>
        )}
        <span
          className={`stagger-item ${dark ? "text-emerald-50" : "bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent"}`}
          style={{ ["--i" as any]: 1 }}
        >
          {title}
        </span>
      </h2>

      {subtitle && (
        <p
          className={`stagger-item mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed ${dark ? "text-emerald-100/90" : "text-slate-600"}`}
          style={{ ["--i" as any]: 2 }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Card({
  title,
  icon: Icon,
  children,
  delay = 0,
}: {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="reveal-on-scroll group relative overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-8 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
      style={{ ["--reveal-delay" as any]: `${Math.round(delay * 1000)}ms` }}
    >
      <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 group-hover:w-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <h3 className="mb-4 flex items-center gap-3 text-[1.2rem] font-semibold text-slate-800">
          {Icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md">
              <Icon className="h-4 w-4 text-white" />
            </div>
          )}
          {title}
        </h3>
        <div className="leading-relaxed text-slate-800">{children}</div>
      </div>
    </div>
  );
}

function Feature({
  title,
  icon: Icon,
  children,
  delay = 0,
}: {
  title?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="reveal-on-scroll group relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30 p-10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-emerald-300 hover:shadow-xl"
      style={{ ["--reveal-delay" as any]: `${Math.round(delay * 1000)}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-gradient-to-br from-emerald-200/30 to-teal-200/30 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        {title && (
          <h4 className="mb-4 flex items-center gap-3 text-[1.1rem] font-bold text-slate-800">
            {Icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5 text-white" />
              </div>
            )}
            <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">{title}</span>
          </h4>
        )}
        <div className="leading-relaxed text-slate-700">{children}</div>
      </div>
    </div>
  );
}

/** Key Learnings 的安全樣式與 icon 修正 */
function ToneStylesDemo() {
  const items = [
    {
      icon: Users,
      t: "Problem Framing & Value Definition",
      d: "Learned how to translate an industry pain point (artist revenue model) into a clear product vision and value proposition.",
      tone: "emerald",
    },
    {
      icon: KanbanSquare,
      t: "Cross-Functional Leadership",
      d: "Gained hands-on experience coordinating frontend, backend, and design teammates to deliver an integrated product prototype.",
      tone: "emerald",
    },
    {
      icon: Megaphone,
      t: "Product Storytelling",
      d: "Learned how to pitch a product idea by creating presentations, demos, and narratives that clearly connect features to user value.",
      tone: "emerald",
    },
  ] as const;

  const toneMap = {
    emerald: {
      border: "border-emerald-200",
      bg: "from-white to-emerald-50/50",
      hoverBorder: "hover:border-emerald-300",
      glow: "from-emerald-100/20 to-emerald-200/20",
      iconBg: "from-emerald-500 to-emerald-600",
    },
    teal: {
      border: "border-teal-200",
      bg: "from-white to-teal-50/50",
      hoverBorder: "hover:border-teal-300",
      glow: "from-teal-100/20 to-teal-200/20",
      iconBg: "from-teal-500 to-teal-600",
    },
    cyan: {
      border: "border-cyan-200",
      bg: "from-white to-cyan-50/50",
      hoverBorder: "hover:border-cyan-300",
      glow: "from-cyan-100/20 to-cyan-200/20",
      iconBg: "from-cyan-500 to-cyan-600",
    },
  } as const;

  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((it, i) => {
        const t = toneMap[it.tone as keyof typeof toneMap];
        return (
          <div
            key={it.t}
            className={`reveal-on-scroll group relative overflow-hidden rounded-2xl border-2 ${t.border} bg-gradient-to-br ${t.bg} p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${t.hoverBorder}`}
            style={{ ["--reveal-delay" as any]: `${i * 150}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${t.glow} opacity-0 transition-opacity group-hover:opacity-100`} />
            <div className="relative">
              <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${t.iconBg} shadow-lg`}>
                <it.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="mb-3 text-xl font-bold text-slate-700">{it.t}</h4>
              <p className="leading-relaxed text-slate-600">{it.d}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
