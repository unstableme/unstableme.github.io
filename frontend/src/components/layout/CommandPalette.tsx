import { useEffect } from "react";
import { Command } from "cmdk";
import {
  Moon,
  Mountain,
  FileDown,
  Github,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { useMode } from "@/context/ThemeContext";
import { NAV_LINKS, scrollToSection } from "./Navbar";
import { profile } from "@/data/content";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

/** CMD+K palette — navigate sections, switch identity, quick links. */
export function CommandPalette({ open, setOpen }: Props) {
  const { mode, setMode } = useMode();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  if (!open) return null;

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center pt-[18vh] px-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
        <Command
          label="Command palette"
          className="mode-card overflow-hidden shadow-2xl"
          style={{ backgroundColor: "hsl(var(--card))" }}
        >
          <Command.Input
            autoFocus
            placeholder={mode === "batman" ? "Query the batcomputer…" : "Where to, sathi?"}
            className="w-full px-4 py-3.5 bg-transparent text-foreground placeholder:text-muted-foreground outline-none border-b border-border font-themed-mono text-sm"
          />
          <Command.List className="max-h-[320px] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigate"
              className="text-[10px] font-themed-mono uppercase tracking-widest text-muted-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5"
            >
              {[...NAV_LINKS, { id: "contact", label: "Contact" }].map((link) => (
                <Command.Item
                  key={link.id}
                  onSelect={() => run(() => scrollToSection(link.id))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-foreground cursor-pointer data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary"
                >
                  <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                  {link.label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Identity"
              className="text-[10px] font-themed-mono uppercase tracking-widest text-muted-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5"
            >
              <Command.Item
                onSelect={() =>
                  run(() => setMode(mode === "batman" ? "nepal" : "batman"))
                }
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-foreground cursor-pointer data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary"
              >
                {mode === "batman" ? (
                  <>
                    <Mountain className="h-3.5 w-3.5 opacity-50" /> Switch to Himalaya mode
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 opacity-50" /> Switch to Dark Knight mode
                  </>
                )}
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Links"
              className="text-[10px] font-themed-mono uppercase tracking-widest text-muted-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5"
            >
              <Command.Item
                onSelect={() => run(() => window.open(profile.resumeUrl, "_blank"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-foreground cursor-pointer data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary"
              >
                <FileDown className="h-3.5 w-3.5 opacity-50" /> Download résumé
              </Command.Item>
              <Command.Item
                onSelect={() => run(() => window.open(profile.social.github, "_blank"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-foreground cursor-pointer data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary"
              >
                <Github className="h-3.5 w-3.5 opacity-50" /> GitHub
              </Command.Item>
              <Command.Item
                onSelect={() => run(() => window.open(profile.social.linkedin, "_blank"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-foreground cursor-pointer data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary"
              >
                <Linkedin className="h-3.5 w-3.5 opacity-50" /> LinkedIn
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
