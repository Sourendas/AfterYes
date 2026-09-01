import React from 'react';
import { Check, MessageCircle, PhoneCall, Calendar } from 'lucide-react';

export const AnimatedRadarMock: React.FC = () => {
  return (
    <div className="ay-mock bg-[#FFFFFF] rounded-[20px] p-6 sm:p-8 border border-[#E7E0D6]">
      <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D6] mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] font-serif font-bold text-sm">AY</div>
          <div>
            <h3 className="text-base font-serif text-[#1A1714]">Client Retention Radar</h3>
            <p className="text-xs text-[#6B645C]">Weekly roster · 18 active clients</p>
          </div>
        </div>
        <span className="text-xs font-medium text-[#0F766E] bg-[#E6F4F1] px-3 py-1 rounded-full ay-pulse">1 quiet flag detected</span>
      </div>
      <div className="space-y-3 text-sm">
        <div className="p-3.5 bg-[#FAF7F2] rounded-[12px] border border-[#E7E0D6] flex items-center justify-between gap-3">
          <div>
            <p className="font-medium text-[#1A1714]">Marcus V. · Nutrition & Habit Coaching</p>
            <p className="text-xs text-[#6B645C]">Session logged Tuesday · WhatsApp recap delivered</p>
          </div>
          <span className="text-xs text-[#0F766E] font-medium flex items-center gap-1 shrink-0"><Check className="w-3.5 h-3.5" /> Next: Thu 4pm</span>
        </div>
        <div className="p-3.5 bg-[#FFFFFF] rounded-[12px] border border-[#0F766E] flex items-center justify-between gap-3 ay-flag-in">
          <div>
            <p className="font-medium text-[#1A1714]">Sarah K. · Mindset 1:1</p>
            <p className="text-xs text-[#6B645C]">No check-in reply in 7 days · Drift risk flagged</p>
          </div>
          <span className="text-xs bg-[#E6F4F1] text-[#0F766E] px-2.5 py-1 rounded-[8px] font-medium shrink-0">7-day quiet flag</span>
        </div>
      </div>
    </div>
  );
};

export const WhatsAppRecapMock: React.FC = () => {
  return (
    <div className="ay-mock bg-[#FFFFFF] rounded-[20px] p-6 sm:p-8 border border-[#E7E0D6]">
      <div className="flex items-center gap-2 mb-5 text-[#0F766E]">
        <MessageCircle className="w-4 h-4" />
        <span className="text-xs uppercase tracking-[0.12em] font-medium">WhatsApp recap</span>
      </div>
      <div className="space-y-3">
        <div className="max-w-[92%] rounded-[16px] rounded-tl-sm bg-[#E6F4F1] px-4 py-3 text-sm text-[#1A1714] ay-bubble">
          Hi Sarah — recap from Tuesday: we locked the 7am walk and the Thursday check-in. Reply YES if Thursday 4pm still works.
        </div>
        <div className="max-w-[80%] ml-auto rounded-[16px] rounded-tr-sm bg-[#FAF7F2] border border-[#E7E0D6] px-4 py-3 text-sm text-[#6B645C] ay-bubble ay-bubble-delay">…</div>
        <p className="text-xs text-[#6B645C]">If she stays quiet for 7 days, she surfaces on your radar.</p>
      </div>
    </div>
  );
};

export const SessionNoteMock: React.FC = () => {
  return (
    <div className="ay-mock bg-[#FFFFFF] rounded-[20px] p-6 sm:p-8 border border-[#E7E0D6]">
      <p className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B645C] mb-3">60-second session log</p>
      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between border-b border-[#E7E0D6] pb-2"><span className="text-[#6B645C]">Client</span><span className="text-[#1A1714] font-medium">Marcus V.</span></div>
        <div className="flex justify-between border-b border-[#E7E0D6] pb-2"><span className="text-[#6B645C]">Covered</span><span className="text-[#1A1714]">Protein target + sleep window</span></div>
        <div className="flex justify-between"><span className="text-[#6B645C]">Next</span><span className="text-[#0F766E] font-medium">Thu 4:00pm · WhatsApp</span></div>
      </div>
    </div>
  );
};

