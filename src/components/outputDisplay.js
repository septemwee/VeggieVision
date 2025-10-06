import React from 'react';
import Image from 'next/image';
import Card from './card';
import BasilImage from '@/src/images/Basil.png';
import HolyBasilImage from '@/src/images/HolyBasil.png';
import SweetBasilImage from '@/src/images/SweetBasil.png';
import VegetableDetail from '@/src/components/veggieDetail.js';
import { getVegetableData } from '@/src/components/veggieData.js';
import Carousel from './carousel';


const mockVegetableResult = "โหระพา";

// Component หลักของเรา
export default function OutputDisplay({ imageUrl , vegName }) {
    
    const cardWidthClasses = "w-full mb-4 sm:mb-0 md:w-[calc(50%-0.75rem)] lg:w-[calc(33.3333%-1rem)] ";
    const hasResult = imageUrl !== null && 
                      imageUrl !== undefined && 
                      vegName !== null && 
                      vegName !== undefined;
                       

    const allVegetables = [
        getVegetableData('basil'), 
        getVegetableData('holy_basil'), 
        getVegetableData('sweet_basil'),
        getVegetableData('chinese_chives'),
        getVegetableData('cilantro'),
        getVegetableData('celery'),
        getVegetableData('spring_onion'),
        // เพิ่มผักอื่นๆ สำหรับการทดสอบ Carousel
    ].filter(Boolean);


     return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md w-full min-h-[20rem] flex items-center justify-center p-2">
            {hasResult ? (
                // 🔴 1. หลังอัปโหลดรูป: แสดง VegetableDetail
                <div className="w-full">
                    <h2 className="text-4xl font-extrabold text-green-800 text-center border-b-3 border-green-600 p-8 mb-4 max-w-5xl mx-auto">ผลลัพธ์จากการวิเคราะห์</h2>
                    <VegetableDetail 
                      vegetableName={vegName}
                      uploadedImageUrl={imageUrl}
                    />
                </div>
            ) : (
                // 🔴 2. ก่อนอัปโหลดรูป: แสดง Carousel
                <Carousel>
                    {allVegetables.map((veg, index) => (
                         <div key={index} className={cardWidthClasses}> 
                            <Card 
                              imageVeg={veg.imageSrc} 
                              title={veg.name}
                              vegetableData={veg} 
                            />
                         </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
}
