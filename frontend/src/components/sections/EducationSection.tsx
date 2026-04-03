
import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";

const educationData = [
  {
    id: 1,
    degree: "Bachelor of Computer Engineering",
    institution: "Cosmos College of Management & Technology{Pokhara University}",
    location: "Satdobato, Lalitpur",
    years: "2018 - 2023" 
  },
  {
    id: 2,
    degree: "+2 Science",
    institution: "NIC Secondary School (NEB)",
    location: "Dillibazaar, Kathmandu",
    years: "2016 - 2018"   
  },
  {
    id: 3,
    degree: "School Level (Till SLC)",
    institution: "Shree Janapriya Secondary School",
    location: "Jaimini, Baglung",
    years: "2006 - 2016"
  }
];

export function EducationSection() {
  const { ref, isVisible } = useIsVisible();
  
  return (
    <section id="education" className="section-container py-24 md:py-32" ref={ref}>
      <div className={cn(
        "opacity-0 transform translate-y-8 transition-all duration-1000 ease-out-expo delay-100",
        isVisible && "opacity-100 transform-none"
      )}>
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-foreground tracking-tighter">
          Education
        </h2>
        
        <div className="max-w-3xl">
          <div className="relative border-l border-primary/20 pl-8 ml-4 md:ml-6 space-y-12">
            {educationData.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  "relative opacity-0 transform translate-y-8 transition-all",
                  isVisible && "opacity-100 transform-none"
                )}
                style={{ 
                  transitionDelay: isVisible ? `${(index + 1) * 150}ms` : '0ms',
                  transitionDuration: '800ms',
                  transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)'
                }}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-[#050505] bg-primary shadow-[0_0_10px_rgba(0,245,255,0.5)]"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {item.degree}
                    </h3>
                    <div className="text-lg text-muted-foreground mt-1">
                      {item.institution}
                    </div>
                    <div className="text-sm text-primary/60 mt-1 uppercase tracking-widest font-mono">
                      {item.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-primary/30 hidden md:block"></div>
                    <div className="bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-none text-primary font-mono text-sm whitespace-nowrap">
                      {item.years}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
