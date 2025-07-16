import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";

const publicationsData = [
  {
    id: 1,
    title: "CNN for detection of breast cancer(IDC) + Grad-CAM for interpretability",
    description: "A CNN-based approach for classifying histopathology images.",
    image: "/IDC_BC.jpeg",
    doiUrl: "https://doi.org/10.5281/zenodo.15927637",
  },
  // add more publications here...
];

export function PublicationSection() {
  const { ref, isVisible } = useIsVisible();

  return (
    <section id="publications" className="section-container" ref={ref}>
      <div
        className={cn(
          "opacity-0 transform translate-y-8 transition-all duration-700 ease-out-expo delay-600",
          isVisible && "opacity-100 transform-none"
        )}
      >
        <h2 className="text-3xl md:text-4xl mb-12 text-center">Publications</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
          {publicationsData.map((pub, index) => (
            <a
              key={pub.id}
              href={pub.doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "glass rounded-xl overflow-hidden transform opacity-0 card-hover block",
                isVisible && "opacity-100 animate-fade-in"
              )}
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "forwards",
                animationDuration: "700ms",
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pub.image}
                  alt={pub.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{pub.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pub.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
