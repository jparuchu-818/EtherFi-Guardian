export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-[#0a0e27]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">EtherFi Guardian</h1>
              <p className="text-xs text-gray-400">Risk Analysis Dashboard</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition">Dashboard</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Analytics</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Learn</a>
          </nav>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
}