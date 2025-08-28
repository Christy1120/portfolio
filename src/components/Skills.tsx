import React, { useState } from "react";
import { CheckCircle2, Award, ExternalLink } from "lucide-react";

export default function SkillsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const skills: Record<string, string[]> = {
    "Product Management & Research": [
      "Problem Framing",
      "Industry Analysis",
      "Wireframing",
    ],
    "Data & Analytics": [
      "Python (pandas, matplotlib)",
      "Dashboarding & Visualization",
      "Root Cause Analysis",
    ],
    "Communication & Leadership": [
      "Stakeholder Management",
      "Cross-functional Collaboration",
      "Product Storytelling",
    ],
  };

  const certs: { name: string; url: string; issuer?: string }[] = [
    {
      name: "Google Advanced Data Analytics",
      url: "https://coursera.org/share/6629f0600047688b02b0daa088468abc",
      issuer: "Google / Coursera",
    },
    {
      name: "Google Project Management",
      url: "https://coursera.org/share/4d74b0f51b71c9ce756393d7bcd3141c",
      issuer: "Google / Coursera",
    },
    {
      name: "Foundations of User Experience (UX) Design",
      url: "https://coursera.org/share/a33072d02da9701b9d3660b446e6ddd4",
      issuer: "University of Virginia, Coursera",
    },
  ];

  return (
    <section id="skills" className="bg-white py-20 relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="mx-auto max-w-6xl px-6 relative">
        {/* 標題區 - 增加淡入動畫 */}
        <header className="mb-12 text-center transform transition-all duration-1000 animate-fadeIn">
          <div className="inline-block">
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 mx-auto mb-4 rounded-full animate-shimmer"></div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">
              Skills & Tools
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              A practical stack I use to ship value from discovery to delivery.
            </p>
          </div>
        </header>

        {/* Skills Grid - 卡片懸浮動畫與漸變效果 */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {Object.entries(skills).map(([category, items], index) => (
            <div
              key={category}
              className="group relative transform transition-all duration-500 hover:scale-105 animate-slideUp h-full"
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(category)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* 動態上緣色條 */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* 懸浮時的背景光暈 */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="p-8 relative flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-5 group-hover:text-amber-600 transition-colors duration-300">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3 flex-1 content-start">
                    {items.map((item, itemIndex) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 bg-white hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200 transform hover:scale-105 animate-fadeInUp"
                        style={{ animationDelay: `${(index * 200) + (itemIndex * 100)}ms` }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-amber-500 animate-bounce-subtle" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications - 動畫列表 */}
        <div className="animate-fadeIn" style={{ animationDelay: '800ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">
              Certifications & Learning
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 mx-auto rounded-full"></div>
          </div>
          
          <ul className="space-y-4 max-w-3xl mx-auto">
            {certs.map(({ name, url, issuer }, index) => (
              <li 
                key={name}
                className="animate-slideInLeft"
                style={{ animationDelay: `${1000 + (index * 150)}ms` }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-6 py-4 transition-all duration-300 hover:border-yellow-300 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 transform"
                  aria-label={`${name} (opens in new tab)`}
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <div className="relative">
                      <Award className="h-6 w-6 shrink-0 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
                      <div className="absolute -inset-2 bg-yellow-200 rounded-full opacity-0 group-hover:opacity-20 animate-ping"></div>
                    </div>
                    <span className="truncate">
                      <span className="block truncate font-medium text-slate-800 group-hover:text-amber-700 transition-colors duration-300">
                        {name}
                      </span>
                      {issuer && (
                        <span className="block truncate text-sm text-slate-500 group-hover:text-amber-600 transition-colors duration-300">
                          {issuer}
                        </span>
                      )}
                    </span>
                  </span>
                  <ExternalLink className="h-5 w-5 shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 text-amber-500" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style >{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes shimmer {
          0% { transform: scaleX(0.8); opacity: 0.5; }
          50% { transform: scaleX(1.2); opacity: 1; }
          100% { transform: scaleX(0.8); opacity: 0.5; }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}