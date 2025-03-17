
import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

const articlesData = [
  {
    id: 1,
    title: "Impact of Artificial Intelligence on Everyday Life",
    summary: "Learn how AI has its impact on various fields.",
    date: "Feb 13, 2024",
    readTime: "4 min read",
    image: "/aihuman.jpg",
    url: "https://medium.com/@unstableme02/impact-of-artificial-intelligence-on-everyday-life-6e75af042005"
  },
  {
    id: 2,
    title: "My Life with ChatGPT: A Story of Growth, Learning, and AI",
    summary: "This is how ChatGPT has affected my life.",
    date: "March 9, 2025",
    readTime: "6 min read",
    image: "/arrival & connection.jpeg",
    url: "https://medium.com/@unstableme02/my-life-with-chatgpt-a-story-of-growth-learning-and-ai-e1eaef337e76"
  },
  {
    id: 3,
    title: "Thinking about next",
    summary: "Follow on medium to get update.",
    date: "",
    readTime: "0",
    image: "/Thinking for next.jpeg",
    url: ""
  }
];

export function ArticlesSection() {
  const { ref, isVisible } = useIsVisible();
  
  return (
    <section id="articles" className="section-container" ref={ref}>
      <div className={cn(
        "opacity-0 transform translate-y-8 transition-all duration-700 ease-out-expo delay-400",
        isVisible && "opacity-100 transform-none"
      )}>
        <h2 className="text-3xl md:text-4xl mb-12 text-center">Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
          {articlesData.map((article, index) => (
            <a 
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "glass rounded-xl overflow-hidden transform opacity-0 card-hover group",
                isVisible && "opacity-100 animate-fade-in"
              )}
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards',
                animationDuration: '700ms'
              }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground">{article.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
