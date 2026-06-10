import React, { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const CountUp: React.FC<{ to: number; suffix?: string; duration?: number }> = ({
  to, suffix = '', duration = 1400,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setValue(Math.floor(ease * to));
        if (t < 1) requestAnimationFrame(tick);
        else setValue(to);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
};

const ALL_SKILLS = [
  'Rust', 'Python', 'TypeScript', 'Go', 'C++', 'FastAPI', 'Django', 'React', 'Next.js',
  'Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Linux', 'Nginx', 'Git', 'Prisma',
];

const Skills: React.FC = () => {
  const categories = [
    {
      label: 'Languages',
      skills: ['Rust', 'Python', 'TypeScript', 'JavaScript', 'Go', 'C++', 'C', 'Solidity', 'C#'],
    },
    {
      label: 'Frameworks',
      skills: ['FastAPI', 'Django', 'Node.js', 'Express', 'React', 'Next.js'],
    },
    {
      label: 'Databases & ORMs',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'SQL', 'Prisma', 'Sequelize'],
    },
    {
      label: 'DevOps & Cloud',
      skills: ['Docker', 'Kubernetes', 'AWS (S3, EC2, Lambda, RDS)', 'Linux', 'Nginx', 'Git'],
    },
  ];

  const achievements = [
    { stat: 2, suffix: '%', label: 'JEE Advanced rank', detail: 'Top 2% among 1.6 lakh aspirants nationwide' },
    { stat: 1000, suffix: '+', label: 'Codeforces rating', detail: 'Algorithmic problem-solving skills' },
    { stat: 200, suffix: '+', label: 'DSA problems', detail: 'Across LeetCode, Codeforces & more' },
    { stat: 3, suffix: '+', label: 'Production systems', detail: 'Deployed & maintained real-world apps' },
  ];

  return (
    <section id="skills" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="float-a absolute top-0 right-0 w-[450px] h-[450px] bg-amber-500/4 rounded-full blur-3xl" />
        <div className="float-c absolute bottom-0 left-0 w-[350px] h-[350px] bg-amber-600/3 rounded-full blur-3xl" />
      </div>

      {/* Marquee ticker */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden border-b border-zinc-800/60 py-2.5 bg-zinc-950/80 backdrop-blur-sm z-20">
        <div className="marquee-track flex gap-6 w-max">
          {[...ALL_SKILLS, ...ALL_SKILLS].map((skill, i) => (
            <span key={i} className="text-xs font-mono text-zinc-600 hover:text-amber-400 transition-colors duration-200 whitespace-nowrap flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-amber-400/40 shrink-0" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-3">Skills</h2>
            <div className="h-0.5 w-12 bg-amber-400 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-4">
          {categories.map((cat, index) => (
            <ScrollReveal key={cat.label} delay={index * 80} direction="scale">
              <div className="card-glow bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-400/20 transition-colors duration-300">
                <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="shimmer-tag bg-zinc-800 text-zinc-200 border border-zinc-700 px-3 py-1 rounded-md text-sm font-mono hover:border-amber-400/40 hover:text-amber-300 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Achievements */}
        <div className="max-w-4xl mx-auto mt-14">
          <ScrollReveal delay={80}>
            <div className="text-center mb-8">
              <p className="text-xs font-mono text-amber-400 uppercase tracking-widest">Achievements</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((a, i) => (
              <ScrollReveal key={a.label} delay={120 + i * 80} direction="scale">
                <div className="card-glow bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-400/20 transition-colors duration-300 text-center">
                  <p className="text-4xl font-bold gradient-text mb-1 font-mono">
                    <CountUp to={a.stat} suffix={a.suffix} />
                  </p>
                  <p className="text-white font-semibold text-sm mb-1">{a.label}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">{a.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
