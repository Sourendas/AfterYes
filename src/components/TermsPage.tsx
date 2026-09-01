import React from 'react';
import { useAudience } from '../context/AudienceContext';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';

export const TermsPage: React.FC = () => {
  const { audience, navigate } = useAudience();
  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16 sm:py-24 text-[#10203A]">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(audience === 'clinic' ? '/clinics' : '/coaches')} className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E25A48] hover:underline mb-8 cursor-pointer">
          <ArrowLeft className="w-4 h-4" /><span>Back to {audience === 'clinic' ? 'clinics' : 'coaches'}</span>
        </button>
        <div className="mb-10">
          <div className="mb-4"><AfterYesLogo size="sm" /></div>
          <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#5C6B80] mb-2">LEGAL</div>
          <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#10203A]">Terms of Service</h1>
          <p className="text-xs text-[#5C6B80] mt-1">Last updated: August 2026</p>
        </div>
        <div className="space-y-6 text-base text-[#5C6B80] leading-relaxed">
          <div className="bg-[#F3F6F8] p-6 rounded-[20px] border border-[#D9E2EA] text-[#10203A]">
            <div className="flex items-center gap-2 mb-2 font-bold text-base">
              <ShieldAlert className="w-4 h-4 text-[#E25A48]" />
              <span>Not a medical device</span>
            </div>
            <p className="text-sm">AfterYes is scheduling software, not a medical device. We do not diagnose, treat, or provide clinical medical advice.</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] border border-[#D9E2EA]">
            <h2 className="text-lg font-sans font-bold text-[#10203A] mb-2">1. Scope of software</h2>
            <p>AfterYes provides scheduling and client retention software for 1:1 coaches and healthcare practices to log session recaps, send appointment reminders, and track silent clients.</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] border border-[#D9E2EA]">
            <h2 className="text-lg font-sans font-bold text-[#10203A] mb-2">2. Billing & 7-day refund policy</h2>
            <p>Waitlist registration is free. When paid subscriptions begin ($29/mo for Starter, $99/mo for Practice), all new subscribers are protected by a 7-day refund policy from the date of first charge.</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] border border-[#D9E2EA]">
            <h2 className="text-lg font-sans font-bold text-[#10203A] mb-2">3. Governing law</h2>
            <p>These Terms of Service are governed by and construed in accordance with the laws of India.</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] border border-[#D9E2EA]">
            <h2 className="text-lg font-sans font-bold text-[#10203A] mb-2">4. Contact</h2>
            <p>Questions regarding these terms may be sent directly to <a href="mailto:afteryes.team@gmail.com" className="text-[#E25A48] underline">afteryes.team@gmail.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
