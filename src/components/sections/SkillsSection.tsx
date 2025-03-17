
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
      { id: 1, name: "C", description: "Used for system programming and embedded systems" },
      { id: 2, name: "C++", description: "Used for performance-critical applications" },
      { id: 3, name: "Python", description: "Primary language for data science and backend development" },
    ],
  },
  {
    id: 2,
    title: "Frontend",
    skills: [
      { id: 1, name: "HTML", description: "Structure for web pages" },
      { id: 2, name: "CSS", description: "Styling for web applications" },
      { id: 3, name: "JavaScript", description: "Interactive elements and functionality" },
    ],
  },
  {
    id: 3,
    title: "Backend",
    skills: [
      { id: 1, name: "Django", description: "Python web framework for rapid development" },
      { id: 2, name: "SQL - DBSQLite3", description: "Lightweight database for local applications" },
      { id: 3, name: "PostgreSQL", description: "Advanced relational database for production" },
    ],
  },
];

const dataScience: SubCategory = {
  id: 1,
  title: "Data Science",
  skills: [
    { id: 1, name: "Seaborn", description: "Statistical data visualization library" },
    { id: 2, name: "Matplotlib", description: "Comprehensive plotting and visualization library" },
    { id: 3, name: "Pandas", description: "Data manipulation and analysis library" },
    { id: 4, name: "NumPy", description: "Numerical computing library for large datasets" },
  ],
};

const machineLearning: SubCategory = {
  id: 2,
  title: "Machine Learning",
  skills: [
    { id: 1, name: "Supervised Learning", description: "ML with labeled training data" },
    { id: 2, name: "Unsupervised Learning", description: "ML with unlabeled training data" },
  ],
};

const remainingCategories: SkillCategory[] = [
  {
    id: 5,
    title: "Mathematics",
    skills: [
      { id: 1, name: "Algebra", description: "Foundation for advanced mathematics" },
      { id: 2, name: "Probability", description: "Used in statistical analysis and predictions" },
      { id: 3, name: "Statistics", description: "Data analysis and interpretation" },
      { id: 4, name: "Problem Solving", description: "Analytical thinking and algorithmic approach" },
    ],
  },
  {
    id: 6,
    title: "Tools & Technologies",
    skills: [
      { id: 1, name: "Git", description: "Version control system" },
      { id: 2, name: "GitHub", description: "Collaboration platform for code" },
      { id: 3, name: "Web Scraping", description: "Automated data extraction from websites" },
      { id: 4, name: "ChatGPT", description: "AI Agent" },
    ],
  },
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
                  <SkillItem 
                    key={skill.id} 
                    skill={skill} 
                    index={index} 
                    isVisible={isVisible} 
                  />
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
                    <SkillItem 
                      key={skill.id} 
                      skill={skill} 
                      index={index} 
                      isVisible={isVisible} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-lg font-medium text-primary/80">{machineLearning.title}</h4>
                <div className="grid grid-cols-2 gap-4">
                  {machineLearning.skills.map((skill, index) => (
                    <SkillItem 
                      key={skill.id} 
                      skill={skill} 
                      index={index} 
                      isVisible={isVisible} 
                    />
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
                  <SkillItem 
                    key={skill.id} 
                    skill={skill} 
                    index={index} 
                    isVisible={isVisible} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillItem({ skill, index, isVisible }: { skill: Skill, index: number, isVisible: boolean }) {
  return (
    <div 
      className={cn(
        "glass p-4 rounded-xl text-center transform opacity-0 transition-all hover:shadow-lg hover:-translate-y-1",
        "dark:bg-black/20 dark:border-white/10",
        "bg-gray-50 border border-gray-200 shadow-sm", // Light mode styling
        isVisible && "opacity-100 animate-fade-in"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards',
        animationDuration: '600ms'
      }}
    >
      <div className="font-medium">{skill.name}</div>
    </div>
  );
}
