"use client";

import { useEffect, useState } from "react";

export default function AdminLoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Preparing dashboard");

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.8;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 30);

    const textOptions = [
      "Preparing dashboard",
      "Loading hostel data",
      "Setting up management tools",
      "Retrieving analytics",
    ];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % textOptions.length;
      setLoadingText(textOptions[textIndex]);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="relative w-80 h-80 mb-6">
        <svg viewBox="0 0 240 240" className="w-full h-full">
          <rect x="30" y="40" width="180" height="140" rx="4" fill="#f4f4f4" stroke="#902920" strokeWidth="2" />
          <rect x="30" y="40" width="180" height="20" rx="4" fill="#902920" />
          <rect x="40" y="70" width="160" height="10" rx="2" fill="#e0e0e0">
            <animate attributeName="fill" values="#e0e0e0;#d0d0d0;#e0e0e0" dur="1.5s" repeatCount="indefinite" />
          </rect>

          {/* Panels */}
          <g>
            {/* Stats Panel */}
            <rect x="40" y="90" width="50" height="40" rx="2" fill="#f0f0f0" stroke="#902920" strokeWidth="1" />
            <rect x="45" y="95" width="40" height="5" rx="1" fill="#902920" opacity="0.7" />
            <rect x="45" y="105" width="30" height="3" rx="1" fill="#902920" opacity="0.5">
              <animate attributeName="width" values="30;40;30" dur="2s" repeatCount="indefinite" />
            </rect>
            <rect x="45" y="112" width="25" height="3" rx="1" fill="#902920" opacity="0.5">
              <animate attributeName="width" values="25;35;25" dur="2.3s" repeatCount="indefinite" />
            </rect>
            <rect x="45" y="119" width="35" height="3" rx="1" fill="#902920" opacity="0.5">
              <animate attributeName="width" values="35;25;35" dur="1.8s" repeatCount="indefinite" />
            </rect>

            {/* List Panel */}
            <rect x="95" y="90" width="50" height="80" rx="2" fill="#f0f0f0" stroke="#902920" strokeWidth="1" />
            <rect x="100" y="95" width="40" height="5" rx="1" fill="#902920" opacity="0.7" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x="100"
                y={105 + i * 12}
                width="40"
                height="8"
                rx="1"
                fill="#e0e0e0"
              >
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </rect>
            ))}

            {/* Chart Panel */}
            <rect x="150" y="90" width="50" height="40" rx="2" fill="#f0f0f0" stroke="#902920" strokeWidth="1" />
            <rect x="155" y="95" width="40" height="5" rx="1" fill="#902920" opacity="0.7" />
            <polyline
              points="155,120 160,115 165,118 170,110 175,112 180,105 185,115 190,112"
              fill="none"
              stroke="#902920"
              strokeWidth="1.5"
              strokeDasharray="40"
              strokeDashoffset="40"
            >
              <animate attributeName="stroke-dashoffset" values="40;0;40" dur="3s" repeatCount="indefinite" />
            </polyline>

            {/* Calendar Panel */}
            <rect x="150" y="135" width="50" height="35" rx="2" fill="#f0f0f0" stroke="#902920" strokeWidth="1" />
            <rect x="155" y="140" width="40" height="5" rx="1" fill="#902920" opacity="0.7" />
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={155 + col * 10}
                  y={150 + row * 7}
                  width="8"
                  height="5"
                  rx="1"
                  fill="#f0f0f0"
                  stroke="#902920"
                  strokeWidth="0.5"
                >
                  {(row + col) % 2 === 0 && (
                    <animate attributeName="fill" values="#f0f0f0;#ffe0e0;#f0f0f0" dur={`${1 + (row + col) * 0.5}s`} repeatCount="indefinite" />
                  )}
                </rect>
              ))
            )}

            {/* Notification */}
            <circle cx="190" cy="50" r="4" fill="#fff">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Admin Figure */}
            <g transform="translate(60, 180)">
              <rect x="-7" y="0" width="14" height="20" rx="4" fill="#902920" />
              <circle cx="0" cy="-5" r="7" fill="#902920" />
              <rect x="-15" y="0" width="8" height="4" rx="2" fill="#902920" transform="rotate(-20, -15, 0)">
                <animate attributeName="transform" values="rotate(-20, -15, 0);rotate(-30, -15, 0);rotate(-20, -15, 0)" dur="2s" repeatCount="indefinite" />
              </rect>
              <rect x="7" y="0" width="8" height="4" rx="2" fill="#902920" transform="rotate(20, 15, 0)">
                <animate attributeName="transform" values="rotate(20, 15, 0);rotate(30, 15, 0);rotate(20, 15, 0)" dur="2s" repeatCount="indefinite" begin="1s" />
              </rect>
              <rect x="-7" y="20" width="4" height="10" rx="2" fill="#902920" />
              <rect x="3" y="20" width="4" height="10" rx="2" fill="#902920" />
            </g>

            {/* Building */}
            <g transform="translate(170, 180)">
              <rect x="-12" y="-22" width="24" height="22" fill="none" stroke="#902920" strokeWidth="1.5" />
              {[
                { x: -8, y: -18, delay: "0s" },
                { x: -8, y: -10, delay: "0.5s" },
                { x: 4, y: -18, delay: "1s" },
                { x: 4, y: -10, delay: "1.5s" },
              ].map((win, idx) => (
                <rect key={idx} x={win.x} y={win.y} width="4" height="4" fill="#902920" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" begin={win.delay} />
                </rect>
              ))}
              <rect x="-2" y="-8" width="4" height="8" fill="#902920" />
            </g>

            {/* Connecting Line */}
            <line x1="70" y1="180" x2="160" y2="180" stroke="#902920" strokeWidth="1" strokeDasharray="3,2">
              <animate attributeName="stroke-dashoffset" values="0;5;0" dur="3s" repeatCount="indefinite" />
            </line>
          </g>
        </svg>
      </div>

      {/* Loading Text */}
      <p className="text-center text-sm text-gray-700 mb-2">{loadingText}</p>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#902920] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
