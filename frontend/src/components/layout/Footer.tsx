import { useMode } from "@/context/ThemeContext";
import { NepalFooterSkyline } from "@/components/effects/NepalFooterSkyline";

export function Footer() {
  const { mode } = useMode();
  const isBat = mode === "batman";
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Nepal mode closes the page on a cultural skyline — Boudhanath stupa,
          pagoda temples, a Dharahara-style tower and prayer flags. */}
      {!isBat && <NepalFooterSkyline />}

      <div
        className={
          isBat
            ? "py-6 sm:py-10 px-5 text-center border-t border-border"
            : "py-5 sm:py-8 px-5 text-center bg-[#2f4f3e] text-[#e8e2d4]"
        }
      >
        <p
          className={
            isBat
              ? "text-xs sm:text-sm text-muted-foreground font-themed-mono"
              : "text-xs sm:text-sm font-themed-mono opacity-90"
          }
        >
          {/* phones get the short line so the bar stays compact and clears
              the chat button in the corner */}
          <span className="sm:hidden">© {year} Santosh Sapkota</span>
          <span className="hidden sm:inline">
            {isBat
              ? `© ${year} Santosh Sapkota — Gotham never sleeps, neither does the pipeline.`
              : `© ${year} Santosh Sapkota — built with care, like handmade lokta paper.`}
          </span>
        </p>
      </div>
    </footer>
  );
}
