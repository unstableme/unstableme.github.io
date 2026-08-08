import { useState } from "react";
import { ExternalLink, Github, X, FolderOpen } from "lucide-react";
import { useMode } from "@/context/ThemeContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { projects, modeCopy, type Project } from "@/data/content";
import { cn } from "@/lib/utils";

export function Projects() {
  const { mode } = useMode();
  const isBat = mode === "batman";
  const copy = modeCopy[mode];
  const [selected, setSelected] = useState<Project | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sorted = [...projects].sort((a, b) =>
    sortOrder === "newest" ? b.id - a.id : a.id - b.id
  );

  const openModal = (p: Project) => {
    setSelected(p);
    document.body.classList.add("overflow-hidden");
  };
  const closeModal = () => {
    setSelected(null);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <section id="projects" className="section-container py-24 md:py-32">
      <SectionHeader
        sectionId="projects"
        label={copy.projects.label}
        title={copy.projects.title}
        status={`Files: ${projects.length}`}
      />

      <Reveal>
        <div className="flex justify-end items-center mb-8 gap-2">
          <span className="text-sm text-muted-foreground font-themed-mono">Sort:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
            className="px-3 py-2 text-sm bg-secondary border border-border text-foreground outline-none focus:border-primary/50"
            style={{ borderRadius: "var(--radius)" }}
          >
            <option value="newest">Newest → Oldest</option>
            <option value="oldest">Oldest → Newest</option>
          </select>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((project, index) => (
          <Reveal key={project.id} delay={Math.min(index * 0.06, 0.4)}>
            <button
              onClick={() => openModal(project)}
              className="mode-card overflow-hidden text-left w-full h-full flex flex-col cursor-pointer group"
            >
              <div className="relative h-44 overflow-hidden shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className={cn(
                    "w-full h-full object-cover transition-all duration-700 group-hover:scale-105",
                    isBat && "saturate-[0.6] group-hover:saturate-100"
                  )}
                />
                {isBat && (
                  <span className="absolute top-2 left-2 mode-chip !text-[10px] !text-primary border-primary/30 bg-black/60">
                    <FolderOpen className="h-3 w-3 mr-1" />
                    CASE #{String(project.id).padStart(3, "0")}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="mode-chip !text-[11px]">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="mode-chip !text-[11px] !text-primary">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="mode-card relative w-full max-w-3xl max-h-[90vh] overflow-auto animate-fade-up"
            style={{ backgroundColor: "hsl(var(--card))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 z-10 p-2 bg-black/30 text-white rounded-full hover:bg-black/50"
              onClick={closeModal}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-56 md:h-72">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              {isBat && (
                <div className="font-themed-mono text-xs text-primary mb-2 tracking-widest">
                  CASE FILE #{String(selected.id).padStart(3, "0")} — DECLASSIFIED
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-3">{selected.title}</h3>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {selected.tags.map((tag) => (
                  <span key={tag} className="mode-chip !text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                {selected.fullDescription}
              </p>

              <div className="flex flex-wrap gap-3">
                {selected.demoUrl !== "#" && (
                  <a
                    href={selected.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mode-btn-primary text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                <a
                  href={selected.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mode-btn-outline text-sm"
                >
                  <Github className="h-4 w-4" />
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
