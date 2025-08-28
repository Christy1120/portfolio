export type ProjectSection =
  | { type: "gallery"; items: string[] }
  | { type: "tech"; stack: string[] }
  | { type: "steps"; steps: string[] };

export type ProjectItem = {
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  href?: string;
  preview?: string;
  longDesc?: string;
  sections?: ProjectSection[];
  links?: Record<string, string>;
};

export const PROJECTS: readonly ProjectItem[] = [
  {
    slug: "decentralized-comic-platform",
    title: "去中心化漫畫平台",
    desc: "以區塊鏈驗證內容上架流程與授權，完成前後端原型。",
    tags: ["Solidity", "web3.js", "Nginx"],
    href: "#",
    preview: "DApp Prototype",
    longDesc:
      "以智能合約自動化授權與上架流程，改善創作者收益分配；前後端原型完成並可演示。",
    sections: [
      { type: "gallery", items: ["/Blockchain Comic Adventure.png"] },
      { type: "tech", stack: ["Solidity", "Next.js", "Hardhat"] },
      { type: "steps", steps: ["痛點分析", "合約設計", "前端串接", "測試與部署"] },
    ],
  },
  {
    slug: "manufacturing-dashboard",
    title: "製造資料可視化儀表板",
    desc: "用 Streamlit 打造可互動的資料儀表板，支援即時篩選與瓶頸追蹤。",
    tags: ["Streamlit", "Pandas", "Plotly"],
    href: "#",
    preview: "Demo Image / GIF",
    sections: [
      { type: "gallery", items: ["/img/mfg1.png", "/img/mfg2.png"] },
      { type: "tech", stack: ["Streamlit", "Pandas", "Plotly", "Python"] },
    ],
  },
  {
    slug: "mite-detection-research",
    title: "智慧農業：葉蟎偵測研究",
    desc: "以深度學習影像辨識建立病害偵測流程，提交研究成果。",
    tags: ["TensorFlow", "OpenCV", "研究方法"],
    href: "#",
    preview: "Research Poster",
    sections: [
      { type: "steps", steps: ["資料蒐集", "標註", "模型訓練", "實驗與結果"] },
      { type: "tech", stack: ["TensorFlow", "OpenCV", "Keras"] },
    ],
  },
] as const;
export type Project = ProjectItem;
