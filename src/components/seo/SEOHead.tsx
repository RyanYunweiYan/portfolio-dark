import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { PROFILE, SITE_META } from '@/lib/constants';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

/**
 * SEO component for managing page meta tags
 */
export function SEOHead({
  title,
  description,
  image = SITE_META.ogImage,
  type = 'website',
}: SEOHeadProps) {
  const location = useLocation();
  const { t } = useLanguage();

  const profileTitle = t(PROFILE.title);
  const siteDescription = t(SITE_META.description);

  const fullTitle = title
    ? `${title} | ${PROFILE.name}`
    : `${PROFILE.name} — ${profileTitle}`;

  const fullDescription = description || siteDescription;

  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = fullTitle;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('description', fullDescription);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', fullDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', PROFILE.name, true);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', fullDescription);
    updateMetaTag('twitter:image', image);
    updateMetaTag('author', PROFILE.name);
    updateMetaTag('keywords', `AI Product Manager, ${PROFILE.name}, AI Builder`);
  }, [fullTitle, fullDescription, fullUrl, image, type]);

  return null;
}
