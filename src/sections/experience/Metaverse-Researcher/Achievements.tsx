import React from "react";
import { SectionTitle, AltSection } from "@/components/ui";
import AchievementCard from "@/components/ui/AchievementCard";
import { Lightbulb, BookOpen, Handshake } from "lucide-react";

export default function Achievements() {
  return (
    <AltSection bg className="pb-4 md:pb-6"> {/* 覆蓋底部 padding */}
      <SectionTitle title="Key Achievements" />
      <div className="mt-8 grid gap-6 md:grid-cols-3" role="list">
        <AchievementCard
          icon={<Lightbulb />}
          title="International Conference Presentation"
          desc={
            <>
              Published and presented findings at the{" "}
              <strong>
                International Conference on Information Management (ICIM)
              </strong>.
            </>
          }
        />
        <AchievementCard
          icon={<BookOpen />}
          title="Structured Research Publication"
          desc="Consolidated findings into a structured paper examining opportunities, risks, and transitional strategies for emerging technologies in the arts."
        />
        <AchievementCard
          icon={<Handshake />}
          title="Bridging Theory and Practice"
          desc="Brought together academic frameworks and real-world insights from the art-tech startup case study."
        />
      </div>
    </AltSection>
  );
}
