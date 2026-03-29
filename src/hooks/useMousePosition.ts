/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MOUSE POSITION HOOK
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Tracks cursor position with optional smoothing via Framer Motion springs.
 * Used for mouse-follow lighting effects and 3D tilt interactions.
 * 
 * @packageDocumentation
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useState, useCallback, RefObject } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface MousePosition {
  x: number;
  y: number;
}

export interface UseMousePositionOptions {
  /** Whether to track globally or relative to an element */
  global?: boolean;
  /** Spring stiffness for smoothed values */
  stiffness?: number;
  /** Spring damping for smoothed values */
  damping?: number;
  /** Mass for spring physics */
  mass?: number;
}

export interface UseMousePositionReturn {
  /** Raw mouse position */
  position: MousePosition;
  /** Smoothed X position (Framer Motion value) */
  smoothX: MotionValue<number>;
  /** Smoothed Y position (Framer Motion value) */
  smoothY: MotionValue<number>;
  /** Whether mouse is within tracking area */
  isHovering: boolean;
  /** Handler to attach to elements */
  handlers: {
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Tracks mouse position with optional spring smoothing.
 * 
 * @param options - Configuration options
 * @returns Mouse position state and handlers
 * 
 * @example
 * const { smoothX, smoothY, handlers } = useMousePosition();
 * 
 * return (
 *   <div {...handlers}>
 *     <motion.div style={{ x: smoothX, y: smoothY }} />
 *   </div>
 * );
 */
export function useMousePosition(
  options: UseMousePositionOptions = {}
): UseMousePositionReturn {
  const { 
    global = false, 
    stiffness = 150, 
    damping = 25,
    mass = 0.5 
  } = options;

  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for smooth interpolation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness, damping, mass });
  const smoothY = useSpring(y, { stiffness, damping, mass });

  // Global mouse tracking
  useEffect(() => {
    if (!global) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [global, x, y]);

  // Element-scoped handlers
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (global) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    
    setPosition({ x: newX, y: newY });
    x.set(newX);
    y.set(newY);
  }, [global, x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    // Optionally reset position
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    position,
    smoothX,
    smoothY,
    isHovering,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL MOUSE POSITION HOOK
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Simplified hook for global mouse tracking.
 * Updates on every frame for smooth animations.
 */
export function useGlobalMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

/**
 * Hook that returns normalized mouse position (0-1) within an element.
 */
export function useNormalizedMousePosition(
  ref: RefObject<HTMLElement>,
  options: { stiffness?: number; damping?: number } = {}
) {
  const { stiffness = 200, damping = 30 } = options;
  
  const normalizedX = useMotionValue(0.5);
  const normalizedY = useMotionValue(0.5);
  
  const smoothNormalizedX = useSpring(normalizedX, { stiffness, damping });
  const smoothNormalizedY = useSpring(normalizedY, { stiffness, damping });
  
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      normalizedX.set(x);
      normalizedY.set(y);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      normalizedX.set(0.5);
      normalizedY.set(0.5);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, normalizedX, normalizedY]);

  return {
    normalizedX: smoothNormalizedX,
    normalizedY: smoothNormalizedY,
    isHovering,
  };
}
