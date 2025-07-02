
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
}

const TypewriterText = ({ text, delay = 0, speed = 50 }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      }
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [currentIndex, text, delay, speed]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <div className="text-terminal-green/90 leading-relaxed whitespace-pre-wrap">
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-terminal-green"
        >
          ▋
        </motion.span>
      )}
    </div>
  );
};

export default TypewriterText;
