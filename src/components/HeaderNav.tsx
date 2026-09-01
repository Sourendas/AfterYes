import React, { useState, useEffect } from 'react';
import { useAudience } from '../context/AudienceContext';
import { AudienceType } from '../types';
import { Menu, X, ArrowLeftRight, XCircle } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';
import { openClinicDemo } from './DemoHost';

export const HeaderNav: React.FC = () => {
  const { audience, setAudience, currentPath, navigate, clearAudience } = useAudience();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.shiftKey) {
      clearAudience();
      navigate('/');
    } else {
      navigate(audience === 'clinic' ? '/clinics' : '/coaches');
    }
  };

  const handleSwitchAudience = () => {
    const nextAudience: AudienceType = audience === 'coach' ? 'clinic' : 'coach';
    setAudience(nextAudience);
    navigate(nextAudience === 'coach' ? '/coaches' : '/clinics');
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const targetPage = audience === 'clinic' ? '/clinics' : '/coaches';
    if (currentPath !== targetPage) {
      navigate(targetPage);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openDemo = () => {
    setMobileMenuOpen(false);
    if (audience === 'clinic' || currentPath === '/clinics' || currentPath === '/app/clinic') openClinicDemo();
    else navigate('/app/coach');
  };

  const isClinic = audience === 'clinic';
  const ctaText = isClinic ? 'Start at $99' : 'Start at $29';
  const switcherLabel = isClinic ? "I'm a coach" : "I'm a clinic";

  return (
    <>
      {showBanner && (
        <div className="bg-[#E8F4F4] border-b border-[#CDEAEA] py-2 px-4 text-center text-xs sm:text-sm font-medium text-[#10203A] flex items-center justify-center gap-3 relative z-50">
          <span>Founding rates open — 50 coaches at $29 and 30 clinics at $99. <span className="text-[#E25A48]">Lock your rate →</span></span>
          <button onClick={() => setShowBanner(false)} className="text-[#10203A]/50 hover:text-[#10203A] transition-colors p-1 cursor-pointer" aria-label="Dismiss founding banner">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}
      <header className={`sticky top-0 z-40 w-full transition-all duration-150 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-[#D9E2EA] py-3.5 shadow-[0_2px_12px_rgba(26,23,20,0.03)]' : 'bg-[#FFFFFF] border-b border-[#D9E2EA]/80 py-4'}`}>
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href={isClinic ? '/clinics' : '/coaches'} onClick={handleLogoClick} title="AfterYes — Shift+Click to reset to choice gate" id="brand-logo-link" className="flex items-center focus:outline-hidden">
            <AfterYesLogo size="md" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-base text-[#5C6B80]">
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#10203A] transition-colors duration-150 cursor-pointer">How it works</button>
            <button onClick={() => scrollToSection('what-you-get')} className="hover:text-[#10203A] transition-colors duration-150 cursor-pointer">What you get</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-[#10203A] transition-colors duration-150 cursor-pointer">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#10203A] transition-colors duration-150 cursor-pointer">FAQ</button>
            <button onClick={openDemo} className="hover:text-[#E25A48] transition-colors duration-150 cursor-pointer font-medium">Try Demo</button>
          </nav>
          <div className="hidden sm:flex items-center gap-3.5">
            <button onClick={handleSwitchAudience} id="nav-switch-audience-btn" className="inline-flex items-center gap-2 px-[18px] py-[10px] rounded-full bg-[#FFFFFF] hover:bg-[#F3F6F8] border border-[#D9E2EA] text-[#10203A] text-sm font-medium transition-colors duration-150 cursor-pointer">
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#E25A48]" />
              <span>{switcherLabel}</span>
            </button>
            <button onClick={() => scrollToSection('signup-card')} id="nav-primary-cta" className="inline-flex items-center justify-center px-[22px] py-[10px] rounded-full bg-[#E25A48] text-white text-sm font-medium hover:bg-[#C94B3B] transition-colors duration-150 cursor-pointer">{ctaText}</button>
          </div>
          <div className="flex sm:hidden items-center gap-2">
            <button onClick={() => scrollToSection('signup-card')} className="px-3.5 py-1.5 rounded-full bg-[#E25A48] text-white text-xs font-medium">{ctaText}</button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-[#10203A] rounded-[10px] border border-[#D9E2EA] bg-[#FFFFFF]" aria-label="Toggle navigation menu">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#D9E2EA] bg-[#FFFFFF] px-4 py-5 space-y-4">
            <div className="flex flex-col space-y-3 text-base text-[#10203A]">
              <button onClick={() => scrollToSection('how-it-works')} className="text-left py-1 hover:text-[#E25A48]">How it works</button>
              <button onClick={() => scrollToSection('what-you-get')} className="text-left py-1 hover:text-[#E25A48]">What you get</button>
              <button onClick={() => scrollToSection('pricing')} className="text-left py-1 hover:text-[#E25A48]">Pricing</button>
              <button onClick={() => scrollToSection('faq')} className="text-left py-1 hover:text-[#E25A48]">FAQ</button>
              <button onClick={openDemo} className="text-left py-1 hover:text-[#E25A48] font-medium">Try Demo</button>
            </div>
            <div className="pt-3 border-t border-[#D9E2EA] flex flex-col gap-2.5">
              <button onClick={handleSwitchAudience} className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#FFFFFF] border border-[#D9E2EA] text-[#10203A] text-sm font-medium hover:bg-[#F3F6F8]">
                <ArrowLeftRight className="w-4 h-4 text-[#E25A48]" />
                <span>Switch to {isClinic ? 'Coach ($29/mo)' : 'Clinic ($99/mo)'}</span>
              </button>
              <button onClick={() => scrollToSection('signup-card')} className="w-full py-3 rounded-full bg-[#E25A48] text-white text-base font-medium flex items-center justify-center">{ctaText}</button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
