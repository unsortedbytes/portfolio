import React, { useEffect, useState } from 'react';

const SESSION_KEY = 'boot-seen';

const BOOT_STEPS = [
  { text: 'AK-OS v2.6 // initializing kernel', status: 'OK' },
  { text: 'mounting /experience', status: 'OK' },
  { text: 'loading modules: rust · go · python · fastapi', status: 'OK' },
  { text: 'syncing p2p mesh nodes', status: 'OK' },
  { text: 'verifying zero-knowledge proof', status: 'VALID' },
  { text: 'establishing uplink', status: 'ONLINE' },
];

const STEP_MS = 260;
const EXIT_MS = 600;

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    /* storage unavailable — intro just shows again next load */
  }
}

const BootIntro: React.FC = () => {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !alreadySeen();
  });
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!show) return;
    markSeen();
    document.body.style.overflow = 'hidden';

    const timers: number[] = [];
    BOOT_STEPS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStep(i + 1), (i + 1) * STEP_MS));
    });
    const finishAt = (BOOT_STEPS.length + 1) * STEP_MS + 200;
    timers.push(window.setTimeout(() => setExiting(true), finishAt));
    timers.push(window.setTimeout(() => setShow(false), finishAt + EXIT_MS));

    const skip = () => {
      timers.forEach(clearTimeout);
      setStep(BOOT_STEPS.length);
      setExiting(true);
      timers.push(window.setTimeout(() => setShow(false), EXIT_MS));
    };
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('pointerdown', skip, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
      document.body.style.overflow = '';
    };
  }, [show]);

  if (!show) return null;

  const progress = Math.round((step / BOOT_STEPS.length) * 100);

  return (
    <div
      className={`boot-screen fixed inset-0 z-[9990] flex items-center justify-center bg-zinc-950 ${exiting ? 'boot-exit' : ''}`}
      aria-hidden
    >
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="boot-scan absolute inset-x-0 h-24 pointer-events-none" />

      {/* Corner brackets */}
      <span className="hud-corner top-6 left-6 border-t border-l" />
      <span className="hud-corner top-6 right-6 border-t border-r" />
      <span className="hud-corner bottom-6 left-6 border-b border-l" />
      <span className="hud-corner bottom-6 right-6 border-b border-r" />

      <div className="relative w-full max-w-md px-6 font-mono">
        <div className="flex items-center justify-between mb-6">
          <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">System Boot</span>
          <span className="text-zinc-600 text-xs">{String(progress).padStart(3, '0')}%</span>
        </div>

        <div className="space-y-1.5 min-h-[9.5rem]">
          {BOOT_STEPS.slice(0, step).map((s) => (
            <div key={s.text} className="code-line flex items-center justify-between gap-4 text-xs">
              <span className="text-zinc-400 truncate">
                <span className="text-amber-400/60">›</span> {s.text}
              </span>
              <span className="text-amber-400 shrink-0">[{s.status}]</span>
            </div>
          ))}
          {step < BOOT_STEPS.length && <span className="blink text-amber-400 text-xs">█</span>}
        </div>

        <div className="mt-6 h-px bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-amber-400 shadow-[0_0_12px_#FF5E1A] transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-center text-[10px] text-zinc-700 tracking-widest uppercase">
          press any key to skip
        </p>
      </div>
    </div>
  );
};

export default BootIntro;
