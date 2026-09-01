import { AudienceType } from '../types';

export interface SeoMetadataEntry {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonicalPath?: string;
}

export type AudienceSpecificSeoMap = Partial<Record<AudienceType, SeoMetadataEntry>> & {
  default: SeoMetadataEntry;
};

export type RouteSeoConfig = Record<string, SeoMetadataEntry | AudienceSpecificSeoMap>;

/**
 * Route and audience metadata mapping dictionary.
 */
export const SEO_CONFIG: RouteSeoConfig = {
  '/coaches': {
    title: 'AfterYes for Online Coaches — Catch silent clients before they cancel',
    description: 'Log sessions in 60 seconds, automated WhatsApp/email recaps, and 7-day quiet client alerts to protect your coaching retainer revenue.',
    ogTitle: 'AfterYes for Coaches — Stop silent client churn',
    ogDescription: 'Automated session recaps and quiet-client radar for 1:1 online coaches.',
    canonicalPath: '/coaches',
  },

  '/clinics': {
    title: 'AfterYes for Clinics — Stop missed calls and empty appointment chairs',
    description: 'Automated reminders, no-show alerts, and optional after-hours voice receptionist for independent clinics and healthcare practices.',
    ogTitle: 'AfterYes for Clinics — Stop missed calls and empty chairs',
    ogDescription: 'Calendar sync, SMS reminders, and 24/7 after-hours call booking for practices.',
    canonicalPath: '/clinics',
  },

  '/pricing': {
    coach: {
      title: 'Coach Pricing & Founding Rates — AfterYes',
      description: 'Lock in coaching founding plans starting at $29/mo with 60s session logs, WhatsApp recaps, and 7-day quiet client alerts.',
      ogTitle: 'AfterYes Coach Pricing — Founding Member Rates',
      ogDescription: 'Predictable monthly billing for 1:1 fitness, business, and mindset coaches.',
      canonicalPath: '/pricing',
    },
    clinic: {
      title: 'Clinic Pricing & Founding Rates — AfterYes',
      description: 'Lock in clinic founding plans starting at $99/mo with automated reminders, no-show alerts, and after-hours booking.',
      ogTitle: 'AfterYes Practice Pricing — Founding Member Rates',
      ogDescription: 'Predictable monthly billing for medical practices and wellness clinics.',
      canonicalPath: '/pricing',
    },
    default: {
      title: 'AfterYes Pricing — Founding Memberships for Coaches & Clinics',
      description: 'Transparent founding rates from $29/mo for 1:1 coaches and $99/mo for clinics. Zero hidden fees and 7-day refund guarantee.',
      ogTitle: 'AfterYes Pricing — Founding Memberships',
      ogDescription: 'Founding rates for 1:1 coaches and healthcare practices.',
      canonicalPath: '/pricing',
    },
  },

  '/thanks': {
    coach: {
      title: "You're on the Coach Founding List — AfterYes",
      description: 'Thank you for securing your founding spot with AfterYes for coaches. We will reach out as your batch activates.',
      ogTitle: 'AfterYes Coach Founding Waitlist Confirmed',
      ogDescription: 'Your founding pricing tier and early access spot have been logged.',
      canonicalPath: '/thanks',
    },
    clinic: {
      title: "You're on the Clinic Founding List — AfterYes",
      description: 'Thank you for securing your founding spot with AfterYes for clinics. We will reach out as your batch activates.',
      ogTitle: 'AfterYes Clinic Founding Waitlist Confirmed',
      ogDescription: 'Your founding pricing tier and early access spot have been logged.',
      canonicalPath: '/thanks',
    },
    default: {
      title: "You're on the Founding Waitlist — AfterYes",
      description: 'Thank you for securing your founding spot with AfterYes. We will reach out as your batch activates.',
      ogTitle: 'AfterYes Founding Waitlist Confirmed',
      ogDescription: 'Your founding pricing tier and early access spot have been logged.',
      canonicalPath: '/thanks',
    },
  },

  '/privacy': {
    title: 'Privacy Policy — AfterYes',
    description: 'Our commitment to zero data monetization. We never sell, rent, or lease client lists, patient records, or contact logs.',
    ogTitle: 'Privacy Policy & Data Protection — AfterYes',
    ogDescription: 'Zero data monetization and administrative software privacy guidelines.',
    canonicalPath: '/privacy',
  },

  '/terms': {
    title: 'Terms of Service — AfterYes',
    description: 'AfterYes service terms, software scope, 7-day first-month refund policy, and administrative non-medical software disclaimers.',
    ogTitle: 'Terms of Service — AfterYes',
    ogDescription: 'Software agreement, subscription terms, and refund policy.',
    canonicalPath: '/terms',
  },

  '/': {
    coach: {
      title: 'AfterYes for Online Coaches — Catch silent clients before they cancel',
      description: 'Log sessions in 60s, automated WhatsApp/email recaps, and 7-day quiet client alerts to protect coaching retainer revenue.',
      ogTitle: 'AfterYes for Coaches — Stop silent client churn',
      ogDescription: 'Automated session recaps and quiet-client radar for 1:1 online coaches.',
      canonicalPath: '/coaches',
    },
    clinic: {
      title: 'AfterYes for Clinics — Stop missed calls and empty appointment chairs',
      description: 'Automated reminders, no-show alerts, and optional after-hours booking for independent clinics and practices.',
      ogTitle: 'AfterYes for Clinics — Stop missed calls and empty chairs',
      ogDescription: 'Calendar sync, SMS reminders, and 24/7 after-hours call booking for practices.',
      canonicalPath: '/clinics',
    },
    default: {
      title: 'AfterYes — Stop silent clients and empty appointment slots',
      description: 'Reminders, silent-client alerts, and optional after-hours booking for online coaches and medical clinics.',
      ogTitle: 'AfterYes — Stop silent clients and empty slots',
      ogDescription: 'Reminders, silent-client alerts, and optional after-hours booking for online coaches and clinics.',
      canonicalPath: '/',
    },
  },

  '404': {
    title: 'Page Not Found — AfterYes',
    description: 'The requested page could not be found. Return to AfterYes to pick your coaching or clinic workflow.',
    ogTitle: 'Page Not Found — AfterYes',
    ogDescription: 'The requested page could not be found.',
  },
};
