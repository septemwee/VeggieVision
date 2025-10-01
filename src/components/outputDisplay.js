import React from 'react';
import Image from 'next/image';
import Card from './card';
import BasilImage from '@/src/images/Basil.png';
import Carousel from './carousel';


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
            <Carousel>
                <div className="flex-shrink-0 w-1/3 snap-start">
                    <Card 
                        imageVeg={BasilImage}
                        title="โหระพา 1"
                    />
                </div>
                <div className="flex-shrink-0 w-1/3 snap-start">
                    <Card 
                        imageVeg={BasilImage}
                        title="โหระพา 2"
                    />
                </div>
                <div className="flex-shrink-0 w-1/3 snap-start">
                    <Card 
                        imageVeg={BasilImage}
                        title="โหระพา 3"
                    />
                </div>
                <div className="flex-shrink-0 w-1/3 snap-start">
                    <Card 
                        imageVeg={BasilImage}
                        title="โหระพา 4"
                    />
                </div>
                {/* เพิ่ม Card อื่นๆ ต่อได้เลย */}
            </Carousel>
      )}
    </div>
  );
}