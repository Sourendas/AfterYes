import React, { useEffect } from 'react';
import { useAudience } from '../context/AudienceContext';
import { ArrowLeft, CheckCircle2, Play } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';
import { initAnalytics, track, trackOnce } from '../utils/analytics';

export const ThanksPage: React.FC = () => {
  const { searchParams, latestSubmission, navigate, clearAudience } = useAudience();
  const typeParam = searchParams.get('type');
  const isClinic = typeParam === 'clinic' || latestSubmission?.audience === 'clinic';
  const segment = isClinic ? 'clinic' : 'coach';
  const demoPath = isClinic ? '/app/clinic' : '/app/coach';
  const planValue = isClinic ? 99 : 29;

  useEffect(() => {
    initAnalytics();
    const dedupe = latestSubmission?.id || `${segment}_${latestSubmission?.email || 'anon'}`;
    trackOnce(`thanks_view_${dedupe}`, 'page_view', {
      page_path: '/thanks',
      page_title: 'AfterYes Thanks',
      segment,
    });
    trackOnce(`waitlist_${dedupe}`, 'waitlist_complete', {
      segment,
      value: planValue,
      currency: 'USD',
      method: 'founding_list',
    });
    trackOnce(`lead_${dedupe}`, 'generate_lead', {
      segment,
      value: planValue,
      currency: 'USD',
    });
  }, [latestSubmission, segment, planValue]);

  const goHome = () => {
    track('thanks_back_home', { segment });
    clearAudience();
    navigate('/');
  };

  const openDemo = () => {
    track('thanks_explore_demo', { segment, destination: demoPath });
    navigate(demoPath);
  };

  return (
    <div className="w-full min-h-[75vh] py-16 sm:py-24 px-4 sm:px-6 max-w-[1120px] mx-auto text-[#10203A]">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-8">
          <AfterYesLogo size="lg" />
        </div>
        <div className="bg-white rounded-[20px] p-7 sm:p-10 border border-[#D9E2EA] text-center">
          <div className="w-12 h-12 rounded-[14px] bg-[#E8F4F4] text-[#E25A48] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#10203A] tracking-tight mb-3">
            You're on the AfterYes Founding List 🎉
          </h1>
          <p className="text-sm sm:text-base text-[#5C6B80] leading-relaxed mb-8">
            We've recorded your details. We will reach out to schedule your onboarding walkthrough.
          </p>
          {latestSubmission && (
            <div className="text-left rounded-[16px] border border-[#D9E2EA] bg-[#F3F6F8] px-4 py-3 mb-8 text-sm text-[#10203A]">
              <p><span className="text-[#5C6B80]">Name:</span> {latestSubmission.name}</p>
              <p><span className="text-[#5C6B80]">Email:</span> {latestSubmission.email}</p>
              <p><span className="text-[#5C6B80]">List:</span> {isClinic ? 'Clinic' : 'Coach'}</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={openDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-full bg-[#E25A48] text-white text-base font-medium hover:bg-[#C94B3B]"
            >
              <Play className="w-4 h-4" />
              Explore Live Demo
            </button>
            <button
              type="button"
              onClick={goHome}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-full bg-white hover:bg-[#F3F6F8] border-2 border-[#10203A] text-[#10203A] text-base font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
