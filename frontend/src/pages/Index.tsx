
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { PublicationSection } from "@/components/sections/PublicationSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { HobbiesSection } from "@/components/sections/HobbiesSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen relative">
        <Navbar />
        
        <main className="transition-all duration-300 ease-out-expo pt-20 px-4 md:px-12 lg:px-20">
          <HeroSection />
          <AboutSection />
          <EducationSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <PublicationSection />
          <ArticlesSection />
          <HobbiesSection />
          <ResumeSection />
          <ContactSection />
          
          <footer className="py-8 text-center text-sm text-muted-foreground">
            <div className="container">
              <p>© {new Date().getFullYear()} Santosh. All rights reserved.</p>
            </div>
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
