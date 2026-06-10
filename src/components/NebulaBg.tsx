import { useEffect, useRef } from 'react';

interface Props {
  className?: string;
}

interface Orb {
  cx: number; cy: number;
  r: number;
  color: [number, number, number];
  speed: number;
  phase: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
  warm: boolean;
}

const NebulaBg: React.FC<Props> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0;
    let raf: number;
    let t = 0;
    let visible = true;

    const orbs: Orb[] = [
      { cx: 0.22, cy: 0.30, r: 0.42, color: [255, 94, 26],   speed: 0.00025, phase: 0 },
      { cx: 0.78, cy: 0.65, r: 0.38, color: [140, 60, 255],  speed: 0.00018, phase: Math.PI },
      { cx: 0.55, cy: 0.15, r: 0.28, color: [255, 160, 60],  speed: 0.00035, phase: 2.1 },
      { cx: 0.15, cy: 0.80, r: 0.24, color: [80,  40, 200],  speed: 0.00022, phase: 0.8 },
    ];

    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const seed = [
        0.12,0.34,0.56,0.78,0.90,0.23,0.45,0.67,0.89,0.01,
        0.11,0.33,0.55,0.77,0.99,0.22,0.44,0.66,0.88,0.10,
        0.13,0.35,0.57,0.79,0.91,0.24,0.46,0.68,0.80,0.02,
        0.14,0.36,0.58,0.70,0.92,0.25,0.47,0.69,0.81,0.03,
        0.15,0.37,0.59,0.71,0.93,0.26,0.48,0.60,0.82,0.04,
        0.16,0.38,0.50,0.72,0.94,0.27,0.49,0.61,0.83,0.05,
        0.17,0.39,0.51,0.73,0.95,0.28,0.40,0.62,0.84,0.06,
        0.18,0.30,0.52,0.74,0.96,0.29,0.41,0.63,0.85,0.07,
        0.19,0.31,0.53,0.75,0.97,0.20,0.42,0.64,0.86,0.08,
        0.10,0.32,0.54,0.76,0.98,0.21,0.43,0.65,0.87,0.09,
        0.15,0.37,0.59,0.71,0.93,0.26,0.48,0.60,0.82,0.04,
        0.16,0.38,0.50,0.72,0.94,0.27,0.49,0.61,0.83,0.05,
        0.17,0.39,0.51,0.73,0.95,0.28,0.40,0.62,0.84,0.06,
        0.18,0.30,0.52,0.74,0.96,0.29,0.41,0.63,0.85,0.07,
        0.19,0.31,0.53,0.75,0.97,0.20,0.42,0.64,0.86,0.08,
        0.10,0.32,0.54,0.76,0.98,0.21,0.43,0.65,0.87,0.09,
        0.12,0.34,0.56,0.78,0.90,0.23,0.45,0.67,0.89,0.01,
        0.11,0.33,0.55,0.77,0.99,0.22,0.44,0.66,0.88,0.10,
        0.13,0.35,0.57,0.79,0.91,0.24,0.46,0.68,0.80,0.02,
        0.14,0.36,0.58,0.70,0.92,0.25,0.47,0.69,0.81,0.03,
      ];
      particles = seed.map((s, i) => ({
        x:    (s * 17 % 1) * w,
        y:    (s * 31 % 1) * h,
        vx:   (((s * 13) % 1) - 0.5) * 0.4,
        vy:   (((s * 19) % 1) - 0.5) * 0.4,
        size: ((s * 7) % 1) * 1.4 + 0.4,
        alpha:((s * 11) % 1) * 0.55 + 0.2,
        warm: i % 3 !== 0,
      }));
    };

    const draw = () => {
      if (!visible) { raf = requestAnimationFrame(draw); return; }
      t++;

      ctx.clearRect(0, 0, w, h);

      /* nebula orbs */
      orbs.forEach(orb => {
        const ox = (orb.cx + Math.sin(t * orb.speed + orb.phase) * 0.13) * w;
        const oy = (orb.cy + Math.cos(t * orb.speed * 0.65 + orb.phase) * 0.11) * h;
        const rad = orb.r * Math.min(w, h);
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, rad);
        const [r, gb, b] = orb.color;
        g.addColorStop(0,   `rgba(${r},${gb},${b},0.20)`);
        g.addColorStop(0.35,`rgba(${r},${gb},${b},0.09)`);
        g.addColorStop(0.7, `rgba(${r},${gb},${b},0.03)`);
        g.addColorStop(1,   `rgba(${r},${gb},${b},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(ox, oy, rad, 0, Math.PI * 2);
        ctx.fill();
      });

      /* flowing particles */
      particles.forEach(p => {
        const nx = p.x / w;
        const ny = p.y / h;
        const angle =
          Math.sin(nx * Math.PI * 2.5 + t * 0.0009) * Math.PI * 1.8 +
          Math.cos(ny * Math.PI * 1.8 + t * 0.0006) * Math.PI;
        p.vx += Math.cos(angle) * 0.007;
        p.vy += Math.sin(angle) * 0.007;
        p.vx *= 0.975;
        p.vy *= 0.975;
        p.x  += p.vx;
        p.y  += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const [r, g, b] = p.warm ? [255, 120, 50] : [160, 100, 255];
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    resize();
    init();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default NebulaBg;
