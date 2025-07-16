import { useState, useEffect } from "react";
import { 
  User, GraduationCap, Star, FolderKanban, 
  FileText, Heart, FileType2, MailOpen, Menu, X, Globe, BookOpenCheck
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarLink = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const links: SidebarLink[] = [
  { id: "about", label: "About", icon: <User className="h-4 w-4" /> },
  { id: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
  { id: "skills", label: "Skills", icon: <Star className="h-4 w-4" /> },
  { id: "projects", label: "Projects", icon: <FolderKanban className="h-4 w-4" /> },
  { id: "publications", label: "Publications", icon: <BookOpenCheck className="h-4 w-4" /> },
  { id: "articles", label: "Articles", icon: <FileText className="h-4 w-4" /> },
  { id: "hobbies", label: "Hobbies", icon: <Heart className="h-4 w-4" /> },
  { id: "resume", label: "Resume", icon: <FileType2 className="h-4 w-4" /> },
  { id: "contact", label: "Contact", icon: <MailOpen className="h-4 w-4" /> },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      const sections = links.map(link => {
        const element = document.getElementById(link.id);
        if (!element) return { id: link.id, offsetTop: 0 };
        return {
          id: link.id,
          offsetTop: element.offsetTop - 100 // Offset for better UX
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
        top: element.offsetTop - 20, // Reduced offset from 50 to 20
        behavior: "smooth"
      });
      setActiveSection(id);
      if (isMobile) setIsOpen(false);
    }
  };
  
  return (
    <>
      <button
        className="fixed top-4 right-4 z-50 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
      
      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-40 w-64 bg-sidebar transition-transform duration-300 ease-out-expo",
          "glass border-r border-sidebar-border flex flex-col",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0",
          "max-h-screen overflow-y-auto"
        )}
      >
        <div className="flex flex-col items-center py-8">
          <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden neo">
            <img
              src="/Me_bhadrakali.jpg"
              alt="Santosh"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold">Santosh</h2>
          <p className="text-sm text-sidebar-foreground/70">Computer Engineer</p>
          
          <div className="flex items-center justify-center gap-4 mt-4 w-full">
            <button
              onClick={() => window.open('https://unstable-photography.onrender.com/', '_blank')}
              className="inline-flex items-center justify-center p-2 rounded-full transition-colors duration-200 hover:bg-accent"
              aria-label="Visit website"
            >
              <Globe className="h-5 w-5" />
            </button>
            <div className="inline-flex items-center justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        <nav className="mt-2 flex-1 px-4">
          <ul className="space-y-1.5">
            {links.map(link => (
              <li key={link.id}>
                <button
                  onClick={() => handleClick(link.id)}
                  className={cn(
                    "sidebar-link w-full text-left",
                    activeSection === link.id && "active"
                  )}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-sidebar-border flex justify-center items-center">
          <div className="text-xs text-sidebar-foreground/70">v1.0.0</div>
        </div>
      </aside>
    </>
  );
}
