/**
 * Skip to content link for keyboard navigation accessibility
 * Appears on focus for screen readers and keyboard users
 * Note: Cannot use useLanguage() as this renders outside Suspense.
 * Uses localStorage detection instead.
 */
export function SkipToContent() {
  const isZh = typeof localStorage !== 'undefined' && localStorage.getItem('lang') === 'zh';
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-sm focus:font-light focus:tracking-wide focus:shadow-lg"
    >
      {isZh ? '跳转到主要内容' : 'Skip to main content'}
    </a>
  );
}
