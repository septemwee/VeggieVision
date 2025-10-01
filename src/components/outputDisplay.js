import React from 'react';
import Image from 'next/image';

// Placeholder Icon
const PlaceholderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

// Component หลักของเรา
export default function OutputDisplay({ imageUrl }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md w-full min-h-[20rem] flex items-center justify-center p-4">
      {imageUrl ? (
        //หลังอัปโหลดรูป
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Result</h2>
          <Image
            src={imageUrl}
            alt="Uploaded vegetable"
            width={300}
            height={300}
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      ) : (
        // ก่อนอัปโหลดรูป
        <div className="flex flex-col items-center justify-center text-gray-500">
          <PlaceholderIcon />
          <h3 className="mt-4 text-lg font-semibold">No Image Uploaded</h3>
          <p className="mt-1 text-sm">Please upload an image to see the result.</p>
        </div>
      )}
    </div>
  );
}