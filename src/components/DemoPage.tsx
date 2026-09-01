import React from 'react';
import { CoachDemo } from './CoachDemo';
import { ClinicDemo } from './ClinicDemo';
import { useAudience } from '../context/AudienceContext';

export const DemoPage: React.FC<{ kind: 'coach' | 'clinic' }> = ({ kind }) => {
  const { navigate } = useAudience();
  const back = kind === 'clinic' ? '/clinics' : '/coaches';

  return (
    <div className="w-full text-[#10203A]">
      <section className="max-w-[1120px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <button
          type="button"
          onClick={() => navigate(back)}
          className="text-sm text-[#5C6B80] hover:text-[#E25A48] mb-6"
        >
          ← Back to {kind === 'clinic' ? 'clinics' : 'coaches'}
        </button>
        <div className="text-[11px] uppercase tracking-[0.14em] text-[#5C6B80] mb-2">
          {kind === 'clinic' ? 'Clinic sandbox' : 'Coach sandbox'}
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-bold mb-2">
          {kind === 'clinic' ? 'Test schedule recovery' : 'Test the retention workflow'}
        </h1>
        <p className="text-sm text-[#5C6B80] mb-8 max-w-xl">
          Interactive preview only. Nothing is messaged to a real client or patient.
        </p>
        {kind === 'clinic' ? <ClinicDemo /> : <CoachDemo />}
      </section>
    </div>
  );
};
