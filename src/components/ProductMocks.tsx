import React from 'react';
import { Check, PhoneCall, Calendar } from 'lucide-react';

export const BrowserChrome: React.FC<{ url?: string; children: React.ReactNode }> = ({
  url = 'app.afteryes.com',
  children,
}) => (
  <div className="ay-mock overflow-hidden rounded-[20px] border border-[#D9E2EA] bg-white">
    <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 border-b border-[#D9E2EA] bg-[#F3F6F8]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#E8B4A8]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#E6D39A]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#B7D0C4]" />
      <div className="ml-2 flex-1 min-w-0 h-6 rounded-full bg-white border border-[#D9E2EA] px-3 flex items-center">
        <span className="text-[11px] text-[#5C6B80] truncate">{url}</span>
      </div>
    </div>
    <div className="p-4 sm:p-6">{children}</div>
  </div>
);

export const PhoneChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="ay-mock mx-auto max-w-[340px] rounded-[32px] border-[6px] border-[#10203A] bg-white overflow-hidden">
    <div className="h-6 bg-[#10203A] flex items-center justify-center">
      <span className="w-16 h-1.5 rounded-full bg-white/30" />
    </div>
    <div className="bg-[#10203A] px-4 py-2.5 text-white text-sm font-medium">Sarah K.</div>
    <div className="bg-[#ECE5DD] p-4 min-h-[260px]">{children}</div>
  </div>
);

export const AnimatedRadarMock: React.FC = () => {
  const rows = [
    { name: 'Marcus V. · Nutrition', detail: 'Session logged Tuesday · WhatsApp recap delivered', status: 'ok', label: 'Next: Thu 4pm' },
    { name: 'Priya S. · Career 1:1', detail: 'Check-in replied yesterday · on track', status: 'ok', label: 'Next: Fri 9am' },
    { name: 'Sarah K. · Mindset 1:1', detail: 'No check-in reply in 7 days · drift risk flagged', status: 'flag', label: '7-day quiet flag' },
    { name: 'Daniel R. · Strength block', detail: 'Recap opened · Thursday still confirmed', status: 'ok', label: 'Confirmed' },
  ];
  return (
    <BrowserChrome url="app.afteryes.com/radar">
      <div className="flex items-center justify-between pb-4 border-b border-[#D9E2EA] mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E8F4F4] flex items-center justify-center text-[#E25A48] font-sans font-bold text-sm">AY</div>
          <div>
            <h3 className="text-base font-sans font-bold text-[#10203A]">Client Retention Radar</h3>
            <p className="text-xs text-[#5C6B80]">Weekly roster · 18 active clients</p>
          </div>
        </div>
        <span className="text-xs font-medium text-[#E25A48] bg-[#E8F4F4] px-3 py-1 rounded-full ay-pulse">1 quiet flag detected</span>
      </div>
      <div className="space-y-2.5 text-sm">
        {rows.map((row) => (
          <div key={row.name} className={`p-3.5 rounded-[12px] flex items-center justify-between gap-3 ay-rise-row ${row.status === 'flag' ? 'bg-white border border-[#E25A48] ay-flag-in' : 'bg-[#F3F6F8] border border-[#D9E2EA]'}`}>
            <div className="min-w-0">
              <p className="font-medium text-[#10203A] truncate">{row.name}</p>
              <p className="text-xs text-[#5C6B80] truncate">{row.detail}</p>
            </div>
            {row.status === 'flag' ? (
              <span className="text-xs bg-[#E8F4F4] text-[#E25A48] px-2.5 py-1 rounded-[8px] font-medium shrink-0">{row.label}</span>
            ) : (
              <span className="text-xs text-[#E25A48] font-medium flex items-center gap-1 shrink-0"><Check className="w-3.5 h-3.5" /> {row.label}</span>
            )}
          </div>
        ))}
      </div>
    </BrowserChrome>
  );
};

export const WhatsAppRecapMock: React.FC = () => (
  <PhoneChrome>
    <div className="space-y-3">
      <div className="max-w-[92%] rounded-[16px] rounded-tl-sm bg-[#DCF8C6] px-3.5 py-2.5 text-[13px] text-[#10203A] ay-bubble shadow-sm">
        Hi Sarah — recap from Tuesday: we locked the 7am walk and the Thursday check-in. Reply YES if Thursday 4pm still works.
      </div>
      <div className="max-w-[70%] ml-auto rounded-[16px] rounded-tr-sm bg-white px-3.5 py-2.5 text-[13px] text-[#5C6B80] ay-bubble ay-bubble-delay shadow-sm">…</div>
      <p className="text-[11px] text-[#5C6B80] text-center pt-2">If she stays quiet for 7 days, she surfaces on your radar.</p>
    </div>
  </PhoneChrome>
);

