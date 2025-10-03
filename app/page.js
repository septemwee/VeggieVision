'use client';

import React, {useState , useRef} from 'react';
import Image from 'next/image';
import UploadModal from '../src/components/uploadModal.js';
import OutputDisplay from '@/src/components/outputDisplay.js';
import vegetableBasketImage from '@/src/images/vegetable_basket.png';


// PlayIcon component remains the same
const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

export default function VeggieHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiResultName, setAiResultName] = useState("แมงลัก"); 
  
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const handleUploadSuccess = (imageUrl) => {
    setUploadedImageUrl(imageUrl);
    if (outputRef.current) {
      outputRef.current.scrollIntoView({
          behavior: 'smooth', 
          block: 'start', 
      });
    }
  };

  const outputRef = useRef(null);


  return (
    <div className="bg-white text-gray-800">
      <div className="absolute z-0 top-0 left-0 w-[400px] h-[400px] md:w-[650px] md:h-[650px] bg-green-200/40 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute z-0 bottom-0 right-0 w-[400px] h-[400px] md:w-[650px] md:h-[650px] bg-green-200/40 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-16 sm:py-20 lg:pt-16 lg:pb-10">

          {/* -- Text Content -- */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-900 leading-tight tracking-tight">
              Veggie Vision
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                ต้องการรู้ไหมว่าผักนี้คืออะไร? Veggie Vision ช่วยคุณได้! เพียงแค่ อัปโหลดรูปภาพผักของคุณ ระบบ AI จะวิเคราะห์และระบุชื่อผักให้คุณในไม่กี่วินาที ทำให้การแยกแยะผักเป็นเรื่องง่ายกว่าที่เคย
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
              >
                Upload Your Veggie!
              </button>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src={vegetableBasketImage}
              alt="A basket full of fresh vegetables"
              width={300}
              height={300}
              // [แก้ไข] ปรับแก้คลาส max-w-* ให้มีขนาดเล็กลงในแต่ละขนาดหน้าจอ
              className="w-full h-auto rounded-lg max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md"
              priority
            />
          </div>

        </div>
      </main>

      {/* --- Output Section --- */}
      <div 
        ref={outputRef} 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-28"
      >
        <OutputDisplay 
          imageUrl={uploadedImageUrl} 
          vegName={aiResultName}
        />
      </div>

      <UploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={handleUploadSuccess} 
      />
    </div>
  );
}

