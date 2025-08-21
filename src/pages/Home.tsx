// src/pages/Home.tsx
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import ExperienceTimeline from "../pages/ExperienceTimeline";
import Skills from "../components/Skills";
import Portfolio from "../components/Portfolio";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-sans">
      {/* 頂部導覽 */}
      {typeof Nav === "function" && <Nav />}

      {/* 首頁 Hero 區塊 */}
      <section id="home" className="scroll-mt-24">
        {typeof Hero === "function" && <Hero />}
      </section>

      {/* 經歷 */}
      <section id="experience" className="scroll-mt-24">
        <ExperienceTimeline />
      </section>

      {/* 技能 */}
      <section id="skills" className="scroll-mt-24">
        {typeof Skills === "function" && <Skills />}
      </section>

      {/* 作品集（提供 #portfolio 給返回按鈕與 Nav 使用） */}
      <section id="portfolio" className="scroll-mt-6">
        {typeof Portfolio === "function" && <Portfolio />}
      </section>

      {/* 聯繫 */}
      <section id="contact" className="scroll-mt-24">
        {typeof Contact === "function" && <Contact />}
      </section>

      {/* 頁尾 */}
      {typeof Footer === "function" && <Footer />}
    </div>
  );
}
