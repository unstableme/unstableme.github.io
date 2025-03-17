
import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const { ref, isVisible } = useIsVisible();
  
  return (
    <section id="about" className="section-container" ref={ref}>
      <div className={cn(
        "opacity-0 transition-all duration-700 ease-out-expo",
        isVisible && "opacity-100"
      )}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-6 text-center">About Me</h2>
          <div className="glass p-6 md:p-8 rounded-2xl">
          <p className="text-base md:text-lg leading-relaxed mb-4">
             I'm Santosh, a Computer engineer by Degree with a license having a passion for leveraging AI & data science for tackling real-world problems. 
             <br />
             This is my short intro, if you want to learn more, you can visit other sections as well, else why would I make them, right? ;)
          </p>
            <p className="text-base md:text-lg leading-relaxed">
            People around call me I have good sense of humour, don't know about that! Maybe, but if you want to see, we must work together, right? So???
            <br />
            Check my old site here: <a href='https://santoshsapkota02.com.np/' style={{color: 'rgb(228, 93, 15)', textDecoration: 'underline'}} target="_blank" rel="noopener noreferrer">Let's go</a>


            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
