import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { PROJECTS, STATUS_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  live: 'bg-emerald-500',
  'in-progress': 'bg-amber-500',
  demo: 'bg-blue-500',
};

/**
 * Project detail page
 * Finds project by id from PROJECTS array
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEOHead
        title={t(project.title)}
        description={t(project.description)}
        image={project.coverImage}
        type="article"
      />

      <div className="min-h-screen">
        {/* Hero area */}
        <motion.div
          className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={t(project.title)}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-primary/10 to-background" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* Back button */}
          <div className="absolute top-6 left-6 z-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm hover:bg-black/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === 'en' ? 'Back to Portfolio' : '返回作品集'}
            </Link>
          </div>
        </motion.div>

        {/* Project Info */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16 -mt-20 relative z-10">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Status + Year */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/50">
                <span
                  className={cn('w-2 h-2 rounded-full', statusColors[project.status])}
                />
                <span className="text-xs font-medium capitalize">{STATUS_LABELS[project.status]?.[lang] || project.status}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {project.year}
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15]">
                {t(project.title)}
              </h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">{t(project.subtitle)}</p>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-border/30">
              <p className="text-lg font-light leading-relaxed text-foreground">
                {t(project.description)}
              </p>
            </div>

            {/* Details list */}
            {t(project.details).length > 0 && (
              <ScrollReveal>
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-foreground">
                    {lang === 'en' ? 'Key Highlights' : '关键亮点'}
                  </h2>
                  <ul className="space-y-3">
                    {t(project.details).map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-muted-foreground font-light">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}

            {/* Tags */}
            <ScrollReveal delay={0.1}>
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Screenshots gallery placeholder */}
            {project.screenshots && project.screenshots.length > 0 && (
              <ScrollReveal delay={0.2}>
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-foreground">
                    {lang === 'en' ? 'Screenshots' : '截图'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.screenshots.map((src, i) => (
                      <div
                        key={i}
                        className="relative aspect-video rounded-xl overflow-hidden bg-muted"
                      >
                        <img
                          src={src}
                          alt={`${t(project.title)} screenshot ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Live URL button */}
            {project.liveUrl && (
              <ScrollReveal delay={0.3}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2 px-6 py-3 rounded-full',
                    'bg-primary text-primary-foreground font-medium',
                    'hover:bg-primary/90 transition-colors'
                  )}
                >
                  <ExternalLink className="w-4 h-4" />
                  {lang === 'en' ? 'View Live' : '查看线上版本'}
                </a>
              </ScrollReveal>
            )}
          </motion.div>
        </section>

        <div className="h-24" />
      </div>
    </>
  );
}
