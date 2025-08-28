// src/components/ScrollManager.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    // 若有 #hash，優先捲到對應錨點
    if (location.hash) {
      const id = decodeURIComponent(location.hash.replace("#", ""));
      // 等待下一個 frame，確保目標節點已渲染
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // 沒找到就退回頂部
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      });
      return;
    }

    // 一般換頁：回到頂部
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return null;
}
