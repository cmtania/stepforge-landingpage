import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Embers from './Embers.jsx';
import { Eyebrow, Reveal, Title } from './Reveal.jsx';
import { MOVES, asset } from '../data/site.js';

const ASH = ['#ff9a3c', '#ff5a1f', '#ffd28a'];

export default function Duel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section className="duel" ref={ref} aria-label="Duels">
      <motion.div className="duel__bg" style={{ y: bgY }} aria-hidden="true">
        <img src={asset('img/scene/varkath-hall.webp')} alt="" loading="lazy" />
      </motion.div>
      <div className="duel__shade" aria-hidden="true" />
      <Embers colors={ASH} density={0.9} />

      <div className="wrap duel__inner">
        <Eyebrow>Duels</Eyebrow>
        <Title as="h2" className="duel__title">
          Read the guardian. Choose your move.
        </Title>
        <Reveal as="p" className="body" delay={0.1}>
          Battles are short and cinematic. Each turn the guardian shows what it will do next — no reaction timers, no
          grinding. Your weapon’s rarity never gates the win; reading the moment does. Lose, and you retreat safely to
          try again for free.
        </Reveal>
        <ul className="moves">
          {MOVES.map((m, i) => (
            <Reveal as="li" key={m.id} className="moves__item" delay={0.15 + i * 0.12}>
              <img src={asset(m.icon)} alt="" width="96" height="96" loading="lazy" />
              <h3>{m.name}</h3>
              <p>{m.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
