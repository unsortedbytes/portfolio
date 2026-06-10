import React from "react";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

interface LiveProject {
    id: string;
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
        title: "Rripple.in",
        description:
            "Official website for Rripple — a digital media and AI solutions company. Modern, responsive web presence.",
        category: "Web Application",
        liveUrl: "https://rripple-in.vercel.app",
        github: "https://github.com/unsortedbytes/rripple.in",
        tags: ["React", "TypeScript", "Vite"],
    },
    {
        id: "2",
        title: "IIT KGP Campus Map",
        description:
            "Interactive map of the IIT Kharagpur campus — a BTP project helping students and visitors navigate the sprawling 2100-acre campus.",
        category: "Tool",
        liveUrl: "https://btp-iitkgp-map.vercel.app",
        github: "https://github.com/unsortedbytes/BTP-IITKGP-Map",
        tags: ["TypeScript", "Maps", "BTP"],
    },
    {
        id: "3",
        title: "Gemini Chatbot",
        description:
            "A clean chatbot demo powered by Google Gemini API — showcasing conversational AI integration in a minimal web interface.",
        category: "AI Demo",
        liveUrl: "https://chatbot-trail.vercel.app",
        github: "https://github.com/unsortedbytes/Chatbot-trail",
        tags: ["TypeScript", "Gemini API", "AI"],
    },
    {
        id: "4",
        title: "Random Projects",
        description:
            "A collection of small experimental projects — built on random thoughts and weekend experiments.",
        category: "Collection",
        liveUrl: "https://random-projects-khaki.vercel.app",
        github: "https://github.com/unsortedbytes/random_projects",
        tags: ["Various"],
    },
];

const ExternalIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const GithubIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const ProjectsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-zinc-950">
            <div className="container mx-auto px-6 py-28">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-14">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                            Live Projects
                        </h1>
                        <div className="h-0.5 w-12 bg-amber-400 mx-auto rounded-full mb-4" />
                        <p className="text-zinc-400 max-w-xl mx-auto text-sm">
                            Deployed projects you can open right now.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                    {liveProjects.map((project, i) => (
                        <ScrollReveal key={project.id} delay={i * 100}>
                            <div className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-400/30 transition-colors duration-300 flex flex-col h-full">
                                {/* Category + title */}
                                <div className="mb-3">
                                    <span className="text-xs font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded">
                                        {project.category}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-200">
                                    {project.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-grow">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-zinc-800 text-zinc-300 border border-zinc-700 px-2.5 py-0.5 rounded text-xs font-mono"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 mt-auto">
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-sm py-2.5 rounded-lg transition-colors duration-200"
                                    >
                                        <span>View Live</span>
                                        <ExternalIcon />
                                    </a>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm px-4 py-2.5 rounded-lg transition-colors duration-200"
                                        aria-label="View source on GitHub"
                                    >
                                        <GithubIcon />
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProjectsPage;
