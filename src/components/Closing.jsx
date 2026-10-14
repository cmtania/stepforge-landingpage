import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Embers from './Embers.jsx';
import AppStoreButton from './AppStoreButton.jsx';
import { Eyebrow, Reveal, Title } from './Reveal.jsx';
import { NAV, PRO_PERKS, SUPPORT_EMAIL, asset } from '../data/site.js';
import { scrollToId } from '../lib/scroll.js';

const STARS = ['#cfe3ff', '#ffe6b0', '#9fd1ff'];

export function Pro() {
  return (
    <section className="pro" id="pro" aria-label="Stepforge Pro">
      <div className="pro__bg" aria-hidden="true">
        <img src={asset('img/scene/observatory.webp')} alt="" loading="lazy" />
      </div>
      <div className="pro__shade" aria-hidden="true" />
      <Embers colors={STARS} density={0.5} />
      <div className="wrap">
        <div className="pro__head">
          <Eyebrow>Stepforge Pro</Eyebrow>
          <Title as="h2">Go further down the road.</Title>
          <Reveal as="p" className="body" delay={0.1}>
            The free game is the whole loop: a daily chest, the complete Armory and Chapter I. Pro adds more chests,
            more story and your progress at a glance.
          </Reveal>
        </div>
        <ul className="perks">
          {PRO_PERKS.map((p, i) => (
            <Reveal as="li" className="perks__item" key={p.title} delay={0.1 + i * 0.12}>
              <img src={asset(p.icon)} alt="" width="120" height="120" loading="lazy" />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal as="p" className="pro__note" delay={0.2}>
          Monthly or Lifetime — choose inside the app. Collection backup to iCloud stays free for everyone.
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCall() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  return (
    <section className="final" ref={ref} aria-label="Download Stepforge">
      <motion.div className="final__bg" style={{ scale }} aria-hidden="true">
        <img src={asset('img/scene/footstep-portal.webp')} alt="" loading="lazy" />
      </motion.div>
      <div className="final__shade" aria-hidden="true" />
      <Embers density={0.8} />
      <div className="wrap final__inner">
        <Reveal>
          <img className="final__icon" src={asset('app-icon.png')} alt="" width="112" height="112" loading="lazy" />
        </Reveal>
        <Title as="h2" className="final__title">
          Take your first step.
        </Title>
        <Reveal as="p" className="body" delay={0.15}>
          The forge is cold. The roads are fading. Aethra is waiting for its Wayfarer.
        </Reveal>
        <Reveal delay={0.25}>
          <AppStoreButton size="lg" />
        </Reveal>
        <Reveal as="p" className="final__fine" delay={0.3}>
          Free to play on iPhone · Reads your steps from Apple Health and never writes to it
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <img src={asset('app-icon.png')} alt="" width="48" height="48" loading="lazy" />
          <div>
            <strong>Stepforge</strong>
            <span>Every step forges a legend.</span>
          </div>
        </div>
        <nav aria-label="Footer">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(n.id);
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <AppStoreButton size="sm" />
      </div>
      <div className="wrap footer__legal">
        <p>© {new Date().getFullYear()} Stepforge. All rights reserved.</p>
        <nav className="footer__policies" aria-label="Support and policies">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/support">Support / FAQ</a>
          <a href={`mailto:${SUPPORT_EMAIL}`}>Contact Support</a>
        </nav>
        <p>
          Apple, the Apple logo, iPhone, Apple Health and App Store are trademarks of Apple Inc., registered in the U.S.
          and other countries. Display type: MedievalSharp, SIL Open Font License.
        </p>
      </div>
    </footer>
  );
}
