import React from "react";

export default function ThemeCSS() {
  return (
    <style>{`
/* ========= Core Tokens ========= */
.project-detail-theme {
  /* Brand (可依需要調整) */
  --pd-primary: #f7797d;
  --pd-primary-light: #fbd786;
  --pd-primary-dark: #d45b60;
  --pd-secondary: #f59e0b;
  --pd-accent: #ec4899;

  /* Surfaces */
  --pd-bg-primary: #ffffff;
  --pd-bg-secondary: #f8fafc;
  --pd-bg-tertiary: #f1f5f9;

  /* Text */
  --pd-text-primary: #0f172a;
  --pd-text-secondary: #475569;
  --pd-text-muted: #94a3b8;

  /* Shadows */
  --pd-shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
  --pd-shadow: 0 4px 12px rgba(0,0,0,0.08);
  --pd-shadow-lg: 0 8px 32px rgba(0,0,0,0.12);
  --pd-shadow-xl: 0 16px 64px rgba(0,0,0,0.15);

  /* Glass */
  --pd-glass: rgba(255,255,255,0.95);
  --pd-glass-border: rgba(148,163,184,0.2);

  /* Gradients */
  --pd-gradient-primary: linear-gradient(135deg, #fbd786 0%, #f7797d 100%);
  --pd-gradient-accent: linear-gradient(135deg, #fbd786 0%, #f7797d 100%);
  --pd-gradient-bg: linear-gradient(135deg, #fffbea 0%, #ffe8ec 100%);

  /* Motion */
  --pd-transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --pd-transition-medium: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --pd-transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Radius */
  --pd-border-radius: 12px;
  --pd-border-radius-lg: 16px;
  --pd-border-radius-xl: 24px;
}

* { scroll-behavior: smooth; }

/* ========= Entrance / Stagger ========= */
.pd-fade-in { animation: pdFadeInUp .8s cubic-bezier(.25,.8,.25,1) forwards; opacity:0; transform: translateY(30px); }
.pd-fade-in-delay { animation: pdFadeInUp .8s cubic-bezier(.25,.8,.25,1) .2s forwards; opacity:0; transform: translateY(30px); }
.pd-fade-in-delay-2 { animation: pdFadeInUp .8s cubic-bezier(.25,.8,.25,1) .4s forwards; opacity:0; transform: translateY(30px); }

.pd-stagger-children > * { animation: pdFadeInUp .6s cubic-bezier(.25,.8,.25,1) forwards; opacity:0; transform: translateY(20px); }
.pd-stagger-children > *:nth-child(1){ animation-delay:0ms; }
.pd-stagger-children > *:nth-child(2){ animation-delay:100ms; }
.pd-stagger-children > *:nth-child(3){ animation-delay:200ms; }
.pd-stagger-children > *:nth-child(4){ animation-delay:300ms; }
.pd-stagger-children > *:nth-child(5){ animation-delay:400ms; }

/* ========= Hover Utils ========= */
.pd-lift-hover{ transition: all var(--pd-transition-medium); will-change: transform, box-shadow; }
.pd-lift-hover:hover{ transform: translateY(-4px) scale(1.02); box-shadow: var(--pd-shadow-xl); }

.pd-gentle-hover{ transition: all var(--pd-transition-fast); }
.pd-gentle-hover:hover{ transform: translateY(-2px); box-shadow: var(--pd-shadow-lg); }

/* ========= Glass ========= */
.pd-glass-card{
  background: var(--pd-glass);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--pd-glass-border);
  box-shadow: var(--pd-shadow);
}

.pd-glass-card-vibrant{
  background: linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%);
  backdrop-filter: blur(20px) saturate(200%);
  border: 1px solid rgba(255,255,255,0.20);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1);
}

/* ========= Buttons ========= */
.pd-btn-primary{
  background: var(--pd-gradient-primary);
  color:#fff; border:none; position:relative; overflow:hidden;
  transition: all var(--pd-transition-fast); box-shadow: var(--pd-shadow);
}
.pd-btn-primary::before{
  content:''; position:absolute; inset:0; left:-100%; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
  transition:left .5s;
}
.pd-btn-primary:hover::before{ left:100%; }
.pd-btn-primary:hover{ transform: translateY(-2px); box-shadow: var(--pd-shadow-lg); }

.pd-btn-secondary{
  background: var(--pd-bg-primary);
  color: var(--pd-text-primary);
  border: 1px solid var(--pd-glass-border);
  transition: all var(--pd-transition-fast);
  backdrop-filter: blur(10px);
}
.pd-btn-secondary:hover{
  background: var(--pd-primary);
  color:#fff;
  border-color: var(--pd-primary);
  transform: translateY(-1px);
}

/* ========= Tags ========= */
.pd-tag{
  background: var(--pd-bg-secondary);
  border: 1px solid var(--pd-glass-border);
  transition: all var(--pd-transition-fast);
  backdrop-filter: blur(10px);
  position: relative; overflow: hidden;
  border-radius:9999px; padding:.5rem .875rem;
}
.pd-tag::before{
  content:''; position:absolute; left:0; right:0; top:0; height:2px;
  background: var(--pd-gradient-primary);
  transform: scaleX(0); transform-origin: left; transition: transform var(--pd-transition-fast);
}
.pd-tag:hover::before{ transform: scaleX(1); }
.pd-tag:hover{ background: var(--pd-bg-primary); border-color: var(--pd-primary); color: var(--pd-primary); transform: translateY(-2px); box-shadow: var(--pd-shadow); }

/* ========= Image FX ========= */
.pd-image-container{ position:relative; overflow:hidden; border-radius: var(--pd-border-radius-lg); }
.pd-image-container::after{
  content:''; position:absolute; inset:0;
  background: linear-gradient(45deg, rgba(251,215,134,.12) 0%, rgba(247,121,125,.12) 100%);
  opacity:0; transition: opacity var(--pd-transition-medium);
}
.pd-image-container:hover::after{ opacity:1; }

/* ========= Keyframes ========= */
@keyframes pdFadeInUp{ from{ opacity:0; transform: translateY(30px) scale(.95);} to{ opacity:1; transform: translateY(0) scale(1);} }
@keyframes pdPulse{ 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
@keyframes pdFloat{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

.pd-pulse{ animation: pdPulse 2s ease-in-out infinite; }
.pd-float{ animation: pdFloat 3s ease-in-out infinite; }

/* ========= Responsive / A11y ========= */
@media (max-width: 768px){
  .pd-fade-in, .pd-fade-in-delay, .pd-fade-in-delay-2{ animation-duration:.5s; }
  .pd-lift-hover:hover, .pd-gentle-hover:hover{ transform:none; box-shadow: var(--pd-shadow); }
}

@media (prefers-color-scheme: dark){
  .project-detail-theme{
    --pd-bg-primary:#0f172a; --pd-bg-secondary:#1e293b; --pd-bg-tertiary:#334155;
    --pd-text-primary:#f8fafc; --pd-text-secondary:#cbd5e1; --pd-text-muted:#64748b;
    --pd-glass: rgba(30,41,59,.80); --pd-glass-border: rgba(148,163,184,.10);
    /* 背景漸層稍降亮度 */
    --pd-gradient-bg: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  }
}
@media (prefers-reduced-motion: reduce){
  *{ animation-duration:.01ms !important; transition-duration:.01ms !important; scroll-behavior:auto !important; }
}

.pd-interactive{ cursor:pointer; user-select:none; }
.pd-interactive:active{ transform: scale(.98); }

/* ========= New FX Tokens & Utils (把 inline 全部抽掉) ========= */
.project-detail-theme{
  /* 背景網格用色 */
  --pd-fx-grid: rgba(247,121,125,0.35);

  /* 漂浮球（用你的品牌漸層系） */
  --pd-orb-1-from: rgba(251,215,134,0.22);
  --pd-orb-1-to:   rgba(247,121,125,0.22);
  --pd-orb-2-from: rgba(247,121,125,0.22);
  --pd-orb-2-to:   rgba(251,215,134,0.22);
  --pd-orb-3-from: rgba(255,173,96,0.22);
  --pd-orb-3-to:   rgba(247,121,125,0.22);

  /* Hero 光暈/遮罩 */
  --pd-hero-glow: linear-gradient(90deg, rgba(251,215,134,.22), rgba(247,121,125,.22), rgba(251,215,134,.22));
  --pd-hero-overlay: linear-gradient(to top, rgba(15,23,42,0.40), transparent);

  /* Section 邊緣光暈 */
  --pd-section-glow-a: linear-gradient(90deg, rgba(251,215,134,.22), rgba(247,121,125,.22));
  --pd-section-glow-b: linear-gradient(90deg, rgba(247,121,125,.22), rgba(251,215,134,.22));
}

/* Utils */
.pd-bg{ background: var(--pd-gradient-bg); }
.pd-grid{
  background-image:
    linear-gradient(var(--pd-fx-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--pd-fx-grid) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: .02;
}
.pd-orb{ border-radius:9999px; filter: blur(24px); }
.pd-orb-1{ background-image: linear-gradient(to bottom right, var(--pd-orb-1-from), var(--pd-orb-1-to)); }
.pd-orb-2{ background-image: linear-gradient(to bottom right, var(--pd-orb-2-from), var(--pd-orb-2-to)); }
.pd-orb-3{ background-image: linear-gradient(to bottom right, var(--pd-orb-3-from), var(--pd-orb-3-to)); }
.pd-delay-1{ animation-delay: 1s; }
.pd-delay-2{ animation-delay: 2s; }

.pd-hero-glow{ background-image: var(--pd-hero-glow); }
.pd-hero-overlay{ background-image: var(--pd-hero-overlay); }

.pd-section-glow-a{ background-image: var(--pd-section-glow-a); }
.pd-section-glow-b{ background-image: var(--pd-section-glow-b); }
    `}</style>
  );
}
