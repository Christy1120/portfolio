import React, { useState } from "react";
import { Eye, Heart } from "lucide-react";
import type { Project } from "../../hooks/useProjectDetail";

type Props = { project: Project; hero?: string | null };

export default function EnhancedHeroSection({ project, hero }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const heroSrc = hero || (Array.isArray(project.images) ? project.images[0] : null) || "";

  return (
    <div className="relative mb-16 group pd-fade-in">
      {/* 外圈光暈：用品牌漸層 token */}
      <div className="absolute -inset-4 pd-hero-glow rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

      <div className="relative">
        <div className="pd-glass-card rounded-2xl overflow-hidden pd-lift-hover">
          {heroSrc ? (
            <div className="pd-image-container">
              <img
                src={heroSrc}
                alt={project.title}
                className={`w-full h-96 object-cover transition-all duration-700 ${
                  imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {/* 上覆蓋用 token */}
              <div className="absolute inset-0 pd-hero-overlay"></div>

              {/* 浮動統計卡片 */}
              <div className="absolute bottom-6 right-6 pd-glass-card-vibrant rounded-xl p-4 text-white">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>2.1k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>128</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-96 grid place-items-center text-gray-400 bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
                <p>無預覽圖片</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
