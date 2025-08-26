import React from "react";
// 兩種寫法擇一：

import WhatIDid from "@/sections/experience/Metaverse-Researcher/WhatIDid";
import Learnings from "@/sections/experience/Metaverse-Researcher/Learnings";
import Achievements from "@/sections/experience/Metaverse-Researcher/Achievements";
import CtaSection from "@/sections/experience/Metaverse-Researcher/CtaSection";
import RoleSection from "@/sections/experience/Metaverse-Researcher/RoleSection"
import { CtaVersion8 } from "@/components/ui";

export default function MetaverseResearcherDetail() {
  return (
    <div className="mx-auto w-full space-y-10 bg-white p-6 font-sans md:p-12">
      <WhatIDid />
      <Achievements />
      <RoleSection />
      <Learnings />
      <CtaVersion8  />
    </div>
  );
}
