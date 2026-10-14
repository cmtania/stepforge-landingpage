import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Icon from './Icon.jsx';
import { Eyebrow, Reveal, Title, ease } from './Reveal.jsx';
import { DISCIPLES, asset, elementOf, rarityOf } from '../data/site.js';

export default function Disciples() {
  const [realm, setRealm] = useState('fire');
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const group = DISCIPLES[realm];
  const who = group.cast[index];
  // Only the first disciple of each realm is shown; the rest stay locked
  // until the player meets them in the app.
  const locked = index > 0;
  const color = elementOf(group.element).color;

  const pick = (i) => {
    setDir(i > index ? 1 : -1);
    setIndex(i);
  };
  const step = (d) => pick((index + d + group.cast.length) % group.cast.length);
  const switchRealm = (r) => {
    if (r === realm) return;
    setRealm(r);
    setDir(1);
    setIndex(0);
  };

  return (
    <section className="disciples" id="disciples" style={{ '--el': color }}>
      <AnimatePresence initial={false}>
        <motion.div
          key={realm}
          className="disciples__bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          aria-hidden="true"
        >
          <img src={asset(group.scene)} alt="" loading="lazy" />
        </motion.div>
      </AnimatePresence>
      <div className="disciples__shade" aria-hidden="true" />

      <div className="wrap stage">
        <div className="stage__side">
          <div className="disciples__head">
            <Eyebrow>The Disciples</Eyebrow>
            <Title>Every road has a keeper</Title>
            <Reveal as="p" className="body" delay={0.1}>
              Each disciple awakens when you reach their mark in a single day. Beat them in a short duel and recover the
              weapon they carried. At 10,000 steps, the guardian is waiting.
            </Reveal>
          </div>
          <div className="seg" role="tablist" aria-label="Realm">
            {Object.entries(DISCIPLES).map(([k, g]) =>
              g.locked ? (
                <button key={k} role="tab" aria-selected="false" aria-disabled="true" disabled className="is-locked">
                  <Icon name="lock-simple-fill" size={16} />
                  Chapter II
                </button>
              ) : (
                <button
                  key={k}
                  role="tab"
                  aria-selected={realm === k}
                  className={realm === k ? 'is-active' : ''}
                  style={{ '--el': elementOf(g.element).color }}
                  onClick={() => switchRealm(k)}
                >
                  <img src={asset(elementOf(g.element).icon)} alt="" width="24" height="24" />
                  {g.label}
                </button>
              ),
            )}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={who.id}
              className="stage__info"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease }}
            >
              <p className="stage__mark">
                <Icon name={locked ? 'lock-simple-fill' : 'footprints'} size={16} />
                {who.guardian ? 'Guardian' : `Disciple ${index + 1} of 4`} · {who.steps.toLocaleString()} steps
              </p>
              {locked ? (
                <>
                  <h3 className="stage__name">Locked</h3>
                  <p className="stage__title">Walk {who.steps.toLocaleString()} steps in a single day</p>
                  <p className="body">
                    {who.guardian
                      ? 'The guardian of this realm only shows itself to Wayfarers who reach the end of the road.'
                      : 'Their name, their story and the weapon they carry are waiting for you in the app.'}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="stage__name">{who.name}</h3>
                  <p className="stage__title">{who.title}</p>
                  <p className="body">{who.text}</p>
                </>
              )}

              {!locked && who.relic && (
                <div className="relic" style={{ '--ra': rarityOf(who.relic.rarity).color }}>
                  <img src={asset(`img/card/${who.relic.id}.webp`)} alt="" loading="lazy" width="560" height="840" />
                  <div>
                    <small>Recover · {who.relic.rarity} relic</small>
                    <strong>{who.relic.name}</strong>
                    <p>
                      <em>{who.relic.power}.</em> {who.relic.powerText}
                    </p>
                  </div>
                </div>
              )}
              {!locked && who.gem && (
                <div className="relic relic--gem">
                  <img src={asset(who.gem.image)} alt="" loading="lazy" />
                  <div>
                    <small>Restore the seal</small>
                    <strong>{who.gem.name}</strong>
                    <p>Free the guardian and the realm’s gem returns to you — and the road ahead opens.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="roster">
            <div className="roster__list" role="tablist" aria-label="Disciples">
              {group.cast.map((c, i) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={
                    i > 0
                      ? `Locked ${c.guardian ? 'guardian' : 'disciple'}, ${c.steps.toLocaleString()} steps`
                      : undefined
                  }
                  className={`roster__item ${i === index ? 'is-active' : ''} ${c.guardian ? 'is-guardian' : ''} ${i > 0 ? 'is-locked' : ''} ${c.framed ? 'is-framed' : ''}`}
                  onClick={() => pick(i)}
                >
                  <span className="roster__portrait">
                    <img src={asset(c.image)} alt="" loading="lazy" />
                    {i > 0 && (
                      <span className="roster__lock" aria-hidden="true">
                        <Icon name="lock-simple-fill" size={18} />
                      </span>
                    )}
                  </span>
                  <span className="roster__name">{i > 0 ? 'Locked' : c.name}</span>
                  <span className="roster__steps">{c.steps.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="stage__figure">
          <span className="stage__glow" aria-hidden="true" />
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            <motion.img
              key={who.id}
              src={asset(who.image)}
              alt={locked ? 'A locked disciple, shown in silhouette' : `${who.name}, ${who.title}`}
              draggable={false}
              className={`stage__char ${who.framed ? 'is-framed' : ''} ${locked ? 'is-locked' : ''}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={(e, info) => Math.abs(info.offset.x) > 60 && step(info.offset.x < 0 ? 1 : -1)}
              custom={dir}
              variants={{
                enter: (d) => ({ opacity: 0, x: d * 120, scale: 0.94, ...(locked ? {} : { filter: 'blur(12px)' }) }),
                center: { opacity: 1, x: 0, scale: 1, ...(locked ? {} : { filter: 'blur(0px)' }) },
                exit: (d) => ({ opacity: 0, x: d * -120, scale: 0.94, ...(locked ? {} : { filter: 'blur(12px)' }) }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease }}
            />
          </AnimatePresence>
          <AnimatePresence>
            {locked && (
              <motion.span
                key="lock"
                className="stage__lock"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.5, ease }}
                aria-hidden="true"
              >
                <Icon name="lock-simple-fill" size={34} />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="stage__floor" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
