import React, { useEffect, useState } from 'react';

const EasterEgg: React.FC = () => {
  const [showSecret, setShowSecret] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  
  // Konami Code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      
      if (key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        setKonamiIndex((prev) => prev + 1);
        
        if (konamiIndex + 1 === konamiCode.length) {
          setShowSecret(true);
          setKonamiIndex(0);
          
          // Auto-hide after 10 seconds
          setTimeout(() => setShowSecret(false), 10000);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiIndex]);

  if (!showSecret) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="text-center max-w-2xl px-6">
        <div className="text-6xl mb-6 animate-bounce">🎮</div>
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4">
          Konami Code Activated!
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          You found the secret! You're a true gamer and hacker at heart! 🎉
        </p>
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-6 mb-6">
          <p className="text-gray-200 mb-4 font-mono text-sm">
            "The best way to predict the future is to invent it." - Alan Kay
          </p>
          <p className="text-gray-400 text-xs">
            Secret Code: #DEVELOPER_LIFE_2026
          </p>
        </div>
        <div className="flex justify-center gap-4 text-sm text-gray-400">
          <span>Easter Egg #1</span>
          <span>|</span>
          <span>Try typing "matrix" in terminal 😉</span>
        </div>
        <button
          onClick={() => setShowSecret(false)}
          className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EasterEgg;
