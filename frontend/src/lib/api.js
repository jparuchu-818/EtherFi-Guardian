// API Integration - Now connects to real backend!

const BACKEND_URL = 'http://localhost:8000';

// Mock data as fallback
const mockResponse = {
  "trustScore": 8.5,
  "scoreBreakdown": {
    "audit": {
      "score": 4.5,
      "summary": "EtherFi has been audited by Quantstamp and Trail of Bits with no critical issues found."
    },
    "dependency": {
      "score": 2.5,
      "summary": "EtherFi currently integrates with 8 Actively Validated Services (EigenDA, AltLayer, etc.), introducing moderate dependency risk."
    },
    "compensation": {
      "score": 1.5,
      "summary": "EtherFi Terms of Use indicate user-assumed risk and no explicit insurance or compensation fund."
    }
  },
  "insightPanel": {
    "summary": "Validator performance has remained consistent with 99.5% APY over recent periods."
  },
  "learningCorner": {
    "avs": "An Actively Validated Service (AVS) is a decentralized service that requires validation by node operators.",
    "restaking": "Liquid Restaking allows you to use your staked assets to secure additional protocols while maintaining liquidity."
  }
};

export async function fetchAnalysis() {
  try {
    console.log('🔄 Fetching from backend API...');
    
    const response = await fetch(`${BACKEND_URL}/api/v1/analyze`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Data received from backend:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Backend API Error:', error.message);
    console.log('⚠️  Falling back to mock data');
    
    // Fallback to mock data if backend is unavailable
    return mockResponse;
  }
}
