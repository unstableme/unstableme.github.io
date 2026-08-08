import { Mountain } from "lucide-react";
import { useMode } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export function BatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 44" className={className} fill="currentColor" aria-hidden="true">
      <path d="M50 4 L54 13 C62 6 75 6 84 13 C75 15 73 22 75 29 C66 24 59 27 57 34 L53 27 L50 40 L47 27 L43 34 C41 27 34 24 25 29 C27 22 25 15 16 13 C25 6 38 6 46 13 Z" />
    </svg>
  );
}

/**
 * The mode slider: bat on one end, mountain on the other, thumb slides
 * between them. Passes the click point up so the clip-circle expands from it.
 */
export function ModeToggle() {
  const { mode, toggleMode } = useMode();
  const isBat = mode === "batman";

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleMode({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={!isBat}
      aria-label={isBat ? "Switch to Himalaya mode" : "Switch to Dark Knight mode"}
      title={isBat ? "Switch to Himalaya mode" : "Switch to Dark Knight mode"}
      className={cn(
        "relative flex items-center gap-2 h-9 px-3 rounded-full border transition-colors",
        "border-border bg-secondary hover:border-primary/50"
      )}
    >
      {/* Sliding thumb. The solid disc reads tighter than the bare glyph on
          the opposite end, so the pill carries a generous 12px inset to keep
          both ends looking equally clear. Travel = width − insets − thumb. */}
      <span
        className={cn(
          "absolute top-1 h-7 w-7 rounded-full bg-primary transition-transform duration-300 ease-out",
          isBat ? "translate-x-0" : "translate-x-[68px]"
        )}
        style={{ left: 12 }}
      />
      <span
        className={cn(
          "relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors",
          isBat ? "text-primary-foreground" : "text-muted-foreground"
        )}
      >
        <BatIcon className="w-[18px]" />
      </span>
      <span className="relative z-10 w-6 text-center font-themed-mono text-[9px] text-muted-foreground select-none">
        50/50
      </span>
      <span
        className={cn(
          "relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors",
          !isBat ? "text-primary-foreground" : "text-muted-foreground"
        )}
      >
        <Mountain className="h-4 w-4" />
      </span>
    </button>
  );
}
