import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Video, MessageCircle, MapPin } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { PROFILE, SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const socialIconMap: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  github: Github,
  video: Video,
  'message-circle': MessageCircle,
};

/**
 * Contact page — email, social links, availability
 */
export default function Contact() {
  const { lang, t } = useLanguage();

  return (
    <>
      <SEOHead
        title={lang === 'en' ? 'Contact' : '联系'}
        description={`${lang === 'en' ? 'Get in touch with' : '联系'} ${PROFILE.name}. ${t(PROFILE.availability)}`}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-16 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4">
                {lang === 'en' ? 'Get in Touch' : '联系我'}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide leading-relaxed">
                {lang === 'en'
                  ? "I'd love to hear about what you're building"
                  : '很想听听你在做什么'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Email — large and prominent */}
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-sm text-muted-foreground font-medium tracking-widest uppercase mb-4">
                  {lang === 'en' ? 'Email' : '邮箱'}
                </p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground hover:text-primary transition-colors break-all"
                >
                  {PROFILE.email}
                </a>
              </div>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-4 mb-16">
                <p className="text-sm text-muted-foreground font-medium tracking-widest uppercase text-center mb-6">
                  {lang === 'en' ? 'Find Me On' : '社交平台'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = socialIconMap[link.icon] || Mail;
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-xl',
                          'bg-white/[0.03] border border-white/[0.06]',
                          'hover:bg-white/[0.06] hover:border-white/[0.12]',
                          'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group'
                        )}
                      >
                        <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {link.platform}
                          </p>
                          {'label' in link && link.label && (
                            <p className="text-xs text-muted-foreground">{link.label}</p>
                          )}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Availability + Location */}
            <ScrollReveal delay={0.2}>
              <div
                className={cn(
                  'p-6 rounded-2xl text-center',
                  'backdrop-blur-[40px] backdrop-saturate-[180%] bg-white/[0.06]',
                  'border border-white/[0.08]'
                )}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {t(PROFILE.availability)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {t(PROFILE.location)}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="h-16" />
      </div>
    </>
  );
}
