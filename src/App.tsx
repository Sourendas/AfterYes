/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AudienceProvider, useAudience } from './context/AudienceContext';
import { ChoiceGate } from './components/ChoiceGate';
import { HeaderNav } from './components/HeaderNav';
import { CoachesPage } from './components/CoachesPage';
import { ClinicsPage } from './components/ClinicsPage';
import { ThanksPage } from './components/ThanksPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { NotFoundPage } from './components/NotFoundPage';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { audience, setAudience, currentPath, navigate } = useAudience();

  // If path is /coaches or /clinics directly, sync the audience
  useEffect(() => {
    if (currentPath === '/coaches' && audience !== 'coach') {
      setAudience('coach');
    } else if (currentPath === '/clinics' && audience !== 'clinic') {
      setAudience('clinic');
    }
  }, [currentPath, audience, setAudience]);

  // Handle /pricing routing: navigate to active audience landing's pricing section
  useEffect(() => {
    if (currentPath === '/pricing') {
      const targetLanding = audience === 'clinic' ? '/clinics' : '/coaches';
      navigate(targetLanding);
      setTimeout(() => {
        const el = document.getElementById('pricing');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [currentPath, audience, navigate]);

  // Gate view: If user has no audience selected yet, or has specifically requested / with no stored audience
  const shouldShowGate = (!audience && (currentPath === '/' || currentPath === '')) || (currentPath === '/' && !audience);

  if (shouldShowGate) {
    return <ChoiceGate />;
  }

  // If user visits / but already has an audience preference saved in localStorage, route them directly to their landing
  if (currentPath === '/' && audience) {
    if (audience === 'clinic') {
      return (
        <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2]">
          <HeaderNav />
          <main className="flex-grow">
            <ClinicsPage />
          </main>
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2]">
          <HeaderNav />
          <main className="flex-grow">
            <CoachesPage />
          </main>
          <Footer />
        </div>
      );
    }
  }

  // Render respective routes
  const renderPage = () => {
    switch (currentPath) {
      case '/coaches':
        return <CoachesPage />;
      case '/clinics':
        return <ClinicsPage />;
      case '/thanks':
        return <ThanksPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      default:
        // Check if path is known or 404
        if (currentPath === '/pricing') {
          return audience === 'clinic' ? <ClinicsPage /> : <CoachesPage />;
        }
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2] text-[#1A1714]">
      <HeaderNav />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AudienceProvider>
      <AppContent />
    </AudienceProvider>
  );
}
