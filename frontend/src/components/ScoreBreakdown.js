export default function ScoreBreakdown({ scoreBreakdown }) {
  const categories = [
    {
      key: 'audit',
      title: 'Audit Coverage',
      icon: '🔍',
      maxScore: 5,
      data: scoreBreakdown.audit
    },
    {
      key: 'dependency',
      title: 'Dependencies',
      icon: '🔗',
      maxScore: 3,
      data: scoreBreakdown.dependency
    },
    {
      key: 'compensation',
      title: 'Compensation',
      icon: '💰',
      maxScore: 2,
      data: scoreBreakdown.compensation
    }
  ];

  const getBarColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-[#1a1f3a] rounded-2xl p-6 shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="mr-3">📊</span>
        Score Breakdown
      </h2>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-white font-semibold">{category.title}</span>
              </div>
              <span className="text-gray-400 text-sm">
                {category.data.score}/{category.maxScore}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${getBarColor(category.data.score, category.maxScore)} transition-all duration-1000`}
                style={{ width: `${(category.data.score / category.maxScore) * 100}%` }}
              />
            </div>

            {/* Summary */}
            <p className="text-gray-400 text-sm pl-11">
              {category.data.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}