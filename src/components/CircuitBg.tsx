import { useEffect, useRef } from 'react';

interface Props { className?: string; }

interface Via { x: number; y: number; }
interface Trace { a: Via; b: Via; }
interface Packet { traceIdx: number; progress: number; speed: number; forward: boolean; }

const CircuitBg: React.FC<Props> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0, raf: number;
    let visible = true;
    let vias: Via[] = [];
    let traces: Trace[] = [];
    let packets: Packet[] = [];
    let frame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const build = () => {
      const cols = Math.max(4, Math.floor(w / 90));
      const rows = Math.max(3, Math.floor(h / 75));
      vias = [];
      traces = [];
      packets = [];

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          vias.push({
            x: (c / cols) * w,
            y: (r / rows) * h,
          });
        }
      }

      const numCols = cols + 1;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const idx = r * numCols + c;
          if (c < cols && Math.random() > 0.28)
            traces.push({ a: vias[idx], b: vias[idx + 1] });
          if (r < rows && Math.random() > 0.32)
            traces.push({ a: vias[idx], b: vias[idx + numCols] });
        }
      }

      for (let i = 0; i < 10; i++) spawnPacket();
    };

    const spawnPacket = () => {
      if (!traces.length) return;
      packets.push({
        traceIdx: Math.floor(Math.random() * traces.length),
        progress: Math.random(),
        speed: 0.0025 + Math.random() * 0.003,
        forward: Math.random() > 0.5,
      });
    };

    const draw = () => {
      if (!visible) { raf = requestAnimationFrame(draw); return; }
      frame++;
      ctx.clearRect(0, 0, w, h);

      /* traces */
      traces.forEach(tr => {
        ctx.beginPath();
        ctx.moveTo(tr.a.x, tr.a.y);
        ctx.lineTo(tr.b.x, tr.b.y);
        ctx.strokeStyle = 'rgba(255,140,50,0.07)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      /* vias */
      vias.forEach(v => {
        ctx.fillStyle = 'rgba(255,140,50,0.10)';
        ctx.beginPath();
        ctx.rect(v.x - 2, v.y - 2, 4, 4);
        ctx.fill();
      });

      /* packets */
      packets.forEach((pkt, i) => {
        pkt.progress += pkt.forward ? pkt.speed : -pkt.speed;
        if (pkt.progress > 1 || pkt.progress < 0) {
          packets[i] = {
            traceIdx: Math.floor(Math.random() * traces.length),
            progress: pkt.progress > 1 ? 0 : 1,
            speed: 0.0025 + Math.random() * 0.003,
            forward: Math.random() > 0.5,
          };
          return;
        }

        const tr = traces[pkt.traceIdx];
        const px = tr.a.x + (tr.b.x - tr.a.x) * pkt.progress;
        const py = tr.a.y + (tr.b.y - tr.a.y) * pkt.progress;

        const g = ctx.createRadialGradient(px, py, 0, px, py, 9);
        g.addColorStop(0,   'rgba(255,180,80,0.75)');
        g.addColorStop(0.4, 'rgba(255,140,50,0.25)');
        g.addColorStop(1,   'rgba(255,140,50,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,220,120,0.95)';
        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });

      if (frame % 90 === 0 && packets.length < 16) spawnPacket();

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

export default CircuitBg;
