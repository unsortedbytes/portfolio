import React, { useEffect, useRef, useState } from "react";
import { useTypingEffect } from "../hooks/useTypingEffect";
import ParticleNetwork from "./ParticleNetwork";

/* ── Fibonacci spiral particles (deterministic) ── */
const PHI = (1 + Math.sqrt(5)) / 2;
const PARTICLES = Array.from({ length: 22 }, (_, i) => {
    const theta = i * 2 * Math.PI * PHI;
    const r = Math.sqrt((i + 0.5) / 22) * 44;
    return {
        id: i,
        left: 50 + r * Math.cos(theta),
        top:  50 + r * Math.sin(theta) * 0.55,
        size: 1.5 + (i % 3) * 0.55,
        dur:  `${6 + (i % 5) * 1.6}s`,
        delay:`${-(i * 0.35)}s`,
        opacity: 0.25 + (i % 4) * 0.15,
    };
});

/* ── Boot code lines ── */
const BOOT_LINES = [
    { text: "$ uvicorn app:app --host 0.0.0.0 --reload", color: "text-amber-400/50" },
    { text: "INFO:  Starting server — Aditya Kumar v2.0",  color: "text-zinc-600" },
    { text: "INFO:  Stack: Python · FastAPI · Rust · AWS",  color: "text-zinc-600" },
    { text: "INFO:  Kubernetes nodes: healthy ✓",           color: "text-zinc-600" },
    { text: "INFO:  Status: open to collaborate ✓",         color: "text-emerald-700" },
];

