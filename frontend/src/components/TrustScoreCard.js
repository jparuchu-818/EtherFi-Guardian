export default function TrustScoreCard({ trustScore }) {
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

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-2xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Trust Score</h2>
        <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm text-white">
          Live Analysis
        </span>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="white"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${(trustScore / 10) * 553} 553`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-6xl font-bold ${getScoreColor(trustScore)}`}>
              {trustScore}
            </span>
            <span className="text-white text-sm mt-2">out of 10</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-white text-xl font-semibold mb-2">
          {getScoreLabel(trustScore)} Security Rating
        </p>
        <p className="text-white/80 text-sm">
          Based on audit coverage, dependencies, and compensation analysis
        </p>
      </div>
    </div>
  );
}