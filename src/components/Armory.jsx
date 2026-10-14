import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Icon from './Icon.jsx';
import WeaponCard from './WeaponCard.jsx';
import { Eyebrow, Reveal, Title, ease } from './Reveal.jsx';
import { ELEMENTS, LOOT, asset, elementOf } from '../data/site.js';
import { lockScroll } from '../lib/scroll.js';

// One Common weapon per element is shown; everything else stays a surprise for the forge.
const SHOWN = ELEMENTS.map((e) => LOOT.find((w) => w.element === e.id && w.rarity === 'Common'));
const HIDDEN = LOOT.length - SHOWN.length;

function Detail({ weapon, onClose }) {
  const close = useRef(null);
  useEffect(() => {
    close.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', onKey);
    lockScroll(true);
    return () => {
      removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [onClose]);
  const el = elementOf(weapon.element);
  return (
    <motion.div
      className="detail"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={weapon.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ '--ra': el.color, '--el': el.color }}
    >
      <motion.div
        className="detail__panel"
        initial={{ y: 60, scale: 0.94, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 30, scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.6, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="detail__close" onClick={onClose} ref={close} aria-label="Close">
          <Icon name="x" size={22} />
        </button>
        <WeaponCard weapon={weapon} eager hideRarity />
        <div className="detail__copy">
          <p className="detail__kicker">
            <img src={asset(el.icon)} alt="" width="28" height="28" />
            {weapon.element} · {weapon.type}
          </p>
          <h3>{weapon.name}</h3>
          <div className="detail__power">
            <small>Power</small>
            <strong>{weapon.power}</strong>
            <p>{weapon.powerText}</p>
          </div>
          <p className="detail__atk">
            ATK <b>{weapon.attack.toLocaleString()}</b>
            <span>Refine copies up to +5, each adding 10% attack.</span>
          </p>
          {weapon.origin && (
            <blockquote className="detail__chronicle">
              <small>From the chronicle</small>
              {weapon.origin}
            </blockquote>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Armory() {
  const [open, setOpen] = useState(null);

  return (
    <section className="armory" id="armory">
      <div className="wrap">
        <div className="armory__head">
          <Eyebrow>The Armory</Eyebrow>
          <Title>61 weapons. Five elements. One forge.</Title>
          <Reveal as="p" className="body" delay={0.1}>
            Every weapon is a hand-painted card with its own power and its own chronicle — a fragment of Aethra’s
            history. Here is one from each element. The rest you’ll have to forge yourself.
          </Reveal>
        </div>

        <ul className="grid grid--five">
          {SHOWN.map((w, i) => (
            <Reveal as="li" key={w.id} delay={i * 0.08}>
              <WeaponCard weapon={w} hideRarity onClick={() => setOpen(w)} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="sealed sealed--wide" delay={0.2}>
          <span className="sealed__icon">
            <Icon name="lock-simple-fill" size={26} />
          </span>
          <span>
            <strong>{HIDDEN} more weapons</strong>
            <span>wait in the forge. Walk further and see what the chest gives you.</span>
          </span>
        </Reveal>
      </div>

      <AnimatePresence>{open && <Detail weapon={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
