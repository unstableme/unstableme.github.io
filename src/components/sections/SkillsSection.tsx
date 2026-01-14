import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";

type SkillCategory = {
  id: number;
  title: string;
  skills: Skill[];
  cols?: number;
};

type Skill = {
  id: number;
  name: string;
  description: string;
  icon?: string;
};

type SubCategory = {
  id: number;
  title: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    id: 1,
    title: "Programming Languages",
    skills: [
      { id: 1, name: "Python", description: "Primary language for data science and backend development" }
    ],
  },
  {
    id: 2,
    title: "Frontend",
    skills: [
      { id: 1, name: "HTML", description: "Structure for web pages" },
      { id: 2, name: "CSS", description: "Styling for web applications" },
    ],
  },
  {
    id: 3,
    title: "Backend",
    skills: [
      { id: 1, name: "FastAPI", description: "Python web framework for easy API development" },
      { id: 2, name: "SQL - SQLite3", description: "Lightweight database for local applications" }
    ],
  },
];

const dataScience: SubCategory = {
  id: 1,
  title: "Data Science & Python Libraries(for ML)",
  skills: [
    { id: 1, name: "Pandas", description: "Data manipulation and analysis library" },
    { id: 2, name: "NumPy", description: "Numerical computing library for large datasets" },
    { id: 3, name: "Matplotlib", description: "Comprehensive plotting and visualization library" },
    { id: 4, name: "Seaborn", description: "Statistical data visualization library" },
    { id: 5, name: "Scikit-learn", description: "Machine learning library for model training & evaluation" },
    { id: 6, name: "Tensorflow", description: "ML model for training/evaluation."},
    { id: 7, name: "PyTorch", description: "ML model for training/evaluation."},
  ],
};

const machineLearning: SubCategory = {
  id: 2,
  title: "Machine Learning",
  skills: [
    { id: 1, name: "Traditional ML Models", description: "Supervised & unsupervised algorithms like Linear Regression, Decision Trees, Random Forests, SVM, etc." },
    { id: 2, name: "CNN", description: "Convolutional Neural Networks for image & spatial data" },
    { id: 3, name: "ResNet", description: "Residual Networks to avoid vanishing gradients" },
    { id: 4, name: "YOLO", description: "Real-time object detection balancing speed & accuracy" },
    { id: 5, name: "LLM", description: "Large language models for NLP tasks" },
    { id: 6, name: "Fine-tuning LLM", description: "Adapting pre-trained LLMs for specific tasks" },
    { id: 7, name: "Backpropagation & Optimization", description: "Gradient descent, Adam, RMSProp etc." },
    { id: 8, name: "Attention Mechanisms", description: "Focus on relevant input parts for better context understanding" },
  ],
};

const remainingCategories: SkillCategory[] = [
  {
    id: 5,
    title: "Mathematics (I love it)",
    skills: [
      { id: 1, name: "Algebra", description: "Foundation for advanced mathematics" },
      { id: 2, name: "Probability", description: "Used in statistical analysis and predictions" },
      { id: 3, name: "Statistics", description: "Data analysis and interpretation" },
      { id: 4, name: "Calculus", description: "Analytical thinking and algorithmic approach" },
    ],
  },
  {
    id: 6,
    title: "Tools & Technologies",
    skills: [
      { id: 1, name: "Git", description: "Version control system" },
      { id: 2, name: "GitHub", description: "Collaboration platform for code & project management" },
      { id: 3, name: "LaTeX", description: "Typesetting system for professional documents and research papers" },
      { id: 4, name: "Zotero", description: "Reference manager for organizing and citing research sources" },
      { id: 5, name: "Docker", description: "Containerization for reproducible deployments" },
      { id: 6, name: "DVC", description: "Data versioning & pipeline management" },
      { id: 7, name: "MLflow", description: "Experiment tracking and model registry" },
      { id: 8, name: "Airflow", description: "Workflow orchestration for ML pipelines" },
      { id: 9, name: "FastAPI", description: "Serving models through APIs" },
      { id: 10, name: "Render / Deployment", description: "Cloud deployment for apps & APIs" },
      { id: 11, name: "Prometheus & Grafana", description: "Monitoring the metrics and information."},
    ],
  },
];

// Workflow / Synopsis
const workflowSteps = [
  "Data Collection",
  "Data Processing",
  "Model Development & Training",
  "Data & Model Versioning (DVC)",
  "Experiment Tracking & Logging (MLflow)",
  "Pipeline Orchestration (Airflow)",
  "Backend API Development",
  "Dockerization & Container Setup",
  "CI/CD Automation",
  "Deployment to Cloud (Render/Railway)",
  "Live Demo & Monitoring(Grafana)",
];

export function SkillsSection() {
  const { ref, isVisible } = useIsVisible();

  return (
    <section id="skills" className="section-container" ref={ref}>
      <div className={cn(
        "opacity-0 transform translate-y-8 transition-all duration-700 ease-out-expo delay-200",
        isVisible && "opacity-100 transform-none"
      )}>
        <h2 className="text-3xl md:text-4xl mb-12 text-center">Skills</h2>

        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <h3 className="text-xl md:text-2xl font-medium">{category.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, index) => (
                  <SkillItem key={skill.id} skill={skill} index={index} isVisible={isVisible} />
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-medium">Data Science & Machine Learning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-lg font-medium text-primary/80">{dataScience.title}</h4>
                <div className="grid grid-cols-2 gap-4">
                  {dataScience.skills.map((skill, index) => (
                    <SkillItem key={skill.id} skill={skill} index={index} isVisible={isVisible} />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-medium text-primary/80">{machineLearning.title}</h4>
                <div className="grid grid-cols-2 gap-4">
                  {machineLearning.skills.map((skill, index) => (
                    <SkillItem key={skill.id} skill={skill} index={index} isVisible={isVisible} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {remainingCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <h3 className="text-xl md:text-2xl font-medium">{category.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.skills.map((skill, index) => (
                  <SkillItem key={skill.id} skill={skill} index={index} isVisible={isVisible} />
                ))}
              </div>
            </div>
          ))}

          {/* SYNOPSIS */}
          <div className="mt-16">
            <h3 className="text-xl md:text-2xl font-medium mb-6 text-center">Synopsis</h3>
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
              {workflowSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={cn(
                      "px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 text-sm font-medium cursor-default transform transition-all hover:scale-105 hover:shadow-lg",
                      isVisible && "opacity-100 animate-fade-in"
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "forwards",
                      animationDuration: "600ms",
                    }}
                  >
                    {step}
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <span className="mx-1 md:mx-2 text-primary font-bold select-none">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillItem({ skill, index, isVisible }: { skill: Skill, index: number, isVisible: boolean }) {
  return (
    <div 
      className={cn(
        "glass p-4 rounded-xl text-center transform opacity-0 transition-all cursor-default hover:shadow-lg hover:-translate-y-1",
        "dark:bg-black/20 dark:border-white/10 dark:hover:shadow-white/20",
        "bg-gray-50 border border-gray-200 shadow-sm", // Light mode styling
        isVisible && "opacity-100 animate-fade-in"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards',
        animationDuration: '600ms'
      }}
      title={skill.description} // tooltip on hover
    >
      <div className="font-medium">{skill.name}</div>
    </div>
  );
}
