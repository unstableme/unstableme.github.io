import { useEffect, useRef, useState } from "react";
import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, X } from "lucide-react";

// -----------------------------------------------------------------------------
// UPDATED PROJECT LIST — NEWEST → OLDEST (INTELLIGENT DIET PLANNER ADDED)
// -----------------------------------------------------------------------------
const projectsData = [
  // 1. OLDEST — Intelligent Diet Planner
  {
    id: 1,
    title: "Intelligent Diet Planner",
    description: "Recommends diet to user based on their workout & goal.",
    image: "/IDP.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Machine Learning", "KNNBasic", "Django", "HTML", "CSS", "JS"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/Intelligent_diet_planner",
    fullDescription:
      "A Django web application powered by ML to recommend diets tailored to user fitness goals.",
  },

  // 2. Laptop Price Prediction
  {
    id: 2,
    title: "Laptop Price Prediction",
    description:
      "Predicts laptop prices based on specifications using ML models.",
    image: "/Laptop Price Predict.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Data Science", "ML Model"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/Laptop-Price-Prediction",
    fullDescription:
      "Used ML models to predict laptop prices based on hardware specifications.",
  },

  // 3. Visa Requirement Prediction
  {
    id: 3,
    title: "Visa Requirement Prediction",
    description:
      "Predicts visa requirements between two countries using ML classification.",
    image: "/Visa Req Predict.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Data Visualization", "ML Model"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/Visa_Requirement_Prediction",
    fullDescription:
      "Classification model predicting visa requirements between countries.",
  },

  // 4. Book Detail Scraping
  {
    id: 4,
    title: "Book Detail Scraping",
    description: "Scraped book details using BeautifulSoup and Requests.",
    image: "/Book scraping.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Beautiful Soup", "Web Scraping", "Request", "Excel"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/BOOKDETAILSCRAPING",
    fullDescription:
      "Scraped a books website and exported the scraped data into Excel.",
  },

  // 5. Medical Appointment No-Shows
  {
    id: 5,
    title: "Medical Appointment Shows/No-Shows",
    description:
      "Predicts whether a patient will show up for their scheduled appointment.",
    image: "/Medical Appointment.jpg?auto=format&fit=crop&w=800&q=80",
    tags: [
      "Python",
      "Machine Learning",
      "Classification",
      "Logistic Regression",
      "Random Forest",
      "Boosting Algorithms",
    ],
    demoUrl: "#",
    repoUrl:
      "https://github.com/unstableme/Medical_appointment_noshows-shows/blob/main/appointment_show.ipynb",
    fullDescription:
      "ML classification models predicting patient attendance patterns.",
  },

  // 6. Breast Cancer Prediction (UCI)
  {
    id: 6,
    title: "Breast Cancer Prediction",
    description:
      "Predict breast cancer using a neural network trained on the UCI dataset.",
    image: "/Breast Cancer.jpg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Machine Learning", "Neural Networks", "Deep Learning"],
    demoUrl: "#",
    repoUrl:
      "https://github.com/unstableme/Breast_cancer_UCI_NN/blob/main/breast_cancer_uci.ipynb",
    fullDescription:
      "Neural network classifier trained on UCI breast cancer dataset.",
  },

  // 7. Unstable Photography
  {
    id: 7,
    title: "Unstable Photography Gallery",
    description: "Gallery for organizing my photographs.",
    image: "/Photograph gallery.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: [
      "Python",
      "Django",
      "HTML",
      "CSS",
      "JS",
      "ChatGPT",
      "Cloudinary",
      "PostgreSQL",
    ],
    demoUrl: "https://unstable-photography.onrender.com/",
    repoUrl: "https://github.com/unstableme/Unstable_Photography",
    fullDescription:
      "Photography management web application built using Django with cloud integration.",
  },

  // 8. IDC CNN + Grad-CAM
  {
    id: 8,
    title:
      "Breast Cancer (IDC) Detection with CNN + Grad-CAM for Interpretability",
    description:
      "Predicts whether a histopathology image is cancerous using CNNs and uses Grad-CAM for visual explanation.",
    image: "/IDC_BC_Blue.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: [
      "Convolutional Neural Networks",
      "Deep Learning",
      "Neural Networks",
      "Medical Imaging",
      "Grad-CAM",
    ],
    demoUrl: "https://idc-frontend-latest.onrender.com/",
    repoUrl: "https://github.com/unstableme/IDC_CNN-Grad-CAM",
    fullDescription:
      "Trained a deep CNN on histopathology images and used Grad-CAM for transparent model interpretation.",
  },

  // 9. NEWEST — End-to-End Deployment
  {
    id: 9,
    title:
      "End-to-End Deployment & Dockerization of IDC Breast Cancer Detection (FastAPI + CNN + Grad-CAM)",
    description:
      "Containerized and deployed the IDC Breast Cancer CNN + Grad-CAM model using FastAPI and Docker, then deployed on Render.",
    image: "/IDC_BC_Blue.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: [
      "FastAPI",
      "Docker",
      "CI/CD Pipeline",
      "Deployment",
      "Convolutional Neural Networks",
      "Deep Learning",
      "Grad-CAM",
    ],
    demoUrl: "https://idc-frontend-latest.onrender.com/",
    repoUrl:
      "https://github.com/unstableme/Complete_Pipeline_BreastCancerGradCAM",
    fullDescription:
      "Complete production-ready pipeline including FastAPI backend, Dockerization, Grad-CAM explainability, and deployment on Render.",
  },

  // 10. NEW — ICU Patient Deterioration Early-Warning System
  {
    id: 10,
    title: "ICU Patient Deterioration Early-Warning System (1D-CNN + GRU + MLOps)",
    description:
      "Predicts ICU patient deterioration in the next 6 hours using time-series vitals and a 1D CNN + GRU model, with full MLOps pipeline.",
    image: "/ICU_Deterioration.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: [
      "Python",
      "Deep Learning",
      "1D-CNN",
      "GRU",
      "Time-Series",
      "MLOps",
      "DVC",
      "MLflow",
      "Airflow",
      "FastAPI",
      "Docker",
      "Prometheus",
      "Grafana",
      "EvidentlyAI",
      "Deployment",
    ],
    demoUrl: "https://icu-deterioration-frontend-production.up.railway.app/",
    repoUrl: "https://github.com/unstableme/ICU-Deterioration-MLOps",
    fullDescription:
      "A research-grade healthcare MLOps project predicting ICU patient deterioration using 1D CNN + GRU on PhysioNet 2012 vitals. "
      + "Includes full MLOps stack: DVC for data versioning, MLflow for experiment tracking, Airflow for pipeline orchestration, "
      + "and Dockerized FastAPI deployment. Focused on clinical relevance, explainability, and end-to-end production readiness.",
  },



];


