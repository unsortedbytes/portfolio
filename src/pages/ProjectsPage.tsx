import React from "react";
import Footer from "../components/Footer";

interface LiveProject {
    id: string;
    title: string;
    description: string;
    category: string;
    image?: string;
    liveUrl: string;
    tags: string[];
}

const ProjectsPage: React.FC = () => {
    const liveProjects: LiveProject[] = [
        {
            id: "1",
            title: "Project Name 1",
            description:
                "Add your project description here. This is a live project hosted on unsortedbytes.in",
            category: "Web Application",
            image: undefined,
            liveUrl: "https://unsortedbytes.in/project1",
            tags: ["React", "TypeScript", "TailwindCSS"],
        },
        {
            id: "2",
            title: "Project Name 2",
            description:
                "Add your project description here. This is a live project hosted on unsortedbytes.in",
            category: "Web Application",
            image: undefined,
            liveUrl: "https://unsortedbytes.in/project2",
            tags: ["Next.js", "Node.js", "MongoDB"],
        },
        {
            id: "3",
            title: "Project Name 3",
            description:
                "Add your project description here. This is a live project hosted on unsortedbytes.in",
            category: "Web Application",
            image: undefined,
            liveUrl: "https://unsortedbytes.in/project3",
            tags: ["React", "Firebase", "TailwindCSS"],
        },
        {
            id: "4",
            title: "Project Name 4",
            description:
                "Add your project description here. This is a live project hosted on unsortedbytes.in",
            category: "Web Application",
            image: undefined,
            liveUrl: "https://unsortedbytes.in/project4",
            tags: ["Vue.js", "Express", "PostgreSQL"],
        },
    ];

    const handleProjectClick = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="min-h-screen py-20 bg-zinc-900">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Live Projects
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Explore my live projects hosted on unsortedbytes.in.
                        Click on any project to view it in action.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                    {liveProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-500/50 transition-all duration-300 cursor-pointer flex flex-col"
                            onClick={() => handleProjectClick(project.liveUrl)}
                        >
                            {/* Project Image Placeholder */}
                            <div className="w-full h-40 bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <svg
                                            className="w-16 h-16 text-amber-400 mx-auto mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M10 20l4-16m4 4l4 4m0 6l-4 4m-4-4l-4-4m4 4a2 2 0 110-4 2 2 0 010 4z"
                                            />
                                        </svg>
                                        <p className="text-zinc-400 text-sm">
                                            Preview
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Project Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-3">
                                    <span className="text-xs text-amber-400 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full">
                                        {project.category}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-zinc-400 mb-4 flex-grow">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-zinc-700/50 text-zinc-300 px-2 py-1 rounded text-xs font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleProjectClick(project.liveUrl);
                                    }}
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <span>View Project</span>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Hover Overlay Indicator */}
                            <div className="absolute inset-0 bg-amber-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>

                {/* Info Section */}
                <div className="max-w-4xl mx-auto bg-zinc-800/30 border border-zinc-700 rounded-lg p-8 text-center mb-16">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        How to customize this page?
                    </h2>
                    <p className="text-zinc-400 mb-4">
                        Edit the{" "}
                        <code className="bg-zinc-900 px-2 py-1 rounded text-amber-400">
                            liveProjects
                        </code>{" "}
                        array in the ProjectsPage component to add your own live
                        projects. Update the URLs, titles, descriptions, and
                        tags to match your actual projects.
                    </p>
                    <p className="text-zinc-500 text-sm">
                        Each project card is clickable and will open your live
                        project in a new tab.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProjectsPage;
