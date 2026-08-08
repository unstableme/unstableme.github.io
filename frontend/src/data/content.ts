// -----------------------------------------------------------------------------
// ALL PORTFOLIO CONTENT — single source of truth.
// Extracted verbatim from the previous site; edit here, never in components.
// -----------------------------------------------------------------------------

export const profile = {
  name: "Santosh Sapkota",
  roles: ["ML engineer", "AI enthusiast", "Computer engineer"],
  photo: "/me.jpeg",
  legacySite: "https://santoshsapkota02.com.np/",
  resumeUrl: "/Santosh_Sapkota_CV.pdf",
  email: "santoshsapkota588@gmail.com",
  phoneDisplay: "+977-98403669_ _  (Would 10*10 combinations make me safe?:)",
  phoneHref: "tel:+977-98403669--",
  location: "Kathmandu, Nepal",
  bio: {
    intro:
      "I'm Santosh, a Computer Engineer by degree with a license, having a deep passion for leveraging AI & Data Science to tackle real-world problems.",
    body:
      "Most of my time goes into building end-to-end machine learning systems — from cleaning messy data and training models to shipping them behind APIs with proper versioning, tracking, and monitoring. Healthcare ML is where I keep coming back: interpretable models that a clinician could actually trust.",
    quote:
      "\"People around say I have a good sense of humor... I don't know about that! Maybe, but if you want to see for yourself, we should work together, right? So???\"",
  },
  social: {
    github: "https://github.com/unstableme",
    linkedin: "https://www.linkedin.com/in/santosh-sapkota-5a7aa3220/",
    twitter: "https://twitter.com/unstableme02",
    instagram: "https://www.instagram.com/unstableme02/",
    medium: "https://medium.com/@unstableme02",
  },
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  fullDescription: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Intelligent Diet Planner",
    description: "Recommends diet to user based on their workout & goal.",
    image: "/IDP.jpeg",
    tags: ["Python", "Machine Learning", "KNNBasic", "Django", "HTML", "CSS", "JS"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/Intelligent_diet_planner",
    fullDescription:
      "A Django web application powered by ML to recommend diets tailored to user fitness goals.",
  },
  {
    id: 2,
    title: "Laptop Price Prediction",
    description: "Predicts laptop prices based on specifications using ML models.",
    image: "/Laptop Price Predict.jpeg",
    tags: ["Python", "Data Science", "ML Model"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/Laptop-Price-Prediction",
    fullDescription:
      "Used ML models to predict laptop prices based on hardware specifications.",
  },
  {
    id: 3,
    title: "Visa Requirement Prediction",
    description:
      "Predicts visa requirements between two countries using ML classification.",
    image: "/Visa Req Predict.jpeg",
    tags: ["Python", "Data Visualization", "ML Model"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/Visa_Requirement_Prediction",
    fullDescription:
      "Classification model predicting visa requirements between countries.",
  },
  {
    id: 4,
    title: "Book Detail Scraping",
    description: "Scraped book details using BeautifulSoup and Requests.",
    image: "/Book scraping.jpeg",
    tags: ["Python", "Beautiful Soup", "Web Scraping", "Request", "Excel"],
    demoUrl: "#",
    repoUrl: "https://github.com/unstableme/BOOKDETAILSCRAPING",
    fullDescription: "Scraped a books website and exported the scraped data into Excel.",
  },
  {
    id: 5,
    title: "Medical Appointment Shows/No-Shows",
    description:
      "Predicts whether a patient will show up for their scheduled appointment.",
    image: "/Medical Appointment.jpg",
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
    fullDescription: "ML classification models predicting patient attendance patterns.",
  },
  {
    id: 6,
    title: "Breast Cancer Prediction",
    description:
      "Predict breast cancer using a neural network trained on the UCI dataset.",
    image: "/Breast Cancer.jpg",
    tags: ["Python", "Machine Learning", "Neural Networks", "Deep Learning"],
    demoUrl: "#",
    repoUrl:
      "https://github.com/unstableme/Breast_cancer_UCI_NN/blob/main/breast_cancer_uci.ipynb",
    fullDescription: "Neural network classifier trained on UCI breast cancer dataset.",
  },
  {
    id: 7,
    title: "Unstable Photography Gallery",
    description: "Gallery for organizing my photographs.",
    image: "/Photograph gallery.jpeg",
    tags: ["Python", "Django", "HTML", "CSS", "JS", "ChatGPT", "Cloudinary", "PostgreSQL"],
    demoUrl: "https://unstable-photography.onrender.com/",
    repoUrl: "https://github.com/unstableme/Unstable_Photography",
    fullDescription:
      "Photography management web application built using Django with cloud integration.",
  },
  {
    id: 8,
    title: "Breast Cancer (IDC) Detection with CNN + Grad-CAM for Interpretability",
    description:
      "Predicts whether a histopathology image is cancerous using CNNs and uses Grad-CAM for visual explanation.",
    image: "/IDC_BC_Blue.jpeg",
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
  {
    id: 9,
    title:
      "End-to-End Deployment & Dockerization of IDC Breast Cancer Detection (FastAPI + CNN + Grad-CAM)",
    description:
      "Containerized and deployed the IDC Breast Cancer CNN + Grad-CAM model using FastAPI and Docker, then deployed on Render.",
    image: "/IDC_BC_Blue.jpeg",
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
    repoUrl: "https://github.com/unstableme/Complete_Pipeline_BreastCancerGradCAM",
    fullDescription:
      "Complete production-ready pipeline including FastAPI backend, Dockerization, Grad-CAM explainability, and deployment on Render.",
  },
  {
    id: 10,
    title: "ICU Patient Deterioration Early-Warning System (1D-CNN + GRU + MLOps)",
    description:
      "Predicts ICU patient deterioration in the next 6 hours using time-series vitals and a 1D CNN + GRU model, with full MLOps pipeline.",
    image: "/ICU_Deterioration.jpeg",
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
      "A research-grade healthcare MLOps project predicting ICU patient deterioration using 1D CNN + GRU on PhysioNet 2012 vitals. " +
      "Includes full MLOps stack: DVC for data versioning, MLflow for experiment tracking, Airflow for pipeline orchestration, " +
      "and Dockerized FastAPI deployment. Focused on clinical relevance, explainability, and end-to-end production readiness.",
  },
];

export type TimelineEntry = {
  id: string;
  kind: "experience" | "education";
  title: string;
  org: string;
  location: string;
  period: string;
  project?: string;
  bullets?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    id: "exp-ishani",
    kind: "experience",
    title: "Machine Learning Engineer",
    org: "Ishani Technology",
    location: "Lalitpur, Nepal",
    period: "Jan 2026 – Present",
    project: "Intelligent Document Management System (iDocs)",
    bullets: [
      "Built an end-to-end OCR pipeline for document digitization, combining computer vision preprocessing with Tesseract to handle noisy, scanned municipal documents.",
      "Designed a hybrid extraction system leveraging direct parsing for born-digital files and OCR fallback for scanned inputs, achieving near 100% accuracy on digital PDFs and ∼85% on scanned printed documents.",
      "Integrated an LLM-based multilingual translation pipeline (Tamang, Newari, Nepali → Nepali) with parallel processing for efficient multi-page document conversion.",
    ],
  },
  {
    id: "exp-elevvo",
    kind: "experience",
    title: "Machine Learning Intern",
    org: "Elevvo Tech",
    location: "Remote",
    period: "Aug 2025 – Sep 2025",
    bullets: [
      "Developed and evaluated end-to-end machine learning pipelines across 4 projects, utilizing SMOTE for class imbalance and performing rigorous feature engineering.",
      "Designed and trained a CNN-based image classification model using TensorFlow, implementing reproducible experimentation workflows aligned with MLOps practices.",
      "Automated data preprocessing steps, reducing manual data cleaning time by 40%.",
    ],
  },
  {
    id: "edu-bachelor",
    kind: "education",
    title: "Bachelor of Computer Engineering",
    org: "Cosmos College of Management & Technology (Pokhara University)",
    location: "Satdobato, Lalitpur",
    period: "2018 – 2023",
  },
  {
    id: "edu-plus2",
    kind: "education",
    title: "+2 Science",
    org: "NIC Secondary School (NEB)",
    location: "Dillibazaar, Kathmandu",
    period: "2016 – 2018",
  },
  {
    id: "edu-school",
    kind: "education",
    title: "School Level (Till SLC)",
    org: "Shree Janapriya Secondary School",
    location: "Jaimini, Baglung",
    period: "2006 – 2016",
  },
];

export type SkillGroup = { title: string; skills: { name: string; description: string }[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", description: "Primary language for data science and backend development" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "HTML", description: "Structure for web pages" },
      { name: "CSS", description: "Styling for web applications" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "FastAPI", description: "Python web framework for easy API development" },
      { name: "SQL - PostgreSQL", description: "Robust relational database for production applications" },
    ],
  },
  {
    title: "Data Science & Python Libraries (for ML)",
    skills: [
      { name: "Pandas", description: "Data manipulation and analysis library" },
      { name: "NumPy", description: "Numerical computing library for large datasets" },
      { name: "Matplotlib", description: "Comprehensive plotting and visualization library" },
      { name: "Seaborn", description: "Statistical data visualization library" },
      { name: "Scikit-learn", description: "Machine learning library for model training & evaluation" },
      { name: "Tensorflow", description: "ML model for training/evaluation." },
      { name: "PyTorch", description: "ML model for training/evaluation." },
      { name: "OpenCV", description: "Computer vision library for image processing" },
    ],
  },
  {
    title: "Machine Learning",
    skills: [
      {
        name: "Traditional ML Models",
        description:
          "Supervised & unsupervised algorithms like Linear Regression, Decision Trees, Random Forests, SVM, etc.",
      },
      { name: "CNN", description: "Convolutional Neural Networks for image & spatial data" },
      { name: "ResNet", description: "Residual Networks to avoid vanishing gradients" },
      { name: "YOLO", description: "Real-time object detection balancing speed & accuracy" },
      { name: "LLM", description: "Large language models for NLP tasks" },
      { name: "Fine-tuning LLM", description: "Adapting pre-trained LLMs for specific tasks" },
      { name: "Backpropagation & Optimization", description: "Gradient descent, Adam, RMSProp etc." },
      {
        name: "Attention Mechanisms",
        description: "Focus on relevant input parts for better context understanding",
      },
    ],
  },
  {
    title: "Mathematics (I love it)",
    skills: [
      { name: "Algebra", description: "Foundation for advanced mathematics" },
      { name: "Probability", description: "Used in statistical analysis and predictions" },
      { name: "Statistics", description: "Data analysis and interpretation" },
      { name: "Calculus", description: "Analytical thinking and algorithmic approach" },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git", description: "Version control system" },
      { name: "GitHub", description: "Collaboration platform for code & project management" },
      { name: "LaTeX", description: "Typesetting system for professional documents and research papers" },
      { name: "Zotero", description: "Reference manager for organizing and citing research sources" },
      { name: "Docker", description: "Containerization for reproducible deployments" },
      { name: "DVC", description: "Data versioning & pipeline management" },
      { name: "MLflow", description: "Experiment tracking and model registry" },
      { name: "Airflow", description: "Workflow orchestration for ML pipelines" },
      { name: "FastAPI", description: "Serving models through APIs" },
      { name: "Render / Deployment", description: "Cloud deployment for apps & APIs" },
      { name: "Prometheus & Grafana", description: "Monitoring the metrics and information." },
    ],
  },
];

export const workflowSteps = [
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
  "Live Demo & Monitoring (Grafana)",
];

export const publications = [
  {
    id: 1,
    title: "CNN for detection of breast cancer(IDC) + Grad-CAM for interpretability",
    description: "A CNN-based approach for classifying histopathology images.",
    image: "/IDC_BC.jpeg",
    doiUrl: "https://zenodo.org/records/16900047",
  },
];

export const articles = [
  {
    id: 1,
    title: "Impact of Artificial Intelligence on Everyday Life",
    summary: "Learn how AI has its impact on various fields.",
    date: "Feb 13, 2024",
    readTime: "4 min read",
    image: "/aihuman.jpg",
    url: "https://medium.com/@unstableme02/impact-of-artificial-intelligence-on-everyday-life-6e75af042005",
  },
  {
    id: 2,
    title: "My Life with ChatGPT: A Story of Growth, Learning, and AI",
    summary: "This is how ChatGPT has affected my life.",
    date: "March 9, 2025",
    readTime: "6 min read",
    image: "/arrival & connection.jpeg",
    url: "https://medium.com/@unstableme02/my-life-with-chatgpt-a-story-of-growth-learning-and-ai-e1eaef337e76",
  },
  {
    id: 3,
    title: "Against All Odds: The Unbelievable Triumph of Rich Strike",
    summary: "The story of Rich Strike(horse) and my take on it",
    date: "March 23, 2025",
    readTime: "4 min read",
    image: "/RichStrike_GPT.webp",
    url: "https://medium.com/@unstableme02/against-all-odds-the-unbelievable-triumph-of-rich-strike-eab8a5161282",
  },
  {
    id: 4,
    title: "Thinking about next",
    summary: "Follow on medium to get update.",
    date: "",
    readTime: "0",
    image: "/Thinking for next.jpeg",
    url: "",
  },
];

export type Hobby = {
  id: number;
  name: string;
  icon: string; // lucide icon key resolved in the component
  description: string;
  fullDescription: string; // may contain HTML links (rendered with dangerouslySetInnerHTML)
};

export const hobbies: Hobby[] = [
  {
    id: 1,
    name: "Photography",
    icon: "camera",
    description: "Capturing moments and landscapes through the lens.",
    fullDescription:
      "While exploring ideas and photographing whatever was around me, I realized that the camera allowed me to see the world from a different perspective—one that encourages mindfulness, appreciation, and a peaceful awareness of my surroundings. I guess that's why I can still remember the story behind most of my photos and even picture myself taking them. Maybe not every single one, but almost all—saying 100% would be a bit risky! <br><b>Check my Photography page: <a href='https://unstable-photography.onrender.com/' target='_blank' style='color:var(--accent-link); text-decoration: underline;'>HERE</a></b>",
  },
  {
    id: 2,
    name: "Music",
    icon: "music",
    description: "I am very thankful for this discovery.",
    fullDescription:
      "I mostly listen to the EDM, Phonk(Brazilian ones are my favorite), and song with only beat/sound without any words at all really helps me to realize and make mind composed. Here is my Spotify link: <a href='https://open.spotify.com/user/6b9hgpeoxine7nclpqknyjn6v?si=0fae3c2807b14897' target='_blank' style='color:var(--accent-link); text-decoration: underline;'>Click here</a>",
  },
  {
    id: 3,
    name: "Travelling",
    icon: "plane",
    description: "Not only viewing but feeling those places is the ultimate goal.",
    fullDescription:
      "Apart from Nepal, I plan to visit Europe especially, Switzerland, Newzealand, and some national park of US & Canada.",
  },
  {
    id: 4,
    name: "Video Editing",
    icon: "video",
    description: "Creating and editing videos for various projects.",
    fullDescription:
      "I am skilled in video editing, combining creativity and technical expertise to create engaging visuals. I enjoy transforming raw footage into compelling stories.",
  },
  {
    id: 5,
    name: "Reading",
    icon: "book",
    description: "Not for the sake of reading but to feel and implement",
    fullDescription:
      "Instead of quickly finishing and forgetting, I take my time with books that promote positivity, reading just 1–2 pages a day and gradually applying the lessons until they become a habit.",
  },
  {
    id: 6,
    name: "Coding",
    icon: "code",
    description: "I love to code to solve problems that I'm facing.",
    fullDescription:
      "I have a strong inclination for coding in Python, particularly for machine learning and data science. I have also built a website using the Django framework.",
  },
  {
    id: 7,
    name: "Research",
    icon: "search",
    description: "Diving deep into topics of interest and continuous learning.",
    fullDescription:
      "Research is a natural extension of my curiosity, and I'm truly grateful for this habit. It brings me a deep sense of fulfillment and satisfaction to explore how things work, why they function the way they do, and what underlying principles shape them. Every discovery adds to my understanding, fueling my desire to learn even more.",
  },
  {
    id: 8,
    name: "YouTube",
    icon: "youtube",
    description: "It feels good once you start seeing results",
    fullDescription:
      "I used to edit videos both long and short term content for youtube and learned a lot during that phase including video editing as well as about youtube Algorithm and many more features available in YTStudio. Wanna Check that channel? <a href='https://www.youtube.com/@EARTHIANMOTIVATION/shorts' style='color: #10B981; text-decoration: underline;'>Yes</a> ... <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' style='color: #F87171; text-decoration: underline;'>No</a>",
  },
];

// Section copy — identical in both modes for consistency (only hero strings
// and small in-card flavor text differ per identity).
export const sectionCopy = {
  about: { label: "ABOUT ME", title: "About" },
  timeline: { label: "THE TRAIL SO FAR", title: "Journey" },
  skills: { label: "WHAT I CARRY", title: "Skills" },
  projects: { label: "THINGS I BUILT", title: "Projects" },
  publications: { label: "RESEARCH WORK", title: "Publication" },
  articles: { label: "TEA-HOUSE READS", title: "Articles" },
  hobbies: { label: "OFF THE TRAIL", title: "Beyond the Code" },
  contact: { label: "SAY NAMASTE", title: "Let's Connect" },
} as const;

export const modeCopy = {
  batman: {
    heroTagline: "// SYSTEM ONLINE",
    heroScroll: "SCROLL TO RIDE",
    ...sectionCopy,
  },
  nepal: {
    heroTagline: "नमस्ते 🙏",
    heroScroll: "SCROLL TO EXPLORE",
    ...sectionCopy,
  },
} as const;
