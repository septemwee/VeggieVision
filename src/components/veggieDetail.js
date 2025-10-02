// components/VegetableDetail.js

import React from 'react';
import Image from 'next/image';
import { getVegetableData } from '@/src/components/veggieData.js';


// Helper Component สำหรับแสดงหัวข้อและรายการ
const DetailSection = ({ title, items }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-700 border-b-2 border-green-200 pb-1 mb-2">{title}</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 pl-4">
            {Array.isArray(items) && items.map((item, index) => (
                <li key={index} className="text-sm sm:text-base">{item}</li>
            ))}
        </ul>
    </div>
);

/**
 * VegetableDetail Component: แสดงผลลัพธ์จาก AI
 * @param {string} vegetableName - ชื่อผักที่ได้รับจาก AI (เช่น 'โหระพา', 'กะเพรา')
 */
export default function VegetableDetail({ vegetableName }) {
    
    // ดึงข้อมูลผักตามชื่อ
    const data = getVegetableData(vegetableName);
    
    if (!data) {
        return (
            <div className="text-center p-10 text-gray-500">
                <h2 className="text-2xl font-bold">ไม่พบข้อมูลผัก</h2>
                <p>ไม่พบข้อมูลสำหรับ "{vegetableName}" กรุณาลองอัปโหลดรูปภาพอื่น</p>
            </div>
        );
    }

    return (
        <div className="bg-white w-full p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* 1. ส่วนรูปภาพ (ซ้าย) */}
                <div className="flex-shrink-0 lg:w-1/3 flex flex-col items-center">
                    <div className="relative w-full max-w-xs aspect-square overflow-hidden rounded-full shadow-2xl border-4 border-yellow-200 bg-yellow-50/50">
                        <Image
                            src={data.imageSrc} 
                            alt={data.name}
                            layout="fill"
                            objectFit="contain"
                            className="p-4"
                        />
                    </div>

                    {data.dishes && (
                        <div className="w-full max-w-xs mt-6">
                            <DetailSection 
                                title="เมนูอาหารแนะนำ" 
                                items={data.dishes} 
                                isDish={true}
                            />
                        </div>
                    )}
                </div>

                {/* 2. ส่วนรายละเอียด (ขวา) */}
                <div className="lg:w-2/3">
                    {/* ชื่อหลัก */}
                    <h2 className="text-4xl font-extrabold text-green-800 mb-2">{data.name}</h2>
                    <p className="text-lg font-medium text-gray-500 mb-4">
                        ชื่อวิทยาศาสตร์: **{data.scientificName}**
                    </p>
                    
                    {/* ส่วนที่เพิ่ม: ลักษณะของผัก */}
                    <div className="mb-6 p-4 bg-gray-50 border-l-4 border-green-500 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-green-700 mb-2">ลักษณะของผัก</h3>
                        <p className="text-gray-700 text-sm sm:text-base">{data.description}</p>
                    </div>


                    {/* รายละเอียดอื่น ๆ */}
                    <DetailSection 
                        title="ชื่อภาษาท้องถิ่น" 
                        items={[data.localNames]} 
                    />

                    <DetailSection 
                        title="วิธีเก็บเกี่ยว/วิธีเด็ด" 
                        items={data.pickingMethod} 
                    />

                    <DetailSection 
                        title="วิธีเก็บรักษา" 
                        items={data.storageMethod} 
                    />

                    <DetailSection 
                        title="สรรพคุณทางยา" 
                        items={data.properties} 
                    />
                </div>
            </div>
        </div>
    );
}