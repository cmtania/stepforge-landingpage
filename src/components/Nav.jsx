import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Icon from './Icon.jsx';
import AppStoreButton from './AppStoreButton.jsx';
import { NAV, asset } from '../data/site.js';
import { useSound } from '../lib/sound.jsx';
import { lockScroll, scrollToId } from '../lib/scroll.js';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { on, toggle } = useSound();

  useEffect(() => {
    const onScroll = () => setSolid(scrollY > 40);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    lockScroll(open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    lockScroll(false);
    scrollToId(id);
  };

  return (
    <header className={`nav ${solid ? 'nav--solid' : ''}`}>
      <a className="nav__brand" href="#top" onClick={go('top')}>
        <img src={asset('app-icon.png?v=20261015')} alt="" width="36" height="36" />
        <span>Stepforge</span>
      </a>

      <nav className="nav__links" aria-label="Sections">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className={active === n.id ? 'is-active' : ''}>
            {n.label}
          </a>
        ))}
      </nav>

      <div className="nav__actions">
        <button
          className={`sound ${on ? 'sound--on' : ''}`}
          onClick={toggle}
          aria-pressed={on}
          aria-label={on ? 'Turn sound off' : 'Turn sound on'}
        >
          <span className="sound__bars" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="sound__label">{on ? 'Sound on' : 'Sound off'}</span>
        </button>
        <AppStoreButton size="sm" className="nav__store" />
        <button className="nav__menu" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
          <Icon name="menu" size={26} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            data-lenis-prevent
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <button className="menu__close" onClick={() => setOpen(false)} aria-label="Close menu">
              <Icon name="x" size={28} />
            </button>
            <nav>
              {NAV.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6 }}
                >
                  <small>0{i + 1}</small>
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <AppStoreButton />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
