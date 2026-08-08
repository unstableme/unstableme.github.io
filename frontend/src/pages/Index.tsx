import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { CursorParticles } from "@/components/effects/CursorParticles";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Publications } from "@/components/sections/Publications";
import { Articles } from "@/components/sections/Articles";
import { Contact } from "@/components/sections/Contact";

const Index = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      <div className="grain-overlay" aria-hidden="true" />
      <CursorParticles />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <ScrollProgress />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Projects />
        <Publications />
        <Articles />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
