import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { wedding } from '../config/weddingDetails.js';
import { parseDate, formatLong } from '../lib/dates.js';
import { Monogram, GoldDivider } from './Ornaments.jsx';
import { Reveal } from './Reveal.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

function PetalShower() {
  const petals = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        i,
        x: Math.random() * 100,
        d: 2.6 + Math.random() * 2,
        delay: Math.random() * 0.9,
        r: Math.random() * 540 - 270,
        drift: (Math.random() - 0.5) * 120,
        gold: i % 3 === 0,
      })),
    []
  );
  return (
    <div className="shower" aria-hidden="true">
      {petals.map((p) => (
        <motion.i
          key={p.i}
          className={p.gold ? 'spark' : 'petal'}
          style={{ left: `${p.x}%` }}
          initial={{ y: -40, x: 0, opacity: 0, rotate: 0 }}
          animate={{ y: 900, x: p.drift, opacity: [0, 1, 1, 0], rotate: p.r }}
          transition={{ duration: p.d, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}

export default function Closing() {
  const { closing } = wedding;
  const date = parseDate(wedding.weddingDate);
  const reduced = useReducedMotion();
  const [burst, setBurst] = useState(0);
  const tel = closing.rsvpPhone?.replace(/[^\d+]/g, '');

  return (
    <footer className="closing" id="closing">
      <AnimatePresence>{burst > 0 && !reduced && <PetalShower key={burst} />}</AnimatePresence>
      <Reveal><Monogram text={wedding.monogram} size={96} className="light" /></Reveal>
      <Reveal as="p" className="script closing-script" delay={0.1}>with love &amp; blessings</Reveal>
      <Reveal as="h2" className="closing-line" delay={0.2}>{closing.line}</Reveal>
      <GoldDivider className="light" />
      <Reveal as="p" className="closing-families" delay={0.1}>{closing.families}</Reveal>

      <Reveal delay={0.2}>
        <button type="button" className="btn btn-gold" onClick={() => setBurst((b) => b + 1)}>
          Shower your blessings
        </button>
      </Reveal>

      {closing.rsvpName && (
        <Reveal className="rsvp" delay={0.15}>
          <p className="eyebrow">For RSVP &amp; assistance</p>
          <p className="rsvp-name">{closing.rsvpName}</p>
          {tel && (
            <a className="rsvp-phone" href={`tel:${tel}`}>
              <Phone size={14} strokeWidth={1.6} aria-hidden="true" /> {closing.rsvpPhone}
            </a>
          )}
        </Reveal>
      )}

      <p className="colophon">
        {wedding.groom.firstName} &amp; {wedding.bride.firstName}
        {date && <> · {formatLong(date)}</>} · {wedding.hashtag}
      </p>
    </footer>
  );
}
