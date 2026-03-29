import { Linkedin, Github, Video, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PROFILE, SOCIAL_LINKS } from '@/lib/constants';

const socialIconMap: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  github: Github,
  video: Video,
  'message-circle': MessageCircle,
};

/**
 * Footer with social links and copyright
 */
export function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="border-t border-border" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Copyright */}
          <p className="text-sm text-muted-foreground tracking-wide">
            &copy; 2026 {PROFILE.name}.{' '}
            {lang === 'en' ? 'All rights reserved.' : '保留所有权利。'}
          </p>

          {/* Right: Social Links */}
          <div className="flex items-center gap-1 md:gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = socialIconMap[link.icon];
              if (!Icon) return null;
              const isDisabled = link.url === '#';
              if (isDisabled) {
                return (
                  <span
                    key={link.platform}
                    className="w-11 h-11 flex items-center justify-center text-muted-foreground/40 cursor-default"
                    aria-label={link.platform}
                  >
                    <Icon className="size-5" />
                  </span>
                );
              }
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.platform}
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-6 pt-4 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground/80">
            {lang === 'en'
              ? 'Built entirely with AI'
              : '完全使用 AI 辅助开发构建'}
          </p>
        </div>
      </div>
    </footer>
  );
}
