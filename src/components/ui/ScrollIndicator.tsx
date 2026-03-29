import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Animated scroll indicator for hero sections
 * Subtle visual cue to encourage scrolling
 */
export function ScrollIndicator() {
  const { lang } = useLanguage();

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      onClick={handleScroll}
      className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      aria-label={lang === 'en' ? 'Scroll to content' : '向下滚动'}
    >
      <span className="text-xs font-light tracking-widest uppercase">{lang === 'en' ? 'Scroll' : '滚动'}</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-5" />
      </motion.div>
    </motion.button>
  );
}
