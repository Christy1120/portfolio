// src/data/showcaseData.ts

// Lottie 動畫檔案引入
import Web_Design from '../assets/lottie/Web Design.json'; 
import Data_Analysis from '../assets/lottie/Data Analysis.json';
import AI_Agent from '../assets/lottie/AI Agent.json';

// 定義資料型別
export interface ShowcaseItem {
  id: string;
  title: string;
  role: string;
  company: string;
  desc: string;
  scope: string[];
  slug: string; // 👈 這裡從 link 改為 slug，作為唯一路由識別碼
  lottieData?: any; 
  displayArea: 'spotlight' | 'grid' | 'both';
  image?:any;
  tag?:string[];
}

export const SHOWCASE_DATA: ShowcaseItem[] = [
  /*{
    id: 'NSTC_Metaverse',
    title: 'Metaverse in Art Market ',
    role: 'Project Execution', // 對應：專案助理
    company: 'My Role : Lead Researcher', 
    desc: 'Analyzing metaverse adoption and strategies in the arts industry.', // 對應：推動大型專案執行，涵蓋需求釐清與跨部門協調
    scope: ['Web Planning', 'UI/UX Design', 'Web Dev'],
    slug: 'NSTC_Metaverse', // 👈 對應路由：/project/Web3toon
    lottieData: Web_Design,
    displayArea: 'grid',
    image: '/NSTC_Metaverse.png',
    tag:['Metaverse','NFT'],
  },*/
  {
    id: 'RosePestAI',
    title: 'AI for Agriculture ',
    role: 'Project Execution', // 對應：專案助理
    company: 'My Role : Lead Researcher', 
    desc: 'AI-driven early detection of rose leaf pest damage.', // 對應：推動大型專案執行，涵蓋需求釐清與跨部門協調
    scope: ['Web Planning', 'UI/UX Design', 'Web Dev'],
    slug: 'RosePestAI', 
    lottieData: Web_Design,
    displayArea: 'grid',
    image: '/RosePestAI.png',
    tag:['AI Visual', 'CNN'],
  },
  {
    id: 'Web3toon',
    title: 'Web3toon ',
    role: 'Project Execution', // 對應：專案助理
    company: 'My Role : Product Owner', 
    desc: 'Empowering Taiwanese Comic Artists Through Blockchain Technology', // 對應：推動大型專案執行，涵蓋需求釐清與跨部門協調
    scope: ['Web Planning', 'UI/UX Design', 'Web Dev'],
    slug: 'Web3toon', 
    lottieData: Web_Design,
    displayArea: 'grid',
    image: '/comic.png',
    tag:['Blockchain','Stable Coin'],
  },
  {
    id: 'pm',
    title: 'UI/UX Revamp ',
    role: 'Project Execution', // 對應：專案助理
    company: 'Applus 艾普拉斯數位顧問', 
    desc: 'Orchestrated an enterprise-scale UI/UX redesign, bridging complex departmental gaps through prototype-driven alignment. By implementing risk tracking and team shielding strategies,  ensured 100% on-time delivery of all mission-critical design phases.', // 對應：推動大型專案執行，涵蓋需求釐清與跨部門協調
    scope: ['Web Planning', 'UI/UX Design', 'Web Dev'],
    slug: 'UI_UX_Revamp', // 👈 對應路由：/project/UI/UX_Revamp
    lottieData: Web_Design,
    displayArea: 'spotlight'
  },
  {
    id: 'data',
    title: 'AI Model Validation Dashboard ',
    role: 'Primary Developer', // 對應：資料分析實習生
    company: 'PowerArena 百威雷科技', 
    desc: 'Engineered a centralized React/Flask dashboard to streamline AI model validation. By mapping critical user pain points and implementing Scrum-based prototyping,  eliminated manual cross-referencing, accelerating technical insights and enhancing cross-departmental transparency for data teams.', // 對應：分析逾萬筆數據並撰寫 RCA 報告
    scope: ['Problem Framing/Architecture Design','UI/UX design','Web App Develop'], 
    slug: 'Data_Analysis', // 👈 對應路由：/project/Data_Analysis
    lottieData: Data_Analysis ,
    displayArea: 'spotlight'
  },
  {
    id: 'ai',
    title: 'Data Analysis AI Agent',
    role: 'Primary Developer', // 對應：主導 AI Agent MVP 開發
    company: 'PowerArena 百威雷科技', 
    desc: 'Spearheaded an industrial AI Agent MVP, optimizing LLM precision through program-assisted calculation and domain benchmarking. By ensuring data security and automating reporting, we validated technical feasibility and successfully drove high-level commercial PoC discussions.', // 對應：導入 Dify 打造自動化工作流，驗證 LLM 商業可行性
    scope: [ 'LLM ', 'Workflow Automation', 'PoC'],
    slug: 'Ai_Agent', // 👈 對應路由：/project/Ai_Aent
    lottieData: AI_Agent ,
    displayArea: 'spotlight'
  }
];