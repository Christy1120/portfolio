import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, MessageCircle, Presentation } from "lucide-react";
import { SectionTitle, sectionVariants } from "@/components/ui";

export default function Learnings() {
  const items = [
    { 
      title: "Interview Planning & Execution", 
      description: "Learned how to plan and conduct interviews with industry stakeholders, from outreach to structured questioning, to gather first-hand insights.", 
      icon: ClipboardList 
    },
    { 
      title: "Stakeholder Communication", 
      description: "Learned how to communicate effectively with different stakeholders — from interviewing an industry CEO to gather first-hand insights, to discussing research direction and refining findings through regular feedback sessions with my professor.", 
      icon: MessageCircle 
    },
    { 
      title: "Research Communication", 
      description: "Learned how to communicate research outcomes clearly and effectively to both academic and professional audiences, tailoring the message to different stakeholders.", 
      icon: Presentation 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const enhancedItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(4px)" },
    visible: { 
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.6 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.2 }
    },
    
  };

  const backgroundVariants = {
    initial: { scale: 0, opacity: 0, x: 20, y: -20 },
    hover: { 
      scale: 12, opacity: 1, x: 0, y: 0,
      transition: { type: "spring", stiffness: 100, damping: 25, duration: 0.8 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section 
      className="space-y-8" 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      variants={sectionVariants}
    >
      <SectionTitle title="What I Learn" />
      
      <motion.div 
        className="grid gap-6 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {items.map((learning) => (
          <motion.div 
            key={learning.title} 
            variants={enhancedItemVariants}
            whileHover="hover"
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-lg cursor-pointer"
          >
            <motion.div 
              className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gradient-to-br from-amber-50 to-amber-100"
              variants={backgroundVariants}
              initial="initial"
              whileHover="hover"
            />
            
            <div className="relative z-10">
              <motion.h2 
                className="mb-3 text-xl font-bold text-amber-500"
                variants={textVariants}
                whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                {learning.title}
              </motion.h2>
              
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                className="mb-4"
              >
                <learning.icon className="h-7 w-7 text-slate-500 transition-colors group-hover:text-amber-600" />
              </motion.div>
              
              <motion.p 
                className="text-sm leading-relaxed text-slate-700"
                variants={textVariants}
                whileHover={{ color: "#374151", transition: { duration: 0.3 } }}
              >
                {learning.description}
              </motion.p>
            </div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: "100%", opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
