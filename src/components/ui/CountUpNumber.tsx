import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface CountUpNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Animated Counter Component
 * Counts up from 0 to target value when scrolled into view
 * Uses spring physics for smooth, natural animation
 */
export function CountUpNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000
  });
  
  const display = useTransform(spring, (current) => {
    if (value >= 100) {
      return Math.floor(current).toLocaleString();
    }
    return current.toFixed(value < 10 ? 1 : 0);
  });
  
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);
  
  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(String(latest));
    });
    return unsubscribe;
  }, [display]);
  
  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}
