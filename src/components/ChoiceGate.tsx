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
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-8 sm:py-12 md:py-16 overflow-hidden bg-white text-[#10203A]">
      <header className="relative z-10 w-full max-w-[1120px] flex justify-center items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D9E2EA]">
          <AfterYesLogo size="sm" />
        </div>
      </header>

      <main className="relative z-10 w-full max-w-[1120px] my-auto py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease: 'easeOut' }} className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#5C6B80] mb-4">AFTERYES</div>
          <h1 className="text-[1.85rem] sm:text-5xl lg:text-6xl font-sans font-extrabold text-[#10203A] tracking-tight leading-[1.12] mb-4">They already said <span className="text-[#E25A48]">yes.</span></h1>
          <p className="text-base sm:text-lg text-[#5C6B80] leading-relaxed max-w-xl mx-auto mb-6">Don’t lose them to silence, no-shows, or a phone that rings out.</p>
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.12em] font-medium text-[#5C6B80]">
            <span className="h-px w-8 bg-[#D9E2EA]" />
            <span>Pick your business</span>
            <span className="h-px w-8 bg-[#D9E2EA]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto items-stretch">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, delay: 0.05, ease: 'easeOut' }} id="card-coaching-choice" onClick={() => handleSelectAudience('coach')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelectAudience('coach'); } }} className="group relative cursor-pointer bg-white rounded-[20px] p-7 sm:p-8 border border-[#D9E2EA] hover:border-[#E25A48] transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 min-h-[280px]">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-[14px] bg-[#E8F4F4] flex items-center justify-center text-[#E25A48] mb-6"><UserCheck className="w-6 h-6" /></div>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#10203A] mb-3">I coach 1:1</h2>
              <p className="text-base text-[#5C6B80] leading-relaxed">Clients go quiet in week 3. Catch them before they cancel.</p>
            </div>
            <div className="pt-6 border-t border-[#D9E2EA] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-baseline gap-1"><span className="text-2xl font-sans font-bold text-[#10203A]">$29</span><span className="text-sm text-[#5C6B80]">/mo</span></div>
              <button type="button" id="btn-choice-coach" className="w-full sm:w-auto min-h-11 inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-full bg-[#E25A48] text-white text-base font-medium hover:bg-[#C94B3B] transition-colors cursor-pointer"><span>Continue as coach</span><ArrowRight className="w-4 h-4" /></button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, delay: 0.1, ease: 'easeOut' }} id="card-clinic-choice" onClick={() => handleSelectAudience('clinic')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelectAudience('clinic'); } }} className="group relative cursor-pointer bg-white rounded-[20px] p-7 sm:p-8 border border-[#D9E2EA] hover:border-[#E25A48] transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 min-h-[280px]">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-[14px] bg-[#E8F4F4] flex items-center justify-center text-[#E25A48] mb-6"><Building2 className="w-6 h-6" /></div>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#10203A] mb-3">I run a clinic</h2>
              <p className="text-base text-[#5C6B80] leading-relaxed">Missed calls and empty chairs are booked money walking out.</p>
            </div>
            <div className="pt-6 border-t border-[#D9E2EA] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-baseline gap-1"><span className="text-2xl font-sans font-bold text-[#10203A]">$99</span><span className="text-sm text-[#5C6B80]">/mo</span></div>
              <button type="button" id="btn-choice-clinic" className="w-full sm:w-auto min-h-11 inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-full bg-[#E25A48] text-white text-base font-medium hover:bg-[#C94B3B] transition-colors cursor-pointer"><span>Continue as clinic</span><ArrowRight className="w-4 h-4" /></button>
            </div>
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.32, delay: 0.15 }} className="text-center text-sm text-[#5C6B80] mt-8">You can switch later. No account needed to look.</motion.p>
      </main>

      <footer className="relative z-10 w-full max-w-[1120px] text-center py-4">
        <p className="text-xs text-[#5C6B80]">AfterYes is scheduling software, not a medical device.</p>
      </footer>
    </div>
  );
};
