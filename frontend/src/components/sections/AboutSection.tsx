
import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const { ref, isVisible } = useIsVisible();
  
  return (
    <section id="about" className="section-container min-h-[80vh] flex flex-col justify-center py-24 md:py-32" ref={ref}>
      <div className={cn(
        "opacity-0 transform translate-y-8 transition-all duration-1000 ease-out-expo",
        isVisible && "opacity-100 transform-none"
      )}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start tracking-tighter">
          {/* Portrait Column */}
          <div className="w-full lg:w-1/3 relative group">
            <div className="h-[400px] md:h-[450px] overflow-hidden rounded-none border border-white/10 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src="/me.jpeg" 
                alt="Portrait of Santosh Sapkota" 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 right-6">
                 <div className="text-2xl md:text-3xl font-black text-white italic opacity-80 select-none uppercase tracking-tighter">ML Engineer</div>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -inset-4 border border-primary/20 -z-0 translate-x-2 translate-y-2 lg:translate-x-4 lg:translate-y-4"></div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-2/3 flex flex-col pt-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">
              About
            </h2>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-xl">
              <p>
                I'm Santosh, a <span className="text-foreground font-semibold border-b border-primary/20">Computer Engineer</span> by Degree with a license, having a deep passion for leveraging <span className="text-primary font-medium">AI & Data Science</span> to tackle real-world problems.
              </p>
              <p>
                This is my short intro—if you want to learn more, you can visit other sections as well (else, why would I make them, right? 😉).
              </p>
              <p className="border-l-2 border-primary/30 pl-4 py-2 italic bg-muted/30">
                "People around say I have a good sense of humor... I don't know about that! Maybe, but if you want to see for yourself, we should work together, right? So???"
              </p>
              <div className="pt-4">
                 <a 
                  href='https://santoshsapkota02.com.np/' 
                  className="group flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span className="border-b-2 border-primary">Check my legacy site</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
