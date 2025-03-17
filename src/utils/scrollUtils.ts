
import { useEffect, useState, useRef } from "react";

interface ScrollObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollObserver(options: ScrollObserverOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -10% 0px" } = options;
  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (observedEntries) => {
        setEntries(observedEntries);
      },
      {
        threshold,
        rootMargin,
      }
    );

    return () => observer.current?.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    const { current: currentObserver } = observer;
    if (currentObserver) {
      elements.forEach((element) => currentObserver.observe(element));
    }

    return () => {
      if (currentObserver) {
        elements.forEach((element) => currentObserver.unobserve(element));
      }
    };
  }, [elements]);

  const ref = (element: Element | null) => {
    if (element && !elements.includes(element)) {
      setElements((prevElements) => [...prevElements, element]);
    }
  };

  return { ref, entries };
}

export function useIsVisible(options: ScrollObserverOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, entries } = useScrollObserver(options);
  
  useEffect(() => {
    const isElementVisible = entries.some((entry) => entry.isIntersecting);
    if (isElementVisible) {
      setIsVisible(true);
    }
  }, [entries]);
  
  return { ref, isVisible };
}
