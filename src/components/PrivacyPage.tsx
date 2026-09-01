import React from 'react';
import { useAudience } from '../context/AudienceContext';
import { ArrowLeft } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';

export const PrivacyPage: React.FC = () => {
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
          <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#10203A]">Privacy Policy</h1>
          <p className="text-xs text-[#5C6B80] mt-1">Last updated: August 2026</p>
        </div>
        <div className="space-y-6 text-base text-[#5C6B80] leading-relaxed">
          <div className="bg-white p-6 rounded-[20px] border border-[#D9E2EA]">
            <h2 className="text-lg font-sans font-bold text-[#10203A] mb-2">1. Waitlist data only</h2>
            <p>We collect your name, email, business name, and optional phone number solely to manage our founding waitlist and notify you when onboarding begins. We do not sell, rent, or monetize your contact information.</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] border border-[#D9E2EA]">
            <h2 className="text-lg font-sans font-bold text-[#10203A] mb-2">2. Scheduling and contact records</h2>
            <p>When active, AfterYes processes scheduling details and contact reminders. AfterYes is scheduling software, not a medical device. We do not store or process clinical medical records or diagnostic information.</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] border border-[#D9E2EA]">
            <h2 className="text-lg font-sans font-bold text-[#10203A] mb-2">3. Governing law</h2>
            <p>This policy is governed by the laws of India.</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] border border-[#D9E2EA]">
            <h2 className="text-lg font-sans font-bold text-[#10203A] mb-2">4. Contact</h2>
            <p>For any questions or data deletion requests, contact us at <a href="mailto:afteryes.team@gmail.com" className="text-[#E25A48] underline">afteryes.team@gmail.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
