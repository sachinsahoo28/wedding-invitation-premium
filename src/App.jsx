import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWedding } from './context/WeddingContext.jsx';
import { readGuest } from './utils/guestPersonalization.js';
import { music } from './utils/audio.js';
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
  const config = useWedding();
  const f = config.features;

  // Read once from the URL; the query string survives refreshes, so the greeting does too.
  const guest = useMemo(() => (f.guestPersonalization ? readGuest() : null), [f.guestPersonalization]);
  const [opened, setOpened] = useState(!f.envelope);

  useEffect(() => {
    document.body.classList.toggle('locked', !opened);
    if (opened && f.envelope) window.scrollTo(0, 0);
  }, [opened, f.envelope]);

  // Try autoplay where the browser allows it; otherwise the envelope tap starts it.
  useEffect(() => {
    if (f.music) music.play();
  }, [f.music]);

  return (
    <>
      <AnimatePresence>
        {!opened && <Envelope key="gate" guest={guest} onBegin={() => music.play()} onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      <main className="page" aria-hidden={!opened} inert={!opened ? '' : undefined}>
        {f.invitation && <Hero guest={guest} opened={opened} />}
        {(f.coupleStory || f.loveStory) && <CoupleStory />}
        {f.royalDoors && <RoyalDoors />}
        {(f.saveTheDate || f.countdown) && <DateReveal />}
        {f.events && config.events.length > 0 && <Events />}
        {f.video && <Film />}
        {f.venue && config.venue.name && <Venue />}
        {f.shareInvite && !guest && <ShareInvite />}
        {f.closing && <Closing />}
      </main>

      {opened && f.music && <MusicPlayer />}
    </>
  );
}
