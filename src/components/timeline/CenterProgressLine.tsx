// ===============================
// File: src/components/timeline/CenterProgressLine.tsx
// ===============================
import { MotionValue, motion } from "framer-motion";


export function CenterProgressLine({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
return (
<>
{/* 中線底色 */}
<div className="absolute left-1/2 top-0 bottom-0 -ml-px w-px bg-slate-300 hidden md:block" />


{/* 中線進度條（跟隨滾動填滿） */}
<motion.div
style={{ scaleY: scrollYProgress }}
className="origin-top absolute left-1/2 top-0 -ml-[2px] w-[3px] hidden md:block rounded-full"
initial={{ background: "linear-gradient(to bottom, #f59e0b, #0ea5e9)" }}
animate={{
background: [
"linear-gradient(to bottom, #f59e0b, #0ea5e9)",
"linear-gradient(to bottom, #0ea5e9, #8b5cf6)",
"linear-gradient(to bottom, #8b5cf6, #10b981)",
"linear-gradient(to bottom, #10b981, #f59e0b)",
],
}}
transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
/>
</>
);
}