import React, { useState } from 'react';
import { useAudience } from '../context/AudienceContext';
import { AudienceType } from '../types';
import { ArrowLeftRight, Check, Copy } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';

export const Footer: React.FC = () => {
  const { audience, setAudience, navigate } = useAudience();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isClinic = audience === 'clinic';

  const handleSwitch = (newAud: AudienceType) => {
    setAudience(newAud);
    navigate(newAud === 'coach' ? '/coaches' : '/clinics');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('afteryes.team@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="w-full bg-[#FAF7F2] border-t border-[#E7E0D6] pt-16 pb-14 mt-24 text-[#1A1714]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        {/* Switcher Card */}
        <div className="bg-[#FFFFFF] rounded-[20px] p-6 sm:p-8 border border-[#E7E0D6] mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5">
              Current view: {isClinic ? 'Clinic' : '1:1 Coach'}
            </div>
            <h3 className="text-xl font-serif text-[#1A1714]">
              {isClinic
                ? 'Need retention tools for 1:1 coaching instead?'
                : 'Looking for scheduling and after-hours call flow for a clinic?'}
            </h3>
            <p className="text-sm text-[#6B645C] mt-1">
              One site, two paths. Switch any time.
            </p>
          </div>

          <button
            onClick={() => handleSwitch(isClinic ? 'coach' : 'clinic')}
            id="footer-switch-audience-btn"
            className="shrink-0 inline-flex items-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#FAF7F2] hover:bg-[#F3EDE4] border border-[#E7E0D6] text-[#1A1714] text-sm font-medium transition-colors duration-150 cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4 text-[#0F766E]" />
            <span>Switch to {isClinic ? 'Coach ($29/mo)' : 'Clinic ($99/mo)'}</span>
          </button>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-3 sm:col-span-2">
            <AfterYesLogo size="md" />
            <p className="text-sm text-[#6B645C] max-w-sm leading-relaxed">
              Scheduling and retention software for 1:1 coaches and small clinics.
            </p>
            <p className="text-xs text-[#6B645C]">
              &copy; {new Date().getFullYear()} AfterYes. All rights reserved.
            </p>
          </div>

          {/* Col 2: Experiences */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C]">
              Paths
            </div>
            <ul className="space-y-2 text-sm text-[#1A1714]">
              <li>
                <button
                  onClick={() => handleSwitch('coach')}
                  className="hover:text-[#0F766E] transition-colors duration-150 cursor-pointer text-left"
                >
                  For 1:1 coaches ($29/mo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSwitch('clinic')}
                  className="hover:text-[#0F766E] transition-colors duration-150 cursor-pointer text-left"
                >
                  For clinics ($99/mo)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Legal */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C]">
              Legal & Contact
            </div>
            <ul className="space-y-2 text-sm text-[#1A1714]">
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="hover:text-[#0F766E] transition-colors duration-150 cursor-pointer text-left"
                >
                  Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-[#0F766E] transition-colors duration-150 cursor-pointer text-left"
                >
                  Terms
                </button>
              </li>
              <li>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 text-[#0F766E] hover:underline cursor-pointer text-left"
                  title="Click to copy email address"
                >
                  <span>afteryes.team@gmail.com</span>
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#0F766E]" /> : <Copy className="w-3.5 h-3.5 text-[#6B645C]" />}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-[#E7E0D6] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B645C]">
          <p>
            AfterYes is scheduling software, not a medical device.
          </p>
          <p>
            Contact: afteryes.team@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
};
