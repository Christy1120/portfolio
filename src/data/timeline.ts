// src/data/timeline.ts
export type TimelineItem = {
  slug: string;          // 用來組路由
  title: string;
  company?: string;
  period: string;
  summary: string;
  tags: string[];
  href?: string;         // 若想直接外連，可填這個（會覆蓋內頁連結）
};

export const TIMELINE: ReadonlyArray<TimelineItem> = [
  {
    slug: "Data-Analysis",
    title: "Data Analysis Intern",
    company: "PowerArena",
    period: "Jul 2024 – Jul 2025",
    summary:
      "Conducted data analysis, visualization, and LLM-driven prototyping to improve  workflows and support cross-functional decision-making.",
    tags: ["Data Analysis", "Python (pandas, Streamlit)", "AI Agent Prototyping", "Cross-functional Collaboration"],
  },
  
  {
    slug: " Student-Research",
    title: "NSTC Student Research Project",
    company: "Taipei University of Business – National Science & Technology Council (NSTC) Sponsored Project",
    period: "Jul 2024 – Feb 2025",
    summary:
      "Defined the project objective as using deep learning techniques to detect spider mite damage on rose leaves, with the goal of showing how modern AI can help solve real problems in agriculture.",
    tags: ["Problem Definition", "DeepLearning", "ComputerVision"],
  },
  {
    slug: "Metaverse-Researcher",
    title: "NSTC Project Researcher",
    company: "Taipei University of Business – National Science & Technology Council (NSTC) Sponsored Project",
    period: "Jul 2022 – Mar 2023  ",
    summary:
      "Led a government-funded research project exploring how emerging technologies like the metaverse reshape the arts industry, using market research frameworks and executive interviews to surface adoption challenges and strategies, with findings published at ICIM.",
    tags: ["Market Research", "Industry Expert Interview", "Case Study Research", "Business Model Analysis"],
  },
];
