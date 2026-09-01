import React from 'react';
import { useAudience } from '../context/AudienceContext';
import { Home } from 'lucide-react';
import { AfterYesLogo } from './AfterYesLogo';

export const NotFoundPage: React.FC = () => {
  const { clearAudience, navigate } = useAudience();

  const handleReturnToGate = () => {
    clearAudience();
    navigate('/');
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center text-[#1A1714]">
      <div className="mb-6">
        <AfterYesLogo size="md" />
      </div>

      <div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center text-lg font-serif font-bold mb-4">
        404
      </div>

      <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1714] mb-3">Page not found</h1>
      <p className="text-base text-[#6B645C] max-w-md mb-8">
        The page you’re looking for doesn't exist. Return to choose your business path.
      </p>

      <button
        onClick={handleReturnToGate}
        className="inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors duration-150 cursor-pointer"
      >
        <Home className="w-4 h-4" />
        <span>Return to choice gate</span>
      </button>
    </div>
  );
};
