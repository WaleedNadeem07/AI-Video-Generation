import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import VideoCard from '../components/VideoCard';

interface Video {
  id: number;
  title: string;
  videoUrl: string;
}

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true); // Show spinner

    setTimeout(() => {
      // Fake "video generation"
      const newVideo: Video = {
        id: videos.length + 1,
        title: prompt,
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Example URL
      };

      setVideos([newVideo, ...videos]);
      setIsLoading(false); // Hide spinner
      setPrompt('');
      setImage(null);
    }, 2000); // Simulate 2 sec delay
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded"
          required
        />

        {/* Optional: Image input */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border border-gray-300 px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Generate Video
        </button>
      </form>

      {isLoading && <Spinner />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} title={video.title} videoUrl={video.videoUrl} />
        ))}
      </div>
    </div>
  );
};

export default Home;
