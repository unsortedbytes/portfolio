import React, { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import CardNetwork from './CardNetwork';
import StarfieldBg from './StarfieldBg';

const projects = [
  {
    title: 'Portmon',
    year: '2025',
    description: 'High-performance Rust CLI tool to inspect active TCP/UDP ports and map them to Linux processes',
    features: [
      'Functionality comparable to sudo ss -tulpn',
      'Parses system socket and process metadata',
      'Secure, privilege-aware execution',
      'Exposes detailed port, PID, protocol, and listening state',
    ],
    tags: ['Rust', 'Linux', 'Networking', 'CLI'],
    github: 'https://github.com/unsortedbytes/portmon',
  },
  {
    title: 'University Library Management',
    year: '2024',
    description: 'Production-grade library management system with secure APIs and role-based access control',
    features: [
      'Rate limiting, DDoS protection, and advanced error handling',
      'Redis caching for improved query performance',
      'Efficient PostgreSQL queries to reduce latency',
      'Role-based access control and automated workflows',
    ],
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/unsortedkgpian/University-Library-Management-System',
  },
  {
    title: 'Mystery Messaging',
    year: '2024',
    description: 'Full-stack anonymous messaging platform with secure feedback sharing',
    features: [
      'Email verification and NextAuth authentication',
      'Secure session management and data protection',
      'AI-powered message suggestions',
      'Anonymous send and receive messaging',
    ],
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'AI'],
    github: 'https://github.com/unsortedkgpian/Mystery-message-',
  },
  {
    title: 'Snake Game',
    year: '2023',
    description: 'Classic Snake game in C++ with real-time mechanics and grid-based state management',
    features: [
      'Real-time movement and collision detection',
      'Score tracking system',
      'Grid-based state management for smooth gameplay',
      'Efficient game-loop logic',
    ],
    tags: ['C++', 'Game Logic', 'Algorithms'],
    github: 'https://github.com/unsortedbytes/snake-game',
  },
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.transform = `perspective(700px) rotateY(${nx * 14}deg) rotateX(${-ny * 14}deg) translateZ(8px)`;
    el.style.boxShadow = `${-nx * 14}px ${-ny * 14}px 40px rgba(255,94,26,0.1)`;
    el.style.background = `radial-gradient(280px circle at ${px}px ${py}px, rgba(255,94,26,0.07), transparent 60%), #252525`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    el.style.boxShadow = 'none';
    el.style.background = '';
  };

  return (
    <div
      ref={ref}
      className={`tilt-card relative overflow-hidden ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <CardNetwork className="opacity-[0.28]" />
      {children}
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-zinc-900 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <StarfieldBg className="opacity-[0.65]" />
        <div className="float-b absolute -top-32 -right-32 w-[500px] h-[500px] bg-amber-500/4 rounded-full blur-3xl" />
        <div className="float-d absolute bottom-0 -left-32 w-[400px] h-[400px] bg-amber-600/3 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-3">Projects</h2>
            <div className="h-0.5 w-12 bg-amber-400 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ScrollReveal
              key={index}
              delay={index * 100}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <TiltCard className="card-glow bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 hover:border-amber-400/30 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded shrink-0 ml-3">
                    {project.year}
                  </span>
                </div>

                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                <ul className="space-y-1.5 mb-4 flex-grow">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-amber-400 mt-1 shrink-0 text-xs">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="shimmer-tag bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2.5 py-0.5 rounded text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-2 border-t border-zinc-700/50">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-amber-400 transition-colors duration-200 font-mono"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Source
                  </a>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
