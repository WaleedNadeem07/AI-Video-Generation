import React from 'react';

interface VideoDisplayProps {
  videoUrl: string;
  generatedPrompt: string;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ videoUrl, generatedPrompt }) => {
  return (
    <>
      {/* Show the generated video with controls and download button */}
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

      {/* Show the AI-generated prompt that was used to create the video */}
      {generatedPrompt && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Prompt</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">AI-Generated Video Prompt:</span>
              {/* Copy button to let users copy the prompt to clipboard */}
              <button
                onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                title="Copy to clipboard"
              >
                📋 Copy
              </button>
            </div>
            {/* Display the cleaned-up prompt text */}
            <div className="bg-white border border-gray-300 rounded-md p-3 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
              {generatedPrompt}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDisplay; 