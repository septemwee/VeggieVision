import React from 'react';
import Image from 'next/image';

// ไอคอนเครื่องหมายบวก (ไม่ได้ใช้งานใน Card)
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

/**
 * ModernProductCard Component
 */
export default function Card({
    imageVeg,title
}) {
    return (
        // 🔴 แก้ไข: ลบ max-w-xs ออก เพื่อให้การ์ดใช้ความกว้างที่คำนวณจาก Parent
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out **w-full** pt-10 text-center">
            <div className=" h-full w-full mx-auto ">
                <Image
                    src={imageVeg}
                    alt={title}
                    objectFit="contain"
                />
            </div>

            {/* ส่วนเนื้อหา */}
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{title}</h3>
            </div>
        </div>
    );
}