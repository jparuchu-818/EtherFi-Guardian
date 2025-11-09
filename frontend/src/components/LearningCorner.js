'use client';

import { useState, useEffect } from 'react';

export default function LearningCorner({ learningCorner }) {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const terms = [
    {
      term: 'AVS',
      definition: learningCorner?.avs || 'An Actively Validated Service (AVS) is a decentralized service that requires validation by node operators.',
      icon: '🔐',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20'
    },
    {
      term: 'Restaking',
      definition: learningCorner?.restaking || 'Liquid Restaking allows you to use your staked assets to secure additional protocols while maintaining liquidity.',
      icon: '♻️',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      term: 'Trust Score',
      definition: 'A comprehensive metric that evaluates protocol safety based on audits, dependencies, and risk mitigation measures.',
      icon: '🎯',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    }
  ];

  return (
    <div className={`glass rounded-2xl p-6 shadow-xl hover-lift transition-all duration-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="mr-3 text-3xl animate-pulse-slow">📚</span>
        Learning Corner
      </h2>

      <div className="space-y-4">
        {terms.map((item, index) => (
          <div 
            key={index} 
            className={`${item.bgColor} border ${item.borderColor} rounded-xl p-5 hover:border-opacity-60 transition-all duration-300 cursor-pointer group hover:scale-[1.02]`}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold text-lg">{item.term}</h3>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className={`text-gray-300 text-sm leading-relaxed transition-all duration-300 ${expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-20 opacity-80'} overflow-hidden`}>
                  {item.definition}
                </p>
                {expandedIndex === index && (
                  <div className="mt-3 pt-3 border-t border-gray-700/50 animate-fade-in">
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center transition-colors">
                      Learn more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700/50">
        <a 
          href="#" 
          className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center justify-center transition-all duration-300 group"
        >
          Explore full documentation
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
