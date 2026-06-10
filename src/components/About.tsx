import React from "react";
import GitHubActivity from "./GitHubActivity";
import ScrollReveal from "./ScrollReveal";
import CardNetwork from "./CardNetwork";

const About: React.FC = () => {
    return (
        <section id="about" className="py-24 bg-zinc-900 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 dot-grid opacity-20" />
                <div className="float-d absolute -top-32 -left-32 w-[500px] h-[500px] bg-amber-500/4 rounded-full blur-3xl" />
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-3">About Me</h2>
                        <div className="h-0.5 w-12 bg-amber-400 mx-auto rounded-full" />
                    </div>
                </ScrollReveal>

                <div className="max-w-4xl mx-auto space-y-8">
                    <ScrollReveal delay={100}>
                        <div className="card-glow relative overflow-hidden bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-8">
                        <CardNetwork className="opacity-[0.2]" />
                            <p className="text-zinc-300 leading-relaxed mb-4">
                                I'm a software developer focused on backend engineering and
                                systems programming, currently completing my B.Tech in Mechanical
                                Engineering at{" "}
                                <span className="text-amber-400 font-medium">IIT Kharagpur</span>{" "}
                                (GPA: 7.64/10). I gravitate toward problems where performance and
                                reliability actually matter.
                            </p>
                            <p className="text-zinc-300 leading-relaxed">
                                At{" "}
                                <span className="text-amber-400 font-medium">House of Amber</span>,
                                I design and ship backend services built on Python, FastAPI, and
                                AWS. Outside of work, I write Rust for CLI tooling and explore
                                systems internals.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Info grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            {
                                label: "Education",
                                primary: "IIT Kharagpur",
                                secondary: "B.Tech Mechanical Engineering · 2021–2025",
                            },
                            {
                                label: "Currently",
                                primary: "House of Amber Advisory",
                                secondary: "Software Developer · Mumbai, Onsite",
                            },
                            {
                                label: "Focus",
                                primary: "Backend & Systems",
                                secondary: "Python · Rust · Cloud Infrastructure",
                            },
                            {
                                label: "For fun",
                                primary: "Creating bugs since 2022",
                                secondary: "Rust is winning",
                            },
                        ].map((item, i) => (
                            <ScrollReveal key={item.label} delay={150 + i * 80}>
                                <div className="card-glow relative overflow-hidden bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-5 hover:border-amber-400/30 transition-colors duration-300">
                                <CardNetwork className="opacity-[0.2]" />
                                    <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
                                        {item.label}
                                    </p>
                                    <p className="text-white font-semibold">{item.primary}</p>
                                    <p className="text-zinc-400 text-sm mt-0.5">{item.secondary}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={300}>
                        <GitHubActivity />
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default About;
