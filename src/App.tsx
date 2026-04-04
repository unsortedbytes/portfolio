import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import MatrixRain from "./components/MatrixRain";
import CursorEffect from "./components/CursorEffect";
import EasterEgg from "./components/EasterEgg";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="min-h-screen bg-gray-950 relative overflow-hidden">
            <MatrixRain />
            <CursorEffect />
            <EasterEgg />
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
