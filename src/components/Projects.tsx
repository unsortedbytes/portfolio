import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Portmon',
      year: '2025',
      description: 'High-performance Rust CLI tool to inspect active TCP/UDP ports and map them to Linux processes',
      features: [
        'Implemented functionality comparable to sudo ss -tulpn',
        'Parses system socket and process metadata',
        'Secure, privilege-aware execution',
        'Exposes detailed port, PID, protocol, and listening state information'
      ],
      tags: ['Rust', 'Linux', 'Networking', 'CLI'],
      github: 'https://github.com/unsortedbytes/portmon',
      demo: null
    },
    {
      title: 'University Library Management System',
      year: '2024',
      description: 'Production-grade library management system with secure APIs and role-based access control',
      features: [
        'Rate limiting, DDoS protection, and advanced error handling',
        'Redis caching for improved performance',
        'Efficient PostgreSQL queries to reduce latency',
        'Automated workflows and secure APIs'
      ],
      tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
      github: 'https://github.com/unsortedkgpian/University-Library-Management-System',
      demo: null
    },
    {
      title: 'Mystery Messaging',
      year: '2024',
      description: 'Full-stack anonymous messaging platform enabling secure feedback sharing',
      features: [
        'Email verification and NextAuth authentication',
        'Secure session management and data protection',
        'AI-powered message suggestions',
        'Anonymous send and receive messaging'
      ],
      tags: ['Next.js', 'TypeScript', 'MongoDB', 'AI'],
      github: 'https://github.com/unsortedkgpian/Mystery-message-',
      demo: null
    },
    {
      title: 'Snake Game',
      year: '2023',
      description: 'Classic Snake game implemented in C++ with real-time mechanics',
      features: [
        'Real-time movement and collision detection',
        'Score tracking system',
        'Efficient game-loop logic',
        'Grid-based state management for smooth gameplay'
      ],
      tags: ['C++', 'Game Logic', 'Algorithms'],
      github: 'https://github.com/unsortedbytes/snake-game',
      demo: null
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg p-6 hover:shadow-2xl hover:border-blue-500/50 transition duration-300 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{project.year}</span>
              </div>
              <p className="text-gray-200 mb-4">{project.description}</p>
              <ul className="space-y-2 mb-4 flex-grow">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-blue-400 mr-2">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-md text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-blue-400 transition duration-300"
                  >
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-blue-600 transition duration-300"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
