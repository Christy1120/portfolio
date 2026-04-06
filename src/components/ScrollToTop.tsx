// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  // 取得當前的路由路徑
  const { pathname } = useLocation();

  useEffect(() => {
    // 當 pathname 改變時，觸發滾動到最上方
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 使用 'instant' 可以避免畫面切換時看到往上滑的殘影
    });
  }, [pathname]); // 依賴陣列放入 pathname，確保每次網址切換都會執行

  // 這個元件不需要渲染任何 UI，所以回傳 null
  return null;
}