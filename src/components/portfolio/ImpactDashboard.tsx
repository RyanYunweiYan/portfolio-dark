import { motion } from 'framer-motion';
import { CountUpNumber } from '@/components/ui/CountUpNumber';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';
import { METRICS, CREDENTIALS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { cn } from '@/lib/utils';

/**
 * Parse a metric value string into { numericValue, prefix, suffix }
 */
function parseMetricValue(val: string) {
  const match = val.match(/^(\$?)([0-9,]+(?:\.[0-9]+)?)(.*?)$/);
  if (!match) return { numericValue: 0, prefix: '', suffix: '' };
  const prefix = match[1];
  const numericValue = parseFloat(match[2].replace(/,/g, ''));
  const suffix = match[3];
  return { numericValue, prefix, suffix };
}

/**
 * Premium Impact Dashboard Section
 * Enhanced glassmorphism cards with CountUp animations
 */
export function ImpactDashboard() {
  const { lang, t } = useLanguage();

  // Build credentials for GlassBadge display
  const credentialBadges = [
    ...CREDENTIALS.education.map((ed) => {
      const degreeStr = t(ed.degree);
      return {
        title: degreeStr.split(' in ')[0] || degreeStr,
        institution: t(ed.school).includes('Texas') || t(ed.school).includes('德克萨斯')
          ? (lang === 'en' ? 'UT Austin' : '德州大学奥斯汀')
          : (lang === 'en' ? 'Cal State Fullerton' : '加州州立富尔顿'),
        icon: 'GraduationCap',
      };
    }),
    ...CREDENTIALS.certifications.map((cert) => {
      const certStr = t(cert);
      const isIBM = certStr.includes('IBM');
      const isAndrew = certStr.includes('Andrew') || certStr.includes('吴恩达');
      const isPMP = certStr.includes('PMP');
      const isAnthropic = certStr.includes('Anthropic');
      return {
        title: isIBM ? (lang === 'en' ? 'AI Product Manager' : 'AI 产品经理')
          : isAndrew ? (lang === 'en' ? 'Deep Learning AI' : '深度学习 AI')
          : isPMP ? 'PMP'
          : isAnthropic ? (lang === 'en' ? 'Anthropic Courses' : 'Anthropic 课程')
          : certStr,
        institution: isIBM ? 'IBM'
          : isAndrew ? 'DeepLearning.AI'
          : isPMP ? 'PMI'
          : isAnthropic ? 'Anthropic'
          : '',
        icon: isIBM || isAndrew || isAnthropic ? 'Brain' : 'Award',
      };
    }),
  ];

  return (
    <section className="relative py-12 md:py-24 px-6 lg:px-8">
      {/* Glass reflection line divider */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.10) 70%, transparent 100%)"
      }} />
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-primary">
                {lang === 'en' ? 'Key Numbers' : '关键数据'}
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-normal tracking-tight leading-[1.15]">
              {lang === 'en' ? 'Impact Dashboard' : '影响力仪表盘'}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-2xl mx-auto">
              {lang === 'en'
                ? 'A snapshot of what I\'ve built and delivered.'
                : '我构建和交付的成果一览。'}
            </p>
          </div>
        </ScrollReveal>

        {/* Metrics Grid */}
        <StaggerReveal className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
          {METRICS.map((metric, index) => {
            const { numericValue, prefix, suffix } = parseMetricValue(metric.value);
            return (
              <StaggerItem key={index} className="h-full">
                <Tilt3DCard intensity={8} glowOnHover scaleOnHover>
                  <div
                    className={cn(
                      'relative p-5 md:p-8 rounded-2xl text-center h-full overflow-hidden',
                      'backdrop-blur-[40px] backdrop-saturate-[180%] bg-white/[0.08]',
                      'border border-white/[0.12]',
                      'shadow-xl shadow-black/20',
                      'hover:border-primary/30 hover:bg-white/[0.12]',
                      'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                      'group'
                    )}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, transparent 50%, hsl(var(--primary) / 0.05) 100%)',
                      }}
                    />

                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.15) 0%, transparent 60%)',
                      }}
                    />

                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-50"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)',
                      }}
                    />

                    <div className="relative mb-4">
                      <CountUpNumber
                        value={numericValue}
                        prefix={prefix}
                        suffix={suffix}
                        className="text-2xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70"
                      />
                    </div>

                    <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors">
                      {t(metric.label)}
                    </h3>

                    <p className="hidden md:block text-sm text-muted-foreground font-normal leading-relaxed">
                      {t(metric.description)}
                    </p>

                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary/50 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '40%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    />
                  </div>
                </Tilt3DCard>
              </StaggerItem>
            );
          })}
        </StaggerReveal>

        {/* Credentials Section */}
        <ScrollReveal>
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-normal text-foreground">
              {lang === 'en' ? 'Credentials & Certifications' : '学历与认证'}
            </h3>
          </div>
        </ScrollReveal>

        <StaggerReveal className="flex flex-wrap justify-center gap-3 md:gap-4" staggerDelay={0.15}>
          {credentialBadges.map((credential, index) => (
            <StaggerItem key={index}>
              <GlassBadge
                title={credential.title}
                institution={credential.institution}
                icon={credential.icon}
                index={index}
              />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
