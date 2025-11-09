'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`border-b border-gray-800 sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0a0e27]/95 backdrop-blur-lg shadow-lg' 
          : 'bg-[#0a0e27]/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 animate-slide-in-left">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300 animate-pulse-slow">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer">
                EtherFi Guardian
              </h1>
              <p className="text-xs text-gray-400">Risk Analysis Dashboard</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6 animate-fade-in">
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              Analytics
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              Learn
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-105 animate-slide-in-right">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
}
