import React, { useState } from 'react';
import { useAudience } from '../context/AudienceContext';
import { ClinicWaitlistData } from '../types';
import { ArrowRight, Check, ChevronDown, PhoneCall, Calendar, ShieldAlert, Clock, ArrowDown } from 'lucide-react';
import { AnimatedClinicMock } from './ProductMocks';
import { ClinicServiceStories } from './ServiceStories';

export const ClinicsPage: React.FC = () => {
  const { submitWaitlist, navigate } = useAudience();
  const [formData, setFormData] = useState<ClinicWaitlistData>({
    name: '', clinicName: '', email: '', country: 'United States', specialty: 'Dental', weeklyAppointments: '20–50', phone: '', agreedToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.name.trim()) { setFormError('Please enter your full name.'); return; }
    if (!formData.clinicName.trim()) { setFormError('Please enter your clinic name.'); return; }
    if (!formData.email.trim() || !formData.email.includes('@')) { setFormError('Please provide a valid email address.'); return; }
    if (!formData.agreedToTerms) { setFormError('Please agree to the terms to reserve your founding clinic spot.'); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      submitWaitlist({
        audience: 'clinic',
        name: formData.name.trim(),
        email: formData.email.trim(),
        extra: { clinicName: formData.clinicName.trim(), country: formData.country, specialty: formData.specialty, weeklyAppointments: formData.weeklyAppointments, phone: formData.phone?.trim() || undefined, planInterest: 'Practice ($99/mo lock)' },
      });
      setIsSubmitting(false);
      navigate('/thanks?type=clinic');
    }, 250);
  };

  const scrollToSignup = () => document.getElementById('signup-card')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToFlow = () => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  const faqs = [
    { q: 'Patient records / EHR?', a: 'No. Calendar and contact reminders only. AfterYes handles appointment scheduling, confirmations, and no-show follow-ups.' },
    { q: 'Medical advice?', a: 'Never. AfterYes is strictly scheduling software, not a medical device. We don’t diagnose, treat, or advise.' },
    { q: 'US and India?', a: 'Calendar-first everywhere. Phone numbers by country later as telephony integrations expand.' },
  ];

  return (
    <div className="w-full text-[#1A1714]">
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 max-w-[1120px] mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-4">FOR HEALTHCARE PRACTICES & CLINICS</div>
          <h1 className="text-[1.85rem] sm:text-5xl lg:text-6xl font-serif text-[#1A1714] tracking-tight leading-[1.12] mb-6">After 6pm, empty rings <br className="hidden sm:inline" />are empty chairs.</h1>
          <p className="text-base sm:text-lg text-[#6B645C] leading-relaxed mb-8 max-w-2xl mx-auto">Reminders, a no-show list, and an optional receptionist that books the calendar. No clinical advice. Ever.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button onClick={scrollToSignup} id="hero-clinic-primary-cta" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors duration-150 cursor-pointer"><span>Get founding $99/mo</span><ArrowRight className="w-4 h-4" /></button>
            <button onClick={scrollToFlow} id="hero-clinic-secondary-cta" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#FAF7F2] hover:bg-[#F3EDE4] border border-[#E7E0D6] text-[#1A1714] text-base font-medium transition-colors duration-150 cursor-pointer"><span>How booking works</span><ArrowDown className="w-4 h-4 text-[#6B645C]" /></button>
          </div>
          <p className="text-xs text-[#6B645C] mt-4">First 30 clinics keep $99 for 12 months. No charge today.</p>
        </div>
        <div className="mt-10 max-w-2xl mx-auto"><div className="bg-[#F3EDE4] border border-[#E7E0D6] rounded-[14px] px-4 py-3 text-center text-xs text-[#1A1714] font-medium flex items-center justify-center gap-2"><ShieldAlert className="w-4 h-4 text-[#0F766E] shrink-0" /><span>Scheduling software only. Not a medical device. We don’t diagnose, treat, or advise.</span></div></div>
        <div className="mt-12 max-w-3xl mx-auto"><AnimatedClinicMock /></div>
      </section>
      <section id="how-it-works" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"><div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">HOW BOOKING WORKS</div><h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">Three steps to keep clinic chairs filled</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[['1','Connect the calendar','Connect your existing Google or Outlook calendar in 2 minutes. Sync appointment slots instantly.'],['2','Reminders go out on their own','Reminders go out on their own — SMS and WhatsApp confirmations sent 48 hours and 2 hours prior.'],['3','Optional: the phone gets answered','Optional: the phone gets answered and a slot is booked even after your front desk leaves at 6pm.']].map(([n,t,b]) => (
              <div key={n} className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1"><div className="w-10 h-10 rounded-[12px] bg-[#E6F4F1] text-[#0F766E] font-serif font-bold text-lg flex items-center justify-center mb-6">{n}</div><h3 className="text-lg font-serif text-[#1A1714] mb-2">{t}</h3><p className="text-base text-[#6B645C] leading-relaxed">{b}</p></div>
            ))}
          </div>
        </div>
      </section>
      <ClinicServiceStories />
      <section id="features" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"><div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">FEATURES</div><h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">Clean scheduling designed for busy clinics</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1"><div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-6"><Clock className="w-6 h-6" /></div><h3 className="text-lg font-serif text-[#1A1714] mb-2">Reminders before the chair goes empty</h3><p className="text-base text-[#6B645C] leading-relaxed">Automated multi-channel confirmations that prompt patients to confirm or reschedule before the slot is wasted.</p></div>
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1"><div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-6"><Calendar className="w-6 h-6" /></div><h3 className="text-lg font-serif text-[#1A1714] mb-2">A no-show list you can actually act on</h3><p className="text-base text-[#6B645C] leading-relaxed">Instant alerts for staff when a patient cancels late, allowing immediate backfill from your waitlisted patients.</p></div>
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1"><div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-6"><PhoneCall className="w-6 h-6" /></div><h3 className="text-lg font-serif text-[#1A1714] mb-2">After-hours booking, minute-capped if you add voice</h3><p className="text-base text-[#6B645C] leading-relaxed">Optional evening receptionist add-on that answers phone calls and books open slots with strict minute caps.</p></div>
          </div>
        </div>
      </section>
      <section id="pricing" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"><div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">PRICING</div><h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">Clear pricing for small clinics & practices</h2><p className="text-sm sm:text-base text-[#6B645C] mt-2">First 30 clinics keep $99 for 12 months.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto mb-8 items-stretch">
            <div className="bg-[#FFFFFF] rounded-[20px] p-7 sm:p-8 border-2 border-[#0F766E] flex flex-col justify-between"><div><div className="flex items-center justify-between mb-4"><span className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#0F766E]">Founding Lock</span><span className="text-xs bg-[#E6F4F1] text-[#0F766E] font-medium px-2.5 py-0.5 rounded-full">30 spots</span></div><h3 className="text-2xl font-serif text-[#1A1714] mb-2">Practice</h3><div className="flex items-baseline gap-1 mb-6"><span className="text-4xl font-serif text-[#1A1714]">$99</span><span className="text-sm font-sans text-[#6B645C]">/mo</span></div><ul className="space-y-3 text-sm text-[#1A1714] mb-8">{['1 provider calendar sync','Automated SMS & email reminders','Actionable no-show list','Online rescheduling portal'].map((item) => (<li key={item} className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#0F766E] shrink-0" /><span>{item}</span></li>))}</ul></div><button onClick={scrollToSignup} className="w-full inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors duration-150 cursor-pointer"><span>Get founding $99/mo</span><ArrowRight className="w-4 h-4" /></button></div>
            <div className="bg-[#FFFFFF] rounded-[20px] p-7 sm:p-8 border border-[#E7E0D6] hover:border-[#0F766E] flex flex-col justify-between"><div><div className="flex items-center justify-between mb-4"><span className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C]">Multi-Provider</span></div><h3 className="text-2xl font-serif text-[#1A1714] mb-2">Practice+</h3><div className="flex items-baseline gap-1 mb-6"><span className="text-4xl font-serif text-[#1A1714]">$149</span><span className="text-sm font-sans text-[#6B645C]">/mo</span></div><ul className="space-y-3 text-sm text-[#1A1714] mb-8">{['2 provider calendars','Priority SMS dispatch','Detailed call log & analytics','Multi-staff dashboard'].map((item) => (<li key={item} className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#0F766E] shrink-0" /><span>{item}</span></li>))}</ul></div><button onClick={scrollToSignup} className="w-full inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#FAF7F2] hover:bg-[#F3EDE4] border border-[#E7E0D6] text-[#1A1714] text-base font-medium transition-colors duration-150 cursor-pointer"><span>Join waitlist for Practice+</span><ArrowRight className="w-4 h-4 text-[#6B645C]" /></button></div>
          </div>
          <div className="max-w-3xl mx-auto bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E7E0D6] mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div className="flex items-start gap-3"><div className="w-10 h-10 rounded-[12px] bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center shrink-0"><PhoneCall className="w-5 h-5" /></div><div><h4 className="text-base font-serif text-[#1A1714]">Optional Voice Receptionist Add-on</h4><p className="text-xs text-[#6B645C]">+$49/mo — 100 after-hours receptionist minutes included, then $0.25/min.</p></div></div><span className="text-xs font-semibold text-[#0F766E] bg-[#E6F4F1] px-3 py-1.5 rounded-[10px] shrink-0">Voice Add-on +$49/mo</span></div>
          <div className="max-w-3xl mx-auto text-center text-xs text-[#6B645C]"><p>First 30 clinics keep $99 for 12 months.</p></div>
        </div>
      </section>
      <section id="signup-card" className="py-16 sm:py-24 pb-28 sm:pb-24 border-t border-[#E7E0D6]">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FFFFFF] rounded-[20px] p-7 sm:p-10 border border-[#E7E0D6]">
            <div className="text-center mb-8"><div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">FOUNDING INVITATION</div><h2 className="text-2xl sm:text-3xl font-serif text-[#1A1714]">Get the founding rate</h2><p className="text-sm text-[#6B645C] mt-2">Lock $99/mo practice rate before public rollout.</p></div>
            {formError && <div className="mb-6 p-3.5 rounded-[12px] bg-[#F3EDE4] border border-[#E7E0D6] text-xs text-[#1A1714]">{formError}</div>}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div><label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="clinic-lead-name">Your Full Name</label><input type="text" id="clinic-lead-name" required placeholder="Dr. Jordan Hayes" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full min-h-11 px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]" /></div>
              <div><label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="clinic-name">Clinic / Practice Name</label><input type="text" id="clinic-name" required placeholder="Beacon Hills Dental Care" value={formData.clinicName} onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })} className="w-full min-h-11 px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]" /></div>
              <div><label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="clinic-email">Clinic Email</label><input type="email" id="clinic-email" required placeholder="appointments@beaconhillsdental.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full min-h-11 px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="clinic-country">Country</label><input type="text" id="clinic-country" required placeholder="United States, India, UK..." value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full min-h-11 px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]" /></div>
                <div><label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="clinic-specialty">Specialty</label><select id="clinic-specialty" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value as any })} className="w-full min-h-11 px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]"><option value="Dental">Dental</option><option value="Physio">Physio</option><option value="Skin">Skin</option><option value="Eye">Eye</option><option value="Diagnostics">Diagnostics</option><option value="Other">Other</option></select></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="clinic-appointments">Appointments per Week</label><input type="text" id="clinic-appointments" placeholder="e.g. 40" value={formData.weeklyAppointments} onChange={(e) => setFormData({ ...formData, weeklyAppointments: e.target.value })} className="w-full min-h-11 px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]" /></div>
                <div><label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="clinic-phone">Phone (Optional)</label><input type="tel" id="clinic-phone" placeholder="+1 (555) 345-6789" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full min-h-11 px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]" /></div>
              </div>
              <div className="pt-2"><label className="flex items-start gap-2.5 text-xs text-[#6B645C] cursor-pointer"><input type="checkbox" checked={formData.agreedToTerms} onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })} className="mt-0.5 rounded border-[#E7E0D6] text-[#0F766E] focus:ring-[#0F766E]" /><span>I agree to the <button type="button" onClick={() => navigate('/terms')} className="text-[#0F766E] underline hover:text-[#0C5F59]">Terms of Service</button> and acknowledge that AfterYes is scheduling software and not a medical device.</span></label></div>
              <button type="submit" id="btn-submit-clinic-waitlist" disabled={isSubmitting} className="w-full mt-4 min-h-11 inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors duration-150 cursor-pointer disabled:opacity-70">{isSubmitting ? <span>Reserving clinic spot...</span> : <><span>Join the clinic list</span><ArrowRight className="w-4 h-4" /></>}</button>
              <p className="text-xs text-[#6B645C] text-center pt-2">We’ll email checkout to afteryes.team@gmail.com replies. No charge today.</p>
            </form>
          </div>
        </div>
      </section>
      <section id="faq" className="py-16 sm:py-24 pb-28 sm:pb-24 border-t border-[#E7E0D6]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16"><div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">QUESTIONS & ANSWERS</div><h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">Frequently asked questions</h2></div>
          <div className="space-y-4">{faqs.map((faq, idx) => { const isOpen = openFaqIndex === idx; return (<div key={faq.q} className="bg-[#FFFFFF] rounded-[16px] border border-[#E7E0D6] overflow-hidden"><button onClick={() => setOpenFaqIndex(isOpen ? null : idx)} className="w-full min-h-11 px-6 py-4.5 text-left flex items-center justify-between text-base font-serif text-[#1A1714] hover:bg-[#FAF7F2] transition-colors cursor-pointer"><span>{faq.q}</span><ChevronDown className={`w-4 h-4 text-[#6B645C] transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} /></button>{isOpen && <div className="px-6 pb-5 text-sm text-[#6B645C] leading-relaxed border-t border-[#E7E0D6] pt-3">{faq.a}</div>}</div>); })}</div>
        </div>
      </section>
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E7E0D6]"><button onClick={scrollToSignup} className="w-full min-h-11 inline-flex items-center justify-center gap-2 py-3.5 rounded-[12px] bg-[#0F766E] text-white text-base font-medium shadow-md"><span>Get founding $99/mo</span><ArrowRight className="w-4 h-4" /></button></div>
    </div>
  );
};
