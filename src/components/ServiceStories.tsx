import React from 'react';
import {
  AnimatedRadarMock,
  WhatsAppRecapMock,
  SessionNoteMock,
  AnimatedClinicMock,
  ReminderThreadMock,
  VoiceDeskMock,
  ServiceStory,
} from './ProductMocks';

export const CoachServiceStories: React.FC = () => (
  <section id="what-you-get" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 space-y-24 sm:space-y-32">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B645C] mb-2">What you get</div>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">The work AfterYes does between sessions</h2>
        <p className="text-base text-[#6B645C] mt-3 leading-relaxed">
          Not a workout app. Not a CRM. Three jobs: log the hour, send the recap, surface anyone who went quiet.
        </p>
      </div>
      <ServiceStory
        eyebrow="01 · Session notes"
        title="Log the hour in 60 seconds. Keep the history off your camera roll."
        body="After a Zoom or WhatsApp call you write what you covered, the commitment, and the next date. That record stays on the client so the next session starts warm — not from a note you buried in Photos."
        points={[
          'One note per session — not a 40-field CRM',
          'Open last commitments before you hop on',
          'Works on phone in the two minutes after the call',
          'Recap is queued the moment you save',
        ]}
        mock={<SessionNoteMock />}
      />
      <ServiceStory
        flip
        eyebrow="02 · WhatsApp + email recap"
        title="They get the nudge. You don’t chase at 11pm."
        body="AfterYes sends the recap and the next check-in on WhatsApp or email — the thread they already live in. Clients do not install another app. Silence for seven days becomes a flag, not a feeling."
        points={[
          'Recap goes out after you log the session',
          'Check-in sits in the thread they already use',
          'A missing reply is visible on the roster',
          'You reach out while the retainer is still live',
        ]}
        mock={<WhatsAppRecapMock />}
      />
      <ServiceStory
        eyebrow="03 · Quiet-client radar"
        title="See who went quiet before they cancel."
        body="Paying clients rarely announce they are done. They stop replying. The radar puts those names on top of the roster so you can send one human message instead of discovering a cancellation two weeks later."
        points={[
          '7-day quiet flag on the weekly roster',
          'Active clients stay out of the way',
          'Built for 1:1 retainers, not group programs',
          'A thin layer — not another coaching OS',
        ]}
        mock={<AnimatedRadarMock />}
      />
    </div>
  </section>
);

export const ClinicServiceStories: React.FC = () => (
  <section id="what-you-get" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 space-y-24 sm:space-y-32">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B645C] mb-2">What you get</div>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">How a small clinic keeps chairs filled</h2>
        <p className="text-base text-[#6B645C] mt-3 leading-relaxed">
          Calendar first. Reminders that ask for a yes. A list when someone no-shows. Voice only if you want the phone answered after 6pm.
        </p>
      </div>
      <ServiceStory
        eyebrow="01 · Reminders"
        title="Confirm the slot before the chair goes empty."
        body="Patients get SMS and email 48 hours out and 2 hours out. They confirm or reschedule. You stop discovering no-shows at 10:28 while the next person is already in the waiting room."
        points={[
          'Two-step reminder, not a single blast',
          'Works with the Google or Outlook calendar you already have',
          'Scheduling software only — not a medical device',
          'Built for 1–2 provider practices',
        ]}
        mock={<ReminderThreadMock />}
      />
      <ServiceStory
        flip
        eyebrow="02 · No-show list"
        title="A canceled chair can still pay for the hour."
        body="Late cancels and no-shows land on a recovery list. Waitlisted patients get the opening instead of an empty room. Staff see the dead slot the minute it dies."
        points={[
          'Empty slots surface instantly',
          'Re-offer to people already waiting',
          'No hospital EHR, no six-month install',
          'One practice calendar on the founding plan',
        ]}
        mock={<AnimatedClinicMock />}
      />
      <ServiceStory
        eyebrow="03 · Optional voice"
        title="After 6pm the phone can still book Thursday 10:30."
        body="The voice receptionist is an add-on. It answers, offers open slots, and writes the booking. It does not diagnose, treat, or advise. Minutes are capped so the bill stays predictable."
        points={[
          '+$49/mo · 100 minutes included · $0.25/min after',
          'Books the calendar — never gives clinical advice',
          'Skip it until the reminder layer is working',
          'Minute cap so after-hours cost stays visible',
        ]}
        mock={<VoiceDeskMock />}
      />
    </div>
  </section>
);
