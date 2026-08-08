import { useMode } from "@/context/ThemeContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { skillGroups, workflowSteps, modeCopy } from "@/data/content";

// Prayer-flag accent colors cycle through tags in Nepal mode.
const FLAG_BORDERS = [
  "rgba(59,130,182,0.5)",
  "rgba(192,57,43,0.5)",
  "rgba(39,174,96,0.5)",
  "rgba(241,196,15,0.6)",
  "rgba(45,106,79,0.5)",
];

export function Skills() {
  const { mode } = useMode();
  const isBat = mode === "batman";
  const copy = modeCopy[mode];

  return (
    <section id="skills" className="section-container py-24 md:py-32">
      <SectionHeader
        sectionId="skills"
        label={copy.skills.label}
        title={copy.skills.title}
        status="Systems: Nominal"
      />

      <div className="space-y-12">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.05}>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-foreground border-l-2 border-primary pl-3 mb-5">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, si) => (
                  <div
                    key={skill.name}
                    title={skill.description}
                    className="mode-card px-4 py-2.5 cursor-default group/skill"
                    style={
                      !isBat
                        ? { borderColor: FLAG_BORDERS[si % FLAG_BORDERS.length] }
                        : undefined
                    }
                  >
                    <span className="font-medium text-sm text-foreground group-hover/skill:text-primary transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        {/* Pipeline synopsis */}
        <Reveal>
          <div className="mt-4">
            <h3 className="text-lg md:text-xl font-bold text-foreground border-l-2 border-primary pl-3 mb-6">
              {isBat ? "Standard Operating Procedure" : "Synopsis — my ML workflow"}
            </h3>
            <div className="flex flex-wrap items-center gap-y-3">
              {workflowSteps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <span className="mode-chip !text-xs !text-foreground hover:!text-primary hover:border-primary/50 transition-colors">
                    {isBat && (
                      <span className="text-primary mr-1.5">{String(index + 1).padStart(2, "0")}</span>
                    )}
                    {step}
                  </span>
                  {index < workflowSteps.length - 1 && (
                    <span className="mx-1.5 text-primary select-none text-sm">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
