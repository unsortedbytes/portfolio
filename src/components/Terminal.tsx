import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import WaveBg from "./WaveBg";

interface TerminalLine {
    type: "command" | "output" | "error";
    content: string;
}

interface CommandSpec {
    description: string;
    /** Hidden commands still run, but are kept out of `help` / the manual panel. */
    hidden?: boolean;
    run: (args: string[]) => void;
}

const BANNER: TerminalLine[] = [
    { type: "output", content: "Welcome to unsortedbytes terminal ~" },
    { type: "output", content: 'Type "help" to see available commands.' },
    { type: "output", content: "Tip: Tab completes, ↑/↓ recalls, Ctrl+L clears." },
    { type: "output", content: "" },
];

const Terminal: React.FC = () => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isSnakeGame, setIsSnakeGame] = useState(false);
    const [isTypingTest, setIsTypingTest] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const addOutput = useCallback((lines: string[]) => {
        setHistory((prev) => [
            ...prev,
            ...lines.map((line) => ({ type: "output" as const, content: line })),
        ]);
    }, []);

    const addError = useCallback((line: string) => {
        setHistory((prev) => [
            ...prev,
            { type: "error", content: line },
            { type: "output", content: "" },
        ]);
    }, []);

    const commands = useMemo<Record<string, CommandSpec>>(() => {
        const registry: Record<string, CommandSpec> = {
            about: {
                description: "Learn about me",
                run: () =>
                    addOutput([
                        "About unsortedbytes:",
                        "A backend-focused software developer with experience in Python, FastAPI, Rust, and cloud infrastructure.",
                        "Currently working at House of Amber, building scalable enterprise applications.",
                        "",
                        "IIT Kharagpur graduate and a passionate programmer who loves building practical and production-ready systems.",
                        "",
                    ]),
            },
            skills: {
                description: "Show technical skills",
                run: () =>
                    addOutput([
                        "Technical Skills:",
                        "  Languages: Rust, Golang, TypeScript, Python, C++",
                        "  Backend:   FastAPI, Django, Node.js, Express",
                        "  Frontend:  React, Next.js, Tailwind CSS",
                        "  Databases: PostgreSQL, MongoDB, Redis, MySQL",
                        "  DevOps:    Docker, Kubernetes, AWS",
                        "",
                    ]),
            },
            projects: {
                description: "List projects",
                run: () =>
                    addOutput([
                        "Featured Projects:",
                        "",
                        "1. Job Application Tracker",
                        "   Chrome extension that auto-logs applications to Google Sheets",
                        "   Tech: JavaScript, Gemini AI, Google Sheets API",
                        "",
                        "2. Portmon",
                        "   Rust CLI that maps active TCP/UDP ports to Linux processes",
                        "   Tech: Rust, Linux, Networking",
                        "",
                        "3. University Library Management System",
                        "   Production-grade system with rate limiting and DDoS protection",
                        "   Tech: Next.js, PostgreSQL, Redis",
                        "",
                        "4. Mystery Messaging",
                        "   Anonymous messaging app with AI suggestions",
                        "   Tech: Next.js, TypeScript, NextAuth",
                        "",
                        "Scroll to the Projects section for source links.",
                        "",
                    ]),
            },
            experience: {
                description: "Show work experience",
                run: () =>
                    addOutput([
                        "Work Experience:",
                        "",
                        "Software Developer - Backend",
                        "House of Amber | May 2025 - Present",
                        "  • Improved response times by 30%",
                        "  • Handle 1M+ monthly requests",
                        "  • Tech: Python, FastAPI, Docker, AWS, Kubernetes",
                        "",
                        "Software Development Intern",
                        "Mahi Mahi Marketing Solution | Mar 2025 - Present",
                        "  • Developing Maven AI platform",
                        "",
                        "Software Developer Intern",
                        "Dhruva Capital | Feb 2025 - Present",
                        "  • Built DhruvaCapital.com and SwanSathi.com",
                        "",
                    ]),
            },
            education: {
                description: "View education details",
                run: () =>
                    addOutput([
                        "Education:",
                        "",
                        "Indian Institute of Technology Kharagpur",
                        "Bachelor of Technology in Mechanical Engineering",
                        "Duration: 2021 - 2025",
                        "GPA: 7.64/10",
                        "",
                    ]),
            },
            achievements: {
                description: "Show achievements",
                run: () =>
                    addOutput([
                        "Achievements & Distinctions:",
                        "",
                        "🎯 JEE Advanced 2021",
                        "   Top 2% rank among 1.6 lakh aspirants nationwide",
                        "",
                        "💻 Codeforces Rating: 1000+",
                        "   Strong problem-solving and algorithmic skills",
                        "",
                        "💡 200+ DSA Problems Solved",
                        "   Across competitive programming platforms",
                        "",
                        "🚀 Production-Grade Projects",
                        "   Multiple real-world applications deployed",
                        "",
                    ]),
            },
            contact: {
                description: "Get contact information",
                run: () =>
                    addOutput([
                        "Contact Information:",
                        "  Email:    adi.bytes@gmail.com",
                        "  Phone:    +91-6207985419",
                        "  GitHub:   github.com/unsortedbytes",
                        "  LinkedIn: linkedin.com/in/aditya-kumar-b7b79b22b/",
                        "",
                    ]),
            },
            snake: {
                description: "Start Snake game",
                run: () => {
                    addOutput([
                        "Starting Snake Game...",
                        "Use Arrow Keys to play. Press ESC to quit.",
                        "",
                    ]);
                    setIsSnakeGame(true);
                },
            },
            typing: {
                description: "Run a typing speed test",
                run: () => {
                    addOutput(["Starting Typing Speed Test...", "Get ready!", ""]);
                    setIsTypingTest(true);
                },
            },
            github: {
                description: "Open GitHub profile",
                run: () => {
                    addOutput(["Opening GitHub profile...", ""]);
                    window.open(
                        "https://github.com/unsortedbytes",
                        "_blank",
                        "noopener,noreferrer",
                    );
                },
            },
            linkedin: {
                description: "Open LinkedIn profile",
                run: () => {
                    addOutput(["Opening LinkedIn profile...", ""]);
                    window.open(
                        "https://www.linkedin.com/in/aditya-kumar-b7b79b22b/",
                        "_blank",
                        "noopener,noreferrer",
                    );
                },
            },
            email: {
                description: "Open email client",
                run: () => {
                    addOutput(["Opening email client...", ""]);
                    window.location.href = "mailto:adi.bytes@gmail.com";
                },
            },
            resume: {
                description: "Download resume",
                run: () => {
                    addOutput(["Downloading resume...", ""]);
                    const link = document.createElement("a");
                    link.href = "/Aditya_Kumar_Resume.pdf";
                    link.download = "Aditya_Kumar_Resume.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    addOutput(["Saved as Aditya_Kumar_Resume.pdf", ""]);
                },
            },
            whoami: {
                description: "Display identity",
                run: () =>
                    addOutput([
                        "unsortedbytes",
                        "Software Developer @ House of Amber",
                        "B.Tech, Mechanical Engineering | IIT Kharagpur",
                        "Software Developer | Backend Specialist",
                        "",
                    ]),
            },
            date: {
                description: "Show current date/time",
                run: () =>
                    addOutput([
                        new Date().toLocaleString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        }),
                        "",
                    ]),
            },
            echo: {
                description: "Echo back text",
                run: (args) => addOutput([args.join(" "), ""]),
            },
            matrix: {
                description: "Show Matrix easter egg",
                run: () =>
                    addOutput([
                        "Wake up, Neo...",
                        "The Matrix has you...",
                        "Follow the white rabbit.",
                        "",
                        "Knock, knock, Neo.",
                        "",
                        "🐰 The Matrix Rain is already running in the background!",
                        "Look closely at the falling characters...",
                        "",
                    ]),
            },
            ascii: {
                description: "Display ASCII art",
                run: () =>
                    addOutput([
                        "",
                        "     _       _ _ _",
                        "    / \\   __| (_) |_ _   _  __ _",
                        "   / _ \\ / _` | | __| | | |/ _` |",
                        "  / ___ \\ (_| | | |_| |_| | (_| |",
                        " /_/   \\_\\__,_|_|\\__|\\__, |\\__,_|",
                        "                      |___/",
                        "",
                        "  _  __",
                        " | |/ /   _ _ __ ___   __ _ _ __",
                        " | ' / | | '_ ` _ \\ / _` | '__|",
                        " | . \\ |_| | | | | | (_| | |",
                        " |_|\\_\\__,_|_| |_| |_|\\__,_|_|",
                        "",
                        "💻 Software Developer | IIT Kharagpur",
                        "",
                    ]),
            },
            neofetch: {
                description: "Show system info",
                run: () =>
                    addOutput([
                        "        ___        _ _ _             ",
                        "       / _ \\   __| (_) |_ _   _  __ _ ",
                        "      / /_\\ \\ / _` | | __| | | |/ _` |",
                        "     / /_\\  \\ | (_| | | |_| |_| | (_| |",
                        "     \\____/\\/  \\__,_|_|\\__|\\__, |\\__,_|",
                        "                             |___/     ",
                        "",
                        "  OS:      Portfolio v2026",
                        "  Host:    IIT Kharagpur",
                        "  Kernel:  React + TypeScript",
                        "  Shell:   Interactive Terminal",
                        "  Theme:   Amber Dark",
                        "  CPU:     Python, Rust, JavaScript",
                        "  GPU:     FastAPI, Next.js, Docker",
                        "  Memory:  7.64 GPA",
                        "  Uptime:  Software Developer since 2022",
                        "",
                    ]),
            },
            history: {
                description: "Show command history",
                run: () => {
                    if (commandHistory.length === 0) {
                        addOutput(["No commands yet.", ""]);
                        return;
                    }
                    addOutput([
                        ...commandHistory.map(
                            (cmd, i) => `  ${String(i + 1).padStart(3, " ")}  ${cmd}`,
                        ),
                        "",
                    ]);
                },
            },
            clear: {
                description: "Clear terminal output",
                run: () => setHistory([]),
            },
            sudo: {
                description: "Nice try",
                hidden: true,
                run: () =>
                    addOutput([
                        "unsortedbytes is not in the sudoers file.",
                        "This incident has been reported. 🫡",
                        "",
                    ]),
            },
            exit: {
                description: "Reset the session",
                hidden: true,
                run: () => setHistory(BANNER),
            },
        };

        registry.ls = {
            description: "Show command list",
            run: () =>
                addOutput([
                    Object.entries(registry)
                        .filter(([, spec]) => !spec.hidden)
                        .map(([name]) => name)
                        .join("  "),
                    "",
                ]),
        };

        registry.help = {
            description: "Show available commands",
            run: () =>
                addOutput([
                    "Available commands:",
                    ...Object.entries(registry)
                        .filter(([, spec]) => !spec.hidden)
                        .map(
                            ([name, spec]) =>
                                `  ${name.padEnd(12, " ")}- ${spec.description}`,
                        ),
                    "",
                    "unsortedbytes — Software Developer | Backend Specialist | IIT Kharagpur",
                    "Backend developer working with Python, FastAPI, Rust and cloud",
                    "infrastructure, currently at House of Amber.",
                    "",
                ]),
        };

        return registry;
    }, [addOutput, commandHistory]);

    /** Visible commands, in registry order, for the manual panel. */
    const availableCommands = useMemo(
        () =>
            Object.entries(commands)
                .filter(([, spec]) => !spec.hidden)
                .map(([name, spec]) => ({ name, description: spec.description })),
        [commands],
    );

    const handleCommand = useCallback(
        (raw: string) => {
            const trimmed = raw.trim();
            setHistory((prev) => [...prev, { type: "command", content: `$ ${trimmed}` }]);

            if (!trimmed) return;

            const [name, ...args] = trimmed.split(/\s+/);
            const spec = commands[name.toLowerCase()];

            if (spec) {
                spec.run(args);
            } else {
                addError(
                    `Command not found: ${name}. Type 'help' for available commands.`,
                );
            }

            setCommandHistory((prev) =>
                prev[prev.length - 1] === trimmed ? prev : [...prev, trimmed],
            );
            setHistoryIndex(-1);
        },
        [commands, addError],
    );

    const executeCommand = (cmd: string) => {
        handleCommand(cmd);
        setInput("");
        inputRef.current?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCommand(input);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length === 0) return;
            const newIndex =
                historyIndex === -1
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex === -1) return;
            const newIndex = historyIndex + 1;
            if (newIndex >= commandHistory.length) {
                setHistoryIndex(-1);
                setInput("");
            } else {
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const prefix = input.trim().toLowerCase();
            if (!prefix || prefix.includes(" ")) return;
            const matches = availableCommands
                .map((c) => c.name)
                .filter((name) => name.startsWith(prefix));
            if (matches.length === 1) {
                setInput(matches[0]);
            } else if (matches.length > 1) {
                // Complete as far as the shared prefix goes, then list the options.
                let shared = matches[0];
                matches.forEach((m) => {
                    while (!m.startsWith(shared)) shared = shared.slice(0, -1);
                });
                setInput(shared);
                setHistory((prev) => [
                    ...prev,
                    { type: "command", content: `$ ${input}` },
                    { type: "output", content: matches.join("  ") },
                    { type: "output", content: "" },
                ]);
            }
        } else if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
        } else if (e.key === "c" && e.ctrlKey) {
            e.preventDefault();
            setHistory((prev) => [...prev, { type: "command", content: `$ ${input}^C` }]);
            setInput("");
            setHistoryIndex(-1);
        }
    };

    /** Inline ghost-completion for the first matching command. */
    const suggestion = useMemo(() => {
        const prefix = input.toLowerCase();
        if (!prefix || prefix.includes(" ")) return "";
        const match = availableCommands.find((c) => c.name.startsWith(prefix));
        return match ? match.name.slice(prefix.length) : "";
    }, [input, availableCommands]);

    useEffect(() => {
        const el = terminalRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [history]);

    // Boot sequence: type the welcome line out, then drop in the rest.
    useEffect(() => {
        const full = BANNER[0].content;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            setHistory(BANNER);
            return;
        }
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            if (i >= full.length) {
                clearInterval(id);
                setHistory(BANNER);
            } else {
                setHistory([{ type: "output", content: full.slice(0, i) }]);
            }
        }, 28);
        return () => clearInterval(id);
    }, []);

    if (isSnakeGame) {
        return <SnakeGame onExit={() => setIsSnakeGame(false)} />;
    }

    if (isTypingTest) {
        return <TypingTest onExit={() => setIsTypingTest(false)} />;
    }

    return (
        <section id="terminal" className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <WaveBg className="opacity-[0.6]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-600/5 rounded-full blur-[160px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-3">Terminal</h2>
                    <div className="h-0.5 w-12 bg-amber-400 mx-auto rounded-full" />
                </div>

                {/* The "Notebook" Container */}
                <div className="max-w-6xl mx-auto relative">
                    {/* Notebook Shadow/Depth */}
                    <div className="absolute inset-0 bg-black/40 translate-x-4 translate-y-4 rounded-3xl blur-2xl" />

                    <div className="frame-glow relative bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden flex flex-col lg:flex-row shadow-2xl lg:h-[440px]">
                        {/* LEFT: Terminal */}
                        <div className="flex-1 min-w-0 bg-[#0c0c0c] flex flex-col overflow-hidden">
                            {/* Header */}
                            <div className="shrink-0 relative overflow-hidden bg-zinc-800/80 px-5 py-3 flex items-center justify-between border-b border-zinc-700/50">
                                {/* light sweeping across the chrome */}
                                <div className="header-sweep pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
                                <div className="flex items-center gap-3 relative">
                                    <div className="flex space-x-1.5">
                                        <div className="led-pulse w-2.5 h-2.5 rounded-full bg-amber-500" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                                        Console.Core.v2
                                    </span>
                                </div>
                                <div className="relative px-2 py-0.5 rounded border border-zinc-700 bg-zinc-900 text-[10px] font-mono text-amber-500/80">
                                    STABLE_BUILD
                                </div>
                            </div>

                            {/* Scrollable output */}
                            <div
                                ref={terminalRef}
                                className="flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed scanlines"
                                onClick={() => inputRef.current?.focus()}
                            >
                                {history.map((line, index) => (
                                    <div key={index} className="term-line mb-2">
                                        {line.type === "command" && (
                                            <div className="flex items-start gap-3">
                                                <span className="text-amber-500 font-black mt-0.5">
                                                    »
                                                </span>
                                                <span className="text-zinc-100 bg-zinc-800/50 px-2 py-0.5 rounded text-sm">
                                                    {line.content.replace("$ ", "")}
                                                </span>
                                            </div>
                                        )}
                                        {line.type === "output" && (
                                            <div className="text-zinc-400 ml-6 leading-relaxed border-l border-zinc-800/50 pl-3 whitespace-pre-wrap break-words">
                                                {line.content}
                                            </div>
                                        )}
                                        {line.type === "error" && (
                                            <div className="text-red-500/90 ml-6 flex items-center gap-2 italic bg-red-500/5 p-2 rounded border border-red-500/10">
                                                <span className="not-italic">⚠️</span>{" "}
                                                {line.content}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <form
                                    onSubmit={handleSubmit}
                                    className="flex items-center gap-3 mt-4"
                                >
                                    <span className="prompt-glow text-amber-500 font-black">
                                        »
                                    </span>
                                    {/* Ghost suggestion sits behind the caret-carrying input */}
                                    <div className="relative flex-1 min-w-0">
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 font-bold whitespace-pre overflow-hidden"
                                        >
                                            <span className="invisible">{input}</span>
                                            <span className="text-zinc-700">
                                                {suggestion}
                                            </span>
                                            {input && !suggestion && (
                                                <span className="blink text-amber-500">
                                                    ▌
                                                </span>
                                            )}
                                        </span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="relative w-full bg-transparent text-amber-400 outline-none border-none caret-amber-500 font-bold"
                                            spellCheck={false}
                                            autoComplete="off"
                                            aria-label="Terminal command input"
                                            placeholder={input ? "" : "type 'help'..."}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* CENTER BINDING */}
                        <div className="hidden lg:flex w-10 bg-zinc-950 shrink-0 items-center justify-center relative">
                            <div className="absolute inset-y-0 left-0 w-px bg-white/5" />
                            <div className="absolute inset-y-0 right-0 w-px bg-black/50" />
                            <div className="flex flex-col gap-6">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-5 h-1 bg-zinc-800 rounded-full"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Command reference */}
                        <div className="lg:w-[340px] shrink-0 bg-zinc-900 flex flex-col overflow-hidden max-h-[320px] lg:max-h-none">
                            {/* Header */}
                            <div className="shrink-0 px-5 py-4 border-b border-zinc-800 flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
                                    <svg
                                        className="w-3.5 h-3.5 text-zinc-950"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white leading-none">
                                        Manual
                                    </p>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">
                                        {availableCommands.length} commands
                                    </p>
                                </div>
                            </div>

                            {/* Scrollable command list — same height as terminal */}
                            <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
                                {availableCommands.map((command, i) => (
                                    <button
                                        key={command.name}
                                        type="button"
                                        onClick={() => executeCommand(command.name)}
                                        title={`Run ${command.name}`}
                                        style={{ animationDelay: `${i * 35}ms` }}
                                        className="cmd-row w-full group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 hover:translate-x-0.5 focus:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-amber-500/40 transition-all duration-200"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-amber-500 group-hover:scale-150 transition-all duration-200 shrink-0" />
                                        <span className="text-xs font-mono text-zinc-300 group-hover:text-amber-400 transition-colors">
                                            {command.name}
                                        </span>
                                        <span className="text-[11px] text-zinc-600 group-hover:text-zinc-400 transition-colors truncate">
                                            {command.description}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="shrink-0 px-5 py-3 border-t border-zinc-800 flex items-center justify-between">
                                <span className="text-[10px] font-mono text-zinc-600">
                                    by unsortedbytes
                                </span>
                                <span className="text-[10px] font-mono text-zinc-700">
                                    TAB ↹ · ↑ ↓ · ^L
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ── Snake Game ──────────────────────────────────────────────────────
type Point = { x: number; y: number };

const GRID = 20;
const CANVAS = 400;
const TILES = CANVAS / GRID;
const HIGH_SCORE_KEY = "snake-high-score";

const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
) => {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
};

const SnakeGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        const stored = Number(localStorage.getItem(HIGH_SCORE_KEY));
        return Number.isFinite(stored) ? stored : 0;
    });
    const [gameOver, setGameOver] = useState(false);
    const [started, setStarted] = useState(false);
    const [round, setRound] = useState(0);
    const scoreRef = useRef(0);
    const bestRef = useRef(highScore);

    const restart = () => {
        scoreRef.current = 0;
        setScore(0);
        setGameOver(false);
        setStarted(false);
        setRound((r) => r + 1);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        let snake: Point[] = [{ x: 10, y: 10 }];
        let dir: Point = { x: 0, y: 0 };
        let queued: Point | null = null;
        let food = spawnFood(snake);
        let running = true;

        function spawnFood(body: Point[]): Point {
            let next: Point;
            do {
                next = {
                    x: Math.floor(Math.random() * TILES),
                    y: Math.floor(Math.random() * TILES),
                };
            } while (body.some((s) => s.x === next.x && s.y === next.y));
            return next;
        }

        const draw = (time: number) => {
            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, CANVAS, CANVAS);

            ctx.strokeStyle = "#1a1a1a";
            for (let i = 0; i < TILES; i++) {
                ctx.beginPath();
                ctx.moveTo(i * GRID, 0);
                ctx.lineTo(i * GRID, CANVAS);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, i * GRID);
                ctx.lineTo(CANVAS, i * GRID);
                ctx.stroke();
            }

            // Body fades toward the tail; the head carries a soft glow.
            snake.forEach((segment, index) => {
                const fade = 1 - (index / Math.max(snake.length, 12)) * 0.55;
                ctx.globalAlpha = Math.max(fade, 0.35);
                ctx.shadowBlur = index === 0 ? 14 : 0;
                ctx.shadowColor = "rgba(255,94,26,0.9)";
                ctx.fillStyle = index === 0 ? "#FF8C5A" : "#FF5E1A";
                const r = index === 0 ? 5 : 3;
                roundRect(
                    ctx,
                    segment.x * GRID + 1,
                    segment.y * GRID + 1,
                    GRID - 2,
                    GRID - 2,
                    r,
                );
            });
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            // Food breathes so it reads at a glance.
            const pulse = 1 + Math.sin(time / 180) * 0.18;
            const size = (GRID - 6) * pulse;
            const offset = (GRID - size) / 2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = "rgba(240,240,240,0.6)";
            ctx.fillStyle = "#F0F0F0";
            roundRect(
                ctx,
                food.x * GRID + offset,
                food.y * GRID + offset,
                size,
                size,
                3,
            );
            ctx.shadowBlur = 0;
        };

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                running = false;
                onExit();
                return;
            }

            const moves: Record<string, Point> = {
                ArrowUp: { x: 0, y: -1 },
                ArrowDown: { x: 0, y: 1 },
                ArrowLeft: { x: -1, y: 0 },
                ArrowRight: { x: 1, y: 0 },
                w: { x: 0, y: -1 },
                s: { x: 0, y: 1 },
                a: { x: -1, y: 0 },
                d: { x: 1, y: 0 },
            };
            const move = moves[e.key];
            if (!move) return;

            e.preventDefault(); // stop arrow keys from scrolling the page
            // Reject 180° turns against the direction actually being drawn.
            if (snake.length > 1 && move.x === -dir.x && move.y === -dir.y) return;
            queued = move;
            setStarted(true);
        };

        window.addEventListener("keydown", handleKeyPress);

        // Rendering runs on its own rAF loop so the food/glow animate smoothly
        // between the 100ms logic ticks.
        let frame = 0;
        const render = (time: number) => {
            draw(time);
            frame = requestAnimationFrame(render);
        };
        frame = requestAnimationFrame(render);

        const loop = setInterval(() => {
            if (!running) return;

            if (queued) {
                dir = queued;
                queued = null;
            }

            // Idle until the first arrow key — no self-collision on a still snake.
            if (dir.x === 0 && dir.y === 0) return;

            const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

            const hitWall =
                head.x < 0 || head.x >= TILES || head.y < 0 || head.y >= TILES;
            const hitSelf = snake.some((s) => s.x === head.x && s.y === head.y);

            if (hitWall || hitSelf) {
                running = false;
                setGameOver(true);
                return;
            }

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                scoreRef.current += 10;
                setScore(scoreRef.current);
                if (scoreRef.current > bestRef.current) {
                    bestRef.current = scoreRef.current;
                    setHighScore(scoreRef.current);
                    localStorage.setItem(HIGH_SCORE_KEY, String(scoreRef.current));
                }
                food = spawnFood(snake);
            } else {
                snake.pop();
            }
        }, 100);

        return () => {
            running = false;
            clearInterval(loop);
            cancelAnimationFrame(frame);
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [onExit, round]);

    // Enter restarts once the run is over.
    useEffect(() => {
        if (!gameOver) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Enter") restart();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [gameOver]);

    return (
        <section
            id="snake-game"
            className="py-24 bg-zinc-950 min-h-screen flex items-center justify-center relative overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none">
                <WaveBg className="opacity-[0.4]" />
            </div>

            <div className="text-center relative z-10 px-6">
                <h2 className="text-4xl font-bold text-white mb-2">Snake</h2>
                <div className="h-0.5 w-12 bg-amber-400 mx-auto rounded-full mb-6" />

                <div className="flex items-center justify-center gap-8 mb-4 font-mono">
                    <span key={score} className="stat-pop text-amber-400 text-xl">
                        Score {score}
                    </span>
                    <span className="text-zinc-500 text-xl">Best {highScore}</span>
                </div>

                <div className="frame-glow relative inline-block rounded-xl">
                    <canvas
                        ref={canvasRef}
                        width={CANVAS}
                        height={CANVAS}
                        className="border border-zinc-800 rounded-xl mx-auto shadow-2xl bg-[#0a0a0a] max-w-full"
                    />
                    {!started && !gameOver && (
                        <div className="animate-fade-in absolute inset-0 flex items-center justify-center bg-zinc-950/70 rounded-xl">
                            <p className="font-mono text-sm text-amber-400 blink">
                                press an arrow key to start
                            </p>
                        </div>
                    )}
                    {gameOver && (
                        <div className="animate-fade-in absolute inset-0 flex flex-col items-center justify-center gap-2 bg-zinc-950/80 rounded-xl">
                            <p className="text-2xl font-bold text-red-500/90">Game Over</p>
                            <p className="font-mono text-sm text-zinc-400">
                                Final score {score}
                                {score > 0 && score >= highScore && " — new best!"}
                            </p>
                            <p className="font-mono text-xs text-zinc-600 mt-1">
                                press ENTER to play again
                            </p>
                        </div>
                    )}
                </div>

                <p className="mt-6 font-mono text-xs text-zinc-500">
                    Arrow keys / WASD to move · ESC to exit
                </p>

                <div className="mt-4 flex gap-3 justify-center">
                    <button
                        onClick={restart}
                        className="px-6 py-2 bg-amber-500 text-zinc-950 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200"
                    >
                        Restart
                    </button>
                    <button
                        onClick={onExit}
                        className="px-6 py-2 border border-zinc-700 text-zinc-300 rounded-lg font-semibold hover:border-amber-400/40 hover:text-amber-400 transition-colors duration-200"
                    >
                        Back to Terminal
                    </button>
                </div>
            </div>
        </section>
    );
};

// ── Typing Test ─────────────────────────────────────────────────────
const SAMPLE_TEXTS = [
    "The quick brown fox jumps over the lazy dog while coding in JavaScript and debugging TypeScript errors.",
    "React hooks make functional components powerful. useState and useEffect are essential for modern development.",
    "Docker containers provide consistent environments across development and production deployments using Kubernetes.",
    "FastAPI delivers high-performance Python APIs with automatic documentation and type validation built-in.",
    "Rust gives you memory safety without a garbage collector, which is why systems programmers keep reaching for it.",
];

const pickText = (exclude?: string) => {
    const pool = SAMPLE_TEXTS.filter((t) => t !== exclude);
    return pool[Math.floor(Math.random() * pool.length)];
};

const TypingTest: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [currentText, setCurrentText] = useState(() => pickText());
    const [userInput, setUserInput] = useState("");
    const [startTime, setStartTime] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const inputRef = useRef<HTMLInputElement>(null);

    // ESC leaves the test from anywhere, as the hint promises.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onExit();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onExit]);

    // Live timer while the test is running.
    useEffect(() => {
        if (!started || finished) return;
        const id = setInterval(() => setElapsed((Date.now() - startTime) / 1000), 100);
        return () => clearInterval(id);
    }, [started, finished, startTime]);

    const startTest = () => {
        setStarted(true);
        setFinished(false);
        setStartTime(Date.now());
        setElapsed(0);
        setUserInput("");
        setWpm(0);
        setAccuracy(100);
        inputRef.current?.focus();
    };

    const handleInput = (value: string) => {
        if (finished) return;
        setUserInput(value);

        const minutes = Math.max((Date.now() - startTime) / 1000 / 60, 1 / 60000);
        // Standard WPM: 5 characters count as one word.
        setWpm(Math.round(value.length / 5 / minutes));

        const correctChars = value
            .split("")
            .filter((char, i) => char === currentText[i]).length;
        setAccuracy(
            value.length > 0 ? Math.round((correctChars / value.length) * 100) : 100,
        );

        if (value === currentText) {
            setElapsed((Date.now() - startTime) / 1000);
            setFinished(true);
        }
    };

    const reset = () => {
        setStarted(false);
        setFinished(false);
        setUserInput("");
        setCurrentText(pickText(currentText));
        setElapsed(0);
        setWpm(0);
        setAccuracy(100);
    };

    return (
        <section className="py-24 bg-zinc-950 min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <WaveBg className="opacity-[0.4]" />
            </div>

            <div className="max-w-4xl w-full px-6 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-white mb-3">Typing Test</h2>
                    <div className="h-0.5 w-12 bg-amber-400 mx-auto rounded-full" />
                </div>

                {!started ? (
                    <div className="text-center">
                        <p className="text-zinc-400 mb-6">
                            Type the sample line as fast and as accurately as you can.
                        </p>
                        <button
                            onClick={startTest}
                            className="px-8 py-3 bg-amber-500 text-zinc-950 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200"
                        >
                            Start Test
                        </button>
                    </div>
                ) : (
                    <div>
                        {/* Text to type */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6 font-mono text-lg leading-relaxed">
                            {currentText.split("").map((char, index) => {
                                let color = "text-zinc-600";
                                if (index < userInput.length) {
                                    color =
                                        userInput[index] === char
                                            ? "text-amber-400"
                                            : "text-red-400 bg-red-500/15 rounded";
                                } else if (index === userInput.length) {
                                    color = "text-zinc-950 bg-amber-400 rounded";
                                }
                                return (
                                    <span key={index} className={color}>
                                        {char}
                                    </span>
                                );
                            })}
                        </div>

                        {!finished && (
                            <input
                                ref={inputRef}
                                type="text"
                                value={userInput}
                                onChange={(e) => handleInput(e.target.value)}
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                                aria-label="Typing test input"
                                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-3 rounded-xl font-mono outline-none focus:border-amber-500/60 caret-amber-500"
                                placeholder="Start typing..."
                            />
                        )}

                        {/* Stats */}
                        <div className="mt-6 grid grid-cols-3 gap-4">
                            {[
                                { label: "WPM", value: wpm },
                                { label: "Accuracy", value: `${accuracy}%` },
                                { label: "Time", value: `${elapsed.toFixed(1)}s` },
                            ].map((stat, i) => (
                                <div
                                    key={stat.label}
                                    style={{ animationDelay: `${i * 80}ms` }}
                                    className="cmd-row bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center transition-colors duration-200 hover:border-amber-500/30"
                                >
                                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">
                                        {stat.label}
                                    </p>
                                    <p className="text-3xl font-bold text-amber-400 font-mono tabular-nums">
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {finished && (
                            <div className="mt-6 text-center">
                                <p className="text-xl text-amber-400 mb-4 font-mono">
                                    ✨ {wpm} WPM at {accuracy}% accuracy
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={reset}
                                        className="px-6 py-2 bg-amber-500 text-zinc-950 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200"
                                    >
                                        Try Again
                                    </button>
                                    <button
                                        onClick={onExit}
                                        className="px-6 py-2 border border-zinc-700 text-zinc-300 rounded-lg font-semibold hover:border-amber-400/40 hover:text-amber-400 transition-colors duration-200"
                                    >
                                        Back to Terminal
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <button
                        onClick={onExit}
                        className="font-mono text-xs text-zinc-600 hover:text-amber-400 transition-colors duration-200"
                    >
                        press ESC or click here to exit
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Terminal;
