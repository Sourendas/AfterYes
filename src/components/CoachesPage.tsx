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
    { q: 'Do I send the messages?', a: 'No. You connect the calendar once. AfterYes sends Stage 1, 2, and 3. The dashboard is read-only.' },
    { q: 'Is this Trainerize or Quenza?', a: 'No. Those tools run programs. AfterYes is the layer after they already said yes — review, check-in, rebook.' },
    { q: 'Do I need to move off my current calendar?', a: 'No. Keep Calendly, Cal.com, Acuity, or Google Calendar. AfterYes watches completed sessions.' },
    { q: 'Pay now?', a: 'Not yet. Founding list first. We email checkout from afteryes.team@gmail.com.' },
    { q: 'Who is the founding rate for?', a: 'The first 50 coaches lock $29/mo for 12 months. Starter includes 50 SMS/month.' },
  ];
  const field = 'w-full min-h-11 px-4 py-3 rounded-full border border-[#D9E2EA] bg-[#FFFFFF] text-sm text-[#10203A] focus:outline-hidden focus:border-[#E25A48]';

  return (
    <div className="w-full text-[#10203A]">
      <section className="ay-hero">
        <div className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="text-[11px] font-semibold tracking-wide bg-[#E25A48] text-white px-2.5 py-1 rounded-full">NEW</span>
                <span className="text-xs uppercase tracking-[0.14em] font-medium text-white/70">For 1:1 online coaches</span>
              </div>
              <h1 className="text-[2rem] sm:text-5xl lg:text-[3.4rem] font-sans font-extrabold text-white tracking-tight leading-[1.08] mb-6">Your client didn’t quit. They went <span className="text-[#E25A48]">quiet.</span></h1>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">Connect your booking link once. AfterYes sends the review, the Day-4 check-in, and the rebook nudge — without you clicking Send.</p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3.5">
                <button onClick={scrollToSignup} id="hero-coach-primary-cta" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-[14px] rounded-full bg-white text-[#E25A48] text-base font-semibold hover:bg-[#F3F6F8] cursor-pointer"><span>Get founding $29/mo</span><ArrowRight className="w-4 h-4" /></button>
                <button onClick={scrollToFlow} id="hero-coach-secondary-cta" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-[14px] rounded-full bg-transparent hover:bg-white/10 border border-white/40 text-white text-base font-medium cursor-pointer"><span>See the flow</span><ArrowDown className="w-4 h-4 text-white/70" /></button>
              </div>
              <p className="text-xs text-white/55 mt-4">First 50 coaches lock $29/mo for 12 months. No charge today.</p>
            </div>
            <div><AnimatedRadarMock /></div>
          </div>
        </div>
      </section>

      <ProofStrip items={['Connect calendar once', '24h review + Day 4 check-in', 'Day 10–14 rebook nudge', 'Founding lock $29/mo']} />

      <ProblemBand
        eyebrow="The week after they paid"
        title="Most retainers don’t explode. They fade."
        lead="The client said yes. Then homework slips, replies slow, and by week three you are guessing whether they are still in."
        columns={[
          { title: 'Notes live in Photos', body: 'The commitment from Tuesday is in a screenshot.' },
          { title: 'Follow-up is 11pm you', body: 'You mean to send the recap. You don’t.' },
          { title: 'Quiet looks like fine', body: 'No complaint. Just silence — until the invoice bounces.' },
        ]}
      />

      <section id="how-it-works" className="py-16 sm:py-24 border-t border-[#D9E2EA]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#5C6B80] mb-2">HOW IT WORKS</div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#10203A]">Set it once. The engine runs the week.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[['1', 'Connect the calendar', 'Calendly, Cal.com, Acuity, or Google Calendar. Completed sessions start the sequence.'], ['2', 'Three timed stages', '24h review, Day 4 check-in, Day 10–14 rebook nudge if they have not booked again.'], ['3', 'Watch the dashboard', 'Read-only: follow-ups sent, reviews requested, retainers protected.']].map(([n, t, b]) => (
              <div key={n} className="bg-white p-7 rounded-[20px] border border-[#D9E2EA]">
                <div className="w-10 h-10 rounded-full bg-[#E8F4F4] text-[#E25A48] font-bold text-lg flex items-center justify-center mb-6">{n}</div>
                <h3 className="text-lg font-serif text-[#10203A] mb-2">{t}</h3>
                <p className="text-base text-[#5C6B80] leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CoachServiceStories />

      <WeekTimeline
        eyebrow="A week with AfterYes"
        title="What actually happens between calls"
        steps={[
          { day: 'Session end', title: 'Calendar fires', body: 'The booking tool marks the hour complete. Stage 1 starts with no extra click.' },
          { day: '24 hours', title: 'Review + recap', body: 'Email first. Review link from setup. SMS only on the high-value path.' },
          { day: 'Day 4', title: 'Momentum check-in', body: 'A short email asks if the action item is still moving.' },
          { day: 'Day 10–14', title: 'Rebook if silent', body: 'No new event? One SMS + email with your booking link.' },
        ]}
      />

      <CompareTable
        title="A retention layer, not another coaching OS"
        lead="Paperbell and Quenza run the whole practice. AfterYes sits after they already said yes."
        headers={['Job', 'Typical coaching OS', 'AfterYes']}
        rows={[
          { label: 'Workout / program delivery', a: 'Core product', b: 'Not this' },
          { label: 'Follow-up after the call', a: 'You, at 11pm', b: '24h email + optional SMS' },
          { label: 'Quiet-client signal', a: 'You notice late', b: 'Day 10–14 rebook nudge' },
          { label: 'Founding price', a: '$50–$80+/mo typical', b: '$29/mo lock, first 50' },
        ]}
      />

      <NotThis
        yes={['You already have paying 1:1 clients', 'You already book on Calendly, Cal.com, Acuity, or Google Calendar', 'You want reviews and rebooks without sending texts yourself', 'Clients already live on email or SMS']}
        no={['You need a client-facing program / workout app', 'You sell group courses as the main product', 'You want a full CRM suite', 'You do not have clients yet']}
      />

      <section id="features" className="py-16 sm:py-24 border-t border-[#D9E2EA]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#5C6B80] mb-2">FEATURES</div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#10203A]">Built for how 1:1 coaches actually work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-[20px] border border-[#D9E2EA]"><div className="w-12 h-12 rounded-[14px] bg-[#E8F4F4] text-[#E25A48] flex items-center justify-center mb-6"><FileText className="w-6 h-6" /></div><h3 className="text-lg font-serif mb-2">Calendar in. Engine on.</h3><p className="text-base text-[#5C6B80]">Connect the booking tool once. Completed sessions start Stage 1.</p></div>
            <div className="bg-white p-7 rounded-[20px] border border-[#D9E2EA]"><div className="w-12 h-12 rounded-[14px] bg-[#E8F4F4] text-[#E25A48] flex items-center justify-center mb-6"><Clock className="w-6 h-6" /></div><h3 className="text-lg font-serif mb-2">A 3-stage sequence</h3><p className="text-base text-[#5C6B80]">Review at 24h, check-in on Day 4, rebook on Day 10–14. 50 SMS/month on Starter.</p></div>
            <div className="bg-white p-7 rounded-[20px] border border-[#D9E2EA]"><div className="w-12 h-12 rounded-[14px] bg-[#E8F4F4] text-[#E25A48] flex items-center justify-center mb-6"><BellRing className="w-6 h-6" /></div><h3 className="text-lg font-serif mb-2">A dashboard you only watch</h3><p className="text-base text-[#5C6B80]">Follow-ups, reviews, retainers. There is no Send button on purpose.</p></div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 sm:py-24 border-t border-[#D9E2EA]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#5C6B80] mb-2">PRICING</div>
            <h2 className="text-2xl sm:text-4xl font-serif">Simple pricing for independent coaches</h2>
            <p className="text-sm text-[#5C6B80] mt-2">First 50 coaches keep $29 for 12 months.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-white rounded-[20px] p-8 border-2 border-[#E25A48]">
              <div className="flex items-center justify-between mb-4"><span className="text-xs uppercase tracking-[0.12em] text-[#E25A48]">Founding Lock</span><span className="text-xs bg-[#E8F4F4] text-[#E25A48] px-2.5 py-0.5 rounded-full">50 spots</span></div>
              <h3 className="text-2xl font-serif mb-2">Starter</h3>
              <div className="flex items-baseline gap-1 mb-6"><span className="text-4xl font-serif">$29</span><span className="text-sm text-[#5C6B80]">/mo</span></div>
              <ul className="space-y-3 text-sm mb-8">{['Up to 15 active 1:1 clients', '3-stage retention engine', 'Email-first + 50 SMS / month', 'Read-only monitoring dashboard'].map((item) => (<li key={item} className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#E25A48] shrink-0" /><span>{item}</span></li>))}</ul>
              <button onClick={scrollToSignup} className="w-full inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-full bg-[#E25A48] text-white font-medium hover:bg-[#C94B3B] cursor-pointer"><span>Get founding $29/mo</span><ArrowRight className="w-4 h-4" /></button>
            </div>
            <div className="bg-white rounded-[20px] p-8 border border-[#D9E2EA]">
              <h3 className="text-2xl font-serif mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-6"><span className="text-4xl font-serif">$59</span><span className="text-sm text-[#5C6B80]">/mo</span></div>
              <ul className="space-y-3 text-sm mb-8">{['Up to 60 active 1:1 clients', 'Weekly client health report', 'Custom recap templates', 'Priority delivery'].map((item) => (<li key={item} className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#E25A48] shrink-0" /><span>{item}</span></li>))}</ul>
              <button onClick={scrollToSignup} className="w-full inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-full border border-[#D9E2EA] font-medium cursor-pointer"><span>Join waitlist for Pro</span><ArrowRight className="w-4 h-4 text-[#5C6B80]" /></button>
            </div>
          </div>
        </div>
      </section>

      <MidInvite title="Lock $29 before the first 50 fill." body="No charge today. Finish setup on /onboarding — no call required." cta="Join the coach list" onCta={scrollToSignup} />

      <section id="signup-card" className="py-16 sm:py-24 pb-28 border-t border-[#D9E2EA]">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-[20px] p-7 sm:p-10 border border-[#D9E2EA]">
            <div className="text-center mb-8">
              <div className="text-xs uppercase tracking-[0.12em] text-[#5C6B80] mb-2">FOUNDING INVITATION</div>
              <h2 className="text-2xl sm:text-3xl font-serif">Get the founding rate</h2>
              <p className="text-sm text-[#5C6B80] mt-2">Lock $29/mo then connect your calendar.</p>
            </div>
            {formError && <div className="mb-6 p-3.5 rounded-full bg-[#F3F6F8] border border-[#D9E2EA] text-xs">{formError}</div>}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div><label className="block text-xs uppercase tracking-[0.12em] text-[#5C6B80] mb-1.5" htmlFor="coach-name">Your Name</label><input id="coach-name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={field} placeholder="Alex Rivera" /></div>
              <div><label className="block text-xs uppercase tracking-[0.12em] text-[#5C6B80] mb-1.5" htmlFor="coach-email">Work Email</label><input id="coach-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={field} placeholder="alex@riveracoaching.com" /></div>
              <div><label className="block text-xs uppercase tracking-[0.12em] text-[#5C6B80] mb-1.5" htmlFor="coach-phone">WhatsApp (Optional)</label><input id="coach-phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={field} placeholder="+1 (555) 234-5678" /></div>
              <div><label className="block text-xs uppercase tracking-[0.12em] text-[#5C6B80] mb-1.5" htmlFor="coach-clients">Clients Now</label>
                <select id="coach-clients" value={formData.clientCount} onChange={(e) => setFormData({ ...formData, clientCount: e.target.value as CoachWaitlistData['clientCount'] })} className={field}>
                  <option value="1–10">1–10 active clients</option>
                  <option value="11–30">11–30 active clients</option>
                  <option value="31–80">31–80 active clients</option>
                  <option value="80+">80+ active clients</option>
                </select>
              </div>
              <label className="flex items-start gap-2.5 text-xs text-[#5C6B80] cursor-pointer">
                <input type="checkbox" checked={formData.agreedToTerms} onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })} className="mt-0.5" />
                <span>I agree to the <button type="button" onClick={() => navigate('/terms')} className="text-[#E25A48] underline">Terms</button> and <button type="button" onClick={() => navigate('/privacy')} className="text-[#E25A48] underline">Privacy Policy</button>.</span>
              </label>
              <button type="submit" id="btn-submit-coach-waitlist" disabled={isSubmitting} className="w-full mt-4 min-h-11 inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-full bg-[#E25A48] text-white font-medium hover:bg-[#C94B3B] disabled:opacity-70">
                {isSubmitting ? 'Reserving spot...' : <>Join the coach list <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 sm:py-24 pb-28 border-t border-[#D9E2EA]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-4">{faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={faq.q} className="bg-white rounded-[16px] border border-[#D9E2EA] overflow-hidden">
                <button onClick={() => setOpenFaqIndex(isOpen ? null : idx)} className="w-full min-h-11 px-6 py-4.5 text-left flex items-center justify-between font-serif">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#5C6B80] ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <div className="px-6 pb-5 text-sm text-[#5C6B80] border-t border-[#D9E2EA] pt-3">{faq.a}</div>}
              </div>
            );
          })}</div>
        </div>
      </section>
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-md border-t border-[#D9E2EA]">
        <button onClick={scrollToSignup} className="w-full min-h-11 inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#E25A48] text-white font-medium"><span>Get founding $29/mo</span><ArrowRight className="w-4 h-4" /></button>
      </div>
    </div>
  );
};
