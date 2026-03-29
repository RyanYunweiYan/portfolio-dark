import { Loader2 } from 'lucide-react';

/**
 * Loading fallback for code-split routes
 * Shows spinner while loading page components
 * Note: Cannot use useLanguage() here because this renders inside Suspense
 * before the component tree is ready. Uses browser lang detection instead.
 */
export function LoadingFallback() {
  const isZh = typeof navigator !== 'undefined' &&
    (localStorage.getItem('lang') === 'zh' || (!localStorage.getItem('lang') && navigator.language.startsWith('zh')));

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
        <p className="text-sm font-light tracking-wide text-muted-foreground">
          {isZh ? '加载中...' : 'Loading...'}
        </p>
      </div>
    </div>
  );
}
