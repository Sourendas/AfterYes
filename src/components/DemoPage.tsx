import React from 'react';
import { ClinicDemo } from './ClinicDemo';
import { EngineDashboard } from './EngineDashboard';
import { useAudience } from '../context/AudienceContext';

export const DemoPage: React.FC<{ kind: 'coach' | 'clinic' }> = ({ kind }) => {
  const { navigate } = useAudience();
  const back = kind === 'clinic' ? '/clinics' : '/coaches';

  if (kind === 'coach') {
    return (
      <div className="w-full text-[#10203A]">
        <section className="mx-auto max-w-[1120px] px-4 pt-8 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(back)}
            className="mb-2 text-sm text-[#5C6B80] hover:text-[#E25A48]"
          >
            ← Back to coaches
          </button>
        </section>
        <EngineDashboard preview />
      </div>
    );
  }

  return (
    <div className="w-full text-[#10203A]">
      <section className="mx-auto max-w-[1120px] px-4 py-10 sm:px-6 sm:py-14">
        <button
          type="button"
          onClick={() => navigate(back)}
          className="mb-6 text-sm text-[#5C6B80] hover:text-[#E25A48]"
        >
          ← Back to clinics
        </button>
        <div className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#5C6B80]">Clinic sandbox</div>
        <h1 className="mb-2 text-2xl font-sans font-bold sm:text-4xl">Test schedule recovery</h1>
        <p className="mb-8 max-w-xl text-sm text-[#5C6B80]">
          Interactive preview only. Nothing is messaged to a real patient.
        </p>
        <ClinicDemo />
      </section>
    </div>
  );
};
