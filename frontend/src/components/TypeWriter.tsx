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
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (isDeleting) {
        // Deleting text - keep it fast
        if (displayText.length > 0) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
          timeoutRef.current = setTimeout(handleTyping, erasingSpeed);
        } else {
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          // Quick transition to next word
          timeoutRef.current = setTimeout(handleTyping, 200);
        }
      } else {
        // Typing text - keep it consistent
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
          timeoutRef.current = setTimeout(handleTyping, typingSpeed);
        } else {
          // Word is fully typed, pause before erasing
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            handleTyping();
          }, delayBetweenWords);
        }
      }
    };

    // Start the typing cycle immediately
    timeoutRef.current = setTimeout(handleTyping, 0);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, wordIndex, isDeleting, words, typingSpeed, erasingSpeed, delayBetweenWords]);

  return (
    <div className={cn("inline-flex items-center", className)}>
      <span>{displayText}</span>
      <span className={cn("ml-1 w-1 h-6 bg-current animate-blink")}></span>
    </div>
  );
}
