import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PROFILE, NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Elite Portfolio Header
 * Glassmorphism effect with scroll-aware styling
 * Includes language toggle (EN/中)
 */
export function Header() {
  const location = useLocation();
  const { isScrolled, scrollDirection, scrollY } = useScrollPosition();
  const { lang, toggleLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTransparent = !isScrolled;
  const isNavHidden = scrollDirection === 'down' && scrollY > 200;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isNavHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 print:hidden',
        isTransparent
          ? 'bg-transparent'
          : 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              'text-lg font-medium tracking-wide transition-all duration-300',
              'text-foreground hover:text-primary'
            )}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {PROFILE.name}
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Link
                  to={link.path}
                  className={cn(
                    'relative text-sm font-medium tracking-wide transition-colors duration-300',
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {t(link.name)}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Language Toggle — Desktop */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * NAV_LINKS.length }}
              onClick={toggleLang}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium tracking-wide',
                'backdrop-blur-xl bg-white/[0.08] border border-white/[0.12]',
                'hover:bg-white/[0.15] hover:border-white/[0.2]',
                'text-foreground/80 hover:text-foreground',
                'transition-all duration-300 cursor-pointer select-none'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang === 'en' ? '中' : 'EN'}
            </motion.button>
          </nav>

          {/* Mobile: Language Toggle + Menu */}
          <div className="md:hidden flex items-center gap-2">
            {/* Language Toggle — Mobile */}
            <motion.button
              onClick={toggleLang}
              className={cn(
                'min-w-[44px] min-h-[44px] px-3 py-2 rounded-full text-xs font-medium tracking-wide',
                'backdrop-blur-xl bg-white/[0.08] border border-white/[0.12]',
                'hover:bg-white/[0.15] hover:border-white/[0.2]',
                'text-foreground/80 hover:text-foreground',
                'transition-all duration-300 cursor-pointer select-none',
                'flex items-center justify-center'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang === 'en' ? '中' : 'EN'}
            </motion.button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-11 text-foreground hover:bg-primary/10"
                  aria-label={lang === 'en' ? 'Open menu' : '打开菜单'}
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80 bg-background/95 backdrop-blur-xl"
              >
                <nav className="flex flex-col gap-2 mt-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'text-lg font-medium tracking-wide transition-colors min-h-[44px] flex items-center',
                        location.pathname === link.path
                          ? 'text-primary'
                          : 'text-foreground hover:text-primary'
                      )}
                    >
                      {t(link.name)}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