export const AnimatedClinicMock: React.FC = () => {
  return (
    <div className="ay-mock bg-[#FFFFFF] rounded-[20px] p-6 sm:p-8 border border-[#E7E0D6]">
      <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D6] mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] font-serif font-bold text-sm">AY</div>
          <div>
            <h3 className="text-base font-serif text-[#1A1714]">Practice Calendar & Call Queue</h3>
            <p className="text-xs text-[#6B645C]">Dr. Patel Practice · Dental & Physio</p>
          </div>
        </div>
        <span className="text-xs font-medium text-[#0F766E] bg-[#E6F4F1] px-3 py-1 rounded-full ay-pulse">Front desk active</span>
      </div>
      <div className="space-y-3 text-sm">
        <div className="p-3.5 bg-[#FAF7F2] rounded-[12px] border border-[#E7E0D6] flex items-center justify-between gap-3 ay-slot">
          <div>
            <p className="font-medium text-[#1A1714]">7:14 PM · Inbound caller (new patient)</p>
            <p className="text-xs text-[#6B645C]">Slot booked: Thursday 10:30 AM · SMS confirmation sent</p>
          </div>
          <span className="text-xs text-[#0F766E] font-medium flex items-center gap-1 shrink-0"><Check className="w-3.5 h-3.5" /> Booked</span>
        </div>
        <div className="p-3.5 bg-[#FFFFFF] rounded-[12px] border border-[#0F766E] flex items-center justify-between gap-3">
          <div>
            <p className="font-medium text-[#1A1714]">No-show recovery queue</p>
            <p className="text-xs text-[#6B645C]">2 canceled slots re-offered to waitlisted patients</p>
          </div>
          <span className="text-xs bg-[#E6F4F1] text-[#0F766E] px-2.5 py-1 rounded-[8px] font-medium shrink-0">2 chairs saved</span>
        </div>
      </div>
    </div>
  );
};

export const ReminderThreadMock: React.FC = () => {
  return (
    <div className="ay-mock bg-[#FFFFFF] rounded-[20px] p-6 sm:p-8 border border-[#E7E0D6]">
      <div className="flex items-center gap-2 mb-5 text-[#0F766E]">
        <Calendar className="w-4 h-4" />
        <span className="text-xs uppercase tracking-[0.12em] font-medium">Reminder sequence</span>
      </div>
      <ol className="space-y-3 text-sm">
        <li className="flex gap-3 ay-step"><span className="w-6 h-6 rounded-full bg-[#E6F4F1] text-[#0F766E] text-xs flex items-center justify-center shrink-0">1</span><p className="text-[#1A1714]">48 hours out — SMS + email: “Confirm or reschedule Thursday 10:30.”</p></li>
        <li className="flex gap-3 ay-step"><span className="w-6 h-6 rounded-full bg-[#E6F4F1] text-[#0F766E] text-xs flex items-center justify-center shrink-0">2</span><p className="text-[#1A1714]">2 hours out — short reminder. No reply still keeps the chair marked at risk.</p></li>
        <li className="flex gap-3 ay-step"><span className="w-6 h-6 rounded-full bg-[#E6F4F1] text-[#0F766E] text-xs flex items-center justify-center shrink-0">3</span><p className="text-[#1A1714]">No-show — slot hits the recovery list so the next patient can take it.</p></li>
      </ol>
    </div>
  );
};

export const VoiceDeskMock: React.FC = () => {
  return (
    <div className="ay-mock bg-[#FFFFFF] rounded-[20px] p-6 sm:p-8 border border-[#E7E0D6]">
      <div className="flex items-center gap-2 mb-5 text-[#0F766E]">
        <PhoneCall className="w-4 h-4" />
        <span className="text-xs uppercase tracking-[0.12em] font-medium">After-hours voice add-on</span>
      </div>
      <div className="rounded-[16px] border border-[#E7E0D6] bg-[#FAF7F2] p-4">
        <p className="text-xs text-[#6B645C] mb-2">Live call · 7:14pm</p>
        <p className="text-sm text-[#1A1714] leading-relaxed ay-type">“Thursday at 10:30 is open. I can book that now and send the confirmation.”</p>
      </div>
      <p className="text-xs text-[#6B645C] mt-3">+$49/mo · 100 minutes included · then $0.25/min. Optional.</p>
    </div>
  );
};

interface StoryProps {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  mock: React.ReactNode;
  flip?: boolean;
}

export const ServiceStory: React.FC<StoryProps> = ({ eyebrow, title, body, points, mock, flip }) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <div>
        <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B645C] mb-3">{eyebrow}</div>
        <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1714] mb-4 leading-[1.2]">{title}</h3>
        <p className="text-base text-[#6B645C] leading-relaxed mb-5">{body}</p>
        <ul className="space-y-2.5">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-[#1A1714]">
              <Check className="w-4 h-4 text-[#0F766E] mt-0.5 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>{mock}</div>
    </div>
  );
};
