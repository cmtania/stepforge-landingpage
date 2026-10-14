import Lenis from 'lenis';

let lenis = null;

// Smooth scrolling, skipped entirely for visitors who prefer reduced motion.
export function startSmoothScroll() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
  let raf = requestAnimationFrame(function loop(t) {
    lenis.raf(t);
    raf = requestAnimationFrame(loop);
  });
  return () => {
    cancelAnimationFrame(raf);
    lenis.destroy();
    lenis = null;
  };
}

export function scrollToId(id) {
  const target = id === 'top' ? 0 : document.getElementById(id);
  if (target === null) return;
  if (lenis) lenis.scrollTo(target, { offset: id === 'top' ? 0 : -70, duration: 1.6 });
  else scrollTo({ top: target === 0 ? 0 : target.getBoundingClientRect().top + scrollY - 70 });
}

// Freezes the page behind the menu and dialogs.
export function lockScroll(locked) {
  document.documentElement.classList.toggle('menu-open', locked);
  if (lenis) locked ? lenis.stop() : lenis.start();
}
