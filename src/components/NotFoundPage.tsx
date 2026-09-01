import React from 'react';
import { useAudience } from '../context/AudienceContext';
import { Home } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';

export const NotFoundPage: React.FC = () => {
  const { clearAudience, navigate } = useAudience();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center text-[#10203A]">
      <div className="mb-6"><AfterYesLogo size="md" /></div>
      <div className="w-12 h-12 rounded-[14px] bg-[#E8F4F4] text-[#E25A48] flex items-center justify-center text-lg font-bold mb-4">404</div>
      <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#10203A] mb-3">Page not found</h1>
      <p className="text-base text-[#5C6B80] max-w-md mb-8">The page you’re looking for doesn't exist. Return to choose your business path.</p>
      <button onClick={() => { clearAudience(); navigate('/'); }} className="inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-full bg-[#E25A48] text-white text-base font-medium hover:bg-[#C94B3B] transition-colors cursor-pointer">
        <Home className="w-4 h-4" /><span>Return to choice gate</span>
      </button>
    </div>
  );
};
