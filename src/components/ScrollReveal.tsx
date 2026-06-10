import { useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'right' | 'left' | 'scale' | 'fade';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
  threshold?: number;
}

function getHidden(dir: Direction): string {
  switch (dir) {
    case 'right': return 'translateX(48px)';
    case 'left':  return 'translateX(-48px)';
    case 'scale': return 'scale(0.88)';
    case 'fade':  return 'translateY(0)';
    default:      return 'translateY(28px)';
  }
}

const ScrollReveal: React.FC<Props> = ({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  threshold = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? (direction === 'scale' ? 'scale(1)' : 'translate(0)') : getHidden(direction),
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
