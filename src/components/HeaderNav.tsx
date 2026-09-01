import React, { useState, useEffect } from 'react';
import { useAudience } from '../context/AudienceContext';
import { AudienceType } from '../types';
import { Menu, X, ArrowLeftRight, XCircle } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';

export const HeaderNav: React.FC = () => {
  const { audience, setAudience, currentPath, navigate, clearAudience } = useAudience();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.shiftKey) {
      clearAudience();
      navigate('/');
    } else {
      if (audience === 'clinic') {
        navigate('/clinics');
      } else {
        navigate('/coaches');
      }
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
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isClinic = audience === 'clinic';
  const ctaText = isClinic ? 'Start at $99' : 'Start at $29';
  const switcherLabel = isClinic ? "I'm a coach" : "I'm a clinic";

  return (
    <>
      {showBanner && (
        <div className="bg-[#E6F4F1] border-b border-[#D2EAE5] py-2 px-4 text-center text-xs sm:text-sm font-medium text-[#0F766E] flex items-center justify-center gap-3 relative z-50">
          <span>Founding rates open — 50 coaches at $29 and 30 clinics at $99.</span>
          <button
            onClick={() => setShowBanner(false)}
            className="text-[#0F766E]/70 hover:text-[#0F766E] transition-colors p-1 cursor-pointer"
            aria-label="Dismiss founding banner"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-150 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7E0D6] py-3.5 shadow-[0_2px_12px_rgba(26,23,20,0.03)]'
            : 'bg-[#FAF7F2] border-b border-[#E7E0D6]/80 py-4'
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href={isClinic ? '/clinics' : '/coaches'}
              onClick={handleLogoClick}
              title="AfterYes — Shift+Click to reset to choice gate"
              id="brand-logo-link"
              className="flex items-center focus:outline-hidden"
            >
              <AfterYesLogo size="md" />
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-base text-[#6B645C]">
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#1A1714] transition-colors duration-150 cursor-pointer">How it works</button>
            <button onClick={() => scrollToSection('what-you-get')} className="hover:text-[#1A1714] transition-colors duration-150 cursor-pointer">What you get</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-[#1A1714] transition-colors duration-150 cursor-pointer">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#1A1714] transition-colors duration-150 cursor-pointer">FAQ</button>
          </nav>

          <div className="hidden sm:flex items-center gap-3.5">
            <button
              onClick={handleSwitchAudience}
              id="nav-switch-audience-btn"
              className="inline-flex items-center gap-2 px-[18px] py-[10px] rounded-[12px] bg-[#FAF7F2] hover:bg-[#F3EDE4] border border-[#E7E0D6] text-[#1A1714] text-sm font-medium transition-colors duration-150 cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>{switcherLabel}</span>
            </button>
            <button
              onClick={() => scrollToSection('signup-card')}
              id="nav-primary-cta"
              className="inline-flex items-center justify-center px-[22px] py-[10px] rounded-[12px] bg-[#0F766E] text-white text-sm font-medium hover:bg-[#0C5F59] transition-colors duration-150 cursor-pointer"
            >
              {ctaText}
            </button>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => scrollToSection('signup-card')}
              className="px-3.5 py-1.5 rounded-[10px] bg-[#0F766E] text-white text-xs font-medium"
            >
              {ctaText}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1A1714] rounded-[10px] border border-[#E7E0D6] bg-[#FFFFFF]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#E7E0D6] bg-[#FAF7F2] px-4 py-5 space-y-4">
            <div className="flex flex-col space-y-3 text-base text-[#1A1714]">
              <button onClick={() => scrollToSection('how-it-works')} className="text-left py-1 hover:text-[#0F766E]">How it works</button>
              <button onClick={() => scrollToSection('what-you-get')} className="text-left py-1 hover:text-[#0F766E]">What you get</button>
              <button onClick={() => scrollToSection('pricing')} className="text-left py-1 hover:text-[#0F766E]">Pricing</button>
              <button onClick={() => scrollToSection('faq')} className="text-left py-1 hover:text-[#0F766E]">FAQ</button>
            </div>
            <div className="pt-3 border-t border-[#E7E0D6] flex flex-col gap-2.5">
              <button
                onClick={handleSwitchAudience}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-[12px] bg-[#FAF7F2] border border-[#E7E0D6] text-[#1A1714] text-sm font-medium hover:bg-[#F3EDE4]"
              >
                <ArrowLeftRight className="w-4 h-4 text-[#0F766E]" />
                <span>Switch to {isClinic ? 'Coach ($29/mo)' : 'Clinic ($99/mo)'}</span>
              </button>
              <button
                onClick={() => scrollToSection('signup-card')}
                className="w-full py-3 rounded-[12px] bg-[#0F766E] text-white text-base font-medium flex items-center justify-center"
              >
                {ctaText}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
