import React from "react";
import { motion } from "framer-motion";
import { Users, Code, Sparkles, Lightbulb } from "lucide-react";
import { SectionTitle, sectionVariants, itemVariants } from "@/components/ui";

export default function Learnings() {
  const items = [
    { 
      title: "Business Translation", 
      description: "Transformed vague stakeholder requirements into actionable technical specifications, reducing project scope creep by 40% through structured requirement gathering and user story mapping.", 
      icon: Users 
    },
    { 
      title: "Technical Mastery", 
      description: "Advanced Python proficiency and LLM integration expertise, building production-ready AI workflows that improved processing efficiency by 60% and reduced manual intervention.", 
      icon: Code 
    },
    { 
      title: "Cross-functional Impact", 
      description: "Led rapid prototyping cycles with design and product teams, delivering 3 validated concepts in 2 weeks and establishing reusable frameworks for future AI initiatives.", 
      icon: Sparkles 
    },
  ];

  return (
    <motion.section className="space-y-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
      <SectionTitle title="What I Learn" />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((learning) => (
          <motion.div key={learning.title} variants={itemVariants} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-lg">
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-amber-50 opacity-0 transition-all duration-500 group-hover:scale-[10] group-hover:opacity-100" />
            <div className="relative z-10">
              <h2 className="mb-3 text-xl font-bold text-amber-500">{learning.title}</h2>
              <learning.icon className="mb-4 h-7 w-7 text-slate-500 transition-colors group-hover:text-amber-600" />
              <p className="text-sm leading-relaxed text-slate-700">{learning.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}