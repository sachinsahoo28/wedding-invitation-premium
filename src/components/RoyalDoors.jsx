import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWedding, useText } from '../context/WeddingContext.jsx';
import { Photo } from './Ornaments.jsx';
import { SectionHead } from './Reveal.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

function Rosette({ cx, cy, r }) {
  return (
    <g>
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} cx={cx} cy={cy - r * 0.55} rx={r * 0.22} ry={r * 0.5} transform={`rotate(${i * 45} ${cx} ${cy})`} className="d-petal" />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.28} className="d-gold" />
      <circle cx={cx} cy={cy} r={r * 1.05} className="d-line" />
    </g>
  );
}

/** One carved door leaf; the right leaf is the same artwork mirrored. */
function DoorArt({ mirrored }) {
  const id = mirrored ? 'r' : 'l';
  return (
    <svg viewBox="0 0 100 300" preserveAspectRatio="none" className="door-art" style={mirrored ? { transform: 'scaleX(-1)' } : undefined}>
      <defs>
        <linearGradient id={`wood-${id}`} x1="0" x2="1">
          <stop offset="0" style={{ stopColor: 'var(--c-wood)' }} />
          <stop offset=".5" style={{ stopColor: 'color-mix(in srgb, var(--c-wood) 70%, var(--c-primary))' }} />
          <stop offset="1" style={{ stopColor: 'color-mix(in srgb, var(--c-wood) 92%, black)' }} />
        </linearGradient>
        <linearGradient id={`gold-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--c-accent-light)' }} />
          <stop offset=".45" style={{ stopColor: 'var(--c-accent)' }} />
          <stop offset="1" style={{ stopColor: 'var(--c-accent-dark)' }} />
        </linearGradient>
      </defs>
      <rect width="100" height="300" fill={`url(#wood-${id})`} />
      <g stroke={`url(#gold-${id})`} fill="none">
        <rect x="4" y="4" width="92" height="292" strokeWidth="1.6" />
        <rect x="9" y="9" width="82" height="282" strokeWidth=".6" />
        {/* upper arched panel */}
        <path d="M16 120 V52 Q16 22 50 16 Q84 22 84 52 V120 Z" strokeWidth="1.3" />
        <path d="M22 114 V54 Q22 30 50 24 Q78 30 78 54 V114 Z" strokeWidth=".5" />
        {/* lower panels */}
        <rect x="16" y="132" width="68" height="70" rx="2" strokeWidth="1.2" />
        <rect x="16" y="214" width="68" height="72" rx="2" strokeWidth="1.2" />
        <path d="M16 167 H84 M50 132 V202" strokeWidth=".4" opacity=".6" />
      </g>
      <g fill={`url(#gold-${id})`} stroke={`url(#gold-${id})`} strokeWidth=".5">
        <Rosette cx={50} cy={72} r={18} />
        <Rosette cx={50} cy={250} r={14} />
        {[149, 185].map((y) => [33, 67].map((x) => <circle key={`${x}${y}`} cx={x} cy={y} r="3.2" />))}
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx="6.5" cy={20 + i * 24} r="1.4" />
        ))}
      </g>
      {/* door ring on the meeting edge */}
      <g stroke={`url(#gold-${id})`} fill="none" strokeWidth="1.8">
        <circle cx="92" cy="168" r="6" />
        <circle cx="92" cy="160" r="2" fill={`url(#gold-${id})`} />
      </g>
    </svg>
  );
}

export default function RoyalDoors() {
  const config = useWedding();
  const t = useText('doors');
  const { groom, bride } = config.couple;
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const ease = [0.6, 0.02, 0.2, 1];
  const dur = reduced ? 0.01 : 1.6;

  return (
    <section className="doors-section" id="welcome">
      <SectionHead eyebrow={t.eyebrow} script={t.script} title={t.title} />

      <motion.div
        className="palace"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg className="palace-arch" viewBox="0 0 400 140" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 140 V70 Q40 70 60 40 Q80 70 110 50 Q140 0 200 0 Q260 0 290 50 Q320 70 340 40 Q360 70 400 70 V140 Z" />
          <path className="arch-line" d="M14 140 V80 Q50 80 64 54 Q84 80 114 62 Q146 14 200 14 Q254 14 286 62 Q316 80 336 54 Q350 80 386 80 V140" />
          <circle cx="200" cy="32" r="6" className="arch-gem" />
        </svg>

        <div className="doorway">
          <div className={`behind ${open ? 'lit' : ''}`}>
            <Photo src={config.media.couplePhoto} alt={`${groom.firstName} and ${bride.firstName}`} label="Couple portrait" tone="champagne" />
            <motion.div
              className="behind-caption"
              initial={false}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.9, delay: open ? (reduced ? 0 : 1.1) : 0 }}
            >
              <span className="script">{t.captionScript}</span>
              <strong>{t.caption}</strong>
            </motion.div>
          </div>

          <motion.div
            className="door-light"
            aria-hidden="true"
            initial={false}
            animate={open ? { opacity: [0, 0.9, 0] } : { opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 1.8, times: [0, 0.35, 1] }}
          />

          <button
            type="button"
            className="doors-btn"
            onClick={() => setOpen(true)}
            disabled={open}
            aria-label={open ? 'Doors opened' : 'Open the palace doors'}
          >
            <motion.span
              className="door left"
              initial={false}
              animate={{ rotateY: open ? -108 : 0 }}
              transition={{ duration: dur, ease }}
            >
              <DoorArt />
            </motion.span>
            <motion.span
              className="door right"
              initial={false}
              animate={{ rotateY: open ? 108 : 0 }}
              transition={{ duration: dur, ease }}
            >
              <DoorArt mirrored />
            </motion.span>
          </button>
        </div>
        <div className="palace-step" aria-hidden="true" />
      </motion.div>

      <motion.p className="doors-hint" initial={false} animate={{ opacity: open ? 0 : 1 }}>
        {t.hint}
      </motion.p>
    </section>
  );
}
