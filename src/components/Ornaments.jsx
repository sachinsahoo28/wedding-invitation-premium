import { motion } from 'framer-motion';
import { useState } from 'react';
import { asset } from '../utils/assets.js';

/** Gold divider that draws itself when scrolled into view. */
export function GoldDivider({ className = '', delay = 0 }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] } },
  };
  return (
    <motion.svg
      className={`gold-divider ${className}`}
      viewBox="0 0 240 24"
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      <motion.path variants={draw} d="M4 12 H96" />
      <motion.path variants={draw} d="M144 12 H236" />
      <motion.path variants={draw} d="M120 3 L129 12 L120 21 L111 12 Z" />
      <motion.path variants={draw} d="M100 12 q6 -7 11 0 M140 12 q-6 -7 -11 0" />
      <motion.circle variants={draw} cx="120" cy="12" r="2.2" className="fill" />
    </motion.svg>
  );
}

/** Corner flourish for frames. Rotate via CSS class. */
export function Corner({ className = '' }) {
  return (
    <svg className={`corner ${className}`} viewBox="0 0 80 80" aria-hidden="true">
      <path d="M2 78 V30 Q2 2 30 2 H78" />
      <path d="M10 78 V34 Q10 10 34 10 H78" opacity=".5" />
      <path d="M18 40 q0 -22 22 -22 q-10 8 -8 22 q-6 -4 -14 0z" className="fill-soft" />
      <circle cx="10" cy="10" r="2.5" className="fill" />
    </svg>
  );
}

export function Monogram({ text, size = 120, className = '' }) {
  const [a, b] = text.split('&').map((s) => s.trim());
  return (
    <svg className={`monogram ${className}`} width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={`Monogram ${text}`}>
      <circle cx="60" cy="60" r="56" className="ring" />
      <circle cx="60" cy="60" r="50" className="ring thin" />
      {Array.from({ length: 24 }).map((_, i) => (
        <circle key={i} cx={60 + 53 * Math.cos((i * Math.PI) / 12)} cy={60 + 53 * Math.sin((i * Math.PI) / 12)} r="0.9" className="fill" />
      ))}
      <path d="M48 22 q12 -8 24 0 q-12 5 -24 0z M48 98 q12 8 24 0 q-12 -5 -24 0z" className="fill-soft" />
      <text x="36" y="70" className="mono-letter">{a}</text>
      <text x="60" y="68" className="mono-amp">&amp;</text>
      <text x="84" y="70" className="mono-letter">{b}</text>
    </svg>
  );
}

