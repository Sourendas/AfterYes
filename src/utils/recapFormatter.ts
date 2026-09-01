export function formatWhatsAppRecap(raw: string, coachName = 'your coach'): string {
  const text = raw.trim();
  if (!text) return '';

  const nameMatch = text.match(/^([A-Za-z][A-Za-z .'-]{1,40})\s*[:—-]/);
  const name = nameMatch?.[1]?.trim() || 'there';

  const nextMatch =
    text.match(/next(?: check-?in| session| call)?[:\s]+([^.\n]+)/i) ||
    text.match(/(friday|monday|tuesday|wednesday|thursday|saturday|sunday)[^.\n]{0,40}/i);
  const next = nextMatch?.[0]
    ?.replace(/^next(?: check-?in| session| call)?[:\s]+/i, '')
    .trim();

  const targetMatch =
    text.match(/target[:\s]+([^.\n]+)/i) ||
    text.match(/(\d+(?:\.\d+)?\s*l(?:itres?|iters?)?\s*(?:water|\/\s*day)?)/i);
  const target = targetMatch?.[1]?.trim();

  const struggleMatch = text.match(/struggled with ([^.\n]+)/i);
  const struggle = struggleMatch?.[1]?.trim();

  const covered = text
    .replace(/^[A-Za-z][A-Za-z .'-]{1,40}\s*[:—-]\s*/, '')
    .split(/[.\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join('. ');

  const lines = [
    `Hi ${name} 👋`,
    '',
    `Quick recap from today's session with ${coachName}:`,
    covered ? `✅ ${covered}${covered.endsWith('.') ? '' : '.'}` : '✅ We locked the next step for the week.',
  ];

  if (struggle) lines.push(`🧠 Watch-out: ${struggle}.`);
  if (target) lines.push(`🎯 Target: ${target}.`);
  if (next) lines.push(`📅 Next check-in: ${next}.`);

  lines.push('', 'Reply here if anything slips. You have got this.', '', `— ${coachName} via AfterYes`);
  return lines.join('\n');
}

export async function generateRecap(raw: string): Promise<string> {
  const fallback = formatWhatsAppRecap(raw);
  const key = (import.meta as { env?: Record<string, string> }).env?.VITE_GEMINI_API_KEY;
  if (!key || !raw.trim()) return fallback;

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: key });
    const res = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Turn these raw coaching notes into a short WhatsApp recap (max 90 words). Warm, encouraging, emoji-light. Include what happened, one target, and next check-in if present. Sign off as "via AfterYes". Notes:\n${raw}`,
    });
    const text = (res as { text?: string }).text?.trim();
    return text || fallback;
  } catch {
    return fallback;
  }
}
