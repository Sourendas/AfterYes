import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED = new Set([
  'waitlist_complete',
  'generate_lead',
  'page_view',
  'thanks_explore_demo',
  'thanks_back_home',
]);

const allowedOrigin = (origin: string | undefined) => {
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    return (
      host === 'after-yes.vercel.app' ||
      host.endsWith('.vercel.app') ||
      host === 'localhost' ||
      host === '127.0.0.1'
    );
  } catch {
    return false;
  }
};

const cleanParams = (input: Record<string, unknown> = {}) => {
  const blocked = new Set(['email', 'name', 'phone', 'clinicName']);
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(input)) {
    if (blocked.has(key)) continue;
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      out[key] = value;
    }
  }
  return out;
};

async function sendGa4(payload: {
  client_id: string;
  event: string;
  params: Record<string, string | number | boolean>;
  event_id?: string;
}) {
  const measurementId = process.env.GA_MEASUREMENT_ID || process.env.VITE_GA_MEASUREMENT_ID;
  const apiSecret = process.env.GA_API_SECRET;
  if (!measurementId || !apiSecret) return { skipped: true, reason: 'missing_ga_secret' };

  const body = {
    client_id: payload.client_id,
    events: [
      {
        name: payload.event.replace(/[^A-Za-z0-9_]/g, '_').slice(0, 40),
        params: {
          ...payload.params,
          engagement_time_msec: 1,
          session_id: String(payload.params.session_id || Date.now()),
        },
      },
    ],
  };

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status };
}

async function sendWebhook(payload: Record<string, unknown>) {
  const url = process.env.TRACK_WEBHOOK_URL || process.env.WAITLIST_WEBHOOK_URL;
  if (!url) return { skipped: true };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return { ok: res.ok, status: res.status };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const origin = req.headers.origin;
  if (typeof origin === 'string' && allowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  if (typeof origin === 'string' && !allowedOrigin(origin)) {
    return res.status(403).json({ error: 'origin_not_allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const event = String(body.event || '');
  if (!ALLOWED.has(event)) return res.status(400).json({ error: 'event_not_allowed' });

  const params = cleanParams(body.params || {});
  const client_id = String(body.client_id || `anon.${Date.now()}`);
  const event_id = String(body.event_id || body.id || '');
  const path = String(body.path || '/thanks');

  const record = {
    event,
    event_id,
    client_id,
    path,
    params,
    at: new Date().toISOString(),
    source: 'server',
  };

  const [ga, hook] = await Promise.allSettled([
    sendGa4({ client_id, event, params: { ...params, page_path: path }, event_id }),
    sendWebhook(record),
  ]);

  return res.status(202).json({
    ok: true,
    event,
    ga: ga.status === 'fulfilled' ? ga.value : { error: true },
    webhook: hook.status === 'fulfilled' ? hook.value : { error: true },
  });
}
