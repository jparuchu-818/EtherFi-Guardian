'use client';

import { useState, useEffect } from 'react';

export default function ScoreBreakdown({ scoreBreakdown }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    {
      key: 'audit',
      title: 'Audit Coverage',
      icon: '🔍',
      maxScore: 5,
      data: scoreBreakdown.audit,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      key: 'dependency',
      title: 'Dependencies',
      icon: '🔗',
      maxScore: 3,
      data: scoreBreakdown.dependency,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    {
      key: 'compensation',
      title: 'Compensation',
      icon: '💰',
      maxScore: 2,
      data: scoreBreakdown.compensation,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className={`glass rounded-2xl p-6 shadow-xl hover-lift transition-all duration-500 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="mr-3 text-3xl animate-pulse-slow">📊</span>
        Score Breakdown
      </h2>

      <div className="space-y-6">
        {categories.map((category, index) => (
          <div 
            key={category.key} 
            className={`space-y-3 p-4 rounded-xl ${category.bgColor} border ${category.borderColor} hover:scale-[1.02] transition-transform duration-300`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl animate-pulse-slow">{category.icon}</span>
                <span className="text-white font-semibold text-lg">{category.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold text-2xl count-up">
                  {category.data.score}
                </span>
                <span className="text-gray-400 text-sm">/{category.maxScore}</span>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="relative w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
              <div
                className={`h-full bg-gradient-to-r ${category.color} rounded-full progress-bar shadow-lg`}
                style={{ 
                  width: isVisible ? `${(category.data.score / category.maxScore) * 100}%` : '0%',
                  boxShadow: '0 0 20px currentColor'
                }}
              />
            </div>

            {/* Summary */}
            <p className="text-gray-300 text-sm pl-11 leading-relaxed">
              {category.data.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Overall Score Summary */}
      <div className="mt-6 pt-6 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Overall Progress</span>
          <span className="text-white font-semibold">
            {((categories.reduce((sum, cat) => sum + cat.data.score, 0) / 
              categories.reduce((sum, cat) => sum + cat.maxScore, 0)) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2 mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full progress-bar"
            style={{ 
              width: isVisible ? `${((categories.reduce((sum, cat) => sum + cat.data.score, 0) / 
                categories.reduce((sum, cat) => sum + cat.maxScore, 0)) * 100).toFixed(0)}%` : '0%'
            }}
          />
        </div>
      </div>
    </div>
  );
}
