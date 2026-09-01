import React from 'react';

interface AfterYesLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textClassName?: string;
  className?: string;
  variant?: 'emerald' | 'dark' | 'light';
}

export const AfterYesLogo: React.FC<AfterYesLogoProps> = ({
  size = 'md',
  showText = true,
  textClassName = '',
  className = '',
  variant = 'emerald',
}) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', text: 'text-lg', svg: 28 },
    md: { box: 'w-8 h-8', text: 'text-xl', svg: 32 },
    lg: { box: 'w-10 h-10', text: 'text-2xl', svg: 40 },
    xl: { box: 'w-12 h-12', text: 'text-3xl', svg: 48 },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Premium Geometric AY Monogram Badge */}
      <div
        className={`relative ${currentSize.box} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-xs overflow-hidden ${
          variant === 'emerald'
            ? 'bg-[#0F766E] text-white border border-[#0C5F59]'
            : variant === 'dark'
            ? 'bg-[#1A1714] text-white border border-[#3D3833]'
            : 'bg-[#FFFFFF] text-[#0F766E] border border-[#E7E0D6]'
        }`}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[70%] h-[70%] relative z-10"
          aria-hidden="true"
        >
          {/* Letter 'A' */}
          <path
            d="M 11 28 L 18 8 L 25 28"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Crossbar of 'A' */}
          <path
            d="M 13.5 21.5 L 22.5 21.5"
            stroke="#E6F4F1"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Upward affirmative check accent */}
          <path
            d="M 21 16 L 25 20 L 31 10"
            stroke="#99F6E4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <span
          className={`font-serif tracking-tight font-bold text-[#1A1714] leading-none ${currentSize.text} ${textClassName}`}
        >
          After<span className="text-[#0F766E] font-medium italic">Yes</span>
        </span>
      )}
    </div>
  );
};
