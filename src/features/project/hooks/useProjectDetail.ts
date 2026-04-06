// src/features/project/hooks/useProjectDetail.ts
import { useParams } from "react-router-dom";
import { SHOWCASE_DATA } from "../../../data/showcaseData"; 

// ⚡️ 加入 manualSlug 參數，預設為空
export function useProjectDetail(manualSlug?: string) {
  const { slug: urlSlug } = useParams();
  
  // 優先權：手動傳入的 slug > 網址上的 slug
  const activeSlug = manualSlug || urlSlug;

  // 尋找符合 slug 的專案
  // 提示：請確認你的 showcaseData 裡面是用 id 還是 slug，這裡假設是 slug
  const project = SHOWCASE_DATA.find((p) => p.slug === activeSlug || p.id === activeSlug);

  const heroData = {
    title: project?.title ?? "Project Not Found",
    subtitle: project?.desc ?? "The project you are looking for does not exist.",
  };

  return { 
    project, 
    heroData, 
  };
}