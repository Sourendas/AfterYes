import { WaitlistSubmission } from '../types';

export const WAITLIST_WEBHOOK_KEY = 'afteryes_webhook_url';

export async function notifyWaitlistWebhook(entry: WaitlistSubmission) {
  let url = '';
  try {
    url = localStorage.getItem(WAITLIST_WEBHOOK_KEY) || '';
  } catch {
    return;
  }
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
      mode: 'no-cors',
    });
  } catch (e) {
    console.warn('Waitlist webhook failed', e);
  }
}
