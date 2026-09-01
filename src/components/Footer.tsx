import React, { useState } from 'react';
import { useAudience } from '../context/AudienceContext';
import { AudienceType } from '../types';
import { ArrowLeftRight, Check, Copy } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';
import { openAdminDrawer } from './DemoHost';

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
    <footer className="w-full bg-[#10203A] pt-16 pb-14 mt-0 text-white">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[20px] p-6 sm:p-8 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[#10203A]">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#5C6B80] mb-1.5">Current view: {isClinic ? 'Clinic' : '1:1 Coach'}</div>
            <h3 className="text-xl font-sans font-bold text-[#10203A]">{isClinic ? 'Need retention tools for 1:1 coaching instead?' : 'Looking for scheduling and after-hours call flow for a clinic?'}</h3>
            <p className="text-sm text-[#5C6B80] mt-1">One site, two paths. Switch any time.</p>
          </div>
          <button onClick={() => handleSwitch(isClinic ? 'coach' : 'clinic')} id="footer-switch-audience-btn" className="shrink-0 inline-flex items-center gap-2 px-[22px] py-[14px] rounded-full bg-white hover:bg-[#F3F6F8] border-2 border-[#10203A] text-[#10203A] text-sm font-medium transition-colors duration-150 cursor-pointer">
            <ArrowLeftRight className="w-4 h-4 text-[#E25A48]" />
            <span>Switch to {isClinic ? 'Coach ($29/mo)' : 'Clinic ($99/mo)'}</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3 sm:col-span-2">
            <AfterYesLogo size="md" textClassName="!text-white" />
            <p className="text-sm text-white/65 max-w-sm leading-relaxed">Scheduling and retention software for 1:1 coaches and small clinics.</p>
            <p className="text-xs text-white/45">&copy; {new Date().getFullYear()} AfterYes. All rights reserved.</p>
          </div>
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-white/50">Paths</div>
            <ul className="space-y-2 text-sm text-white">
              <li><button onClick={() => handleSwitch('coach')} className="hover:text-[#E25A48] transition-colors duration-150 cursor-pointer text-left">For 1:1 coaches ($29/mo)</button></li>
              <li><button onClick={() => handleSwitch('clinic')} className="hover:text-[#E25A48] transition-colors duration-150 cursor-pointer text-left">For clinics ($99/mo)</button></li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-white/50">Legal & Contact</div>
            <ul className="space-y-2 text-sm text-white">
              <li><button onClick={() => navigate('/privacy')} className="hover:text-[#E25A48] transition-colors duration-150 cursor-pointer text-left">Privacy</button></li>
              <li><button onClick={() => navigate('/terms')} className="hover:text-[#E25A48] transition-colors duration-150 cursor-pointer text-left">Terms</button></li>
              <li><button onClick={openAdminDrawer} className="hover:text-[#E25A48] transition-colors duration-150 cursor-pointer text-left">Admin / Lead Export</button></li>
              <li>
                <button onClick={copyEmail} className="inline-flex items-center gap-1.5 text-[#E25A48] hover:underline cursor-pointer text-left" title="Click to copy email address">
                  <span>afteryes.team@gmail.com</span>
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-white/50" />}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <p>AfterYes is scheduling software, not a medical device.</p>
          <p>Contact: afteryes.team@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};
