import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Film as FilmIcon, RotateCcw } from 'lucide-react';
import { useWedding, useText } from '../context/WeddingContext.jsx';
import { asset } from '../utils/assets.js';
import { music } from '../utils/audio.js';
import { SectionHead } from './Reveal.jsx';
import { Corner } from './Ornaments.jsx';

export default function Film() {
  const film = useWedding().media.video;
  const t = useText('video');
  const videoRef = useRef(null);
  const resumeMusic = useRef(false);
  const [state, setState] = useState('idle'); // idle | loading | playing | paused | error
  const hasVideo = !!film.src;

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setState('loading');
    v.play().catch(() => setState('error'));
  };

  // Never let background music and the film's audio overlap.
  const onPlay = () => {
    resumeMusic.current = resumeMusic.current || music.isPlaying();
    music.pause();
    setState('playing');
  };
  const onStop = (next) => () => {
    setState(next);
    if (resumeMusic.current) {
      resumeMusic.current = false;
      music.play();
    }
  };

  return (
    <section className="film" id="film">
      <SectionHead eyebrow={t.eyebrow} script={t.script} title={t.title} />
      <motion.div
        className="film-frame"
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Corner className="c-tl" />
        <Corner className="c-tr" />
        <Corner className="c-bl" />
        <Corner className="c-br" />
        <div className="film-screen">
          {hasVideo ? (
            <>
              <video
                ref={videoRef}
                src={asset(film.src)}
                poster={asset(film.poster) || undefined}
                controls={state !== 'idle'}
                playsInline
                preload="metadata"
                onPlay={onPlay}
                onPlaying={() => setState('playing')}
                onWaiting={() => setState('loading')}
                onPause={onStop('paused')}
                onEnded={onStop('paused')}
                onError={() => setState('error')}
                aria-label={`${t.title}, wedding film`}
              />
              {state === 'idle' && (
                <button type="button" className="film-play" onClick={play} aria-label="Play the wedding film">
                  <span><Play size={26} strokeWidth={1.4} fill="currentColor" aria-hidden="true" /></span>
                </button>
              )}
              {state === 'loading' && <span className="film-spinner" role="status" aria-label="Loading video" />}
              {state === 'error' && (
                <div className="film-message" role="alert">
                  <p>The film couldn’t be loaded right now.</p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-small"
                    onClick={() => { videoRef.current?.load(); setState('idle'); }}
                  >
                    <RotateCcw size={15} aria-hidden="true" /> Try again
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="film-placeholder">
              <FilmIcon size={30} strokeWidth={1.2} aria-hidden="true" />
              <p className="script">{t.placeholder}</p>
              <p className="film-note">
                Video placeholder · set <code>media.video.src</code> in the client config
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
