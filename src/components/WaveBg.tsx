import { useEffect, useRef } from 'react';

interface Props { className?: string; }

const WAVES = [
  { freq: 0.011, amp: 0.065, speed: 0.007, phase: 0.0,  yPos: 0.22, rgb: '255,94,26',  a: 0.18 },
  { freq: 0.007, amp: 0.055, speed: 0.005, phase: 2.1,  yPos: 0.42, rgb: '255,160,60', a: 0.14 },
  { freq: 0.017, amp: 0.042, speed: 0.011, phase: 1.2,  yPos: 0.60, rgb: '255,94,26',  a: 0.10 },
  { freq: 0.005, amp: 0.070, speed: 0.004, phase: 3.5,  yPos: 0.75, rgb: '255,200,80', a: 0.08 },
  { freq: 0.013, amp: 0.032, speed: 0.009, phase: 0.8,  yPos: 0.35, rgb: '200,120,50', a: 0.07 },
];

const WaveBg: React.FC<Props> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0, raf: number;
    let visible = true;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!visible) { raf = requestAnimationFrame(draw); return; }
      t++;
      ctx.clearRect(0, 0, w, h);

      WAVES.forEach(wv => {
        const baseY = wv.yPos * h;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = baseY + Math.sin(x * wv.freq + t * wv.speed + wv.phase) * wv.amp * h;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${wv.rgb},${wv.a})`;
        ctx.lineWidth = 1;
        ctx.stroke();
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

export default WaveBg;
