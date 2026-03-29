/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LIQUID GLASS BACKGROUND
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Premium morphing gradient background with obsidian, navy, and charcoal tones.
 * Features slow organic animations that interact with backdrop-filters.
 * 
 * @packageDocumentation
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidGlassBackgroundProps {
  className?: string;
}

/**
 * Morphing liquid gradient background for VisionOS aesthetic.
 * Uses deep obsidian, navy, and charcoal tones with slow organic animations.
 */
export function LiquidGlassBackground({ className }: LiquidGlassBackgroundProps) {
  return (
    <div className={cn('fixed inset-0 -z-10 overflow-hidden', className)}>
      {/* Base gradient - deep obsidian */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(225 25% 4%) 0%, hsl(220 30% 6%) 50%, hsl(230 20% 5%) 100%)',
        }}
      />
      
      {/* Morphing blob 1 - Navy */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(220 50% 15%) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: ['-20%', '10%', '-15%', '5%', '-20%'],
          y: ['-10%', '20%', '5%', '-15%', '-10%'],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ x: '-20%', y: '-10%' }}
      />
      
      {/* Morphing blob 2 - Charcoal with blue tint */}
      <motion.div
        className="absolute right-0 bottom-0 w-[900px] h-[900px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(210 40% 12%) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: ['20%', '-5%', '15%', '-10%', '20%'],
          y: ['10%', '-15%', '5%', '20%', '10%'],
          scale: [1.1, 0.95, 1.15, 1, 1.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ x: '20%', y: '10%' }}
      />
      
      {/* Morphing blob 3 - Deep purple accent */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(260 30% 15%) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        animate={{
          x: ['-50%', '-40%', '-60%', '-45%', '-50%'],
          y: ['-50%', '-40%', '-55%', '-60%', '-50%'],
          scale: [1, 1.3, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ x: '-50%', y: '-50%' }}
      />
      
      {/* Subtle primary glow - top accent */}
      <motion.div
        className="absolute -top-40 left-1/4 w-[500px] h-[300px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(ellipse, hsl(220 80% 50%) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['0%', '10%', '-5%', '15%', '0%'],
          opacity: [0.15, 0.2, 0.12, 0.18, 0.15],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(225 25% 3% / 0.4) 100%)',
        }}
      />
    </div>
  );
}
