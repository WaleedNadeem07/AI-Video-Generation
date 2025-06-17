const express = require('express');
const router = express.Router();

const generateCreativePrompt = require('../../utils/generateCreativePrompt');
const generateGeminiResponse = require('../../utils/generateGeminiResponse');

router.post('/', async (req, res) => {
  const { productFeatures, formData, useCase } = req.body;

  console.log('Received request:', {
    useCase,
    formData: formData ? 'present' : 'not present',
    productFeatures: productFeatures ? 'present' : 'not present',
  });

  console.log('Full request body:', JSON.stringify(req.body, null, 2));

  try {
    // Always use generateCreativePrompt to construct the prompt
    const prompt = await generateCreativePrompt({ productFeatures, formData, useCase });

    console.log("Final Prompt:", prompt);

    // Step 2: Simulate video generation using that prompt
    const result = await generateGeminiResponse(prompt);

    res.status(200).json({
      promptUsed: prompt,
      videoUrl: result.videoPath,
      message: result.debugInfo,
      useCase: useCase || 'general',
      formData: formData || null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
