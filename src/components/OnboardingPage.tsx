import React, { useMemo, useState } from 'react';
import { useAudience } from '../context/AudienceContext';
import type { AudienceType, CalendarProvider, FollowUpDelay, OnboardingConfig, ReminderTiming } from '../types';
import {
  TIMEZONES,
  REMINDER_OPTIONS,
  CALENDAR_PROVIDERS,
  defaultTemplate,
  detectTimezone,
  postOnboardingWebhook,
  saveOnboarding,
} from '../utils/onboarding';
import { EngineDashboard } from './EngineDashboard';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const STEPS = ['Practice profile', 'Delivery', 'Channel'] as const;

export const OnboardingPage: React.FC = () => {
  const { searchParams, latestSubmission, audience, setAudience } = useAudience();
  const typeParam = searchParams.get('type');
  const emailParam = searchParams.get('email') || latestSubmission?.email || '';
  const segment: AudienceType =
    typeParam === 'clinic' || latestSubmission?.audience === 'clinic' || audience === 'clinic'
      ? 'clinic'
      : 'coach';

  React.useEffect(() => {
    if (audience !== segment) setAudience(segment);
  }, [audience, segment, setAudience]);

  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [activated, setActivated] = useState<OnboardingConfig | null>(null);
  const [businessName, setBusinessName] = useState(latestSubmission?.extra.clinicName || latestSubmission?.name || '');
  const [timezone, setTimezone] = useState(detectTimezone());
  const [reviewLink, setReviewLink] = useState('');
  const [calendarProvider, setCalendarProvider] = useState<CalendarProvider>('calendly');
  const [calendarUrl, setCalendarUrl] = useState('');
  const [reminderTiming, setReminderTiming] = useState<ReminderTiming>('24h-before');
  const [followUpDelay, setFollowUpDelay] = useState<FollowUpDelay>('24h');
  const [senderName, setSenderName] = useState(latestSubmission?.name || '');
  const [supportEmail, setSupportEmail] = useState(emailParam);
  const [twilioPhone, setTwilioPhone] = useState(latestSubmission?.extra.phone || '');
  const [messageTemplate, setMessageTemplate] = useState(() => defaultTemplate(segment, latestSubmission?.name || ''));

  const timezoneChoices = useMemo(() => {
    return TIMEZONES.includes(timezone as (typeof TIMEZONES)[number]) ? TIMEZONES : ([timezone, ...TIMEZONES] as string[]);
  }, [timezone]);

  const validateStep = () => {
    if (step === 0) {
      if (!businessName.trim()) return 'Add a practice or business name.';
      if (!timezone.trim()) return 'Choose a timezone.';
      if (!calendarUrl.trim() || !calendarUrl.includes('.')) return 'Add your Calendly, Cal.com, Acuity, or calendar URL.';
    }
    if (step === 1 && !messageTemplate.trim()) return 'Add a message template.';
    if (step === 2) {
      if (!senderName.trim()) return 'Add the name messages should send from.';
      if (!supportEmail.trim() || !supportEmail.includes('@')) return 'Add a valid support email.';
    }
    return null;
  };

  const next = () => {
    const issue = validateStep();
    if (issue) { setError(issue); return; }
    setError(null);
    setStep((n) => Math.min(n + 1, 2));
  };

  const activate = async () => {
    const issue = validateStep();
    if (issue) { setError(issue); return; }
    setError(null);
    setSubmitting(true);
    const config: OnboardingConfig = {
      id: `ob_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      audience: segment,
      email: emailParam || supportEmail.trim(),
      profile: {
        businessName: businessName.trim(),
        timezone,
        reviewLink: reviewLink.trim(),
        calendarProvider,
        calendarUrl: calendarUrl.trim(),
      },
      delivery: {
        reminderTiming,
        followUpDelay,
        messageTemplate: messageTemplate.trim(),
        emailFirst: true,
        smsMonthlyCap: 50,
      },
      channel: {
        senderName: senderName.trim(),
        supportEmail: supportEmail.trim(),
        twilioPhone: twilioPhone.trim(),
      },
      engine: { stage1: '24h_review', stage2: 'day4_checkin', stage3: 'day10_14_rebook' },
      activatedAt: new Date().toISOString(),
    };
    try {
      saveOnboarding(config);
      await postOnboardingWebhook(config);
      setActivated(config);
    } catch {
      setError('Could not finish setup. Check the form and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (activated) return <EngineDashboard config={activated} />;

  const fieldClass = 'mt-1.5 w-full rounded-[12px] border border-[#D9E2EA] bg-[#F3F6F8] px-3 py-3 text-sm text-[#10203A] outline-none focus:border-[#E25A48] focus:bg-white';

  return (
    <div className="w-full px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C6B80]">Self-serve setup · {segment === 'clinic' ? 'Clinic' : 'Coach'}</p>
        <h1 className="mt-2 text-2xl font-sans font-extrabold tracking-tight text-[#10203A] sm:text-3xl">Turn AfterYes on without a call</h1>
        <p className="mt-2 text-sm text-[#5C6B80]">Connect the calendar once. AfterYes runs reviews, Day-4 check-ins, and rebooking nudges from there.</p>
        <ol className="mt-6 mb-8 flex items-center gap-2">
          {STEPS.map((label, index) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${index <= step ? 'bg-[#E25A48] text-white' : 'bg-[#F3F6F8] text-[#5C6B80]'}`}>
                {index < step ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span className={`hidden text-xs font-medium sm:inline ${index === step ? 'text-[#10203A]' : 'text-[#5C6B80]'}`}>{label}</span>
              {index < STEPS.length - 1 && <span className="h-px flex-1 bg-[#D9E2EA]" />}
            </li>
          ))}
        </ol>
        <div className="rounded-[20px] border border-[#D9E2EA] bg-white p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#10203A]">{segment === 'clinic' ? 'Practice name' : 'Business name'}
                <input className={fieldClass} value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder={segment === 'clinic' ? 'Sharma Dental' : 'Northstar Coaching'} />
              </label>
              <label className="block text-sm font-medium text-[#10203A]">Timezone
                <select className={fieldClass} value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                  {timezoneChoices.map((zone) => <option key={zone} value={zone}>{zone}</option>)}
                </select>
              </label>
              <label className="block text-sm font-medium text-[#10203A]">Booking calendar
                <select className={fieldClass} value={calendarProvider} onChange={(e) => setCalendarProvider(e.target.value as CalendarProvider)}>
                  {CALENDAR_PROVIDERS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label className="block text-sm font-medium text-[#10203A]">Booking / calendar URL
                <input className={fieldClass} value={calendarUrl} onChange={(e) => setCalendarUrl(e.target.value)} placeholder="https://calendly.com/your-name or calendar share link" />
              </label>
              <label className="block text-sm font-medium text-[#10203A]">Review link / Google Maps URL
                <input className={fieldClass} value={reviewLink} onChange={(e) => setReviewLink(e.target.value)} placeholder="https://maps.google.com/..." />
              </label>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-5">
              <fieldset>
                <legend className="text-sm font-medium text-[#10203A]">Reminder timing</legend>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {REMINDER_OPTIONS.map((option) => (
                    <button key={option.value} type="button" onClick={() => setReminderTiming(option.value)} className={`rounded-[16px] border px-3 py-3 text-left ${reminderTiming === option.value ? 'border-[#E25A48] bg-[#FFF6F4]' : 'border-[#D9E2EA] bg-[#F3F6F8]'}`}>
                      <p className="text-sm font-medium text-[#10203A]">{option.label}</p>
                      <p className="text-xs text-[#5C6B80]">{option.hint}</p>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-medium text-[#10203A]">Stage 1 review delay</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(['24h', '48h'] as FollowUpDelay[]).map((value) => (
                    <button key={value} type="button" onClick={() => setFollowUpDelay(value)} className={`rounded-[16px] border px-3 py-3 text-sm font-medium ${followUpDelay === value ? 'border-[#E25A48] bg-[#FFF6F4] text-[#10203A]' : 'border-[#D9E2EA] bg-[#F3F6F8] text-[#5C6B80]'}`}>
                      {value} after session
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-[#5C6B80]">Stage 2 is always Day 4. Stage 3 fires on Day 10–14 only if they have not rebooked. Email first. SMS is capped at 50/month on Starter.</p>
              </fieldset>
              <label className="block text-sm font-medium text-[#10203A]">Custom message template
                <textarea rows={5} className={fieldClass} value={messageTemplate} onChange={(e) => setMessageTemplate(e.target.value)} />
              </label>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#10203A]">Sender name
                <input className={fieldClass} value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Priya at AfterYes" />
              </label>
              <label className="block text-sm font-medium text-[#10203A]">Support email
                <input type="email" className={fieldClass} value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
              </label>
              <label className="block text-sm font-medium text-[#10203A]">Twilio phone (optional — SMS Stage 1 + Stage 3)
                <input className={fieldClass} value={twilioPhone} onChange={(e) => setTwilioPhone(e.target.value)} placeholder="+1 415 555 0134" />
              </label>
            </div>
          )}
          {error && <p className="mt-4 text-sm text-[#E25A48]">{error}</p>}
          <div className="mt-6 flex gap-3">
            {step > 0 && (
              <button type="button" onClick={() => { setError(null); setStep((n) => n - 1); }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#10203A] bg-white px-[22px] py-[14px] text-sm font-medium text-[#10203A] hover:bg-[#F3F6F8]">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
            {step < 2 ? (
              <button type="button" onClick={next} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#E25A48] px-[22px] py-[14px] text-sm font-medium text-white hover:bg-[#C94B3B]">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="button" onClick={activate} disabled={submitting} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#E25A48] px-[22px] py-[14px] text-sm font-medium text-white hover:bg-[#C94B3B] disabled:opacity-60">
                {submitting ? 'Activating…' : 'Activate engine'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
