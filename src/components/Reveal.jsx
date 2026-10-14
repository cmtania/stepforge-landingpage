import { Fragment } from 'react';
import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1];

// Fades and lifts its children into view once, with an optional blur.
export function Reveal({ as = 'div', delay = 0, y = 28, blur = 8, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Section label: small caps between two ornamental rules.
export function Eyebrow({ children, className = '' }) {
  return (
    <Reveal as="p" className={`eyebrow ${className}`} blur={0} y={12}>
      <span className="eyebrow__rule" aria-hidden="true" />
      {children}
      <span className="eyebrow__rule" aria-hidden="true" />
    </Reveal>
  );
}

// Splits a heading into words that rise in one after another.
export function Title({ as = 'h2', children, className = '', delay = 0 }) {
  const Tag = motion[as];
  const words = String(children).split(' ');
  return (
    <Tag
      className={`title ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      aria-label={children}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="title__mask" aria-hidden="true">
            <motion.span
              className="title__word"
              variants={{ hidden: { y: '110%', rotate: 4 }, shown: { y: '0%', rotate: 0 } }}
              transition={{ duration: 1, ease }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  );
}

export { ease };
