import React from 'react';
import Image from 'next/image';
import Card from './card';
import BasilImage from '@/src/images/Basil.png';


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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 ">
          <Card 
            imageVeg={BasilImage}
            title = "โหระพา"
          />
          <Card 
            imageVeg={BasilImage}
            title = "โหระพา"
          />
          <Card 
            imageVeg={BasilImage}
            title = "โหระพา"
          />
        </div>
      )}
    </div>
  );
}