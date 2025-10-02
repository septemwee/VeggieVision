import React from 'react';
import Image from 'next/image';
import Card from './card';
import BasilImage from '@/src/images/Basil.png';
import HolyBasilImage from '@/src/images/HolyBasil.png';
import SweetBasilImage from '@/src/images/SweetBasil.png';

import Carousel from './carousel';


// Component หลักของเรา
export default function OutputDisplay({ imageUrl }) {
    
    // 🔴 คลาส Responsive Card:
    // มือถือ: w-full (1 ใบ) | Tablet: md:w-1/2 (2 ใบ) | Desktop: lg:w-1/3 (3 ใบ)
    // snap-start: บังคับให้ Card Snap ชิดขอบซ้ายของ Scroll Padding
    const cardWidthClasses = "flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 **snap-start**";

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md w-full min-h-[20rem] flex items-center justify-center p-4">
            {imageUrl ? (
                // หลังอัปโหลดรูป
                <div className="Relative">
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
                <Carousel>
                    <div className={cardWidthClasses}> 
                        <Card imageVeg={BasilImage} title="โหระพา" />
                    </div>
                    <div className={cardWidthClasses}>
                        <Card imageVeg={HolyBasilImage} title="กะเพรา" />
                    </div>
                    <div className={cardWidthClasses}>
                        <Card imageVeg={SweetBasilImage} title="แมงลัก" />
                    </div>
                    <div className={cardWidthClasses}>
                        <Card imageVeg={BasilImage} title="โหระพา 4" />
                    </div>
                    <div className={cardWidthClasses}>
                        <Card imageVeg={BasilImage} title="โหระพา 5" />
                    </div>
                    <div className={cardWidthClasses}>
                        <Card imageVeg={BasilImage} title="โหระพา 6" />
                    </div>
                    <div className={cardWidthClasses}>
                        <Card imageVeg={BasilImage} title="โหระพา 6" />
                    </div>
                </Carousel>
            )}
        </div>
    );
}