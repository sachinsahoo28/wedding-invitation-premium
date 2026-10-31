import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { wedding } from '../config/weddingDetails.js';
import { parseDate, formatLong, formatTime } from '../lib/dates.js';
import { Photo } from './Ornaments.jsx';

// Choreography: frame → name → gold rule → address → photo → button.
const ease = [0.22, 1, 0.36, 1];
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.22 } } };
const frame = { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } } };
const rule = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } } };
const photo = { hidden: { opacity: 0, scale: 1.06 }, show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease } } };

export default function Venue() {
  const { venue } = wedding;
  const date = parseDate(wedding.weddingDate);
  const query = venue.mapQuery || [venue.name, venue.city].filter(Boolean).join(', ');
  const mapsLink =
    venue.mapsUrl || (query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : '');

  return (
    <section className="venue" id="venue">
      <motion.div
        className="venue-frame"
        variants={seq}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.svg variants={frame} className="venue-arch" viewBox="0 0 300 380" preserveAspectRatio="none" aria-hidden="true">
          <path d="M8 376 V140 Q8 52 82 30 Q118 18 150 4 Q182 18 218 30 Q292 52 292 140 V376 Z" />
          <path className="inner" d="M20 376 V146 Q20 64 88 42 Q122 31 150 18 Q178 31 212 42 Q280 64 280 146 V376" />
        </motion.svg>

        <div className="venue-content">
          <motion.p variants={item} className="eyebrow">Where</motion.p>
          <motion.h2 variants={item} className="venue-name">{venue.name}</motion.h2>
          <motion.span variants={rule} className="venue-rule" aria-hidden="true" />
          <motion.address variants={item} className="venue-address">
            <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
            <span>
              {venue.address}
              {venue.city && <strong>{venue.city}</strong>}
            </span>
          </motion.address>
          {date && (
            <motion.p variants={item} className="venue-when">
              {formatLong(date)} · {formatTime(date)}
            </motion.p>
          )}
          <motion.div variants={photo} className="venue-photo">
            <Photo src={venue.photo} alt={venue.name} label="Venue photograph" tone="sage" />
          </motion.div>
          {mapsLink && (
            <motion.a variants={item} className="btn btn-primary" href={mapsLink} target="_blank" rel="noopener noreferrer">
              <Navigation size={16} strokeWidth={1.6} aria-hidden="true" /> View location
            </motion.a>
          )}
        </div>
      </motion.div>

      {venue.showMapEmbed && query && (
        <motion.div
          className="map-embed"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <iframe
            title={`Map of ${venue.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      )}
    </section>
  );
}
