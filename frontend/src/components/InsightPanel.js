export default function InsightPanel({ insightPanel }) {
  return (
    <div className="bg-[#1a1f3a] rounded-2xl p-6 shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <span className="mr-3">💡</span>
        Key Insights
      </h2>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm">ℹ️</span>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Performance Analysis</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {insightPanel.summary}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">✅</span>
              <span className="text-green-400 font-semibold">Strengths</span>
            </div>
            <p className="text-gray-300 text-xs">
              Strong audit coverage and transparent documentation
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">⚠️</span>
              <span className="text-yellow-400 font-semibold">Watch Out</span>
            </div>
            <p className="text-gray-300 text-xs">
              Multiple AVS dependencies increase complexity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}