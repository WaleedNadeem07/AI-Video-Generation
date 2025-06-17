// Simulated Gemini video generation
const path = require('path');

async function generateGeminiResponse(prompt) {
  if (!prompt) throw new Error('Prompt is required.');

  try {
    // Simulated processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Extract use case information from prompt for better debugging
    let useCaseInfo = 'General video';
    if (prompt.includes('Suplimax energy drink')) {
      useCaseInfo = 'Suplimax Energy Drink Marketing Video';
    } else if (prompt.includes('virtual property tour') || prompt.includes('real estate')) {
      useCaseInfo = 'Real Estate Property Tour Video';
    }

    // Return simulated video path with detailed debug info
    return {
      videoPath: '/videos/sample_mock_video.mp4',
      debugInfo: `Mocked ${useCaseInfo} generated with prompt: ${prompt.substring(0, 200)}...`,
    };
  } catch (error) {
    console.error('Mock Gemini error:', error);
    throw new Error('Mock Gemini API failed');
  }
}

module.exports = generateGeminiResponse;
