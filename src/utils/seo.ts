import { useEffect } from 'react';
import { AudienceType } from '../types';
import { SEO_CONFIG, SeoMetadataEntry } from '../constants/seo';

export type PageMetadata = SeoMetadataEntry;

export interface GetPageMetadataOptions {
  path: string;
  audience?: AudienceType | null;
  searchParams?: URLSearchParams | null;
}

/**
 * Returns dynamic title and meta descriptions based on path, audience, and query parameters.
 */
export function getPageMetadata({
  path,
  audience,
  searchParams,
}: GetPageMetadataOptions): PageMetadata {
  const normalizedPath = path.toLowerCase().replace(/\/$/, '') || '/';
  const typeParam = searchParams?.get('type');
  const effectiveAudience = (typeParam === 'clinic' || typeParam === 'coach') 
    ? (typeParam as AudienceType) 
    : audience;

  const routeConfig = SEO_CONFIG[normalizedPath];

  if (!routeConfig) {
    const fallback = SEO_CONFIG['404'] as SeoMetadataEntry;
    return {
      ...fallback,
      canonicalPath: path,
    };
  }

  // If entry has audience-specific keys
  if ('coach' in routeConfig || 'clinic' in routeConfig || 'default' in routeConfig) {
    const audienceMap = routeConfig as {
      coach?: SeoMetadataEntry;
      clinic?: SeoMetadataEntry;
      default: SeoMetadataEntry;
    };

    if (effectiveAudience && audienceMap[effectiveAudience]) {
      return audienceMap[effectiveAudience]!;
    }
    return audienceMap.default;
  }

  return routeConfig as SeoMetadataEntry;
}

/**
 * Helper to get or create a meta tag element in document.head
 */
function setMetaTag(selector: string, createTag: () => HTMLMetaElement, content: string | undefined) {
  if (typeof document === 'undefined' || !content) return;

  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = createTag();
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Dynamically updates document title and SEO/Social meta tags.
 */
export function updateDocumentMetadata(metadata: Partial<PageMetadata>): void {
  if (typeof document === 'undefined') return;

  if (metadata.title) {
    document.title = metadata.title;
  }

  if (metadata.description) {
    setMetaTag(
      'meta[name="description"]',
      () => {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        return meta;
      },
      metadata.description
    );
  }

  const ogTitle = metadata.ogTitle || metadata.title;
  if (ogTitle) {
    setMetaTag(
      'meta[property="og:title"]',
      () => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        return meta;
      },
      ogTitle
    );
  }

  const ogDesc = metadata.ogDescription || metadata.description;
  if (ogDesc) {
    setMetaTag(
      'meta[property="og:description"]',
      () => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        return meta;
      },
      ogDesc
    );
  }

  const twTitle = metadata.twitterTitle || ogTitle;
  if (twTitle) {
    setMetaTag(
      'meta[name="twitter:title"]',
      () => {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'twitter:title');
        return meta;
      },
      twTitle
    );
  }

  const twDesc = metadata.twitterDescription || ogDesc;
  if (twDesc) {
    setMetaTag(
      'meta[name="twitter:description"]',
      () => {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'twitter:description');
        return meta;
      },
      twDesc
    );
  }
}

/**
 * Custom React Hook to sync page title and meta description.
 */
export function useDocumentMetadata(options: {
  path?: string;
  audience?: AudienceType | null;
  searchParams?: URLSearchParams | null;
  customTitle?: string;
  customDescription?: string;
}): PageMetadata {
  const { path = '/', audience, searchParams, customTitle, customDescription } = options;

  const defaultMeta = getPageMetadata({ path, audience, searchParams });
  const activeMeta: PageMetadata = {
    ...defaultMeta,
    title: customTitle || defaultMeta.title,
    description: customDescription || defaultMeta.description,
  };

  useEffect(() => {
    updateDocumentMetadata(activeMeta);
  }, [
    activeMeta.title,
    activeMeta.description,
    activeMeta.ogTitle,
    activeMeta.ogDescription,
    activeMeta.twitterTitle,
    activeMeta.twitterDescription,
  ]);

  return activeMeta;
}
