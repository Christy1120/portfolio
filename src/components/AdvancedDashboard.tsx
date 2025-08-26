import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Advanced Interactive Dashboard (React version)
 * - Self-contained styles (injected <style>)
 * - No external libs required
 * - Works inside any React page/section
 */
export default function AdvancedDashboard() {
  const [currentTab, setCurrentTab] = useState(0);
  const totalTabs = 3;
  const isMounted = useRef(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAutoPlayingRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const loadingOverlayRef = useRef<HTMLDivElement>(null);

  const tabs = useMemo(
    () => [
      { icon: "⚠️", label: "Problem Analysis" },
      { icon: "⚙️", label: "Technical Solution" },
      { icon: "🎯", label: "Results & Impact" },
    ],
    []
  );

  // Helpers
  const switchTab = (index: number) => {
    if (index === currentTab) return;
    const old = currentTab;
    setCurrentTab(index);

    // enter animations after DOM updates
    setTimeout(() => triggerPanelAnimation(index), 10);

    // progress steps
    const steps = containerRef.current?.querySelectorAll<HTMLElement>(".progress-step");
    steps?.forEach((s, i) => s.classList.toggle("active", i <= index));

    // panel x-transition classes
    const panels = containerRef.current?.querySelectorAll<HTMLElement>(".content-panel");
    if (!panels) return;
    panels[old]?.classList.remove("active");
    panels[old]?.classList.add(index > old ? "prev" : "next");
    setTimeout(() => {
      panels[old]?.classList.remove("prev", "next");
      panels[index]?.classList.add("active");
    }, 300);

    updateNavSlider();
  };

  const updateNavSlider = () => {
    const slider = sliderRef.current;
    const navItems = containerRef.current?.querySelectorAll<HTMLElement>(".nav-item");
    if (!slider || !navItems || !navItems[currentTab]) return;
    const item = navItems[currentTab];
    slider.style.width = item.offsetWidth + "px";
    slider.style.transform = `translateX(${item.offsetLeft}px)`;
  };

  const startAutoPlay = () => {
    if (isAutoPlayingRef.current) return;
    isAutoPlayingRef.current = true;
    autoPlayRef.current = setInterval(() => {
      setCurrentTab((prev) => (prev + 1) % totalTabs);
    }, 8000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = null;
    isAutoPlayingRef.current = false;
  };

  const triggerPanelAnimation = (index: number) => {
    const panels = containerRef.current?.querySelectorAll<HTMLElement>(".content-panel");
    if (!panels) return;
    const panel = panels[index];
    const elements = panel.querySelectorAll<HTMLElement>(".feature-item, .stat-card");
    elements.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      setTimeout(() => {
        el.style.transition = "all 0.5s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, i * 100 + 300);
    });
  };

  const createParticles = () => {
    const host = particlesRef.current;
    if (!host) return;
    host.innerHTML = "";
    const count = 50;
    for (let i = 0; i < count; i++) {
      const d = document.createElement("div");
      d.className = "particle";
      const size = Math.random() * 4 + 2;
      d.style.width = `${size}px`;
      d.style.height = `${size}px`;
      d.style.left = `${Math.random() * 100}%`;
      d.style.animationDelay = `${Math.random() * 20}s`;
      d.style.animationDuration = `${Math.random() * 10 + 15}s`;
      host.appendChild(d);
    }
  };

  const addMouseTrackingEffects = () => {
    const cards = containerRef.current?.querySelectorAll<HTMLElement>(".content-card");
    cards?.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mouse-x", x + "%");
        card.style.setProperty("--mouse-y", y + "%");
      });
    });
  };

  // Effects
  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    createParticles();
    updateNavSlider();
    addMouseTrackingEffects();

    // hide loading
    setTimeout(() => loadingOverlayRef.current?.classList.add("hidden"), 1500);

    // animate first panel
    setTimeout(() => triggerPanelAnimation(0), 1000);

    const onResize = () => setTimeout(updateNavSlider, 100);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      stopAutoPlay();
    };
  }, []);

  useEffect(() => {
    // update slider when tab changes (via autoplay or keys)
    updateNavSlider();
  }, [currentTab]);

  // keyboard + touch
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "t") {
        e.preventDefault();
        toggleTheme();
      }
      if (e.key === " ") {
        if ((e.target as HTMLElement) === document.body) {
          e.preventDefault();
          isAutoPlayingRef.current ? stopAutoPlay() : startAutoPlay();
        }
      }
      if (e.key === "ArrowLeft" && currentTab > 0) setCurrentTab(currentTab - 1);
      if (e.key === "ArrowRight" && currentTab < totalTabs - 1) setCurrentTab(currentTab + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentTab]);

  // theme
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark((v) => !v);

  // stats observer
  useEffect(() => {
    const grids = containerRef.current?.querySelectorAll<HTMLElement>(".stats-grid");
    if (!grids || grids.length === 0) return;
    const animateStats = () => {
      containerRef.current?.querySelectorAll<HTMLElement>(".stat-number").forEach((stat) => {
        const text = stat.textContent || "0";
        const isPct = text.includes("%");
        const isX = text.includes("x");
        const target = parseInt(text);
        let v = 0;
        const inc = target / 50;
        const t = setInterval(() => {
          v += inc;
          if (v >= target) {
            v = target;
            clearInterval(t);
          }
          const disp = Math.floor(v).toString();
          stat.textContent = isPct ? disp + "%" : isX ? disp + "x" : disp;
        }, 50);
      });
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.target.classList.contains("stats-grid")) {
          animateStats();
          io.unobserve(e.target);
        }
      });
    });
    grids.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`advdash ${isDark ? "theme-dark" : "theme-light"}`} ref={containerRef}>
      <style>{styles}</style>

      {/* Loading */}
      <div className="loading-overlay" ref={loadingOverlayRef}>
        <div className="loading-spinner" />
      </div>

      {/* Particles */}
      <div className="particles-bg" ref={particlesRef} />

      <div className="dashboard-wrapper" onMouseEnter={stopAutoPlay} onMouseLeave={() => setTimeout(startAutoPlay, 2000)}>
        <div className="container">
          {/* Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Interactive Dashboard</h1>
            <p className="dashboard-subtitle">Problem → Solution → Success</p>
          </div>

          <div className="dashboard-main">
            {/* progress */}
            <div className="progress-indicator">
              {Array.from({ length: totalTabs }).map((_, i) => (
                <div key={i} className={`progress-step ${i <= currentTab ? "active" : ""}`} data-step={i} />
              ))}
            </div>

            {/* nav */}
            <div className="dashboard-nav">
              <div className="nav-slider" ref={sliderRef} />
              {tabs.map((t, i) => (
                <div
                  key={t.label}
                  className={`nav-item ${i === currentTab ? "active" : ""}`}
                  onClick={() => switchTab(i)}
                >
                  <span className="nav-icon" role="img" aria-label="icon">{t.icon}</span>
                  {t.label}
                </div>
              ))}
            </div>

            {/* content panels */}
            <div className="dashboard-content">
              {/* Problem */}
              <div className={`content-panel ${currentTab === 0 ? "active" : ""}`}>
                <div className="content-card">
                  <div className="content-header">
                    <div className="content-icon pain-icon">⚠️</div>
                    <div>
                      <h2 className="content-title">Problem Analysis</h2>
                      <p className="content-subtitle">Understanding the Challenge</p>
                    </div>
                  </div>
                  <div className="content-body">
                    <p><strong>Core Issue:</strong> The client needed a new production indicator but manager was uncertain whether it would be impactful or technically feasible.</p>
                    <p>This uncertainty created bottlenecks in decision-making and resource allocation. The team needed a way to quickly validate concepts and demonstrate value before committing to full development.</p>
                    <div className="stats-grid">
                      <div className="stat-card"><div className="stat-number">72%</div><div className="stat-label">Uncertainty Rate</div></div>
                      <div className="stat-card"><div className="stat-number">3x</div><div className="stat-label">Longer Decisions</div></div>
                      <div className="stat-card"><div className="stat-number">45%</div><div className="stat-label">Resource Waste</div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className={`content-panel ${currentTab === 1 ? "active" : ""}`}>
                <div className="content-card">
                  <div className="content-header">
                    <div className="content-icon solution-icon">⚙️</div>
                    <div>
                      <h2 className="content-title">Technical Solution</h2>
                      <p className="content-subtitle">Built a rapid prototype with Streamlit</p>
                    </div>
                  </div>
                  <div className="content-body">
                    <p><strong>Strategic Approach:</strong> Developed a comprehensive yet lightweight solution that could be deployed quickly and tested immediately.</p>
                    <ul className="feature-list">
                      <li className="feature-item"><div className="feature-icon">📊</div><div className="feature-text"><strong>Automated Calculations:</strong> Regression and summary calculations from uploaded Excel data with real-time processing</div></li>
                      <li className="feature-item"><div className="feature-icon">📈</div><div className="feature-text"><strong>Visual Analytics:</strong> Clear charts and graphs to surface trends, anomalies, and key insights instantly</div></li>
                      <li className="feature-item"><div className="feature-icon">🎯</div><div className="feature-text"><strong>User-Friendly Interface:</strong> Simple, intuitive UI designed for non-technical users to test and validate quickly</div></li>
                      <li className="feature-item"><div className="feature-icon">⚡</div><div className="feature-text"><strong>Rapid Deployment:</strong> Zero-setup solution that works immediately in any browser environment</div></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className={`content-panel ${currentTab === 2 ? "active" : ""}`}>
                <div className="content-card">
                  <div className="content-header">
                    <div className="content-icon outcome-icon">🎯</div>
                    <div>
                      <h2 className="content-title">Results & Impact</h2>
                      <p className="content-subtitle">Measurable Success Metrics</p>
                    </div>
                  </div>
                  <div className="content-body">
                    <p><strong>Transformational Outcomes:</strong> The prototype exceeded expectations and delivered immediate value to all stakeholders.</p>
                    <ul className="feature-list">
                      <li className="feature-item"><div className="feature-icon">👁️</div><div className="feature-text"><strong>Instant Comprehension:</strong> Managers quickly grasped complex indicator issues via a single, comprehensive screen</div></li>
                      <li className="feature-item"><div className="feature-icon">🚀</div><div className="feature-text"><strong>Accelerated Decisions:</strong> Faster go/no-go feasibility evaluation reduced decision time by 60%</div></li>
                      <li className="feature-item"><div className="feature-icon">🤝</div><div className="feature-text"><strong>Enhanced Communication:</strong> Clearer, more effective communication bridge between business and development teams</div></li>
                      <li className="feature-item"><div className="feature-icon">💡</div><div className="feature-text"><strong>Validated Approach:</strong> Proven methodology now used as template for future rapid prototyping initiatives</div></li>
                    </ul>
                    <div className="stats-grid">
                      <div className="stat-card"><div className="stat-number">95%</div><div className="stat-label">Satisfaction Rate</div></div>
                      <div className="stat-card"><div className="stat-number">60%</div><div className="stat-label">Time Savings</div></div>
                      <div className="stat-card"><div className="stat-number">100%</div><div className="stat-label">Adoption Rate</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* actions */}
            <div className="dashboard-actions">
              <button className="action-btn" onClick={(e) => exportData(e as any)}>📊 Export Report</button>
              <button className="action-btn primary" onClick={() => viewDemo()}>🚀 View Live Demo</button>
              <button className="action-btn" onClick={(e) => shareResults(e as any)}>📤 Share Results</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // button handlers
  function exportData(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.currentTarget;
    const original = btn.innerHTML;
    btn.innerHTML = "📊 Exporting...";
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = "✅ Exported!";
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
      }, 2000);
    }, 2000);
  }

  function viewDemo() {
    const overlay = document.createElement("div");
    overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.8);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:1000;cursor:pointer;`;
    const msg = document.createElement("div");
    msg.style.cssText = `background:linear-gradient(135deg,#4ecdc4,#44a08d);color:#fff;padding:3rem;border-radius:20px;text-align:center;font-size:1.2rem;font-weight:600;box-shadow:0 20px 40px rgba(0,0,0,.3);`;
    msg.innerHTML = '🚀 Demo launching...<br><small style="opacity:.8">Click anywhere to close</small>';
    overlay.appendChild(msg);
    document.body.appendChild(overlay);
    overlay.addEventListener("click", () => overlay.remove());
    setTimeout(() => overlay.remove(), 3000);
  }

  function shareResults(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.currentTarget;
    if ((navigator as any).share) {
      (navigator as any).share({ title: "Dashboard Results", text: "Check out these amazing project results!", url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = "✅ Link Copied!";
        setTimeout(() => (btn.innerHTML = "📤 Share Results"), 2000);
      });
    }
  }
}

