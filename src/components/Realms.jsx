import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Icon from './Icon.jsx';
import { Eyebrow, Title, ease } from './Reveal.jsx';
import { CHAPTERS, SEALED, asset, elementOf } from '../data/site.js';

export default function Realms() {
  const [index, setIndex] = useState(0);
  const open = CHAPTERS.filter((c) => !c.locked);
  const ch = open[index];
  const color = elementOf(ch.element).color;

  return (
    <section className="realms" id="realms" style={{ '--el': color }}>
      <AnimatePresence initial={false}>
        <motion.div
          key={ch.id}
          className="realms__bg"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease }}
          aria-hidden="true"
        >
          <img src={asset(ch.scene)} alt="" loading="lazy" />
        </motion.div>
      </AnimatePresence>
      <div className="realms__shade" aria-hidden="true" />

      <div className="wrap realms__inner">
        <div className="realms__head">
          <Eyebrow>The Campaign</Eyebrow>
          <Title>Walk the broken realms</Title>
        </div>

        <div className="realms__body">
          <AnimatePresence mode="wait">
            <motion.div
              key={ch.id}
              className="realms__copy"
              initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="realms__numeral">{ch.numeral}</p>
              <h3 className="realms__title">{ch.title}</h3>
              <p className="realms__realm">{ch.realm}</p>
              <p className="body">{ch.text}</p>
              <dl className="realms__facts">
                <div>
                  <dt>Guardian</dt>
                  <dd>{ch.guardian}</dd>
                </div>
                <div>
                  <dt>Seal</dt>
                  <dd>{ch.gemName}</dd>
                </div>
                <div>
                  <dt>Access</dt>
                  <dd>{ch.access}</dd>
                </div>
              </dl>
            </motion.div>
          </AnimatePresence>

          <div className="realms__gem" aria-hidden="true">
            <span className="realms__orbit" />
            <span className="realms__orbit realms__orbit--2" />
            <span className="realms__float">
              <AnimatePresence mode="wait">
                <motion.img
                  key={ch.gem}
                  src={asset(ch.gem)}
                  alt=""
                  initial={{ opacity: 0, scale: 0.4, rotate: -40, filter: 'blur(16px)' }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.4, filter: 'blur(16px)' }}
                  transition={{ duration: 0.9, ease }}
                />
              </AnimatePresence>
            </span>
          </div>
        </div>

        <div className="chapters" role="tablist" aria-label="Chapters">
          {open.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={i === index}
              className={`chapters__tab ${i === index ? 'is-active' : ''}`}
              style={{ '--el': elementOf(c.element).color }}
              onClick={() => setIndex(i)}
            >
              <img src={asset(elementOf(c.element).icon)} alt="" width="44" height="44" loading="lazy" />
              <span>
                <small>{c.numeral}</small>
                {c.realm}
              </span>
            </button>
          ))}
          {CHAPTERS.filter((c) => c.locked).map((c) => (
            <div key={c.id} className="chapters__tab is-sealed">
              <img src={asset(elementOf(c.element).icon)} alt="" width="44" height="44" loading="lazy" />
              <span>
                <small>
                  <Icon name="lock-simple-fill" size={12} /> {c.numeral}
                </small>
                Locked
              </span>
            </div>
          ))}
          {SEALED.map((e) => (
            <div key={e} className="chapters__tab is-sealed">
              <img src={asset(elementOf(e).icon)} alt="" width="44" height="44" loading="lazy" />
              <span>
                <small>
                  <Icon name="lock-simple-fill" size={12} /> Sealed
                </small>
                {e} realm
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
