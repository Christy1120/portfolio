import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Mail, Copy, Check, Linkedin } from "lucide-react"; // 加入了 Linkedin icon，移除了未使用的 Phone
import { SITE } from "../data/site";

// 將 items 移到組件外部，避免 useEffect 依賴問題
const NAV_ITEMS = [
  { id: "spotlight", label: "Spotlight" },
  { id: "skills", label: "Skills" },
  { id: "project", label: "Project" },
];

export default function Nav() {
  const { pathname, hash } = useLocation();
  const onHome = pathname === "/";
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // 用於追蹤當前啟用的項目 ID
  const [activeTab, setActiveTab] = useState("spotlight");

  // 同步 URL Hash 與滾動監聽 (Scrollspy)
  useEffect(() => {
    // 1. 處理網址上的 hash
    const currentHash = hash.replace("#", "");
    if (currentHash && NAV_ITEMS.find(i => i.id === currentHash)) {
      setActiveTab(currentHash);
    }

    // 2. 建立 IntersectionObserver 來監聽滾動到哪個 section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      // rootMargin 設定為畫面中間觸發 (-40% 上下偏移)
      { rootMargin: "-40% 0px -40% 0px" } 
    );

    // 觀察所有導覽列對應的 section id
    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    // 清除觀察器
    return () => observer.disconnect();
  }, [hash]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("k09824719@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const desktopNavLinkClass = "relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300";
  const mobileNavLinkClass = "text-2xl font-semibold text-white/90 hover:text-pink-400 transition-colors py-4 w-full block text-center";

  // 渲染電腦版導覽項目 (包含動畫背景)
  const renderDesktopLink = (item: { id: string; label: string }) => {
    const isActive = activeTab === item.id;
    
    const content = (
      <span className={isActive ? "text-white" : "text-white/60 hover:text-white"}>
        {item.label}
      </span>
    );

    return (
      <div key={item.id} className="relative flex items-center justify-center">
        {onHome ? (
          <a 
            href={`#${item.id}`} 
            onClick={() => setActiveTab(item.id)}
            className={desktopNavLinkClass}
          >
            {content}
          </a>
        ) : (
          <Link 
            to={`/#${item.id}`} 
            onClick={() => setActiveTab(item.id)}
            className={desktopNavLinkClass}
          >
            {content}
          </Link>
        )}

        {/* 這裡是橢圓形 Active 背景 */}
        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 bg-white/10 border border-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </div>
    );
  };

  const renderLink = (item: { id: string; label: string }, isMobile: boolean) => {
    if (!isMobile) return renderDesktopLink(item);

    return onHome ? (
      <a key={item.id} href={`#${item.id}`} className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
        {item.label}
      </a>
    ) : (
      <Link key={item.id} to={`/#${item.id}`} className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
        {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* ===== 電腦版導覽列 ===== */}
      <header className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-[100] items-center justify-center">
        <div className="flex items-center gap-4 bg-[#0A111A]/60 backdrop-blur-2xl border border-white/20 rounded-full px-6 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <Link to="/#home" className="font-heading font-bold text-lg text-white tracking-wider drop-shadow-md pr-2">
            {SITE?.logoText || "KAI TING"}
          </Link>
          
          <div className="w-[1px] h-5 bg-white/20 rounded-full mx-2" />
          
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map(item => renderLink(item, false))}
          </nav>
          
          <button
            onClick={() => setIsContactOpen(true)}
            className="ml-4 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300
                       bg-white/5 border border-white/10 text-pink-400
                       hover:bg-pink-500 hover:text-black hover:border-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]
                       active:scale-95"
          >
            Contact me
          </button>
        </div>
      </header>

      {/* ===== 手機版頂部固定導覽 ===== */}
      <header className="md:hidden fixed top-0 left-0 w-full z-[100] px-6 h-16 flex items-center justify-between bg-[#050A10]/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <Link to="/#home" className="font-heading font-bold text-lg text-white tracking-wider">
          {SITE?.logoText || "KAI TING"}
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 -mr-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* ===== 手機版全螢幕選單抽屜 ===== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-[105] bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="md:hidden fixed top-0 right-0 z-[110] w-[80%] max-w-sm h-full bg-[#0A111A]/90 backdrop-blur-3xl border-l border-white/10 flex flex-col p-10 pt-24 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <nav className="flex-1 flex flex-col gap-3">
                {NAV_ITEMS.map(item => renderLink(item, true))}
              </nav>
              <button
                onClick={() => {
                  setIsContactOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center px-5 py-3.5 rounded-full font-bold text-sm transition-all duration-300
                           bg-white/5 border border-white/20 text-pink-400
                           hover:bg-pink-500 hover:text-black hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]
                           active:scale-95"
              >
                Contact me
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== 聯絡彈窗 ===== */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0A111A]/90 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 max-w-sm w-full shadow-[0_0_40px_rgba(236,72,153,0.15)]"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-5 right-5 p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
              
              <h3 className="text-2xl font-semibold mb-6 text-white tracking-wide">Let's Connect</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                  <div className="p-2 bg-pink-500/10 group-hover:bg-pink-500/20 rounded-full transition-colors">
                    <Mail className="text-pink-400" size={18} />
                  </div>
                  <span className="text-sm font-medium text-white/90 flex-1 tracking-wide">k09824719@gmail.com</span>
                  <button onClick={handleCopyEmail} className="p-1.5 text-white/50 hover:text-pink-400 transition-colors">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* ===== 更新為 LinkedIn 按鈕 ===== */}
              <a 
                href="https://www.linkedin.com/in/kai-ting-zhang-349292289/" // TODO: 請替換成你真實的 LinkedIn 連結
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 w-full text-center bg-white/5 border border-white/20 text-white py-3.5 rounded-full font-semibold hover:bg-pink-500 hover:text-black hover:border-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300"
              >
                <Linkedin size={18} />
                Connect on LinkedIn
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}