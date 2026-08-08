import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useMode } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { TypeWriter } from "@/components/TypeWriter";
import { profile, modeCopy } from "@/data/content";
import { MountainParallax } from "@/components/effects/MountainParallax";
import { GothamBackdrop } from "@/components/effects/GothamBackdrop";

export function Hero() {
  const { mode } = useMode();
  const isBat = mode === "batman";
  const copy = modeCopy[mode];

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden">
      {isBat ? <GothamBackdrop /> : <MountainParallax />}

      {/* Name block — upper left. In Batman mode on phones it starts lower so
          it clears the bat-signal tucked into the top-right corner. */}
      <div
        className={cn(
          "relative z-10 section-container md:pt-40",
          isBat ? "pt-[27vh] sm:pt-32" : "pt-32"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p
            className={
              isBat
                ? "font-themed-mono text-sm text-muted-foreground mb-4 tracking-widest"
                : "text-xl mb-4 text-foreground/80"
            }
          >
            {copy.heroTagline}
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter text-foreground">
            Hello, I'm
            <br />
            <span className="text-primary">{profile.name}.</span>
          </h1>

          <div className="mt-6 font-themed-mono text-lg md:text-2xl text-muted-foreground flex items-center">
            <span className="text-primary mr-2">&gt;</span>
            <TypeWriter
              words={profile.roles}
              typingSpeed={50}
              erasingSpeed={30}
              delayBetweenWords={2000}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <span className="font-themed-mono text-[11px] tracking-[0.3em]">
            {copy.heroScroll}
          </span>
          {!isBat && (
            <span className="font-themed-mono text-[10px] opacity-70">▲ 8,849m — the summit</span>
          )}
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
