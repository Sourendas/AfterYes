type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    va?: (action: 'event' | 'beforeSend' | string, name?: string, params?: Record<string, unknown>) => void;
  }
}

const GA_ID = (import.meta as { env?: Record<string, string> }).env?.VITE_GA_MEASUREMENT_ID || '';
const CLIENT_KEY = 'afteryes_client_id';

export function getClientId() {
  if (typeof window === 'undefined') return 'anon.server';
  try {
    const existing = localStorage.getItem(CLIENT_KEY);
    if (existing) return existing;
    const id = `${Date.now()}.${Math.random().toString(36).slice(2, 12)}`;
    localStorage.setItem(CLIENT_KEY, id);
    return id;
  } catch {
    return `${Date.now()}.tmp`;
  }
}

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
  window.gtag('config', GA_ID, { anonymize_ip: true, client_id: getClientId() });
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

export function trackServer(
  event: string,
  params: TrackParams = {},
  extra: { event_id?: string; path?: string } = {},
) {
  if (typeof window === 'undefined') return;
  const body = {
    event,
    params,
    event_id: extra.event_id,
    path: extra.path || window.location.pathname,
    client_id: getClientId(),
  };
  void fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => undefined);
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
