import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function NotFoundView() {
  return (
    <main className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
          <ExternalLink className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">找不到此作品</h1>
        <p className="text-gray-600 mb-8">抱歉，您要查看的作品不存在或已被移除。</p>
        <Link to="/" className="pd-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium pd-interactive">
          <ArrowLeft className="w-4 h-4" />
          返回首頁
        </Link>
      </div>
    </main>
  );
}
