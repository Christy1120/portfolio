import React from "react";
import WhatIDid from "@/sections/experience/Student-Research/WhatIDid";
import Learnings from "@/sections/experience/Student-Research/Learnings";
import Achievements from "@/sections/experience/Student-Research/Achievements";
import RoleSection from "@/sections/experience/Student-Research/RoleSection";

export default function  StudentResearch() {
  return (
    <div className="mx-auto w-full space-y-20 bg-white p-6 font-sans md:p-12">
      <WhatIDid />
      <Achievements/>
      <RoleSection />
      <Learnings />
    </div>
  );
}
