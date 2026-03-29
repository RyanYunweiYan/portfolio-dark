import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  GraduationCap, 
  Brain, 
  Award,
  LucideIcon 
} from 'lucide-react';

interface GlassBadgeProps {
  title: string;
  institution: string;
  icon: string;
  index?: number;
}

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Brain,
  Award,
};

/**
 * Glassmorphism Badge Component
 * Floating credential badge with metallic sheen effect
 */
export function GlassBadge({ title, institution, icon, index = 0 }: GlassBadgeProps) {
  const Icon = iconMap[icon] || Award;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        transition: { duration: 0.2 } 
      }}
      className={cn(
        'group relative overflow-hidden rounded-2xl p-[1px]',
        'cursor-default'
      )}
    >
      {/* Metallic gradient border */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.5) 0%, transparent 50%, hsl(var(--primary) / 0.3) 100%)',
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), transparent)',
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      />
      
      {/* Glass content */}
      <div className={cn(
        'relative rounded-2xl px-5 py-4',
        'bg-background/60 dark:bg-background/40',
        'backdrop-blur-xl',
        'border border-border/30',
        'shadow-lg shadow-primary/5'
      )}>
        <div className="flex items-center gap-3">
          {/* Icon with glow */}
          <div className={cn(
            'relative flex items-center justify-center w-10 h-10 rounded-xl',
            'bg-gradient-to-br from-primary/20 to-primary/5',
            'border border-primary/20'
          )}>
            <Icon className="w-5 h-5 text-primary" />
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
              }}
            />
          </div>
          
          {/* Text */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {title}
            </span>
            <span className="text-xs text-muted-foreground">
              {institution}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
