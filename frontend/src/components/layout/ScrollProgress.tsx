import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useMode } from "@/context/ThemeContext";

const BASE_ALT = 5000; // base camp
const SUMMIT = 8849; // Everest

/**
 * Right-edge vertical progress bar.
 * Batman: "73% patrol".
 * Nepal: a descent — you start at the summit (8,849m) and the altitude drops
 * toward base camp as you scroll down the page.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();
  const { mode } = useMode();
  const isBat = mode === "batman";

  const altitude = Math.round(SUMMIT - progress * (SUMMIT - BASE_ALT));

  return (
    <div
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3 pointer-events-none"
      aria-hidden="true"
    >
      {isBat ? (
        <span className="font-themed-mono text-[10px] text-muted-foreground tracking-wider [writing-mode:vertical-rl]">
          {`${Math.round(progress * 100)}% patrol`}
        </span>
      ) : (
        <span className="font-themed-mono text-[9px] text-muted-foreground">8,849m</span>
      )}
      <div className="relative h-40 w-px bg-border">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] bg-primary rounded-full transition-[height] duration-150"
          style={{ height: `${progress * 100}%` }}
        />
        {/* marker dot at current position */}
        <div
          className="absolute left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-primary"
          style={{ top: `calc(${progress * 100}% - 3px)` }}
        />
      </div>
      {!isBat && (
        <span className="font-themed-mono text-[10px] text-muted-foreground tracking-wider [writing-mode:vertical-rl]">
          {`${altitude.toLocaleString()}m`}
        </span>
      )}
    </div>
  );
}
