import { useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'motion/react';
import Embers from './Embers.jsx';
import Icon from './Icon.jsx';
import AppStoreButton from './AppStoreButton.jsx';
import { Eyebrow, Reveal, Title, ease } from './Reveal.jsx';
import { LADDER, RARITIES, asset, rarityOf, tierFor, weaponById } from '../data/site.js';
import { useSound } from '../lib/sound.jsx';

// The demo always forges the Stepstorm Sovereigns, the app's logo shoes, so the
// rest of the catalog stays a surprise.
const SHOES = weaponById('li13');
const CHEST = ['0-closed', '1-slight', '2-half', '4-full'];
const COOL = ['#bfe6ff', '#7aa8ff', '#e6f3ff'];
const CAPTIONS = ['Tap the chest to forge', 'The lid gives way…', 'Light spills out — once more', ''];

export default function ForgeDemo() {
  const [steps, setSteps] = useState(8200);
  const [stage, setStage] = useState(0);
  const [weapon, setWeapon] = useState(null);
  const [burst, setBurst] = useState(0);
  const shake = useAnimationControls();
  const { play } = useSound();

  const tier = tierFor(steps);
  const best = rarityOf(tier.best);
  const glow = weapon ? '#ffc94a' : best.color;

  const tap = () => {
    if (stage >= 3) return;
    const next = stage + 1;
    setBurst((b) => b + 1);
    shake.start({
      rotate: [0, -4, 4, -3, 2, 0],
      scale: [1, 1.06, 0.97, 1.02, 1],
      transition: { duration: 0.5 },
    });
    if (next === 3) {
      setWeapon(SHOES);
      play('final');
      setTimeout(() => play('reveal', 0.6), 350);
    } else {
      play('strike');
    }
    setStage(next);
  };

  const reset = () => {
    setStage(0);
    setWeapon(null);
  };

  const changeSteps = (v) => {
    setSteps(v);
    if (stage) reset();
  };

  return (
    <section className="forge" id="forge" style={{ '--glow': glow }}>
      <div className="forge__bg" aria-hidden="true">
        <img src={asset('img/scene/crystal-cave.webp')} alt="" loading="lazy" />
      </div>
      <div className="wrap forge__grid">
        <div className="forge__panel">
          <Eyebrow>Try the forge</Eyebrow>
          <Title>Walk further. Forge rarer.</Title>
          <Reveal as="p" className="body" delay={0.1}>
            Set today’s steps, then tap the chest three times. These are the real odds from the app — higher steps
            unlock rarer weapons, never a guaranteed one.
          </Reveal>

          <Reveal className="stepper" delay={0.2}>
            <label htmlFor="steps" className="stepper__label">
              <Icon name="footprints" size={18} /> Today’s steps
            </label>
            <output htmlFor="steps" className="stepper__value">
              {steps.toLocaleString()}
            </output>
            <input
              id="steps"
              type="range"
              min="0"
              max="12000"
              step="100"
              value={steps}
              onChange={(e) => changeSteps(Number(e.target.value))}
              style={{ '--fill': `${(steps / 12000) * 100}%` }}
            />
            <div className="stepper__ticks" aria-hidden="true">
              {LADDER.slice(1).map((t) => (
                <span key={t.from} style={{ left: `${(t.from / 12000) * 100}%` }}>
                  {t.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal as="ul" className="odds" delay={0.3} aria-label="Chance of each rarity at this step count">
            {RARITIES.map((r, i) => {
              const pct = tier.odds[i];
              return (
                <li key={r.id} className={pct ? '' : 'is-locked'} style={{ '--c': r.color }}>
                  <img src={asset(r.icon)} alt="" width="34" height="34" loading="lazy" />
                  <span className="odds__name">{r.id}</span>
                  <span className="odds__bar">
                    <motion.i animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease }} />
                  </span>
                  <span className="odds__pct">
                    {pct ? `${pct}%` : <Icon name="lock-simple-fill" size={14} label="Locked" />}
                  </span>
                </li>
              );
            })}
          </Reveal>
        </div>

        <div className="forge__stage">
          <Embers colors={COOL} density={0.6} />
          <div className="forge__rays" aria-hidden="true" />
          <div className="forge__halo" aria-hidden="true" />

          <AnimatePresence>
            {burst > 0 && (
              <motion.span
                key={burst}
                className="forge__ring"
                initial={{ scale: 0.2, opacity: 0.9 }}
                animate={{ scale: stage === 3 ? 3.4 : 1.6, opacity: 0 }}
                transition={{ duration: stage === 3 ? 1.2 : 0.7, ease: 'easeOut' }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          <motion.button
            className="forge__chest"
            onClick={tap}
            animate={shake}
            whileHover={stage < 3 ? { y: -6 } : undefined}
            disabled={stage >= 3}
            aria-label={stage < 3 ? `Tap the chest, ${3 - stage} taps left` : 'Chest opened'}
          >
            {CHEST.map((c, i) => (
              <img
                key={c}
                src={asset(`img/chest/${c}.webp`)}
                alt=""
                className={i === stage ? 'is-shown' : ''}
                width="720"
                height="720"
                loading="lazy"
              />
            ))}
          </motion.button>

          <div className={`forge__taps ${stage >= 3 ? 'is-hidden' : ''}`} aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className={i < stage ? 'is-done' : ''} />
            ))}
          </div>
          <p className={`forge__caption ${stage >= 3 ? 'is-hidden' : ''}`} aria-live="polite">
            {stage < 3 ? CAPTIONS[stage] : `You forged the ${weapon?.name}`}
          </p>

          <AnimatePresence>
            {weapon && (
              <motion.div
                className="forge__reveal"
                initial={{ opacity: 0, y: 140, scale: 0.3, rotateY: 200 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, y: -40, scale: 0.8, filter: 'blur(10px)' }}
                transition={{ duration: 1.3, delay: 0.25, ease }}
              >
                <div className="forge__shoes">
                  <img
                    className="forge__shoes-glow"
                    src={asset('img/brand/sovereigns.webp')}
                    alt=""
                    aria-hidden="true"
                  />
                  <img
                    className="forge__shoes-art"
                    src={asset('img/brand/sovereigns.webp')}
                    alt="Stepstorm Sovereigns, red and gold lightning shoes"
                    width="720"
                    height="720"
                  />
                </div>
                <h3 className="forge__name">{weapon.name}</h3>
                <motion.div
                  className="forge__result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <p>
                    <strong>{weapon.power}</strong> — {weapon.powerText}
                  </p>
                  <AppStoreButton />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
