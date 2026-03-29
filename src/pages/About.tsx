import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, MapPin, Image } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { PROFILE, EXPERIENCE, CREDENTIALS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * About page — biography, experience timeline, education, CES photos
 */
export default function About() {
  const { lang, t } = useLanguage();

  const bioArr = t(PROFILE.bio);

  return (
    <>
      <SEOHead
        title={lang === 'en' ? 'About' : '关于'}
        description={`${lang === 'en' ? 'Learn about' : '了解'} ${PROFILE.name}, ${t(PROFILE.title)}. ${bioArr[0]}`}
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
                {lang === 'en' ? 'About Ryan' : '关于 Ryan'}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide leading-relaxed">
                {t(PROFILE.title)}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-b border-border/30">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="space-y-6">
                {bioArr.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg font-light leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-b border-border/30">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-12">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-light tracking-tight leading-tight">
                  {lang === 'en' ? 'Experience' : '工作经历'}
                </h2>
              </div>
            </ScrollReveal>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] md:left-[140px] top-0 bottom-0 w-px bg-border/50" />

              <div className="space-y-12">
                {EXPERIENCE.map((exp, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 relative">
                      {/* Left: period & company */}
                      <div className="md:w-[130px] shrink-0 text-right hidden md:block">
                        <p className="text-sm font-medium text-foreground">{exp.period}</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </p>
                      </div>

                      {/* Dot */}
                      <div className="relative flex-shrink-0">
                        <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/30 mt-1" />
                      </div>

                      {/* Right: content card */}
                      <Tilt3DCard intensity={4} glowOnHover scaleOnHover className="flex-1">
                        <div
                          className={cn(
                            'relative p-6 rounded-2xl overflow-hidden',
                            'backdrop-blur-[40px] backdrop-saturate-[180%] bg-white/[0.06]',
                            'border border-white/[0.08]',
                            'shadow-xl shadow-black/20',
                            'hover:border-primary/30 hover:bg-white/[0.12]',
                            'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
                          )}
                        >
                          {/* Mobile period */}
                          <div className="md:hidden text-xs text-muted-foreground mb-2 flex items-center gap-2">
                            <span>{exp.period}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {exp.location}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold text-foreground">{t(exp.role)}</h3>
                          <p className="text-sm text-primary font-medium mt-1">{exp.company}</p>

                          <ul className="mt-4 space-y-2">
                            {t(exp.highlights).map((highlight, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 shrink-0" />
                                <span className="text-sm text-muted-foreground font-light">
                                  {highlight}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Tilt3DCard>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-b border-border/30">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-12">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-light tracking-tight leading-tight">
                  {lang === 'en' ? 'Education & Certifications' : '学历与认证'}
                </h2>
              </div>
            </ScrollReveal>

            {/* Education */}
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {CREDENTIALS.education.map((edu, index) => (
                <StaggerItem key={index} className="h-full">
                  <Tilt3DCard intensity={4} glowOnHover scaleOnHover>
                    <div
                      className={cn(
                        'relative p-6 rounded-2xl h-full overflow-hidden',
                        'backdrop-blur-[40px] backdrop-saturate-[180%] bg-white/[0.06]',
                        'border border-white/[0.08]',
                        'shadow-xl shadow-black/20',
                        'hover:border-primary/30 hover:bg-white/[0.12]',
                        'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
                      )}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="text-base font-semibold text-foreground">{t(edu.school)}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{t(edu.degree)}</p>
                          {edu.period && <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>}
                          <p className="text-xs text-muted-foreground mt-1">GPA: {edu.gpa}</p>
                          {edu.focus && (
                            <p className="text-xs text-primary/70 mt-1">
                              {lang === 'en' ? 'Focus' : '方向'}: {t(edu.focus)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tilt3DCard>
                </StaggerItem>
              ))}
            </StaggerReveal>

            {/* Certifications */}
            <ScrollReveal>
              <h3 className="text-xl font-light text-foreground mb-6">
                {lang === 'en' ? 'Certifications' : '认证'}
              </h3>
            </ScrollReveal>

            <StaggerReveal className="space-y-3">
              {CREDENTIALS.certifications.map((cert, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.07] transition-colors">
                    <Award className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground font-light">{t(cert)}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* CES Photos Placeholder */}
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <Image className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-light tracking-tight leading-tight">CES 2026</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div
                className={cn(
                  'relative p-12 rounded-2xl text-center overflow-hidden',
                  'backdrop-blur-[40px] bg-white/[0.03]',
                  'border border-white/[0.06] border-dashed',
                  'shadow-xl shadow-black/10'
                )}
              >
                <Image className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-lg text-muted-foreground font-light">
                  {lang === 'en' ? 'CES 2026 photos coming soon' : 'CES 2026 照片即将上线'}
                </p>
                <p className="text-sm text-muted-foreground/60 mt-2">
                  {lang === 'en'
                    ? 'Photos from the Yuwell Medical booth at CES 2026 in Las Vegas'
                    : '鱼跃医疗在拉斯维加斯 CES 2026 展台的照片'}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="h-24" />
      </div>
    </>
  );
}
