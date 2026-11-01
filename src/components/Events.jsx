import { motion } from 'framer-motion';
import { MapPin, Clock, Shirt, CalendarPlus } from 'lucide-react';
import { useWedding, useText, useCouple } from '../context/WeddingContext.jsx';
import { parseDate, formatDay, formatMonthShort, formatWeekday, formatTime, googleCalendarUrl } from '../utils/dates.js';
import { EventMotif, Photo } from './Ornaments.jsx';
import { SectionHead, stagger, rise } from './Reveal.jsx';

function EventRow({ ev, index }) {
  const t = useText('events');
  const { names } = useCouple();
  const start = parseDate(ev.start);
  const end = parseDate(ev.end);
  const cal = googleCalendarUrl({
    title: `${ev.name} · ${names}`,
    start: ev.start,
    end: ev.end,
    details: ev.description,
    location: [ev.venue, ev.address].filter(Boolean).join(', '),
  });

  return (
    <motion.li
      className={`event motif-${ev.motif} ${index % 2 ? 'alt' : ''}`}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div variants={rise} className="event-date" aria-hidden={!start}>
        {start ? (
          <>
            <span className="ed-day">{formatDay(start)}</span>
            <span className="ed-month">{formatMonthShort(start)}</span>
            <span className="ed-week">{formatWeekday(start)}</span>
          </>
        ) : (
          <span className="ed-week">Date TBA</span>
        )}
      </motion.div>

      <span className="event-node" aria-hidden="true"><EventMotif type={ev.motif} /></span>

      <motion.div variants={rise} className="event-body">
        <p className="event-index">{String(index + 1).padStart(2, '0')}</p>
        <h3>{ev.name}</h3>
        <p className="event-desc">{ev.description}</p>
        <dl className="event-meta">
          {start && (
            <div>
              <dt><Clock size={15} strokeWidth={1.6} aria-label="Time" /></dt>
              <dd>{formatTime(start)}{end ? ` – ${formatTime(end)}` : ''}</dd>
            </div>
          )}
          {ev.venue && (
            <div>
              <dt><MapPin size={15} strokeWidth={1.6} aria-label="Venue" /></dt>
              <dd><strong>{ev.venue}</strong>{ev.address && <span>{ev.address}</span>}</dd>
            </div>
          )}
          {ev.dressCode && (
            <div>
              <dt><Shirt size={15} strokeWidth={1.6} aria-label="Dress code" /></dt>
              <dd>{ev.dressCode}</dd>
            </div>
          )}
        </dl>
        {cal && (
          <a className="event-cal" href={cal} target="_blank" rel="noopener noreferrer">
            <CalendarPlus size={14} strokeWidth={1.6} aria-hidden="true" /> {t.saveToCalendar}
          </a>
        )}
      </motion.div>

      {ev.image && (
        <motion.div variants={rise} className="event-image">
          <Photo src={ev.image} alt={ev.name} label={ev.name} />
        </motion.div>
      )}
    </motion.li>
  );
}

export default function Events() {
  const { events } = useWedding();
  const t = useText('events');
  return (
    <section className="events" id="events">
      <SectionHead
        eyebrow={t.eyebrow.replace('{count}', events.length)}
        script={t.script}
        title={t.title}
      />
      {t.intro && <p className="events-intro">{t.intro}</p>}
      {/* The list drives the line: a scaleY(0) element has no box to observe. */}
      <motion.ol className="timeline" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
        <motion.span
          className="timeline-line"
          aria-hidden="true"
          variants={{
            hidden: { scaleY: 0 },
            show: { scaleY: 1, transition: { duration: 2.4, ease: [0.65, 0, 0.35, 1] } },
          }}
        />
        {events.map((ev, i) => <EventRow key={ev.id || i} ev={ev} index={i} />)}
      </motion.ol>
    </section>
  );
}
