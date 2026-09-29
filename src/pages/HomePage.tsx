import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Terminal from "../components/Terminal";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import HudOverlay from "../components/HudOverlay";

export default function HomePage() {
    return (
        <>
            <HudOverlay />
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Terminal />
            <Contact />
            <Footer />
        </>
    );
}
