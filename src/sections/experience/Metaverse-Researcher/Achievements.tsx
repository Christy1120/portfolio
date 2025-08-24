import React from "react";
import { SectionTitle, AltSection, AchievementCard } from "@/components/ui";

export default function Achievements() {
  return (
    <AltSection bg>
      <SectionTitle title="Key Achievements" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <AchievementCard
          icon="💡"
          title="Academic Recognition"
          desc="Published and presented findings at the International Conference on Information Management (ICIM)."
        />
        <AchievementCard
          icon="📖"
          title="Research Output"
          desc="Consolidated findings into a structured paper examining opportunities, risks, and transitional strategies for emerging technologies in the arts."
        />
        <AchievementCard
          icon="🤝"
          title="Industry Relevance"
          desc="Brought together academic frameworks and real-world insights from the art-tech startup case study."
        />
      </div>
    </AltSection>
  );
}
