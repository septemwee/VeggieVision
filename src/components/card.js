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
    
      className="relative w-full min-h-[400px] cursor-pointer group"
      onClick={handleFlip}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-700`}
      >
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 shadow-lg shadow-slate-300/40 group-hover:shadow-xl group-hover:shadow-slate-400/30 group-hover:-translate-y-2 transition-all duration-1000 ease-out flex flex-col p-8 ${isFlipped ? 'opacity-0 z-0 pointer-events-none' : 'opacity-100 z-10 group-hover:shadow-xl group-hover:shadow-slate-400/30 group-hover:-translate-y-2'}`}
        >
          <div className="relative w-full h-[220px] mb-6">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-48 h-48 bg-emerald-100/70 rounded-full blur-lg"></div>
            </div>
            {isFlipped ? null :
            <Image
              src={imageVeg}
              alt={title}
              layout="fill"
              objectFit="contain"
              className="z-10 drop-shadow-lg transition-all duration-700 ease-in-out"
            />}
          </div>

          <div className="flex-grow flex flex-col justify-center text-center">
            <p className="text-sm font-semibold text-emerald-600 mb-1">
              ผักสวนครัว
            </p>

            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
              {title}
            </h3>
          </div>
        </div>
        
        
        <div className={`absolute inset-0 bg-green-50 rounded-2xl shadow-xl ring-1 ring-green-100 group-hover:shadow-2xl transition-all duration-700 ease-in-out p-6 flex flex-col justify-start overflow-auto ${isFlipped ? 'opacity-100 z-10 group-hover:shadow-2xl' : 'opacity-0 z-0 pointer-events-none'}`}>
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