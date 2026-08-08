import { useState } from "react";
import {
  Camera, Music, Plane, Video, Book, Code, Search, Youtube, X, FileDown,
} from "lucide-react";
import { useMode } from "@/context/ThemeContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { profile, hobbies, modeCopy, type Hobby } from "@/data/content";

const HOBBY_ICONS: Record<string, React.ReactNode> = {
  camera: <Camera className="h-6 w-6" />,
  music: <Music className="h-6 w-6" />,
  plane: <Plane className="h-6 w-6" />,
  video: <Video className="h-6 w-6" />,
  book: <Book className="h-6 w-6" />,
  code: <Code className="h-6 w-6" />,
  search: <Search className="h-6 w-6" />,
  youtube: <Youtube className="h-6 w-6" />,
};

export function About() {
  const { mode } = useMode();
  const isBat = mode === "batman";
  const copy = modeCopy[mode];
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);

  return (
    <section id="about" className="section-container py-24 md:py-32">
      <SectionHeader
        sectionId="about"
        label={copy.about.label}
        title={copy.about.title}
        status="Clearance: Public"
      />

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Portrait */}
        <Reveal className="w-full lg:w-1/3">
          <div className="relative group">
            <div className="overflow-hidden mode-card !p-0 relative z-10">
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                className={`w-full h-[380px] md:h-[420px] object-cover transition-all duration-700 group-hover:scale-[1.03] ${
                  isBat ? "grayscale group-hover:grayscale-0" : "saturate-[1.05]"
                }`}
              />
              <div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                  background: isBat
                    ? "linear-gradient(180deg, transparent 55%, #0a0a0f)"
                    : "linear-gradient(180deg, transparent 70%, rgba(45,106,79,0.25))",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className="font-themed-mono text-xs tracking-widest text-primary uppercase">
                  {isBat ? "SUBJECT: S. SAPKOTA" : "Kathmandu, Nepal"}
                </span>
              </div>
            </div>
            <div className="absolute -inset-3 border border-primary/25 translate-x-3 translate-y-3 pointer-events-none" style={{ borderRadius: "var(--radius)" }} />
          </div>

          {isBat && (
            <dl className="mt-8 mode-card p-4 font-themed-mono text-xs space-y-2">
              {[
                ["DESIGNATION", "ML Engineer"],
                ["BASE", "Kathmandu, Nepal"],
                ["SPECIALTY", "End-to-end ML systems"],
                ["STATUS", "Active"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-foreground text-right">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>

        {/* Bio */}
        <Reveal delay={0.15} className="w-full lg:w-2/3">
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">
            <p>
              I'm Santosh, a{" "}
              <span className="text-foreground font-semibold border-b border-primary/40">
                Computer Engineer
              </span>{" "}
              by degree with a license, having a deep passion for leveraging{" "}
              <span className="text-primary font-medium">AI &amp; Data Science</span> to
              tackle real-world problems.
            </p>
            <p>{profile.bio.body}</p>
            <blockquote className="border-l-2 border-primary/40 pl-4 py-2 italic bg-secondary/50">
              {profile.bio.quote}
            </blockquote>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={profile.resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mode-btn-primary"
              >
                <FileDown className="h-4 w-4" />
                {isBat ? "Download dossier" : "Download résumé"}
              </a>
              <a
                href={profile.legacySite}
                target="_blank"
                rel="noopener noreferrer"
                className="mode-btn-outline"
              >
                Check my legacy site →
              </a>
            </div>
          </div>

          {/* Hobbies — off-duty grid */}
          <div className="mt-14">
            <h3 className="font-themed-mono text-xs tracking-widest text-muted-foreground uppercase mb-5">
              {isBat ? "// OFF THE TRAIL 🪁" : "Off the trail 🪁"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {hobbies.map((hobby) => (
                <button
                  key={hobby.id}
                  onClick={() => setSelectedHobby(hobby)}
                  className="mode-card p-4 text-left group cursor-pointer"
                >
                  <div className="text-primary mb-2">{HOBBY_ICONS[hobby.icon]}</div>
                  <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {hobby.name}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {hobby.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Hobby modal */}
      {selectedHobby && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedHobby(null)}
        >
          <div
            className="mode-card relative w-full max-w-xl max-h-[85vh] overflow-auto p-6 pt-10 animate-fade-up"
            style={{ backgroundColor: "hsl(var(--card))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedHobby(null)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary">{HOBBY_ICONS[selectedHobby.icon]}</span>
              <h3 className="text-2xl font-bold text-foreground">{selectedHobby.name}</h3>
            </div>
            <div
              className="text-base leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: selectedHobby.fullDescription }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
