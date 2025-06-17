import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setVideoUrl('');

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        setVideoUrl(data.videoUrl);
      } else {
        console.error('API Error:', data.error);
      }
    } catch (err) {
      console.error('Request failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-8 fixed top-0 w-full z-10">
        <h1 className="text-2xl font-bold text-purple-700">🎬 AI Video Generator</h1>
      </nav>

      {/* Main Content */}
      <div className="pt-24 flex flex-col items-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your video idea..."
              className="px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-4 py-3 rounded-lg transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Generating...' : '🎥 Generate Video'}
            </button>
          </form>

          {videoUrl && (
            <div className="mt-6">
              <video
                controls
                className="rounded-lg border border-gray-300 w-full max-w-md mx-auto"
              >
                <source src={`http://localhost:5000${videoUrl}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
