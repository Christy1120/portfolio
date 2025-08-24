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
            const isFinalStep = idx === items.length - 1; // 最後一步是成果

            return (
              <motion.div
                key={idx}
                className="relative z-10"
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Success glow effect for final step */}
                {isFinalStep && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-orange-400/20 rounded-xl blur-xl scale-110"
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1.1, 1.2, 1.1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Step container */}
                <motion.div 
                  className={`relative flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 group cursor-pointer ${
                    isFinalStep 
                      ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 hover:border-yellow-300 hover:shadow-xl hover:shadow-yellow-100/50' 
                      : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg'
                  }`}
                  whileHover={{ 
                    y: isFinalStep ? -8 : -6,
                    scale: isFinalStep ? 1.05 : 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 25 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Success badge for final step */}
                  {isFinalStep && (
                    <motion.div
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                      initial={{ scale: 0, y: -10 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ delay: 1, type: "spring", stiffness: 200 }}
                    >
                      ✨ 成果
                    </motion.div>
                  )}

                  {/* Step number badge */}
                  <motion.div 
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                      isFinalStep 
                        ? 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-yellow-500/30' 
                        : 'bg-slate-900 text-white'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {isFinalStep ? '🚀' : idx + 1}
                  </motion.div>

                  {/* Icon container */}
                  <motion.div 
                    className={`relative mb-4 flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300 ${
                      isFinalStep 
                        ? 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white group-hover:shadow-xl group-hover:shadow-yellow-500/40' 
                        : 'bg-slate-900 text-white group-hover:shadow-lg'
                    }`}
                  >
                    {/* Success pulse effect */}
                    {isFinalStep && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl opacity-75"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.75, 0.4, 0.75]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}

                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="relative z-10"
                    >
                      <Icon className="h-8 w-8" />
                    </motion.div>

                    {/* Success sparkles */}
                    {isFinalStep && isHovered && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                            style={{
                              left: `${20 + i * 20}%`,
                              top: `${15 + i * 15}%`
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              rotate: [0, 180, 360],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </>
                    )}
                  </motion.div>

                  {/* Label */}
                  <motion.span 
                    className={`relative max-w-[14rem] text-sm font-semibold leading-relaxed transition-colors duration-200 ${
                      isFinalStep 
                        ? 'text-yellow-800 group-hover:text-yellow-900' 
                        : 'text-slate-700 group-hover:text-slate-900'
                    }`}
                    animate={{
                      y: isHovered ? -2 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>

                  {/* Hover indicator */}
                  <motion.div 
                    className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 rounded-full ${
                      isFinalStep ? 'bg-yellow-400' : 'bg-slate-300'
                    }`}
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
