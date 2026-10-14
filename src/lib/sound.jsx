import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { asset } from '../data/site.js';

// Sound is off until the visitor turns it on. Music and effects share the
// switch; effects are short app recordings (forge strikes, weapon reveal).
const SoundContext = createContext({ on: false, toggle() {}, play() {} });
export const useSound = () => useContext(SoundContext);

const EFFECTS = {
  strike: ['audio/forge-strike-01.wav', 'audio/forge-strike-02.wav'],
  final: ['audio/forge-final-01.wav'],
  reveal: ['audio/weapon-reveal.wav'],
};

export function SoundProvider({ children }) {
  const [on, setOn] = useState(false);
  const music = useRef(null);
  const fade = useRef(0);

  const toggle = useCallback(() => setOn((v) => !v), []);

  useEffect(() => {
    if (!music.current) {
      const a = new Audio(asset('audio/epic-adventure.mp3'));
      a.loop = true;
      a.volume = 0;
      a.preload = 'none';
      music.current = a;
    }
    const a = music.current;
    cancelAnimationFrame(fade.current);
    const target = on ? 0.32 : 0;
    if (on) a.play().catch(() => setOn(false));
    const step = () => {
      const d = target - a.volume;
      if (Math.abs(d) < 0.01) {
        a.volume = target;
        if (!on) a.pause();
        return;
      }
      a.volume = Math.min(1, Math.max(0, a.volume + Math.sign(d) * 0.01));
      fade.current = requestAnimationFrame(step);
    };
    step();
  }, [on]);

  const play = useCallback(
    (name, volume = 0.7) => {
      if (!on) return;
      const list = EFFECTS[name];
      const a = new Audio(asset(list[Math.floor(Math.random() * list.length)]));
      a.volume = volume;
      a.play().catch(() => {});
    },
    [on],
  );

  return <SoundContext.Provider value={{ on, toggle, play }}>{children}</SoundContext.Provider>;
}
