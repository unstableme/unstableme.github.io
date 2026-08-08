import { useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { useMode } from "@/context/ThemeContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { timeline, modeCopy } from "@/data/content";
import { cn } from "@/lib/utils";

type Filter = "all" | "experience" | "education";

/** Education + Experience consolidated into one interactive timeline. */
export function Timeline() {
  const { mode } = useMode();
  const isBat = mode === "batman";
  const copy = modeCopy[mode];
  const [filter, setFilter] = useState<Filter>("all");

  const entries = timeline.filter((e) => filter === "all" || e.kind === filter);

  const filterLabels: Record<Filter, string> = {
    all: "Full trail",
    experience: "Work",
    education: "Study",
  };

  return (
    <section id="timeline" className="section-container py-24 md:py-32">
      <SectionHeader
        sectionId="timeline"
        label={copy.timeline.label}
        title={copy.timeline.title}
        status="Records: 5"
      />

      {/* Filter pills */}
      <Reveal>
        <div className="flex gap-2 mb-12">
          {(Object.keys(filterLabels) as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium border transition-colors font-themed-mono",
                filter === f
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40"
              )}
              style={{ borderRadius: "calc(var(--radius) + 8px)" }}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="relative border-l border-primary/25 pl-8 ml-3 md:ml-5 space-y-14 max-w-4xl">
        {entries.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.08}>
            <div className="relative group">
              {/* Node */}
              <div
                className={cn(
                  "absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 bg-primary",
                  isBat
                    ? "border-[#0a0a0f] shadow-[0_0_12px_rgba(245,197,24,0.55)]"
                    : "border-[#f0ebe0] shadow-[0_0_0_3px_rgba(45,106,79,0.2)]"
                )}
              />

              <div className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-primary">
                        {item.kind === "experience" ? (
                          <Briefcase className="h-4 w-4" />
                        ) : (
                          <GraduationCap className="h-5 w-5" />
                        )}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <div className="text-base text-muted-foreground mt-1">
                      <span className="font-semibold text-primary/90">{item.org}</span>
                      <span className="mx-2 opacity-40">•</span>
                      <span className="font-themed-mono text-xs uppercase tracking-widest">
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <div className="mode-chip !text-primary whitespace-nowrap self-start md:self-center">
                    {item.period}
                  </div>
                </div>

                {item.project && (
                  <div className="text-sm font-semibold text-primary/75 italic">
                    Project: {item.project}
                  </div>
                )}

                {item.bullets && (
                  <ul className="space-y-2.5 mt-1">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-1 shrink-0">
                          {isBat ? "▸" : "•"}
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
