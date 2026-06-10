import React from "react";
import ScrollReveal from "./ScrollReveal";

const Experience: React.FC = () => {
    const experiences = [
        {
            title: "Software Developer",
            company: "House of Amber Advisory Private Limited",
            location: "Mumbai, India · Onsite",
            period: "May 2025 – Present",
            type: "Full-time",
            description: [
                "Designed and scaled high-performance backend services using Python and FastAPI for enterprise-grade applications",
                "Built optimized RESTful APIs with robust validation, error handling, and authentication for seamless integrations",
                "Deployed containerized production services using Docker on AWS Kubernetes, ensuring high availability",
                "Enhanced system reliability by implementing structured logging, monitoring, and automated testing workflows",
            ],
            tags: ["Python", "FastAPI", "Docker", "AWS", "Kubernetes"],
        },
        {
            title: "Software Developer Intern",
            company: "Mahi Mahi Marketing Solution",
            location: "Bangalore, India · Remote",
            period: "Mar 2025 – Jun 2025",
            type: "Internship",
            description: [
                "Developed Maven.ai, an AI-powered marketing platform automating content generation using Generative AI",
                "Optimized AI models and integrated detailed analytics to improve content quality and campaign effectiveness",
                "Designed intuitive user interfaces with structured workflows to enhance usability and content management",
            ],
            tags: ["Python", "Generative AI", "Analytics"],
        },
        {
            title: "Full Stack Developer Intern",
            company: "Dhruva Capital",
            location: "Kolkata, India · Remote",
            period: "Feb 2025 – Apr 2025",
            type: "Internship",
            description: [
                "Built SwanSathi.com, a gold-loan management platform with authentication, loan processing, and real-time tracking",
                "Developed the official website using React.js and Node.js with a modern, responsive, SEO-optimized UI",
                "Integrated backend services and optimized database performance using caching strategies to ensure high availability",
            ],
            tags: ["React", "Node.js", "PostgreSQL", "Redis"],
        },
    ];

    return (
        <section id="experience" className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 dot-grid opacity-20" />
                <div className="float-b absolute top-1/4 -right-40 w-[500px] h-[500px] bg-amber-500/4 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-3">Experience</h2>
                        <div className="h-0.5 w-12 bg-amber-400 mx-auto rounded-full" />
                    </div>
                </ScrollReveal>

                <div className="max-w-3xl mx-auto">
                    {experiences.map((exp, index) => (
                        <ScrollReveal key={index} delay={index * 130} direction="left">
                            {/* Flex row: timeline track | card */}
                            <div className="flex gap-5 sm:gap-7">

                                {/* ── Timeline track (desktop) ── */}
                                <div className="hidden sm:flex flex-col items-center w-5 shrink-0">
                                    {/* Dot */}
                                    <div className="mt-7 w-3 h-3 rounded-full bg-amber-400 ring-[3px] ring-zinc-950 border border-amber-400/30 shrink-0 z-10" />
                                    {/* Connector line (all items) */}
                                    <div className={`w-px flex-1 mt-1.5 ${
                                        index < experiences.length - 1
                                            ? 'bg-gradient-to-b from-amber-400/40 via-amber-400/15 to-transparent'
                                            : 'bg-transparent'
                                    }`} />
                                </div>

                                {/* ── Card ── */}
                                <div className="flex-1 pb-5">
                                    <div className="card-glow group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-400/30 transition-colors duration-300">
                                        {/* Top row */}
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                                                <p className="text-amber-400 font-medium text-sm">{exp.company}</p>
                                                <p className="text-zinc-500 text-xs mt-0.5">{exp.location}</p>
                                            </div>
                                            <div className="flex sm:flex-col sm:items-end gap-2 shrink-0">
                                                <span className="text-xs font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2.5 py-1 rounded-md">
                                                    {exp.type}
                                                </span>
                                                <span className="text-zinc-500 text-xs font-mono">{exp.period}</span>
                                            </div>
                                        </div>

                                        {/* Bullets */}
                                        <ul className="space-y-1.5 mb-4">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                                                    <span className="text-amber-400 mt-1 shrink-0 text-xs">▸</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {exp.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="shimmer-tag bg-zinc-800 text-zinc-300 border border-zinc-700 px-2.5 py-0.5 rounded text-xs font-mono"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
