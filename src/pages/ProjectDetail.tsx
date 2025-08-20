import React from "react";
import { ArrowLeft, ExternalLink, Calendar, Tag, User } from "lucide-react";

// Mock data for demonstration
const mockProject = {
  title: "UI/UX Design System",
  desc: "A comprehensive design system built for modern web applications. This project includes reusable components, design tokens, and detailed documentation to ensure consistency across all digital products.",
  longDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  tags: ["React", "TypeScript", "Tailwind CSS", "Figma"],
  role: "Lead UI/UX Designer",
  date: "2024年3月",
  href: "https://example.com",
  images: [
    "https://via.placeholder.com/800x400/3b82f6/ffffff?text=Project+Hero",
    "https://via.placeholder.com/400x300/10b981/ffffff?text=Detail+1",
    "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Detail+2"
  ]
};

// Background Animation Component
function BackgroundFX() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(14,165,233,0.12), rgba(139,92,246,0.08), rgba(16,185,129,0.10))",
          backgroundSize: "400% 400%",
          animation: "gradientShift 25s linear infinite"
        }}
      />
      
      {/* Corner light effects */}
      <div 
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.4), rgba(14,165,233,0.2), transparent)",
          animation: "pulse 8s ease-in-out infinite"
        }}
      />
      <div 
        className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.4), rgba(16,185,129,0.2), transparent)",
          animation: "pulseAlt 10s ease-in-out infinite"
        }}
      />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            animation: `float${i} ${6 + i}s ease-in-out infinite ${i * 0.5}s`
          }}
        />
      ))}
      
      <style >{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        @keyframes pulseAlt {
          0%, 100% { transform: scale(1.2); opacity: 0.4; }
          50% { transform: scale(1); opacity: 0.6; }
        }
        ${[...Array(6)].map((_, i) => `
          @keyframes float${i} {
            0%, 100% { transform: translateY(-20px) translateX(-10px); opacity: 0.2; }
            50% { transform: translateY(20px) translateX(10px); opacity: 0.8; }
          }
        `).join('')}
      `}</style>
    </div>
  );
}

export default function ProjectDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      <BackgroundFX />
      
      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">返回作品集</span>
            </button>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <a href="#" className="hover:text-slate-900 transition-colors">Case List</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Blog</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto">
          {/* Hero Image */}
          <div className="relative mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/50">
              <img 
                src={mockProject.images[0]} 
                alt={mockProject.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Project Info Grid */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {mockProject.title}
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  {mockProject.desc}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {mockProject.tags.map((tag, index) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-slate-700 rounded-full border border-blue-200/50 backdrop-blur-sm"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* External Link */}
                {mockProject.href && (
                  <a
                    href={mockProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span className="font-medium">查看線上版本</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Project Details */}
              <div className="prose prose-slate prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">專案概述</h2>
                <p className="text-slate-600 leading-relaxed">
                  {mockProject.longDesc}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Role Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Role</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Summary</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Nunc amet, Nunc elit hendrerit faucibus at ultrices amet. Cras lectus amet, lobortis, at vitae placerat porta dignissim, vehicula, sollicitudin, et eu sodales, rhoncus placerat sit, lorem sit dignissim, vitae sed ex Cras non, dolor
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mt-3">
                      non non elit tempor nulla, ac tincidunt ex maximus Ut eget lacus maximus ex Donec malesuada urna convallis. Nunc odio Praesent nisi Nunc ex In tincidunt enim, non nulla, vitae elit Nunc porta tincidunt dolor sit mattesania Ut Donec est, in.
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Meta */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-500" />
                  <div>
                    <div className="text-sm text-slate-500">完成時間</div>
                    <div className="font-medium text-slate-900">{mockProject.date}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-500" />
                  <div>
                    <div className="text-sm text-slate-500">擔任角色</div>
                    <div className="font-medium text-slate-900">{mockProject.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Title 1</h2>
              <div className="prose prose-slate prose-lg max-w-none">
                <p>Nunc amet, Nunc elit hendrerit faucibus at ultrices amet. Cras lectus amet, lobortis, at vitae placerat porta dignissim, vehicula, sollicitudin, et eu sodales, rhoncus placerat sit, lorem sit dignissim, vitae sed ex Cras non, dolor</p>
                <p>non non elit tempor nulla, ac tincidunt ex maximus Ut eget lacus maximus ex Donec malesuada urna convallis. Nunc odio Praesent nisi Nunc ex In tincidunt enim, non nulla, vitae elit Nunc porta tincidunt dolor sit mattesania Ut Donec est, in.</p>
                <p>at, tincidunt ipsum sed faucibus non, nibh, vitae Nunc ultrices gravida ex, non, dignissim, elit sodales, facilisis Donec tincidunt tut dolor id cursus Donec ex elit fringilla porta quam tempor quam ipsum quam ut non, gravida lorem sunt primi, nulla.</p>
                <p>Quisque Sed mattesania faucibus leo, et, vehicula, sapien tincidunt faucibus urna leo, gravida dignissim, massa habitur tincidunt vel id sodales, faucibus adipiscing Donec Nunc vitae elit, ex, sodales, lorem vitae ex eu nulla, Cras odio Ut.</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Title 2</h2>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="order-2 md:order-1">
                  <div className="prose prose-slate max-w-none">
                    <p>Nunc amet, Nunc elit hendrerit faucibus at ultrices amet. Cras lectus amet, lobortis, at vitae placerat porta dignissim, vehicula, sollicitudin, et eu sodales, rhoncus placerat sit, lorem sit dignissim, vitae sed ex Cras non, dolor</p>
                    <p>non non elit tempor nulla, ac tincidunt ex maximus Ut eget lacus maximus ex Donec malesuada urna convallis. Nunc odio Praesent nisi Nunc ex In tincidunt enim, non nulla, vitae elit Nunc porta tincidunt dolor sit mattesania Ut Donec est, in.</p>
                    <p>at, tincidunt ipsum sed faucibus non, nibh, vitae Nunc ultrices gravida ex, non, dignissim, elit sodales, facilisis Donec tincidunt tut dolor id cursus Donec ex elit fringilla porta quam tempor quam ipsum quam ut non, gravida lorem sunt primi, nulla.</p>
                    <p>Quisque Sed mattesania faucibus leo, et, vehicula, sapien tincidunt faucibus urna leo, gravida dignissim, massa habitur tincidunt vel id sodales, faucibus adipiscing Donec Nunc vitae elit, ex, sodales, lorem vitae ex eu nulla, Cras odio Ut.</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/50">
                      <img 
                        src={mockProject.images[1]} 
                        alt="Project detail"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}