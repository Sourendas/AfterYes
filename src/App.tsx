/** SPDX-License-Identifier: Apache-2.0 */
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
import { DemoHost } from './components/DemoHost';
import { DemoPage } from './components/DemoPage';

const AppContent: React.FC = () => {
  const { audience, setAudience, currentPath, navigate } = useAudience();

  useEffect(() => {
    if (currentPath === '/coaches' && audience !== 'coach') {
      setAudience('coach');
    } else if (currentPath === '/clinics' && audience !== 'clinic') {
      setAudience('clinic');
    }
  }, [currentPath, audience, setAudience]);

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

  const shouldShowGate = (!audience && (currentPath === '/' || currentPath === '')) || (currentPath === '/' && !audience);

  if (shouldShowGate) {
    return (
      <>
        <ChoiceGate />
        <DemoHost />
      </>
    );
  }

  const shell = (page: React.ReactNode) => (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#10203A]">
      <HeaderNav />
      <main className="flex-grow">{page}</main>
      <Footer />
      <DemoHost />
    </div>
  );

  if (currentPath === '/' && audience) {
    return shell(audience === 'clinic' ? <ClinicsPage /> : <CoachesPage />);
  }

  const renderPage = () => {
    switch (currentPath) {
      case '/coaches':
        return <CoachesPage />;
      case '/clinics':
        return <ClinicsPage />;
      case '/app/coach':
        return <DemoPage kind="coach" />;
      case '/app/clinic':
        return <DemoPage kind="clinic" />;
      case '/thanks':
        return <ThanksPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      default:
        if (currentPath === '/pricing') {
          return audience === 'clinic' ? <ClinicsPage /> : <CoachesPage />;
        }
        return <NotFoundPage />;
    }
  };

  return shell(renderPage());
};

export default function App() {
  return (
    <AudienceProvider>
      <AppContent />
    </AudienceProvider>
  );
}
