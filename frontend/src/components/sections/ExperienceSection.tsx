
import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";

const experienceData = [
  {
    id: 1,
    role: "Machine Learning Engineer",
    company: "Ishani Technology",
    location: "Lalitpur, Nepal",
    period: "Jan 2026 – Present",
    project: "Intelligent Document Management System (iDocs)",
    bullets: [
      "Built an end-to-end OCR pipeline for document digitization, combining computer vision preprocessing with Tesseract to handle noisy, scanned municipal documents.",
      "Designed a hybrid extraction system leveraging direct parsing for born-digital files and OCR fallback for scanned inputs, achieving near 100% accuracy on digital PDFs and ∼85% on scanned printed documents.",
      "Integrated an LLM-based multilingual translation pipeline (Tamang, Newari, Nepali → Nepali) with parallel processing for efficient multi-page document conversion."
    ]
  },
  {
    id: 2,
    role: "Machine Learning Intern",
    company: "Elevvo Tech",
    location: "Remote",
    period: "Aug 2025 – Sep 2025",
    bullets: [
      "Developed and evaluated end-to-end machine learning pipelines across 4 projects, utilizing SMOTE for class imbalance and performing rigorous feature engineering.",
      "Designed and trained a CNN-based image classification model using TensorFlow, implementing reproducible experimentation workflows aligned with MLOps practices.",
      "Automated data preprocessing steps, reducing manual data cleaning time by 40%."
    ]
  }
];

export function ExperienceSection() {
  const { ref, isVisible } = useIsVisible();
  
  return (
    <section id="experience" className="section-container py-24 md:py-32" ref={ref}>
      <div className={cn(
        "opacity-0 transform translate-y-8 transition-all duration-1000 ease-out-expo delay-100",
        isVisible && "opacity-100 transform-none"
      )}>
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-foreground tracking-tighter">
          Experience
        </h2>
        
        <div className="max-w-4xl">
          <div className="relative border-l border-primary/20 pl-8 ml-4 md:ml-6 space-y-16">
            {experienceData.map((item, index) => (
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
                
                <div className="flex flex-col gap-4 group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {item.role}
                      </h3>
                      <div className="text-lg text-muted-foreground mt-1 flex items-center gap-2">
                        <span className="font-semibold text-primary/80">{item.company}</span>
                        <span className="text-muted-foreground/40 hidden md:inline">•</span>
                        <span className="text-sm uppercase tracking-widest font-mono text-primary/60">{item.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-primary/30 hidden md:block"></div>
                      <div className="bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-none text-primary font-mono text-sm whitespace-nowrap">
                        {item.period}
                      </div>
                    </div>
                  </div>

                  {item.project && (
                    <div className="text-sm font-semibold text-primary/70 italic">
                      Project: {item.project}
                    </div>
                  )}

                  <ul className="space-y-3 mt-2">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
