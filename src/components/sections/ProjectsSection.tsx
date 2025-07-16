
import { useState } from "react";
import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, X } from "lucide-react";

const projectsData = [
  {
  id: 1,
    title: "Breast Cancer Prediction",
    description: "Predict whether someone has breast cancer or not with the help of Neural Networks.",
    image: "/Breast Cancer.jpg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Machine Learning", "Neural Networks", "Deep Learning"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/Breast_cancer_UCI_NN/blob/main/breast_cancer_uci.ipynb",
    fullDescription: "I used neural networks (deep learning) to classify based on UCI dataset whether someone has breast cancer or not."
  },
  {
    id: 2,
    title: "Medical Appointment Shows/No-Shows",
    description: "Analyze and finds out whether someone after booking a date, shows up in appointment or not.",
    image: "/Medical Appointment.jpg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Machine Learning", "Classification", "Logistic Regression",'Random Forest', 'Boosting Algorithm', 'Bagging Algorithm'],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/Medical_appointment_noshows-shows/blob/main/appointment_show.ipynb",
    fullDescription: "I used different classification algorithms like logistic regression, different boosting and bagging algorithms to classify the data whether someone shows up in the scheduled date or not and determined which variable affects the most."
  },

  {
    id: 3,
    title: "Intelligent Diet Planner",
    description: "Recommends diet to user based on their workout & goal.",
    image: "/IDP.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Machine Learning", "KNNBasic", "Django",'HTML', 'CSS', 'JS'],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/Intelligent_diet_planner",
    fullDescription: "It is a website made using the Django framework and trained with a Machine Learning algorithm that provides meal options for users according to their requirements."
  },
  {
    id: 4,
    title: "Visa Requirement Prediction",
    description: "A model to predict whether the country requires visa or not.",
    image: "/Visa Req Predict.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Jupyter Notebook", "Data Visualization", "Data Preprocessing", "ML Model"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/Visa_Requirement_Prediction",
    fullDescription: "I used Classification ML algorithm to predict whether traveling from country A to country B requires a visa or not."
  },
  {
    id: 5,
    title: "Laptop Price Prediction",
    description: "A model to predict different laptop's price based on their specification like name, model, storage, etc.",
    image: "/Laptop Price Predict.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Data Science", "Data Visualization", "Data Preprocessing", "ML Model"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/Laptop-Price-Prediction",
    fullDescription: "I used different Machine Learning models to predict the Price of Laptop on the basis of different features including RAM, GPU, Manufacturer, Storage etc."
  },
  {
    id: 6,
    title: "Book Detail Scraping",
    description: "Used Python package to scrap the book details from website.",
    image: "/Book scraping.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Beautiful Soup", "Web Scraping", "Request", "Excel"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/BOOKDETAILSCRAPING",
    fullDescription: "I performed webscraping using BeautifulSoup and Request module using Python and exported in Excel sheets."
  },
  {
    id: 7,
    title: "Unstable Photography Gallery",
    description: "Gallery for organizing my photographs",
    image: "/Photograph gallery.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Django", "HTML", "CSS", "JS","ChatGPT","Cloudinary","PostgreSQL"],
    demoUrl: "https://unstable-photography.onrender.com/",
    repoUrl: "https://github.com/unstableme/Unstable_Photography",
    fullDescription: "I made this website in 10 days with the help of ChatGPT for organizing my photographs."
  },

  {
  id: 8,
    title: "Breast Cancer(IDC)Detection with CNN + Grad-CAM for Interpretability",
    description: "Predict whether someone has breast cancer or not with the help of  Conovolutional Neural Networks and used Grad-CAM for interpretability on why model choses that decision.",
    image: "/IDC_BC_Blue.jpeg?auto=format&fit=crop&w=800&q=80",
    tags: ["Convolutional Neural Networks", "Deep Learning", "Neural Networks", "Medical Imaginig", "Histopathological Images", "Invasive Ductal Carcinoma"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/IDC_CNN-Grad-CAM",
    fullDescription: "I used Convolutional neural networks (deep learning) to classify histopathological image whether the given image is cancerous or not and for explainability and transparency of model's decision Grad-CAM was deployed."
  },
];

export function ProjectsSection() {
  const { ref, isVisible } = useIsVisible();
  const [selectedProject, setSelectedProject] = useState<null | (typeof projectsData)[0]>(null);
  
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
        <div className={cn(
          "opacity-0 transform translate-y-8 transition-all duration-700 ease-out-expo delay-300",
          isVisible && "opacity-100 transform-none"
        )}>
          <h2 className="text-3xl md:text-4xl mb-12 text-center">Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
            {projectsData.map((project, index) => (
              <div 
                key={project.id}
                className={cn(
                  "glass rounded-xl overflow-hidden transform opacity-0 card-hover cursor-pointer",
                  isVisible && "opacity-100 animate-fade-in"
                )}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'forwards',
                  animationDuration: '700ms'
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
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs py-1 px-2 bg-primary/10 rounded-full">
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
      
      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all"
        onClick={closeModal}  // Close modal on clicking outside
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
              <h3 className="text-2xl font-bold mb-3">{selectedProject.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="text-xs py-1 px-2 bg-primary/10 rounded-full">
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
