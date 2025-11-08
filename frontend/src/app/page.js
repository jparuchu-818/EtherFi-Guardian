'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TrustScoreCard from '../components/TrustScoreCard';
import ScoreBreakdown from '../components/ScoreBreakdown';
import InsightPanel from '../components/InsightPanel';
import LearningCorner from '../components/LearningCorner';
import { fetchAnalysis } from '../lib/api';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const analysisData = await fetchAnalysis();
        setData(analysisData);
      } catch (err) {
        setError('Failed to load analysis data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-red-400 font-bold mb-2">Error</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            EtherFi Protocol Analysis
          </h1>
          <p className="text-gray-400">
            Comprehensive risk assessment powered by AI
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Trust Score (spans 1 column) */}
          <div className="lg:col-span-1">
            <TrustScoreCard trustScore={data.trustScore} />
          </div>

          {/* Right Column - Details (spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <ScoreBreakdown scoreBreakdown={data.scoreBreakdown} />
            <InsightPanel insightPanel={data.insightPanel} />
          </div>
        </div>

        {/* Learning Corner - Full Width */}
        <div className="mt-6">
          <LearningCorner learningCorner={data.learningCorner} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            Built with 💙 for EigenLayer Hackathon 2024
          </p>
        </footer>
      </main>
    </div>
  );
}