const FloatingCode: React.FC = () => {
    const [visible, setVisible] = useState<number[]>([]);

    useEffect(() => {
        const timers = BOOT_LINES.map((_, i) =>
            setTimeout(() => setVisible(prev => [...prev, i]), 900 + i * 550)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="select-none pointer-events-none text-left" aria-hidden>
            {BOOT_LINES.map((line, i) => (
                visible.includes(i) ? (
                    <div key={i} className={`code-line font-mono text-xs leading-6 ${line.color}`}>
                        {line.text}
                    </div>
                ) : null
            ))}
            {visible.length < BOOT_LINES.length && (
                <span className="blink text-amber-400/30 font-mono text-xs">█</span>
            )}
        </div>
    );
};

/* ── Quick stats ── */
const STATS = [
    { n: "200+", label: "DSA solved" },
    { n: "5+",   label: "live apps"  },
    { n: "3",    label: "work roles" },
];

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
        80, 40, 1500,
    );

    /* Mouse-reactive grid */
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef    = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const grid    = gridRef.current;
        if (!section || !grid) return;
        const onMove = (e: MouseEvent) => {
            const r = section.getBoundingClientRect();
            grid.style.setProperty("--gx", `${e.clientX - r.left}px`);
            grid.style.setProperty("--gy", `${e.clientY - r.top}px`);
        };
        section.addEventListener("mousemove", onMove);
        return () => section.removeEventListener("mousemove", onMove);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden"
        >
            {/* ── Background layers ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Particle network — base layer */}
                <ParticleNetwork count={68} linkDist={160} speed={0.35} className="opacity-70" />

                {/* Mouse-reactive dot grid on top */}
                <div ref={gridRef} className="absolute inset-0 grid-interactive opacity-40" />

                {/* Grain */}
                <div className="absolute inset-0 grain" />

                {/* Aurora sweep */}
                <div
                    className="aurora absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[360px]"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,94,26,0.16) 0%, rgba(255,140,90,0.10) 40%, rgba(255,94,26,0.05) 70%, transparent 100%)",
                        filter: "blur(52px)",
                    }}
                />

                {/* Deep orbs */}
                <div className="float-a absolute -top-40 -left-40 w-[700px] h-[700px] bg-amber-500/6 rounded-full blur-3xl" />
                <div className="float-b absolute -bottom-56 -right-40 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-3xl" />
                <div className="float-c absolute top-1/3 right-1/5 w-[350px] h-[350px] bg-amber-600/4 rounded-full blur-3xl" />

                {/* Horizontal accent lines */}
                <div className="absolute top-[35%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
                <div className="absolute bottom-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/6 to-transparent" />

                {/* Particles */}
                {PARTICLES.map((p) => (
                    <span
                        key={p.id}
                        className="particle"
                        style={{
                            left: `${p.left}%`,
                            top:  `${p.top}%`,
                            width:  `${p.size}px`,
                            height: `${p.size}px`,
                            opacity: p.opacity,
                            ["--dur" as string]:   p.dur,
                            ["--delay" as string]: p.delay,
                        }}
                    />
                ))}

                {/* Floating boot code — upper right */}
                <div className="absolute top-28 right-6 md:right-12 lg:right-24 hidden md:block">
                    <FloatingCode />
                </div>

                {/* Corner bracket decorations */}
                <div className="absolute top-24 left-8 text-amber-400/10 font-mono text-xs select-none hidden lg:block">
                    {"{ backend: true,\n  systems: 'scaled',\n  status: 'online' }"}
                </div>
            </div>

            {/* ── Content ── */}
            <div className="container mx-auto px-6 py-20 text-center relative z-10">
                <div className="max-w-3xl mx-auto">

                    {/* Eyebrow */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="progress-bar h-px w-8 bg-amber-400/60" />
                        <p className="text-amber-400 font-mono text-xs tracking-widest uppercase">
                            &gt; hello, world
                        </p>
                        <div className="progress-bar h-px w-8 bg-amber-400/60" style={{ animationDelay: "0.4s" }} />
                    </div>

                    {/* Name */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        <span className="text-amber-400 glitch">Aditya Kumar</span>
                    </h1>

                    {/* Typing effect */}
                    <div className="h-8 flex items-center justify-center mb-6">
                        <span className="text-xl md:text-2xl text-zinc-300 font-mono">{typingText}</span>
                        <span className="ml-1 text-amber-400 blink font-mono">|</span>
                    </div>

                    {/* Quick stats */}
                    <div className="flex justify-center gap-8 md:gap-12 mb-8">
                        {STATS.map((s, i) => (
                            <div
                                key={s.label}
                                className="stat-pop text-center group"
                                style={{ animationDelay: `${0.6 + i * 0.15}s` }}
                            >
                                <p className="text-xl md:text-2xl font-bold font-mono text-white group-hover:text-amber-400 transition-colors duration-200">
                                    {s.n}
                                </p>
                                <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest mt-0.5">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
                        Building scalable backend systems with Python, FastAPI, and cloud
                        infrastructure. Currently at{" "}
                        <span className="text-amber-400 font-medium">House of Amber</span>.
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {["Python", "FastAPI", "Rust", "Docker", "Kubernetes", "AWS"].map((tech) => (
                            <span
                                key={tech}
                                className="shimmer-tag font-mono text-xs text-zinc-500 border border-zinc-800 hover:border-amber-400/40 hover:text-amber-400 px-2.5 py-1 rounded transition-colors duration-200"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById("projects");
                                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
                            }}
                            className="btn-3d ring-pulse bg-amber-400 text-zinc-950 px-7 py-2.5 rounded-lg font-semibold hover:bg-amber-300 text-sm"
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
                        <a href="https://github.com/unsortedbytes" target="_blank" rel="noopener noreferrer"
                           className="text-zinc-500 hover:text-amber-400 transition-colors duration-200" aria-label="GitHub">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/aditya-kumar-b7b79b22b/" target="_blank" rel="noopener noreferrer"
                           className="text-zinc-500 hover:text-amber-400 transition-colors duration-200" aria-label="LinkedIn">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a href="mailto:adi.bytes@gmail.com"
                           className="text-zinc-500 hover:text-amber-400 transition-colors duration-200" aria-label="Email">
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
