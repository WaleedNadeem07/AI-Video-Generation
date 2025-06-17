import React from 'react';

// Define the props that VideoCard expects
type Props = {
  title: string;
  videoUrl: string;
};

// Functional component receiving title and videoUrl
const VideoCard = ({ title, videoUrl }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <video controls className="w-full h-auto">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default VideoCard;
