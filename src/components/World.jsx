import { useRef, useSyncExternalStore } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { asset } from '../data/site.js';

// The game's opening passage, revealed line by line while the section is
// pinned (docs/STORY_CAMPAIGN.md).
const LINES = [
  { text: 'The roads of Aethra are disappearing.', big: true },
  { text: 'You awaken beside a dying forge. Inside lies a worn hammer — and a message:' },
  {
    text: '“The weapons remember what we have forgotten. Carry them. Walk the broken roads. Bring the world back.”',
    quote: true,
  },
  { text: 'Beyond the doorway, a path flickers into existence with your first step.' },
];

function Line({ line, i, progress, still }) {
  const start = 0.08 + i * 0.16;
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const y = useTransform(progress, [start, start + 0.12], [40, 0]);
  const blur = useTransform(progress, [start, start + 0.1], ['blur(12px)', 'blur(0px)']);
  return (
    <motion.p
      className={`world__line ${line.big ? 'is-big' : ''} ${line.quote ? 'is-quote' : ''}`}
      style={still ? undefined : { opacity, y, filter: blur }}
    >
      {line.text}
    </motion.p>
  );
}

// Short landscape phones cannot fit the pinned passage, so it renders statically.
const SHORT = '(max-height: 560px) and (orientation: landscape)';
const subscribe = (cb) => {
  const mq = matchMedia(SHORT);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

export default function World() {
  const ref = useRef(null);
  const short = useSyncExternalStore(subscribe, () => matchMedia(SHORT).matches);
  const still = useReducedMotion() || short;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const bright = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    ['brightness(0.35) saturate(0.7)', 'brightness(0.6) saturate(1)', 'brightness(0.8) saturate(1.1)'],
  );
  const loreOpacity = useTransform(scrollYProgress, [0.74, 0.86], [0, 1]);
  const loreY = useTransform(scrollYProgress, [0.74, 0.88], [40, 0]);

  return (
    <section className="world" aria-labelledby="world-title">
      <div className="world__track" ref={ref}>
        <div className="world__pin">
          <motion.div className="world__bg" style={still ? { filter: 'brightness(0.6)' } : { scale, filter: bright }}>
            <img
              src={asset('img/scene/realms-path.webp')}
              alt="A stone road splitting toward a fire fortress and a city of waterfalls"
              loading="lazy"
            />
          </motion.div>
          <div className="world__shade" aria-hidden="true" />
          <div className="wrap world__content">
            <h2 id="world-title" className="eyebrow">
              <span className="eyebrow__rule" aria-hidden="true" />
              The world of Aethra
              <span className="eyebrow__rule" aria-hidden="true" />
            </h2>
            {LINES.map((l, i) => (
              <Line key={i} line={l} i={i} progress={scrollYProgress} still={still} />
            ))}
            <motion.p className="world__lore" style={still ? undefined : { opacity: loreOpacity, y: loreY }}>
              Veyr, the Still King, has stolen the motion that binds the realms together. Rivers hang in the air and
              storms stand frozen over empty cities. Five guardians, bound to his will, keep the roads sealed. You are
              the last Wayfarer — and every real step you take brings a road back to life.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
