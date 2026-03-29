import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface LiquidButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

/**
 * Liquid Hover Glow Button
 * Features a flowing liquid glow effect on hover
 */
export function LiquidButton({
  children,
  onClick,
  href,
  className,
  variant = 'primary'
}: LiquidButtonProps) {
  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2',
        'px-8 py-4 rounded-full',
        'font-medium text-base tracking-wide',
        'overflow-hidden cursor-pointer',
        'transition-all duration-300',
        variant === 'primary' && [
          'bg-primary text-primary-foreground',
          'hover:shadow-2xl hover:shadow-primary/30',
        ],
        variant === 'secondary' && [
          'bg-white/[0.08] text-foreground',
          'border border-white/[0.15]',
          'backdrop-blur-xl',
          'hover:bg-white/[0.15] hover:border-white/[0.25]',
        ],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Liquid glow background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: variant === 'primary' 
            ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary-foreground) / 0.15) 0%, transparent 50%)'
            : 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.1) 0%, transparent 50%)',
        }}
      />
      
      {/* Animated glow orbs */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={false}
      >
        <motion.div
          className="absolute w-20 h-20 rounded-full"
          style={{
            background: variant === 'primary'
              ? 'radial-gradient(circle, hsl(var(--primary-foreground) / 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
          animate={{
            x: [-20, 100, 20, -20],
            y: [-10, 20, -20, -10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={false}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, hsl(var(--primary-foreground) / 0.1) 50%, transparent 60%)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Component>
  );
}
