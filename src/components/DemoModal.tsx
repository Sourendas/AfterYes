import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const DemoModal: React.FC<{
  title: string;
  eyebrow?: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, eyebrow, onClose, children }) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-[#10203A]/55 backdrop-blur-[2px]"
        aria-label="Close demo"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
        className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto bg-white text-[#10203A] rounded-t-[24px] sm:rounded-[24px] border border-[#D9E2EA] shadow-[0_24px_60px_-20px_rgba(16,32,58,0.45)]"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 sm:px-7 py-4 border-b border-[#D9E2EA] bg-white/95 backdrop-blur-md">
          <div>
            {eyebrow && (
              <div className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#5C6B80] mb-1">
                {eyebrow}
              </div>
            )}
            <h2 id="demo-title" className="text-lg sm:text-xl font-sans font-bold text-[#10203A]">
              {title}
            </h2>
            <p className="text-xs text-[#5C6B80] mt-1">Interactive preview. No account. Nothing is sent to a real client.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-2 rounded-full border border-[#D9E2EA] text-[#10203A] hover:bg-[#F3F6F8]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 sm:px-7 py-5 sm:py-6">{children}</div>
      </div>
    </div>
  );
};
