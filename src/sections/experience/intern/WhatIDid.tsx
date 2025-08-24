import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Database, TrendingUp, Eye } from "lucide-react";
import {
  SectionTitle,
  InfoCard,
  RolePill,
  FlowStepper,
  EmpathyMap,
  sectionVariants,
  itemVariants,
} from "@/components/ui";
import type { FlowItem } from "@/components/ui";
import RoleCard from "@/components/RoleCard";

// ===== 新的編號標題元件 =====
type SectionTitleNumberedProps = { title: string; number: string };

function SectionTitleNumbered({ title, number }: SectionTitleNumberedProps) {
  return (
    <div className="flex items-baseline mb-6">
      {/* 左側大編號 */}
      <span className="text-4xl font-bold text-gray-300 mr-4">{number}</span>
      {/* 中間標題 */}
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      {/* 右側虛線延伸 */}
      <div className="flex-1 ml-4 border-t border-dashed border-gray-300 mt-3"></div>
    </div>
  );
}

export default function WhatIDid() {
  const FLOW_ITEMS: FlowItem[] = [
    { icon: Eye, label: "Observing factory video data" },
    { icon: BarChart3, label: "Data Analysis with Python" },
    { icon: Database, label: "Data Visualization & Reporting" },
    { icon: TrendingUp, label: "Driving Faster Root Cause Insights" },
  ];

  return (
    <motion.section
      className="space-y-12"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <SectionTitle title="What I Did" />

      {/* 01 Root Cause Analysis */}
      <motion.div variants={itemVariants} className="space-y-6">
        <SectionTitleNumbered
          number="01"
          title="Conducted root cause analyses"
        />
        <FlowStepper items={FLOW_ITEMS} />
        <div className="rounded-xl ">
          <p className="text-base leading-relaxed">
            During my internship, I conducted root cause analyses on more than
            <strong> 1,000 factory videos</strong> combined with production
            data. By recording and analyzing <strong>key metrics</strong>, I
            helped supervisors gain{" "}
            <strong>faster insight into production bottlenecks</strong> and line
            performance.
          </p>

          <p className="text-base leading-relaxed mt-4">
            To handle <strong>large-scale datasets</strong>, I frequently used
            <strong> Python (pandas)</strong> for analysis and
            <strong> Matplotlib</strong> for visualization. I produced root
            cause analysis reports that supported decision-making and{" "}
            <strong>sped up issue resolution</strong>.
          </p>
        </div>
      </motion.div>

      {/* 02 Streamlit Tool */}
      <motion.div variants={itemVariants} className="space-y-6">
        <SectionTitleNumbered
          number="02"
          title="Created a Streamlit-based data visualization tool"
        />
        <div className="space-y-4">
          <InfoCard tag="Pain Point" tone="slate">
            Stakeholders were unsure whether a quick proof-of-concept would be
            feasible and helpful.
          </InfoCard>
          <InfoCard tag="Solution" tone="amber">
            <div>
              <p className="font-semibold text-slate-800">
                Built a rapid prototype with Streamlit
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1.5 text-slate-600">
                <li>
                  Automated regression/summary calculations from uploaded Excel
                  data.
                </li>
                <li>Clear charts to surface trends and anomalies.</li>
                <li>Simple UI for non-technical users to test quickly.</li>
              </ul>
            </div>
          </InfoCard>
          <InfoCard tag="Outcome" tone="amber">
            <ul className="list-inside list-disc space-y-1.5 text-slate-600">
              <li>Managers quickly grasped indicator issues via a single screen.</li>
              <li>Faster go/no-go feasibility evaluation.</li>
              <li>Clearer comms between business and devs.</li>
            </ul>
          </InfoCard>

          <RoleCard imageSrc="/gril_point.png" label="My Role">
            <p>– Implemented the core features with Streamlit.</p>
            <p>
              – Designed and built the UI to ensure usability for non-technical
              users.
            </p>
          </RoleCard>
        </div>
      </motion.div>

      {/* 03 Internal Tool */}
      <motion.div variants={itemVariants} className="space-y-6">
        <SectionTitleNumbered
          number="03"
          title="Built an internal tool to visualize inference results against ground truth"
        />
        <EmpathyMap size="md" />
        <div className="mt-5 space-y-4">
          <InfoCard tag="Solution" tone="amber">
            <ul className="list-inside list-disc space-y-1.5">
              <li>Unified view for side-by-side comparison.</li>
              <li>Purposeful visualizations for quick checks.</li>
              <li>Context panels to reduce tool-switching.</li>
            </ul>
          </InfoCard>
          <InfoCard tag="Outcome" tone="amber">
            <ul className="list-inside list-disc space-y-1.5">
              <li>Cut manual validation time; surfaced gaps quicker.</li>
              <li>Improved clarity for technical and non-technical partners.</li>
              <li>Adopted by the data team for routine validation.</li>
            </ul>
          </InfoCard>
          <RoleCard imageSrc="/girl_read.png" label="My Role">
            <p>
              – Served as the primary developer and lead UI designer for the
              visualization tool.
            </p>
            <p>
              – Created prototypes to validate ideas and incorporated feedback
              into iterative improvements.
            </p>
          </RoleCard>
        </div>
      </motion.div>

      {/* 04 LLM Agent Prototype */}
      <motion.div variants={itemVariants} className="space-y-6">
        <SectionTitleNumbered
          number="04"
          title="LLM Agent Prototype for Automated Data Analysis"
        />
        <div className="space-y-4">
          <InfoCard tag="Objective" tone="slate">
            Test whether a retrieval-based LLM prototype can automate repetitive
            IE analysis steps.
          </InfoCard>
          <InfoCard tag="Approach" tone="amber">
            <ul className="list-inside list-disc space-y-1.5">
              <li>MVP workflow: collection → preprocessing → report drafting.</li>
              <li>Prompt techniques to ensure structured, useful outputs.</li>
            </ul>
          </InfoCard>
          <InfoCard tag="Result" tone="amber">
            <ul className="list-inside list-disc space-y-1.5">
              <li>
                Functional MVP that generates preliminary notes automatically.
              </li>
              <li>Reviewed internally; presented to clients as an early PoC.</li>
            </ul>
          </InfoCard>
          <RoleCard imageSrc="/girl_type.png" label="My Role">
            <p>
              – Served as the primary developer and lead UI designer for the
              visualization tool.
            </p>
            <p>
              – Created prototypes to validate ideas and incorporated feedback
              into iterative improvements.
            </p>
          </RoleCard>
        </div>
      </motion.div>
    </motion.section>
  );
}
