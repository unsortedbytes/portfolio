import React from "react";
import { useTypingEffect } from "../hooks/useTypingEffect";

const Hero: React.FC = () => {
    const typingText = useTypingEffect(
        [
            "Software Developer",
            "Backend Specialist",
            "Cloud Infrastructure Engineer",
            "Python & FastAPI Expert",
            "IIT Kharagpur Graduate",
            "Open Source Contributor",
        ],
        80,
        40,
        1500,
    );

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden"
        >
            {/* Subtle ambient glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 py-20 text-center relative z-10">
                <div className="animate-fade-in max-w-3xl mx-auto">
                    {/* Eyebrow */}
                    <p className="text-amber-400 font-mono text-sm tracking-widest uppercase mb-6 animate-slide-down">
                        &gt; hello, world
                    </p>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-down leading-tight">
                        <span className="text-amber-400 glitch">Aditya Kumar</span>
                    </h1>

                    {/* Typing effect */}
                    <div className="h-8 flex items-center justify-center mb-8 animate-slide-up">
                        <span className="text-xl md:text-2xl text-zinc-300 font-mono">
                            {typingText}
                        </span>
                        <span className="ml-1 text-amber-400 animate-pulse font-mono">|</span>
                    </div>

                    <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
                        Building scalable backend systems with Python, FastAPI, and cloud
                        infrastructure. Currently at{" "}
                        <span className="text-amber-400 font-medium">House of Amber</span>.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById("projects");
                                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
                            }}
                            className="bg-amber-400 text-zinc-950 px-7 py-2.5 rounded-lg font-semibold hover:bg-amber-300 transition-colors duration-200 text-sm"
                        >
                            View My Work
                        </a>
                        <a
                            href="/Aditya_Kumar_Resume.pdf"
                            download
                            className="border border-amber-400 text-amber-400 px-7 py-2.5 rounded-lg font-semibold hover:bg-amber-400/10 transition-colors duration-200 text-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download CV
                        </a>
                        <a
                            href="#terminal"
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById("terminal");
                                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
                            }}
                            className="text-zinc-400 hover:text-amber-400 px-7 py-2.5 rounded-lg font-semibold transition-colors duration-200 text-sm border border-zinc-700 hover:border-zinc-600"
                        >
                            Try Terminal
                        </a>
                    </div>

                    {/* Social links */}
                    <div className="flex justify-center gap-5">
                        <a
                            href="https://github.com/unsortedbytes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-amber-400 transition-colors duration-200"
                            aria-label="GitHub"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/aditya-kumar-b7b79b22b/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-amber-400 transition-colors duration-200"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a
                            href="mailto:adi.bytes@gmail.com"
                            className="text-zinc-500 hover:text-amber-400 transition-colors duration-200"
                            aria-label="Email"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">scroll</span>
                    <div className="w-px h-10 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent scroll-pulse" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
