
import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";
import { DownloadCloud, FileText } from "lucide-react";

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
              href="/Santosh_Sapkota_CV.pdf"      // path toPDF in public folder
              download                       // triggers download
              target="_blank"                 // optional: opens in new tab if download fails
              rel="noopener noreferrer"
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
