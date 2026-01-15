import React from 'react';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: 'Software Developer',
      company: 'House of Amber Advisory Private Limited',
      location: 'Mumbai, India - Onsite',
      period: 'May 2025 - Present',
      type: 'Full-time',
      description: [
        'Designed and scaled high-performance backend services using Python and FastAPI for enterprise-grade applications',
        'Built optimized RESTful APIs with robust validation, error handling, and authentication for seamless integrations',
        'Deployed containerized production services using Docker on AWS Kubernetes, ensuring high availability',
        'Enhanced system reliability by implementing structured logging, monitoring, and automated testing workflows'
      ],
      tags: ['Python', 'FastAPI', 'Docker', 'AWS', 'Kubernetes']
    },
    {
      title: 'Software Developer Intern',
      company: 'Mahi Mahi Marketing Solution',
      location: 'Bangalore, India - Remote',
      period: 'Mar 2025 - Jun 2025',
      type: 'Internship',
      description: [
        'Developed Maven.ai, an AI-powered marketing platform automating marketing generation using Generative AI',
        'Optimized AI models and integrated detailed analytics to improve content quality and campaign effectiveness',
        'Designed intuitive user interfaces with structured workflows to enhance usability and content management'
      ],
      tags: ['AI', 'Python', 'Generative AI', 'Analytics']
    },
    {
      title: 'Full Stack Developer Intern',
      company: 'Dhruva Capital',
      location: 'Kolkata, India - Remote',
      period: 'Feb 2025 - Apr 2025',
      type: 'Internship',
      description: [
        'Built SwanSathi.com, a gold-loan management platform with authentication, loan processing, and real-time tracking',
        'Developed the official website using React.js and Node.js with a modern, responsive, SEO-optimized UI',
        'Integrated backend services and optimized database performance using caching strategies to ensure high availability'
      ],
      tags: ['React', 'Node.js', 'PostgreSQL', 'Redis']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Experience
        </h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                  <p className="text-lg text-blue-400 font-semibold">{exp.company}</p>
                  <p className="text-sm text-gray-400 mt-1">{exp.location}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {exp.type}
                  </span>
                  <p className="text-gray-300 text-sm mt-1">{exp.period}</p>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-400 mr-2">▹</span>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag, i) => (
                  <span key={i} className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-md text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
