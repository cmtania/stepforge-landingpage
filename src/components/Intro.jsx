import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useMotionValueEvent, useScroll } from 'motion/react';
import Icon from './Icon.jsx';
import { Eyebrow, Reveal, Title } from './Reveal.jsx';
import { asset } from '../data/site.js';

const WORDS = ['Walk', 'Forge', 'Collect', 'Duel', 'Restore Aethra'];

export function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="marquee-clip" aria-hidden="true">
      <div className="marquee">
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <div className="marquee__group" key={k}>
              {row.map((w, i) => (
                <span key={i}>
                  {w}
                  <i className="marquee__gem" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const LOOP = [
  {
    icon: 'person-simple-walk',
    n: 'I',
    title: 'Walk',
    text: 'Stepforge reads your steps from Apple Health. No runs to start and no buttons to press — just live your day.',
  },
  {
    icon: 'treasure-chest',
    n: 'II',
    title: 'Fill the chest',
    text: 'Your daily chest grows richer as you move. Pass 2,501, 5,001, 7,501 and 10,000 steps to unlock rarer weapons.',
  },
  {
    icon: 'hammer',
    n: 'III',
    title: 'Forge',
    text: 'Three taps at the forge. The lid cracks, light spills out, and a new weapon is hammered into your Armory.',
  },
];

const STATS = [
  { value: 61, label: 'Weapons to forge' },
  { value: 5, label: 'Elements' },
  { value: 8, label: 'Story relics' },
  { value: 10, label: 'Disciples & guardians' },
];

function Count({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
}

// A trail of footprints that appears one print at a time as you scroll.
function Footsteps({ target }) {
  const trail = useRef(null);
  const { scrollYProgress } = useScroll({ target, offset: ['start 80%', 'end 40%'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => trail.current?.style.setProperty('--p', v.toFixed(3)));
  const prints = Array.from({ length: 16 }, (_, i) => {
    const t = i / 15;
    const side = i % 2 ? 1 : -1;
    return { i, x: 50 + Math.sin(t * Math.PI * 2.2) * 24 + side * 14, y: t * 100, r: Math.cos(t * Math.PI * 2.2) * 24 };
  });
  return (
    <div className="steps-trail" ref={trail} aria-hidden="true">
      {prints.map((p) => (
        <span
          key={p.i}
          className={`steps-trail__print ${p.i % 2 ? 'is-right' : ''}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, '--r': `${p.r}deg`, '--i': p.i / 16 }}
        />
      ))}
    </div>
  );
}

export default function Intro() {
  const ref = useRef(null);
  return (
    <section className="intro" id="game" ref={ref}>
      <div className="intro__art" aria-hidden="true">
        <img src={asset('img/scene/footstep-portal.webp')} alt="" loading="lazy" />
      </div>
      <Footsteps target={ref} />
      <div className="wrap intro__grid">
        <div className="intro__copy">
          <Eyebrow>The Game</Eyebrow>
          <Title>Your daily walk is the adventure.</Title>
          <Reveal as="p" className="lede" delay={0.15}>
            Stepforge turns the steps you already take into a fantasy RPG. Every day a treasure chest waits at the
            forge. Walk, and it grows richer. Open it, and a hand-painted weapon joins your Armory — each with its own
            power and its own chapter of history.
          </Reveal>
          <Reveal as="p" className="body" delay={0.25}>
            Then follow the road. Your steps also carry you through Aethra, a world that has forgotten how to move —
            where disciples wait at every milestone and guardians hold the realms shut.
          </Reveal>
        </div>

        <ol className="loop">
          {LOOP.map((s, i) => (
            <Reveal as="li" className="loop__item" key={s.n} delay={0.1 + i * 0.12}>
              <span className="loop__n">{s.n}</span>
              <span className="loop__icon">
                <Icon name={s.icon} size={26} />
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="wrap">
        <dl className="stats">
          {STATS.map((s, i) => (
            <Reveal className="stats__item" key={s.label} delay={i * 0.08}>
              <dt>{s.label}</dt>
              <dd>
                <Count to={s.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
