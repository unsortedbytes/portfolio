import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
    { name: "Home",         href: "/",          type: "route"  },
    { name: "About",        href: "#about",      type: "anchor" },
    { name: "Experience",   href: "#experience", type: "anchor" },
    { name: "Projects",     href: "#projects",   type: "anchor" },
    { name: "Skills",       href: "#skills",     type: "anchor" },
    { name: "Contact",      href: "#contact",    type: "anchor" },
    { name: "Live Projects",href: "/projects",   type: "route"  },
];

const NAVBAR_HEIGHT = 80;

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent, anchor: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        if (location.pathname !== "/") {
            window.location.assign(`/${anchor}`);
            return;
        }

        const id = anchor.replace("#", "");
        const el = document.getElementById(id);
        if (!el) return;

        const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
    };

    const linkClass = `font-medium transition-colors duration-200 hover:text-amber-400 ${
        isScrolled ? "text-zinc-300" : "text-white"
    }`;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800"
                    : "bg-transparent"
            }`}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className={`flex items-center gap-3 font-bold transition-colors duration-200 ${
                            isScrolled ? "text-amber-400" : "text-white"
                        }`}
                    >
                        <img src="/favicon.svg" alt="Logo" className="w-7 h-7" />
                        <span className="hidden sm:inline text-lg tracking-wide">UNSORTEDBYTES</span>
                        <span className="sm:hidden">UB</span>
                    </Link>

                    {/* Desktop */}
                    <div className="hidden md:flex items-center gap-7">
                        {NAV_ITEMS.map((item) =>
                            item.type === "route" ? (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`${linkClass} ${
                                        location.pathname === item.href ? "text-amber-400" : ""
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className={linkClass}
                                >
                                    {item.name}
                                </a>
                            )
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-3 pb-3 border-t border-zinc-800 pt-3 flex flex-col gap-1">
                        {NAV_ITEMS.map((item) =>
                            item.type === "route" ? (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="py-2 text-zinc-300 hover:text-amber-400 font-medium transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="py-2 text-zinc-300 hover:text-amber-400 font-medium transition-colors"
                                    onClick={(e) => scrollToSection(e, item.href)}
                                >
                                    {item.name}
                                </a>
                            )
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
