
import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export const TypewriterText = ({ text, speed = 100, className = "" }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      <span className={`inline-block w-0.5 h-8 bg-white ml-1 ${isComplete ? 'animate-pulse' : ''}`} />
    </span>
  );
};
