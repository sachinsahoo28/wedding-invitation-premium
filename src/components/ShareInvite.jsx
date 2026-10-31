import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Link2, MessageCircle } from 'lucide-react';
import { wedding } from '../config/weddingDetails.js';
import { parseDate, formatLong } from '../lib/dates.js';
import { baseUrl, buildGuestUrl, salutation } from '../lib/personalization.js';
import { SectionHead, Reveal } from './Reveal.jsx';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / insecure contexts.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export default function ShareInvite() {
  const [form, setForm] = useState({ guest: '', family: '', note: '' });
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState('');
  const date = parseDate(wedding.weddingDate);
  const couple = `${wedding.groom.firstName} & ${wedding.bride.firstName}`;

  const url = useMemo(() => buildGuestUrl(baseUrl(wedding.shareBaseUrl), form), [form]);
  const message = useMemo(() => {
    const name = salutation({ guest: form.guest.trim(), family: form.family.trim() });
    const lines = [
      name ? `Dear ${name},` : 'Dear friends & family,',
      '',
      `With joy in our hearts, we invite you to celebrate the wedding of ${couple}` +
        `${date ? ` on ${formatLong(date)}` : ''}${wedding.city ? ` in ${wedding.city}` : ''}.`,
    ];
    if (form.note.trim()) lines.push('', form.note.trim());
    lines.push('', `Your personal invitation: ${link || url}`, '', wedding.hashtag);
    return lines.join('\n');
  }, [form, link, url, couple, date]);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setLink('');
  };
  const flash = (what) => {
    setCopied(what);
    setTimeout(() => setCopied(''), 2000);
  };
  const canGenerate = !!(form.guest.trim() || form.family.trim());

  return (
    <section className="share" id="share">
      <SectionHead eyebrow="For the families" script="spread the joy" title="Share a personal invitation" />
      <Reveal as="p" className="share-intro">
        Create an invitation addressed to each guest. They’ll be greeted by name when they open it.
      </Reveal>

      <Reveal className="share-card">
        <form
          className="share-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (canGenerate) setLink(url);
          }}
        >
          <label>
            <span>Guest name</span>
            <input value={form.guest} onChange={update('guest')} placeholder="e.g. Rahul Ji" maxLength={60} autoComplete="off" />
          </label>
          <label>
            <span>Family name <em>(optional)</em></span>
            <input value={form.family} onChange={update('family')} placeholder="e.g. Family" maxLength={60} autoComplete="off" />
          </label>
          <label className="full">
            <span>Personal greeting <em>(optional)</em></span>
            <input
              value={form.note}
              onChange={update('note')}
              placeholder="e.g. We can’t wait to celebrate with you!"
              maxLength={60}
              autoComplete="off"
            />
          </label>
          <button type="submit" className="btn btn-primary full" disabled={!canGenerate}>
            <Link2 size={16} strokeWidth={1.6} aria-hidden="true" /> Generate invitation link
          </button>
        </form>

        <div className="share-preview">
          <p className="preview-label">Message preview</p>
          <pre className="preview-text">{message}</pre>
          <AnimatePresence>
            {link && (
              <motion.div className="share-result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <code className="share-link">{link}</code>
                <div className="share-actions">
                  <a
                    className="btn btn-whatsapp"
                    href={`https://wa.me/?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={16} strokeWidth={1.6} aria-hidden="true" /> Share on WhatsApp
                  </a>
                  <button type="button" className="btn btn-secondary" onClick={async () => (await copyText(link)) && flash('link')}>
                    {copied === 'link' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                    {copied === 'link' ? 'Link copied' : 'Copy link'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={async () => (await copyText(message)) && flash('msg')}>
                    {copied === 'msg' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                    {copied === 'msg' ? 'Message copied' : 'Copy message'}
                  </button>
                </div>
                <p className="share-note">WhatsApp opens with the message ready. You choose the contact and press send.</p>
              </motion.div>
            )}
          </AnimatePresence>
          <p className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</p>
        </div>
      </Reveal>
    </section>
  );
}
