// components/Card.js

import Image from "next/image";
import { useState } from "react";

export default function Card({ imageVeg, title, vegetableData, onCardClick }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const backDescription =
    vegetableData?.description || "ไม่พบข้อมูลลักษณะของผัก";

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (onCardClick) {
      onCardClick();
    }
  };

  return (
    <div
      // ลบคลาส 3D Flip ออก
      className="relative w-full min-h-[400px] cursor-pointer group" 
      onClick={handleFlip}
    >
      {/* **ตัวจัดการการแสดงผล (ไม่ใช่ Flipper)**: ไม่ต้องมี 3D Transform */}
      <div className="absolute inset-0 w-full h-full"> 

        {/* ด้านหน้า (Front Side) */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 shadow-lg shadow-slate-300/40 group-hover:shadow-xl group-hover:shadow-slate-400/30 transition-all duration-700 flex flex-col p-8 
            // **FIX: Opacity และ Z-index Control**
            ${isFlipped ? 'opacity-0 z-0' : 'opacity-100 z-10 group-hover:-translate-y-2'}`}
        >
          <div className="relative w-full h-[220px] mb-6">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-48 h-48 bg-emerald-100/70 rounded-full blur-lg"></div>
            </div>
            <Image
              src={imageVeg}
              alt={title}
              layout="fill"
              objectFit="contain"
              className="z-10 drop-shadow-lg"
            />
          </div>
          {/* ... (ส่วนข้อความด้านหน้า) ... */}
          <div className="flex-grow flex flex-col justify-center text-center">
            <p className="text-sm font-semibold text-emerald-600 mb-1">
              ผักสวนครัว
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
              {title}
            </h3>
          </div>
        </div>
        
        {/* ด้านหลัง (Back Side) */}
        <div className={`absolute inset-0 bg-green-50 rounded-2xl shadow-xl ring-1 ring-green-100 transition-all duration-700 p-6 flex flex-col justify-start overflow-auto
            // **FIX: Opacity และ Z-index Control**
            ${isFlipped ? 'opacity-100 z-10 group-hover:shadow-2xl' : 'opacity-0 z-0'}`}
        >
          <h4 className="text-xl font-extrabold text-green-900 mb-4 border-b-2 border-green-300 pb-2 text-center sticky top-0 bg-green-50 z-10">
            ลักษณะของ {title}
          </h4>
          <p className="text-gray-700 text-base leading-relaxed text-left flex-grow">
            {backDescription}
          </p>
          
          <div className="flex-shrink-0 text-xs text-gray-500 mt-4 pt-2 border-t border-green-200 text-center">
            คลิกเพื่อดูรูปภาพ
          </div>
        </div>
      </div>
    </div>
  );
}