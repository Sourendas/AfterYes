import React from 'react';
import { useAudience } from '../context/AudienceContext';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';

export const TermsPage: React.FC = () => {
  const { audience, navigate } = useAudience();

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16 sm:py-24 text-[#1A1714]">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(audience === 'clinic' ? '/clinics' : '/coaches')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F766E] hover:underline mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {audience === 'clinic' ? 'clinics' : 'coaches'}</span>
        </button>

        <div className="mb-10">
          <div className="mb-4">
            <AfterYesLogo size="sm" />
          </div>
          <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">
            LEGAL
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1714]">Terms of Service</h1>
          <p className="text-xs text-[#6B645C] mt-1">Last updated: August 2026</p>
        </div>

        <div className="space-y-6 text-base text-[#6B645C] leading-relaxed">
          {/* Medical Disclaimer */}
          <div className="bg-[#F3EDE4] p-6 rounded-[20px] border border-[#E7E0D6] text-[#1A1714]">
            <div className="flex items-center gap-2 mb-2 font-serif font-bold text-base">
              <ShieldAlert className="w-4 h-4 text-[#0F766E]" />
              <span>Not a medical device</span>
            </div>
            <p className="text-sm">
              AfterYes is scheduling software, not a medical device. We do not diagnose, treat, or provide clinical medical advice.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E7E0D6]">
            <h2 className="text-lg font-serif text-[#1A1714] mb-2">1. Scope of software</h2>
            <p>
              AfterYes provides scheduling and client retention software for 1:1 coaches and healthcare practices to log session recaps, send appointment reminders, and track silent clients.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E7E0D6]">
            <h2 className="text-lg font-serif text-[#1A1714] mb-2">2. Billing & 7-day refund policy</h2>
            <p>
              Waitlist registration is free. When paid subscriptions begin ($29/mo for Starter, $99/mo for Practice), all new subscribers are protected by a 7-day refund policy from the date of first charge.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E7E0D6]">
            <h2 className="text-lg font-serif text-[#1A1714] mb-2">3. Governing law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of India.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E7E0D6]">
            <h2 className="text-lg font-serif text-[#1A1714] mb-2">4. Contact</h2>
            <p>
              Questions regarding these terms may be sent directly to{' '}
              <a href="mailto:afteryes.team@gmail.com" className="text-[#0F766E] underline">
                afteryes.team@gmail.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
