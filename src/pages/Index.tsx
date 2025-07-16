
import { ThemeProvider } from "@/context/ThemeContext";
import { Sidebar } from "@/components/Sidebar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { PublicationSection } from "@/components/sections/PublicationSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { HobbiesSection } from "@/components/sections/HobbiesSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        <Sidebar />
        
        <main className="pl-0 lg:pl-64 transition-all duration-300 ease-out-expo">
          <HeroSection />
          <AboutSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <PublicationSection />
          <ArticlesSection />
          <HobbiesSection />
          <ResumeSection />
          <ContactSection />
          
          <footer className="py-8 text-center text-sm text-muted-foreground">
            <div className="container">
              <p>© 2023 Santosh. All rights reserved.</p>
            </div>
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
