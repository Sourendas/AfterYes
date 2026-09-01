import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AudienceType, WaitlistSubmission } from '../types';
import { getPageMetadata, updateDocumentMetadata, PageMetadata } from '../utils/seo';

interface AudienceContextType {
  audience: AudienceType | null;
  setAudience: (audience: AudienceType) => void;
  clearAudience: () => void;
  currentPath: string;
  searchParams: URLSearchParams;
  navigate: (path: string, searchParamsString?: string) => void;
  addWaitlistEntry: (entry: Omit<WaitlistSubmission, 'id' | 'createdAt'>) => WaitlistSubmission;
  submitWaitlist: (entry: Omit<WaitlistSubmission, 'id' | 'createdAt'>) => WaitlistSubmission;
  latestSubmission: WaitlistSubmission | null;
  savedWaitlist: WaitlistSubmission[];
  currentMetadata: PageMetadata;
}

const AudienceContext = createContext<AudienceContextType | undefined>(undefined);

const AUDIENCE_STORAGE_KEY = 'afteryes_audience';
const LEGACY_AUDIENCE_STORAGE_KEY = 'keepbooked_audience';
const WAITLIST_STORAGE_KEY = 'afteryes_waitlist';
const LEGACY_WAITLIST_STORAGE_KEY = 'waitlist';

export const AudienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audience, setAudienceState] = useState<AudienceType | null>(() => {
    try {
      const stored = localStorage.getItem(AUDIENCE_STORAGE_KEY) || localStorage.getItem(LEGACY_AUDIENCE_STORAGE_KEY);
      if (stored === 'coach' || stored === 'clinic') {
        return stored;
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [searchParams, setSearchParams] = useState<URLSearchParams>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  });

  const [savedWaitlist, setSavedWaitlist] = useState<WaitlistSubmission[]>(() => {
    try {
      const stored = localStorage.getItem(WAITLIST_STORAGE_KEY) || localStorage.getItem(LEGACY_WAITLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [latestSubmission, setLatestSubmission] = useState<WaitlistSubmission | null>(() => {
    try {
      const stored = localStorage.getItem(WAITLIST_STORAGE_KEY) || localStorage.getItem(LEGACY_WAITLIST_STORAGE_KEY);
      if (stored) {
        const list: WaitlistSubmission[] = JSON.parse(stored);
        return list.length > 0 ? list[list.length - 1] : null;
      }
    } catch {
      // ignore
    }
    return null;
  });

  const setAudience = useCallback((newAudience: AudienceType) => {
    setAudienceState(newAudience);
    try {
      localStorage.setItem(AUDIENCE_STORAGE_KEY, newAudience);
    } catch (e) {
      console.warn('Could not save audience preference to localStorage', e);
    }
  }, []);

  const clearAudience = useCallback(() => {
    setAudienceState(null);
    try {
      localStorage.removeItem(AUDIENCE_STORAGE_KEY);
      localStorage.removeItem(LEGACY_AUDIENCE_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear audience', e);
    }
  }, []);

  const navigate = useCallback((path: string, searchParamsString?: string) => {
    const fullUrl = searchParamsString ? `${path}?${searchParamsString}` : path;
    window.history.pushState({}, '', fullUrl);
    setCurrentPath(path);
    setSearchParams(new URLSearchParams(searchParamsString || ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to popstate (back/forward browser events)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Compute current page metadata
  const currentMetadata = getPageMetadata({
    path: currentPath,
    audience,
    searchParams,
  });

  // Update SEO Document Title and OG/Twitter tags dynamically
  useEffect(() => {
    updateDocumentMetadata(currentMetadata);
  }, [currentMetadata]);

  // Add waitlist entry helper
  const addWaitlistEntry = useCallback((entry: Omit<WaitlistSubmission, 'id' | 'createdAt'>): WaitlistSubmission => {
    const newSubmission: WaitlistSubmission = {
      ...entry,
      id: `wb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };

    setSavedWaitlist((prev) => {
      const updated = [...prev, newSubmission];
      try {
        localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save to localStorage waitlist', e);
      }
      return updated;
    });

    setLatestSubmission(newSubmission);

    // Prompt requirement: console.log the payload on submission
    console.log('🎉 [AfterYes Waitlist Submission Payload]:', newSubmission);
    
    // TODO: hook Dodo/Polar checkout. Until payments exist, this is a waitlist.
    return newSubmission;
  }, []);

  return (
    <AudienceContext.Provider
      value={{
        audience,
        setAudience,
        clearAudience,
        currentPath,
        searchParams,
        navigate,
        addWaitlistEntry,
        submitWaitlist: addWaitlistEntry,
        latestSubmission,
        savedWaitlist,
        currentMetadata,
      }}
    >
      {children}
    </AudienceContext.Provider>
  );
};

export const useAudience = () => {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error('useAudience must be used within an AudienceProvider');
  }
  return context;
};
