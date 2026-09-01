import React, { useEffect, useState } from 'react';
import { useAudience } from '../context/AudienceContext';
import { ArrowLeft, Check, Share2, CheckCircle2 } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';

export const ThanksPage: React.FC = () => {
  const { searchParams, latestSubmission, navigate } = useAudience();
  const [copiedLink, setCopiedLink] = useState(false);
  const typeParam = searchParams.get('type');
  const isClinic = typeParam === 'clinic' || latestSubmission?.audience === 'clinic';
  const roleName = isClinic ? 'clinic' : 'coach';
  const foundingPrice = isClinic ? '$99' : '$29';

  useEffect(() => {
    if (latestSubmission) console.log('[AfterYes Founding List Submission]:', latestSubmission);
  }, [latestSubmission]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full min-h-[75vh] py-16 sm:py-24 px-4 sm:px-6 max-w-[1120px] mx-auto text-[#10203A]">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-8"><AfterYesLogo size="lg" /></div>
        <div className="w-12 h-12 rounded-[14px] bg-[#E8F4F4] text-[#E25A48] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-[#10203A] tracking-tight mb-4">You’re on the {roleName} founding list.</h1>
        <p className="text-base sm:text-lg text-[#5C6B80] max-w-lg mx-auto leading-relaxed mb-8">We’ll write from <strong className="text-[#10203A] font-medium">afteryes.team@gmail.com</strong>.</p>
        <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#D9E2EA] mb-8 text-left">
          <div className="flex items-center justify-between pb-4 border-b border-[#D9E2EA] mb-4">
            <span className="text-xs uppercase tracking-[0.12em] font-medium text-[#5C6B80]">Founding Reservation</span>
            <span className="text-xs bg-[#E8F4F4] text-[#E25A48] font-medium px-2.5 py-0.5 rounded-full">{foundingPrice}/mo lock</span>
          </div>
          {latestSubmission ? (
            <div className="space-y-2 text-sm text-[#10203A]">
              <p><strong className="font-medium text-[#5C6B80]">Name:</strong> {latestSubmission.name}</p>
              <p><strong className="font-medium text-[#5C6B80]">Email:</strong> {latestSubmission.email}</p>
              {latestSubmission.extra.clinicName && <p><strong className="font-medium text-[#5C6B80]">Clinic:</strong> {latestSubmission.extra.clinicName}</p>}
              {latestSubmission.extra.specialty && <p><strong className="font-medium text-[#5C6B80]">Specialty:</strong> {latestSubmission.extra.specialty}</p>}
              {latestSubmission.extra.clientCount && <p><strong className="font-medium text-[#5C6B80]">Clients:</strong> {latestSubmission.extra.clientCount}</p>}
            </div>
          ) : (
            <p className="text-sm text-[#5C6B80]">Your submission has been recorded in this browser session and queued for early onboarding invitations.</p>
          )}
          <div className="mt-6 pt-4 border-t border-[#D9E2EA] text-xs text-[#5C6B80]">First 50 coaches keep $29/mo and first 30 clinics keep $99/mo for 12 months.</div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button onClick={() => navigate(isClinic ? '/clinics' : '/coaches')} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-full bg-[#E25A48] text-white text-base font-medium hover:bg-[#C94B3B] transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" /><span>Return to {isClinic ? 'clinic' : 'coach'} page</span>
          </button>
          <button onClick={handleShare} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-full bg-white hover:bg-[#F3F6F8] border-2 border-[#10203A] text-[#10203A] text-base font-medium transition-colors cursor-pointer">
            {copiedLink ? <><Check className="w-4 h-4 text-[#E25A48]" /><span>Link copied</span></> : <><Share2 className="w-4 h-4 text-[#5C6B80]" /><span>Share AfterYes</span></>}
          </button>
        </div>
      </div>
    </div>
  );
};
