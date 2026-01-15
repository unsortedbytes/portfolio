import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      category: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Rust', 'C', 'C++', 'Golang', 'CSS', 'HTML', 'Solidity', 'C#']
    },
    {
      category: 'Databases & ORMs',
      skills: ['SQL', 'MongoDB', 'PostgreSQL', 'Redis', 'SQLite', 'Prisma', 'Sequelize']
    },
    {
      category: 'DevOps & Cloud',
      skills: ['Linux', 'Docker', 'Kubernetes', 'AWS (S3, EC2, Lambda, RDS)', 'Nginx', 'Git', 'YAML']
    },
    {
      category: 'Frameworks',
      skills: ['Next.js', 'Node.js', 'React.js', 'FastAPI', 'Django', 'Express']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Skills & Technologies
        </h2>
        <div className="max-w-5xl mx-auto space-y-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg p-6 hover:border-blue-500/50 transition duration-300">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-500/20 text-blue-200 px-4 py-2 rounded-lg font-medium hover:bg-blue-500/30 hover:shadow-md transition duration-300 border border-blue-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-white">🏆 Achievements & Distinctions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-blue-300 font-semibold mb-2">🎯 JEE Advanced 2021</p>
              <p className="text-gray-200 text-sm">Secured top 2% rank among 1.6 lakh aspirants nationwide</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-blue-300 font-semibold mb-2">💻 Codeforces Rating</p>
              <p className="text-gray-200 text-sm">Achieved 1000+ rating, demonstrating strong problem-solving skills</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-blue-300 font-semibold mb-2">💡 DSA Problems</p>
              <p className="text-gray-200 text-sm">Solved 200+ problems across competitive programming platforms</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-blue-300 font-semibold mb-2">🚀 Production Projects</p>
              <p className="text-gray-200 text-sm">Built and deployed real-world applications in live environments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
