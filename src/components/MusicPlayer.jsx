import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';
import { music } from '../lib/audio.js';

export default function MusicPlayer() {
  const [s, setS] = useState({ playing: false, available: false });
  useEffect(() => music.subscribe(setS), []);
  if (!s.available) return null;

  return (
    <motion.button
      type="button"
      className={`music-btn ${s.playing ? 'is-playing' : ''}`}
      onClick={() => (s.playing ? music.pause() : music.play())}
      aria-label={s.playing ? 'Pause background music' : 'Play background music'}
      aria-pressed={s.playing}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <span className="music-ring" aria-hidden="true" />
      {s.playing ? (
        <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
      ) : (
        <Music2 size={18} strokeWidth={1.6} aria-hidden="true" />
      )}
    </motion.button>
  );
}
