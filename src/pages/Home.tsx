import { motion } from 'framer-motion';
import { LiquidGlassBackground } from '@/components/ui/LiquidGlassBackground';
import { MouseFollowLight } from '@/components/ui/MouseFollowLight';
import { AIParticleField } from '@/components/ui/AIParticleField';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { ImpactDashboard } from '@/components/portfolio/ImpactDashboard';
import { FeaturedProjects } from '@/components/portfolio/FeaturedProjects';
import { AIStackSection } from '@/components/portfolio/AIStackSection';
import { SEOHead } from '@/components/seo/SEOHead';
import { PROFILE, SOCIAL_LINKS, SITE_METADATA } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Mail, Linkedin, Github, Video, MessageCircle, ArrowUpRight } from 'lucide-react';
import { LiquidButton } from '@/components/ui/LiquidButton';

const socialIconMap: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  github: Github,
  video: Video,
  'message-circle': MessageCircle,
};

/**
 * Ryan Yan Portfolio Homepage
 * Liquid Glass aesthetic with premium interactions
 */
export default function Home() {
  const { lang, t } = useLanguage();

  return (
    <>
      <SEOHead description={t(SITE_METADATA.description)} />

      {/* Liquid Glass Background */}
      <LiquidGlassBackground />

      {/* AI Neural Network Particle Field */}
      <AIParticleField />

      {/* Mouse-follow ambient light */}
      <MouseFollowLight color="hsl(220 80% 55%)" size={500} blur={120} opacity={0.12} />

      <div className="relative min-h-screen">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Impact Dashboard */}
        <ImpactDashboard />

        {/* 3. Featured Projects */}
        <FeaturedProjects />

        {/* 4. AI Stack */}
        <AIStackSection />

        {/* 5. Contact CTA */}
        <section id="contact" className="relative py-12 md:py-24 px-6 lg:px-8">
          {/* Glass reflection line divider */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.10) 70%, transparent 100%)"
          }} />
          {/* Ambient glow behind CTA */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[200px] rounded-full bg-primary/10 blur-[100px]" />
          </div>
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium text-primary">
                    {lang === 'en' ? "Let's Connect" : '保持联系'}
                  </span>
                </motion.div>

                <ScrollReveal delay={0.1}>
                  <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
                    {lang === 'en' ? "Let's Connect" : '保持联系'}
                  </h2>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p className="text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-2xl mx-auto">
                    {lang === 'en'
                      ? "Always open to new opportunities in AI."
                      : '对 AI 领域的新机会保持开放。'}
                  </p>
                </ScrollReveal>

                {/* Email address — visible, one-click */}
                <ScrollReveal delay={0.25}>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center gap-3 text-lg md:text-2xl font-medium text-primary hover:text-primary/80 transition-colors tracking-tight break-all"
                  >
                    <Mail className="w-6 h-6 flex-shrink-0" />
                    {PROFILE.email}
                  </a>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <LiquidButton href={`mailto:${PROFILE.email}`} variant="primary">
                      <Mail className="w-5 h-5" />
                      {lang === 'en' ? 'Get in Touch' : '联系我'}
                      <ArrowUpRight className="w-4 h-4" />
                    </LiquidButton>
                  </div>
                </ScrollReveal>

                {/* Social Links */}
                <ScrollReveal delay={0.4}>
                  <div className="flex justify-center gap-4 pt-8">
                    {SOCIAL_LINKS.map((link, index) => {
                      const Icon = socialIconMap[link.icon];
                      if (!Icon) return null;
                      const isDisabled = link.url === '#';
                      const Tag = isDisabled ? motion.span : motion.a;
                      return (
                        <Tag
                          key={link.platform}
                          {...(!isDisabled && {
                            href: link.url,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          })}
                          aria-label={link.platform}
                          className={`w-11 h-11 flex items-center justify-center rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group ${
                            isDisabled
                              ? 'opacity-40 cursor-default'
                              : 'hover:border-primary/40 hover:bg-primary/10 hover:scale-110 hover:-translate-y-0.5 active:scale-95'
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                        >
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Tag>
                      );
                    })}
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.5}>
                  <div className="pt-8 space-y-2 text-sm text-muted-foreground">
                    <p>{t(PROFILE.location)}</p>
                    <p className="flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {t(PROFILE.availability)}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
