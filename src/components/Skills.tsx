import React from 'react';
import ScrollReveal from './ScrollReveal';

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
    {
      title: 'JEE Advanced 2021',
      detail: 'Top 2% rank among 1.6 lakh aspirants nationwide',
    },
    {
      title: 'Codeforces 1000+',
      detail: 'Demonstrated algorithmic problem-solving skills',
    },
    {
      title: '200+ DSA Problems',
      detail: 'Across LeetCode, Codeforces, and similar platforms',
    },
    {
      title: 'Production Systems',
      detail: 'Deployed and maintained real-world backend applications',
    },
  ];

  return (
    <section id="skills" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-3">Skills</h2>
            <div className="h-0.5 w-12 bg-amber-400 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-4">
          {categories.map((cat, index) => (
            <ScrollReveal key={cat.label} delay={index * 80}>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-400/20 transition-colors duration-300">
                <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-zinc-800 text-zinc-200 border border-zinc-700 px-3 py-1 rounded-md text-sm font-mono hover:border-amber-400/40 hover:text-amber-300 transition-colors duration-200"
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
        <div className="max-w-4xl mx-auto mt-12">
          <ScrollReveal delay={100}>
            <div className="text-center mb-6">
              <p className="text-xs font-mono text-amber-400 uppercase tracking-widest">Achievements</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((a, i) => (
              <ScrollReveal key={a.title} delay={150 + i * 80}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-amber-400/20 transition-colors duration-300">
                  <p className="text-amber-400 font-semibold text-sm mb-1">{a.title}</p>
                  <p className="text-zinc-400 text-sm">{a.detail}</p>
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
