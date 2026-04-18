import React, { useState, useEffect, useRef } from "react";

interface TerminalLine {
    type: "command" | "output" | "error";
    content: string;
}

const Terminal: React.FC = () => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<TerminalLine[]>([
        {
            type: "output",
            content: "Welcome to Aditya's Interactive Terminal!",
        },
        { type: "output", content: 'Type "help" to see available commands.' },
        { type: "output", content: "" },
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isSnakeGame, setIsSnakeGame] = useState(false);
    const [isTypingTest, setIsTypingTest] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const commands: { [key: string]: () => void } = {
        help: () => {
            addOutput([
                "Available commands:",
                "  help        - Show this help message",
                "  about       - Learn about me",
                "  skills      - View my technical skills",
                "  projects    - List my projects",
                "  experience  - Show work experience",
                "  contact     - Get my contact information",
                "  education   - View education details",
                "  achievements- Show achievements",
                "  snake       - Play Snake game",
                "  clear       - Clear terminal",
                "  ls          - List available commands",
                "  whoami      - Display user info",
                "  date        - Show current date and time",
                "  echo <text> - Echo back text",
                "  github      - Open my GitHub profile",
                "  linkedin    - Open LinkedIn profile",
                "  email       - Open email client",
                "  resume      - Download my resume",
                "  matrix      - Enter the Matrix 😎",
                "  ascii       - Display ASCII art",
                "  neofetch    - System information",
                "",
            ]);
            addOutput([
                "Aditya Kumar",
                "Software Developer | Backend Specialist",
                "IIT Kharagpur",
                "",
                "I'm a passionate developer specializing in backend development",
                "with Python, FastAPI, and cloud infrastructure. Currently working",
                "at House of Amber, building scalable enterprise applications.",
                "",
            ]);
        },
        about: () => {
            addOutput([
                "About Aditya Kumar:",
                "A backend-focused software developer with experience in Python, FastAPI, Rust, and cloud infrastructure.",
                "Currently working at House of Amber, building scalable enterprise applications.",
                "",
                "IIT Kharagpur graduate and a passionate programmer who loves building practical and production-ready systems.",
                "",
            ]);
        },
        skills: () => {
            addOutput([
                "Technical Skills:",
                "  Languages: Rust, Golang, TypeScript, Python, C++",
                "  Backend: FastAPI, Django, Node.js, Express",
                "  Frontend: React, Next.js, Tailwind CSS",
                "  Databases: PostgreSQL, MongoDB, Redis, MySQL",
                "  DevOps: Docker, Kubernetes, AWS",
                "",
            ]);
        },
        projects: () => {
            addOutput([
                "Featured Projects:",
                "",
                "1. Mystery Messaging",
                "   Anonymous messaging app with AI suggestions",
                "   Tech: Next.js, TypeScript, NextAuth",
                "",
                "2. University Library Management System",
                "   Production-grade system with DDoS protection",
                "   Tech: Next.js, PostgreSQL, Redis",
                "",
                "3. Maven AI",
                "   AI-powered marketing content generator",
                "   Tech: Python, AI/ML",
                "",
                "4. SwanSathi.com",
                "   Gold-loan management platform",
                "   Tech: React, Node.js",
                "",
            ]);
        },
        experience: () => {
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
            ]);
        },
        contact: () => {
            addOutput([
                "Contact Information:",
                "  Email: adi.bytes@gmail.com",
                "  Phone: +91-6207985419",
                "  GitHub: github.com/unsortedbytes",
                "  LinkedIn: linkedin.com/in/aditya-kumar-b7b79b22b/",
                "",
            ]);
        },
        snake: () => {
            addOutput([
                "Starting Snake Game...",
                "Use Arrow Keys to play. Press ESC to quit.",
                "",
            ]);
            setIsSnakeGame(true);
        },
        typing: () => {
            addOutput(["Starting Typing Speed Test...", "Get ready!", ""]);
            setIsTypingTest(true);
        },
        clear: () => {
            setHistory([]);
        },
        github: () => {
            addOutput(["Opening GitHub profile...", ""]);
            window.open("https://github.com/unsortedbytes", "_blank");
        },
        linkedin: () => {
            addOutput(["Opening LinkedIn profile...", ""]);
            window.open(
                "https://www.linkedin.com/in/aditya-kumar-b7b79b22b/",
                "_blank",
            );
        },
        matrix: () => {
            addOutput([
                "Wake up, Neo...",
                "The Matrix has you...",
                "Follow the white rabbit.",
                "",
                "Knock, knock, Neo.",
                "",
                "🐰 The Matrix Rain is already running in the background!",
                "Look closely at the falling green characters...",
                "",
            ]);
        },
        ascii: () => {
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
            ]);
        },
        education: () => {
            addOutput([
                "Education:",
                "",
                "Indian Institute of Technology Kharagpur",
                "Bachelor of Technology in Mechanical Engineering",
                "Duration: 2021 - 2025",
                "GPA: 7.64/10",
                "",
            ]);
        },
        achievements: () => {
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
            ]);
        },
        ls: () => {
            addOutput([
                "Available commands:",
                "help, about, skills, projects, experience, contact, education,",
                "achievements, snake, clear, ls, whoami, date, echo, github,",
                "linkedin, email, resume, matrix, ascii, neofetch",
                "",
            ]);
        },
        whoami: () => {
            addOutput([
                "Aditya Kumar",
                "Software Developer @ House of Amber",
                "B.Tech, Mechanical Engineering | IIT Kharagpur",
                "Software Developer | Backend Specialist",
                "",
            ]);
        },
        date: () => {
            const now = new Date();
            addOutput([
                now.toLocaleString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }),
                "",
            ]);
        },
        email: () => {
            addOutput(["Opening email client...", ""]);
            window.location.href = "mailto:adi.bytes@gmail.com";
        },
        neofetch: () => {
            addOutput([
                "           ___        _ _ _             ",
                "          / _ \\   __| (_) |_ _   _  __ _ ",
                "         / /_\\ \\ / _` | | __| | | |/ _` |",
                "        / /_\\  \\ | (_| | | |_| |_| | (_| |",
                "        \\____/\\/  \\__,_|_|\\__|\\__, |\\__,_|",
                "                                |___/        ",
                "",
                "  OS:           Portfolio v2026",
                "  Host:         IIT Kharagpur",
                "  Kernel:       React + TypeScript",
                "  Shell:        Interactive Terminal",
                "  Theme:        Matrix Dark Mode",
                "  CPU:          Python, Rust, JavaScript",
                "  GPU:          FastAPI, Next.js, Docker",
                "  Memory:       7.64 GPA",
                "  Uptime:       Software Developer since 2022",
                "",
            ]);
        },
        resume: () => {
            addOutput(["Downloading resume...", ""]);
            const link = document.createElement("a");
            link.href = "/Aditya_Kumar_Resume.pdf";
            link.download = "Aditya_Kumar_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => {
                addOutput(["Resume downloaded successfully!", ""]);
            }, 500);
        },
    };

    const availableCommands = [
        { name: 'help', description: 'Show available commands' },
        { name: 'about', description: 'Learn about me' },
        { name: 'skills', description: 'Show technical skills' },
        { name: 'projects', description: 'List projects' },
        { name: 'experience', description: 'Show work experience' },
        { name: 'contact', description: 'Get contact information' },
        { name: 'education', description: 'View education details' },
        { name: 'achievements', description: 'Show achievements' },
        { name: 'snake', description: 'Start Snake game' },
        { name: 'clear', description: 'Clear terminal output' },
        { name: 'ls', description: 'Show command list' },
        { name: 'whoami', description: 'Display identity' },
        { name: 'date', description: 'Show current date/time' },
        { name: 'github', description: 'Open GitHub profile' },
        { name: 'linkedin', description: 'Open LinkedIn profile' },
        { name: 'email', description: 'Open email client' },
        { name: 'resume', description: 'Download resume' },
        { name: 'matrix', description: 'Show Matrix easter egg' },
        { name: 'ascii', description: 'Display ASCII art' },
        { name: 'neofetch', description: 'Show system info' },
    ];

    const executeCommand = (cmd: string) => {
        handleCommand(cmd);
        setInput('');
        inputRef.current?.focus();
    };

    const addOutput = (lines: string[]) => {
        const newLines: TerminalLine[] = lines.map((line) => ({
            type: "output" as const,
            content: line,
        }));
        setHistory((prev) => [...prev, ...newLines]);
    };

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        const cmdLower = trimmedCmd.toLowerCase();

        setHistory((prev) => [
            ...prev,
            { type: "command", content: `$ ${cmd}` },
        ]);

        if (!trimmedCmd) {
            return;
        }

        // Handle echo command with arguments
        if (cmdLower.startsWith("echo ")) {
            const text = trimmedCmd.substring(5).trim();
            addOutput([text, ""]);
            setCommandHistory((prev) => [...prev, cmd]);
            setHistoryIndex(-1);
            return;
        }

        // Handle other commands
        const baseCmd = cmdLower.split(" ")[0];
        if (commands[baseCmd]) {
            commands[baseCmd]();
        } else {
            setHistory((prev) => [
                ...prev,
                {
                    type: "error",
                    content: `Command not found: ${baseCmd}. Type 'help' for available commands.`,
                },
                { type: "output", content: "" },
            ]);
        }

        setCommandHistory((prev) => [...prev, cmd]);
        setHistoryIndex(-1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            handleCommand(input);
            setInput("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex =
                    historyIndex === -1
                        ? commandHistory.length - 1
                        : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput("");
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        }
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    if (isSnakeGame) {
        return <SnakeGame onExit={() => setIsSnakeGame(false)} />;
    }

    if (isTypingTest) {
        return <TypingTest onExit={() => setIsTypingTest(false)} />;
    }

    return (
        <section id="terminal" className="py-20 bg-zinc-950">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-white mb-12 animate-fade-in">
                    Interactive Terminal
                </h2>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-zinc-900 rounded-lg shadow-2xl border border-zinc-800 overflow-hidden">
                        {/* Terminal Header */}
                        <div className="bg-zinc-900 px-4 py-2 flex items-center border-b border-zinc-800">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex-1 text-center text-zinc-400 text-sm font-mono">
                                aditya@portfolio:~
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="grid lg:grid-cols-[1.9fr_1fr] gap-6">
                            <div
                                ref={terminalRef}
                                className="p-4 h-96 overflow-y-auto font-mono text-sm bg-zinc-900 rounded-lg"
                                onClick={() => inputRef.current?.focus()}
                            >
                                {history.map((line, index) => (
                                    <div key={index} className="mb-1">
                                        {line.type === "command" && (
                                            <div className="text-amber-400">
                                                {line.content}
                                            </div>
                                        )}
                                        {line.type === "output" && (
                                            <div className="text-zinc-300">
                                                {line.content}
                                            </div>
                                        )}
                                        {line.type === "error" && (
                                            <div className="text-red-400">
                                                {line.content}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Input Line */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex items-center mt-2"
                                >
                                    <span className="text-amber-400 mr-2">$</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 bg-transparent text-zinc-300 outline-none border-none"
                                        spellCheck={false}
                                    />
                                    <span className="text-zinc-300 animate-typing">
                                        _
                                    </span>
                                </form>
                            </div>

                            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 h-96 overflow-y-auto">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            Command Box
                                        </h3>
                                        <p className="text-sm text-zinc-400">
                                            Click any command to run it instantly.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => executeCommand('help')}
                                        className="text-xs text-amber-300 hover:text-amber-100"
                                    >                                        Run help
                                    </button>
                                </div>
                                <div className="grid gap-2">
                                    {availableCommands.map((command) => (
                                        <button
                                            key={command.name}
                                            type="button"
                                            onClick={() => executeCommand(command.name)}
                                            className="w-full text-left rounded-lg border border-zinc-700 bg-zinc-950/80 px-3 py-2 transition hover:border-amber-500 hover:bg-amber-600/10"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-white">
                                                    {command.name}
                                                </span>
                                                <span className="text-xs text-zinc-400">
                                                    Run
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs text-zinc-400">
                                                {command.description}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Snake Game Component
const SnakeGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const gridSize = 20;
        const tileCount = canvas.width / gridSize;

        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 0;
        let dy = 0;
        let gameRunning = true;

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                gameRunning = false;
                onExit();
                return;
            }

            if (e.key === "ArrowUp" && dy === 0) {
                dx = 0;
                dy = -1;
            } else if (e.key === "ArrowDown" && dy === 0) {
                dx = 0;
                dy = 1;
            } else if (e.key === "ArrowLeft" && dx === 0) {
                dx = -1;
                dy = 0;
            } else if (e.key === "ArrowRight" && dx === 0) {
                dx = 1;
                dy = 0;
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        const gameLoop = setInterval(() => {
            if (!gameRunning) return;

            // Move snake
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };

            // Check collision with walls
            if (
                head.x < 0 ||
                head.x >= tileCount ||
                head.y < 0 ||
                head.y >= tileCount
            ) {
                setGameOver(true);
                gameRunning = false;
                return;
            }

            // Check collision with self
            if (
                snake.some(
                    (segment) => segment.x === head.x && segment.y === head.y,
                )
            ) {
                setGameOver(true);
                gameRunning = false;
                return;
            }

            snake.unshift(head);

            // Check if food eaten
            if (head.x === food.x && head.y === food.y) {
                setScore((prev) => prev + 10);
                food = {
                    x: Math.floor(Math.random() * tileCount),
                    y: Math.floor(Math.random() * tileCount),
                };
            } else {
                snake.pop();
            }

            // Draw
            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw grid
            ctx.strokeStyle = "#1a1a1a";
            for (let i = 0; i < tileCount; i++) {
                ctx.beginPath();
                ctx.moveTo(i * gridSize, 0);
                ctx.lineTo(i * gridSize, canvas.height);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, i * gridSize);
                ctx.lineTo(canvas.width, i * gridSize);
                ctx.stroke();
            }

            // Draw snake
            snake.forEach((segment, index) => {
                ctx.fillStyle = index === 0 ? "#fbbf24" : "#f59e0b";
                ctx.fillRect(
                    segment.x * gridSize + 1,
                    segment.y * gridSize + 1,
                    gridSize - 2,
                    gridSize - 2,
                );
            });

            // Draw food
            ctx.fillStyle = "#f97316";
            ctx.fillRect(
                food.x * gridSize + 1,
                food.y * gridSize + 1,
                gridSize - 2,
                gridSize - 2,
            );
        }, 100);

        return () => {
            clearInterval(gameLoop);
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [onExit]);

    return (
        <section
            id="snake-game"
            className="py-20 bg-zinc-950 min-h-screen flex items-center justify-center"
        >
            <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">
                    Snake Game
                </h2>
                <div className="mb-4">
                    <span className="text-xl text-amber-400 font-mono">
                        Score: {score}
                    </span>
                </div>
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    className="border-2 border-primary rounded-lg mx-auto shadow-2xl"
                />
                <div className="mt-6 text-zinc-400">
                    {gameOver ? (
                        <div>
                            <p className="text-2xl text-red-400 mb-4">
                                Game Over!
                            </p>
                            <p className="mb-4">Final Score: {score}</p>
                        </div>
                    ) : (
                        <p>Use Arrow Keys to move | Press ESC to exit</p>
                    )}
                    <button
                        onClick={onExit}
                        className="mt-4 px-6 py-2 bg-amber-500 text-dark-bg rounded-lg font-semibold hover:bg-amber-600 transition duration-300"
                    >
                        Back to Terminal
                    </button>
                </div>
            </div>
        </section>
    );
};

// Typing Test Component
const TypingTest: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [currentText, setCurrentText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [startTime, setStartTime] = useState<number>(0);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const inputRef = useRef<HTMLInputElement>(null);

    const sampleTexts = [
        "The quick brown fox jumps over the lazy dog while coding in JavaScript and debugging TypeScript errors.",
        "React hooks make functional components powerful. useState and useEffect are essential for modern development.",
        "Docker containers provide consistent environments across development and production deployments using Kubernetes.",
        "FastAPI delivers high-performance Python APIs with automatic documentation and type validation built-in.",
    ];

    useEffect(() => {
        setCurrentText(
            sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
        );
    }, []);

    const startTest = () => {
        setStarted(true);
        setStartTime(Date.now());
        setUserInput("");
        inputRef.current?.focus();
    };

    const handleInput = (value: string) => {
        setUserInput(value);

        if (value === currentText) {
            const endTime = Date.now();
            const timeInMinutes = (endTime - startTime) / 1000 / 60;
            const words = currentText.split(" ").length;
            const calculatedWpm = Math.round(words / timeInMinutes);
            setWpm(calculatedWpm);
            setFinished(true);
        }

        // Calculate accuracy
        const correctChars = value
            .split("")
            .filter((char, i) => char === currentText[i]).length;
        const acc =
            value.length > 0
                ? Math.round((correctChars / value.length) * 100)
                : 100;
        setAccuracy(acc);
    };

    const reset = () => {
        setStarted(false);
        setFinished(false);
        setUserInput("");
        setCurrentText(
            sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
        );
        setWpm(0);
        setAccuracy(100);
    };

    return (
        <section className="py-20 bg-zinc-950 min-h-screen flex items-center justify-center">
            <div className="max-w-4xl w-full px-6">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">
                    ⚡ Typing Speed Test
                </h2>

                {!started ? (
                    <div className="text-center">
                        <p className="text-zinc-300 mb-6">
                            Test your typing speed and accuracy!
                        </p>
                        <button
                            onClick={startTest}
                            className="px-8 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition duration-300"
                        >
                            Start Test
                        </button>
                    </div>
                ) : (
                    <div>
                        {/* Text to type */}
                        <div className="bg-zinc-800 rounded-lg p-6 mb-6 font-mono text-lg">
                            {currentText.split("").map((char, index) => {
                                let color = "text-zinc-400";
                                if (index < userInput.length) {
                                    color =
                                        userInput[index] === char
                                            ? "text-amber-400"
                                            : "text-red-400 bg-red-900/30";
                                } else if (index === userInput.length) {
                                    color = "text-white bg-amber-500/50";
                                }
                                return (
                                    <span key={index} className={color}>
                                        {char}
                                    </span>
                                );
                            })}
                        </div>

                        {/* Input */}
                        {!finished && (
                            <input
                                ref={inputRef}
                                type="text"
                                value={userInput}
                                onChange={(e) => handleInput(e.target.value)}
                                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg font-mono outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="Start typing..."
                            />
                        )}

                        {/* Stats */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                                <p className="text-zinc-400 text-sm mb-1">
                                    Accuracy
                                </p>
                                <p className="text-3xl font-bold text-amber-400">
                                    {accuracy}%
                                </p>
                            </div>
                            {finished && (
                                <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                                    <p className="text-zinc-400 text-sm mb-1">
                                        WPM
                                    </p>
                                    <p className="text-3xl font-bold text-amber-400">
                                        {wpm}
                                    </p>
                                </div>
                            )}
                        </div>

                        {finished && (
                            <div className="mt-6 text-center">
                                <p className="text-2xl text-amber-400 mb-4">
                                    ✨ Test Complete!
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={reset}
                                        className="px-6 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition duration-300"
                                    >
                                        Try Again
                                    </button>
                                    <button
                                        onClick={onExit}
                                        className="px-6 py-2 bg-zinc-700 text-white rounded-lg font-semibold hover:bg-zinc-600 transition duration-300"
                                    >
                                        Back to Terminal
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {(started || finished) && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={onExit}
                            className="text-zinc-400 hover:text-white transition duration-300"
                        >
                            Press ESC or click here to exit
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Terminal;