export function WaxSeal({ initials, className = '' }) {
  return (
    <svg className={`wax-seal ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="75%">
          <stop offset="0" style={{ stopColor: 'color-mix(in srgb, var(--c-primary) 80%, white)' }} />
          <stop offset=".55" style={{ stopColor: 'var(--c-primary)' }} />
          <stop offset="1" style={{ stopColor: 'color-mix(in srgb, var(--c-primary) 60%, black)' }} />
        </radialGradient>
        <radialGradient id="waxInner" cx="50%" cy="50%" r="50%">
          <stop offset="0" style={{ stopColor: 'color-mix(in srgb, var(--c-primary) 88%, black)' }} />
          <stop offset="1" style={{ stopColor: 'color-mix(in srgb, var(--c-primary) 90%, white)' }} />
        </radialGradient>
      </defs>
      <path
        fill="url(#wax)"
        d="M50 3 C62 2 66 9 76 10 C86 12 90 22 94 30 C99 40 96 47 97 55 C98 66 91 72 86 80 C80 89 70 92 60 96 C50 99 42 96 32 93 C21 89 15 83 9 74 C3 65 3 56 4 47 C5 36 8 27 15 19 C23 10 36 4 50 3Z"
      />
      <circle cx="50" cy="50" r="31" fill="url(#waxInner)" className="seal-rim" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="27" fill="none" className="seal-groove" strokeWidth=".8" opacity=".6" />
      <text x="50" y="57" textAnchor="middle" className="seal-text">{initials}</text>
      <path d="M26 30 q6 -8 14 -10" className="seal-shine" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

/** Small mandala used as a background watermark. */
export function Mandala({ className = '' }) {
  return (
    <svg className={`mandala ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 22.5} 100 100)`}>
          <path d="M100 100 Q108 60 100 18 Q92 60 100 100" />
          <circle cx="100" cy="30" r="3" />
        </g>
      ))}
      <circle cx="100" cy="100" r="40" />
      <circle cx="100" cy="100" r="62" />
      <circle cx="100" cy="100" r="90" />
    </svg>
  );
}

const motifs = {
  haldi: (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <ellipse key={i} cx="40" cy="22" rx="6" ry="14" transform={`rotate(${i * 36} 40 40)`} />
      ))}
      <circle cx="40" cy="40" r="9" className="fill" />
    </>
  ),
  mehendi: (
    <>
      <path d="M40 8 C62 20 66 48 40 72 C14 48 18 20 40 8Z" />
      <path d="M40 18 C52 28 54 46 40 62 C26 46 28 28 40 18Z" />
      <path d="M40 26 V60 M40 36 l-8 -6 M40 36 l8 -6 M40 46 l-9 -6 M40 46 l9 -6" />
      <circle cx="40" cy="70" r="2" className="fill" />
    </>
  ),
  sangeet: (
    <>
      <path d="M30 56 V18 L58 12 V50" />
      <ellipse cx="24" cy="58" rx="7" ry="5.5" className="fill" />
      <ellipse cx="52" cy="52" rx="7" ry="5.5" className="fill" />
      <path d="M30 26 L58 20" />
      <path d="M12 30 q4 -6 0 -12 M66 66 q5 -5 2 -12" opacity=".6" />
    </>
  ),
  wedding: (
    <>
      <path d="M12 70 H68 M18 70 V34 M62 70 V34 M10 34 H70 L40 12 Z" />
      <path d="M26 34 q14 -14 28 0" />
      <path d="M40 62 c-6 -6 -6 -12 0 -18 c6 6 6 12 0 18z" className="fill" />
      <path d="M32 70 l8 -6 l8 6" />
    </>
  ),
  reception: (
    <>
      <path d="M40 6 V16 M22 16 H58 M24 16 q16 30 32 0" />
      <path d="M28 28 V40 M40 30 V46 M52 28 V40" />
      <circle cx="28" cy="43" r="3" className="fill" />
      <circle cx="40" cy="49" r="3" className="fill" />
      <circle cx="52" cy="43" r="3" className="fill" />
      <path d="M18 70 q22 -14 44 0" opacity=".6" />
    </>
  ),
  generic: (
    <>
      <circle cx="40" cy="40" r="26" />
      <path d="M40 18 L46 34 L62 40 L46 46 L40 62 L34 46 L18 40 L34 34Z" className="fill" />
    </>
  ),
};

export function EventMotif({ type }) {
  return (
    <svg className="event-motif" viewBox="0 0 80 80" aria-hidden="true">
      {motifs[type] || motifs.generic}
    </svg>
  );
}

/**
 * Photograph with a graceful, clearly-labelled placeholder when no
 * client image is configured. Never substitutes stock imagery.
 */
export function Photo({ src, alt, label = 'Photograph', className = '', tone = 'rose', style }) {
  // A missing or broken file falls back to the placeholder rather than a broken image.
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <div className={`photo ${className}`} style={style}>
        <img
          src={asset(src)}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={(e) => e.currentTarget.classList.add('loaded')}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }
  return (
    <div className={`photo photo-placeholder tone-${tone} ${className}`} style={style} role="img" aria-label={`${label} placeholder`}>
      <svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M20 120 V52 Q20 18 50 12 Q80 18 80 52 V120" />
        <path d="M28 120 V54 Q28 26 50 20 Q72 26 72 54 V120" opacity=".5" />
        <path d="M50 44 c-8 6 -8 14 0 20 c8 -6 8 -14 0 -20z" />
      </svg>
      <span className="placeholder-tag">
        <strong>{label}</strong>
        <em>Placeholder · add client photo</em>
      </span>
    </div>
  );
}
