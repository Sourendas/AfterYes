import React, { useEffect, useMemo, useState } from 'react';
import { useAudience } from '../context/AudienceContext';
import type { OnboardingConfig } from '../types';
import { calendarLabel, readOnboarding, reminderLabel } from '../utils/onboarding';
import { Activity, CalendarCheck, Mail, MessageSquare, ShieldCheck, Star } from 'lucide-react';

function timeAgo(seconds: number) {
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}

const SAMPLE: OnboardingConfig = {
  id: 'preview',
  audience: 'coach',
  email: 'preview@afteryes.app',
  profile: {
    businessName: 'Northstar Coaching',
    timezone: 'Asia/Kolkata',
    reviewLink: 'https://maps.google.com/?cid=afteryes',
    calendarProvider: 'calendly',
    calendarUrl: 'https://calendly.com/northstar',
  },
  delivery: {
    reminderTiming: '24h-before',
    followUpDelay: '24h',
    messageTemplate: '',
    emailFirst: true,
    smsMonthlyCap: 50,
  },
  channel: {
    senderName: 'Priya',
    supportEmail: 'priya@northstar.coach',
    twilioPhone: '',
  },
  engine: {
    stage1: '24h_review',
    stage2: 'day4_checkin',
    stage3: 'day10_14_rebook',
  },
  activatedAt: new Date().toISOString(),
};

export const EngineDashboard: React.FC<{ config?: OnboardingConfig | null; preview?: boolean }> = ({
  config,
  preview = false,
}) => {
  const { navigate } = useAudience();
  const live = config || readOnboarding();
  const data = live || SAMPLE;
  const isPreview = preview || !live;
  const isClinic = data.audience === 'clinic';
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setElapsed((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const feed = useMemo(
    () =>
      isClinic
        ? [
            { t: '08:12', title: 'Calendar connected', body: `${calendarLabel(data.profile.calendarProvider)} watching ${data.profile.businessName}.` },
            { t: '08:14', title: '48h reminder queued', body: 'Thu 10:30 hygiene — confirmation email armed, SMS only if no reply.' },
            { t: 'Now', title: 'Empty-chair recovery on', body: 'If a slot drops, the waitlist gets the offer automatically.' },
          ]
        : [
            { t: 'Tue 5:08', title: 'Session ended', body: `${data.profile.calendarProvider} marked Sarah K. complete. Engine started Stage 1.` },
            { t: 'Wed 9:10', title: 'Stage 1 · Review request', body: 'Email recap + Google review link sent. SMS held (email-first).' },
            { t: 'Sat 9:10', title: 'Stage 2 · Day 4 check-in', body: 'Momentum email on hydration target. No SMS used.' },
            { t: 'Now', title: 'Stage 3 armed', body: 'If no rebook by Day 14, SMS + email booking nudge fires once.' },
          ],
    [data.profile.businessName, data.profile.calendarProvider, isClinic],
  );

  return (
    <div className="w-full px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-[1120px] space-y-6">
        {isPreview && (
          <p className="text-xs text-[#5C6B80]">
            Read-only preview. Connect a calendar in setup to bind this dashboard to a real account.
          </p>
        )}
        <div className="flex flex-col gap-4 rounded-[20px] border border-[#D9E2EA] bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-3">
            <span className="ay-monitor-dot mt-2 shrink-0" aria-hidden />
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C6B80]">Coach dashboard</p>
              <h1 className="mt-1 text-2xl font-sans font-extrabold tracking-tight text-[#10203A] sm:text-3xl">
                Engine Active & Monitoring
              </h1>
              <p className="mt-2 max-w-xl text-sm text-[#5C6B80]">
                {data.profile.businessName} is live. AfterYes watches completed sessions and runs the 3-stage sequence. No send buttons.
              </p>
            </div>
          </div>
          <div className="rounded-full border border-[#D9E2EA] bg-[#F3F6F8] px-4 py-3 text-sm text-[#10203A]">
            <div className="flex items-center gap-2 font-medium">
              <Activity className="h-4 w-4 text-[#2F9E8F]" />
              Heartbeat {timeAgo(elapsed)}
            </div>
            <p className="mt-1 text-xs text-[#5C6B80]">{data.profile.timezone}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: 'Follow-ups dispatched', value: '18', hint: 'This month' },
            { label: 'Reviews requested', value: '7', hint: 'Stage 1 email' },
            { label: 'Rebooks protected', value: '3', hint: 'Stage 3 nudge' },
            { label: 'SMS used', value: '12 / 50', hint: 'Fair-use cap' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[20px] border border-[#D9E2EA] bg-white p-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#5C6B80]">{stat.label}</p>
              <p className="mt-2 text-2xl font-sans font-extrabold text-[#10203A]">{stat.value}</p>
              <p className="text-xs text-[#5C6B80]">{stat.hint}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="rounded-[20px] border border-[#D9E2EA] bg-white p-6 lg:col-span-3">
            <div className="mb-4 flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-[#E25A48]" />
              <h2 className="font-sans text-lg font-bold text-[#10203A]">Live activity</h2>
            </div>
            <ul className="space-y-3">
              {feed.map((item) => (
                <li key={item.title} className="flex gap-3 rounded-[16px] border border-[#D9E2EA] bg-[#F3F6F8] px-3 py-3">
                  <span className="w-16 shrink-0 text-xs font-medium text-[#E25A48]">{item.t}</span>
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
                <dt className="text-[#5C6B80]">Calendar</dt>
                <dd className="break-all text-[#10203A]">
                  {calendarLabel(data.profile.calendarProvider)} · {data.profile.calendarUrl || 'Not connected'}
                </dd>
              </div>
              <div>
                <dt className="text-[#5C6B80]">Review link</dt>
                <dd className="break-all text-[#10203A]">{data.profile.reviewLink || 'Not added'}</dd>
              </div>
              <div>
                <dt className="text-[#5C6B80]">Channels</dt>
                <dd className="flex items-center gap-3 text-[#10203A]">
                  <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> Email first</span>
                  <span className="inline-flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> SMS Stage 1 + 3</span>
                </dd>
              </div>
              <div>
                <dt className="text-[#5C6B80]">Reminder timing</dt>
                <dd className="text-[#10203A]">{reminderLabel(data.delivery.reminderTiming)}</dd>
              </div>
              <div>
                <dt className="text-[#5C6B80]">Sending as</dt>
                <dd className="text-[#10203A]">{data.channel.senderName}</dd>
              </div>
            </dl>
            <p className="rounded-[12px] bg-[#F3F6F8] p-3 text-xs leading-relaxed text-[#5C6B80]">
              Stage 1 email + review · Stage 2 email check-in · Stage 3 SMS only if they have not rebooked.
            </p>
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
