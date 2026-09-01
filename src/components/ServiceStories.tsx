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
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 space-y-20 sm:space-y-28">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B645C] mb-2">What you get</div>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">The work AfterYes does between sessions</h2>
        <p className="text-base text-[#6B645C] mt-3 leading-relaxed">
          Not a workout app. Not a CRM. Three jobs: log the hour, send the recap, surface anyone who went quiet.
        </p>
      </div>
      <ServiceStory
        eyebrow="Session notes"
        title="Log the hour in 60 seconds. Keep the history off your camera roll."
        body="After a call you write what you covered and the next date. That record stays with the client so the next session starts warm, not from memory."
        points={['One note per session — not a 40-field CRM', 'Open last commitments before you hop on', 'Works on phone after a Zoom call']}
        mock={<SessionNoteMock />}
      />
      <ServiceStory
        flip
        eyebrow="WhatsApp + email recap"
        title="They get the nudge. You don’t chase at 11pm."
        body="AfterYes sends the recap and the next check-in on WhatsApp or email. Clients do not install another app."
        points={['Recap goes out after you log the session', 'Check-in sits in the thread they already use', 'Silence for 7 days becomes a flag, not a guess']}
        mock={<WhatsAppRecapMock />}
      />
      <ServiceStory
        eyebrow="Quiet-client radar"
        title="See who went quiet before they cancel."
        body="Paying clients rarely announce they are done. They stop replying. The radar puts those names on top of the roster."
        points={['7-day quiet flag on the roster', 'Active clients stay out of the way', 'Reach out while the retainer is still live']}
        mock={<AnimatedRadarMock />}
      />
    </div>
  </section>
);

export const ClinicServiceStories: React.FC = () => (
  <section id="what-you-get" className="py-16 sm:py-24 border-t border-[#E7E0D6]">
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 space-y-20 sm:space-y-28">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B645C] mb-2">What you get</div>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1714]">How a small clinic keeps chairs filled</h2>
        <p className="text-base text-[#6B645C] mt-3 leading-relaxed">
          Calendar first. Reminders that ask for a yes. A list when someone no-shows. Voice only if you want the phone answered after 6pm.
        </p>
      </div>
      <ServiceStory
        eyebrow="Reminders"
        title="Confirm the slot before the chair goes empty."
        body="Patients get SMS and email 48 hours out and 2 hours out. They confirm or reschedule. You stop discovering no-shows at 10:28."
        points={['Two-step reminder, not a single blast', 'Works with the Google or Outlook calendar you already have', 'Scheduling software only — not a medical device']}
        mock={<ReminderThreadMock />}
      />
      <ServiceStory
        flip
        eyebrow="No-show list"
        title="A canceled chair can still pay for the hour."
        body="Late cancels and no-shows land on a recovery list. Waitlisted patients get the opening instead of an empty room."
        points={['Staff see the empty slot the minute it dies', 'Re-offer to people already waiting', 'Built for 1–2 provider practices, not hospital EHR']}
        mock={<AnimatedClinicMock />}
      />
      <ServiceStory
        eyebrow="Optional voice"
        title="After 6pm the phone can still book Thursday 10:30."
        body="The voice receptionist is an add-on. It answers, offers open slots, and writes the booking. Minutes are capped so the bill stays predictable."
        points={['+$49/mo · 100 minutes included · $0.25/min after', 'Books the calendar — does not give clinical advice', 'Skip it until the reminder layer is working']}
        mock={<VoiceDeskMock />}
      />
    </div>
  </section>
);
