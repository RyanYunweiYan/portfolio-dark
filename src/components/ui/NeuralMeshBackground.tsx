import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Neural Mesh Gradient Background
 * Creates a dynamic, fluid gradient that shifts subtly in dark mode
 * Simulates a neural network visualization aesthetic
 */
export function NeuralMeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
      
      {/* Animated mesh gradients */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        {/* Primary neural orb */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '-20%',
            right: '-10%',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Secondary accent orb */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(220 80% 50% / 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            bottom: '10%',
            left: '-5%',
          }}
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        
        {/* Tertiary subtle orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(280 70% 50% / 0.08) 0%, transparent 70%)',
            filter: 'blur(70px)',
            top: '40%',
            left: '30%',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 50, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
        />
      </motion.div>
      
      {/* Mesh grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Neural connection lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="neural-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="1" fill="currentColor" />
            <line x1="50" y1="50" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <line x1="50" y1="50" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-pattern)" />
      </svg>
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 100%)',
        }}
      />
    </div>
  );
}
