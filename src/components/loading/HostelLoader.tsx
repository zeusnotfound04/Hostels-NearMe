"use client";
import { useEffect, useState } from "react";

export default function HostelLoader() {
  const [progress, setProgress] = useState<number>(0);
  const [stars, setStars] = useState<{ top: string; left: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 30);

    // Initialize star positions
    const generatedStars = Array.from({ length: 10 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 1 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="relative w-64 h-64 mb-8">
        {/* Hostel building outline */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Building outline */}
            <path
              d="M40,160 L40,60 L160,60 L160,160 L40,160 Z"
              fill="none"
              stroke="#902920"
              strokeWidth="4"
              className="animate-pulse"
            />

            {/* Roof */}
            <path d="M30,60 L100,30 L170,60" fill="none" stroke="#902920" strokeWidth="4" />

            {/* Door */}
            <rect x="85" y="120" width="30" height="40" fill="none" stroke="#902920" strokeWidth="3">
              <animate attributeName="y" values="120;118;120" dur="1s" repeatCount="indefinite" />
            </rect>

            {/* Windows */}
            <g className="windows">
              <rect x="55" y="75" width="20" height="20" fill="none" stroke="#902920" strokeWidth="2">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0s" repeatCount="indefinite" />
              </rect>
              <rect x="90" y="75" width="20" height="20" fill="none" stroke="#902920" strokeWidth="2">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <rect x="125" y="75" width="20" height="20" fill="none" stroke="#902920" strokeWidth="2">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="1s" repeatCount="indefinite" />
              </rect>
              <rect x="55" y="110" width="20" height="20" fill="none" stroke="#902920" strokeWidth="2">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="1.5s" repeatCount="indefinite" />
              </rect>
              <rect x="125" y="110" width="20" height="20" fill="none" stroke="#902920" strokeWidth="2">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.2s" repeatCount="indefinite" />
              </rect>
            </g>

            {/* People silhouettes moving */}
            <g className="people">
              <circle cx="60" cy="175" r="5" fill="#902920">
                <animate attributeName="cx" values="40;70;40" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="120" cy="175" r="5" fill="#902920">
                <animate attributeName="cx" values="160;130;160" dur="5s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Luggage */}
            <rect x="90" y="170" width="10" height="15" rx="2" fill="#902920">
              <animate
                attributeName="transform"
                type="rotate"
                values="0 95 178; 10 95 178; 0 95 178; -10 95 178; 0 95 178"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>

        {/* Animated stars */}
        <div className="absolute inset-0">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-500 rounded-full"
              style={{
                top: star.top,
                left: star.left,
                animation: `twinkle ${star.duration}s infinite ease-in-out ${star.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading text with typewriter effect */}
      <div className="text-2xl font-bold text-[#902920] mb-6 overflow-hidden whitespace-nowrap">
        <span className="inline-block animate-typing">Finding your perfect hostel...</span>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#902920] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-typing {
          animation: typing 3s steps(30) infinite alternate;
        }
      `}</style>
    </div>
  );
}
