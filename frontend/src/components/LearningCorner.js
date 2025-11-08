export default function LearningCorner({ learningCorner }) {
  const terms = [
    {
      term: 'AVS',
      definition: learningCorner?.avs || 'An Actively Validated Service (AVS) is a decentralized service that requires validation by node operators.',
      icon: '🔐'
    },
    {
      term: 'Restaking',
      definition: learningCorner?.restaking || 'Liquid Restaking allows you to use your staked assets to secure additional protocols while maintaining liquidity.',
      icon: '♻️'
    },
    {
      term: 'Trust Score',
      definition: 'A comprehensive metric that evaluates protocol safety based on audits, dependencies, and risk mitigation measures.',
      icon: '🎯'
    }
  ];

  return (
    <div className="bg-[#1a1f3a] rounded-2xl p-6 shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="mr-3">📚</span>
        Learning Corner
      </h2>

      <div className="space-y-4">
        {terms.map((item, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h3 className="text-white font-bold mb-1">{item.term}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.definition}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <a 
          href="#" 
          className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center transition"
        >
          Learn more about liquid restaking
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}