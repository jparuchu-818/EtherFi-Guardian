'use client';

import { useState, useEffect } from 'react';

export default function TrustScoreCard({ trustScore }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Animated counter
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = trustScore / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= trustScore) {
        setCount(trustScore);
        clearInterval(timer);
      } else {
        setCount(Number(current.toFixed(1)));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [trustScore]);

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
  };

  const circumference = 2 * Math.PI * 88;
  const progress = (count / 10) * circumference;

  return (
    <div className={`bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 rounded-2xl p-8 shadow-2xl hover-lift glow transition-all duration-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Trust Score</h2>
        <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm text-white flex items-center space-x-2 animate-pulse-slow">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>Live Analysis</span>
        </span>
      </div>

      <div className="flex items-center justify-center mb-6 relative">
        {/* Decorative rings */}
        <div className="absolute w-52 h-52 rounded-full border-2 border-white/10 animate-pulse-slow"></div>
        <div className="absolute w-56 h-56 rounded-full border border-white/5"></div>
        
        <div className="relative z-10">
          <svg className="w-48 h-48 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="12"
              fill="none"
            />
            {/* Animated progress circle */}
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="white"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-6xl font-bold ${getScoreColor(count)} count-up`}>
              {count.toFixed(1)}
            </span>
            <span className="text-white text-sm mt-2 opacity-80">out of 10</span>
          </div>
        </div>
      </div>

      <div className="text-center space-y-3">
        <p className="text-white text-xl font-semibold">
          {getScoreLabel(count)} Security Rating
        </p>
        <p className="text-white/80 text-sm leading-relaxed">
          Based on audit coverage, dependencies, and compensation analysis
        </p>
        
        {/* Stats row */}
        <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4.5</div>
            <div className="text-xs text-white/60">Audit</div>
          </div>
          <div className="w-px bg-white/20"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">2.5</div>
            <div className="text-xs text-white/60">Dependencies</div>
          </div>
          <div className="w-px bg-white/20"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">1.5</div>
            <div className="text-xs text-white/60">Compensation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
