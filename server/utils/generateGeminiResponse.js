// Simulated Gemini video generation
const path = require('path');

async function generateGeminiResponse(prompt) {
  if (!prompt) throw new Error('Prompt is required.');

  try {
    // Simulated processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Return simulated video path
    return {
      videoPath: '/videos/sample_mock_video.mp4',
      debugInfo: 'Mocked video for prompt: ' + prompt,
    };
  } catch (error) {
    console.error('Mock Gemini error:', error);
    throw new Error('Mock Gemini API failed');
  }
}

module.exports = generateGeminiResponse;