// -----------------------------------------------------------------------------
// FLIP ANIMATION HOOK
// -----------------------------------------------------------------------------
function useFlipAnimation(dependencies: any[]) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];

    const firstRects = children.map((child) => child.getBoundingClientRect());

    requestAnimationFrame(() => {
      const lastRects = children.map((child) =>
        child.getBoundingClientRect()
      );

      children.forEach((child, i) => {
        const first = firstRects[i];
        const last = lastRects[i];
        if (!first || !last) return;

        const dx = first.left - last.left;
        const dy = first.top - last.top;

        child.animate(
          [
            { transform: `translate(${dx}px, ${dy}px)` },
            { transform: "translate(0, 0)" },
          ],
          {
            duration: 450,
            easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
          }
        );
      });
    });
  }, dependencies);

  return ref;
}

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
export function ProjectsSection() {
  const { ref, isVisible } = useIsVisible();
  const [selectedProject, setSelectedProject] =
    useState<null | (typeof projectsData)[0]>(null);

  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const sortedProjects = [...projectsData].sort((a, b) =>
    sortOrder === "latest" ? a.id - b.id : b.id - a.id
  );

  const flipRef = useFlipAnimation([sortOrder]);

  const openModal = (project: (typeof projectsData)[0]) => {
    setSelectedProject(project);
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <>
      <section id="projects" className="section-container" ref={ref}>
        <div
          className={cn(
            "opacity-0 transform translate-y-8 transition-all duration-700 ease-out-expo delay-300",
            isVisible && "opacity-100 transform-none"
          )}
        >
          <h2 className="text-3xl md:text-4xl mb-12 text-center">Projects</h2>

          {/* SORT UI */}
          <div className="flex justify-end items-center mb-6 gap-2">
            <span className="text-sm opacity-70">Sort by:</span>

            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "latest" | "oldest")
              }
              className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-sm"
            >
              <option className="text-black" value="latest">
                Oldest → Newest
              </option>
              <option className="text-black" value="oldest">
                Newest → Oldest
              </option>
            </select>
          </div>

          {/* PROJECT GRID WITH FLIP ANIMATION */}
          <div
            ref={flipRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6"
          >
            {sortedProjects.map((project, index) => (
              <div
                key={project.id}
                className={cn(
                  "glass rounded-xl overflow-hidden transform opacity-0 card-hover cursor-pointer",
                  isVisible && "opacity-100 animate-fade-in"
                )}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "forwards",
                  animationDuration: "700ms",
                }}
                onClick={() => openModal(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs py-1 px-2 bg-primary/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs py-1 px-2 bg-primary/10 rounded-full">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all"
          onClick={closeModal}
        >
          <div
            className="bg-background relative rounded-xl w-full max-w-3xl max-h-[90vh] overflow-auto animate-fade-in shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-black/10 text-foreground z-10"
              onClick={closeModal}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-60 md:h-72">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">
                {selectedProject.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs py-1 px-2 bg-primary/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-base text-foreground/80 mb-6 leading-relaxed">
                {selectedProject.fullDescription}
              </p>

              <div className="flex space-x-4">
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </a>

                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 text-foreground hover:bg-primary/10 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>Source Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
