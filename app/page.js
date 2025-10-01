'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import UploadModal from '../src/components/uploadModal.js';
import OutputDisplay from '@/src/components/outputDisplay.js';
import vegetableBasketImage from '@/src/images/vegetable_basket.png';


const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);



export default function VeggieHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const handleUploadSuccess = (imageUrl) => {
    setUploadedImageUrl(imageUrl);
  };


  return (
    <>
      <div className="relative h-full flex px-20">
        <div className="absolute z-0 top-0 left-0 w-96 h-96 md:w-[500px] md:h-[500px] bg-green-300/50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute z-0 bottom-0 right-0 w-96 h-96 md:w-[500px] md:h-[500px] bg-green-300/50 rounded-full translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 mt-20 text-left max-w-lg">
            <h1 className="text-5xl md:text-7xl font-extrabold text-green-900 leading-tight">
              Veggie <br /> Vision
            </h1>
            <p className="mt-6 text-gray-600">
              Keep it easy with these simple but delicious recipes from make-ahead lunches and midweek meals to fuss-free sides.
            </p>

            {/* ปุ่มอัปโหลดไฟล์ กดแแล้วขึ้น pop up = uploadModal.js component */}
            <div className="mt-10 flex items-center gap-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white font-bold py-3 px-20 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
              >
                Upload Now!
              </button>
            </div>
        </div>

        <div className="flex">
          <Image
            src={vegetableBasketImage}
            alt="Uploaded vegetable"
            width={500}   
            height={500}  
            // className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="relative my-10 mx-20">
        <OutputDisplay imageUrl={uploadedImageUrl} />
      </div>

      <UploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={handleUploadSuccess} 
      />
      
    </>
  );
}