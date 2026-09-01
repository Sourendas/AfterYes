import React, { useEffect, useState } from 'react';
import { CalendarClock, PhoneCall, UserPlus } from 'lucide-react';

type SlotStatus = 'Confirmed' | 'Reminder sent' | 'Cancelled';
type Slot = { time: string; patient: string; procedure: string; status: SlotStatus };

const INITIAL: Slot[] = [
  { time: '9:00', patient: 'A. Mehta', procedure: 'Consult', status: 'Confirmed' },
  { time: '10:30', patient: 'R. Joseph', procedure: 'Cleaning', status: 'Cancelled' },
  { time: '12:00', patient: 'L. Chen', procedure: 'Follow-up', status: 'Reminder sent' },
  { time: '3:30', patient: 'Open', procedure: 'Cleaning', status: 'Cancelled' },
];

const WAITLIST = 'Neha S.';
const LINES = [
  { who: 'Patient', text: 'Hi, do you have an opening tomorrow afternoon for a cleaning?' },
  { who: 'AfterYes', text: 'We have an opening at 3:30 PM with Dr. Sharma. Would you like me to reserve that for you?' },
  { who: 'Patient', text: 'Yes, 3:30 works.' },
  { who: 'AfterYes', text: 'Booked. You will get a confirmation text. This line does not give medical advice.' },
];

const statusClass = (s: SlotStatus) => {
  if (s === 'Confirmed') return 'bg-[#E8F4F4] text-[#0F766E]';
  if (s === 'Reminder sent') return 'bg-[#F3F6F8] text-[#10203A]';
  return 'bg-[#E25A48]/10 text-[#E25A48]';
};

export const ClinicDemo: React.FC = () => {
  const [slots, setSlots] = useState(INITIAL);
  const [sms, setSms] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [line, setLine] = useState(-1);

  useEffect(() => {
    if (!playing) return;
    if (line >= LINES.length - 1) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => setLine((n) => n + 1), line < 0 ? 200 : 1400);
    return () => window.clearTimeout(t);
  }, [playing, line]);

  const fillWaitlist = (time: string) => {
    const slot = slots.find((s) => s.time === time);
    setSlots((prev) => prev.map((s) => (s.time === time ? { ...s, patient: WAITLIST, status: 'Confirmed' } : s)));
    setSms(`Hi ${WAITLIST} — a ${time} ${slot?.procedure || 'appointment'} just opened with Dr. Sharma. Reply YES to take the slot. AfterYes`);
  };

  const visible = line < 0 ? [] : LINES.slice(0, line + 1);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <CalendarClock className="w-4 h-4 text-[#E25A48]" />
          <h3 className="text-sm font-semibold text-[#10203A]">Today's schedule</h3>
        </div>
        <div className="rounded-[16px] border border-[#D9E2EA] divide-y divide-[#D9E2EA] overflow-hidden">
          {slots.map((s) => (
            <div key={s.time} className="flex flex-col sm:flex-row sm:items-center gap-2 px-3 py-3">
              <div className="w-14 text-sm font-semibold text-[#10203A]">{s.time}</div>
              <div className="flex-1 text-sm">
                <div className="font-medium text-[#10203A]">{s.patient}</div>
                <div className="text-xs text-[#5C6B80]">{s.procedure}</div>
              </div>
              <span className={`self-start text-[11px] font-medium px-2 py-0.5 rounded-full ${statusClass(s.status)}`}>
                {s.status === 'Reminder sent' ? 'SMS reminder dispatched' : s.status === 'Cancelled' ? 'Cancelled / empty' : s.status}
              </span>
              {s.status === 'Cancelled' && s.patient !== WAITLIST && (
                <button type="button" onClick={() => fillWaitlist(s.time)} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full bg-[#10203A] text-white hover:bg-[#1a2d4e]">
                  <UserPlus className="w-3.5 h-3.5" />
                  Auto-fill with waitlist
                </button>
              )}
            </div>
          ))}
        </div>
        {sms && (
          <div className="mt-3 rounded-[16px] border border-[#D9E2EA] bg-[#F3F6F8] px-4 py-3 text-sm text-[#10203A]">
            <div className="text-[11px] uppercase tracking-[0.12em] text-[#5C6B80] mb-1">Automated SMS preview</div>
            {sms}
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#E25A48]" />
            <h3 className="text-sm font-semibold text-[#10203A]">After-hours voice demo</h3>
          </div>
          <button type="button" onClick={() => { setLine(-1); setPlaying(true); }} className="text-xs font-medium px-3 py-2 rounded-full border border-[#D9E2EA] hover:bg-[#F3F6F8]">
            {playing ? 'Playing…' : 'Play transcript'}
          </button>
        </div>
        <div className="rounded-[16px] border border-[#D9E2EA] bg-[#10203A] text-white p-4 min-h-[200px] space-y-2.5">
          {visible.length === 0 && <p className="text-sm text-white/60">Press play to hear how an after-hours cleaning request is booked — no clinical advice.</p>}
          {visible.map((l, i) => (
            <div key={`${l.who}-${i}`} className={`max-w-[92%] ${l.who === 'AfterYes' ? 'ml-auto' : ''}`}>
              <div className="text-[10px] uppercase tracking-[0.12em] text-white/45 mb-0.5">{l.who}</div>
              <div className={`text-sm leading-relaxed px-3 py-2 rounded-2xl ${l.who === 'AfterYes' ? 'bg-[#E25A48] rounded-tr-sm' : 'bg-white/10 rounded-tl-sm'}`}>{l.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
