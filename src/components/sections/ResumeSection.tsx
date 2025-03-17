
import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";
import { DownloadCloud, FileText } from "lucide-react";

/*
const resumeData = {
  experiences: [
    {
      id: 1,
      position: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      period: "2020 - Present",
      responsibilities: [
        "Lead development of microservices architecture for the company's flagship product",
        "Mentored junior developers and conducted code reviews",
        "Implemented CI/CD pipelines that reduced deployment time by 40%",
        "Architected scalable backend systems using Node.js and AWS"
      ]
    },
    {
      id: 2,
      position: "Software Engineer",
      company: "InnovateTech",
      location: "New York, NY",
      period: "2018 - 2020",
      responsibilities: [
        "Developed and maintained RESTful APIs using Express and MongoDB",
        "Built responsive frontend applications with React and Redux",
        "Collaborated with UX designers to implement intuitive user interfaces",
        "Participated in agile development processes with 2-week sprint cycles"
      ]
    }
  ]
};


export function ResumeSection() {
  const { ref, isVisible } = useIsVisible();
  
  return (
    <section id="resume" className="section-container" ref={ref}>
      <div className={cn(
        "opacity-0 transform translate-y-8 transition-all duration-700 ease-out-expo delay-600",
        isVisible && "opacity-100 transform-none"
      )}>
        <h2 className="text-3xl md:text-4xl mb-12 text-center">Resume</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-xl p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Work Experience
            </h3>
            
            <div className="space-y-8">
              {resumeData.experiences.map((exp, index) => (
                <div 
                  key={exp.id}
                  className={cn(
                    "opacity-0 transform translate-y-4",
                    isVisible && "opacity-100 transform-none transition-all duration-500"
                  )}
                  style={{ transitionDelay: isVisible ? `${index * 200}ms` : '0ms' }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <h4 className="text-lg font-medium">{exp.position}</h4>
                    <div className="text-sm text-muted-foreground">{exp.period}</div>
                  </div>
                  <div className="text-base mb-3">{exp.company}, {exp.location}</div>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <a 
              href="#" 
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group"
            >
              <DownloadCloud className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
              <span>Download Full Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
*/


export function ResumeSection() {
  const { ref, isVisible } = useIsVisible();

  return (
    <section id="resume" className="section-container" ref={ref}>
      <div
        className={cn(
          "opacity-0 transform translate-y-8 transition-all duration-700 ease-out-expo delay-600",
          isVisible && "opacity-100 transform-none"
        )}
      >
        <h2 className="text-3xl md:text-4xl mb-12 text-center">Resume</h2>

        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-xl p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <DownloadCloud className="mr-2 h-5 w-5" />
              Access My Resume
            </h3>

            <div className="space-y-8">
              <p>
                You can access my full resume from the link below. I will update it with the PDF version soon!
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group"
            >
              <DownloadCloud className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
              <span>Access My Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
