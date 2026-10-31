import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { readGuest } from './lib/personalization.js';
import { music } from './lib/audio.js';
import Envelope from './components/Envelope.jsx';
import Hero from './components/Hero.jsx';
import CoupleStory from './components/CoupleStory.jsx';
import RoyalDoors from './components/RoyalDoors.jsx';
import DateReveal from './components/DateReveal.jsx';
import Events from './components/Events.jsx';
import Film from './components/Film.jsx';
import Venue from './components/Venue.jsx';
import ShareInvite from './components/ShareInvite.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import Closing from './components/Closing.jsx';

export default function App() {
  // Read once from the URL; the query string survives refreshes, so the greeting does too.
  const guest = useMemo(() => readGuest(), []);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('locked', !opened);
    if (opened) window.scrollTo(0, 0);
  }, [opened]);

  // Try autoplay where the browser allows it; otherwise the envelope tap starts it.
  useEffect(() => {
    music.play();
  }, []);

  return (
    <>
      <AnimatePresence>
        {!opened && <Envelope key="gate" guest={guest} onBegin={() => music.play()} onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      <main className="page" aria-hidden={!opened} inert={!opened ? '' : undefined}>
        <Hero guest={guest} opened={opened} />
        <CoupleStory />
        <RoyalDoors />
        <DateReveal />
        <Events />
        <Film />
        <Venue />
        {!guest && <ShareInvite />}
        <Closing />
      </main>

      {opened && <MusicPlayer />}
    </>
  );
}
