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
    title: "NSTC Student Research Project – AI for Agriculture",
    company: "Taipei University of Business – National Science & Technology Council (NSTC) Sponsored Project",
    period: "Jul 2024 – Feb 2025",
    summary:
      "Led a research project applying deep learning to detect spider mite damage on rose leaves, demonstrating how AI can address real agricultural problems. Published the findings as first author at IEEE ICCE 2025, where the work received the Best Presentation Award.",
    tags: ["Problem Definition", "DeepLearning", "ComputerVision"],
  },
  {
    slug: "Metaverse-Researcher",
    title: "NSTC Research Project – Metaverse & Arts Industry",
    company: "Taipei University of Business – National Science & Technology Council (NSTC) Sponsored Project",
    period: "Jul 2022 – Mar 2023  ",
    summary:
      "Served as first author on a government-funded research project exploring how emerging technologies like the metaverse reshape the arts industry. Applied market research frameworks and conducted executive interviews to surface adoption challenges and strategies, with findings published as a poster presentation at ICIM.",
    tags: ["Market Research", "Industry Expert Interview", "Case Study Research", "Business Model Analysis"],
  },
];
