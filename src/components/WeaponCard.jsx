import { useRef } from 'react';
import { asset, elementOf, rarityOf } from '../data/site.js';

// A credit-card-shaped weapon card laid out like the app's: number top left,
// element emblem top right, name over a rule and a rarity pill. Tilts toward
// the pointer with a foil glare. hideRarity drops the pill and tints the
// frame with the element instead, for weapons whose rarity is a surprise.
export default function WeaponCard({
  weapon,
  tilt = true,
  eager = false,
  hideRarity = false,
  onClick,
  className = '',
}) {
  const ref = useRef(null);
  const el = elementOf(weapon.element);
  const ra = hideRarity ? el : rarityOf(weapon.rarity);
  const kind = hideRarity ? `${weapon.element} ${weapon.type}` : `${weapon.rarity} ${weapon.element} ${weapon.type}`;

  const move = (e) => {
    if (!tilt || e.pointerType === 'touch') return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty('--rx', `${(0.5 - y) * 14}deg`);
    ref.current.style.setProperty('--ry', `${(x - 0.5) * 18}deg`);
    ref.current.style.setProperty('--gx', `${x * 100}%`);
    ref.current.style.setProperty('--gy', `${y * 100}%`);
    ref.current.style.setProperty('--glare', '1');
  };
  const leave = () => {
    ref.current.style.setProperty('--rx', '0deg');
    ref.current.style.setProperty('--ry', '0deg');
    ref.current.style.setProperty('--glare', '0');
  };

  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      ref={ref}
      className={`wcard ${hideRarity ? '' : `wcard--${weapon.rarity.toLowerCase()}`} ${className}`}
      style={{ '--el': el.color, '--ra': ra.color }}
      onPointerMove={move}
      onPointerLeave={leave}
      onClick={onClick}
      aria-label={onClick ? `${weapon.name}, ${kind}. View details` : undefined}
    >
      <span className="wcard__inner">
        <img
          className="wcard__art"
          src={asset(`img/card/${weapon.id}.webp`)}
          alt={onClick ? '' : `${weapon.name}, a ${kind}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          width="560"
          height="840"
        />
        <span className="wcard__shade" aria-hidden="true" />
        <span className="wcard__top">
          <span className="wcard__num">{String(weapon.number).padStart(2, '0')}</span>
          <img className="wcard__el" src={asset(el.icon)} alt="" width="40" height="40" />
        </span>
        <span className="wcard__foot">
          <span className="wcard__name">{weapon.name}</span>
          <span className="wcard__rule" aria-hidden="true" />
          <span className="wcard__meta">
            {!hideRarity && <span className="wcard__pill">{weapon.rarity}</span>}
            <span className="wcard__atk">ATK {weapon.attack.toLocaleString()}</span>
          </span>
        </span>
        <span className="wcard__glare" aria-hidden="true" />
        <span className="wcard__frame" aria-hidden="true" />
      </span>
    </Tag>
  );
}
