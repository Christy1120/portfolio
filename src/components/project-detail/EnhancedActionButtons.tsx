import React from "react";
import { ExternalLink, Heart } from "lucide-react";

export default function EnhancedActionButtons({ href }: { href?: string }) {
  return (
    <div className="flex flex-wrap gap-4 pd-fade-in-delay-2">
      {href && (
        <a href={href} target="_blank" rel="noopener noreferrer" className="pd-btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-base pd-interactive">
          <span>查看線上版本</span>
          <ExternalLink className="w-5 h-5" />
        </a>
      )}
      <button className="pd-btn-secondary inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-base pd-interactive">
        <Heart className="w-5 h-5" />
        <span>收藏專案</span>
      </button>
    </div>
  );
}
