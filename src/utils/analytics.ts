type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    va?: (action: 'event' | 'beforeSend' | string, name?: string, params?: Record<string, unknown>) => void;
  }
}

const GA_ID = (import.meta as { env?: Record<string, string> }).env?.VITE_GA_MEASUREMENT_ID || '';

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];

  if (!GA_ID || document.getElementById('afteryes-gtag')) return;

  const src = document.createElement('script');
  src.id = 'afteryes-gtag';
  src.async = true;
  src.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(src);

  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args as unknown as Record<string, unknown>);
    };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

export function track(event: string, params: TrackParams = {}) {
  if (typeof window === 'undefined') return;
  const payload = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload);
  }

  if (typeof window.va === 'function') {
    window.va('event', event, payload);
  }

  try {
    const key = 'afteryes_analytics';
    const prev = JSON.parse(localStorage.getItem(key) || '[]');
    if (Array.isArray(prev)) {
      prev.push({ event, params: payload, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(prev.slice(-200)));
    }
  } catch {
    /* ignore */
  }
}

export function trackOnce(dedupeKey: string, event: string, params?: TrackParams) {
  try {
    const storageKey = `afteryes_tracked_${dedupeKey}`;
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, '1');
  } catch {
    /* still fire */
  }
  track(event, params);
}
