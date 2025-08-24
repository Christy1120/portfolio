import React from "react";
import { motion } from "framer-motion";
import { Code, Users } from "lucide-react";

/**
 * Drop-in vertical timeline that reuses your InfoCard content patterns.
 * - <Timeline> draws the vertical rail
 * - <TimelineItem> renders a labeled card connected to the rail with a dot
 * - tone: "amber" | "slate" controls the dot, rail glow, and tag colors
 */

const toneStyles = {
  amber: {
    dot: "bg-amber-500 ring-4 ring-amber-100",
    railGlow: "from-amber-200/60",
    tag: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
  },
  slate: {
    dot: "bg-slate-500 ring-4 ring-slate-100",
    railGlow: "from-slate-200/60",
    tag: "bg-slate-100 text-slate-700",
    border: "border-slate-200",
  },
} as const;

type Tone = keyof typeof toneStyles;

type TimelineProps = {
  children: React.ReactNode;
  className?: string;
};

export function Timeline({ children, className = "" }: TimelineProps) {
  return (
    <div className={`relative pl-10 md:pl-12 ${className}`}>
      {/* rail */}
      <div className="absolute left-4 md:left-5 top-0 bottom-0 w-px bg-slate-200" />
      {children}
    </div>
  );
}

type TimelineItemProps = {
  tag: string;
  tone?: Tone;
  children: React.ReactNode;
};

export function TimelineItem({ tag, tone = "slate", children }: TimelineItemProps) {
  const t = toneStyles[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="relative pb-6"
    >
      {/* connector glow (subtle) */}
      <div className={`pointer-events-none absolute left-4 md:left-5 -translate-x-1/2 top-3 h-10 w-10 rounded-full bg-gradient-to-br ${t.railGlow} blur-md`} />
      {/* dot */}
      <div className={`absolute left-4 md:left-5 top-3 -translate-x-1/2 w-3.5 h-3.5 rounded-full ${t.dot}`} />

      {/* card */}
      <div className={`ml-4 md:ml-6 rounded-xl border ${t.border} bg-white p-4 shadow-sm transition hover:shadow-lg`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${t.tag}`}>{tag}</span>
        </div>
        <div className="text-sm leading-relaxed text-slate-700">{children}</div>
      </div>
    </motion.div>
  );
}

/* =====================
 * Example usage inside your section
 * Replace your three InfoCards by Timeline + TimelineItem
 * ===================== */
export default function StreamlitCaseTimeline() {
  return (
    <section className="space-y-6">
      <h2 className="h2 flex items-center gap-3 text-slate-900">
        <span className="h2-stripe">Created a Streamlit-based data visualization tool</span>
      </h2>

      <Timeline>
        <TimelineItem tag="Pain Point" tone="slate">
          Stakeholders were unsure whether a quick proof-of-concept would be feasible and helpful.
        </TimelineItem>

        <TimelineItem tag="Solution" tone="amber">
          <div>
            <p className="font-semibold text-slate-800">Built a rapid prototype with Streamlit</p>
            <ul className="mt-2 list-inside list-disc space-y-1.5 text-slate-600">
              <li>Automated regression/summary calculations from uploaded Excel data.</li>
              <li>Clear charts to surface trends and anomalies.</li>
              <li>Simple UI for non-technical users to test quickly.</li>
            </ul>
          </div>
        </TimelineItem>

        <TimelineItem tag="Outcome" tone="amber">
          <ul className="list-inside list-disc space-y-1.5 text-slate-600">
            <li>Managers quickly grasped indicator issues via a single screen.</li>
            <li>Faster go/no-go feasibility evaluation.</li>
            <li>Clearer comms between business and devs.</li>
          </ul>
        </TimelineItem>

        {/* Optional: role pills as a footnote item */}
        <TimelineItem tag="My Role" tone="slate">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-slate-600">I led:</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1"><Code className="w-3.5 h-3.5"/> Streamlit Implementation</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1"><Users className="w-3.5 h-3.5"/> UI/UX Design</span>
          </div>
        </TimelineItem>
      </Timeline>
    </section>
  );
}
