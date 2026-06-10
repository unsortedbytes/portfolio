import React from "react";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

interface LiveProject {
    id: string;
    num: string;
    title: string;
    description: string;
    category: string;
    liveUrl: string;
    github: string;
    tags: string[];
}

const liveProjects: LiveProject[] = [
    {
        id: "1",
        num: "01",
        title: "Rripple.in",
        description:
            "Official website for Rripple — a digital media and AI solutions company. Modern, responsive web presence built for performance and brand impact.",
        category: "Web Application",
        liveUrl: "https://rripple-in.vercel.app",
        github: "https://github.com/unsortedbytes/rripple.in",
        tags: ["React", "TypeScript", "Vite"],
    },
    {
        id: "2",
        num: "02",
        title: "IIT KGP Campus Map",
        description:
            "Interactive map of the IIT Kharagpur campus — a BTP project helping students and visitors navigate the sprawling 2100-acre campus with precision.",
        category: "Tool",
        liveUrl: "https://btp-iitkgp-map.vercel.app",
        github: "https://github.com/unsortedbytes/BTP-IITKGP-Map",
        tags: ["TypeScript", "Maps", "BTP"],
    },
    {
        id: "3",
        num: "03",
        title: "Gemini Chatbot",
        description:
            "A clean chatbot demo powered by Google Gemini API — showcasing conversational AI integration in a minimal, fast web interface.",
        category: "AI Demo",
        liveUrl: "https://chatbot-trail.vercel.app",
        github: "https://github.com/unsortedbytes/Chatbot-trail",
        tags: ["TypeScript", "Gemini API", "AI"],
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
    },
];

const ExternalIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const GithubIcon = () => (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const ProjectsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-zinc-950">
            <div className="max-w-5xl mx-auto px-6 pt-32 pb-8">
                {/* Page header */}
                <ScrollReveal direction="fade">
                    <div className="mb-16">
                        <p className="font-mono text-xs text-amber-400 tracking-widest uppercase mb-4">
                            — deployed &amp; live
                        </p>
                        <h1 className="text-6xl md:text-8xl font-bold text-white leading-none tracking-tight">
                            Live<br />
                            <span className="text-amber-400">Projects</span>
                        </h1>
                        <p className="text-zinc-500 mt-6 max-w-md text-sm leading-relaxed">
                            Things I built that you can open right now. Click through, break things, explore.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Divider */}
                <div className="border-t border-zinc-800 mb-0" />

                {/* Editorial list */}
                {liveProjects.map((project, i) => (
                    <ScrollReveal key={project.id} delay={i * 80} direction={i % 2 === 0 ? 'left' : 'right'}>
                        <div className="group relative py-10 border-b border-zinc-800 hover:border-zinc-700 transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">

                                {/* Number column */}
                                <div className="md:w-24 shrink-0 flex md:flex-col items-center md:items-start gap-3 md:gap-0">
                                    <span className="text-7xl md:text-8xl font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors duration-300 leading-none select-none font-mono">
                                        {project.num}
                                    </span>
                                    <span className="md:mt-3 text-xs font-mono text-amber-400/70 uppercase tracking-widest whitespace-nowrap">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300 mb-3 leading-tight">
                                        {project.title}
                                    </h2>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-5 max-w-lg">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-mono text-xs text-zinc-500 border border-zinc-800 px-2.5 py-0.5 rounded group-hover:border-zinc-700 transition-colors duration-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-xs px-5 py-2 rounded-full transition-colors duration-200"
                                        >
                                            <ExternalIcon />
                                            Open Live
                                        </a>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-mono transition-colors duration-200"
                                        >
                                            <GithubIcon />
                                            Source
                                        </a>
                                    </div>
                                </div>

                                {/* Arrow indicator */}
                                <div className="hidden md:flex items-center self-center">
                                    <svg
                                        className="w-6 h-6 text-zinc-700 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}

                {/* Footer note */}
                <ScrollReveal delay={400} direction="fade">
                    <div className="pt-12 pb-4 flex items-center justify-between">
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
