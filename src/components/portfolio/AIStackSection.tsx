import { motion } from 'framer-motion';
import { Brain, Code2, Palette, Rocket } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { AI_STACK } from '@/lib/constants';
import { cn } from '@/lib/utils';

const categoryIcons: Record<string, React.ElementType> = {
  Think: Brain,
  Build: Code2,
  Create: Palette,
  Ship: Rocket,
};

const categoryColors: Record<string, string> = {
  Think: 'from-blue-500/20 to-cyan-500/10',
  Build: 'from-emerald-500/20 to-green-500/10',
  Create: 'from-purple-500/20 to-pink-500/10',
  Ship: 'from-amber-500/20 to-orange-500/10',
};

/**
 * AI Stack Section
 * Shows tools organized by Think/Build/Create/Ship
 * Category names stay in English (brand expression)
 */
export function AIStackSection() {
  const { lang, t } = useLanguage();

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
                {lang === 'en' ? '$400+/month in AI tools' : '每月 $400+ AI 工具投入'}
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-normal tracking-tight leading-[1.15]">
              {lang === 'en' ? 'My AI Stack' : '我的 AI 工具栈'}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-2xl mx-auto">
              {lang === 'en'
                ? 'The tools I use daily to think deeper, build faster, create better, and ship sooner.'
                : '我每天使用的工具：更深思考、更快构建、更好创作、更快交付。'}
            </p>
          </div>
        </ScrollReveal>

        {/* Four-column grid */}
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AI_STACK.map((stack) => {
            const Icon = categoryIcons[stack.category] || Brain;
            const gradient = categoryColors[stack.category] || 'from-primary/20 to-primary/10';

            return (
              <StaggerItem key={stack.category} className="h-full">
                <Tilt3DCard intensity={5} glowOnHover scaleOnHover>
                  <div
                    className={cn(
                      'relative p-6 rounded-2xl h-full overflow-hidden',
                      'backdrop-blur-[40px] backdrop-saturate-[180%] bg-white/[0.08]',
                      'border border-white/[0.12]',
                      'shadow-xl shadow-black/20',
                      'hover:border-primary/30 hover:bg-white/[0.12]',
                      'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                      'group'
                    )}
                  >
                    {/* Gradient overlay */}
                    <div
                      className={cn(
                        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br',
                        gradient
                      )}
                    />

                    {/* Top shine */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-50"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)',
                      }}
                    />

                    {/* Header */}
                    <div className="relative flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {stack.category}
                        </h3>
                        <p className="text-xs text-muted-foreground">{t(stack.description)}</p>
                      </div>
                    </div>

                    {/* Tools list */}
                    <ul className="relative space-y-2">
                      {stack.tools.map((tool) => (
                        <li
                          key={tool}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary/50" />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tilt3DCard>
              </StaggerItem>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
