import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

export type Lang = 'en' | 'zh';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: <T>(field: { en: T; zh: T } | T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Helper to check if a value is a bilingual object { en, zh }
 */
function isBilingual<T>(value: unknown): value is { en: T; zh: T } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'en' in value &&
    'zh' in value
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'en');

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const newLang = prev === 'en' ? 'zh' : 'en';
      localStorage.setItem('lang', newLang);
      return newLang;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    <T,>(field: { en: T; zh: T } | T): T => {
      if (isBilingual<T>(field)) {
        return field[lang];
      }
      return field as T;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
