import React from 'react';
import GitHubActivity from './GitHubActivity';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          About Me
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-lg p-8 shadow-2xl hover:shadow-blue-500/20 transition duration-500">
            <p className="text-lg text-gray-300 mb-6">
              I'm a passionate Full Stack Developer currently pursuing my B.Tech in Mechanical Engineering 
              at <span className="font-semibold text-blue-400">IIT Kharagpur</span> (GPA: 7.64/10). I specialize in backend development 
              and building scalable, production-ready applications.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              Currently working as a <span className="font-semibold">Software Developer - Backend</span> at House of Amber, 
              where I've improved application response times by 30% and handle over 1 million monthly requests using 
              Python, FastAPI, and AWS infrastructure.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800 border border-gray-800 p-6 rounded-lg shadow-xl hover:shadow-blue-500/20 transition duration-300">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">🎓 Education</h3>
                <p className="text-gray-200">B.Tech, IIT Kharagpur</p>
                <p className="text-sm text-gray-400">2021 - Present</p>
              </div>
              <div className="bg-gray-800 border border-gray-800 p-6 rounded-lg shadow-xl hover:shadow-blue-500/20 transition duration-300">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">💼 Experience</h3>
                <p className="text-gray-200">Backend Developer</p>
                <p className="text-sm text-gray-400">House of Amber</p>
              </div>
              <div className="bg-gray-800 border border-gray-800 p-6 rounded-lg shadow-xl hover:shadow-blue-500/20 transition duration-300">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">🎯 Focus Areas</h3>
                <p className="text-gray-200">Backend Development</p>
                <p className="text-sm text-gray-400">Cloud Infrastructure</p>
              </div>
              <div className="bg-gray-800 border border-gray-800 p-6 rounded-lg shadow-xl hover:shadow-blue-500/20 transition duration-300">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">🎲 Fun Fact</h3>
                <p className="text-gray-200">I Love Bleach</p>
                <p className="text-sm text-gray-400">Creating bugs since 2022</p>
              </div>
            </div>
          </div>
          
          {/* GitHub Activity */}
          <div className="mt-8">
            <GitHubActivity />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
