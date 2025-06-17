const express = require('express');
const router = express.Router();

const generateCreativePrompt = require('../../utils/generateCreativePrompt');
const generateGeminiResponse = require('../../utils/generateGeminiResponse');

router.post('/', async (req, res) => {
  const { userInput } = req.body;

  try {
    // Step 1: Generate descriptive video prompt from user input
    console.log("Generating...");
    const prompt = await generateCreativePrompt(userInput);

    console.log("Prompt:", prompt);

    // Step 2: Simulate video generation using that prompt
    const result = await generateGeminiResponse(prompt);

    res.status(200).json({
      promptUsed: prompt,
      videoUrl: result.videoPath,
      message: result.debugInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { generateVideo } = require('../../utils/generateVideo');

// router.post('/', async (req, res) => {
//   const { prompt } = req.body;
//   if (!prompt) {
//     return res.status(400).json({ error: 'Prompt is required' });
//   }

//   try {
//     // Generate a unique filename based on timestamp
//     const filename = `video_${Date.now()}`;
    
//     // Generate the video (mock implementation)
//     const videoUrl = await generateVideo(prompt, filename);
    
//     // Return the video URL
//     res.json({ videoUrl });
//   } catch (error) {
//     console.error('Video generation error:', error);
//     res.status(500).json({ error: 'Failed to generate video' });
//   }
// });

// module.exports = router;
