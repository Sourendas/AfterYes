import React, { useState } from 'react';
import { useAudience } from '../context/AudienceContext';
import { CoachWaitlistData } from '../types';
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  FileText, 
  BellRing, 
  Clock, 
  MessageSquare,
  Sparkles,
  ArrowDown
} from 'lucide-react';

export const CoachesPage: React.FC = () => {
  const { submitWaitlist, navigate } = useAudience();

  const [formData, setFormData] = useState<CoachWaitlistData>({
    name: '',
    email: '',
    phone: '',
    clientCount: '11–30',
    agreedToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please provide a valid email address.');
      return;
    }
    if (!formData.agreedToTerms) {
      setFormError('Please agree to the terms to reserve your founding rate.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitWaitlist({
        audience: 'coach',
        name: formData.name.trim(),
        email: formData.email.trim(),
        extra: {
          phone: formData.phone?.trim() || undefined,
          clientCount: formData.clientCount,
          planInterest: 'Starter ($29/mo lock)',
        },
      });

      setIsSubmitting(false);
      navigate('/thanks?type=coach');
    }, 250);
  };

  const scrollToSignup = () => {
    const el = document.getElementById('signup-card');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFlow = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    {
      q: 'Stay on WhatsApp?',
      a: 'Yes. Clients can receive session summaries and next check-in nudges directly over WhatsApp or email, without installing another app.',
    },
    {
      q: 'Is this Trainerize?',
      a: 'No. Retention, not workout plans. AfterYes keeps clients from drifting away after they say yes.',
    },
    {
      q: 'Pay now?',
      a: 'Not yet. Founding list first. We will email checkout invitations to afteryes.team@gmail.com replies before onboarding begins.',
    },
  ];

  return (
    <div className="w-full text-[#1A1714]">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 max-w-[1120px] mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-4">
            FOR 1:1 ONLINE COACHES
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1714] tracking-tight leading-[1.12] mb-6">
            Your client didn’t quit. <br className="hidden sm:inline" />
            They went quiet.
          </h1>

          <p className="text-base sm:text-lg text-[#6B645C] leading-relaxed mb-8 max-w-2xl mx-auto">
            Log a session in a minute. AfterYes sends the follow-up and flags anyone silent for 7 days.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={scrollToSignup}
              id="hero-coach-primary-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors duration-150 cursor-pointer"
            >
              <span>Get founding $29/mo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToFlow}
              id="hero-coach-secondary-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#FAF7F2] hover:bg-[#F3EDE4] border border-[#E7E0D6] text-[#1A1714] text-base font-medium transition-colors duration-150 cursor-pointer"
            >
              <span>See the flow</span>
              <ArrowDown className="w-4 h-4 text-[#6B645C]" />
            </button>
          </div>

          <p className="text-xs text-[#6B645C] mt-4">
            First 50 coaches lock $29/mo for 12 months. No charge today.
          </p>
        </div>

        {/* Calm Studio Visual Mockup: Quiet Client Card */}
        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
          <div className="bg-[#FFFFFF] rounded-[20px] p-6 sm:p-8 border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D6] mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] font-serif font-bold text-sm">
                  AY
                </div>
                <div>
                  <h3 className="text-base font-serif text-[#1A1714]">Client Retention Radar</h3>
                  <p className="text-xs text-[#6B645C]">Weekly roster &bull; 18 active clients</p>
                </div>
              </div>
              <span className="text-xs font-medium text-[#0F766E] bg-[#E6F4F1] px-3 py-1 rounded-full">
                1 quiet flag detected
              </span>
            </div>

            <div className="space-y-3 text-sm">
              {/* Active client */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-[12px] border border-[#E7E0D6] flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1A1714]">Marcus V. &bull; Nutrition & Habit Coaching</p>
                  <p className="text-xs text-[#6B645C]">Session logged Tuesday &bull; WhatsApp recap delivered</p>
                </div>
                <span className="text-xs text-[#0F766E] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Next: Thu 4pm
                </span>
              </div>

              {/* Quiet client */}
              <div className="p-3.5 bg-[#FFFFFF] rounded-[12px] border border-[#0F766E] flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1A1714]">Sarah K. &bull; Mindset 1:1</p>
                  <p className="text-xs text-[#6B645C]">No check-in reply in 7 days &bull; Drift risk flagged</p>
                </div>
                <span className="text-xs bg-[#E6F4F1] text-[#0F766E] px-2.5 py-1 rounded-[8px] font-medium">
                  7-day quiet flag
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section id="how-it-works" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">
              HOW IT WORKS
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">
              Three steps to keep clients from going quiet
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[12px] bg-[#E6F4F1] text-[#0F766E] font-serif font-bold text-lg flex items-center justify-center mb-6">
                  1
                </div>
                <h3 className="text-lg font-serif text-[#1A1714] mb-2">
                  Log the session
                </h3>
                <p className="text-base text-[#6B645C] leading-relaxed">
                  Log the session — what you covered, next date. Takes under 60 seconds on phone or desktop.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[12px] bg-[#E6F4F1] text-[#0F766E] font-serif font-bold text-lg flex items-center justify-center mb-6">
                  2
                </div>
                <h3 className="text-lg font-serif text-[#1A1714] mb-2">
                  They get the nudge
                </h3>
                <p className="text-base text-[#6B645C] leading-relaxed">
                  They get the nudge — recap + next check-in, email or WhatsApp. No app download required for them.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[12px] bg-[#E6F4F1] text-[#0F766E] font-serif font-bold text-lg flex items-center justify-center mb-6">
                  3
                </div>
                <h3 className="text-lg font-serif text-[#1A1714] mb-2">
                  You see the quiet ones
                </h3>
                <p className="text-base text-[#6B645C] leading-relaxed">
                  You see the quiet ones — 7 days silent, they surface. Reach out before they drift and cancel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (3 cards) */}
      <section id="features" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">
              FEATURES
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">
              Built for how 1:1 coaches actually work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif text-[#1A1714] mb-2">
                Session notes that don’t live in your camera roll
              </h3>
              <p className="text-base text-[#6B645C] leading-relaxed">
                Clean client history in one quiet place. Open past commitments and breakthroughs before hopping on your next call.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif text-[#1A1714] mb-2">
                A 7-day quiet flag, not another CRM
              </h3>
              <p className="text-base text-[#6B645C] leading-relaxed">
                No bloated enterprise pipelines. Just a clear signal when a paying client hasn't engaged in a full week.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#FFFFFF] p-7 rounded-[20px] border border-[#E7E0D6] hover:border-[#0F766E] transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-[14px] bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-6">
                <BellRing className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif text-[#1A1714] mb-2">
                Reminders without you chasing at 11pm
              </h3>
              <p className="text-base text-[#6B645C] leading-relaxed">
                Automated check-ins and session reminders delivered through WhatsApp and email on your preferred cadence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">
              PRICING
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">
              Simple pricing for independent coaches
            </h2>
            <p className="text-sm sm:text-base text-[#6B645C] mt-2">
              First 50 coaches keep $29 for 12 months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto mb-8">
            {/* Starter Plan */}
            <div className="bg-[#FFFFFF] rounded-[20px] p-7 sm:p-8 border-2 border-[#0F766E] flex flex-col justify-between hover:-translate-y-1 transition-all duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#0F766E]">
                    Founding Lock
                  </span>
                  <span className="text-xs bg-[#E6F4F1] text-[#0F766E] font-medium px-2.5 py-0.5 rounded-full">
                    50 spots
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-[#1A1714] mb-2">Starter</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-serif text-[#1A1714]">$29</span>
                  <span className="text-sm font-sans text-[#6B645C]">/mo</span>
                </div>

                <ul className="space-y-3 text-sm text-[#1A1714] mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>Up to 15 active 1:1 clients</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>Session notes & history</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>Automated follow-ups & recaps</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>7-day quiet client flag</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={scrollToSignup}
                className="w-full inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors duration-150 cursor-pointer"
              >
                <span>Get founding $29/mo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-[#FFFFFF] rounded-[20px] p-7 sm:p-8 border border-[#E7E0D6] hover:border-[#0F766E] flex flex-col justify-between hover:-translate-y-1 transition-all duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C]">
                    Growing Practice
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-[#1A1714] mb-2">Pro</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-serif text-[#1A1714]">$59</span>
                  <span className="text-sm font-sans text-[#6B645C]">/mo</span>
                </div>

                <ul className="space-y-3 text-sm text-[#1A1714] mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>Up to 60 active 1:1 clients</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>Weekly client health report</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>Custom recap templates</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>Priority WhatsApp delivery</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={scrollToSignup}
                className="w-full inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#FAF7F2] hover:bg-[#F3EDE4] border border-[#E7E0D6] text-[#1A1714] text-base font-medium transition-colors duration-150 cursor-pointer"
              >
                <span>Join waitlist for Pro</span>
                <ArrowRight className="w-4 h-4 text-[#6B645C]" />
              </button>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-2 text-center text-xs text-[#6B645C]">
            <p>First 50 coaches keep $29 for 12 months.</p>
            <p>Phone AI is a clinic add-on. Coaches don’t need it to start.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="signup-card" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FFFFFF] rounded-[20px] p-7 sm:p-10 border border-[#E7E0D6]">
            <div className="text-center mb-8">
              <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">
                FOUNDING INVITATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1714]">
                Get the founding rate
              </h2>
              <p className="text-sm text-[#6B645C] mt-2">
                Lock $29/mo before general public access.
              </p>
            </div>

            {formError && (
              <div className="mb-6 p-3.5 rounded-[12px] bg-[#F3EDE4] border border-[#E7E0D6] text-xs text-[#1A1714]">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="coach-name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="coach-name"
                  required
                  placeholder="Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="coach-email">
                  Work Email
                </label>
                <input
                  type="email"
                  id="coach-email"
                  required
                  placeholder="alex@riveracoaching.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="coach-phone">
                  WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  id="coach-phone"
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-1.5" htmlFor="coach-clients">
                  Clients Now
                </label>
                <select
                  id="coach-clients"
                  value={formData.clientCount}
                  onChange={(e) => setFormData({ ...formData, clientCount: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-[12px] border border-[#E7E0D6] bg-[#FAF7F2] text-sm text-[#1A1714] focus:bg-[#FFFFFF] focus:outline-hidden focus:border-[#0F766E]"
                >
                  <option value="1–10">1–10 active clients</option>
                  <option value="11–30">11–30 active clients</option>
                  <option value="31–80">31–80 active clients</option>
                  <option value="80+">80+ active clients</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-[#6B645C] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                    className="mt-0.5 rounded border-[#E7E0D6] text-[#0F766E] focus:ring-[#0F766E]"
                  />
                  <span>
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/terms')}
                      className="text-[#0F766E] underline hover:text-[#0C5F59]"
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/privacy')}
                      className="text-[#0F766E] underline hover:text-[#0C5F59]"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                id="btn-submit-coach-waitlist"
                disabled={isSubmitting}
                className="w-full mt-4 inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-[12px] bg-[#0F766E] text-white text-base font-medium hover:bg-[#0C5F59] transition-colors duration-150 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Reserving spot...</span>
                ) : (
                  <>
                    <span>Join the coach list</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-[#6B645C] text-center pt-2">
                We’ll email checkout to afteryes.team@gmail.com replies. No charge today.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#6B645C] mb-2">
              QUESTIONS & ANSWERS
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] rounded-[16px] border border-[#E7E0D6] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between text-base font-serif text-[#1A1714] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#6B645C] transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-[#6B645C] leading-relaxed border-t border-[#E7E0D6] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E7E0D6]">
        <button
          onClick={scrollToSignup}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-[12px] bg-[#0F766E] text-white text-base font-medium shadow-md"
        >
          <span>Get founding $29/mo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
