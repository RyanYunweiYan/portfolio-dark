import { motion, useInView, Variants } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

/**
 * Premium Scroll-Driven Reveal Animation
 * Sophisticated spring-based reveal with configurable direction
 * Used across all major sections for cohesive "alive" feel
 */
export function ScrollReveal({ 
  children, 
  delay = 0, 
  className,
  direction = 'up',
  distance = 24
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "100px 0px -40px 0px",
    amount: 0.05
  });

  // Calculate initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      default: return { y: distance, x: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: initialPos.y,
        x: initialPos.x,
        filter: 'blur(2px)'
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        x: 0,
        filter: 'blur(0px)'
      } : {
        opacity: 0,
        y: initialPos.y,
        x: initialPos.x,
        filter: 'blur(2px)'
      }}
      transition={{ 
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.8,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered children reveal - for lists and grids
 */
interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerReveal({ 
  children, 
  className,
  staggerDelay = 0.1 
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "100px 0px -20px 0px",
    amount: 0.05
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual stagger child item
 */
export function StaggerItem({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string 
}) {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(2px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
