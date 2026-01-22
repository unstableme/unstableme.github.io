
import { useState } from "react";
import { useIsVisible } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";
import { Camera, Music, Plane, Video, Book, Code, Search, Youtube, X } from "lucide-react";

const hobbiesData = [
  {
    id: 1,
    name: "Photography",
    icon: <Camera className="h-8 w-8" />,
    description: "Capturing moments and landscapes through the lens.",
    fullDescription: "While exploring ideas and photographing whatever was around me, I realized that the camera allowed me to see the world from a different perspective—one that encourages mindfulness, appreciation, and a peaceful awareness of my surroundings. I guess that's why I can still remember the story behind most of my photos and even picture myself taking them. Maybe not every single one, but almost all—saying 100% would be a bit risky! <br><b>Check my Photography page: <a href ='https://unstable-photography.onrender.com/' target='blank'; style='color:rgb(31, 233, 223); text-decoration: underline;'>HERE</a></b>"
  },
  {
    id: 2,
    name: "Music",
    icon: <Music className="h-8 w-8" />,
    description: "I am very thankful for this discovery.",
    fullDescription: "I mostly listen to the EDM, Phonk(Brazilian ones are my favorite), and song with only beat/sound without any words at all really helps me to realize and make mind composed. Here is my Spotify link:<a href ='https://open.spotify.com/user/6b9hgpeoxine7nclpqknyjn6v?si=0fae3c2807b14897' target='blank'; style='color:rgb(16, 235, 100); text-decoration: underline;'>Click here</a>"
  },
  {
    id: 3,
    name: "Travelling",
    icon: <Plane className="h-8 w-8" />,
    description: "Not only viewing but feeling those places is the ultimate goal.",
    fullDescription: "Apart from Nepal, I plan to visit Europe especially, Switzerland, Newzealand, and some national park of US & Canada."
  },
  {
    id: 4,
    name: "Video Editing",
    icon: <Video className="h-8 w-8" />,
    description: "Creating and editing videos for various projects.",
    fullDescription: "I am skilled in video editing, combining creativity and technical expertise to create engaging visuals. I enjoy transforming raw footage into compelling stories."
  },
  {
    id: 5,
    name: "Reading",
    icon: <Book className="h-8 w-8" />,
    description: "Not for the sake of reading but to feel and implement",
    fullDescription: "Instead of quickly finishing and forgetting, I take my time with books that promote positivity, reading just 1–2 pages a day and gradually applying the lessons until they become a habit."
  },
  {
    id: 6,
    name: "Coding",
    icon: <Code className="h-8 w-8" />,
    description: "I love to code to solve problems that I'm facing.",
    fullDescription: "I have a strong inclination for coding in Python, particularly for machine learning and data science. I have also built a website using the Django framework."
  },
  {
    id: 7,
    name: "Research",
    icon: <Search className="h-8 w-8" />,
    description: "Diving deep into topics of interest and continuous learning.",
    fullDescription: "Research is a natural extension of my curiosity, and I’m truly grateful for this habit. It brings me a deep sense of fulfillment and satisfaction to explore how things work, why they function the way they do, and what underlying principles shape them. Every discovery adds to my understanding, fueling my desire to learn even more."
  },
  {
    id: 8,
    name: "YouTube",
    icon: <Youtube className="h-8 w-8" />,
    description: "It feels good once you start seeing results",
    fullDescription: "I used to edit videos both long and short term content for youtube and learned a lot during that phase including video editing as well as about youtube Algorithm and many more features available in YTStudio. Wanna Check that channel? <a href='https://www.youtube.com/@EARTHIANMOTIVATION/shorts' style='color: #10B981; text-decoration: underline;'>Yes</a> ... <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' style='color: #F87171; text-decoration: underline;'>No</a>"


  }
];

export function HobbiesSection() {
  const { ref, isVisible } = useIsVisible();
  const [selectedHobby, setSelectedHobby] = useState<null | (typeof hobbiesData)[0]>(null);
  
  const openModal = (hobby: (typeof hobbiesData)[0]) => {
    setSelectedHobby(hobby);
    document.body.classList.add("overflow-hidden");
  };
  
  const closeModal = () => {
    setSelectedHobby(null);
    document.body.classList.remove("overflow-hidden");
  };
  
  return (
    <>
      <section id="hobbies" className="section-container" ref={ref}>
        <div className={cn(
          "opacity-0 transform translate-y-8 transition-all duration-700 ease-out-expo delay-500",
          isVisible && "opacity-100 transform-none"
        )}>
          <h2 className="text-3xl md:text-4xl mb-12 text-center">Hobbies</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hobbiesData.map((hobby, index) => (
              <div 
                key={hobby.id}
                className={cn(
                  "glass rounded-xl p-6 text-center transform opacity-0 hover:bg-primary/5 transition-colors duration-300 cursor-pointer",
                  isVisible && "opacity-100 animate-fade-in"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards',
                  animationDuration: '600ms'
                }}
                onClick={() => openModal(hobby)}
              >
                <div className="flex justify-center items-center h-16 mb-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {hobby.icon}
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-2">{hobby.name}</h3>
                <p className="text-xs text-muted-foreground">{hobby.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Hobby Modal */}
      {selectedHobby && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all"
          onClick={closeModal}
        >
          <div 
            className="bg-background relative rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto animate-fade-in shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 p-2 rounded-full bg-black/10 text-foreground z-10"
              onClick={closeModal}
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="p-6 pt-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  {selectedHobby.icon}
                </div>
                <h3 className="text-2xl font-bold">{selectedHobby.name}</h3>
              </div>
              
              <div 
                className="text-base text-foreground/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedHobby.fullDescription }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
