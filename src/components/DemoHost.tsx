import React, { useEffect, useState } from 'react';
import { DemoModal } from './DemoModal';
import { CoachDemo } from './CoachDemo';
import { ClinicDemo } from './ClinicDemo';
import { AdminDrawer } from './AdminDrawer';
import { useAudience } from '../context/AudienceContext';

export const openCoachDemo = () => window.dispatchEvent(new Event('afteryes:demo-coach'));
export const openClinicDemo = () => window.dispatchEvent(new Event('afteryes:demo-clinic'));
export const openAdminDrawer = () => window.dispatchEvent(new Event('afteryes:open-admin'));

const relabel = (id: string, label: string, fn: () => void) => {
  const el = document.getElementById(id);
  if (!el) return () => undefined;
  const span = el.querySelector('span');
  if (span) span.textContent = label;
  const handler = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    fn();
  };
  el.addEventListener('click', handler, true);
  return () => el.removeEventListener('click', handler, true);
};

export const DemoHost: React.FC = () => {
  const [demo, setDemo] = useState<'coach' | 'clinic' | null>(null);
  const { currentPath } = useAudience();

  useEffect(() => {
    const coach = () => setDemo('coach');
    const clinic = () => setDemo('clinic');
    window.addEventListener('afteryes:demo-coach', coach);
    window.addEventListener('afteryes:demo-clinic', clinic);
    const offCoach = relabel('hero-coach-secondary-cta', 'Test Live Workflow', coach);
    const offClinic = relabel('hero-clinic-secondary-cta', 'Test Live Workflow', clinic);
    return () => {
      window.removeEventListener('afteryes:demo-coach', coach);
      window.removeEventListener('afteryes:demo-clinic', clinic);
      offCoach();
      offClinic();
    };
  }, [currentPath]);

  return (
    <>
      <AdminDrawer />
      {demo === 'coach' && (
        <DemoModal eyebrow="Coach sandbox" title="Test the retention workflow" onClose={() => setDemo(null)}>
          <CoachDemo />
        </DemoModal>
      )}
      {demo === 'clinic' && (
        <DemoModal eyebrow="Clinic sandbox" title="Test schedule recovery" onClose={() => setDemo(null)}>
          <ClinicDemo />
        </DemoModal>
      )}
    </>
  );
};
