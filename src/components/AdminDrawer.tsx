import React, { useEffect, useMemo, useState } from 'react';
import { Download, X } from 'lucide-react';
import { WaitlistSubmission } from '../types';
import { useAudience } from '../context/AudienceContext';

const WEBHOOK_KEY = 'afteryes_webhook_url';

const readList = (): WaitlistSubmission[] => {
  try {
    const raw = localStorage.getItem('afteryes_waitlist') || localStorage.getItem('waitlist');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const AdminDrawer: React.FC = () => {
  const { savedWaitlist } = useAudience();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'all' | 'coach' | 'clinic'>('all');
  const [webhook, setWebhook] = useState('');
  const [savedHook, setSavedHook] = useState(false);
  const [rows, setRows] = useState<WaitlistSubmission[]>([]);

  useEffect(() => {
    try {
      setWebhook(localStorage.getItem(WEBHOOK_KEY) || '');
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const sync = () => setRows(readList());
    sync();
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setOpen(true);
        sync();
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [savedWaitlist]);

  useEffect(() => {
    const openAdmin = () => {
      setRows(readList());
      setOpen(true);
    };
    window.addEventListener('afteryes:open-admin', openAdmin);
    return () => window.removeEventListener('afteryes:open-admin', openAdmin);
  }, []);

  const filtered = useMemo(() => {
    const list = rows.length ? rows : savedWaitlist;
    if (tab === 'all') return list;
    return list.filter((r) => r.audience === tab);
  }, [rows, savedWaitlist, tab]);

  const exportCsv = () => {
    const header = ['Name', 'Email', 'Phone', 'Segment', 'Timestamp', 'Extra'];
    const body = filtered.map((r) =>
      [r.name, r.email, r.extra?.phone || '', r.audience, r.createdAt, JSON.stringify(r.extra || {})]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(','),
    );
    const blob = new Blob([[header.join(','), ...body].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `afteryes-waitlist-${tab}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveHook = () => {
    try {
      if (webhook.trim()) localStorage.setItem(WEBHOOK_KEY, webhook.trim());
      else localStorage.removeItem(WEBHOOK_KEY);
      setSavedHook(true);
      setTimeout(() => setSavedHook(false), 1600);
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <button type="button" className="absolute inset-0 bg-[#10203A]/40" aria-label="Close admin" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white border-l border-[#D9E2EA] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D9E2EA]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-[#5C6B80]">Local only</div>
            <h2 className="text-lg font-bold text-[#10203A]">Waitlist export</h2>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="p-2 rounded-full border border-[#D9E2EA]" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-3 flex gap-2 border-b border-[#D9E2EA]">
          {(['all', 'coach', 'clinic'] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${tab === t ? 'bg-[#10203A] text-white' : 'border border-[#D9E2EA] text-[#5C6B80]'}`}>
              {t === 'coach' ? 'Coaches' : t === 'clinic' ? 'Clinics' : 'All'}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {filtered.length === 0 && <p className="text-sm text-[#5C6B80]">No leads in this browser yet.</p>}
          {filtered.map((r) => (
            <div key={r.id} className="rounded-[14px] border border-[#D9E2EA] px-3 py-3 text-sm">
              <div className="font-medium text-[#10203A]">{r.name}</div>
              <div className="text-[#5C6B80]">{r.email}</div>
              <div className="text-[11px] text-[#5C6B80] mt-1">{r.audience} · {r.extra?.phone || 'no phone'} · {new Date(r.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-[#D9E2EA] space-y-3">
          <label className="block text-[11px] uppercase tracking-[0.12em] text-[#5C6B80]">Webhook (Zapier / Make / n8n)</label>
          <input value={webhook} onChange={(e) => setWebhook(e.target.value)} placeholder="https://hooks.zapier.com/..." className="w-full min-h-11 px-3 rounded-full border border-[#D9E2EA] text-sm" />
          <div className="flex gap-2">
            <button type="button" onClick={saveHook} className="flex-1 min-h-11 rounded-full border border-[#D9E2EA] text-sm font-medium">{savedHook ? 'Saved' : 'Save webhook'}</button>
            <button type="button" onClick={exportCsv} className="flex-1 min-h-11 rounded-full bg-[#E25A48] text-white text-sm font-medium inline-flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
          <p className="text-[11px] text-[#5C6B80]">Opens with Ctrl+Shift+A. Data stays in this browser unless a webhook is set.</p>
        </div>
      </aside>
    </div>
  );
};
