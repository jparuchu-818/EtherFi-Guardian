'use client';

import { useState, useEffect } from 'react';

export default function InsightPanel({ insightPanel }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`glass rounded-2xl p-6 shadow-xl hover-lift transition-all duration-500 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="mr-3 text-3xl animate-pulse-slow">��</span>
        Key Insights
      </h2>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl p-5 hover:border-indigo-500/50 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg animate-pulse-slow">
              <span className="text-white text-lg">ℹ️</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2 flex items-center">
                Performance Analysis
                <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                  Healthy
                </span>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {insightPanel.summary}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-5 hover:border-green-500/50 transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-3xl group-hover:scale-110 transition-transform">✅</span>
              <span className="text-green-400 font-semibold text-lg">Strengths</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Strong audit coverage and transparent documentation
            </p>
            <div className="mt-3 pt-3 border-t border-green-500/20">
              <span className="text-green-400 text-xs font-semibold">Risk Level: Low</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-5 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-3xl group-hover:scale-110 transition-transform">⚠️</span>
              <span className="text-yellow-400 font-semibold text-lg">Watch Out</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Multiple AVS dependencies increase complexity
            </p>
            <div className="mt-3 pt-3 border-t border-yellow-500/20">
              <span className="text-yellow-400 text-xs font-semibold">Risk Level: Medium</span>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all">
            <div className="text-2xl font-bold text-indigo-400 count-up">99.5%</div>
            <div className="text-xs text-gray-400 mt-1">Uptime</div>
          </div>
          <div className="text-center p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all">
            <div className="text-2xl font-bold text-purple-400 count-up">8</div>
            <div className="text-xs text-gray-400 mt-1">AVS Partners</div>
          </div>
          <div className="text-center p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all">
            <div className="text-2xl font-bold text-green-400 count-up">2</div>
            <div className="text-xs text-gray-400 mt-1">Audits</div>
          </div>
        </div>
      </div>
    </div>
  );
}
