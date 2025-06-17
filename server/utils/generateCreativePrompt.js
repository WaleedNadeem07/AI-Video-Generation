// Import the Gemini SDK
const { GoogleGenAI } = require('@google/genai');

// Load API key securely
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "AIzaSyDEQ2J9uYBXrs7DQ-NKmmlbqlM6EqHKx_Q"});

/**
 * Generates a vivid, cinematic video prompt based on user input or use case.
 * Always returns only the prompt text, without extra explanation.
 * 
 * @param {string|object} input - User text or object with { userInput, formData, useCase }
 * @returns {Promise<string>}
 */
async function generateCreativePrompt(input) {
  console.log('generateCreativePrompt received input:', JSON.stringify(input, null, 2));
  
  // Support both plain string and object usage
  let userInput = typeof input === 'string' ? input : input?.userInput || '';
  const useCase = input?.useCase || '';
  const formData = input?.formData || {};

  console.log('Extracted values:', {
    userInput: userInput || 'empty',
    useCase,
    formData: Object.keys(formData).length > 0 ? 'present' : 'empty'
  });

  // If no userInput is provided, construct it from formData
  if ((!userInput || userInput.trim() === '') && formData && Object.keys(formData).length > 0) {
    console.log('Constructing userInput from formData...');
    if (useCase === 'suplimax') {
      userInput = `Create a marketing video for Suplimax energy drink with the following features: ${formData.productFeatures}. 
      Tone: ${formData.tone}, Target Audience: ${formData.targetAudience}, Video Style: ${formData.videoStyle}`;
    } else if (useCase === 'real-estate') {
      userInput = `Create a real estate property tour video with the following details: ${formData.propertyDetails}. 
      Tour Style: ${formData.tourStyle}, Duration: ${formData.duration}, Focus Areas: ${formData.focusAreas.join(', ')}`;
    }
    console.log('Constructed userInput:', userInput);
  }

  if (!userInput) throw new Error('User input or form data is required.');

  // Check for use case and build a system prompt accordingly
  let systemPrompt = '';
  if (useCase === 'suplimax' || userInput.includes('Suplimax energy drink')) {
    systemPrompt = `Generate a vivid, cinematic, video-generation-ready prompt for a Suplimax energy drink marketing video. 
    The prompt should be highly detailed and include:
    - Visual description of the Suplimax energy drink can/bottle with the name clearly visible
    - Dynamic camera movements and transitions
    - Specific lighting and color schemes
    - Background settings and environments
    - People or lifestyle elements that match the target audience
    - Product demonstration and benefits visualization
    - Cinematic shots and professional editing style

    Provide only the prompt itself, without any introductory or concluding remarks.`;
    } else if (useCase === 'real-estate' || userInput.includes('real estate')) {
        systemPrompt = `Generate a vivid, cinematic, video-generation-ready prompt for a luxury real estate property tour video. 
    The prompt should be highly detailed and include:
    - Smooth camera movements through different rooms and areas
    - Professional lighting and staging
    - Architectural details and luxury finishes
    - Outdoor spaces and landscaping
    - Lifestyle elements that showcase the property's appeal
    - Professional real estate presentation style
    - Cinematic drone shots and elegant transitions

    Provide only the prompt itself, without any introductory or concluding remarks.`;
    } else {
        systemPrompt = `Generate a vivid, cinematic, video-generation-ready prompt for the following user idea. 
    The prompt should be highly detailed and include:
    - Specific visual elements and scenes
    - Camera movements and angles
    - Lighting and atmosphere
    - Color schemes and mood
    - Professional cinematic quality

    Provide only the prompt itself, without any introductory or concluding remarks, explanations, or multiple options.`;
  }

  // Combine the instruction and user input
  const fullPrompt = `${systemPrompt}\n\n"${userInput}"`;
  
  console.log('Final prompt being sent to Gemini:', fullPrompt);

  try {
    const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `${fullPrompt}`,
        });
        console.log('Gemini response:', response.text);
    return response.text;
  } catch (error) {
    console.error("Prompt generation error:", error);
    throw new Error("Failed to generate prompt");
  }
}

module.exports = generateCreativePrompt;