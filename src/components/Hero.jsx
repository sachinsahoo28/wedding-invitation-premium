import { motion } from 'framer-motion';
import { wedding } from '../config/weddingDetails.js';
import { parseDate, formatDay, formatMonthShort, formatYear, formatWeekday } from '../lib/dates.js';
import { salutation } from '../lib/personalization.js';
import { Corner, GoldDivider, Mandala } from './Ornaments.jsx';
import { stagger, rise } from './Reveal.jsx';

export default function Hero({ guest, opened }) {
  const date = parseDate(wedding.weddingDate);
  return (
    <section className="hero" id="invitation">
      <Mandala className="hero-mandala" />
      <motion.div className="hero-card" variants={stagger} initial="hidden" animate={opened ? "show" : "hidden"}>
        <Corner className="c-tl" />
        <Corner className="c-tr" />
        <Corner className="c-bl" />
        <Corner className="c-br" />

        {guest && (
          <motion.div variants={rise} className="hero-guest">
            <span className="script">Dear</span>
            <strong>{salutation(guest)}</strong>
            {guest.note && <em>“{guest.note}”</em>}
          </motion.div>
        )}

        <motion.p variants={rise} className="hero-shubh" lang="hi">॥ शुभ विवाह ॥</motion.p>
        <motion.p variants={rise} className="eyebrow">Together with their families</motion.p>

        <motion.div variants={rise} className="hero-person">
          <h2>{wedding.groom.fullName}</h2>
          <p>{wedding.groom.parents}</p>
        </motion.div>

        <motion.span variants={rise} className="hero-weds script">weds</motion.span>

        <motion.div variants={rise} className="hero-person">
          <h2>{wedding.bride.fullName}</h2>
          <p>{wedding.bride.parents}</p>
        </motion.div>

        <motion.div variants={rise}><GoldDivider delay={0.6} /></motion.div>

        <motion.p variants={rise} className="hero-line">{wedding.invitationLine}</motion.p>

        {date && (
          <motion.div variants={rise} className="hero-date" aria-label="Wedding date">
            <span>{formatWeekday(date)}</span>
            <strong>{formatDay(date)}</strong>
            <span>{formatMonthShort(date)} {formatYear(date)}</span>
          </motion.div>
        )}
        <motion.p variants={rise} className="hero-city">{wedding.city}</motion.p>
      </motion.div>

      <motion.a
        href="#story"
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-label="Scroll to our story"
      >
        <span />
      </motion.a>
    </section>
  );
}
