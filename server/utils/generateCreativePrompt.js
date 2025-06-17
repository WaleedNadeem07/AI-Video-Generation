// Import the Gemini SDK
const { GoogleGenAI } = require('@google/genai');

// Load API key securely
const ai = new GoogleGenAI({ apiKey: "AIzaSyDEQ2J9uYBXrs7DQ-NKmmlbqlM6EqHKx_Q" });

async function generateCreativePrompt(userInput) {
    if (!userInput) throw new Error('User input is required.');
    
    console.log("KEY", process.env.GEMINI_API_KEY);

  try {
      
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Generate a vivid, cinematic, video-generation-ready prompt for the following user idea. Provide only the prompt itself, without any introductory or concluding remarks, explanations, or multiple options:\n\n"${userInput}"`,
      });
      console.log(response.text);

    return response.text;
  } catch (error) {
    console.error('Prompt generation error:', error);
    throw new Error('Failed to generate prompt');
  }
}

module.exports = generateCreativePrompt;
