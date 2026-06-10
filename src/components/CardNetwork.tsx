import { useEffect, useRef } from 'react';

interface Dot { x: number; y: number; vx: number; vy: number; r: number; }

const CardNetwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, dots: Dot[] = [], raf = 0, frame = 0, paused = false;

    /* pause when scrolled off-screen */
    const io = new IntersectionObserver(([e]) => { paused = !e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      dots = Array.from({ length: 14 }, () => ({
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r:  Math.random() * 1.2 + 0.6,
      }));
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (paused) return;
      if (++frame % 2 !== 0) return; /* ~30 fps */

      ctx.clearRect(0, 0, w, h);

      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = w; else if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h; else if (d.y > h) d.y = 0;
      });

      const LINK = Math.min(w, h) * 0.48;

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(255,160,100,${(1 - d / LINK) * 0.24})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      dots.forEach(d => {
        ctx.fillStyle = 'rgba(255,180,120,0.5)';
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    resize(); init(); tick();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default CardNetwork;
