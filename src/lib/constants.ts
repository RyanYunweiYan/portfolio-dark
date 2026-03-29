/**
 * Site Constants
 * Re-exports data from siteData.ts + site-level config
 */

// Re-export all shared data
export {
  PROFILE,
  METRICS,
  PROJECTS,
  CREATIVE_WORKS,
  AI_STACK,
  EXPERIENCE,
  CREDENTIALS,
  SOCIAL_LINKS,
  SITE_META,
} from '@/data/siteData';

// Re-export types
export type { Project, CreativeWork, Bilingual } from '@/data/siteData';

// ── Site Metadata (extended) ──────────────────────────────────────
export const SITE_METADATA = {
  title: { en: 'Ryan Yan | AI Product Manager & Builder', zh: 'Ryan Yan | AI 产品经理 & 独立开发者' },
  description: {
    en: 'AI Product Manager with 5+ years of experience. Turning AI capability into real-world product impact.',
    zh: '5 年以上经验的 AI 产品经理。用 AI 能力创造真实的产品价值。',
  },
  siteUrl: 'https://ryanyan.dev',
  ogImage: '/og-image.png',
};

// ── Status Labels (bilingual) ─────────────────────────────────────
export const STATUS_LABELS: Record<string, { en: string; zh: string }> = {
  live: { en: 'live', zh: '已上线' },
  'in-progress': { en: 'in-progress', zh: '开发中' },
  demo: { en: 'demo', zh: '演示' },
};

// ── Navigation ────────────────────────────────────────────────────
export const NAV_LINKS = [
  { name: { en: 'Home', zh: '首页' }, path: '/' },
  { name: { en: 'Portfolio', zh: '作品集' }, path: '/portfolio' },
  { name: { en: 'Creative', zh: 'AI 创作' }, path: '/creative' },
  { name: { en: 'About', zh: '关于' }, path: '/about' },
  { name: { en: 'Contact', zh: '联系' }, path: '/contact' },
];
