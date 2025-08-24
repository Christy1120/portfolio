import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, ArrowRight, Target, Zap, Sparkles, Rocket } from "lucide-react";

// Types
interface FlowItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

// Demo data for FlowItem
const demoItems: FlowItem[] = [
  { icon: Target, label: "Define Goals & Strategy" },
  { icon: Zap, label: "Execute & Implement" },
  { icon: Sparkles, label: "Optimize & Refine" },
  { icon: Rocket, label: "Launch & Scale" }
];

interface FlowStepperProps {
  items?: FlowItem[];
  className?: string;
}

export default function FlowStepper({ 
  items = demoItems, 
  className = ""
}: FlowStepperProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1,
      transition: { 
        delay: 0.5, 
        duration: 1.2, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <div className={`w-full ${className}`} ref={ref}>
      <motion.div 
        className="bg-white relative p-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="relative grid grid-cols-1 items-start gap-y-12 md:grid-cols-4 md:gap-x-6 lg:gap-x-8">
          {/* Animated connection line */}
          <motion.div 
            className="absolute left-0 top-16 hidden w-full h-0.5 bg-slate-200 rounded-full md:block overflow-hidden"
            variants={lineVariants}
            style={{ originX: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-400 to-transparent"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 2
              }}
            />
          </motion.div>

          {items.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={idx}
                className="relative z-10"
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Step container */}
                <motion.div 
                  className="relative flex flex-col items-center text-center p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 group cursor-pointer transition-all duration-300 hover:shadow-lg"
                  whileHover={{ 
                    y: -6,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 25 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Step number badge */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {idx + 1}
                  </motion.div>

                  {/* Icon container */}
                  <motion.div 
                    className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-slate-900 text-white group-hover:shadow-lg transition-all duration-300"
                  >
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Icon className="h-8 w-8" />
                    </motion.div>
                  </motion.div>

                  {/* Label */}
                  <motion.span 
                    className="relative max-w-[14rem] text-sm font-semibold leading-relaxed text-slate-700 group-hover:text-slate-900 transition-colors duration-200"
                    animate={{
                      y: isHovered ? -2 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>

                  {/* Subtle hover indicator */}
                  <motion.div 
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-slate-300 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Arrow connector for mobile */}
                {idx < items.length - 1 && (
                  <motion.div
                    className="flex justify-center mt-4 md:hidden"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                  >
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}