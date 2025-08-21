import React from "react";
import { Tag } from "lucide-react";

export default function EnhancedTagsSection({ tags }: { tags?: string[] }) {
  if (!Array.isArray(tags) || tags.length === 0) return null;
  return (
    <div className="pd-stagger-children flex flex-wrap gap-3 mb-8">
      {tags.map((tag) => (
        <span key={tag} className="pd-tag inline-flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 rounded-full pd-gentle-hover pd-interactive">
          <Tag className="w-3.5 h-3.5" />
          {tag}
        </span>
      ))}
    </div>
  );
}
