import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { wedding } from '../config/weddingDetails.js';
import { Photo, GoldDivider } from './Ornaments.jsx';
import { Reveal, SectionHead, stagger, rise } from './Reveal.jsx';

function Person({ person, role, flip }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  return (
    <article ref={ref} className={`person ${flip ? 'flip' : ''}`}>
      <Reveal className="person-photo-wrap" y={36}>
        <motion.div style={{ y }} className="person-parallax">
          <Photo src={person.photo} alt={person.fullName} label={`The ${role}`} tone={flip ? 'sage' : 'rose'} className="arch" />
        </motion.div>
        <span className="person-role">The {role}</span>
      </Reveal>
      <motion.div className="person-text" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
        <motion.h3 variants={rise}>{person.firstName}</motion.h3>
        <motion.p variants={rise} className="person-full">{person.fullName}</motion.p>
        <motion.p variants={rise} className="person-intro">{person.intro}</motion.p>
        <motion.p variants={rise} className="person-parents">{person.parents}</motion.p>
      </motion.div>
    </article>
  );
}

export default function CoupleStory() {
  const { story } = wedding;
  return (
    <section className="story" id="story">
      <div className="wrap">
        <SectionHead eyebrow="The couple" script="two hearts, one journey" title="Meet the bride & groom" />
        <div className="persons">
          <Person person={wedding.groom} role="groom" />
          <Person person={wedding.bride} role="bride" flip />
        </div>
      </div>

      <div className="wrap love">
        <div className="love-text">
          <SectionHead eyebrow="Our story" title={story.heading} align="left" />
          <Reveal as="p" className="love-summary">{story.summary}</Reveal>
          <ol className="milestones">
            {story.milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 0.12}>
                <span className="m-year">{m.year}</span>
                <div>
                  <strong>{m.title}</strong>
                  <p>{m.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="collage" aria-label="Couple photographs">
          {story.photos.slice(0, 3).map((src, i) => (
            <Reveal key={i} className={`collage-item ci-${i}`} delay={0.1 + i * 0.15} y={40}>
              <Photo src={src} alt={`${wedding.groom.firstName} and ${wedding.bride.firstName}, photo ${i + 1}`} label={`Story photo ${i + 1}`} tone={['rose', 'champagne', 'sage'][i]} />
            </Reveal>
          ))}
        </div>
      </div>
      <GoldDivider />
    </section>
  );
}
