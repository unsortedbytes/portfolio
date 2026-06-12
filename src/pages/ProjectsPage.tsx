import React, { useRef } from "react";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import CardNetwork from "../components/CardNetwork";

interface LiveProject {
    id: string;
    num: string;
    title: string;
    description: string;
    category: string;
    liveUrl: string;
    github: string;
    tags: string[];
    accent: string;
}

const liveProjects: LiveProject[] = [
    {
        id: "1",
        num: "01",
        title: "Rripple.in",
        description:
            "Official website for Rripple — a digital media and AI solutions company. Modern, responsive web presence built for performance and brand impact.",
        category: "Web App",
        liveUrl: "https://rripple-in.vercel.app",
        github: "https://github.com/unsortedbytes/rripple.in",
        tags: ["React", "TypeScript", "Vite"],
        accent: "from-amber-400/60 to-orange-500/40",
    },
    {
        id: "2",
        num: "02",
        title: "IIT KGP Campus Map",
        description:
            "Interactive map of the IIT Kharagpur campus — a BTP project helping students and visitors navigate the sprawling 2100-acre campus.",
        category: "Tool",
        liveUrl: "https://btp-iitkgp-map.vercel.app",
        github: "https://github.com/unsortedbytes/BTP-IITKGP-Map",
        tags: ["TypeScript", "Maps", "BTP"],
        accent: "from-blue-500/50 to-cyan-400/30",
    },
    {
        id: "3",
        num: "03",
        title: "Gemini Chatbot",
        description:
            "Clean chatbot demo powered by Google Gemini API — showcasing conversational AI integration in a minimal, fast web interface.",
        category: "AI Demo",
        liveUrl: "https://chatbot-trail.vercel.app",
        github: "https://github.com/unsortedbytes/Chatbot-trail",
        tags: ["TypeScript", "Gemini API", "AI"],
        accent: "from-violet-500/50 to-purple-400/30",
    },
    {
        id: "4",
        num: "04",
        title: "Random Projects",
        description:
            "A growing collection of small experimental builds — born from random thoughts, weekend experiments, and the itch to just make something.",
        category: "Collection",
        liveUrl: "https://random-projects-khaki.vercel.app",
        github: "https://github.com/unsortedbytes/random_projects",
        tags: ["Various"],
        accent: "from-emerald-500/50 to-teal-400/30",
    },
    {
        id: "5",
        num: "05",
        title: "Job Application Tracker",
        description:
            "Chrome extension that auto-logs every job application to Google Sheets — click Apply, Gemini parses the page, a row appears. No manual input, ever.",
        category: "Chrome Extension",
        liveUrl: "https://github.com/unsortedbytes/random_projects/tree/main/job-tracker",
        github: "https://github.com/unsortedbytes/random_projects/tree/main/job-tracker",
        tags: ["JavaScript", "Gemini AI", "Google Sheets"],
        accent: "from-rose-500/50 to-pink-400/30",
    },
];

const GithubIcon = () => (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

/* Spotlight card — radial glow follows cursor */
interface SpotlightProps {
    children: React.ReactNode;
    href: string;
    className?: string;
}
const SpotlightCard: React.FC<SpotlightProps> = ({ children, href, className = '' }) => {
    const ref = useRef<HTMLAnchorElement>(null);

    const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        el.style.background = `radial-gradient(350px circle at ${x}px ${y}px, rgba(255,94,26,0.1), transparent 60%), #1A1A1A`;
    };
    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.background = '';
    };

    return (
        <a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
           className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
            {children}
        </a>
    );
};

const ProjectsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 dot-grid opacity-30" />
                <div className="float-a absolute -top-20 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
                <div className="float-c absolute bottom-0 -left-20 w-[500px] h-[500px] bg-amber-600/3 rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto px-6 pt-32 pb-16 relative z-10">

                {/* Header */}
                <ScrollReveal direction="fade">
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="live-dot" />
                            <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">
                                deployed &amp; live
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight mb-5">
                            Live<br />
                            <span className="gradient-text">Projects</span>
                        </h1>
                        <p className="text-zinc-500 text-sm max-w-sm">
                            Click any card to open the project live.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Stats row */}
                <ScrollReveal delay={100} direction="up">
                    <div className="flex gap-6 mb-14 mt-8 border-y border-zinc-800/60 py-5">
                        {[
                            { num: liveProjects.length, label: 'Live apps' },
                            { num: '100%', label: 'Deployed' },
                            { num: 'Vercel', label: 'Hosted on' },
                        ].map((s) => (
                            <div key={s.label}>
                                <p className="text-2xl font-bold text-white font-mono">{s.num}</p>
                                <p className="text-xs text-zinc-600 font-mono">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 gap-5">
                    {liveProjects.map((project, i) => (
                        <ScrollReveal
                            key={project.id}
                            delay={i * 120}
                            direction={i % 2 === 0 ? 'left' : 'right'}
                        >
                            <SpotlightCard
                                href={project.liveUrl}
                                className="hover-lift relative flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden group transition-colors duration-300 h-full"
                            >
                                {/* Particle network background */}
                                <CardNetwork className="opacity-[0.28]" />

                                {/* Accent bar — draws left→right on hover */}
                                <div className={`top-bar-draw absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${project.accent}`} />

                                {/* Card body */}
                                <div className="p-6 flex flex-col flex-1">
                                    {/* Top row */}
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
                                                {project.category}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs text-zinc-600 font-mono">
                                                <span className="live-dot !w-[5px] !h-[5px]" />
                                                live
                                            </span>
                                        </div>
                                        <span className="text-5xl font-black leading-none font-mono select-none text-zinc-800 group-hover:text-zinc-700 transition-colors duration-500">
                                            {project.num}
                                        </span>
                                    </div>

                                    {/* Title + external arrow */}
                                    <div className="flex items-start gap-2 mb-2">
                                        <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300 flex-1 leading-snug">
                                            {project.title}
                                        </h2>
                                        <svg
                                            className="w-5 h-5 text-zinc-700 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-0.5"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </div>

                                    <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="shimmer-tag font-mono text-xs text-zinc-500 border border-zinc-800 group-hover:border-zinc-700 px-2.5 py-0.5 rounded transition-colors duration-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between border-t border-zinc-800/60 group-hover:border-zinc-700/60 pt-4 transition-colors duration-300">
                                        <div className="btn-shine flex items-center gap-2 text-xs font-bold text-zinc-950 bg-amber-400 group-hover:bg-amber-300 px-5 py-2 rounded-full transition-colors duration-200">
                                            Open Live
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                        <span
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(project.github, '_blank', 'noopener,noreferrer');
                                            }}
                                            role="button"
                                            className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-amber-400 font-mono transition-colors duration-200"
                                        >
                                            <GithubIcon />
                                            Source
                                        </span>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Footer strip */}
                <ScrollReveal delay={480} direction="fade">
                    <div className="mt-14 pt-6 border-t border-zinc-800 flex items-center justify-between">
                        <p className="text-zinc-700 font-mono text-xs">
                            {liveProjects.length} projects · all deployed
                        </p>
                        <a
                            href="https://github.com/unsortedbytes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-600 hover:text-amber-400 font-mono text-xs transition-colors duration-200"
                        >
                            github.com/unsortedbytes →
                        </a>
                    </div>
                </ScrollReveal>
            </div>

            <Footer />
        </div>
    );
};

export default ProjectsPage;
