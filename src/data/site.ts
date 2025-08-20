export const SITE = {
  logoText: "K.T. · Product Minded",
  name: "KAI TING",
  email: "your.email@example.com",
  resumeUrl: "#", // 放你的履歷連結（PDF 或 Drive）
  links: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
  },
} as const

export const EXPERIENCES = [
  {
    title: "研究助理（智慧農業 × 視覺辨識）",
    company: "國家科學及技術委員會 專題研究計畫",
    period: "2024–2025",
    points: [
      "建立深度學習影像辨識流程，驗證應用於玫瑰葉蟎防治場景。",
      "以實驗數據與田間觀察迭代模型設定，撰寫研究報告與簡報。",
      "以里程碑切分研究進度，追蹤風險與依賴項，確保如期交付。"
    ],
    stack: ["Python","TensorFlow","OpenCV","實驗設計"]
  },
  {
    title: "資料分析實習生",
    company: "百威雷科技（Digi+ 跨域數位人才加速躍升實習）",
    period: "2024",
    points: [
      "用 Streamlit + Pandas + Plotly 製作資料分析 Web App（MVP）。",
      "協助製造產線瓶頸根因分析，縮短分析時間、提升報表可用性。",
      "整理需求並與跨部門協作，將工具落地到實際追蹤流程。"
    ],
    stack: ["Python","Pandas","Plotly","Streamlit","PostgreSQL"]
  },
  {
    title: "畢業專題組長：去中心化漫畫平台",
    company: "以區塊鏈技術驗證內容授權與上架流程",
    period: "2023–2024",
    points: [
      "規劃產品功能與技術選型，拆解任務、控管時程與風險。",
      "完成原型 Demo，並與指導老師進行評審與改版迭代。"
    ],
    stack: ["Solidity","web3.js","Nginx"]
  }
] as const

export const SKILL_GROUPS = [
  {
    title: "產品管理",
    subtitle: "以用戶價值與商業結果為核心",
    items: ["需求探索","用戶訪談","PRD 撰寫","Roadmap 規劃","MVP 定義","A/B 設計","KPI 設定"]
  },
  {
    title: "數據分析",
    subtitle: "讓決策可被驗證、可度量",
    items: ["Python","SQL","Tableau","Pandas","Plotly","Streamlit","ETL 流程","資料視覺化"]
  },
  {
    title: "技術理解",
    subtitle: "與工程設計協作更順暢",
    items: ["JavaScript/TypeScript","React","PostgreSQL","Nginx","Solidity","web3.js","Git/GitHub"]
  },
] as const

export const PROJECTS = [
  {
    title: "製造資料可視化儀表板（MVP）",
    desc: "用 Streamlit 打造可互動的資料儀表板，支援即時篩選與瓶頸追蹤。",
    tags: ["Streamlit","Pandas","Plotly"],
    href: "#",
    preview: "Demo Image / GIF"
  },
  {
    title: "去中心化漫畫平台",
    desc: "以區塊鏈驗證內容上架流程與授權，完成前後端原型。",
    tags: ["Solidity","web3.js","Nginx"],
    href: "#",
    preview: "DApp Prototype"
  },
  {
    title: "智慧農業：葉蟎偵測研究",
    desc: "以深度學習影像辨識建立病害偵測流程，提交研究成果。",
    tags: ["TensorFlow","OpenCV","研究方法"],
    href: "#",
    preview: "Research Poster"
  },
] as const
export const TIMELINE = [
  {
    period: "2024 – Present",
    title: "智慧製造資料分析實習生",
    company: "百威雷科技 · DIGI+ 跨域數位人才加速躍升計畫",
    summary:
      "開發 ETL 數據處理流程，結合 LLM 技術實作自動化分析報表生成；負責跨部門需求整合與產品功能設計，展現產品經理必備的技術理解能力與策略思維。",
    tags: ["ETL Pipeline", "LLM Integration", "Dashboard Design", "需求分析"],
  },
  {
    period: "2024",
    title: "國科會專題研究計畫主持人",
    company: "臺北商業大學 · 深度學習視覺辨識技術應用",
    summary:
      "領導跨領域研究團隊，負責專案規劃與執行管理；深入研究商業模式與技術應用場景，展現產品經理所需的市場研究能力、策略思維與團隊領導力。",
    tags: ["專案管理", "市場研究", "團隊領導", "商業分析"],
  },
  {
    period: "2023 – 2024",
    title: "畢業專題組長：去中心化漫畫平台",
    company: "以區塊鏈驗證內容授權與上架流程",
    summary:
      "規劃產品功能與技術選型，拆解任務、控管時程與風險；完成可操作的原型 Demo 並迭代改版。",
    tags: ["Solidity", "web3.js", "Nginx", "產品規劃"],
  },
] as const;
