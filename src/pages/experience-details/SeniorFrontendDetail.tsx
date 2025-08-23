import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Database,
  TrendingUp,
  Users,
  Code,
  Eye,
  Target,
  Lightbulb,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

/***
 * V3 Redesign: "Amber & Slate"
 * 1) Unified Color Palette: Adopts a strict #FABC00 (Amber), Black, White, and Gray color scheme.
 * 2) Semantic Hierarchy: Restructures headings to match the specified H1/H2 levels for clarity.
 * 3) Focused Visuals: Uses the amber accent color to highlight key information and actions.
 * 4) Refined Gradients: Incorporates subtle amber-to-yellow gradients for visual appeal.
 ***/

// Type definitions remain the same
export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export type FlowItem = { icon: IconType; label: string };

// Framer Motion Variants for cleaner animation logic
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


/***
 * Atoms (Refined for the new color palette)
 ***/

// SectionTitle now renders H1
function SectionTitle({
  icon: Icon,
  title,
}: {
  icon?: IconType;
  title: string;
}) {
  return (
    <div className="relative flex items-center gap-4">
      {Icon && (
        <span className="relative z-10 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-yellow-200 ring-2 ring-white">
          <Icon className="h-6 w-6 text-amber-700" aria-hidden="true" />
        </span>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
    </div>
  );
}

// TagPill using the new color scheme
function TagPill({ label, tone = "slate" }: { label: string; tone?: "amber" | "slate" }) {
  const map: Record<string, string> = {
    slate: "bg-slate-100 text-slate-800 ring-1 ring-inset ring-slate-200",
    amber: "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${map[tone]}`}>{label}</span>
  );
}

// InfoCard adapted for the new palette
function InfoCard({
  tag,
  tone,
  children,
}: {
  tag: string;
  tone: "amber" | "slate";
  children: React.ReactNode;
}) {
  const toneMap: Record<string, string> = {
    amber: "border-amber-200/80 hover:border-amber-300",
    slate: "border-slate-200/80 hover:border-slate-300",
  };
  
  return (
    <motion.div
      variants={itemVariants}
      className={`flex items-start gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg ${toneMap[tone]}`}
    >
      <TagPill label={tag} tone={tone} />
      <div className="text-sm leading-relaxed text-slate-700">{children}</div>
    </motion.div>
  );
}


/***
 * Stepper (Redesigned with the amber theme)
 **/
function FlowStepper({ items, className = "" }: { items: FlowItem[]; className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative grid grid-cols-1 items-start gap-y-8 md:grid-cols-4 md:gap-x-8">
        {/* Dashed line for desktop */}
        <div className="absolute left-0 top-7 hidden w-full border-t-2 border-dashed border-slate-200 md:block" />
        
        {items.map((it, idx) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={idx}
              className="relative z-10 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              whileHover={{ y: -4 }}
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-slate-50 to-slate-100 ring-1 ring-slate-200/80 shadow-sm">
                <Icon className="h-7 w-7 text-amber-600" aria-hidden="true" />
              </div>
              <span className="max-w-[12rem] text-sm font-medium leading-snug text-slate-800">{it.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


/***
 * Empathy Map (Reimagined with the amber theme)
 ***/
function EmpathyMap() {
  const quadrants = [
    { title: "Says", items: ["\"Validating results takes too much time.\"", "\"Switching across sources is frustrating.\""], position: "top-0 left-0" },
    { title: "Thinks", items: ["There should be a faster way to evaluate performance."], position: "top-0 right-0" },
    { title: "Does", items: ["Manually check outputs against references.", "Juggle multiple tools/files to verify."], position: "bottom-0 left-0" },
    { title: "Feels", items: ["Frustrated by inefficiency.", "Overwhelmed by context-switching."], position: "bottom-0 right-0" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 shadow-inner">
      <h4 className="mb-6 text-center text-xl font-bold text-slate-800">Empathy Map</h4>
      <div className="relative mx-auto h-80 w-80 md:h-96 md:w-96">
        <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <BrainCircuit className="h-12 w-12 text-amber-500" />
        </div>
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-200"></div>
        <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-slate-200"></div>
        
        {quadrants.map((q, i) => (
          <motion.div
            key={q.title}
            className={`absolute ${q.position} flex h-[45%] w-[45%] flex-col items-center justify-center p-2 text-center`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 * i }}
          >
            <h5 className="mb-2 font-semibold text-slate-700">{q.title}</h5>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {q.items.map((item, k) => <li key={k}>"{item}"</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


/***
 * Main Page Component
 ***/
export default function DataAnalysisInternDetail() {
  const FLOW_ITEMS: FlowItem[] = [
    { icon: Eye, label: "Observing Factory Over-Time" },
    { icon: BarChart3, label: "Data Analysis with Python" },
    { icon: Database, label: "Data Visualization & Reporting" },
    { icon: TrendingUp, label: "Accelerating Root-Cause Decisions" },
  ];
  
  const RolePill = ({ icon: Icon, label }: { icon: IconType; label: string }) => (
    <div className="flex items-center gap-2 rounded-full bg-slate-100 py-1.5 pl-2 pr-3 ring-1 ring-inset ring-slate-200">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );

  return (
    <div className="mx-auto w-full space-y-20 bg-white p-6 font-sans md:p-12">
      {/* What I Did Section */}
      <motion.section 
        className="space-y-12"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <SectionTitle title="What I Did" />
        
        {/* Root Cause Analysis */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-800">
            <Target className="h-6 w-6 text-amber-500" />
            Conducted root cause analyses
          </h2>
          <FlowStepper items={FLOW_ITEMS} />
          <div className="rounded-xl border border-amber-300/70 bg-amber-50/80 p-5">
            <p className="text-base leading-relaxed text-amber-900">
              Collaborated with management to analyze <strong>1,000+ factory videos</strong> alongside production data. Recording and quantifying events helped supervisors quickly spot bottlenecks and prioritize fixes.
              Used <strong>Python (Pandas, Matplotlib)</strong> for data handling and visual checks, producing concise RCA summaries to support decisions.
            </p>
          </div>
        </motion.div>
        
        {/* Streamlit Tool */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-800">
            <Sparkles className="h-6 w-6 text-amber-500" />
            Created a Streamlit-based data visualization tool
          </h2>
          <div className="space-y-4">
            <InfoCard tag="Pain Point" tone="slate">
              Stakeholders were unsure whether a quick proof-of-concept would be technically feasible and supportive of their needs.
            </InfoCard>
            <InfoCard tag="Solution" tone="amber">
              <div>
                <p className="font-semibold text-slate-800">Built a rapid prototype with Streamlit</p>
                <ul className="mt-2 list-inside list-disc space-y-1.5 text-slate-600">
                  <li>Automated regression/summary calculations from uploaded Excel data.</li>
                  <li>Added clear charts to surface trends and anomalies.</li>
                  <li>Designed a simple UI so non-technical users could test ideas quickly.</li>
                </ul>
              </div>
            </InfoCard>
            <InfoCard tag="Outcome" tone="amber">
              <ul className="list-inside list-disc space-y-1.5 text-slate-600">
                <li>Managers quickly grasped indicator issues through a single screen.</li>
                <li>Faster feasibility evaluation; less time to reach a go/no-go.</li>
                <li>Smoother communication between business stakeholders and developers.</li>
              </ul>
            </InfoCard>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-sm font-semibold text-slate-600">My Role:</span>
              <RolePill icon={Code} label="Streamlit Implementation" />
              <RolePill icon={Users} label="UI/UX Design" />
            </div>
          </div>
        </motion.div>

        {/* Internal Tool — Empathy Map */}
        <motion.div variants={itemVariants} className="space-y-6">
           <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-800">
            <Eye className="h-6 w-6 text-amber-500" />
            Built an internal tool to visualize inference results against ground truth
          </h2>
          <EmpathyMap />
          <div className="mt-5 space-y-4">
              <InfoCard tag="Solution" tone="amber">
                <ul className="list-inside list-disc space-y-1.5">
                  <li>Unified view to compare model outputs with references.</li>
                  <li>Purposeful visualizations for quick, side-by-side checks.</li>
                  <li>Context panels to reduce tool-switching and rework.</li>
                </ul>
              </InfoCard>
              <InfoCard tag="Outcome" tone="amber">
                <ul className="list-inside list-disc space-y-1.5">
                  <li>Cut manual validation time and highlighted gaps faster.</li>
                  <li>Improved clarity across technical and non-technical partners.</li>
                  <li>Adopted by the data team as part of routine validation.</li>
                </ul>
              </InfoCard>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="text-sm font-semibold text-slate-600">My Role:</span>
                <RolePill icon={Users} label="Primary Developer & Designer" />
                <RolePill icon={Target} label="User Research & Validation" />
              </div>
            </div>
        </motion.div>

        {/* LLM Agent Prototype */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-800">
            <BrainCircuit className="h-6 w-6 text-amber-500" />
            LLM Agent Prototype for Automated Data Analysis
          </h2>
          <div className="space-y-4">
            <InfoCard tag="Objective" tone="slate">
              Test whether a retrieval-based prototype using LLMs could automate repetitive steps for IE analysis.
            </InfoCard>
            <InfoCard tag="Approach" tone="amber">
              <ul className="list-inside list-disc space-y-1.5">
                <li>Built an end-to-end workflow MVP covering collection → preprocessing → report drafting.</li>
                <li>Applied prompt techniques to ensure outputs were structured and useful.</li>
              </ul>
            </InfoCard>
            <InfoCard tag="Result" tone="amber">
              <ul className="list-inside list-disc space-y-1.5">
                <li>Functional MVP generating preliminary analysis notes automatically.</li>
                <li>Reviewed internally and presented to clients as an early PoC.</li>
              </ul>
            </InfoCard>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-sm font-semibold text-slate-600">My Role:</span>
              <RolePill icon={Code} label="LLM Workflow Design" />
              <RolePill icon={Database} label="Data Preprocessing" />
              <RolePill icon={TrendingUp} label="Prompt Engineering" />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Learnings Section */}
      <motion.section 
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <SectionTitle icon={Lightbulb} title="What I Learn" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "1",
              description: "Translate ambiguous business needs into clear technical requirements.",
              icon: Users,
            },
            {
              title: "2",
              description: "Strengthened hands-on skills in Python and LLM workflow design.",
              icon: Code,
            },
            {
              title: "3",
              description: "Collaborated cross-functionally, balancing feasibility and impact via rapid prototyping.",
              icon: Sparkles,
            },
          ].map((learning) => (
            <motion.div
              key={learning.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-lg"
            >
              <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-amber-50 opacity-0 transition-all duration-500 group-hover:scale-[10] group-hover:opacity-100" />
              <div className="relative z-10">
                <h2 className="mb-3 text-2xl font-bold text-amber-500">{learning.title}</h2>
                <learning.icon className="mb-4 h-7 w-7 text-slate-500 transition-colors group-hover:text-amber-600" />
                <p className="text-base font-medium leading-relaxed text-slate-700">{learning.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
