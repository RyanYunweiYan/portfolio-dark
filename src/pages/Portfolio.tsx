import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { PROJECTS, STATUS_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  live: 'bg-emerald-500',
  'in-progress': 'bg-amber-500',
  demo: 'bg-blue-500',
};

/**
 * Portfolio page — all projects
 */
export default function Portfolio() {
  const { lang, t } = useLanguage();

  return (
    <>
      <SEOHead
        title={lang === 'en' ? 'Portfolio' : '作品集'}
        description={
          lang === 'en'
            ? 'Browse all products and projects built by Ryan Yan — from full-stack web apps to AI-powered platforms.'
            : '浏览 Ryan Yan 构建的所有产品和项目——从全栈 Web 应用到 AI 驱动平台。'
        }
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-16 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4">
                {lang === 'en' ? 'Portfolio' : '作品集'}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
                {lang === 'en'
                  ? "Products I've built, shipped, and iterated — all powered by AI-assisted development."
                  : '我构建、发布和迭代的产品——全部由 AI 辅助开发驱动。'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Project Grid */}
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project) => (
                <StaggerItem key={project.id} className="h-full">
                  <Tilt3DCard intensity={5} glowOnHover scaleOnHover>
                    <Link to={`/project/${project.id}`} className="block group h-full">
                      <div
                        className={cn(
                          'relative p-6 rounded-2xl h-full overflow-hidden flex flex-col',
                          'backdrop-blur-[40px] backdrop-saturate-[180%] bg-white/[0.06]',
                          'border border-white/[0.08]',
                          'shadow-xl shadow-black/20',
                          'hover:border-primary/30 hover:bg-white/[0.12]',
                          'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
                        )}
                      >
                        {/* Cover image placeholder */}
                        <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
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
                                className={cn(
                                  'w-1.5 h-1.5 rounded-full',
                                  statusColors[project.status]
                                )}
                              />
                              <span className="text-[11px] font-medium text-white capitalize">
                                {STATUS_LABELS[project.status]?.[lang] || project.status}
                              </span>
                            </div>
                          </div>

                          {/* Year badge */}
                          <div className="absolute top-3 left-3">
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white font-medium">
                              {project.year}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                              {t(project.title)}
                            </h2>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-1" />
                          </div>

                          <p className="text-sm text-muted-foreground font-light">
                            {t(project.subtitle)}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Tilt3DCard>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <div className="h-24" />
      </div>
    </>
  );
}
