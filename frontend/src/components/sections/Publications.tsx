import { FileText } from "lucide-react";
import { useMode } from "@/context/ThemeContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { publications, modeCopy } from "@/data/content";

export function Publications() {
  const { mode } = useMode();
  const isBat = mode === "batman";
  const copy = modeCopy[mode];

  return (
    <section id="publications" className="section-container py-24 md:py-32">
      <SectionHeader
        sectionId="publications"
        label={copy.publications.label}
        title={copy.publications.title}
        status="Verified: DOI"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {publications.map((pub, index) => (
          <Reveal key={pub.id} delay={index * 0.08}>
            <a
              href={pub.doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mode-card overflow-hidden block group h-full"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={pub.image}
                  alt={pub.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 font-themed-mono text-[11px] text-primary mb-2 tracking-widest uppercase">
                  <FileText className="h-3.5 w-3.5" />
                  Research Paper — DOI
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {pub.title}
                </h3>
                <p className="text-sm text-muted-foreground">{pub.description}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
