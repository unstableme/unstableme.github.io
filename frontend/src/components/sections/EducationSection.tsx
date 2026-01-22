
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
    <section id="education" className="section-container py-16 md:py-24" ref={ref}>
      <div className={cn(
        "opacity-0 transform translate-y-8 transition-all duration-700 ease-out-expo delay-100",
        isVisible && "opacity-100 transform-none"
      )}>
        <h2 className="text-3xl md:text-4xl mb-12 text-center">Education</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="border-l-2 border-primary/20 pl-6 md:pl-8 ml-4">
            {educationData.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  "mb-10 last:mb-0 opacity-0 transform translate-y-8 transition-all",
                  isVisible && "opacity-100 transform-none",
                  isVisible && `transition-delay-${(index + 1) * 100}`
                )}
                style={{ 
                  transitionDelay: isVisible ? `${(index + 1) * 150}ms` : '0ms',
                  transitionDuration: '700ms',
                  transitionProperty: 'all',
                  transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)'
                }}
              >
                <div className="relative">
                  <div className="absolute -left-[43px] mt-1.5 h-5 w-5 rounded-full border-4 border-background bg-primary"></div>
                  <div className="glass rounded-xl p-5 md:p-6">
                    <div className="text-sm text-muted-foreground mb-1">{item.years}</div>
                    <h3 className="text-xl font-bold mb-1">{item.degree}</h3>
                    <div className="text-base mb-3">
                      {item.institution}, {item.location}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
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
