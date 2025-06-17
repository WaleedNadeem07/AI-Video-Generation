import React, { useState } from 'react';
import './App.css';
import SuplimaxForm, { SuplimaxFormData } from './components/SuplimaxForm';
import RealEstateForm, { RealEstateFormData } from './components/RealEstateForm';
import VideoDisplay from './components/VideoDisplay';
import { cleanPromptFormatting } from './utils/promptUtils';

// The two different types of videos we can generate
type UseCase = 'suplimax' | 'real-estate';

function App() {
  // Keep track of which form the user wants to see
  const [useCase, setUseCase] = useState<UseCase>('suplimax');
  
  // Show a loading spinner while we're generating the video
  const [loading, setLoading] = useState(false);
  
  // Store the video URL once it's generated
  const [videoUrl, setVideoUrl] = useState('');
  
  // Keep the AI-generated prompt so we can show it to the user
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  // All the data for the Suplimax energy drink form
  const [suplimaxData, setSuplimaxData] = useState<SuplimaxFormData>({
    productFeatures: '',
    tone: 'energetic',
    targetAudience: 'young-adults',
    videoStyle: 'dynamic'
  });

  // All the data for the real estate form (pre-filled with a nice Beverly Hills property)
  const [realEstateData, setRealEstateData] = useState<RealEstateFormData>({
    propertyDetails: '12012 Crest Ct, Beverly Hills, CA 90210 - $10,183,985 - 5 bedrooms, 6.5 bathrooms, 6,100 sq ft - Luxury estate with three-car garage, landscaped grounds, elegant entrance with grand staircase, modern design, prime Beverly Hills location',
    tourStyle: 'luxury',
    focusAreas: ['exterior', 'living-areas', 'kitchen', 'bedrooms', 'bathrooms'],
    duration: 'medium'
  });

  // Handle when user submits the Suplimax form
  const handleSuplimaxSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't do anything if they didn't fill in the product features
    if (!suplimaxData.productFeatures.trim()) return;

    // Show loading spinner and clear any previous results
    setLoading(true);
    setVideoUrl('');
    setGeneratedPrompt('');

    // Package up all the form data to send to our backend
    const requestData = { 
      useCase: 'suplimax',
      formData: suplimaxData
    };

    console.log('Sending Suplimax data:', requestData);

    try {
      // Send the data to our backend API
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        setVideoUrl(data.videoUrl);
        // Clean up the AI prompt and show it to the user
        setGeneratedPrompt(data.promptUsed ? cleanPromptFormatting(data.promptUsed) : '');
      } else {
        console.error('API Error:', data.error);
      }
    } catch (err) {
      console.error('Request failed:', err);
    } finally {
      // Hide the loading spinner
      setLoading(false);
    }
  };

  // Handle when user submits the real estate form
  const handleRealEstateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show loading spinner and clear any previous results
    setLoading(true);
    setVideoUrl('');
    setGeneratedPrompt('');

    // Package up all the form data to send to our backend
    const requestData = { 
      useCase: 'real-estate',
      formData: realEstateData
    };

    console.log('Sending Real Estate data:', requestData);

    try {
      // Send the data to our backend API
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        setVideoUrl(data.videoUrl);
        // Clean up the AI prompt and show it to the user
        setGeneratedPrompt(data.promptUsed ? cleanPromptFormatting(data.promptUsed) : '');
      } else {
        console.error('API Error:', data.error);
      }
    } catch (err) {
      console.error('Request failed:', err);
    } finally {
      // Hide the loading spinner
      setLoading(false);
    }
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* The header bar at the top */}
      <nav className="bg-white shadow-md py-4 px-8 fixed top-0 w-full z-10">
        <h1 className="text-2xl font-bold text-purple-700">🎬 AI Video Generator</h1>
      </nav>

      {/* Main content area */}
      <div className="pt-24 flex flex-col items-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
          {/* Let user pick which type of video they want to make */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Use Case:</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setUseCase('suplimax')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  useCase === 'suplimax'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🥤 Suplimax Energy Drink Marketing
              </button>
              <button
                onClick={() => setUseCase('real-estate')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  useCase === 'real-estate'
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🏠 Real Estate Video Tour
              </button>
            </div>
          </div>

          {/* Show the right form based on what the user picked */}
          {useCase === 'suplimax' && (
            <SuplimaxForm
              formData={suplimaxData}
              setFormData={setSuplimaxData}
              onSubmit={handleSuplimaxSubmit}
              loading={loading}
            />
          )}

          {useCase === 'real-estate' && (
            <RealEstateForm
              formData={realEstateData}
              setFormData={setRealEstateData}
              onSubmit={handleRealEstateSubmit}
              loading={loading}
            />
          )}

          {/* Show the video and prompt once they're generated */}
          {videoUrl && (
            <VideoDisplay
              videoUrl={videoUrl}
              generatedPrompt={generatedPrompt}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;