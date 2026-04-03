import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypeWriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  erasingSpeed?: number;
  delayBetweenWords?: number;
}

export function TypeWriter({
  words,
  className,
  typingSpeed = 70, // Faster default typing speed
  erasingSpeed = 30, // Quick erasing speed
  delayBetweenWords = 1500,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex];

    const handleTyping = () => {
      if (isDeleting) {
        // Deleting text
        if (displayText.length > 0) {
          setDisplayText(prev => prev.substring(0, prev.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        // Typing text
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          // Word is fully typed, pause before erasing
          const timer = setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenWords);
          return () => clearTimeout(timer);
        }
      }
    };

    const speed = isDeleting ? erasingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, erasingSpeed, delayBetweenWords]);

  return (
    <div className={cn("inline-flex items-center", className)}>
      <span>{displayText}</span>
      <span className={cn("ml-1 w-1 h-6 bg-current animate-blink")}></span>
    </div>
  );
}
