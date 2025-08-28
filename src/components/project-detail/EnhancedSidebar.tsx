import React from "react";
import { Calendar, User } from "lucide-react";
import type { Project } from "../../features/project/hooks/useProjectDetail";

export default function EnhancedSidebar({ project }: { project: Project }) {
  return (
    <div className="space-y-6 pd-fade-in-delay-2">
      <div className="pd-glass-card rounded-xl p-6 pd-gentle-hover">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-[#fbd786] to-[#f7797d] rounded-xl flex items-center justify-center pd-float">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Role & Summary</h3>
            <p className="text-sm text-gray-500">項目詳細信息</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Summary</h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              這個專案展現了現代化的設計思維與技術實現，通過細緻的用戶體驗規劃和創新的技術架構，為用戶提供了卓越的產品體驗。
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              從概念設計到最終實現，每個環節都經過精心打磨，確保產品既具有視覺吸引力，又能提供實用的功能價值。
            </p>
          </div>
        </div>
      </div>

      <div className="pd-glass-card rounded-xl p-6 pd-gentle-hover space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">完成時間</div>
            <div className="font-semibold text-gray-900">{project.date}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">擔任角色</div>
            <div className="font-semibold text-gray-900">{project.role}</div>
          </div>
        </div>
      </div>

      <div className="pd-glass-card rounded-xl p-6 pd-gentle-hover">
        <h4 className="font-semibold text-gray-900 mb-4">技術棧</h4>
        <div className="grid grid-cols-2 gap-3">
          {project.tags?.map((tech) => (
            <div key={tech} className="bg-gray-50 rounded-lg p-3 text-center text-sm font-medium text-gray-700">
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
