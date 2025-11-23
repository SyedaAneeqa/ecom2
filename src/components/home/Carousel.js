import React from 'react';

export default function Carousel() {
  return (
    <div className="relative flex justify-center items-center h-96 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg overflow-hidden">
      {/* Video element */}
      <video 
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
        src="/vid.mp4"
        autoPlay
        loop
        muted
      >
        Your browser does not support the video tag.
      </video>
      
      {/* Loading message on top of the video */}
      <div className="absolute inset-0 flex justify-center items-center z-10">
         {/* You can add a text overlay if you want */}
      </div>
    </div>
  );
}