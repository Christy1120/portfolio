import React, { useMemo, useState } from "react";
import { Eye, Heart, ImageOff } from "lucide-react";
import type { Project } from "../../features/project/hooks/useProjectDetail";

/**
 * EnhancedHeroSection
 * - No fixed height. Space is reserved using an aspect-ratio box (padding-top trick), so layout is stable with zero extra whitespace.
 * - Choose aspect via `ratio` prop (e.g., 16/9, 4/3, 1/1). Default 16/9.
 * - Smooth image reveal; graceful fallback when no image.
 * - Works with or without your custom `pd-*` tokens.
 */

type Props = {
  project: Project;
  hero?: string | null;
  /** width / height. e.g., 16/9 = 1.777... */
  ratio?: number; // default 16/9
  /** optional alt text override */
  alt?: string;
};

export default function EnhancedHeroSection({ project, hero, ratio = 16 / 9, alt }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const heroSrc = useMemo(() => {
    if (hero) return hero;
    if (Array.isArray(project.images) && project.images.length > 0) return project.images[0] as string;
    return "";
  }, [hero, project]);

  // Guard against invalid ratio
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 16 / 9;
  const padTopPercent = `${(1 / safeRatio) * 100}%`; // padding-top = (height/width)*100%

  return (
    <section className="relative mb-4 group pd-fade-in">
      {/* Outer halo (optional token classes) */}
      <div className="absolute -inset-4 pd-hero-glow rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl bg-white/5 pd-glass-card pd-lift-hover">
          {/* Aspect-ratio box: reserves height without fixed h-96 */}
          <div style={{ paddingTop: padTopPercent }} />

          {/* Real media layer */}
          {heroSrc ? (
            <>
              {/* Image */}
              <img
                src={heroSrc}
                alt={alt || project.title}
                onLoad={() => setImageLoaded(true)}
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 will-change-transform
                  ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"}`}
                loading="lazy"
              />

              {/* Shimmer skeleton while loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200" />
              )}

              {/* Optional overlay (token) */}
              <div className="absolute inset-0 pd-hero-overlay pointer-events-none" />

              {/* Floating stats card */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 pd-glass-card-vibrant rounded-xl px-3 py-2 md:px-4 md:py-3 text-white shadow-lg/40">
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    <span>2.1k</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4" />
                    <span>128</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Graceful fallback with same aspect box
            <div className="absolute inset-0 grid place-items-center bg-slate-50">
              <div className="text-center text-slate-500">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
                  <ImageOff className="h-8 w-8" />
                </div>
                <p className="text-sm">無預覽圖片</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * 使用方式：
 * <EnhancedHeroSection project={project} ratio={16/9} />
 * <EnhancedHeroSection project={project} hero={customUrl} ratio={4/3} />
 * <EnhancedHeroSection project={project} ratio={1} alt="Square cover" />
 *
 * - 你可依不同 breakpoint 提供不同比例：
 *   包一層外框，在小螢幕傳 4/3、大螢幕傳 16/9。
 *
 *   <div className="md:hidden"><EnhancedHeroSection {...props} ratio={4/3} /></div>
 *   <div className="hidden md:block"><EnhancedHeroSection {...props} ratio={16/9} /></div>
 */
