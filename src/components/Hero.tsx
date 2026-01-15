import React from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';

const Hero: React.FC = () => {
  const typingText = useTypingEffect([
    'Full Stack Developer',
    'Backend Specialist',
    'Cloud Infrastructure Engineer',
    'Python & FastAPI Expert',
    'IIT Kharagpur Student',
    'Open Source Contributor',
  ], 80, 40, 1500);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-gray-900 to-dark-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-secondary opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-down">
            Hi, I'm <span className="text-blue-400 animate-glow">Aditya Kumar</span>
          </h1>
          <div className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up h-8 flex items-center justify-center">
            <span className="font-mono">{typingText}</span>
            <span className="animate-pulse text-blue-400 ml-1">|</span>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Building scalable applications with modern technologies. Currently working at House of Amber,
            specializing in backend development with Python, FastAPI, and cloud infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="bg-blue-500 text-gray-950 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="/Aditya_Kumar_Resume.pdf"
              download
              className="bg-green-500 text-gray-950 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </a>
            <a
              href="#terminal"
              className="bg-transparent text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-500/10 transition duration-300 shadow-lg border-2 border-blue-400 transform hover:scale-105"
            >
              Try Terminal
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-10">
            <a
              href="https://github.com/unsortedbytes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/aditya-kumar-b7b79b22b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:adi.bytes@gmail.com"
              className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
