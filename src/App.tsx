import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Terminal from './components/Terminal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MatrixRain from './components/MatrixRain';
import CursorEffect from './components/CursorEffect';
import EasterEgg from './components/EasterEgg';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      <MatrixRain />
      <CursorEffect />
      <EasterEgg />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Terminal />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
