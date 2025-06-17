import React, { useState } from 'react';
import './App.css';

type UseCase = 'suplimax' | 'real-estate';

interface SuplimaxFormData {
  productFeatures: string;
  tone: 'energetic' | 'professional' | 'casual' | 'luxury';
  targetAudience: 'young-adults' | 'athletes' | 'professionals' | 'students';
  videoStyle: 'dynamic' | 'elegant' | 'sporty' | 'modern';
}

interface RealEstateFormData {
  propertyDetails: string;
  tourStyle: 'luxury' | 'family-friendly' | 'modern' | 'classic';
  focusAreas: string[];
  duration: 'short' | 'medium' | 'long';
}

function App() {
  const [useCase, setUseCase] = useState<UseCase>('suplimax');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  // Helper function to clean up markdown formatting
  const cleanPromptFormatting = (prompt: string): string => {
    return prompt
      // Remove markdown bold formatting
      .replace(/\*\*(.*?)\*\*/g, '$1')
      // Remove markdown italic formatting
      .replace(/\*(.*?)\*/g, '$1')
      // Remove markdown headers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove excessive line breaks (more than 2 consecutive)
      .replace(/\n{3,}/g, '\n\n')
      // Clean up any remaining markdown artifacts
      .replace(/^\*\s+/gm, '• ') // Convert * lists to bullet points
      .replace(/^-\s+/gm, '• ') // Convert - lists to bullet points
      .trim();
  };

  // Suplimax form data
  const [suplimaxData, setSuplimaxData] = useState<SuplimaxFormData>({
    productFeatures: '',
    tone: 'energetic',
    targetAudience: 'young-adults',
    videoStyle: 'dynamic'
  });

  // Real estate form data
  const [realEstateData, setRealEstateData] = useState<RealEstateFormData>({
    propertyDetails: '12012 Crest Ct, Beverly Hills, CA 90210 - $10,183,985 - 5 bedrooms, 6.5 bathrooms, 6,100 sq ft - Luxury estate with three-car garage, landscaped grounds, elegant entrance with grand staircase, modern design, prime Beverly Hills location',
    tourStyle: 'luxury',
    focusAreas: ['exterior', 'living-areas', 'kitchen', 'bedrooms', 'bathrooms'],
    duration: 'medium'
  });

  const handleSuplimaxSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suplimaxData.productFeatures.trim()) return;

    setLoading(true);
    setVideoUrl('');
    setGeneratedPrompt('');

    const requestData = { 
      useCase: 'suplimax',
      formData: suplimaxData
    };

    console.log('Sending Suplimax data:', requestData);

    try {
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
        setGeneratedPrompt(data.promptUsed ? cleanPromptFormatting(data.promptUsed) : '');
      } else {
        console.error('API Error:', data.error);
      }
    } catch (err) {
      console.error('Request failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRealEstateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setVideoUrl('');
    setGeneratedPrompt('');

    const requestData = { 
      useCase: 'real-estate',
      formData: realEstateData
    };

    console.log('Sending Real Estate data:', requestData);

    try {
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
        setGeneratedPrompt(data.promptUsed ? cleanPromptFormatting(data.promptUsed) : '');
      } else {
        console.error('API Error:', data.error);
      }
    } catch (err) {
      console.error('Request failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFocusAreaChange = (area: string) => {
    setRealEstateData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-8 fixed top-0 w-full z-10">
        <h1 className="text-2xl font-bold text-purple-700">🎬 AI Video Generator</h1>
      </nav>

      {/* Main Content */}
      <div className="pt-24 flex flex-col items-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
          {/* Use Case Selector */}
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

          {/* Suplimax Form */}
          {useCase === 'suplimax' && (
            <form onSubmit={handleSuplimaxSubmit} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Suplimax Energy Drink Marketing Video</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Product Features *
                </label>
                <textarea
                  value={suplimaxData.productFeatures}
                  onChange={(e) => setSuplimaxData(prev => ({ ...prev, productFeatures: e.target.value }))}
                  placeholder="Describe the key features of Suplimax energy drink (e.g., natural ingredients, long-lasting energy, great taste, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                  <select
                    value={suplimaxData.tone}
                    onChange={(e) => setSuplimaxData(prev => ({ ...prev, tone: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <option value="energetic">Energetic</option>
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                  <select
                    value={suplimaxData.targetAudience}
                    onChange={(e) => setSuplimaxData(prev => ({ ...prev, targetAudience: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <option value="young-adults">Young Adults (18-25)</option>
                    <option value="athletes">Athletes</option>
                    <option value="professionals">Professionals</option>
                    <option value="students">Students</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Style</label>
                  <select
                    value={suplimaxData.videoStyle}
                    onChange={(e) => setSuplimaxData(prev => ({ ...prev, videoStyle: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <option value="dynamic">Dynamic</option>
                    <option value="elegant">Elegant</option>
                    <option value="sporty">Sporty</option>
                    <option value="modern">Modern</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Generating Suplimax Video...' : '🎥 Generate Suplimax Marketing Video'}
              </button>
            </form>
          )}

          {/* Real Estate Form */}
          {useCase === 'real-estate' && (
            <form onSubmit={handleRealEstateSubmit} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Real Estate Video Tour Generator</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Details
                </label>
                <textarea
                  value={realEstateData.propertyDetails}
                  onChange={(e) => setRealEstateData(prev => ({ ...prev, propertyDetails: e.target.value }))}
                  placeholder="Property details will be pre-filled with the Beverly Hills listing"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tour Style</label>
                  <select
                    value={realEstateData.tourStyle}
                    onChange={(e) => setRealEstateData(prev => ({ ...prev, tourStyle: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="luxury">Luxury</option>
                    <option value="family-friendly">Family-Friendly</option>
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select
                    value={realEstateData.duration}
                    onChange={(e) => setRealEstateData(prev => ({ ...prev, duration: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="short">Short (30-60 sec)</option>
                    <option value="medium">Medium (1-2 min)</option>
                    <option value="long">Long (2-3 min)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Focus Areas</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'exterior', label: 'Exterior' },
                    { value: 'living-areas', label: 'Living Areas' },
                    { value: 'kitchen', label: 'Kitchen' },
                    { value: 'bedrooms', label: 'Bedrooms' },
                    { value: 'bathrooms', label: 'Bathrooms' },
                    { value: 'garage', label: 'Garage' },
                    { value: 'landscaping', label: 'Landscaping' },
                    { value: 'entrance', label: 'Entrance' }
                  ].map(area => (
                    <label key={area.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={realEstateData.focusAreas.includes(area.value)}
                        onChange={() => handleFocusAreaChange(area.value)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{area.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Generating Property Tour...' : '🎥 Generate Property Tour Video'}
              </button>
            </form>
          )}

          {/* Video Display */}
          {videoUrl && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Video</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <video
                  controls
                  className="rounded-lg border border-gray-300 w-full max-w-2xl mx-auto"
                >
                  <source src={`http://localhost:5000${videoUrl}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="mt-4 text-center">
                  <a
                    href={`http://localhost:5000${videoUrl}`}
                    download
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    📥 Download Video
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Prompt Display */}
          {generatedPrompt && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Prompt</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">AI-Generated Video Prompt:</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    title="Copy to clipboard"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="bg-white border border-gray-300 rounded-md p-3 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {generatedPrompt}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;