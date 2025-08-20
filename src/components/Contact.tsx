import { Mail, Linkedin, Github } from "lucide-react";
import { SITE } from "../data/site";

export default function Contact() {
  return (
    <section id="contact" className="section bg-slate-50">
      <div className="container text-center">
        <h2 className="h2">讓我們聊聊產品</h2>
        <p className="lead mt-3">
          若你正在尋找具備資料分析、跨域技術理解與落地能力的準 PM，我很樂意分享更多作品與想法。
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-xl bg-brand text-white px-5 py-3 font-semibold hover:bg-sky-600 shadow-soft">
            <Mail className="w-4 h-4" /> Email
          </a>
          <a href={SITE.links.linkedin} target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a href={SITE.links.github} target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold">
            <Github className="w-4 h-4" /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
