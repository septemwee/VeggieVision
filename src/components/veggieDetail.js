// components/VegetableDetail.js

import React from 'react';
import Image from 'next/image';
import { getVegetableData } from '@/src/components/veggieData.js';



const DetailSection = ({ title, items = false }) => ( 
    <div className="mb-6">
        <h3 className={`text-xl text-green-800 font-semibold border-b-2 pb-1 mb-2`}>{title}</h3>
        <ul className={`list-disc list-inside space-y-1 text-gray-700 `}>
            {Array.isArray(items) && items.map((item, index) => (
                <li 
                    key={index} 
                    className={`text-sm sm:text-base}`}
                >
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

/**
 * VegetableDetail Component: แสดงผลลัพธ์จาก AI
 * @param {string} vegetableName - ชื่อผักที่ได้รับจาก AI (เช่น 'โหระพา', 'กะเพรา')
 * @param {string} uploadedImageUrl - URL ของรูปภาพที่ผู้ใช้อัปโหลด
 */
export default function VegetableDetail({ vegetableName, uploadedImageUrl }) {
    
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

    // กำหนดรูปภาพที่จะใช้แสดง: ใช้ uploadedImageUrl เป็นหลัก ถ้ามี
    const displayImageSrc = uploadedImageUrl || data.imageSrc;
    const displayImageAlt = uploadedImageUrl ? `Uploaded image of ${data.name}` : data.name;
    const displayObjectFit = uploadedImageUrl ? 'cover' : 'contain'; // cover สำหรับรูปที่อัปโหลด, contain สำหรับรูปมาตรฐาน

    // 🔴 แก้ไข: ลบ p-4 ออกสำหรับรูปภาพที่อัปโหลด เพื่อไม่ให้รูปภาพถูกย่อจนเกิดขอบ
    const imagePadding = uploadedImageUrl ? '' : 'p-4'; 


    return (
        <div className="bg-white w-full p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* 1. ส่วนรูปภาพ (ซ้าย) */}
                <div className="flex-shrink-0 lg:w-1/3 flex flex-col items-center">
                    <div className={`relative w-full max-w-xs aspect-square overflow-hidden rounded-xl shadow-2xl border-4 bg-white border-green-700`}> 
                        <Image
                            src={displayImageSrc} 
                            alt={displayImageAlt}
                            layout="fill"
                            objectFit={displayObjectFit}
                            className={imagePadding} // 🔴 ใช้ตัวแปร imagePadding ที่กำหนดไว้
                            priority
                        />
                    </div>

                    {/* 🔴 ลบส่วนเมนูอาหารออกจากตรงนี้ */}
                </div>

                {/* 2. ส่วนรายละเอียด (ขวา) */}
                <div className="lg:w-2/3">
                    {/* ชื่อหลัก */}
                    <h2 className="text-4xl font-extrabold text-green-800 mb-2">{data.name}</h2>
                    <p className="text-lg font-medium text-gray-500 mb-4">
                        ชื่อวิทยาศาสตร์: **{data.scientificName}**
                    </p>
                    
                    {/* ส่วนที่เพิ่ม: ลักษณะของผัก */}
                    <div className="mb-6 p-4 bg-gray-50 border-l-4 border-green-700 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-green-800 mb-2">ลักษณะของผัก</h3>
                        <p className="text-gray-700 text-sm sm:text-base">{data.description}</p>
                    </div>


                    {/* รายละเอียดอื่น ๆ */}
                    <DetailSection 
                        title="ชื่อภาษาท้องถิ่น" 
                        items={[data.localNames]} 
                    />

                    {/* ส่วนที่ต้องใช้ Grid เพื่อวาง 2 คอลัมน์บนจอใหญ่ */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8"> 
                        <DetailSection 
                            title="วิธีเก็บเกี่ยว/วิธีเด็ด" 
                            items={data.pickingMethod} 
                        />
                        <DetailSection 
                            title="วิธีเก็บรักษา" 
                            items={data.storageMethod} 
                        />
                    </div>
                    
                    {/* 🔴 ส่วนที่ต้องใช้ Grid เพื่อวาง 2 คอลัมน์บนจอใหญ่: เมนูอาหาร vs สรรพคุณ */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 mt-4">
                        {data.properties && (
                            <DetailSection 
                                title="สรรพคุณทางยา" 
                                items={data.properties} 
                            />
                        )}
                        {data.dishes && (
                            <DetailSection 
                                title="เมนูอาหารแนะนำ" 
                                items={data.dishes} 
                                // ลบ isDish ออกเพราะไม่ได้ใช้อ้างอิงใน DetailSection ที่แนบมา
                            />
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}