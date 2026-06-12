import { useEffect, useRef } from 'react';

interface Props { className?: string; }

interface Commit { at: number; born: number; }

interface GraphPath {
  pts: { x: number; y: number }[];
  cum: number[];
  total: number;
  head: number;
  speed: number;
  delay: number;
  width: number;
  rgb: string;
  commits: Commit[];
  endDot: boolean;
}

const smooth = (t: number) => t * t * (3 - 2 * t);

const GitGraphBg: React.FC<Props> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0, raf: number;
    let visible = true;
    let frame = 0;
    let cycleStart = 0;
    let fade = 1;
    let phase: 'grow' | 'hold' | 'fade' = 'grow';
    let holdStart = 0;
    let paths: GraphPath[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const mkPath = (
      pts: { x: number; y: number }[],
      speed: number, delay: number, width: number,
      rgb: string, endDot: boolean,
    ): GraphPath => {
      const cum = [0];
      for (let i = 1; i < pts.length; i++) {
        const dx = pts[i].x - pts[i - 1].x;
        const dy = pts[i].y - pts[i - 1].y;
        cum.push(cum[i - 1] + Math.hypot(dx, dy));
      }
      const total = cum[cum.length - 1];
      const commits: Commit[] = [];
      for (let d = 60 + Math.random() * 50; d < total - 40; d += 95 + Math.random() * 75) {
        commits.push({ at: d, born: -1 });
      }
      return { pts, cum, total, head: 0, speed, delay, width, rgb, commits, endDot };
    };

    const build = () => {
      paths = [];
      cycleStart = frame;
      phase = 'grow';
      fade = 1;

      const trunks = w < 640 ? 2 : 3;
      for (let k = 0; k < trunks; k++) {
        const baseX = ((k + 0.5) / trunks) * w + (Math.random() - 0.5) * 60;
        const wob = 6 + Math.random() * 9;
        const wobF = 0.005 + Math.random() * 0.004;
        const wobP = Math.random() * Math.PI * 2;
        const trunkX = (y: number) => baseX + Math.sin(y * wobF + wobP) * wob;

        const trunkSpeed = 1.8 + Math.random() * 0.9;
        const trunkDelay = k * 35 + Math.random() * 30;
        const tp: { x: number; y: number }[] = [];
        for (let y = -12; y <= h + 12; y += 5) tp.push({ x: trunkX(y), y });
        paths.push(mkPath(tp, trunkSpeed, trunkDelay, 1.4, '255,135,45', false));

        const nBranches = 1 + (Math.random() > 0.45 ? 1 : 0);
        for (let b = 0; b < nBranches; b++) {
          const startY = (0.06 + Math.random() * 0.42) * h;
          const len = (0.22 + Math.random() * 0.32) * h;
          const merges = Math.random() > 0.35;
          const side = Math.random() > 0.5 ? 1 : -1;
          const off = 34 + Math.random() * 38;

          const bp: { x: number; y: number }[] = [];
          for (let y = startY; y <= startY + len; y += 5) {
            const p = (y - startY) / len;
            let o: number;
            if (merges) {
              o = p < 0.22 ? smooth(p / 0.22) : p > 0.78 ? smooth((1 - p) / 0.22) : 1;
            } else {
              o = p < 0.3 ? smooth(p / 0.3) : 1;
            }
            bp.push({ x: trunkX(y) + side * off * o, y });
          }
          const branchDelay = trunkDelay + (startY + 12) / trunkSpeed;
          const branchSpeed = trunkSpeed * (0.8 + Math.random() * 0.3);
          paths.push(mkPath(bp, branchSpeed, branchDelay, 1.1, '255,185,90', !merges));
        }
      }
    };

    const draw = () => {
      if (!visible) { raf = requestAnimationFrame(draw); return; }
      frame++;
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = fade;

      let allDone = true;

      paths.forEach(p => {
        if (frame - cycleStart > p.delay && p.head < p.total) {
          p.head = Math.min(p.total, p.head + p.speed);
        }
        if (p.head < p.total) allDone = false;
        if (p.head <= 0) return;

        /* partial polyline up to head */
        ctx.beginPath();
        ctx.moveTo(p.pts[0].x, p.pts[0].y);
        let i = 1;
        while (i < p.pts.length && p.cum[i] <= p.head) {
          ctx.lineTo(p.pts[i].x, p.pts[i].y);
          i++;
        }
        let hx = p.pts[p.pts.length - 1].x;
        let hy = p.pts[p.pts.length - 1].y;
        if (i < p.pts.length) {
          const seg = (p.head - p.cum[i - 1]) / (p.cum[i] - p.cum[i - 1]);
          hx = p.pts[i - 1].x + (p.pts[i].x - p.pts[i - 1].x) * seg;
          hy = p.pts[i - 1].y + (p.pts[i].y - p.pts[i - 1].y) * seg;
          ctx.lineTo(hx, hy);
        }
        ctx.strokeStyle = `rgba(${p.rgb},0.36)`;
        ctx.lineWidth = p.width;
        ctx.stroke();

        /* glowing draw-head */
        if (p.head < p.total) {
          const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 8);
          g.addColorStop(0, 'rgba(255,200,110,0.55)');
          g.addColorStop(1, 'rgba(255,200,110,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(hx, hy, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(255,225,150,0.9)';
          ctx.beginPath();
          ctx.arc(hx, hy, 1.6, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.endDot) {
          /* feature-branch tip stays lit */
          const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 7);
          g.addColorStop(0, 'rgba(255,190,100,0.4)');
          g.addColorStop(1, 'rgba(255,190,100,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(hx, hy, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(255,200,110,0.8)';
          ctx.beginPath();
          ctx.arc(hx, hy, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        /* commit dots pop in as the head passes them */
        p.commits.forEach(c => {
          if (c.born < 0 && p.head >= c.at) c.born = frame;
          if (c.born < 0) return;

          /* locate commit position on the path */
          let j = 1;
          while (j < p.cum.length && p.cum[j] < c.at) j++;
          const seg = (c.at - p.cum[j - 1]) / (p.cum[j] - p.cum[j - 1]);
          const cx = p.pts[j - 1].x + (p.pts[j].x - p.pts[j - 1].x) * seg;
          const cy = p.pts[j - 1].y + (p.pts[j].y - p.pts[j - 1].y) * seg;

          const age = frame - c.born;
          const tN = Math.min(age / 16, 1);
          const back = 1 + 2.70158 * Math.pow(tN - 1, 3) + 1.70158 * Math.pow(tN - 1, 2);
          const r = 2.8 * back;

          if (age < 28) {
            const ringR = 4 + age * 0.6;
            ctx.beginPath();
            ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255,200,110,${(1 - age / 28) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          ctx.fillStyle = 'rgba(255,205,115,0.85)';
          ctx.beginPath();
          ctx.arc(cx, cy, Math.max(r, 0.1), 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(26,26,26,0.9)';
          ctx.beginPath();
          ctx.arc(cx, cy, Math.max(r * 0.4, 0.1), 0, Math.PI * 2);
          ctx.fill();
        });
      });

      ctx.globalAlpha = 1;

      /* cycle: grow → hold → fade out → rebuild with a fresh layout */
      if (phase === 'grow' && allDone) {
        phase = 'hold';
        holdStart = frame;
      } else if (phase === 'hold' && frame - holdStart > 100) {
        phase = 'fade';
      } else if (phase === 'fade') {
        fade -= 1 / 60;
        if (fade <= 0) build();
      }

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

export default GitGraphBg;
