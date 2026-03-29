/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MOUSE FOLLOW LIGHT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Dynamic lighting effect that follows the cursor.
 * Creates a soft radial glow beneath glass cards for premium interaction.
 * 
 * @packageDocumentation
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MouseFollowLightProps {
  /** Container className */
  className?: string;
  /** Light color (CSS color value) */
  color?: string;
  /** Light size in pixels */
  size?: number;
  /** Blur amount in pixels */
  blur?: number;
  /** Opacity (0-1) */
  opacity?: number;
  /** Whether light is active */
  active?: boolean;
}

/**
 * Global mouse-follow light effect.
 * Renders a soft radial glow that tracks cursor position.
 */
export function MouseFollowLight({
  className,
  color = 'hsl(220 80% 60%)',
  size = 400,
  blur = 100,
  opacity = 0.15,
  active = true,
}: MouseFollowLightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural movement
  const springConfig = { stiffness: 150, damping: 30, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Track mouse globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!active) return null;

  return (
    <motion.div
      className={cn('fixed pointer-events-none z-0', className)}
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          opacity,
        }}
      />
    </motion.div>
  );
}

/**
 * Mouse-follow light that operates within a container.
 * Use for localized glow effects on specific sections.
 */
interface ContainedMouseLightProps {
  /** Container ref to track mouse within */
  containerRef?: React.RefObject<HTMLElement>;
  /** Light color */
  color?: string;
  /** Light size */
  size?: number;
  /** Blur amount */
  blur?: number;
  /** Opacity */
  opacity?: number;
  /** Z-index offset */
  zIndex?: number;
}

export function ContainedMouseLight({
  containerRef,
  color = 'hsl(220 80% 55%)',
  size = 300,
  blur = 80,
  opacity = 0.12,
  zIndex = -1,
}: ContainedMouseLightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      setPosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, mouseX, mouseY]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        zIndex,
      }}
      animate={{
        opacity: isHovering ? opacity : 0,
        scale: isHovering ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
        }}
      />
    </motion.div>
  );
}
