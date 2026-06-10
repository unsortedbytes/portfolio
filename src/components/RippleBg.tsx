import { useEffect, useRef } from 'react';

interface Props { className?: string; }

interface Ripple {
  x: number; y: number;
  radius: number;
  maxRadius: number;
  speed: number;
}

const RippleBg: React.FC<Props> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0, raf: number;
    let visible = true;
    let ripples: Ripple[] = [];
    let t = 0, nextSpawn = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      ripples.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: 0,
        maxRadius: 70 + Math.random() * 130,
        speed: 0.7 + Math.random() * 0.7,
      });
    };

    const draw = () => {
      if (!visible) { raf = requestAnimationFrame(draw); return; }
      t++;
      ctx.clearRect(0, 0, w, h);

      if (t >= nextSpawn) {
        spawn();
        if (Math.random() > 0.55) spawn();
        nextSpawn = t + 80 + Math.floor(Math.random() * 70);
      }

      ripples = ripples.filter(r => r.radius < r.maxRadius);

      ripples.forEach(r => {
        r.radius += r.speed;
        const progress = r.radius / r.maxRadius;
        const baseAlpha = 0.30 * (1 - progress);

        for (let ring = 0; ring < 3; ring++) {
          const rr = r.radius - ring * 16;
          if (rr <= 0) continue;
          const a = baseAlpha * Math.pow(1 - ring * 0.32, 1.5);
          ctx.beginPath();
          ctx.arc(r.x, r.y, rr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,140,50,${a})`;
          ctx.lineWidth = 0.8 - ring * 0.2;
          ctx.stroke();
        }
      });

      raf = requestAnimationFrame(draw);
    };

    spawn(); spawn(); spawn();

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

export default RippleBg;
