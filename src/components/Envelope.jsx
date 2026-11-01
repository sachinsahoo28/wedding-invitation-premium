import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useWedding, useText } from '../context/WeddingContext.jsx';
import { parseDate, formatDay, formatMonth, formatYear } from '../utils/dates.js';
import { salutation } from '../utils/guestPersonalization.js';
import { Monogram, WaxSeal, Corner } from './Ornaments.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

// Stage timeline (ms after tap). Kept brisk: whole sequence ≈ 2.6 s.
const T = { sealFade: 320, flap: 620, card: 1250, particles: 1500, done: 2650 };
const T_REDUCED = { sealFade: 0, flap: 0, card: 0, particles: 9e9, done: 600 };

export default function Envelope({ guest, onBegin, onOpen }) {
  const config = useWedding();
  const t = useText('gate');
  const { groom, bride, monogram, hashtag } = config.couple;
  const reduced = useReducedMotion();
  const [stage, setStage] = useState('idle'); // idle → seal → flap → card → done
  const timers = useRef([]);
  const date = parseDate(config.wedding.date);
  const initials = monogram.replace(/\s/g, '').replace('&', '·');

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const open = () => {
    if (stage !== 'idle') return; // ignore double taps
    onBegin?.(); // starts music inside the same user gesture
    const time = reduced ? T_REDUCED : T;
    setStage('seal');
    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));
    at(time.sealFade, () => setStage('flap'));
    at(time.card, () => setStage('card'));
    at(time.done, () => {
      setStage('done');
      onOpen();
    });
  };

  const flapOpen = ['flap', 'card', 'done'].includes(stage);
  const cardUp = ['card', 'done'].includes(stage);

  return (
    <motion.div
      className="gate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: reduced ? 0.3 : 0.85, ease: [0.7, 0, 0.2, 1] } }}
    >
      <div className="gate-light" aria-hidden="true" />
      <div className="gate-inner">
        {config.features.blessing && (
          <motion.div
            className="blessing"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <span className="blessing-title" lang="sa">{config.blessing.title}</span>
            <p className="shloka" lang="sa">
              {(config.blessing.sanskrit || '').split('\n').map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
          </motion.div>
        )}

        <motion.div
          className="gate-heading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          <Monogram text={monogram} size={64} />
          {guest ? (
            <p className="gate-guest">
              <span className="script">{t.dear}</span> {salutation(guest)}
            </p>
          ) : (
            <p className="eyebrow">{t.eyebrow}</p>
          )}
          <h1 className="gate-names">
            {groom.firstName} <span className="script amp">&amp;</span> {bride.firstName}
          </h1>
          {hashtag && <p className="hashtag">{hashtag}</p>}
        </motion.div>

        <motion.button
          type="button"
          className={`envelope stage-${stage}`}
          onClick={open}
          aria-label="Open the invitation"
          disabled={stage !== 'idle'}
          initial={{ opacity: 0, y: 24, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="env-back" aria-hidden="true" />

          <motion.span
            className="env-card"
            aria-hidden="true"
            initial={false}
            animate={cardUp ? { y: '-58%', scale: 1.02 } : { y: '0%', scale: 1 }}
            transition={{ duration: reduced ? 0 : 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Corner className="c-tl" />
            <Corner className="c-tr" />
            <span className="env-card-eyebrow">{t.cardEyebrow}</span>
            <span className="env-card-names">
              {groom.firstName}
              <em>&amp;</em>
              {bride.firstName}
            </span>
            {date && (
              <span className="env-card-date">
                {formatDay(date)} · {formatMonth(date)} · {formatYear(date)}
              </span>
            )}
          </motion.span>

          <span className="env-front" aria-hidden="true">
            <svg viewBox="0 0 300 200" preserveAspectRatio="none">
              <path className="pocket-l" d="M0 0 L150 112 L0 200Z" />
              <path className="pocket-r" d="M300 0 L150 112 L300 200Z" />
              <path className="pocket-b" d="M0 200 L150 96 L300 200Z" />
            </svg>
          </span>

          <motion.span
            className="env-flap"
            aria-hidden="true"
            initial={false}
            animate={{ rotateX: flapOpen ? 178 : 0 }}
            transition={{ duration: reduced ? 0 : 0.75, ease: [0.55, 0, 0.25, 1] }}
            style={{ zIndex: cardUp ? 1 : 5 }}
          >
            <svg viewBox="0 0 300 120" preserveAspectRatio="none">
              <path d="M0 0 H300 L162 112 Q150 121 138 112Z" />
              <path className="flap-edge" d="M6 3 L150 114 L294 3" />
            </svg>
          </motion.span>

          <motion.span
            className="env-seal"
            aria-hidden="true"
            initial={false}
            animate={
              stage === 'idle'
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.12, transition: { duration: reduced ? 0 : 0.42, delay: reduced ? 0 : 0.12 } }
            }
          >
            <WaxSeal initials={initials} className={stage === 'seal' ? 'glowing' : ''} />
          </motion.span>

          {stage === 'card' || stage === 'done' ? <Particles enabled={!reduced} /> : null}
        </motion.button>

        <motion.p
          className="gate-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === 'idle' ? 1 : 0 }}
          transition={{ duration: 0.6, delay: stage === 'idle' ? 1.3 : 0 }}
        >
          {t.hint}
        </motion.p>
      </div>
    </motion.div>
  );
}

function Particles({ enabled }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        petal: i % 4 === 0,
        x: (Math.random() - 0.5) * 340,
        y: -120 - Math.random() * 200,
        r: Math.random() * 360,
        d: 1.4 + Math.random() * 0.9,
        s: 0.6 + Math.random() * 0.8,
      })),
    []
  );
  if (!enabled) return null;
  return (
    <span className="particles" aria-hidden="true">
      {bits.map((b) => (
        <motion.i
          key={b.id}
          className={b.petal ? 'petal' : 'spark'}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
          animate={{ x: b.x, y: b.y, opacity: [0, 1, 0], scale: b.s, rotate: b.r }}
          transition={{ duration: b.d, ease: 'easeOut' }}
        />
      ))}
    </span>
  );
}
