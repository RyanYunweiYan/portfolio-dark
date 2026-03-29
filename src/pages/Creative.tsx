import { motion } from 'framer-motion';
import { Play, Music, BookOpen, Eye } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { CREATIVE_WORKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ElementType> = {
  video: Play,
  music: Music,
  article: BookOpen,
};

/**
 * Creative Works page
 * Showcases AI-generated videos, music, and articles
 */
export default function Creative() {
  const { lang, t } = useLanguage();

  const videos = CREATIVE_WORKS.filter((w) => w.type === 'video');
  const music = CREATIVE_WORKS.filter((w) => w.type === 'music');
  const articles = CREATIVE_WORKS.filter((w) => w.type === 'article');

  return (
    <>
      <SEOHead
        title={lang === 'en' ? 'AI Creative Works' : 'AI 创作'}
        description={
          lang === 'en'
            ? 'AI-generated creative works by Ryan Yan — videos, music, and long-form articles.'
            : 'Ryan Yan 的 AI 创作——视频、音乐和深度文章。'
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
                {lang === 'en' ? 'AI Creative Works' : 'AI 创作'}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
                {lang === 'en'
                  ? 'Exploring the creative frontier of AI — from film production to music composition to long-form writing.'
                  : '探索 AI 的创作前沿——从影视制作到音乐创作再到深度写作。'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Videos Section */}
        {videos.length > 0 && (
          <section className="py-16 md:py-24 px-6 lg:px-8 border-b border-border/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-3xl font-light tracking-tight leading-tight">
                    {lang === 'en' ? 'Videos' : '视频'}
                  </h2>
                </div>
              </ScrollReveal>

              <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((work) => (
                  <StaggerItem key={work.id} className="h-full">
                    <Tilt3DCard intensity={5} glowOnHover scaleOnHover>
                      <div
                        className={cn(
                          'relative p-6 rounded-2xl h-full overflow-hidden',
                          'backdrop-blur-[40px] backdrop-saturate-[180%] bg-white/[0.06]',
                          'border border-white/[0.08]',
                          'shadow-xl shadow-black/20',
                          'hover:border-primary/30 hover:bg-white/[0.12]',
                          'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                          'group'
                        )}
                      >
                        {/* Video area */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
                          {work.embedUrl ? (
                            work.embedUrl.endsWith('.mp4') ? (
                              <video
                                src={work.embedUrl}
                                controls
                                preload="metadata"
                                className="w-full h-full rounded-xl object-cover"
                                style={{ backgroundColor: "#000" }}
                              />
                            ) : (
                              <iframe
                                src={work.embedUrl}
                                className="w-full h-full"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                              />
                            )
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                              <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
                                <Play className="w-8 h-8 text-primary/50" />
                              </div>
                              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                                {lang === 'en' ? 'Coming Soon' : '即将上线'}
                              </span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                          {t(work.title)}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light mb-3">
                          {t(work.description)}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {work.platform && <span>{work.platform}</span>}
                          {work.stats && (
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {work.stats}
                            </span>
                          )}
                          <span>{work.date}</span>
                        </div>
                      </div>
                    </Tilt3DCard>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </section>
        )}

        {/* Music Section */}
        {music.length > 0 && (
          <section className="py-16 md:py-24 px-6 lg:px-8 border-b border-border/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <Music className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-3xl font-light tracking-tight leading-tight">
                    {lang === 'en' ? 'Music' : '音乐'}
                  </h2>
                </div>
              </ScrollReveal>

              <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {music.map((work) => (
                  <StaggerItem key={work.id} className="h-full">
                    <Tilt3DCard intensity={5} glowOnHover scaleOnHover>
                      <div
                        className={cn(
                          'relative p-6 rounded-2xl h-full overflow-hidden',
                          'backdrop-blur-[40px] backdrop-saturate-[180%] bg-white/[0.06]',
                          'border border-white/[0.08]',
                          'shadow-xl shadow-black/20',
                          'hover:border-primary/30 hover:bg-white/[0.12]',
                          'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                          'group'
                        )}
                      >
                        {/* Music player / placeholder */}
                        <div
                          className={cn(
                            "relative w-full rounded-xl overflow-hidden mb-5",
                            work.embedUrl
                              ? ""
                              : "h-24 bg-gradient-to-br from-purple-500/20 via-primary/5 to-transparent flex items-center justify-center"
                          )}
                        >
                          {work.embedUrl ? (
                            <iframe
                              src={work.embedUrl}
                              className="w-full rounded-xl border-0"
                              style={{ height: "200px" }}
                              allow="autoplay; clipboard-write; encrypted-media"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                                <Music className="w-6 h-6 text-primary/50" />
                              </div>
                              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                                {lang === 'en' ? 'Player Coming Soon' : '播放器即将上线'}
                              </span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                          {t(work.title)}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light mb-3">
                          {t(work.description)}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {work.platform && <span>{work.platform}</span>}
                          <span>{work.date}</span>
                        </div>
                      </div>
                    </Tilt3DCard>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </section>
        )}

        {/* Articles Section */}
        {articles.length > 0 && (
          <section className="py-16 md:py-24 px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-3xl font-light tracking-tight leading-tight">
                    {lang === 'en' ? 'Articles' : '文章'}
                  </h2>
                </div>
              </ScrollReveal>

              <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((work) => (
                  <StaggerItem key={work.id} className="h-full">
                    <Tilt3DCard intensity={5} glowOnHover scaleOnHover>
                      <div
                        className={cn(
                          'relative p-6 rounded-2xl h-full overflow-hidden',
                          'backdrop-blur-[40px] backdrop-saturate-[180%] bg-white/[0.06]',
                          'border border-white/[0.08]',
                          'shadow-xl shadow-black/20',
                          'hover:border-primary/30 hover:bg-white/[0.12]',
                          'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                          'group'
                        )}
                      >
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                          {t(work.title)}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light mb-4">
                          {t(work.description)}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {work.stats && (
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {work.stats}
                            </span>
                          )}
                          <span>{work.date}</span>
                        </div>

                        {work.externalUrl && (
                          <a
                            href={work.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
                          >
                            {lang === 'en' ? 'Read More' : '阅读更多'}
                            <BookOpen className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </Tilt3DCard>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </section>
        )}

        <div className="h-24" />
      </div>
    </>
  );
}
