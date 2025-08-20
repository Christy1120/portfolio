import { motion } from "framer-motion";


export default function BackgroundFX() {
return (
<div className="pointer-events-none absolute inset-0 -z-10">
{/* 基礎漸層背景 */}
<motion.div
className="absolute inset-0 opacity-60"
style={{
background:
"linear-gradient(135deg, rgba(251,191,36,0.08), rgba(14,165,233,0.12), rgba(139,92,246,0.08), rgba(16,185,129,0.10))",
backgroundSize: "400% 400%",
}}
animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
/>


{/* 角落裝飾光暈 */}
<motion.div
className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl opacity-40"
style={{
background:
"radial-gradient(circle, rgba(251,191,36,0.4), rgba(14,165,233,0.2), transparent)",
}}
animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
/>
<motion.div
className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-40"
style={{
background:
"radial-gradient(circle, rgba(139,92,246,0.4), rgba(16,185,129,0.2), transparent)",
}}
animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
/>


{/* 浮動粒子效果 */}
{[...Array(6)].map((_, i) => (
<motion.div
key={i}
className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm"
style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.2, 0.8, 0.2] }}
transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
/>
))}
</div>
);
}