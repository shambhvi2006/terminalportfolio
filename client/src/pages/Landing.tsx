import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { ASCII_PORTRAIT } from '../data/asciiArt';
import './landing.css';

const ASCII_FACE = ASCII_PORTRAIT;

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete && displayedText.length === text.length) {
      onComplete();
    }
  }, [displayedText, text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showContent, setShowContent] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [asciiVisible, setAsciiVisible] = useState(false);

  useEffect(() => {
    // Trigger ASCII art animation after a short delay
    const timer = setTimeout(() => setAsciiVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="min-h-screen bg-black text-pink-400 font-mono overflow-hidden relative">
      {/* Animated grid background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none grid-animation-pink">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-400 to-transparent"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-8">
        <div className="w-full max-w-6xl">
          {/* Header with ASCII art */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center mb-8 md:mb-12">
            {/* Image Section */}
            <div className={`flex justify-center transition-all duration-1000 ${asciiVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <img 
                src="/image.png" 
                alt="Shambhvi Sharma" 
                className="max-w-xs md:max-w-sm w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Text Section */}
            <div className="space-y-4 md:space-y-6">
              <div className="text-2xl md:text-5xl font-bold text-pink-300 mb-2 md:mb-4 text-glow-pink">
                <Typewriter 
                  text="Shambhvi Sharma" 
                  speed={80}
                  onComplete={() => setShowContent(true)}
                />
                <span className="typewriter-cursor-pink">_</span>
              </div>

              {showContent && (
                <div className="space-y-3 md:space-y-4 animate-in fade-in duration-700">
                  <div className="text-xs md:text-base leading-relaxed">
                    <Typewriter 
                      text="Computer Engineering Student" 
                      speed={40}
                    />
                  </div>

                  <div className="text-xs md:text-sm text-pink-300 opacity-80 leading-relaxed">
                    <Typewriter 
                      text="Building backend systems, data pipelines & full-stack applications with MERN stack." 
                      speed={30}
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="pt-4 md:pt-6 space-y-2 md:space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {['about', 'skills', 'projects'].map((item) => (
                        <button
                          key={item}
                          onClick={() => handleNavigate('/portfolio')}
                          onMouseEnter={() => setHoveredSection(item)}
                          onMouseLeave={() => setHoveredSection(null)}
                          className={`px-3 md:px-4 py-1 md:py-2 border-2 border-pink-400 text-xs md:text-sm font-mono transition-all duration-300 transform hover-lift terminal-button-pink ${
                            hoveredSection === item
                              ? 'bg-pink-400 text-black shadow-lg shadow-pink-400/50 animate-pulse-glow-pink'
                              : 'bg-transparent text-pink-400 hover:bg-pink-400/10 hover:shadow-md hover:shadow-pink-400/30'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {['resume', 'contact'].map((item) => (
                        <button
                          key={item}
                          onClick={() => handleNavigate('/portfolio')}
                          onMouseEnter={() => setHoveredSection(item)}
                          onMouseLeave={() => setHoveredSection(null)}
                          className={`px-3 md:px-4 py-1 md:py-2 border-2 border-pink-400 text-xs md:text-sm font-mono transition-all duration-300 transform hover-lift terminal-button-pink ${
                            hoveredSection === item
                              ? 'bg-pink-400 text-black shadow-lg shadow-pink-400/50 animate-pulse-glow-pink'
                              : 'bg-transparent text-pink-400 hover:bg-pink-400/10 hover:shadow-md hover:shadow-pink-400/30'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scroll indicator */}
          {showContent && (
            <div className="flex justify-center mt-12 md:mt-16 animate-float">
              <ChevronDown className="w-6 h-6 text-pink-400/50 hover-glow-pink" />
            </div>
          )}
        </div>
      </div>

      {/* Footer with terminal prompt */}
      <div className="fixed bottom-4 left-4 right-4 text-xs text-pink-400/50 font-mono hover:text-pink-400/80 transition-colors">
        <div className="flex items-center gap-2">
          <span>$</span>
          <span className="terminal-cursor-pink"></span>
        </div>
      </div>
    </div>
  );
}
