import { useEffect, useRef } from 'react';

interface Dot {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  bright: boolean;
}

interface Props {
  count?: number;
  linkDist?: number;
  speed?: number;
  className?: string;
}

const ParticleNetwork: React.FC<Props> = ({
  count   = 70,
  linkDist = 165,
  speed    = 0.38,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0;
    let dots: Dot[] = [];
    let raf: number;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      dots = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.6 + 0.8,
        bright: i % 7 === 0,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      /* move */
      dots.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        else if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        else if (d.y > h) d.y = 0;
      });

      /* lines */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.38;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      /* dots */
      dots.forEach(d => {
        if (d.bright) {
          /* outer amber glow */
          const ag = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 9);
          ag.addColorStop(0,   'rgba(255,140,90,0.35)');
          ag.addColorStop(0.4, 'rgba(255,94,26,0.12)');
          ag.addColorStop(1,   'rgba(255,94,26,0)');
          ctx.fillStyle = ag;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r * 9, 0, Math.PI * 2);
          ctx.fill();

          /* white core glow */
          const wg = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3.5);
          wg.addColorStop(0,   'rgba(255,255,255,1)');
          wg.addColorStop(0.5, 'rgba(255,220,180,0.5)');
          wg.addColorStop(1,   'rgba(255,255,255,0)');
          ctx.fillStyle = wg;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        /* core dot */
        ctx.fillStyle = d.bright
          ? 'rgba(255,255,255,0.95)'
          : 'rgba(200,200,220,0.55)';
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    ro.observe(canvas);

    resize();
    init();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count, linkDist, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

export default ParticleNetwork;
