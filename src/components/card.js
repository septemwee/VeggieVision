// components/Card.js

import React, { useState } from 'react';
import Image from 'next/image';

export default function Card({
    imageVeg,
    title,
    vegetableData, 
    onCardClick 
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const backDescription = vegetableData?.description || "ไม่พบข้อมูลลักษณะของผัก";

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        if (onCardClick) {
            onCardClick();
        }
    };

    return (
        <div 
            className="relative w-full min-h-[400px] cursor-pointer [perspective:1000px] group" 
            onClick={handleFlip} 
        >
            <div className={`absolute inset-0 w-full h-full transition-all  duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                
                {/* 🔴 ด้านหน้าของการ์ด (Front Face) - Clean & Soft Gradient */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 group-hover:shadow-2xl transition-all duration-300 ease-in-out [backface-visibility:hidden] flex flex-col pt-10 ">
                    
                    {/* ส่วนรูปภาพ */}
                    <div className="relative w-full flex-grow p-4 flex justify-center items-center"> 
                        <Image
                            src={imageVeg}
                            alt={title}
                            layout="fill" 
                            objectFit="contain"
                            className="z-10" 
                        />
                    </div>
                    
                    {/* ส่วนเนื้อหา (ชื่อผัก) */}
                    <div className="p-6 flex-shrink-0 text-center ">
                        <h3 className="text-2xl font-extrabold text-green-800 mt-2 tracking-wide">{title}</h3>
                    </div>
                </div>

                {/* 🔴 ด้านหลังของการ์ด (Back Face) - Focus on Content */}
                <div className="absolute inset-0 bg-green-50 rounded-2xl shadow-xl ring-1 ring-green-100 group-hover:shadow-2xl transition-all duration-300 ease-in-out [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 flex flex-col justify-start overflow-auto">
                    
                    {/* หัวข้อด้านหลังที่ดูหนักแน่นขึ้น */}
                    <h4 className="text-xl font-extrabold text-green-900 mb-4 border-b-2 border-green-300 pb-2 text-center sticky top-0 bg-green-50 z-10">
                        ลักษณะของ {title}
                    </h4>
                    
                    <p className="text-gray-700 text-base leading-relaxed text-left flex-grow">
                        {backDescription}
                    </p>

                    {/* Footer เล็กๆ */}
                    <div className="flex-shrink-0 text-xs text-gray-500 mt-4 pt-2 border-t border-green-200 text-center">
                        คลิกเพื่อดูรูปภาพ
                    </div>
                </div>

            </div>
        </div>
    );
}