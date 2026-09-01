export type AudienceType = 'coach' | 'clinic';

export interface CoachWaitlistData {
  name: string;
  email: string;
  phone?: string;
  clientCount: '1–10' | '11–30' | '31–80' | '80+';
  agreedToTerms: boolean;
}

export interface ClinicWaitlistData {
  name: string;
  clinicName: string;
  email: string;
  country: string;
  specialty: 'Dental' | 'Physio' | 'Skin' | 'Eye' | 'Diagnostics' | 'Other';
  weeklyAppointments: string;
  phone?: string;
  agreedToTerms: boolean;
}

export interface WaitlistSubmission {
  id: string;
  audience: AudienceType;
  name: string;
  email: string;
  extra: {
    phone?: string;
    clientCount?: string;
    clinicName?: string;
    country?: string;
    specialty?: string;
    weeklyAppointments?: string;
    planInterest?: string;
  };
  createdAt: string;
}

export type ReminderTiming = '48h-before' | '24h-before' | '2h-before' | 'morning-of';
export type FollowUpDelay = '24h' | '48h';
export type CalendarProvider = 'calendly' | 'cal.com' | 'acuity' | 'google' | 'outlook';

export interface OnboardingConfig {
  id: string;
  audience: AudienceType;
  email: string;
  profile: {
    businessName: string;
    timezone: string;
    reviewLink: string;
    calendarProvider: CalendarProvider;
    calendarUrl: string;
  };
  delivery: {
    reminderTiming: ReminderTiming;
    followUpDelay: FollowUpDelay;
    messageTemplate: string;
    emailFirst: boolean;
    smsMonthlyCap: number;
  };
  channel: {
    senderName: string;
    supportEmail: string;
    twilioPhone: string;
  };
  engine: {
    stage1: '24h_review';
    stage2: 'day4_checkin';
    stage3: 'day10_14_rebook';
  };
  activatedAt: string;
}

export type PageRoute =
  | '/'
  | '/coaches'
  | '/clinics'
  | '/app'
  | '/app/coach'
  | '/app/clinic'
  | '/onboarding'
  | '/pricing'
  | '/privacy'
  | '/terms'
  | '/thanks'
  | '/404';
