import { useEffect, useRef } from 'react';

// Rising sparks drawn on a canvas. Pauses off-screen and under Reduce Motion.
const GOLD = ['#ffcf7a', '#ff8a2a', '#ffe9b8'];

// Pass palettes as module-level constants so the effect does not restart.
export default function Embers({ colors = GOLD, density = 1, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = false;
    let parts = [];

    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: (Math.random() ** 2 * 2.2 + 0.5) * dpr,
      vy: (Math.random() * 0.6 + 0.25) * dpr,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.006,
      life: Math.random() * 0.6 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
      const count = Math.round(((canvas.offsetWidth * canvas.offsetHeight) / 14000) * density);
      parts = Array.from({ length: Math.min(count, 140) }, () => spawn(true));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of parts) {
        p.y -= p.vy;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.35 * dpr;
        const fadeTop = Math.min(1, p.y / (h * 0.55));
        const a = Math.max(0, fadeTop * p.life * (0.65 + Math.sin(p.sway * 3) * 0.35));
        ctx.globalAlpha = a;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12 * dpr;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.y < -10) Object.assign(p, spawn(false));
      }
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    const ro = new ResizeObserver(resize);
    resize();
    ro.observe(canvas);
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [colors, density]);

  return <canvas ref={ref} className={`embers ${className}`} aria-hidden="true" />;
}
