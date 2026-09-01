import React, { useMemo, useState } from 'react';
import { generateRecap } from '../utils/recapFormatter';
import { Check, Loader2, Send, Sparkles } from 'lucide-react';

type Status = 'Active' | 'Needs Follow-up' | 'Silent';

const SEED: { name: string; last: string; status: Status }[] = [
  { name: 'Priya N.', last: '2 days ago', status: 'Active' },
  { name: 'Marcus L.', last: '5 days ago', status: 'Needs Follow-up' },
  { name: 'Sarah K.', last: '7 days ago', status: 'Silent' },
  { name: 'Jamal R.', last: 'Yesterday', status: 'Active' },
];

const SAMPLE =
  'Sarah: Completed week 4 check-in. Struggled with hydration. Target: 3L water/day. Next check-in Friday 10 AM.';

const pill = (status: Status) => {
  if (status === 'Active') return 'bg-[#E8F4F4] text-[#0F766E]';
  if (status === 'Needs Follow-up') return 'bg-[#F3F6F8] text-[#10203A]';
  return 'bg-[#E25A48]/10 text-[#E25A48]';
};

export const CoachDemo: React.FC = () => {
  const [notes, setNotes] = useState(SAMPLE);
  const [recap, setRecap] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [rows, setRows] = useState(SEED);

  const silentCount = useMemo(() => rows.filter((r) => r.status === 'Silent').length, [rows]);

  const onGenerate = async () => {
    setBusy(true);
    setSent(false);
    const text = await generateRecap(notes);
    setRecap(text);
    setBusy(false);
  };

  const onSend = () => {
    if (!recap) return;
    setSent(true);
    setRows((prev) =>
      prev.map((r) => (r.name.startsWith('Sarah') ? { ...r, last: 'Just now', status: 'Active' } : r)),
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-[#10203A]">Client inactivity tracker</h3>
            <span className="text-[11px] text-[#E25A48] font-medium">{silentCount} silent</span>
          </div>
          <div className="rounded-[16px] border border-[#D9E2EA] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F3F6F8] text-[11px] uppercase tracking-[0.1em] text-[#5C6B80]">
                <tr>
                  <th className="text-left font-medium px-3 py-2">Client</th>
                  <th className="text-left font-medium px-3 py-2">Last touch</th>
                  <th className="text-left font-medium px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} className="border-t border-[#D9E2EA]">
                    <td className="px-3 py-2.5 font-medium text-[#10203A]">{r.name}</td>
                    <td className="px-3 py-2.5 text-[#5C6B80]">{r.last}</td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full ${pill(r.status)}`}>
                        {r.status === 'Silent' ? '⚠️ Silent for 7 days' : r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#10203A] mb-2">60-second session logger</h3>
          <textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setSent(false);
            }}
            rows={4}
            className="w-full px-4 py-3 rounded-[16px] border border-[#D9E2EA] text-sm text-[#10203A] focus:outline-hidden focus:border-[#E25A48]"
          />
          <div className="flex flex-col sm:flex-row gap-2.5 mt-3">
            <button type="button" onClick={onGenerate} disabled={busy || !notes.trim()} className="inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-full bg-[#10203A] text-white text-sm font-medium hover:bg-[#1a2d4e] disabled:opacity-60">
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate WhatsApp recap
            </button>
            <button type="button" onClick={onSend} disabled={!recap || sent} className="inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-full bg-[#E25A48] text-white text-sm font-medium hover:bg-[#C94B3B] disabled:opacity-60">
              {sent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              {sent ? 'Simulated send' : 'Simulate WhatsApp send'}
            </button>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="mx-auto w-[220px] rounded-[28px] border-[8px] border-[#10203A] bg-[#0b1524] overflow-hidden ay-mock">
          <div className="h-5 bg-[#10203A] flex items-center justify-center">
            <div className="w-16 h-1.5 rounded-full bg-white/20" />
          </div>
          <div className="bg-[#ece5dd] min-h-[340px] p-3 flex flex-col">
            <div className="text-center text-[10px] text-[#5C6B80] mb-2">Sarah K. · WhatsApp preview</div>
            {recap ? (
              <div className="self-end max-w-[90%] bg-[#d9fdd3] rounded-lg rounded-tr-sm px-2.5 py-2 text-[11px] text-[#10203A] whitespace-pre-wrap leading-relaxed shadow-sm">{recap}</div>
            ) : (
              <div className="mt-16 text-center text-[11px] text-[#5C6B80] px-3">Generate a recap to see it land in the thread.</div>
            )}
            {sent && <div className="text-right text-[10px] text-[#5C6B80] mt-1">Delivered · simulated</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
