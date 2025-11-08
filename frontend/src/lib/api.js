// This file handles API integration
// For Phase 1, we use mock data. For Phase 2+, we'll connect to the real backend API

// Mock data embedded directly
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
  // Phase 1: Return mock data
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockResponse;

  // Phase 2: Uncomment this to use real backend
  /*
  try {
    const response = await fetch('http://localhost:8000/api/v1/analyze');
    if (!response.ok) {
      throw new Error('Failed to fetch analysis');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Fallback to mock data if API fails
    return mockResponse;
  }
  */
}