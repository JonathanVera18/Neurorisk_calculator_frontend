// test-api.js
// Run this with: node test-api.js

const API_URL = 'http://localhost:8000/api/v1';

// Test data matching the exact format from your PowerShell test
const testData = {
  age: 30,
  gender: "M",
  consanguinity: false,
  family_neuro_history: true,
  seizures_history: false,
  brain_injury_history: false,
  psychiatric_diagnosis: true,
  substance_use: false,
  suicide_ideation: false,
  psychotropic_medication: true,
  birth_complications: false,
  extreme_poverty: false,
  education_access_issues: false,
  healthcare_access: true,
  disability_diagnosis: false,
  social_support_level: "moderate",
  breastfed_infancy: true,
  violence_exposure: false
};

// Function to test the API
async function testAPI() {
  console.log('🧪 Testing NeuroRisk API...\n');
  
  try {
    // 1. Test Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await fetch(`${API_URL.replace('/api/v1', '')}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);
    console.log('');
    
    // 2. Test Prediction Endpoint
    console.log('2️⃣ Testing Prediction Endpoint...');
    const predictionResponse = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    if (!predictionResponse.ok) {
      throw new Error(`API Error: ${predictionResponse.status} ${predictionResponse.statusText}`);
    }
    
    const predictionData = await predictionResponse.json();
    console.log('✅ Prediction Response:');
    console.log(JSON.stringify(predictionData, null, 2));
    console.log('');
    
    // 3. Test with different scenarios
    console.log('3️⃣ Testing Different Risk Scenarios...\n');
    
    // Low risk scenario
    const lowRiskData = {
      ...testData,
      family_neuro_history: false,
      psychiatric_diagnosis: false,
      psychotropic_medication: false,
      social_support_level: "strong"
    };
    
    console.log('Testing LOW RISK scenario...');
    const lowRiskResponse = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lowRiskData)
    });
    const lowRiskResult = await lowRiskResponse.json();
    console.log(`Risk Level: ${lowRiskResult.risk_level} (${Math.round(lowRiskResult.risk_score * 100)}%)`);
    console.log('');
    
    // High risk scenario
    const highRiskData = {
      ...testData,
      consanguinity: true,
      seizures_history: true,
      suicide_ideation: true,
      extreme_poverty: true,
      violence_exposure: true,
      social_support_level: "isolated",
      healthcare_access: false,
      breastfed_infancy: false
    };
    
    console.log('Testing HIGH RISK scenario...');
    const highRiskResponse = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(highRiskData)
    });
    const highRiskResult = await highRiskResponse.json();
    console.log(`Risk Level: ${highRiskResult.risk_level} (${Math.round(highRiskResult.risk_score * 100)}%)`);
    console.log('Risk Factors:', highRiskResult.risk_factors);
    console.log('');
    
    console.log('✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testAPI();