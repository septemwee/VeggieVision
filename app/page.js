'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import UploadModal from '../src/components/uploadModal.js';
import OutputDisplay from '@/src/components/outputDisplay.js';
import vegetableBasketImage from '@/src/images/vegetable_basket.png';

export default function VeggieHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiResultName, setAiResultName] = useState(""); 
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const outputRef = useRef(null);

  const resetState = () => {
      setAiResultName("");
      setUploadedImageUrl(null);
  }
  
  const handleUploadSuccess = (imageUrl, bestPrediction) => {
    setUploadedImageUrl(imageUrl);

    if (bestPrediction) {
      setAiResultName(bestPrediction.class); 
      console.log("🔥 Best Prediction Class:", bestPrediction.class);
    }

    if (outputRef.current) {
      outputRef.current.scrollIntoView({
          behavior: 'smooth', 
          block: 'start', 
      });
    }
  };

  // useEffect สำหรับ scroll หลัง modal ปิด
  useEffect(() => {
    if (uploadedImageUrl && !isModalOpen) {
      outputRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [uploadedImageUrl, isModalOpen]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(reg => console.log("Service Worker registered:", reg))
        .catch(err => console.log("Service Worker registration failed:", err));
    }
  }, []);

  return (
    <div className="bg-white text-gray-800 relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[650px] md:h-[650px] bg-green-200/40 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[650px] md:h-[650px] bg-green-200/40 rounded-full translate-x-1/2 translate-y-[25%]"></div> 
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-16 sm:py-20 lg:pt-16 lg:pb-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-900 leading-tight tracking-tight">
              Veggie Vision
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                ต้องการรู้ไหมว่าผักนี้คืออะไร? Veggie Vision ช่วยคุณได้! เพียงแค่ อัปโหลดรูปภาพผักของคุณ ระบบ AI จะวิเคราะห์และระบุชื่อผักให้คุณในไม่กี่วินาที <br/>ทำให้การแยกแยะผักเป็นเรื่องง่ายกว่าที่เคย
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
              key={uploadedImageUrl}
              src={vegetableBasketImage}
              alt="A basket full of fresh vegetables"
              width={300}
              height={300}
              unoptimized
              className="w-full h-auto rounded-lg max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md"
              priority
            />
          </div>
        </div>
      </main>

      <div 
        ref={outputRef} 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-28"
      >
        <OutputDisplay 
          key={uploadedImageUrl}
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
