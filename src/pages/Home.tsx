// src/pages/Home.tsx
import Nav from "../components/Nav";                // 若你有拆分，保留；沒有就移除
import Hero from "../components/Hero";              // 同上
import ExperienceTimeline from "../pages/ExperienceTimeline";
import Skills from "../components/Skills";
import Portfolio from "../components/Portfolio";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-sans">
      {typeof Nav === "function" && <Nav />}
      {typeof Hero === "function" && <Hero />}
      <ExperienceTimeline />
      {typeof Skills === "function" && <Skills />}
      {typeof Portfolio === "function" && <Portfolio />}
      {typeof Contact === "function" && <Contact />}
      {typeof Footer === "function" && <Footer />}
    </div>
  );
}
