import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Embers from './Embers.jsx';
import Icon from './Icon.jsx';
import AppStoreButton from './AppStoreButton.jsx';
import { asset } from '../data/site.js';
import { scrollToId } from '../lib/scroll.js';
import { ease } from './Reveal.jsx';

const WORD = 'Stepforge'.split('');

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__bg" style={{ y: bgY, scale: bgScale }}>
        <motion.img
          src={asset('img/scene/summit-path.webp?v=20261015')}
          alt=""
          initial={{ scale: 1.22, filter: 'blur(14px) brightness(0.4)' }}
          animate={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
          transition={{ duration: 2.6, ease }}
        />
      </motion.div>
      <div className="hero__rays" aria-hidden="true" />
      <div className="hero__shade" aria-hidden="true" />
      <Embers density={1.1} />

      <motion.div className="hero__content" style={{ y: fgY, opacity: fade }}>
        <motion.div
          className="hero__emblem"
          initial={{ opacity: 0, y: 80, scale: 0.6, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, delay: 0.5, ease }}
        >
          <span className="hero__glow" aria-hidden="true" />
          <span className="hero__flash" aria-hidden="true" />
          <img
            className="hero__chest"
            src={asset('app-icon.png?v=20261015')}
            alt="Stepforge's wind-chest logo with its glowing paired-footsteps emblem"
            width="512"
            height="512"
          />
        </motion.div>

        <motion.p
          className="hero__kicker"
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={{ opacity: 1, letterSpacing: '0.34em' }}
          transition={{ duration: 1.8, delay: 1.1, ease }}
        >
          A walking RPG for iPhone
        </motion.p>

        <h1 className="hero__word" aria-label="Stepforge">
          {WORD.map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ opacity: 0, y: '60%', rotateX: -80, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: '0%', rotateX: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 1.2 + i * 0.06, ease }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.9, ease }}
        >
          Every step forges a legend.
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.1, ease }}
        >
          <AppStoreButton size="lg" />
          <button className="btn btn--ghost" onClick={() => scrollToId('forge')}>
            <Icon name="hammer" size={20} />
            Try the forge
          </button>
        </motion.div>
      </motion.div>

      <motion.button className="hero__scroll" onClick={() => scrollToId('game')} style={{ opacity: fade }}>
        <span className="hero__feet" aria-hidden="true">
          <Icon name="footprints" size={22} />
        </span>
        Begin the journey
      </motion.button>
    </section>
  );
}
