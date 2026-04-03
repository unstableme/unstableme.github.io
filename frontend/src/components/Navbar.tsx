import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

type NavLink = {
  id: string;
  label: string;
};

const links: NavLink[] = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const scrollPosition = window.scrollY;
      const sections = links.map(link => {
        const element = document.getElementById(link.id);
        if (!element) return { id: link.id, offsetTop: 0 };
        return {
          id: link.id,
          offsetTop: element.offsetTop - 100
        };
      });
      
      const currentSection = sections.reduce((acc, section) => {
        return scrollPosition >= section.offsetTop ? section.id : acc;
      }, sections[0].id);
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
      setActiveSection(id);
      if (isMobile) setIsOpen(false);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="text-2xl md:text-3xl font-black tracking-tighter cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-foreground">Santosh</span>
        </div>

        {/* Desktop Links */}
        {!isMobile && (
          <div className="flex items-center gap-8">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={cn(
                  "text-base md:text-lg font-medium transition-colors hover:text-primary",
                  activeSection === link.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/70 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5 text-primary" />}
            </button>
            <button 
              onClick={() => handleClick('contact')}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-base md:text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Connect
            </button>
          </div>
        )}

        {/* Mobile Toggle */}
        {isMobile && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-secondary text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5 text-primary" />}
            </button>
            <button onClick={toggleMenu} className="p-2 text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-6 gap-4">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={cn(
                  "text-left text-lg font-medium py-2",
                  activeSection === link.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => handleClick('contact')}
              className="bg-primary text-primary-foreground px-5 py-3 rounded-xl text-center font-bold mt-2"
            >
              Connect
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
