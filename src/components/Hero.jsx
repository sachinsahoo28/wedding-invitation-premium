import { motion } from 'framer-motion';
import { useWedding, useText } from '../context/WeddingContext.jsx';
import { parseDate, formatDay, formatMonthShort, formatYear, formatWeekday } from '../utils/dates.js';
import { salutation } from '../utils/guestPersonalization.js';
import { Corner, GoldDivider, Mandala } from './Ornaments.jsx';
import { stagger, rise } from './Reveal.jsx';

export default function Hero({ guest, opened }) {
  const config = useWedding();
  const t = useText('invitation');
  const { groom, bride } = config.couple;
  const { family } = config;
  const date = parseDate(config.wedding.date);

  return (
    <section className="hero" id="invitation">
      <Mandala className="hero-mandala" />
      <motion.div className="hero-card" variants={stagger} initial="hidden" animate={opened ? 'show' : 'hidden'}>
        <Corner className="c-tl" />
        <Corner className="c-tr" />
        <Corner className="c-bl" />
        <Corner className="c-br" />

        {guest && (
          <motion.div variants={rise} className="hero-guest">
            <span className="script">{config.text.gate.dear}</span>
            <strong>{salutation(guest)}</strong>
            {guest.note && <em>“{guest.note}”</em>}
          </motion.div>
        )}

        {config.features.blessing && config.blessing.invitationLine && (
          <motion.p variants={rise} className="hero-shubh" lang="hi">{config.blessing.invitationLine}</motion.p>
        )}
        <motion.p variants={rise} className="eyebrow">{t.eyebrow}</motion.p>

        <motion.div variants={rise} className="hero-person">
          <h2>{groom.fullName || groom.firstName}</h2>
          {family.groomParents && <p>{family.groomParents}</p>}
        </motion.div>

        <motion.span variants={rise} className="hero-weds script">{t.weds}</motion.span>

        <motion.div variants={rise} className="hero-person">
          <h2>{bride.fullName || bride.firstName}</h2>
          {family.brideParents && <p>{family.brideParents}</p>}
        </motion.div>

        <motion.div variants={rise}><GoldDivider delay={0.6} /></motion.div>

        {family.invitationMessage && <motion.p variants={rise} className="hero-line">{family.invitationMessage}</motion.p>}

        {date && (
          <motion.div variants={rise} className="hero-date" aria-label="Wedding date">
            <span>{formatWeekday(date)}</span>
            <strong>{formatDay(date)}</strong>
            <span>{formatMonthShort(date)} {formatYear(date)}</span>
          </motion.div>
        )}
        {config.wedding.city && <motion.p variants={rise} className="hero-city">{config.wedding.city}</motion.p>}
      </motion.div>

      <motion.a
        href="#story"
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-label="Scroll down"
      >
        <span />
      </motion.a>
    </section>
  );
}
