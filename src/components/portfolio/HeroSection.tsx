import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { LiquidButton } from '@/components/ui/LiquidButton';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { useLanguage } from '@/contexts/LanguageContext';
import { PROFILE, METRICS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Hero Section with 3D floating elements
 * Content driven by PROFILE from siteData
 *
 * RECRUITER-FIRST layout:
 *   1. Name + Title (static, immediate) — WHO this person is
 *   2. Typewriter tagline (secondary, decorative) — value prop cycling
 *   3. Key metrics strip — social proof above the fold
 *   4. Two CTAs — "Get in Touch" (primary) + "Explore My Work" (secondary)
 */
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroVisualY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const typewriterTexts =
    lang === 'en'
      ? [
          t(PROFILE.tagline),
          'Shipping Real Products, Powered by AI',
          'From Concept to Code to Customer — With AI',
        ]
      : [
          t(PROFILE.tagline),
          '用 AI 做出真正能用的产品',
          '从想法到代码到用户——全程 AI 驱动',
        ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-20 lg:py-24 px-6 md:px-8"
      style={{ minHeight: "100dvh" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: 3D Floating Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ y: heroVisualY }}
          className="relative order-2 lg:order-1"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
            className="relative"
          >
            {/* Personal photo with artistic treatment */}
            <div
              className={cn(
                'relative rounded-3xl overflow-hidden',
                'border border-white/[0.12]',
                'shadow-2xl shadow-black/30'
              )}
            >
              {/* Photo with blur + desaturation for premium non-sharp look */}
              <img
                src="/images/ryan-speaking.png"
                alt="Ryan Yan speaking"
                className="w-full h-full object-cover"
                style={{
                  filter: 'brightness(0.75) saturate(0.7)',
                }}
              />
              {/* Gradient overlay — fades edges into the dark theme */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(220 50% 15% / 0.4) 0%, transparent 40%, transparent 60%, hsl(225 25% 4% / 0.6) 100%)',
                }}
              />
              {/* Bottom gradient for text readability */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, hsl(225 25% 4% / 0.8) 0%, transparent 50%)',
                }}
              />
              {/* Subtle blue glow accent */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'radial-gradient(ellipse at 30% 40%, hsl(var(--primary) / 0.4) 0%, transparent 60%)',
                }}
                animate={{ opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Content — recruiter-first hierarchy */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          style={{ y: heroTextY }}
          className="space-y-6 order-1 lg:order-2"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-primary">{t(PROFILE.availability)}</span>
          </motion.div>

          {/* 1. Name & Title — FIRST, static, immediately visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight tracking-tight">
              {PROFILE.name}
            </h1>
            {lang === 'zh' && (
              <p className="text-lg sm:text-xl text-muted-foreground/60 font-normal tracking-wide">{PROFILE.nameCN}</p>
            )}
            <p className="text-lg md:text-2xl text-primary font-medium leading-relaxed">{t(PROFILE.title)}</p>
          </motion.div>

          {/* 2. Typewriter tagline — secondary, decorative cycling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="min-h-[2.5em] text-lg md:text-xl lg:text-2xl font-normal leading-[1.4] tracking-tight text-muted-foreground"
          >
            <TypewriterText
              key={lang}
              texts={typewriterTexts}
              typingSpeed={60}
              deletingSpeed={30}
              pauseDuration={3000}
            />
          </motion.div>

          {/* 3. Key metrics strip — social proof above the fold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3"
          >
            {METRICS.map((metric, i) => (
              <div
                key={i}
                className={cn(
                  'px-2.5 py-2.5 sm:px-3 rounded-xl text-center',
                  'backdrop-blur-[20px] bg-white/[0.08]',
                  'border border-white/[0.12]'
                )}
              >
                <span className="block text-lg md:text-xl font-bold text-foreground tracking-tight">
                  {metric.value}
                </span>
                <span className="block text-[11px] sm:text-xs text-muted-foreground font-medium leading-snug mt-0.5">
                  {t(metric.label)}
                </span>
              </div>
            ))}
          </motion.div>

          {/* 4. CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
          >
            <LiquidButton href={`mailto:${PROFILE.email}`} variant="primary">
              <Mail className="w-5 h-5" />
              {lang === 'en' ? 'Get in Touch' : '联系我'}
              <ArrowRight className="w-5 h-5" />
            </LiquidButton>

            <LiquidButton href="/portfolio" variant="secondary">
              {lang === 'en' ? 'Explore My Work' : '查看我的作品'}
            </LiquidButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
