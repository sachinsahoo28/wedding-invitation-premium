import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarPlus } from 'lucide-react';
import { wedding } from '../config/weddingDetails.js';
import {
  parseDate, formatDay, formatMonth, formatYear, formatWeekday, formatTime, venueParts, googleCalendarUrl,
} from '../lib/dates.js';
import { useCountdown } from '../hooks/useCountdown.js';
import { Corner, GoldDivider } from './Ornaments.jsx';
import { SectionHead, Reveal } from './Reveal.jsx';

/** Gold foil layer the guest can scratch away; tapping the button reveals instantly. */
function ScratchFoil({ onReveal }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const done = useRef(false);
  // The parent re-renders every second (countdown); keep the callback in a
  // ref so the foil isn't repainted and the guest's scratching isn't lost.
  const revealRef = useRef(onReveal);
  revealRef.current = onReveal;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const paint = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, '#e9d3a0');
      g.addColorStop(0.45, '#c9a464');
      g.addColorStop(0.55, '#e6cf98');
      g.addColorStop(1, '#a9844b');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
      // subtle foil grain
      for (let i = 0; i < 900; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.12})`;
        ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
      }
      ctx.fillStyle = 'rgba(69,34,55,.72)';
      ctx.font = '600 11px "DM Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '3px';
      ctx.fillText('SCRATCH TO REVEAL', width / 2, height / 2 + 4);
    };
    paint();

    const pos = (e) => {
      const r = canvas.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      return { x: p.clientX - r.left, y: p.clientY - r.top };
    };
    const scratch = (e) => {
      if (!drawing.current || done.current) return;
      e.preventDefault();
      const { x, y } = pos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      check();
    };
    let checks = 0;
    const check = () => {
      if (++checks % 6) return;
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let clear = 0;
      for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear++;
      if (clear / (data.length / 64) > 0.45) {
        done.current = true;
        revealRef.current();
      }
    };
    const start = (e) => { drawing.current = true; scratch(e); };
    const stop = () => { drawing.current = false; };
    canvas.addEventListener('pointerdown', start);
    canvas.addEventListener('pointermove', scratch);
    window.addEventListener('pointerup', stop);
    canvas.addEventListener('touchmove', scratch, { passive: false });
    return () => {
      canvas.removeEventListener('pointerdown', start);
      canvas.removeEventListener('pointermove', scratch);
      window.removeEventListener('pointerup', stop);
      canvas.removeEventListener('touchmove', scratch);
    };
  }, []);

  return <canvas ref={canvasRef} className="foil" aria-hidden="true" />;
}

function MiniCalendar({ date }) {
  const { year, month, day } = venueParts(date);
  const first = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div className="mini-cal" aria-label={`${formatMonth(date)} ${year} calendar`}>
      <p className="mini-cal-title">{formatMonth(date)} {year}</p>
      <div className="mini-cal-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className="dow">{d}</span>)}
        {cells.map((d, i) => (
          <span key={i} className={d === day ? 'is-day' : ''} aria-current={d === day ? 'date' : undefined}>
            {d || ''}
            {d === day && (
              <svg viewBox="0 0 24 22" aria-hidden="true"><path d="M12 21 C-4 10 4 -3 12 5 C20 -3 28 10 12 21Z" /></svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DateReveal() {
  const date = parseDate(wedding.weddingDate);
  const [revealed, setRevealed] = useState(false);
  const countdown = useCountdown(date);

  if (!date) {
    return (
      <section className="date-section" id="date">
        <SectionHead eyebrow="Save the date" title="Date to be announced" />
      </section>
    );
  }

  const cal = googleCalendarUrl({
    title: `Wedding of ${wedding.groom.firstName} & ${wedding.bride.firstName}`,
    start: wedding.weddingDate,
    end: wedding.weddingEndDate,
    details: wedding.invitationLine,
    location: [wedding.venue.name, wedding.venue.city].filter(Boolean).join(', '),
  });
  const units = countdown && [
    ['Days', countdown.days],
    ['Hours', countdown.hours],
    ['Minutes', countdown.minutes],
    ['Seconds', countdown.seconds],
  ];

  return (
    <section className="date-section" id="date">
      <SectionHead eyebrow="Save the date" script="mark your calendar" title="The big day" />

      <Reveal className="date-frame">
        <Corner className="c-tl" />
        <Corner className="c-tr" />
        <Corner className="c-bl" />
        <Corner className="c-br" />
        <div className="date-face">
          <span className="df-weekday">{formatWeekday(date)}</span>
          <span className="df-day">{formatDay(date)}</span>
          <span className="df-month">{formatMonth(date)}</span>
          <span className="df-year">{formatYear(date)}</span>
          <span className="df-time">{formatTime(date)} onwards</span>
        </div>
        <AnimatePresence>
          {!revealed && (
            <motion.div className="foil-wrap" exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.6 }}>
              <ScratchFoil onReveal={() => setRevealed(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>

      {!revealed && (
        <button type="button" className="btn btn-text" onClick={() => setRevealed(true)}>
          Or tap here to reveal
        </button>
      )}

      <GoldDivider />

      {countdown?.past ? (
        <Reveal as="p" className="countdown-past">
          <span className="script">Happily married</span>
          Thank you for celebrating with us.
        </Reveal>
      ) : (
        <Reveal className="countdown" role="timer" aria-label="Countdown to the wedding">
          {units.map(([label, value]) => (
            <div key={label} className="cd-unit">
              <span className="cd-num" aria-hidden="true">{String(value).padStart(2, '0')}</span>
              <span className="cd-label">{label}</span>
            </div>
          ))}
          <span className="sr-only">
            {countdown.days} days, {countdown.hours} hours and {countdown.minutes} minutes to go
          </span>
        </Reveal>
      )}

      <div className="date-bottom">
        <Reveal><MiniCalendar date={date} /></Reveal>
        {!countdown?.past && cal && (
          <Reveal delay={0.15}>
            <a className="btn btn-secondary" href={cal} target="_blank" rel="noopener noreferrer">
              <CalendarPlus size={17} strokeWidth={1.6} aria-hidden="true" />
              Add to Google Calendar
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
