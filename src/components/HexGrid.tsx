import { useEffect, useRef } from 'react';

interface Props {
  className?: string;
}

interface Hex {
  cx: number;
  cy: number;
  phase: number;
  speed: number;
}

const S = 30; // circumradius
const DX = Math.sqrt(3) * S;
const DY = 1.5 * S;

const HexGrid: React.FC<Props> = ({ className = '' }) => {
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
    let hexes: Hex[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };

    const buildGrid = () => {
      hexes = [];
      const cols = Math.ceil(w / DX) + 2;
      const rows = Math.ceil(h / DY) + 2;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const cx = col * DX + (row % 2 === 0 ? DX / 2 : 0);
          const cy = row * DY;
          hexes.push({
            cx,
            cy,
            phase: Math.random() * Math.PI * 2,
            speed: 0.004 + Math.random() * 0.003,
          });
        }
      }
    };

    const hexPath = (cx: number, cy: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        const x = cx + (S - 1) * Math.cos(a);
        const y = cy + (S - 1) * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const draw = () => {
      if (!visible) { raf = requestAnimationFrame(draw); return; }
      t++;
      ctx.clearRect(0, 0, w, h);

      hexes.forEach(hex => {
        const pulse = (Math.sin(t * hex.speed + hex.phase) + 1) / 2;

        hexPath(hex.cx, hex.cy);
        ctx.strokeStyle = `rgba(255,160,50,${0.05 + pulse * 0.13})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        if (pulse > 0.72) {
          hexPath(hex.cx, hex.cy);
          ctx.fillStyle = `rgba(255,140,40,${(pulse - 0.72) * 0.22})`;
          ctx.fill();
        }
      });

      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    resize();
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

export default HexGrid;
