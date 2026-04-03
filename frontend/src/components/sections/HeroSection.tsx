import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";
import { TypeWriter } from "@/components/TypeWriter";
import { ArrowDown } from "lucide-react";
import { CursorSmoke } from "@/components/sections/CursorSmoke";


export function HeroSection() {
  const { ref, isVisible } = useIsVisible({
    threshold: 0.1,
    rootMargin: "0px 0px 0px 0px"
  });

  return (
    <section
      id="hero"
      className="min-h-[60vh] flex flex-col justify-start items-center relative py-10 md:py-20 overflow-hidden"
      ref={ref}
    >
      {/* Cursor smoke */}
      <CursorSmoke />

      {/* Existing background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 md:px-12">
        <div
          className={cn(
            "text-left max-w-5xl opacity-0 transform translate-y-8 transition-all duration-1000 ease-out-expo lg:-ml-12",
            isVisible && "opacity-100 transform-none"
          )}
        >
          <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-2 text-foreground">
            Hello, I'm <br />
            Santosh Sapkota.
          </h1>

          <h2 className="text-4xl md:text-7xl font-bold cyan-gradient-text tracking-tighter mt-4 leading-tight">
            and I am <br /> 
            <span className="flex items-center gap-4">
              <span className="text-primary font-bold">
                <TypeWriter
                  words={["ML engineer", "AI enthusiast", "Computer engineer"]}
                  typingSpeed={50}
                  erasingSpeed={30}
                  delayBetweenWords={2000}
                />
              </span>
              <span className="h-[2px] w-12 bg-primary inline-block"></span>
            </span>
          </h2>
        </div>
      </div>

      {/* Scroll down */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-700 delay-1000",
          isVisible && "opacity-100"
        )}
      >
        <button
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <span className="mb-2">Scroll down</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