export const SessionNoteMock: React.FC = () => (
  <BrowserChrome url="app.afteryes.com/sessions/marcus">
    <p className="text-xs uppercase tracking-[0.12em] font-medium text-[#5C6B80] mb-4">60-second session log</p>
    <div className="space-y-3 text-sm">
      <div className="flex justify-between border-b border-[#D9E2EA] pb-2.5"><span className="text-[#5C6B80]">Client</span><span className="text-[#10203A] font-medium">Marcus V.</span></div>
      <div className="flex justify-between border-b border-[#D9E2EA] pb-2.5"><span className="text-[#5C6B80]">Covered</span><span className="text-[#10203A] text-right">Protein target + sleep window</span></div>
      <div className="flex justify-between border-b border-[#D9E2EA] pb-2.5"><span className="text-[#5C6B80]">Commitment</span><span className="text-[#10203A] text-right">Walk 7am · 4 days</span></div>
      <div className="flex justify-between"><span className="text-[#5C6B80]">Next</span><span className="text-[#E25A48] font-medium">Thu 4:00pm · WhatsApp</span></div>
    </div>
    <div className="mt-4 text-xs text-[#E25A48] bg-[#E8F4F4] rounded-[10px] px-3 py-2">Saved. Recap queued to WhatsApp.</div>
  </BrowserChrome>
);

export const AnimatedClinicMock: React.FC = () => (
  <BrowserChrome url="app.afteryes.com/practice">
    <div className="flex items-center justify-between pb-4 border-b border-[#D9E2EA] mb-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#E8F4F4] flex items-center justify-center text-[#E25A48] font-sans font-bold text-sm">AY</div>
        <div>
          <h3 className="text-base font-sans font-bold text-[#10203A]">Practice Calendar & Call Queue</h3>
          <p className="text-xs text-[#5C6B80]">Dr. Patel Practice · Dental</p>
        </div>
      </div>
      <span className="text-xs font-medium text-[#E25A48] bg-[#E8F4F4] px-3 py-1 rounded-full ay-pulse">Front desk active</span>
    </div>
    <div className="space-y-2.5 text-sm">
      <div className="p-3.5 bg-[#F3F6F8] rounded-[12px] border border-[#D9E2EA] flex items-center justify-between gap-3 ay-slot">
        <div>
          <p className="font-medium text-[#10203A]">7:14 PM · Inbound caller</p>
          <p className="text-xs text-[#5C6B80]">Slot booked: Thursday 10:30 AM · SMS sent</p>
        </div>
        <span className="text-xs text-[#E25A48] font-medium flex items-center gap-1 shrink-0"><Check className="w-3.5 h-3.5" /> Booked</span>
      </div>
      <div className="p-3.5 bg-white rounded-[12px] border border-[#E25A48] flex items-center justify-between gap-3">
        <div>
          <p className="font-medium text-[#10203A]">No-show recovery queue</p>
          <p className="text-xs text-[#5C6B80]">2 canceled slots re-offered to waitlist</p>
        </div>
        <span className="text-xs bg-[#E8F4F4] text-[#E25A48] px-2.5 py-1 rounded-[8px] font-medium shrink-0">2 chairs saved</span>
      </div>
    </div>
  </BrowserChrome>
);

export const ReminderThreadMock: React.FC = () => (
  <BrowserChrome url="app.afteryes.com/reminders">
    <div className="flex items-center gap-2 mb-5 text-[#E25A48]">
      <Calendar className="w-4 h-4" />
      <span className="text-xs uppercase tracking-[0.12em] font-medium">Reminder sequence</span>
    </div>
    <ol className="space-y-3 text-sm">
      {['48 hours out — SMS + email: “Confirm or reschedule Thursday 10:30.”','2 hours out — short reminder. No reply still keeps the chair marked at risk.','No-show — slot hits the recovery list so the next patient can take it.'].map((line, i) => (
        <li key={line} className="flex gap-3 ay-step">
          <span className="w-6 h-6 rounded-full bg-[#E8F4F4] text-[#E25A48] text-xs flex items-center justify-center shrink-0">{i + 1}</span>
          <p className="text-[#10203A] pt-0.5">{line}</p>
        </li>
      ))}
    </ol>
  </BrowserChrome>
);

export const VoiceDeskMock: React.FC = () => (
  <BrowserChrome url="app.afteryes.com/voice">
    <div className="flex items-center gap-2 mb-5 text-[#E25A48]">
      <PhoneCall className="w-4 h-4" />
      <span className="text-xs uppercase tracking-[0.12em] font-medium">After-hours voice add-on</span>
    </div>
    <div className="rounded-[16px] border border-[#D9E2EA] bg-[#F3F6F8] p-4">
      <p className="text-xs text-[#5C6B80] mb-2">Live call · 7:14pm</p>
      <p className="text-sm text-[#10203A] leading-relaxed">“Thursday at 10:30 is open. I can book that now and send the confirmation.”</p>
    </div>
    <p className="text-xs text-[#5C6B80] mt-3">+$49/mo · 100 minutes included · then $0.25/min. Optional.</p>
  </BrowserChrome>
);

interface StoryProps { eyebrow: string; title: string; body: string; points: string[]; mock: React.ReactNode; flip?: boolean; }
export const ServiceStory: React.FC<StoryProps> = ({ eyebrow, title, body, points, mock, flip }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
    <div>
      <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#E25A48] mb-3">{eyebrow}</div>
      <h3 className="text-2xl sm:text-[2rem] font-sans font-extrabold text-[#10203A] mb-4 leading-[1.2]">{title}</h3>
      <p className="text-base text-[#5C6B80] leading-relaxed mb-6">{body}</p>
      <ul className="space-y-3">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-[#10203A]">
            <Check className="w-4 h-4 text-[#E25A48] mt-0.5 shrink-0" /><span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
    <div>{mock}</div>
  </div>
);
