import { useMode } from "@/context/ThemeContext";
import { Reveal } from "./Reveal";

const SECTION_EMOJI: Record<string, string> = {
  about: "🌿",
  timeline: "🥾",
  skills: "🎒",
  projects: "🏔️",
  publications: "📜",
  articles: "🍃",
  hobbies: "🪁",
  contact: "🙏",
};

type Props = {
  sectionId: string;
  label: string; // small kicker, e.g. "CASE FILES" / "LAB NOTES"
  title: string;
  status?: string; // batman-mode status badge, e.g. "Status: Active"
  center?: boolean;
};

/**
 * Mode-aware section header. Copy (label, title, emoji) is identical in both
 * modes for consistency — only the visual treatment shifts identity:
 * Batman keeps the terminal-style kicker and status badge; Nepal keeps the
 * warm serif heading and ridge-line divider.
 */
export function SectionHeader({ sectionId, label, title, status, center }: Props) {
  const { mode } = useMode();
  const isBat = mode === "batman";
  const emoji = SECTION_EMOJI[sectionId] ?? "🌿";

  return (
    <Reveal className={center ? "text-center" : ""}>
      <div className={`mb-12 md:mb-16 ${center ? "flex flex-col items-center" : ""}`}>
        {isBat ? (
          <>
            <div className="flex items-center gap-3 mb-3 font-themed-mono text-xs tracking-widest text-muted-foreground">
              <span className="text-primary">▣</span>
              <span>{`// ${label}`}</span>
              {status && (
                <span className="mode-chip !text-[10px] text-primary border-primary/30">
                  {status}
                </span>
              )}
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
              {title}{" "}
              <span className="text-3xl md:text-5xl align-middle">{emoji}</span>
            </h2>
            <div className={`mt-4 h-px w-24 bg-primary/50 ${center ? "mx-auto" : ""}`} />
          </>
        ) : (
          <>
            <div className="mb-3 font-themed-mono text-xs tracking-[0.25em] uppercase text-primary">
              {label}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              {title}{" "}
              <span className="text-3xl md:text-5xl align-middle">{emoji}</span>
            </h2>
            {/* ridge-line divider */}
            <svg
              viewBox="0 0 200 12"
              className={`mt-4 w-40 text-primary/60 ${center ? "mx-auto" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M0 10 L30 4 L55 9 L85 2 L115 9 L145 5 L175 10 L200 6" />
            </svg>
          </>
        )}
      </div>
    </Reveal>
  );
}
