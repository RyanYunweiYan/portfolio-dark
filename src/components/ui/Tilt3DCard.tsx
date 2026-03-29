import { useRef, ReactNode, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  glowOnHover?: boolean;
  scaleOnHover?: boolean;
}

/**
 * Premium 3D Tilt Card Component
 * Applies perspective transform following mouse movement
 * Features enhanced glow effects and smooth spring animations
 */
export function Tilt3DCard({ 
  children, 
  className,
  glowColor = 'hsl(var(--primary))',
  intensity = 12,
  glowOnHover = true,
  scaleOnHover = true
}: Tilt3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for natural feel
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25, mass: 0.5 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);
  
  // Glow position follows mouse
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        scale: isHovered && scaleOnHover ? 1.02 : 1,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 25 }
      }}
      className={cn(
        'relative h-full',
        className
      )}
    >
      {/* Dynamic glow effect layer */}
      {glowOnHover && (
        <motion.div
          className="absolute -inset-px rounded-[inherit] pointer-events-none overflow-hidden"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Moving glow that follows cursor */}
          <motion.div
            className="absolute w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: glowX,
              top: glowY,
              background: `radial-gradient(circle at center, ${glowColor} / 0.4, transparent 40%)`,
              filter: 'blur(20px)',
            }}
          />
          
          {/* Border glow */}
          <div 
            className="absolute inset-0 rounded-[inherit]"
            style={{
              background: `linear-gradient(135deg, ${glowColor} / 0.3, transparent 50%, ${glowColor} / 0.15)`,
            }}
          />
        </motion.div>
      )}
      
      {/* Content with depth */}
      <div
        style={{
          transform: 'translateZ(20px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
