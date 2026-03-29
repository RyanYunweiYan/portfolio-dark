import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorClassName?: string;
}

/**
 * AI-style Typewriter Text Effect
 * Cycles through an array of texts with typing and deleting animations
 */
export function TypewriterText({
  texts,
  className,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  cursorClassName,
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }

      const deleteTimer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(deleteTimer);
    }

    if (displayText === currentFullText) {
      setIsPaused(true);
      return;
    }

    const typeTimer = setTimeout(() => {
      setDisplayText((prev) => currentFullText.slice(0, prev.length + 1));
    }, typingSpeed);
    return () => clearTimeout(typeTimer);
  }, [displayText, isDeleting, isPaused, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span className="relative">
        {displayText}
        <motion.span
          className={cn(
            'inline-block w-[3px] h-[1.1em] ml-1 bg-primary rounded-full',
            cursorClassName
          )}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </span>
    </span>
  );
}

interface CodeTypewriterProps {
  code: string;
  className?: string;
  speed?: number;
  onComplete?: () => void;
}

/**
 * Code-style typewriter for displaying AI/code snippets
 */
export function CodeTypewriter({
  code,
  className,
  speed = 30,
  onComplete,
}: CodeTypewriterProps) {
  const [displayCode, setDisplayCode] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayCode.length < code.length) {
      const timer = setTimeout(() => {
        setDisplayCode(code.slice(0, displayCode.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayCode, code, speed, isComplete, onComplete]);

  return (
    <motion.pre
      className={cn(
        'font-mono text-sm bg-black/40 backdrop-blur-sm rounded-lg p-4 overflow-x-auto',
        'border border-white/10',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <code className="text-cyan-400">
        {displayCode}
        {!isComplete && (
          <motion.span
            className="inline-block w-2 h-4 bg-cyan-400 ml-0.5"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </code>
    </motion.pre>
  );
}
