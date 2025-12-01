
import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";
import { TypeWriter } from "@/components/TypeWriter";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const { ref, isVisible } = useIsVisible({
    threshold: 0.1,
    rootMargin: "0px 0px 0px 0px"
  });
  
  const roles = [ " Computer Engineer","Data Scientist", "ML Engineer",  "AI Enthusiast"];
  
  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col justify-center items-center relative py-16 md:py-24"
      ref={ref}
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container relative z-10">
        <div 
          className={cn(
            "text-center max-w-3xl mx-auto opacity-0 transform translate-y-8 transition-all duration-1000 ease-out-expo",
            isVisible && "opacity-100 transform-none"
          )}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            Hello, I am <span className="text-gradient from-primary to-primary/70">Santosh Sapkota</span>, and I am...
          </h1>
          <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary/90 h-16 md:h-24 flex justify-center items-center">
            <TypeWriter 
              words={roles} 
              typingSpeed={30} // Even faster typing
              erasingSpeed={30} // Even faster erasing
              delayBetweenWords={1500} 
            />
          </div>
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-700 delay-1000",
          isVisible && "opacity-100"
        )}
      >
        <button 
          onClick={() => {
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: "smooth" });
            }
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
