'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500 opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              filter: 'blur(60px)',
              transform: `scale(${Math.random() * 2 + 0.5})`,
              animation: `pulse ${Math.random() * 15 + 10}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Logo/Title */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-white">
              Abdullah's
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
              Recipe Generator
            </h2>
            <p className="text-xl md:text-2xl text-purple-100 max-w-lg mx-auto">
              Create delicious recipes with AI magic
            </p>
          </div>

          {/* Login Button */}
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden px-12 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">Login to Get Started</span>
            {isHovered && (
              <span className="absolute inset-0 bg-white opacity-10 animate-pulse"></span>
            )}
          </button>

          {/* Featured Recipes Preview */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {['Italian', 'Asian', 'Dessert'].map((cuisine) => (
              <div 
                key={cuisine}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer border border-white/10"
              >
                <div className="text-purple-200 text-sm mb-1">{cuisine}</div>
                <div className="text-white font-medium">Popular Recipes</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-8 text-center text-purple-200 text-sm">
        <p>© {new Date().getFullYear()} Abdullah's Recipe Generator. All rights reserved.</p>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 0.6; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}