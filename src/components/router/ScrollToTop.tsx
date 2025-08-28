// src/components/router/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** 換路由就回到頂；有 hash 時讓瀏覽器自己處理錨點 */
export default function ScrollToTop({ skip = false }: { skip?: boolean }) {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (skip) return;
    if (hash) return;
    // 等一幀避免進出場動畫/排版抖動
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, [pathname, search, hash, skip]);

  return null;
}
