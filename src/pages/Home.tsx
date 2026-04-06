// src/pages/Home.tsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import InteractiveShowcase from '../components/InteractiveShowcase';
import SkillsSection from "../components/Skills";
import ProjectShowcase from '../ProjectShowcase';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    // 🌟 將 overflow-x-hidden 替換為 overflow-clip
    <main className="w-full bg-[#0a0000] min-h-screen overflow-clip">
      {/* 區塊 1：開場 */}
      <HeroSection />
      
      {/* 區塊 3：釘選互動履歷 */}
      <InteractiveShowcase />
      <SkillsSection />
      <ProjectShowcase/>
      
      <Contact/>
    </main>
  );
}