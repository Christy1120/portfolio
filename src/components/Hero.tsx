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
            Hi, I’m <span className="text-brand">KAI TING</span>
          </motion.h1>
          <p className="lead mt-6">
            Transitioning into product management with a data and information-systems background. I talk to users, turn manual workflows into simple tools, and validate decisions with small experiments.
          </p>
          
          <div className="mt-8 flex gap-4 text-slate-600">
            <a href={SITE.links.linkedin} target="_blank" aria-label="LinkedIn" className="p-2 rounded-lg border hover:bg-slate-50"><Linkedin/></a>
            <a href={SITE.links.github} target="_blank" aria-label="GitHub" className="p-2 rounded-lg border hover:bg-slate-50"><Github/></a>
            <a href={`mailto:${SITE.email}`} className="p-2 rounded-lg border hover:bg-slate-50"><Mail/></a>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className=" p-8">
          <motion.img
          src="/public/girl.png"  
          alt="pic"
          className="w-full h-auto rounded-xl"
          animate={{ y: [0, -10, 0] }}   // 上下浮動
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
      />
        </motion.div>
      </div>
    </section>
  );
}
