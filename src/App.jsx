import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Intro, { Marquee } from './components/Intro.jsx';
import ForgeDemo from './components/ForgeDemo.jsx';
import World from './components/World.jsx';
import Realms from './components/Realms.jsx';
import Disciples from './components/Disciples.jsx';
import Duel from './components/Duel.jsx';
import Armory from './components/Armory.jsx';
import Legal from './components/Legal.jsx';
import { FinalCall, Footer, Pro } from './components/Closing.jsx';
import { SoundProvider } from './lib/sound.jsx';
import { startSmoothScroll } from './lib/scroll.js';

export default function App() {
  useEffect(() => startSmoothScroll(), []);
  return (
    <MotionConfig reducedMotion="user">
      <SoundProvider>
        <a className="skip" href="#game">
          Skip to content
        </a>
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Intro />
          <ForgeDemo />
          <World />
          <Realms />
          <Disciples />
          <Duel />
          <Armory />
          <Pro />
          <FinalCall />
          <Legal />
        </main>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </SoundProvider>
    </MotionConfig>
  );
}
