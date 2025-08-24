import React from "react";
import WhatIDid from "@/sections/experience/intern/WhatIDid";
import Learnings from "@/sections/experience/intern/Learnings";

export default function DataAnalysisInternDetail() {
  return (
    <div className="mx-auto w-full space-y-20 bg-white p-6 font-sans md:p-12">
      <WhatIDid />
      <Learnings />
    </div>
  );
}