const styles = `
*{margin:0;padding:0;box-sizing:border-box}
.advdash.theme-dark{--bg:linear-gradient(135deg,#1e1e2e 0%,#2d1b69 30%,#11998e 100%);--text:#fff}
.advdash.theme-light{--bg:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 30%,#cbd5e1 100%);--text:#1a202c}
.advdash{font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;min-height:100vh;color:var(--text);background:var(--bg);overflow-x:hidden}
.dashboard-wrapper{position:relative;min-height:100vh;padding:2rem}
.particles-bg{position:fixed;inset:0;pointer-events:none;z-index:0}
.particle{position:absolute;background:rgba(255,255,255,.1);border-radius:50%;animation:float 20s infinite linear}
@keyframes float{0%{transform:translateY(100vh) rotate(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100px) rotate(360deg);opacity:0}}
.container{max-width:1400px;margin:0 auto;position:relative;z-index:1}
.dashboard-header{text-align:center;margin-bottom:3rem}
.dashboard-title{font-size:3rem;font-weight:800;background:linear-gradient(135deg,#fff,#a8edea,#fed6e3);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:1rem;text-shadow:0 0 30px rgba(255,255,255,.3)}
.dashboard-subtitle{font-size:1.2rem;color:rgba(255,255,255,.8);font-weight:300}
.dashboard-main{background:rgba(255,255,255,.05);backdrop-filter:blur(30px);border-radius:32px;border:1px solid rgba(255,255,255,.1);box-shadow:0 32px 64px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.1);padding:2.5rem;position:relative;overflow:hidden}
.dashboard-main::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);animation:shimmer 3s ease-in-out infinite}
@keyframes shimmer{0%,100%{opacity:0}50%{opacity:1}}
.progress-indicator{display:flex;justify-content:center;margin-bottom:2rem;gap:1rem}
.progress-step{width:60px;height:4px;background:rgba(255,255,255,.2);border-radius:2px;position:relative;overflow:hidden}
.progress-step.active::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#ff6b6b,#4ecdc4,#45b7d1);border-radius:2px;animation:progress-fill .8s ease-out}
@keyframes progress-fill{0%{width:0}100%{width:100%}}
.dashboard-nav{display:flex;justify-content:center;margin-bottom:3rem;background:rgba(255,255,255,.05);border-radius:60px;padding:.5rem;position:relative;backdrop-filter:blur(20px)}
.nav-slider{position:absolute;top:.5rem;left:.5rem;height:calc(100% - 1rem);background:linear-gradient(135deg,rgba(255,255,255,.2),rgba(255,255,255,.1));border-radius:50px;transition:all .4s cubic-bezier(.25,.46,.45,.94);border:1px solid rgba(255,255,255,.2);box-shadow:0 8px 25px rgba(0,0,0,.2)}
.nav-item{padding:1rem 2.5rem;border-radius:50px;cursor:pointer;transition:all .3s ease;color:rgba(255,255,255,.7);font-weight:600;position:relative;z-index:2;display:flex;align-items:center;gap:.5rem;font-size:1rem}
.nav-item.active{color:#fff;text-shadow:0 0 20px rgba(255,255,255,.5)}
.nav-item::before{content:"";position:absolute;top:50%;left:50%;width:0;height:0;background:radial-gradient(circle,rgba(255,255,255,.3),transparent 70%);border-radius:50%;transform:translate(-50%,-50%);transition:all .3s ease;pointer-events:none}
.nav-item:hover::before{width:100px;height:100px}
.nav-icon{width:20px;height:20px;display:flex;align-items:center;justify-content:center}
.dashboard-content{min-height:400px;position:relative;overflow:hidden}
.content-panel{position:absolute;width:100%;opacity:0;transform:translateY(30px) scale(.95);transition:all .6s cubic-bezier(.25,.46,.45,.94);pointer-events:none}
.content-panel.active{opacity:1;transform:translateY(0) scale(1);pointer-events:all}
.content-panel.prev{transform:translateX(-100%) scale(.8)}
.content-panel.next{transform:translateX(100%) scale(.8)}
.content-card{background:rgba(255,255,255,.03);border-radius:24px;padding:2.5rem;border:1px solid rgba(255,255,255,.1);position:relative;overflow:hidden}
.content-card::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(255,255,255,.1),transparent 50%);opacity:0;transition:opacity .3s ease;pointer-events:none}
.content-card:hover::before{opacity:1}
.content-header{display:flex;align-items:center;gap:1rem;margin-bottom:2rem}
.content-icon{width:60px;height:60px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:linear-gradient(135deg,var(--icon-color-1),var(--icon-color-2));box-shadow:0 8px 25px rgba(0,0,0,.3);position:relative}
.content-icon::after{content:"";position:absolute;inset:0;border-radius:16px;padding:2px;background:linear-gradient(135deg,rgba(255,255,255,.3),transparent);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:exclude}
.pain-icon{--icon-color-1:#ff6b6b;--icon-color-2:#ee5a52}
.solution-icon{--icon-color-1:#4ecdc4;--icon-color-2:#44a08d}
.outcome-icon{--icon-color-1:#45b7d1;--icon-color-2:#96c93d}
.content-title{font-size:2.2rem;font-weight:700;margin-bottom:.5rem;background:linear-gradient(135deg,#fff,rgba(255,255,255,.8));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.content-subtitle{color:rgba(255,255,255,.6);font-size:1.1rem;font-weight:400}
.content-body{font-size:1.1rem;line-height:1.8;color:rgba(255,255,255,.9)}
.content-body p{margin-bottom:1.5rem}
.content-body strong{color:#fff;font-weight:600}
.feature-list{list-style:none;margin-top:1.5rem}
.feature-item{display:flex;align-items:flex-start;gap:1rem;margin-bottom:1.2rem;padding:1rem;border-radius:12px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);transition:all .3s ease}
.feature-item:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);transform:translateX(8px)}
.feature-icon{width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#4ecdc4,#44a08d);display:flex;align-items:center;justify-content:center;font-size:.8rem;flex-shrink:0;margin-top:.2rem}
.feature-text{flex:1;font-size:1rem;line-height:1.6}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-top:2rem}
.stat-card{background:rgba(255,255,255,.05);border-radius:16px;padding:1.5rem;text-align:center;border:1px solid rgba(255,255,255,.1);transition:all .3s ease}
.stat-card:hover{transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,0,0,.3)}
.stat-number{font-size:2.5rem;font-weight:800;background:linear-gradient(135deg,#4ecdc4,#45b7d1);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.5rem}
.stat-label{color:rgba(255,255,255,.7);font-size:.9rem;font-weight:500}
.dashboard-actions{display:flex;justify-content:center;gap:1rem;margin-top:3rem}
.action-btn{padding:.8rem 2rem;border:none;border-radius:50px;background:linear-gradient(135deg,rgba(255,255,255,.1),rgba(255,255,255,.05));color:#fff;font-weight:600;cursor:pointer;transition:all .3s ease;backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2)}
.action-btn:hover{background:linear-gradient(135deg,rgba(255,255,255,.2),rgba(255,255,255,.1));transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,0,0,.3)}
.action-btn.primary{background:linear-gradient(135deg,#4ecdc4,#44a08d)}
.action-btn.primary:hover{background:linear-gradient(135deg,#44a08d,#4ecdc4)}
.loading-overlay{position:fixed;inset:0;background:linear-gradient(135deg,#1e1e2e,#2d1b69);display:flex;align-items:center;justify-content:center;z-index:1000;opacity:1;transition:opacity .5s ease}
.loading-overlay.hidden{opacity:0;pointer-events:none}
.loading-spinner{width:60px;height:60px;border:3px solid rgba(255,255,255,.3);border-top:3px solid #4ecdc4;border-radius:50%;animation:spin 1s linear infinite}
@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@media (max-width:768px){.dashboard-wrapper{padding:1rem}.dashboard-title{font-size:2rem}.dashboard-main{padding:1.5rem}.nav-item{padding:.8rem 1.5rem;font-size:.9rem}.content-card{padding:1.5rem}.content-title{font-size:1.8rem}.stats-grid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem}}
`;
