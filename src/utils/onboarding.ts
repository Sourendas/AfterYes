import type { AudienceType, CalendarProvider, OnboardingConfig, ReminderTiming } from '../types';

export const ONBOARDING_STORAGE_KEY = 'afteryes_onboarding';

export const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Sao_Paulo',
  'Europe/London',
  'Europe/Paris',
  'Africa/Johannesburg',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Pacific/Auckland',
] as const;

export const REMINDER_OPTIONS: { value: ReminderTiming; label: string; hint: string }[] = [
  { value: '48h-before', label: '48 hours before', hint: 'Time to move the slot' },
  { value: '24h-before', label: '24 hours before', hint: 'Confirm the day before' },
  { value: '2h-before', label: '2 hours before', hint: 'Last nudge before the visit' },
  { value: 'morning-of', label: 'Morning of', hint: 'Short same-day ping' },
];

export const CALENDAR_PROVIDERS: { value: CalendarProvider; label: string }[] = [
  { value: 'calendly', label: 'Calendly' },
  { value: 'cal.com', label: 'Cal.com' },
  { value: 'acuity', label: 'Acuity' },
  { value: 'google', label: 'Google Calendar' },
  { value: 'outlook', label: 'Outlook Calendar' },
];

export function detectTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

export function defaultTemplate(audience: AudienceType, senderName: string) {
  if (audience === 'clinic') {
    return `Hi {{name}} — reminder for your appointment with ${senderName || '{{sender}}'} on {{when}}. Reply YES to confirm or use this thread to reschedule.`;
  }
  return `Hi {{name}} — great session today with ${senderName || '{{sender}}'}. Here is the recap and your review link. Next check-in is {{next}}.`;
}

export function reminderLabel(value: ReminderTiming) {
  return REMINDER_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function calendarLabel(value: CalendarProvider) {
  return CALENDAR_PROVIDERS.find((option) => option.value === value)?.label ?? value;
}

export function readOnboarding(): OnboardingConfig | null {
  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OnboardingConfig) : null;
  } catch {
    return null;
  }
}

export function saveOnboarding(config: OnboardingConfig) {
  localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(config));
}

export async function postOnboardingWebhook(config: OnboardingConfig) {
  const url = import.meta.env.VITE_ONBOARDING_WEBHOOK_URL as string | undefined;
  if (!url) {
    console.info('[AfterYes onboarding] No VITE_ONBOARDING_WEBHOOK_URL — saved locally only.', config);
    return { delivered: false as const, reason: 'missing_url' as const };
  }

  const payload = {
    ...config,
    source: 'afteryes_self_serve_onboarding',
    accountsConfig: {
      business_name: config.profile.businessName,
      timezone: config.profile.timezone,
      review_link: config.profile.reviewLink,
      calendar_provider: config.profile.calendarProvider,
      calendar_url: config.profile.calendarUrl,
      follow_up_delay: config.delivery.followUpDelay,
      email_first: config.delivery.emailFirst,
      sms_monthly_cap: config.delivery.smsMonthlyCap,
      sender_name: config.channel.senderName,
      support_email: config.channel.supportEmail,
      twilio_phone: config.channel.twilioPhone,
      status: 'active',
    },
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
      signal: AbortSignal.timeout(8000),
    });
    return { delivered: res.ok || res.type === 'opaque', reason: 'ok' as const };
  } catch (error) {
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors',
        keepalive: true,
      });
      return { delivered: true, reason: 'no_cors' as const };
    } catch {
      console.warn('[AfterYes onboarding] Webhook failed', error);
      return { delivered: false as const, reason: 'network' as const };
    }
  }
}
