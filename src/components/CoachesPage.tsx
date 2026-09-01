import React, { useState } from 'react';
import { useAudience } from '../context/AudienceContext';
import { CoachWaitlistData } from '../types';
import { ArrowRight, Check, ChevronDown, FileText, BellRing, Clock, ArrowDown } from 'lucide-react';
import { AnimatedRadarMock } from './ProductMocks';
import { CoachServiceStories } from './ServiceStories';
import { ProofStrip, ProblemBand, WeekTimeline, CompareTable, NotThis, MidInvite } from './LandingExtras';

export const CoachesPage: React.FC = () => {
  const { submitWaitlist, navigate } = useAudience();
  const [formData, setFormData] = useState<CoachWaitlistData>({
    name: '', email: '', phone: '', clientCount: '11–30', agreedToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.name.trim()) { setFormError('Please enter your name.'); return; }
    if (!formData.email.trim() || !formData.email.includes('@')) { setFormError('Please provide a valid email address.'); return; }
    if (!formData.agreedToTerms) { setFormError('Please agree to the terms to reserve your founding rate.'); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      submitWaitlist({
        audience: 'coach',
        name: formData.name.trim(),
        email: formData.email.trim(),
        extra: { phone: formData.phone?.trim() || undefined, clientCount: formData.clientCount, planInterest: 'Starter ($29/mo lock)' },
      });
      setIsSubmitting(false);
      navigate('/thanks?type=coach');
    }, 250);
  };

  const scrollToSignup = () => document.getElementById('signup-card')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToFlow = () => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  const faqs = [
    { q: 'Stay on WhatsApp?', a: 'Yes. Clients can receive session summaries and next check-in nudges directly over WhatsApp or email, without installing another app.' },
    { q: 'Is this Trainerize or Quenza?', a: 'No. Those tools run programs and workouts. AfterYes is the thin layer after they already said yes — notes, recap, quiet flag.' },
    { q: 'Do I need to move off my current calendar?', a: 'No. Log the session and the next date. AfterYes is retention, not a full practice OS.' },
    { q: 'Pay now?', a: 'Not yet. Founding list first. We will email checkout invitations to afteryes.team@gmail.com replies before onboarding begins.' },
    { q: 'Who is the founding rate for?', a: 'The first 50 coaches lock $29/mo for 12 months. No charge today. After the lock window, Starter is still $29 and Pro is $59.' },
  ];

  return (
    <div className="w-full text-[#1A1714]">
      <section className="pt-14 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 max-w-[1120px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-4">FOR 1:1 ONLINE COACHES</div>
            <h1 className="text-[1.85rem] sm:text-5xl font-serif text-[#1A1714] tracking-tight leading-[1.12] mb-6">Your client didn’t quit. They went quiet.</h1>
            <p className="text-base sm:text-lg text-[#6B645C] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">Log a session in a minute. AfterYes sends the follow-up and flags anyone silent for 7 days.</p>
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3.5">
              <button onClick={scrollToSignup} id="hero-coach-primary-cta" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors duration-150 cursor-pointer"><span>Get founding $29/mo</span><ArrowRight className="w-4 h-4" /></button>
              <button onClick={scrollToFlow} id="hero-coach-secondary-cta" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#FAF7F2] hover:bg-[#F3EDE4] border border-[#E7E0D6] text-[#1A1714] text-base font-medium transition-colors duration-150 cursor-pointer"><span>See the flow</span><ArrowDown className="w-4 h-4 text-[#6B645C]" /></button>
            </div>
            <p className="text-xs text-[#6B645C] mt-4">First 50 coaches lock $29/mo for 12 months. No charge today.</p>
          </div>
          <div><AnimatedRadarMock /></div>
        </div>
      </section>
      <ProofStrip items={['60-second session log','WhatsApp + email recap','7-day quiet flag','Founding lock $29/mo']} />
      <ProblemBand eyebrow="The week after they paid" title="Most retainers don’t explode. They fade." lead="The client said yes. You had a strong first call. Then homework slips, replies slow, and by week three you are guessing whether they are still in." columns={[{ title: 'Notes live in Photos', body: 'The commitment from Tuesday is in a screenshot. Next week you reconstruct the session from memory.' },{ title: 'Follow-up is 11pm you', body: 'You mean to send the recap. You don’t. They assume the work stopped when the Zoom ended.' },{ title: 'Quiet looks like fine', body: 'No complaint. No cancel email. Just silence — until the next invoice bounces.' }]} />
      <section id="how-it-works" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">HOW IT WORKS</div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">Three steps to keep clients from going quiet</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[['1','Log the session','Log the session — what you covered, next date. Takes under 60 seconds on phone or desktop.'],['2','They get the nudge','They get the nudge — recap + next check-in, email or WhatsApp. No app download required for them.'],['3','You see the quiet ones','You see the quiet ones — 7 days silent, they surface. Reach out before they drift and cancel.']].map(([n,t,b]) => (
              <div key={n} className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-[12px] bg-[#E6F4F1] text-[#0F766E] font-serif font-bold text-lg flex items-center justify-center mb-6">{n}</div>
                <h3 className="text-lg font-serif text-[#1A1714] mb-2">{t}</h3>
                <p className="text-base text-[#6B645C] leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CoachServiceStories />
      <WeekTimeline eyebrow="A week with AfterYes" title="What actually happens between calls" steps={[{ day: 'Tue 5:08pm', title: 'You log the hour', body: 'Covered protein + sleep. Next check-in Thursday 4pm. Save. Recap queued.' },{ day: 'Tue 5:09pm', title: 'They get the recap', body: 'WhatsApp or email: what you locked, what to do, when you’ll talk.' },{ day: 'Thu 4pm', title: 'The check-in sits there', body: 'If they reply, the roster stays calm. If they don’t, the clock is running.' },{ day: 'Day 7', title: 'Quiet flag', body: 'Sarah surfaces on the radar. One human message while the retainer is still live.' }]} />
      <CompareTable title="A retention layer, not another coaching OS" lead="Paperbell and Quenza run the whole practice. AfterYes sits after they already said yes." headers={['Job', 'Typical coaching OS', 'AfterYes']} rows={[{ label: 'Workout / program delivery', a: 'Core product', b: 'Not this' },{ label: 'Client website + payments', a: 'Often bundled', b: 'Keep what you have' },{ label: 'Session note + next date', a: 'Buried in a CRM', b: '60-second log' },{ label: 'Follow-up after the call', a: 'You, at 11pm', b: 'Recap on WhatsApp / email' },{ label: 'Quiet-client signal', a: 'You notice late', b: '7-day flag on the roster' },{ label: 'Founding price', a: '$50–$80+/mo typical', b: '$29/mo lock, first 50' }]} />
      <NotThis yes={['You already have paying 1:1 clients','Follow-up currently lives in your head or camera roll','You want a quiet flag, not a new operating system','Clients already live on WhatsApp or email']} no={['You need a client-facing program / workout app','You sell group courses as the main product','You want a full CRM, contracts, and invoicing suite','You do not have clients yet and need a lead magnet']} />
      <section id="features" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">FEATURES</div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">Built for how 1:1 coaches actually work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1"><div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-6"><FileText className="w-6 h-6" /></div><h3 className="text-lg font-serif text-[#1A1714] mb-2">Session notes that don’t live in your camera roll</h3><p className="text-base text-[#6B645C] leading-relaxed">Clean client history in one quiet place. Open past commitments and breakthroughs before hopping on your next call.</p></div>
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1"><div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-6"><Clock className="w-6 h-6" /></div><h3 className="text-lg font-serif text-[#1A1714] mb-2">A 7-day quiet flag, not another CRM</h3><p className="text-base text-[#6B645C] leading-relaxed">No bloated enterprise pipelines. Just a clear signal when a paying client hasn't engaged in a full week.</p></div>
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1"><div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-6"><BellRing className="w-6 h-6" /></div><h3 className="text-lg font-serif text-[#1A1714] mb-2">Reminders without you chasing at 11pm</h3><p className="text-base text-[#6B645C] leading-relaxed">Automated check-ins and session reminders delivered through WhatsApp and email on your preferred cadence.</p></div>
          </div>
        </div>
      </section>
      <section id="pricing" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">PRICING</div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">Simple pricing for independent coaches</h2>
            <p className="text-sm sm:text-base text-[#6B645C] mt-2">First 50 coaches keep $29 for 12 months.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto mb-8 items-stretch">
            <div className="bg-[#FFFFFF] rounded-[20px] p-7 sm:p-8 border-2 border-[#0F766E] flex flex-col justify-between"><div><div className="flex items-center justify-between mb-4"><span className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#0F766E]">Founding Lock</span><span className="text-xs bg-[#E6F4F1] text-[#0F766E] font-medium px-2.5 py-0.5 rounded-full">50 spots</span></div><h3 className="text-2xl font-serif text-[#1A1714] mb-2">Starter</h3><div className="flex items-baseline gap-1 mb-6"><span className="text-4xl font-serif text-[#1A1714]">$29</span><span className="text-sm font-sans text-[#6B645C]">/mo</span></div><ul className="space-y-3 text-sm text-[#1A1714] mb-8">{['Up to 15 active 1:1 clients','Session notes & history','Automated follow-ups & recaps','7-day quiet client flag'].map((item) => (<li key={item} className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#0F766E] shrink-0" /><span>{item}</span></li>))}</ul></div><button onClick={scrollToSignup} className="w-full inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors duration-150 cursor-pointer"><span>Get founding $29/mo</span><ArrowRight className="w-4 h-4" /></button></div>
            <div className="bg-[#FFFFFF] rounded-[20px] p-7 sm:p-8 border border-[#E7E0D6] hover:border-[#0F766E] flex flex-col justify-between"><div><div className="flex items-center justify-between mb-4"><span className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C]">Growing Practice</span></div><h3 className="text-2xl font-serif text-[#1A1714] mb-2">Pro</h3><div className="flex items-baseline gap-1 mb-6"><span className="text-4xl font-serif text-[#1A1714]">$59</span><span className="text-sm font-sans text-[#6B645C]">/mo</span></div><ul className="space-y-3 text-sm text-[#1A1714] mb-8">{['Up to 60 active 1:1 clients','Weekly client health report','Custom recap templates','Priority WhatsApp delivery'].map((item) => (<li key={item} className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#0F766E] shrink-0" /><span>{item}</span></li>))}</ul></div><button onClick={scrollToSignup} className="w-full inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#FAF7F2] hover:bg-[#F3EDE4] border border-[#E7E0D6] text-[#1A1714] text-base font-medium transition-colors duration-150 cursor-pointer"><span>Join waitlist for Pro</span><ArrowRight className="w-4 h-4 text-[#6B645C]" /></button></div>
          </div>
          <div className="max-w-3xl mx-auto space-y-2 text-center text-xs text-[#6B645C]"><p>First 50 coaches keep $29 for 12 months.</p><p>Phone AI is a clinic add-on. Coaches don’t need it to start.</p></div>
        </div>
      </section>
      <MidInvite title="Lock $29 before the first 50 fill." body="No charge today. We’ll email checkout from afteryes.team@gmail.com when onboarding opens." cta="Join the coach list" onCta={scrollToSignup} />
      <section id="signup-card" className="py-16 sm:py-24 pb-28 sm:pb-24 border-t border-[#E7E0D6]">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FFFFFF] rounded-[20px] p-7 sm:p-10 border border-[#E7E0D6]">
            <div className="text-center mb-8"><div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">FOUNDING INVITATION</div><h2 className="text-2xl sm:text-3xl font-serif text-[#1A1714]">Get the founding rate</h2><p className="text-sm text-[#6B645C] mt-2">Lock $29/mo before general public access.</p></div>
            {formError && <div className="mb-6 p-3.5 rounded-[12px] bg-[#F3EDE4] border border-[#E7E0D6] text-xs text-[#1A1714]">{formError}</div>}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div><label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="coach-name">Your Name</label><input type="text" id="coach-name" required placeholder="Alex Rivera" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full min-h-11 px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]" /></div>
              <div><label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="coach-email">Work Email</label><input type="email" id="coach-email" required placeholder="alex@riveracoaching.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full min-h-11 px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]" /></div>
              <div><label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="coach-phone">WhatsApp (Optional)</label><input type="tel" id="coach-phone" placeholder="+1 (555) 234-5678" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full min-h-11 px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]" /></div>
              <div><label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="coach-clients">Clients Now</label><select id="coach-clients" value={formData.clientCount} onChange={(e) => setFormData({ ...formData, clientCount: e.target.value as any })} className="w-full min-h-11 px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]"><option value="1–10">1–10 active clients</option><option value="11–30">11–30 active clients</option><option value="31–80">31–80 active clients</option><option value="80+">80+ active clients</option></select></div>
              <div className="pt-2"><label className="flex items-start gap-2.5 text-xs text-[#6B645C] cursor-pointer"><input type="checkbox" checked={formData.agreedToTerms} onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })} className="mt-0.5 rounded border-[#E7E0D6] text-[#0F766E] focus:ring-[#0F766E]" /><span>I agree to the <button type="button" onClick={() => navigate('/terms')} className="text-[#0F766E] underline hover:text-[#0C5F59]">Terms of Service</button> and <button type="button" onClick={() => navigate('/privacy')} className="text-[#0F766E] underline hover:text-[#0C5F59]">Privacy Policy</button>.</span></label></div>
              <button type="submit" id="btn-submit-coach-waitlist" disabled={isSubmitting} className="w-full mt-4 min-h-11 inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors duration-150 cursor-pointer disabled:opacity-70">{isSubmitting ? <span>Reserving spot...</span> : <><span>Join the coach list</span><ArrowRight className="w-4 h-4" /></>}</button>
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
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E7E0D6]"><button onClick={scrollToSignup} className="w-full min-h-11 inline-flex items-center justify-center gap-2 py-3.5 rounded-[12px] bg-[#0F766E] text-white text-base font-medium shadow-md"><span>Get founding $29/mo</span><ArrowRight className="w-4 h-4" /></button></div>
    </div>
  );
};
