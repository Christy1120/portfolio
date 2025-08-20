import { motion } from "framer-motion";
import { SITE } from "../data/site";
import { ArrowRight, Download, Mail, Linkedin, Github, Rocket, Users, BarChart3, Layers } from "lucide-react";
import CapabilityCard from "./CapabilityCard";

export default function Hero() {
  return (
    <section id="home" className="section">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h1">
            把 <span className="text-brand">數據</span>、<span className="text-brand">UI</span> 與 <span className="text-brand">策略</span> 轉化為產品價值
          </motion.h1>
          <p className="lead mt-6">
            我是 {SITE.name}，具備資料分析與區塊鏈背景的準產品經理（Aspiring PM）。擅長以數據驗證想法、化繁為簡的 UI/UX、以及推動跨部門協作，把想法落地成為可用的 MVP。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-brand text-white px-5 py-3 font-semibold hover:bg-sky-600 shadow-soft">
              聯繫我 <ArrowRight className="w-4 h-4" />
            </a>
            <a href={SITE.resumeUrl} target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold">
              <Download className="w-4 h-4" /> 履歷 PDF
            </a>
          </div>
          <div className="mt-8 flex gap-4 text-slate-600">
            <a href={SITE.links.linkedin} target="_blank" aria-label="LinkedIn" className="p-2 rounded-lg border hover:bg-slate-50"><Linkedin/></a>
            <a href={SITE.links.github} target="_blank" aria-label="GitHub" className="p-2 rounded-lg border hover:bg-slate-50"><Github/></a>
            <a href={`mailto:${SITE.email}`} className="p-2 rounded-lg border hover:bg-slate-50"><Mail/></a>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="card p-8">
          <div className="grid grid-cols-2 gap-4">
            <CapabilityCard icon={<Users className="text-brand" />} title="用戶洞察" desc="帶領專題與研究，能拆解需求、規劃訪談、整理洞見。" />
            <CapabilityCard icon={<BarChart3 className="text-brand" />} title="數據驅動" desc="Python/SQL/Tableau/Streamlit，用數據驗證假設與量化成果。" />
            <CapabilityCard icon={<Layers className="text-brand" />} title="跨域思維" desc="AI、區塊鏈、智慧製造與農業應用，多場景可遷移經驗。" />
            <CapabilityCard icon={<Rocket className="text-brand" />} title="實踐力" desc="從 0→1 建立 MVP、推進跨部門合作，交付可運作成果。" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
