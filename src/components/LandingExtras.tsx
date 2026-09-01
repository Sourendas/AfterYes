import React from 'react';
import { ArrowRight, Check, X } from 'lucide-react';

export const ProofStrip: React.FC<{ items: string[] }> = ({ items }) => (
  <section className="border-t border-[#E7E0D6] bg-[#FFFFFF]">
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item) => (
        <p key={item} className="text-sm sm:text-base font-serif text-[#1A1714] leading-snug">
          {item}
        </p>
      ))}
    </div>
  </section>
);

export const ProblemBand: React.FC<{
  eyebrow: string;
  title: string;
  lead: string;
  columns: { title: string; body: string }[];
}> = ({ eyebrow, title, lead, columns }) => (
  <section className="py-16 sm:py-24 border-t border-[#E7E0D6]">
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
      <div className="max-w-2xl mb-10 sm:mb-14">
        <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B645C] mb-2">{eyebrow}</div>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714] mb-4">{title}</h2>
        <p className="text-base text-[#6B645C] leading-relaxed">{lead}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col.title} className="bg-[#FFFFFF] rounded-[20px] border border-[#E7E0D6] p-7">
            <h3 className="text-lg font-serif text-[#1A1714] mb-2">{col.title}</h3>
            <p className="text-sm text-[#6B645C] leading-relaxed">{col.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const WeekTimeline: React.FC<{
  eyebrow: string;
  title: string;
  steps: { day: string; title: string; body: string }[];
}> = ({ eyebrow, title, steps }) => (
  <section className="py-16 sm:py-24 border-t border-[#E7E0D6] bg-[#FFFFFF]">
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B645C] mb-2">{eyebrow}</div>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {steps.map((step, i) => (
          <div key={step.day} className="relative rounded-[20px] border border-[#E7E0D6] bg-[#FAF7F2] p-6">
            <div className="text-xs uppercase tracking-[0.12em] text-[#0F766E] font-medium mb-3">
              {String(i + 1).padStart(2, '0')} · {step.day}
            </div>
            <h3 className="text-lg font-serif text-[#1A1714] mb-2">{step.title}</h3>
            <p className="text-sm text-[#6B645C] leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const CompareTable: React.FC<{
  title: string;
  lead: string;
  headers: [string, string, string];
  rows: { label: string; a: string; b: string }[];
}> = ({ title, lead, headers, rows }) => (
  <section className="py-16 sm:py-24 border-t border-[#E7E0D6]">
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B645C] mb-2">Where this sits</div>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714] mb-3">{title}</h2>
        <p className="text-base text-[#6B645C] leading-relaxed">{lead}</p>
      </div>
      <div className="overflow-x-auto rounded-[20px] border border-[#E7E0D6] bg-[#FFFFFF]">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-[#E7E0D6] text-left">
              <th className="px-5 py-4 font-medium text-[#6B645C]">{headers[0]}</th>
              <th className="px-5 py-4 font-serif text-[#1A1714]">{headers[1]}</th>
              <th className="px-5 py-4 font-serif text-[#0F766E] bg-[#E6F4F1]">{headers[2]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-[#E7E0D6] last:border-0">
                <td className="px-5 py-4 text-[#6B645C]">{row.label}</td>
                <td className="px-5 py-4 text-[#1A1714]">{row.a}</td>
                <td className="px-5 py-4 text-[#1A1714] bg-[#E6F4F1]/50">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export const NotThis: React.FC<{ yes: string[]; no: string[] }> = ({ yes, no }) => (
  <section className="py-16 sm:py-24 border-t border-[#E7E0D6]">
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-[20px] border border-[#E7E0D6] bg-[#FFFFFF] p-7 sm:p-8">
        <h3 className="text-xl font-serif text-[#1A1714] mb-5">This is for you if</h3>
        <ul className="space-y-3">
          {yes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-[#1A1714]">
              <Check className="w-4 h-4 text-[#0F766E] mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[20px] border border-[#E7E0D6] bg-[#FAF7F2] p-7 sm:p-8">
        <h3 className="text-xl font-serif text-[#1A1714] mb-5">This is not for you if</h3>
        <ul className="space-y-3">
          {no.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-[#6B645C]">
              <X className="w-4 h-4 text-[#6B645C] mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export const MidInvite: React.FC<{
  title: string;
  body: string;
  cta: string;
  onCta: () => void;
}> = ({ title, body, cta, onCta }) => (
  <section className="py-16 sm:py-20 border-t border-[#E7E0D6]">
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center bg-[#FFFFFF] border border-[#E7E0D6] rounded-[24px] py-12 sm:py-16 px-6">
      <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714] mb-3">{title}</h2>
      <p className="text-base text-[#6B645C] mb-7 max-w-xl mx-auto leading-relaxed">{body}</p>
      <button
        onClick={onCta}
        className="inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors cursor-pointer"
      >
        <span>{cta}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </section>
);
