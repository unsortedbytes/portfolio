import { useEffect, useRef } from 'react';

interface Props { className?: string; }

interface Star {
  x: number; y: number;
  size: number;
  baseAlpha: number;
  phase: number;
  twinkleSpeed: number;
  vx: number; vy: number;
}

const StarfieldBg: React.FC<Props> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0, raf: number;
    let visible = true;
    let stars: Star[] = [];
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const init = () => {
      stars = Array.from({ length: 130 }, (_, i) => {
        const s = ((i * 7919 + 1) % 997) / 997;
        const s2 = ((i * 6271 + 3) % 983) / 983;
        const s3 = ((i * 4933 + 7) % 977) / 977;
        return {
          x:           s  * w,
          y:           s2 * h,
          size:        0.3 + s3 * 2.2,
          baseAlpha:   0.15 + s * 0.55,
          phase:       s2 * Math.PI * 2,
          twinkleSpeed:0.005 + s3 * 0.01,
          vx:          (s - 0.5) * 0.07,
          vy:          (s2 - 0.5) * 0.05,
        };
      });
    };

    const draw = () => {
      if (!visible) { raf = requestAnimationFrame(draw); return; }
      t++;
      ctx.clearRect(0, 0, w, h);

      stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = w;
        else if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        else if (star.y > h) star.y = 0;

        const twinkle = (Math.sin(t * star.twinkleSpeed + star.phase) + 1) / 2;
        const a = star.baseAlpha * (0.25 + twinkle * 0.75);

        if (star.size > 1.5) {
          const g = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 5);
          g.addColorStop(0, `rgba(255,230,190,${a * 0.35})`);
          g.addColorStop(1, 'rgba(255,230,190,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(255,235,200,${a})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    resize();
    draw();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default StarfieldBg;
