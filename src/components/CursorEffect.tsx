import React, { useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const CursorEffect: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const newParticle: Particle = {
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 5 + 3,
        opacity: 1,
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.05 }))
          .filter((p) => p.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Custom cursor dot */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-4 h-4 bg-blue-400 rounded-full blur-sm animate-pulse" />
      </div>

      {/* Particle trail */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-40"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-sm"
            style={{
              width: particle.size,
              height: particle.size,
            }}
          />
        </div>
      ))}
    </>
  );
};

export default CursorEffect;
