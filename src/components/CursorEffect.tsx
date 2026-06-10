import { useEffect, useRef } from 'react';

const CursorEffect: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      ring.style.transform = `translate(${e.clientX - 14}px, ${e.clientY - 14}px)`;
    };

    const grow = () => ring.classList.add('scale-150');
    const shrink = () => ring.classList.remove('scale-150');

    const interactables = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 bg-amber-400 rounded-full will-change-transform"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-7 h-7 border border-amber-400/50 rounded-full will-change-transform transition-all duration-200 ease-out"
      />
    </>
  );
};

export default CursorEffect;
