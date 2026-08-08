import { useEffect, useState } from "react";
import { Menu, X, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ModeToggle } from "./ModeToggle";

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "timeline", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "articles", label: "Articles" },
] as const;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
}

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  // The full desktop bar (logo + 6 links + toggle + Connect) needs ~1024px;
  // below that (phones AND tablet portrait) collapse to the hamburger menu.
  const isMobile = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        const pos = window.scrollY + 120;
        let current = "";
        for (const link of NAV_LINKS) {
          const el = document.getElementById(link.id);
          if (el && pos >= el.offsetTop) current = link.id;
        }
        setActiveSection(current);
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleClick = (id: string) => {
    scrollToSection(id);
    if (isMobile) setIsOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-5 md:px-8 transition-all duration-300",
        scrolled
          ? "py-2.5 border-b border-border backdrop-blur-md"
          : "py-4 bg-transparent"
      )}
      style={scrolled ? { backgroundColor: "hsl(var(--background) / 0.82)" } : undefined}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <button
          className="text-2xl md:text-3xl font-black tracking-tighter text-foreground shrink-0"
          style={{ fontFamily: "var(--heading-font)" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Santosh
        </button>

        {/* Links sit in the middle of the bar so the whole width reads as
            evenly distributed: logo | links | controls */}
        {!isMobile && (
          <div className="flex-1 flex items-center justify-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  activeSection === link.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

        {!isMobile && (
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenPalette}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors font-themed-mono"
              aria-label="Open command palette"
            >
              <Command className="h-3 w-3" />K
            </button>

            <ModeToggle />

            {/* radius pinned so the pill looks the same in both modes —
                Dark Knight's sharp global radius makes it look cut-off */}
            <button
              onClick={() => handleClick("contact")}
              className="mode-btn-primary !rounded-xl !px-4 !py-2 text-sm"
            >
              Connect
            </button>
          </div>
        )}

        {isMobile && (
          <div className="flex items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        )}
      </div>

      {isMobile && isOpen && (
        <div
          className="absolute top-full left-0 right-0 border-b border-border animate-fade-up"
          style={{ backgroundColor: "hsl(var(--background) / 0.97)" }}
        >
          <div className="flex flex-col p-6 gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={cn(
                  "text-left text-lg font-medium py-1",
                  activeSection === link.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleClick("contact")}
              className="mode-btn-primary !rounded-xl mt-2"
            >
              Connect
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
