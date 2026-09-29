import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import MatrixRain from "./components/MatrixRain";
import CursorEffect from "./components/CursorEffect";
import EasterEgg from "./components/EasterEgg";
import BootIntro from "./components/BootIntro";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
            <MatrixRain />
            <CursorEffect />
            <EasterEgg />
            <BootIntro />
            <div className="relative z-10">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
