import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'contact', label: 'Contact' },
];

const pad = (n: number, len = 2) => String(n).padStart(len, '0');

const HudOverlay: React.FC = () => {
  const [active, setActive] = useState('home');
  const [scrollPct, setScrollPct] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [now, setNow] = useState(() => new Date());

  // Scroll progress (rAF-throttled)
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(Math.round(window.scrollY));
      setScrollPct(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Active section: whichever section crosses the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Live clock
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const activeIndex = Math.max(0, SECTIONS.findIndex((s) => s.id === active));
  const time = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false });

  return (
    <div className="hidden lg:block fixed inset-0 z-40 pointer-events-none font-mono" aria-hidden>
      {/* Left: section tracker */}
      <nav className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-auto">
        {SECTIONS.map((s, i) => {
          const isActive = s.id === active;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="hud-tick group flex items-center gap-2.5"
              tabIndex={-1}
            >
              <span
                className={`block h-px transition-all duration-300 ${
                  isActive ? 'w-6 bg-amber-400 shadow-[0_0_8px_#FF5E1A]' : 'w-3 bg-zinc-700 group-hover:w-5 group-hover:bg-zinc-500'
                }`}
              />
              <span
                className={`text-[10px] tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-amber-400 opacity-100'
                    : 'text-zinc-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {pad(i + 1)} {s.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Right: scroll gauge */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-amber-400 tabular-nums">{pad(scrollPct, 3)}</span>
        <div className="relative w-px h-40 bg-zinc-800">
          <div
            className="absolute top-0 left-0 w-full bg-amber-400 shadow-[0_0_8px_#FF5E1A]"
            style={{ height: `${scrollPct}%` }}
          />
          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((t) => (
            <span key={t} className="absolute -left-1 w-2 h-px bg-zinc-700" style={{ top: `${t}%` }} />
          ))}
        </div>
        <span className="text-[10px] text-zinc-600 [writing-mode:vertical-rl] tracking-widest">SCROLL</span>
      </div>

      {/* Bottom-left: status readout */}
      <div className="absolute left-5 bottom-5 text-[10px] leading-4 text-zinc-600">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 led-pulse" />
          <span className="text-zinc-500">SYS ONLINE</span>
        </div>
        <div>
          SEC <span className="text-amber-400/80">{pad(activeIndex + 1)}/{pad(SECTIONS.length)}</span>
          {' · '}Y <span className="tabular-nums">{pad(scrollY, 5)}</span>
        </div>
      </div>

      {/* Bottom-right: clock */}
      <div className="absolute right-5 bottom-5 text-right text-[10px] leading-4 text-zinc-600">
        <div className="text-zinc-400 tabular-nums text-xs">{time}</div>
        <div>IST · MUMBAI 19.07°N 72.87°E</div>
      </div>
    </div>
  );
};

export default HudOverlay;
