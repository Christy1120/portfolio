import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2 } from "lucide-react";

export default function EnhancedNavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 使用 navigate 而非 Link，確保清除所有路由狀態
  const handleBackToHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50"
        : "bg-white/90 backdrop-blur-sm border-b border-gray-200/30"
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={handleBackToHome}
            className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-200 group pd-interactive"
          >
            <div className="p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="font-medium">返回作品集</span>
          </button>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors pd-interactive">Case List</a>
              <a href="#" className="hover:text-blue-600 transition-colors pd-interactive">Blog</a>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all pd-interactive">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all pd-interactive">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}