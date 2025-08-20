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
    slug: "senior-frontend",
    title: "高級前端工程師",
    company: "科技公司 A",
    period: "2023 - 現在",
    summary:
      "負責前端架構設計與開發，使用 React、TypeScript 建構大型應用程式，優化用戶體驗與性能。",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    slug: "fullstack-engineer",
    title: "全端工程師",
    company: "新創公司 B",
    period: "2021 - 2023",
    summary:
      "從零開始建構完整的 Web 應用程式，包含前後端開發、資料庫設計與 API 開發。",
    tags: ["Vue.js", "Node.js", "MongoDB", "Express"],
  },
  {
    slug: "frontend-engineer",
    title: "前端工程師",
    company: "數位代理商 C",
    period: "2019 - 2021",
    summary:
      "開發響應式網站與互動式 UI，與設計師密切合作打造優質的用戶介面。",
    tags: ["JavaScript", "SCSS", "Webpack", "jQuery"],
  },
  {
    slug: "frontend-intern",
    title: "實習前端工程師",
    company: "軟體公司 D",
    period: "2018 - 2019",
    summary:
      "學習前端開發基礎，參與團隊專案開發，熟悉版本控制與團隊協作流程。",
    tags: ["HTML", "CSS", "Git", "Bootstrap"],
  },
];
