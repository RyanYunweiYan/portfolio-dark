import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { PROJECTS, STATUS_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Featured Projects Section for Homepage
 * Shows top 3 projects (large + medium) with glass cards
 */
export function FeaturedProjects() {
  const { lang, t } = useLanguage();

  // Pick size=large first, then size=medium, take first 3
  const featured = PROJECTS.filter((p) => p.size === 'large' || p.size === 'medium').slice(0, 3);

  const statusColors: Record<string, string> = {
    live: 'bg-emerald-500',
    'in-progress': 'bg-amber-500',
    demo: 'bg-blue-500',
  };

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
                {lang === 'en' ? 'Featured Work' : '精选作品'}
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-normal tracking-tight leading-[1.15]">
              {lang === 'en' ? 'Projects' : '项目'}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-2xl mx-auto">
              {lang === 'en'
                ? "Products I've built and shipped — from full-stack web apps to iOS applications."
                : '我构建和发布的产品——从全栈 Web 应用到 iOS 应用。'}
            </p>
          </div>
        </ScrollReveal>

        {/* Project Cards */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project) => (
            <StaggerItem key={project.id} className="h-full">
              <Tilt3DCard intensity={6} glowOnHover scaleOnHover>
                <Link to={`/project/${project.id}`} className="block group h-full">
                  <div
                    className={cn(
                      'relative p-6 rounded-2xl h-full overflow-hidden flex flex-col',
                      'backdrop-blur-[40px] backdrop-saturate-[180%] bg-white/[0.08]',
                      'border border-white/[0.12]',
                      'shadow-xl shadow-black/20',
                      'hover:border-primary/30 hover:bg-white/[0.12]',
                      'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
                    )}
                  >
                    {/* Cover image placeholder */}
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-5 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
                      {project.coverImage ? (
                        <img
                          src={project.coverImage}
                          alt={t(project.title)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-primary/30 text-xs tracking-widest uppercase">
                            {lang === 'en' ? 'Cover Image' : '封面图片'}
                          </div>
                        </div>
                      )}

                      {/* Status badge */}
                      <div className="absolute top-3 right-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                          <span
                            className={cn('w-1.5 h-1.5 rounded-full', statusColors[project.status])}
                          />
                          <span className="text-[11px] font-medium text-white capitalize">
                            {STATUS_LABELS[project.status]?.[lang] || project.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                          {t(project.title)}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-1" />
                      </div>

                      <p className="text-sm text-muted-foreground">{t(project.subtitle)}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Year */}
                    <div className="mt-4 pt-3 border-t border-white/[0.06] text-xs text-muted-foreground">
                      {project.year}
                    </div>
                  </div>
                </Link>
              </Tilt3DCard>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* View All Link */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              {lang === 'en' ? 'View All Projects' : '查看所有项目'}
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
