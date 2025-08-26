import React from "react";
import { SectionTitle } from "@/components/ui";
import "./achievements.css";

export default function Achievements() {
  return (
    <section className="achievement-section">
       <SectionTitle title="Key Achievements" />
      <div className="version-2 animate-fade-in-luxury">
        <div className="geometric-line animate-draw-premium"></div>
        <h2 className="main-title animate-emerge">Research Validated on an International Stage</h2>
        <div className="content animate-reveal-elegant">
          Published the study as <span className="highlight-pill animate-shimmer-in">first author</span> at <span className="highlight-pill animate-shimmer-in-delayed-1">IEEE ICCE 2025</span>, where it was recognized with the <span className="highlight-pill animate-shimmer-in-delayed-2">Best Presentation Award</span> in the Embedded System for IoT Applications session.  
        </div>
      </div>
    </section>
  );
}