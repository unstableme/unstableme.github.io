import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export type Mode = "batman" | "nepal";

const STORAGE_KEY = "portfolio-mode";

type ThemeState = {
  mode: Mode;
  /** Toggle mode. Pass the click point so the new theme bleeds outward from it. */
  toggleMode: (origin?: { x: number; y: number }) => void;
  setMode: (mode: Mode, origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<ThemeState | undefined>(undefined);

function readStoredMode(): Mode {
  try {
    const m = localStorage.getItem(STORAGE_KEY);
    return m === "nepal" ? "nepal" : "batman";
  } catch {
    return "batman";
  }
}

function applyMode(mode: Mode) {
  const root = document.documentElement;
  root.dataset.mode = mode;
  // "dark" class keeps tailwind dark: variants (shadcn ui, toasts) coherent
  root.classList.toggle("dark", mode === "batman");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>(readStoredMode);

  useEffect(() => {
    applyMode(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* private browsing */
    }
  }, [mode]);

  const setMode = (next: Mode, origin?: { x: number; y: number }) => {
    if (next === mode) return;

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduced) {
      setModeState(next);
      return;
    }

    // Circle expansion from the toggle position via the View Transitions API.
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 64;
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${r}px`);

    doc.startViewTransition(() => {
      applyMode(next);
      flushSync(() => setModeState(next));
    });
  };

  const toggleMode = (origin?: { x: number; y: number }) =>
    setMode(mode === "batman" ? "nepal" : "batman", origin);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useMode must be used within ThemeProvider");
  return ctx;
}

// Back-compat alias for any legacy imports.
export const useTheme = useMode;
