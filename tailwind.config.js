/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 科技感背景色
        tech: {
          bg: '#050A10',       // 極深藍黑 (主背景)
          card: '#0A111A',     // 卡片背景
          border: '#1E293B',   // 邊框顏色
        },
        // 你的主打品牌色 (AI / Web3 的螢光感)
        brand: {
          emerald: '#10b981',  // 科技綠
          cyan: '#06b6d4',     // 數據青
          purple: '#8b5cf6',   // AI 紫
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        heading: ['Inter', 'Noto Sans TC', 'sans-serif'], // 👈 補上這一行！
      }
    },
  },
  plugins: [],
}