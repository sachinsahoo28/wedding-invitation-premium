import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useWedding, useText } from '../context/WeddingContext.jsx';
import { Photo, GoldDivider } from './Ornaments.jsx';
import { Reveal, SectionHead, stagger, rise } from './Reveal.jsx';

function Person({ person, parents, role, flip }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  return (
    <article ref={ref} className={`person ${flip ? 'flip' : ''}`}>
      <Reveal className="person-photo-wrap" y={36}>
        <motion.div style={{ y }} className="person-parallax">
          <Photo src={person.photo} alt={person.fullName || person.firstName} label={role} tone={flip ? 'sage' : 'rose'} className="arch" />
        </motion.div>
        <span className="person-role">{role}</span>
      </Reveal>
      <motion.div className="person-text" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
        <motion.h3 variants={rise}>{person.firstName}</motion.h3>
        {person.fullName && <motion.p variants={rise} className="person-full">{person.fullName}</motion.p>}
        {person.intro && <motion.p variants={rise} className="person-intro">{person.intro}</motion.p>}
        {parents && <motion.p variants={rise} className="person-parents">{parents}</motion.p>}
      </motion.div>
    </article>
  );
}

export default function CoupleStory() {
  const config = useWedding();
  const t = useText('couple');
  const ts = useText('story');
  const { story, features, family } = config;
  const { groom, bride } = config.couple;
  const photos = (story.photos || []).slice(0, 3);
  const showLove = features.loveStory && (story.summary || story.milestones?.length || photos.length);

  return (
    <section className="story" id="story">
      {features.coupleStory && (
        <div className="wrap">
          <SectionHead eyebrow={t.eyebrow} script={t.script} title={t.title} />
          <div className="persons">
            <Person person={groom} parents={family.groomParents} role={t.groom} />
            <Person person={bride} parents={family.brideParents} role={t.bride} flip />
          </div>
        </div>
      )}

      {showLove && (
        <div className={`wrap love ${photos.length ? '' : 'no-photos'}`}>
          <div className="love-text">
            <SectionHead eyebrow={ts.eyebrow} title={story.heading} align="left" />
            {story.summary && <Reveal as="p" className="love-summary">{story.summary}</Reveal>}
            {story.milestones?.length > 0 && (
              <ol className="milestones">
                {story.milestones.map((m, i) => (
                  <Reveal as="li" key={`${m.year}-${m.title}`} delay={i * 0.12}>
                    <span className="m-year">{m.year}</span>
                    <div>
                      <strong>{m.title}</strong>
                      {m.text && <p>{m.text}</p>}
                    </div>
                  </Reveal>
                ))}
              </ol>
            )}
          </div>
          {photos.length > 0 && (
            <div className={`collage count-${photos.length}`} aria-label="Couple photographs">
              {photos.map((src, i) => (
                <Reveal key={i} className={`collage-item ci-${i}`} delay={0.1 + i * 0.15} y={40}>
                  <Photo
                    src={src}
                    alt={`${groom.firstName} and ${bride.firstName}, photo ${i + 1}`}
                    label={`Story photo ${i + 1}`}
                    tone={['rose', 'champagne', 'sage'][i]}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      )}
      <GoldDivider />
    </section>
  );
}
