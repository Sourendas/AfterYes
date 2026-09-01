import React from 'react';
import { motion } from 'motion/react';
import { useAudience } from '../context/AudienceContext';
import { ArrowRight, UserCheck, Building2 } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';

export const ChoiceGate: React.FC = () => {
  const { setAudience, navigate } = useAudience();

  const handleSelectAudience = (type: 'coach' | 'clinic') => {
    setAudience(type);
    navigate(type === 'coach' ? '/coaches' : '/clinics');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-8 sm:py-12 md:py-16 overflow-hidden bg-[#FAF7F2] text-[#1A1714]">
      {/* Faint abstract calendar lines, very low contrast */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035]">
          <div className="grid grid-cols-7 gap-6 w-full max-w-5xl p-8 border border-[#1A1714] rounded-[24px]">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={`h-16 rounded-[12px] border border-[#1A1714] flex flex-col justify-between p-2.5 ${
                  i === 8 || i === 19 ? 'bg-[#1A1714]' : ''
                }`}
              >
                <div className="w-3 h-2 rounded bg-[#1A1714]" />
                <div className="w-8 h-1.5 rounded bg-[#1A1714]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Brand Bar */}
      <header className="relative z-10 w-full max-w-[1120px] flex justify-center items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[#E7E0D6]">
          <AfterYesLogo size="sm" />
        </div>
      </header>

      {/* Main Choice Center */}
      <main className="relative z-10 w-full max-w-[1120px] my-auto py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
        >
          <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-4">
            AFTERYES
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1714] tracking-tight leading-[1.12] mb-4">
            They already said yes.
          </h1>

          <p className="text-base sm:text-lg text-[#6B645C] leading-relaxed max-w-xl mx-auto mb-6">
            Don’t lose them to silence, no-shows, or a phone that rings out.
          </p>

          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.12em] font-medium text-[#6B645C]">
            <span className="h-px w-8 bg-[#E7E0D6]" />
            <span>Pick your business</span>
            <span className="h-px w-8 bg-[#E7E0D6]" />
          </div>
        </motion.div>

        {/* Two Equal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {/* Card 1: Coach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.05, ease: 'easeOut' }}
            id="card-coaching-choice"
            onClick={() => handleSelectAudience('coach')}
            className="group relative cursor-pointer bg-[#FFFFFF] rounded-[20px] p-7 sm:p-8 border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="mb-8">
              <div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] mb-6">
                <UserCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1714] mb-3">
                I coach 1:1
              </h2>
              <p className="text-base text-[#6B645C] leading-relaxed">
                Clients go quiet in week 3. Catch them before they cancel.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E7E0D6] flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-serif text-[#1A1714]">$29</span>
                <span className="text-sm font-sans text-[#6B645C]">/mo</span>
              </div>
              <button
                type="button"
                id="btn-choice-coach"
                className="inline-flex items-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors cursor-pointer"
              >
                <span>Continue as coach</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Clinic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.1, ease: 'easeOut' }}
            id="card-clinic-choice"
            onClick={() => handleSelectAudience('clinic')}
            className="group relative cursor-pointer bg-[#FFFFFF] rounded-[20px] p-7 sm:p-8 border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="mb-8">
              <div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1714] mb-3">
                I run a clinic
              </h2>
              <p className="text-base text-[#6B645C] leading-relaxed">
                Missed calls and empty chairs are booked money walking out.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E7E0D6] flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-serif text-[#1A1714]">$99</span>
                <span className="text-sm font-sans text-[#6B645C]">/mo</span>
              </div>
              <button
                type="button"
                id="btn-choice-clinic"
                className="inline-flex items-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors cursor-pointer"
              >
                <span>Continue as clinic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Foot */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.32, delay: 0.15 }}
          className="text-center text-sm text-[#6B645C] mt-8"
        >
          You can switch later. No account needed to look.
        </motion.p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-[1120px] text-center py-4">
        <p className="text-xs text-[#6B645C]">
          AfterYes is scheduling software, not a medical device.
        </p>
      </footer>
    </div>
  );
};
