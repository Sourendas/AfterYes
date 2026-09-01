import React, { useMemo, useState } from 'react';
import { useAudience } from '../context/AudienceContext';
import type { AudienceType, FollowUpDelay, OnboardingConfig, ReminderTiming } from '../types';
import {
  TIMEZONES,
  REMINDER_OPTIONS,
  defaultTemplate,
  detectTimezone,
  postOnboardingWebhook,
  reminderLabel,
  saveOnboarding,
} from '../utils/onboarding';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarCheck,
  Check,
  MessageSquare,
  Radio,
  ShieldCheck,
} from 'lucide-react';

const STEPS = ['Practice profile', 'Delivery', 'Channel'] as const;

function timeAgo(seconds: number) {
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}

const Dashboard: React.FC<{ config: OnboardingConfig }> = ({ config }) => {
  const { navigate } = useAudience();
  const [elapsed, setElapsed] = useState(0);
  const isClinic = config.audience === 'clinic';

  React.useEffect(() => {
    const id = window.setInterval(() => setElapsed((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const feed = isClinic
    ? [
        { t: '08:12', title: '48h reminder queued', body: 'Thu 10:30 cleaning \u2014 confirmation SMS armed.' },
        { t: '08:12', title: 'Calendar watch live', body: `${config.profile.businessName} slots synced in ${config.profile.timezone}.` },
        { t: 'Now', title: 'Empty-chair recovery on', body: `If a slot drops, waitlist SMS sends as ${config.channel.senderName}.` },
      ]
    : [
        { t: '08:12', title: 'Recap pipeline live', body: 'Session log \u2192 WhatsApp/email within 60 seconds.' },
        { t: '08:12', title: 'Quiet radar armed', body: `Follow-up fires after ${config.delivery.followUpDelay} of silence.` },
        { t: 'Now', title: 'Monitoring retainers', body: `${config.profile.businessName} roster is being watched.` },
      ];

  return (
    <div className="w-full px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-[1120px] space-y-6">
        <div className="flex flex-col gap-4 rounded-[20px] border border-[#D9E2EA] bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-3">
            <span className="ay-monitor-dot mt-2 shrink-0" aria-hidden />
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C6B80]">Status</p>
              <h1 className="mt-1 text-2xl font-sans font-extrabold tracking-tight text-[#10203A] sm:text-3xl">
                System Active & Monitoring
              </h1>
              <p className="mt-2 max-w-xl text-sm text-[#5C6B80]">
                {config.profile.businessName} is live. Reminders and follow-ups now run from this setup \u2014 no onboarding call required.
              </p>
            </div>
          </div>
          <div className="rounded-full border border-[#D9E2EA] bg-[#F3F6F8] px-4 py-3 text-sm text-[#10203A]">
            <div className="flex items-center gap-2 font-medium">
              <Radio className="h-4 w-4 text-[#2F9E8F]" />
              Heartbeat {timeAgo(elapsed)}
            </div>
            <p className="mt-1 text-xs text-[#5C6B80]">{config.profile.timezone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-[20px] border border-[#D9E2EA] bg-white p-5">
            <Bell className="mb-3 h-5 w-5 text-[#E25A48]" />
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C6B80]">Reminder timing</p>
            <p className="mt-1 font-medium text-[#10203A]">{reminderLabel(config.delivery.reminderTiming)}</p>
          </div>
          <div className="rounded-[20px] border border-[#D9E2EA] bg-white p-5">
            <Activity className="mb-3 h-5 w-5 text-[#E25A48]" />
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C6B80]">Follow-up delay</p>
            <p className="mt-1 font-medium text-[#10203A]">{config.delivery.followUpDelay} after silence</p>
          </div>
          <div className="rounded-[20px] border border-[#D9E2EA] bg-white p-5">
            <MessageSquare className="mb-3 h-5 w-5 text-[#E25A48]" />
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C6B80]">Sending as</p>
            <p className="mt-1 font-medium text-[#10203A]">{config.channel.senderName}</p>
            <p className="text-xs text-[#5C6B80]">{config.channel.supportEmail}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="rounded-[20px] border border-[#D9E2EA] bg-white p-6 lg:col-span-3">
            <div className="mb-4 flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-[#E25A48]" />
              <h2 className="font-sans text-lg font-bold text-[#10203A]">Live pipeline</h2>
            </div>
            <ul className="space-y-3">
              {feed.map((item) => (
                <li key={item.title} className="flex gap-3 rounded-[16px] border border-[#D9E2EA] bg-[#F3F6F8] px-3 py-3">
                  <span className="w-12 shrink-0 text-xs font-medium text-[#E25A48]">{item.t}</span>
                  <div>
                    <p className="text-sm font-medium text-[#10203A]">{item.title}</p>
                    <p className="text-sm text-[#5C6B80]">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-[20px] border border-[#D9E2EA] bg-white p-6 lg:col-span-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#2F9E8F]" />
              <h2 className="font-sans text-lg font-bold text-[#10203A]">Locked config</h2>
            </div>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-[#5C6B80]">Review link</dt>
                <dd className="break-all text-[#10203A]">{config.profile.reviewLink || 'Not added'}</dd>
              </div>
              <div>
                <dt className="text-[#5C6B80]">Channel</dt>
                <dd className="text-[#10203A]">{config.channel.twilioPhone || 'Email only'}</dd>
              </div>
              <div>
                <dt className="text-[#5C6B80]">Template</dt>
                <dd className="rounded-[12px] bg-[#F3F6F8] p-3 text-xs leading-relaxed text-[#10203A]">
                  {config.delivery.messageTemplate}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => navigate(isClinic ? '/clinics' : '/coaches')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#10203A] bg-white px-[22px] py-[14px] text-sm font-medium text-[#10203A] hover:bg-[#F3F6F8]"
            >
              Back to {isClinic ? 'clinic' : 'coach'} site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OnboardingPage: React.FC = () => {
  const { searchParams, latestSubmission, audience, setAudience } = useAudience();
  const typeParam = searchParams.get('type');
  const emailParam = searchParams.get('email') || latestSubmission?.email || '';
  const segment: AudienceType = typeParam === 'clinic' || latestSubmission?.audience === 'clinic' || audience === 'clinic'
    ? 'clinic'
    : 'coach';

  React.useEffect(() => {
    if (audience !== segment) setAudience(segment);
  }, [audience, segment, setAudience]);

  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [activated, setActivated] = useState<OnboardingConfig | null>(null);

  const [businessName, setBusinessName] = useState(
    latestSubmission?.extra.clinicName || latestSubmission?.name || '',
  );
  const [timezone, setTimezone] = useState(detectTimezone());
  const [reviewLink, setReviewLink] = useState('');
  const [reminderTiming, setReminderTiming] = useState<ReminderTiming>('24h-before');
  const [followUpDelay, setFollowUpDelay] = useState<FollowUpDelay>('24h');
  const [senderName, setSenderName] = useState(latestSubmission?.name || '');
  const [supportEmail, setSupportEmail] = useState(emailParam);
  const [twilioPhone, setTwilioPhone] = useState(latestSubmission?.extra.phone || '');
  const [messageTemplate, setMessageTemplate] = useState(() =>
    defaultTemplate(segment, latestSubmission?.name || ''),
  );

  const timezoneChoices = useMemo(() => {
    return TIMEZONES.includes(timezone as (typeof TIMEZONES)[number])
      ? TIMEZONES
      : ([timezone, ...TIMEZONES] as string[]);
  }, [timezone]);

  const validateStep = () => {
    if (step === 0) {
      if (!businessName.trim()) return 'Add a practice or business name.';
      if (!timezone.trim()) return 'Choose a timezone.';
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
    if (issue) {
      setError(issue);
      return;
    }
    setError(null);
    setStep((n) => Math.min(n + 1, 2));
  };

  const activate = async () => {
    const issue = validateStep();
    if (issue) {
      setError(issue);
      return;
    }
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
      },
      delivery: {
        reminderTiming,
        followUpDelay,
        messageTemplate: messageTemplate.trim(),
      },
      channel: {
        senderName: senderName.trim(),
        supportEmail: supportEmail.trim(),
        twilioPhone: twilioPhone.trim(),
      },
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

  if (activated) return <Dashboard config={activated} />;

  return (
    <div className="w-full px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C6B80]">
          Self-serve setup \u00b7 {segment === 'clinic' ? 'Clinic' : 'Coach'}
        </p>
        <h1 className="mt-2 text-2xl font-sans font-extrabold tracking-tight text-[#10203A] sm:text-3xl">
          Turn AfterYes on without a call
        </h1>
        <p className="mt-2 text-sm text-[#5C6B80]">
          Three steps. Then the system starts watching {emailParam || 'this account'}.
        </p>

        <ol className="mt-6 mb-8 flex items-center gap-2">
          {STEPS.map((label, index) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  index <= step ? 'bg-[#E25A48] text-white' : 'bg-[#F3F6F8] text-[#5C6B80]'
                }`}
              >
                {index < step ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span className={`hidden text-xs font-medium sm:inline ${index === step ? 'text-[#10203A]' : 'text-[#5C6B80]'}`}>
                {label}
              </span>
              {index < STEPS.length - 1 && <span className="h-px flex-1 bg-[#D9E2EA]" />}
            </li>
          ))}
        </ol>

        <div className="rounded-[20px] border border-[#D9E2EA] bg-white p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#10203A]">
                {segment === 'clinic' ? 'Practice name' : 'Business name'}
                <input
                  className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EA] bg-[#F3F6F8] px-3 py-3 text-sm text-[#10203A] outline-none focus:border-[#E25A48] focus:bg-white"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={segment === 'clinic' ? 'Sharma Dental' : 'Northstar Coaching'}
                />
              </label>
              <label className="block text-sm font-medium text-[#10203A]">
                Timezone
                <select
                  className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EA] bg-[#F3F6F8] px-3 py-3 text-sm text-[#10203A] outline-none focus:border-[#E25A48] focus:bg-white"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  {timezoneChoices.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-[#10203A]">
                Review link / Google Maps URL
                <input
                  className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EA] bg-[#F3F6F8] px-3 py-3 text-sm text-[#10203A] outline-none focus:border-[#E25A48] focus:bg-white"
                  value={reviewLink}
                  onChange={(e) => setReviewLink(e.target.value)}
                  placeholder="https://maps.google.com/..."
                />
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <fieldset>
                <legend className="text-sm font-medium text-[#10203A]">Reminder timing</legend>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {REMINDER_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setReminderTiming(option.value)}
                      className={`rounded-[16px] border px-3 py-3 text-left ${
                        reminderTiming === option.value
                          ? 'border-[#E25A48] bg-[#FFF6F4]'
                          : 'border-[#D9E2EA] bg-[#F3F6F8]'
                      }`}
                    >
                      <p className="text-sm font-medium text-[#10203A]">{option.label}</p>
                      <p className="text-xs text-[#5C6B80]">{option.hint}</p>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-medium text-[#10203A]">Follow-up delay</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(['24h', '48h'] as FollowUpDelay[]).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFollowUpDelay(value)}
                      className={`rounded-[16px] border px-3 py-3 text-sm font-medium ${
                        followUpDelay === value
                          ? 'border-[#E25A48] bg-[#FFF6F4] text-[#10203A]'
                          : 'border-[#D9E2EA] bg-[#F3F6F8] text-[#5C6B80]'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="block text-sm font-medium text-[#10203A]">
                Custom message template
                <textarea
                  rows={5}
                  className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EA] bg-[#F3F6F8] px-3 py-3 text-sm text-[#10203A] outline-none focus:border-[#E25A48] focus:bg-white"
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#10203A]">
                Sender name
                <input
                  className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EA] bg-[#F3F6F8] px-3 py-3 text-sm text-[#10203A] outline-none focus:border-[#E25A48] focus:bg-white"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Priya at AfterYes"
                />
              </label>
              <label className="block text-sm font-medium text-[#10203A]">
                Support email
                <input
                  type="email"
                  className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EA] bg-[#F3F6F8] px-3 py-3 text-sm text-[#10203A] outline-none focus:border-[#E25A48] focus:bg-white"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                />
              </label>
              <label className="block text-sm font-medium text-[#10203A]">
                Twilio phone
                <input
                  className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EA] bg-[#F3F6F8] px-3 py-3 text-sm text-[#10203A] outline-none focus:border-[#E25A48] focus:bg-white"
                  value={twilioPhone}
                  onChange={(e) => setTwilioPhone(e.target.value)}
                  placeholder="+1 415 555 0134"
                />
              </label>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-[#E25A48]">{error}</p>}

          <div className="mt-6 flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setStep((n) => n - 1);
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#10203A] bg-white px-[22px] py-[14px] text-sm font-medium text-[#10203A] hover:bg-[#F3F6F8]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#E25A48] px-[22px] py-[14px] text-sm font-medium text-white hover:bg-[#C94B3B]"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={activate}
                disabled={submitting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#E25A48] px-[22px] py-[14px] text-sm font-medium text-white hover:bg-[#C94B3B] disabled:opacity-60"
              >
                {submitting ? 'Activating\u2026' : 'Activate monitoring'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
